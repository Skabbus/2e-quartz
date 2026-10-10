#!/usr/bin/env python3
"""
split_monsters.py

Delar upp Monstrous Manual-filer som har flera monster som kolumner
(t.ex. Troll.md, Human.md, "Imp, Mephit.md") i en egen fil per monster.

För varje sådan fil skapas en mapp bredvid originalet (Troll.md -> Troll/)
med t.ex. "Troll, Basic.md", "Troll, Freshwater.md" osv.
Originalfilen rörs aldrig.

Hoppas över (och rapporteras):
  - filer med ett enda monster (tvåkolumnstabell, t.ex. Tarrasque)
  - filer med horisontell layout (t.ex. Insect: ett monster per rad)

Användning:
    python split_monsters.py "E:\\DND\\Vaults\\2erules\\Monstrous Manual" --dry-run
    python split_monsters.py "E:\\DND\\Vaults\\2erules\\Monstrous Manual"

Flaggor:
    --dry-run     visa vad som skulle skapas, skriv ingenting
    --overwrite   skriv över redan existerande delfiler (annars hoppas de över)
    --recursive   gå igenom undermappar också
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

# ----------------------------- Inställningar -----------------------------
BASIC_NAME = "Basic"                 # namn när kolumnen heter samma som monstret ("Troll" -> "Troll, Basic")
SLASH_REPLACEMENT = "-"              # "/" är förbjudet i filnamn: "Thief/Thug" -> "Thief-Thug"
TITLE_SUFFIX = " (Monstrous Manual)"
KEEP_ORIGINAL_URL = True             # lägg till url: med den ursprungliga webbadressen
# -------------------------------------------------------------------------

FRONTMATTER_RE = re.compile(r"\A---\n(.*?)\n---\n?", re.S)
IMAGE_RE = re.compile(r"^!\[\[.+?\]\]\s*$")
LABEL_RE = re.compile(r"^\*\*.+:\*\*$")
CELL_SPLIT_RE = re.compile(r"(?<!\\)\|")
SEPARATOR_CELL_RE = re.compile(r":?-{3,}:?")


class Skip(Exception):
    """Filen ska hoppas över; texten är anledningen."""


def split_row(line: str) -> list[str]:
    s = line.strip()
    if s.startswith("|"):
        s = s[1:]
    if s.endswith("|") and not s.endswith("\\|"):
        s = s[:-1]
    return [c.strip() for c in CELL_SPLIT_RE.split(s)]


def is_separator(cells: list[str]) -> bool:
    return all(SEPARATOR_CELL_RE.fullmatch(c) for c in cells)


def clean_name(cell: str) -> str:
    s = re.sub(r"<br\s*/?>", " ", cell)
    s = s.replace("**", "")
    return re.sub(r"\s+", " ", s).strip()


def parse_file(text: str, fallback_name: str):
    """Returnerar (basnamn, bildrader, url, [(monsternamn, [(etikett, värde), ...]), ...])."""
    text = text.lstrip("\ufeff").replace("\r\n", "\n")

    url = None
    body = text
    fm = FRONTMATTER_RE.match(text)
    if fm:
        m = re.search(r'^source:\s*"?(.*?)"?\s*$', fm.group(1), re.M)
        url = m.group(1) if m else None
        body = text[fm.end():]

    lines = body.split("\n")

    # Första sammanhängande tabellen = statistiktabellen
    start = next((i for i, l in enumerate(lines) if l.lstrip().startswith("|")), None)
    if start is None:
        raise Skip("ingen tabell")
    end = start
    while end < len(lines) and lines[end].lstrip().startswith("|"):
        end += 1

    head = lines[:start]
    images = [l.strip() for l in head if IMAGE_RE.match(l.strip())]
    base = next(
        (l.strip() for l in head if l.strip() and not IMAGE_RE.match(l.strip())),
        fallback_name,
    )

    rows = [split_row(l) for l in lines[start:end]]
    rows = [r for r in rows if not is_separator(r)]
    ncols = max(len(r) for r in rows)

    if ncols <= 2:
        raise Skip("ett monster (tvåkolumnstabell)")
    if sum(1 for r in rows if LABEL_RE.match(r[0])) < 3:
        raise Skip("horisontell layout (monster på rader, inga **ETIKETT:**-rader)")

    monsters: list[tuple[str, list[tuple[str, str]]]] = []
    cols: list[tuple[int, list] | None] | None = None

    for r in rows:
        r = r + [""] * (ncols - len(r))
        if not any(r):
            continue  # tom avskiljarrad
        first, rest = r[0], r[1:]

        if not first and any(rest):
            # namnrad: startar ett nytt block
            cols = []
            for i, cell in enumerate(rest, start=1):
                name = clean_name(cell)
                if name:
                    entry = (name, [])
                    monsters.append(entry)
                    cols.append((i, entry[1]))
                else:
                    cols.append(None)
            continue

        if cols is None:
            raise Skip("datarad före första namnraden")
        if first:
            for item in cols:
                if item:
                    idx, store = item
                    store.append((first, r[idx]))

    monsters = [m for m in monsters if m[1]]
    if not monsters:
        raise Skip("hittade inga monster")
    return base, images, url, monsters


def full_name(base: str, name: str) -> str:
    if name.casefold() == base.casefold():
        return f"{base}, {BASIC_NAME}"
    if name.casefold().startswith(base.casefold() + ","):
        return name
    return f"{base}, {name}"


def safe_filename(name: str) -> str:
    s = re.sub(r"\s*/\s*", SLASH_REPLACEMENT, name)
    s = re.sub(r'[<>:"\\|?*\x00-\x1f]', "", s)
    return re.sub(r"\s+", " ", s).strip(" .")


def yaml_str(s: str) -> str:
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def render(display: str, orig_name: str, url: str | None, images: list[str],
           rows: list[tuple[str, str]]) -> str:
    fm = ["---", f"title: {yaml_str(display + TITLE_SUFFIX)}", f'source: "[[{orig_name}]]"']
    if KEEP_ORIGINAL_URL and url:
        fm.append(f"url: {yaml_str(url)}")
    fm.append("---")

    parts = ["\n".join(fm), "", display, ""]
    if images:
        parts += ["\n".join(images), ""]
    table = ["|  |  |", "| --- | --- |"] + [f"| {label} | {value} |" for label, value in rows]
    parts.append("\n".join(table))
    return "\n".join(parts) + "\n"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("folder", type=Path, help="mapp med .md-filer")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--overwrite", action="store_true")
    ap.add_argument("--recursive", action="store_true")
    args = ap.parse_args()

    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    if not args.folder.is_dir():
        print(f"Hittar inte mappen: {args.folder}")
        return 1

    files = sorted(args.folder.rglob("*.md") if args.recursive else args.folder.glob("*.md"))

    created = existed = 0
    split_sources = 0
    skipped: list[tuple[str, str]] = []

    for path in files:
        try:
            text = path.read_text(encoding="utf-8-sig")
            base, images, url, monsters = parse_file(text, path.stem)
        except Skip as why:
            skipped.append((path.name, str(why)))
            continue
        except Exception as exc:  # oväntat format
            skipped.append((path.name, f"fel vid inläsning: {exc}"))
            continue

        out_dir = path.parent / path.stem
        split_sources += 1
        print(f"\n{path.name}  ->  {out_dir.name}/  ({len(monsters)} monster)")

        used: set[str] = set()
        for name, rows in monsters:
            display = full_name(base, name)
            fname = safe_filename(display)
            key = fname.casefold()
            n = 2
            while key in used:  # krock efter filnamnstvätt
                fname = f"{safe_filename(display)} ({n})"
                key = fname.casefold()
                n += 1
            used.add(key)

            target = out_dir / f"{fname}.md"
            if target.exists() and not args.overwrite:
                print(f"   finns redan, hoppar över: {target.name}")
                existed += 1
                continue

            print(f"   {'(dry-run) ' if args.dry_run else ''}{target.name}")
            if not args.dry_run:
                out_dir.mkdir(exist_ok=True)
                target.write_text(render(display, path.name, url, images, rows),
                                  encoding="utf-8", newline="\n")
            created += 1

    print("\n" + "-" * 60)
    print(f"Delade filer: {split_sources}   Nya delfiler: {created}   Fanns redan: {existed}"
          f"{'   (dry-run: inget skrevs)' if args.dry_run else ''}")
    if skipped:
        # visa bara skäl som är intressanta; enmonsterfiler är många och väntade
        interesting = [(n, r) for n, r in skipped if not r.startswith("ett monster")]
        n_single = len(skipped) - len(interesting)
        print(f"Hoppade över {len(skipped)} filer ({n_single} med ett monster).")
        for n, r in interesting:
            print(f"   {n}: {r}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
