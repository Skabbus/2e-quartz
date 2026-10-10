#!/usr/bin/env python3
"""
Laddar ner https://regalgoblins.com/2erules/ till Markdown med lokala bilder
i en "Appendix- Images"-mapp per bok.

Kör med: python scrape_2erules.py --toc-file pw_toc_6.xml --delay 1.5

Saknade filer / dubbletter (samma sida listad på flera ställen i XML:en):
  python scrape_2erules.py --check
      Listar (utan webbläsare, utan ändringar) vad som saknas. Skriver
      missing_report.txt.
  Vanlig körning gör tre saker innan något laddas ner:
    1. Flyttar sidor som tidigare fått fel filnamn (gamla versionen döpte en
       sida efter SISTA posten, t.ex. "Table 3- Muscle" i st.f. "Strength,
       Stamina, Muscle") och rättar wikilänkarna som pekade dit.
    2. Skapar kopior av sidor som XML:en listar på flera ställen (--dup-mode).
    3. Poster med #ankare (avsnitt/tabeller på samma sida) får inga egna
       sidor, om du inte anger --anchor-mode link (då skapas små länknoter).
  Sedan laddas bara sådant ner som saknas helt.
"""
import argparse
import os
import re
import sys
import time
import xml.etree.ElementTree as ET
from urllib.parse import quote, urldefrag, urljoin

from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup, Tag
from markdownify import markdownify as md

BASE = "https://regalgoblins.com/2erules/"
TOC_URL = BASE + "pw_toc_6.xml"

TITLE_ATTRS = ["title", "text", "label", "caption", "name"]
HREF_ATTRS = ["href", "file", "url", "src", "link", "path", "page", "target"]
HTM_RE = re.compile(r"\.html?($|[#?])", re.I)


def decode(data):
    try:
        return data.decode("utf-8")
    except UnicodeDecodeError:
        return data.decode("cp1252", errors="replace")


def bs_to_et(tag):
    attrs = {k: (v if isinstance(v, str) else " ".join(v)) for k, v in tag.attrs.items()}
    el = ET.Element(tag.name, attrs)
    for c in tag.children:
        if isinstance(c, Tag):
            el.append(bs_to_et(c))
    return el


def parse_toc(data):
    text = decode(data)
    text = re.sub(r"^\s*<\?xml[^>]*\?>", "", text)
    try:
        return ET.fromstring(text)
    except ET.ParseError:
        pass
    soup = BeautifulSoup(text, "html.parser")
    root = ET.Element("root")
    for t in soup.find_all(recursive=False):
        root.append(bs_to_et(t))
    return root


def local(tag):
    return tag.split("}")[-1]


def get_title(el):
    for a in TITLE_ATTRS:
        v = el.attrib.get(a)
        if v and v.strip():
            return v.strip()
    return (el.text or "").strip()


def get_href(el):
    for a in HREF_ATTRS:
        v = el.attrib.get(a)
        if v and HTM_RE.search(v):
            return v.strip()
    for v in el.attrib.values():
        if HTM_RE.search(v):
            return v.strip()
    return None


def safe(name):
    name = re.sub(r'[\\/:*?"<>|]', "-", name)
    name = re.sub(r"\s+", " ", name).strip(" .")
    return (name or "untitled")[:100]


def make_unique():
    used = set()
    def unique(parts):
        parts = list(parts)
        i = 1
        while True:
            alt = parts if i == 1 else parts[:-1] + [f"{parts[-1]} ({i})"]
            key = tuple(x.lower() for x in alt)
            if key not in used:
                used.add(key)
                return alt
            i += 1
    return unique


def collect_li(root):
    pages, unique = [], make_unique()
    def props(li):
        for c in li:
            if local(c.tag) == "o":
                return {p.attrib.get("n"): p.attrib.get("v", "") for p in c if local(p.tag) == "p"}
        return {}

    def walk(ul, dirs):
        for li in ul:
            if local(li.tag) != "li":
                continue
            pr = props(li)
            title = pr.get("N", "").strip()
            href = pr.get("L", "").strip().replace("\\", "/") or None
            sub = next((c for c in li if local(c.tag) == "ul"), None)
            if sub is not None:
                subdirs = dirs + [safe(title)] if title else dirs
                if href:
                    pages.append((title, href, unique(subdirs + ["_index"])))
                walk(sub, subdirs)
            elif href:
                pages.append((title or href, href, unique(dirs + [safe(title or href)])))

    for ul in root.iter():
        if local(ul.tag) == "ul":
            walk(ul, [])
            break
    return pages


def collect(root):
    if any(local(e.tag) == "li" for e in root.iter()):
        return collect_li(root)
    return []

def path_of(out_dir, parts):
    return os.path.join(out_dir, *parts[:-1], parts[-1] + ".md")


def rel_link(out_dir, path):
    rel = os.path.relpath(path, out_dir).replace(os.sep, "/")
    return rel[:-3] if rel.endswith(".md") else rel


def build_index(pages):
    """url -> [(title, parts, href), ...] i XML-ordning."""
    by_url = {}
    for title, href, parts in pages:
        url = urldefrag(urljoin(BASE, href))[0]
        by_url.setdefault(url, []).append((title, parts, href))
    return by_url


def pick_canonical(entries):
    """Huvudposten för en URL = den som får själva sidan: sista posten utan
    #ankare (helst inte en _index), annars den första posten."""
    plain = [e for e in entries if "#" not in e[2]]
    pref = [e for e in plain if e[1][-1] != "_index"] or plain
    return pref[-1] if pref else entries[0]


def classify(entries):
    """(canonical, riktiga dubbletter, ankar-poster)"""
    canon = pick_canonical(entries)
    dups = [e for e in entries
            if e is not canon and "#" not in e[2] and e[1][-1] != "_index"]
    anchors = [e for e in entries if e is not canon and "#" in e[2]]
    return canon, dups, anchors


def split_front(text):
    """Returnerar (frontmatter inkl. avslutande ---, resten)."""
    if text.startswith("---\n"):
        end = text.find("\n---\n", 4)
        if end != -1:
            return text[: end + 5], text[end + 5:]
    return "", text


def write_copy(dst, canonical, text, out_dir, dup_mode):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if dup_mode == "embed":
        front, _ = split_front(text)
        text = f"{front}\n![[{rel_link(out_dir, canonical)}]]\n"
    with open(dst, "w", encoding="utf-8") as f:
        f.write(text)


def write_anchor_stub(dst, canonical, title, href, out_dir):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    t = title.replace('"', "'")
    src = urljoin(BASE, href)
    with open(dst, "w", encoding="utf-8") as f:
        f.write(f'---\ntitle: "{t}"\nsource: {src}\n---\n\n'
                f'[[{rel_link(out_dir, canonical)}|{title}]]\n')


def make_extras(entries, canon_path, text, out_dir, dup_mode, anchor_mode, force=False):
    """Skapar kopior/länknoter för övriga poster med samma URL. Returnerar antal."""
    canon, dups, anchors = classify(entries)
    made = 0
    for _, parts, _ in dups:
        dst = path_of(out_dir, parts)
        if force or not os.path.exists(dst):
            write_copy(dst, canon_path, text, out_dir, dup_mode)
            made += 1
    if anchor_mode == "link":
        for title, parts, href in anchors:
            dst = path_of(out_dir, parts)
            if force or not os.path.exists(dst):
                write_anchor_stub(dst, canon_path, title, href, out_dir)
                made += 1
    return made


LINK_RE = re.compile(r"\[\[([^\]|#]+)")


def rewrite_links(out_dir, mapping):
    """Byter [[gammal/sökväg ...]] mot ny i alla .md-filer. Returnerar antal filer."""
    changed = 0
    for dirpath, _, files in os.walk(out_dir):
        for fn in files:
            if not fn.endswith(".md"):
                continue
            fp = os.path.join(dirpath, fn)
            with open(fp, encoding="utf-8") as f:
                txt = f.read()
            new = LINK_RE.sub(lambda m: "[[" + mapping.get(m.group(1), m.group(1)), txt)
            if new != txt:
                with open(fp, "w", encoding="utf-8") as f:
                    f.write(new)
                changed += 1
    return changed


def migrate_canonical(by_url, out_dir):
    """Flyttar sidor som gamla scrapern sparade under fel namn (sista posten)."""
    mapping = {}
    for url, entries in by_url.items():
        if len(entries) < 2:
            continue
        canon = pick_canonical(entries)
        old = entries[-1]
        if canon is old:
            continue
        op, np_ = path_of(out_dir, old[1]), path_of(out_dir, canon[1])
        if os.path.exists(op) and not os.path.exists(np_):
            os.makedirs(os.path.dirname(np_), exist_ok=True)
            os.replace(op, np_)
            mapping[rel_link(out_dir, op)] = rel_link(out_dir, np_)
    files = rewrite_links(out_dir, mapping) if mapping else 0
    return len(mapping), files


def make_copies(by_url, out_dir, dup_mode, anchor_mode):
    """Fas 1 (offline): skapa saknade kopior/länknoter för nedladdade sidor."""
    made = 0
    for url, entries in by_url.items():
        canon = pick_canonical(entries)
        cp = path_of(out_dir, canon[1])
        if len(entries) < 2 or not os.path.exists(cp):
            continue
        with open(cp, encoding="utf-8") as f:
            text = f.read()
        made += make_extras(entries, cp, text, out_dir, dup_mode, anchor_mode)
    return made


def report_missing(by_url, out_dir, anchor_mode, report_file="missing_report.txt"):
    renamed, copies, anchors_todo, absent = [], [], [], []
    for url, entries in by_url.items():
        canon, dups, anchors = classify(entries)
        cp = path_of(out_dir, canon[1])
        lp = path_of(out_dir, entries[-1][1])
        pending = False
        if not os.path.exists(cp):
            if canon is not entries[-1] and os.path.exists(lp):
                pending = True
                renamed.append((lp, cp))          # finns, men under fel namn
            else:
                absent.append((url, [path_of(out_dir, e[1]) for e in entries]))
                continue
        copies += [(path_of(out_dir, e[1]), cp) for e in dups
                   if not os.path.exists(path_of(out_dir, e[1]))]
        # efter flytten är den gamla (felnamnade) filen borta, så den räknas som saknad
        anchors_todo += [(path_of(out_dir, e[1]), cp) for e in anchors
                         if not os.path.exists(path_of(out_dir, e[1]))
                         or (pending and path_of(out_dir, e[1]) == lp)]
    with open(report_file, "w", encoding="utf-8") as f:
        f.write(f"FEL FILNAMN ({len(renamed)}) - sidan finns men under fel namn, flyttas vid körning:\n")
        for old, new in renamed:
            f.write(f"  {old}\n      -> {new}\n")
        f.write(f"\nKOPIOR SAKNAS ({len(copies)}) - samma sida står på flera ställen:\n")
        for dst, src in copies:
            f.write(f"  {dst}\n      <- {src}\n")
        f.write(f"\nAVSNITT PÅ SAMMA SIDA ({len(anchors_todo)}) - poster med #ankare, "
                f"inga egna sidor (skapas som länknoter med --anchor-mode link):\n")
        for dst, src in anchors_todo:
            f.write(f"  {dst}\n      del av {src}\n")
        f.write(f"\nSAKNAS HELT ({len(absent)}) - måste laddas ner:\n")
        for url, paths in absent:
            f.write(f"  {url}\n")
            for p in paths:
                f.write(f"      {p}\n")
    print(f"Sidor med fel filnamn (flyttas):                {len(renamed)}")
    print(f"Kopior som saknas (skapas utan nedladdning):    {len(copies)}")
    print(f"Avsnitt på samma sida (ankare, inga egna sidor): {len(anchors_todo)}")
    print(f"Sidor som saknas helt (måste laddas ner):       {len(absent)}")
    print(f"Detaljer i {report_file}")


def break_after_title(text, candidates):
    """Radbrott direkt efter sidans rubrik om den står först i texten."""
    cands = []
    for c in candidates:
        c = re.sub(r'\s+', ' ', c or '').strip()
        if c and c not in cands:
            cands.append(c)
    cands.sort(key=len, reverse=True)  # längsta först

    for c in cands:
        # tillåt valfritt whitespace mellan orden i titeln
        title_pat = r'\s+'.join(re.escape(w) for w in c.split())
        m = re.match(
            r'^(\s*(?:#{1,6}\s+)?[*_]*)(' + title_pat + r')([*_]*)',
            text, flags=re.IGNORECASE
        )
        if not m:
            continue

        prefix, title_txt, suffix = m.groups()
        rest = text[m.end():]

        if rest.startswith("\n"):          # redan radbrott
            return text
        if not rest.strip():               # texten är bara titeln
            return text
        # dela inte mitt i ett ord ("Intro" + "duction")
        if not rest[0].isspace() and rest[0].islower() and title_txt[-1].isalpha():
            continue

        # om titeln inleddes med ** men inte stängdes, stäng den
        if "**" in prefix and "**" not in suffix:
            suffix = "**" + suffix

        return f"{prefix}{title_txt}{suffix}\n\n{rest.lstrip()}"
    return text

# Skiljetecken direkt följt av: stor bokstav, * (öppnande fetstil/kursiv),
# [ (länk) eller en skyddad wikilänk/bild (placeholder) -> radbrott.
# Lookbehind kräver liten bokstav/siffra/slutparentes före skiljetecknet,
# så att t.ex. "U.S.A" inte splittras.
BREAK_RE = re.compile(
    r'(?<=[a-zåäöéü0-9\)\]_])([.!?:;])'          # _ tillåts pga __LINK_n__
    r'(?=[A-ZÅÄÖ]|\*+[A-Za-zÅÄÖåäö0-9\[]|\[|__LINK_\d+__)'  # * måste följas av bokstav/siffra/[
)

# Stycken som inte ska "plattas ut" (listor, rubriker, tabeller, kod, citat)
STRUCTURAL_RE = re.compile(r'^(\s*([-*+]|\d+\.)\s|#{1,6}\s|\||```|>)')

def fix_bold(text):
    text = re.sub(r'\*{4}', '**', text)          # stängning+öppning hopslagna
    out = []
    for p in text.split('\n\n'):
        if p.startswith('**') and len(re.findall(r'\*\*', p)) % 2 == 1:
            p = p.rstrip() + '**'                # stäng oavslutad fetstil
        out.append(p)
    return '\n\n'.join(out)

def convert_and_download(page, html, page_url, url2path, outpath, vault_root, parts):
    soup = BeautifulSoup(html, "html.parser")
    title = soup.title.get_text(strip=True) if soup.title else ""
    for t in soup(["script", "style"]):
        t.decompose()

    # 1. Bilder
    book_name = parts[0] if parts else "General"
    appendix_dir = os.path.join(vault_root, book_name, "Appendix- Images")

    for img in soup.find_all("img", src=True):
        src = img["src"]
        img_full_url = urljoin(page_url, src)
        img_filename = os.path.basename(img_full_url.split("?")[0])
        if not img_filename:
            continue

        local_img_path = os.path.join(appendix_dir, img_filename)

        if not os.path.exists(local_img_path):
            response = None
            try:
                response = page.context.request.get(img_full_url)
                if response.ok:
                    os.makedirs(appendix_dir, exist_ok=True)
                    with open(local_img_path, "wb") as img_file:
                        img_file.write(response.body())
            except Exception as e:
                print(f"  ! Kunde inte ladda ner bild {img_full_url}: {e}", file=sys.stderr)
            finally:
                # FIX 1: frigör svaret i Playwright-drivrutinen
                if response is not None:
                    try:
                        response.dispose()
                    except Exception:
                        pass

        if os.path.exists(local_img_path):
            img.replace_with(f"![[{img_filename}]]")
        else:
            img["src"] = img_full_url

    # 2. HTML -> Markdown
    body = soup.body or soup
    text = md(str(body), heading_style="ATX")

    # 3. Vanliga länkar -> Obsidian-wikilänkar
    def replace_link(match):
        link_text = match.group(1)
        href = match.group(2)

        if href.startswith(("http://", "https://", "mailto:", "javascript:", "#")):
            return match.group(0)

        full, frag = urldefrag(urljoin(page_url, href))
        target = url2path.get(full)

        if target:
            rel_path = os.path.relpath(target, vault_root).replace(os.sep, "/")
            if rel_path.endswith(".md"):
                rel_path = rel_path[:-3]
            if frag:
                rel_path += f"#{frag}"

            if not link_text or link_text.endswith((".md", ".png", ".gif")):
                clean_name = os.path.splitext(os.path.basename(target))[0]
                return f"[[{rel_path}|{clean_name}]]"
            return f"[[{rel_path}|{link_text}]]"

        return match.group(0)

    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', replace_link, text)

    # 4. Skydda wikilänkar och bilder med placeholders
    links = []
    def save_link(m):
        links.append(m.group(0))
        return f"__LINK_{len(links)-1}__"

    text = re.sub(r'(\[\[.*?\]\]|!\[\[.*?\]\])', save_link, text)

    # 5. Ta bort radbrytningar mitt i meningar (men rör inte listor/rubriker/tabeller/kod)
    cleaned_paragraphs = []
    for p in text.split('\n\n'):
        if STRUCTURAL_RE.match(p) or '```' in p:
            p_clean = p.strip()
        else:
            p_clean = re.sub(r'\s+', ' ', p).strip()
        if p_clean:
            cleaned_paragraphs.append(p_clean)
    text = '\n\n'.join(cleaned_paragraphs)

    # 6. Regel 1 + 2: radbrott efter skiljetecken som sitter ihop med
    #    stor bokstav, * eller [ (inkl. skyddade wikilänkar/bilder)
    text = BREAK_RE.sub(r'\1\n\n', text)

    # 7. Radbrott efter slutparentes som sitter ihop med formaterat fält, t.ex. "(AC 1)*Description:**"
    text = re.sub(r'(\))(\*+[a-zA-ZÅÄÖåäö])', r'\1\n\n\2', text)
    text = fix_bold(text)

    # 8. Återställ länkarna
    for i, link in enumerate(links):
        text = text.replace(f"__LINK_{i}__", link)

    text = text.strip()

    # 9. Regel 3: rubriken som första ord i texten -> radbrott
    stem = os.path.splitext(os.path.basename(outpath))[0]
    stem_no_paren = re.sub(r'\s*\([^)]*\)\s*$', '', stem)   # "Plate Mail (AC 3)" -> "Plate Mail"
    stem_no_suffix = re.sub(r'\s+[A-Z]{1,4}$', '', stem_no_paren)  # "... PG" -> "..."

    text = break_after_title(text, [title, stem, stem_no_paren, stem_no_suffix])

    front = f'---\ntitle: "{title.replace(chr(34), chr(39))}"\nsource: {page_url}\n---\n\n'
    return front + text + "\n"


def block_unneeded(route):
    """FIX 2: släpp inte igenom typsnitt, media, CSS eller tredjepartsskript."""
    req = route.request
    if req.resource_type in ("font", "media", "stylesheet") or (
        req.resource_type in ("script", "xhr", "fetch")
        and "regalgoblins.com" not in req.url
    ):
        return route.abort()
    return route.continue_()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="2erules")
    ap.add_argument("--delay", type=float, default=1.5, help="sekunder mellan sidor")
    ap.add_argument("--limit", type=int, help="ladda bara ner N sidor")
    ap.add_argument("--toc-file", default="pw_toc_6.xml")
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--recycle-every", type=int, default=50,
                    help="återskapa webbläsarfliken efter så här många nedladdade sidor")
    ap.add_argument("--check", action="store_true",
                    help="lista bara vilka filer som saknas (ingen webbläsare, inga ändringar)")
    ap.add_argument("--anchor-mode", choices=["skip", "link"], default="skip",
                    help="poster med #ankare (avsnitt/tabeller på en sida som redan finns): "
                         "'skip' = ingen egen fil, 'link' = liten fil som länkar till sidan")
    ap.add_argument("--dup-mode", choices=["copy", "embed"], default="copy",
                    help="sida som står på flera ställen i XML: 'copy' = full kopia på varje "
                         "ställe, 'embed' = liten fil som bäddar in originalet")
    args = ap.parse_args()

    with open(args.toc_file, "rb") as f:
        toc_data = f.read()

    root = parse_toc(toc_data)
    pages = collect(root)
    by_url = build_index(pages)
    print(f"Hittade {len(pages)} sidor ({len(by_url)} unika URL:er).")

    # Sidan för varje URL sparas på "canonical"-sökvägen; wikilänkar pekar dit
    canon_parts = {u: pick_canonical(e)[1] for u, e in by_url.items()}
    url2path = {u: path_of(args.out, parts) for u, parts in canon_parts.items()}

    if args.check:
        report_missing(by_url, args.out, args.anchor_mode)
        return

    if not args.force:
        # Fas 0 (offline): rätta filnamn från gamla versionen + wikilänkar
        moved, touched = migrate_canonical(by_url, args.out)
        if moved:
            print(f"Flyttade {moved} sidor till rätt filnamn, rättade länkar i {touched} filer.")
        # Fas 1 (offline): kopior av sidor som står på flera ställen
        made = make_copies(by_url, args.out, args.dup_mode, args.anchor_mode)
        if made:
            print(f"Skapade {made} saknade kopior/länknoter av redan nedladdade sidor.")

    # Fas 2: ladda ner sidor vars huvudfil saknas
    todo = [(u, e) for u, e in by_url.items()
            if args.force or not os.path.exists(url2path[u])]
    if args.limit:
        todo = todo[: args.limit]
    if not todo:
        print("Inget mer att ladda ner. Klart!")
        return
    print(f"{len(todo)} sidor att ladda ner.")

    failed = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, args=["--disable-blink-features=AutomationControlled"])
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        print("\nÖppnar startsidan. Lös eventuell captcha/spärr i fönstret om det behövs.")
        page.goto(BASE)
        input("Tryck [ENTER] här i terminalen när du är redo att starta nedladdningen...\n")

        # FIX 2: aktivera blockering först nu, så captcha-lösningen inte störs
        context.route("**/*", block_unneeded)

        print("Startar nedladdning av sidor och bilder...")
        downloaded = 0
        for i, (url, entries) in enumerate(todo, 1):
            parts = canon_parts[url]
            outpath = url2path[url]
            print(f"[{i}/{len(todo)}] {' / '.join(parts)}")

            success = False
            gone = False
            for attempt in range(3):
                try:
                    resp = page.goto(url, timeout=30000, wait_until="domcontentloaded")
                    if resp is not None and resp.status in (404, 410):
                        print(f"  ! Sidan finns inte på servern (HTTP {resp.status}): {url}", file=sys.stderr)
                        gone = True
                        break
                    content = page.content()

                    if "403 - Forbidden" in content or "sgcaptcha" in content:
                        print(f"  ! Spärr upptäckt, väntar 10s (försök {attempt+1}/3)...", file=sys.stderr)
                        time.sleep(10)
                        continue

                    os.makedirs(os.path.dirname(outpath), exist_ok=True)
                    markdown_content = convert_and_download(page, content, url, url2path, outpath, args.out, parts)
                    with open(outpath, "w", encoding="utf-8") as f:
                        f.write(markdown_content)
                    # samma sida på fler ställen i XML:en -> skapa kopiorna också
                    make_extras(entries, outpath, markdown_content, args.out,
                                args.dup_mode, args.anchor_mode, force=args.force)
                    success = True
                    break
                except Exception as e:
                    print(f"  ! Fel: {e}, väntar 5s...", file=sys.stderr)
                    time.sleep(5)

            if not success:
                failed.append(url)
                if not gone:
                    print(f"  ! Misslyckades helt med: {url}", file=sys.stderr)

            # FIX 3: släpp sidans minne, och återskapa fliken med jämna mellanrum
            downloaded += 1
            try:
                if args.recycle_every and downloaded % args.recycle_every == 0:
                    page.close()
                    page = context.new_page()
                else:
                    page.goto("about:blank")
            except Exception as e:
                print(f"  ! Kunde inte rensa sidan ({e}), öppnar ny flik...", file=sys.stderr)
                try:
                    page.close()
                except Exception:
                    pass
                page = context.new_page()

            time.sleep(args.delay)

        browser.close()

    if failed:
        with open("failed_urls.txt", "w", encoding="utf-8") as f:
            f.write("\n".join(failed) + "\n")
        print(f"{len(failed)} sidor gick inte att hämta, se failed_urls.txt. "
              f"Kör skriptet igen för att försöka på nytt.")
    print("Klart!")


if __name__ == "__main__":
    main()
