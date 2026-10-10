import re
from pathlib import Path

LEVELS = {
    'first': '1', 'second': '2', 'third': '3', 'fourth': '4', 'fifth': '5',
    'sixth': '6', 'seventh': '7', 'eighth': '8', 'ninth': '9',
}

# Ankare: "Range:" (ev. med asterisker runt) som följs av "Components:" inom
# någon hundra tecken. Det är den mest stabila delen av varje formel.
ANCHOR = re.compile(r"\*{0,2}Range\s*\*{0,2}\s*:\s*\*{0,2}(?=.{0,400}?Components)", re.S)

# "(Skola)" precis före ankaret; 0-2 asterisker/understreck, valfria mellanrum.
SCHOOL_AT_END = re.compile(
    r"\(\s*[*_]*\s*([A-Za-z][A-Za-z/,\s]*?)\s*[*_]*\s*\)[\s*_]*$"
)
BOLD_AT_END = re.compile(r"\*\*\s*([^*\n]+?)\s*\*\*[\s*]*$")

LABELS = r"(Components|Duration|Casting Time|Area of Effect|Saving [Tt]hrow)"
FIELDS = re.compile(
    r"\s*(?P<range>.*?)\s*Components\s*:\s*(?P<components>.*?)\s*"
    r"Duration\s*:\s*(?P<duration>.*?)\s*"
    r"Casting Time\s*:\s*(?P<casting>.*?)\s*"
    r"Area of Effect\s*:\s*(?P<area>.*?)\s*"
    r"Saving [Tt]hrow\s*:\s*(?P<save>Neg\.?|None|Special|1/2|Half)\s*"
    r"(?P<rest>.*)",
    re.S,
)
TOC_LINK = re.compile(r"\[\[[^\]]*Table of Contents[^\]]*\]\]")


def clean_title(s):
    return re.sub(r"[*#_\[\]]", "", s).strip()


def find_spells(text):
    """Returnerar lista av dicts: title, school, title_start, body_start."""
    spells, unmatched = [], []
    prev_end = 0
    for m in ANCHOR.finditer(text):
        a = m.start()
        lo = max(prev_end, a - 300)
        pre = text[lo:a]
        sm = SCHOOL_AT_END.search(pre)
        if not sm:
            unmatched.append(text[max(0, a - 80):a + 25])
            prev_end = m.end()
            continue
        before = pre[:sm.start()]
        bm = BOLD_AT_END.search(before)
        if bm:
            title, tstart = bm.group(1), lo + bm.start()
        else:
            # Titeln kan ligga på raden före (eller sakna asterisker)
            lines = [l for l in before.split("\n") if l.strip()]
            if not lines:
                unmatched.append(text[max(0, a - 80):a + 25])
                prev_end = m.end()
                continue
            title = lines[-1]
            tstart = lo + before.rfind(lines[-1])
        title = clean_title(title)
        if len(title) < 2:
            unmatched.append(text[max(0, a - 80):a + 25])
            prev_end = m.end()
            continue
        spells.append({"title": title, "school": sm.group(1).strip(),
                       "tstart": tstart, "bstart": m.end()})
        prev_end = m.end()
    return spells, unmatched


def clean_description(text):
    text = TOC_LINK.sub("", text)
    text = re.sub(r"[ \t]*\*\*[ \t]*$", "", text, flags=re.M)
    text = re.sub(r"([.)])(The material component)", r"\1\n\n\2", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def normalize_labels(body):
    # "**Components:**" / "Components**:" -> "Components:"
    return re.sub(r"\*{0,2}" + LABELS + r"\*{0,2}\s*:\s*\*{0,2}", r"\1: ", body)


def process_folder(directory_path):
    base_dir = Path(directory_path)
    if not base_dir.is_dir():
        print(f"Fel: Hittade inte mappen {directory_path}")
        return
    spell_files = sorted(base_dir.glob("*.md"))
    if not spell_files:
        print(f"Inga .md-filer hittades i {directory_path}")
        return
    print(f"Hittade {len(spell_files)} filer att bearbeta...\n")

    for path in spell_files:
        name = path.stem.lower()
        if any(w in name for w in ("component", "description", "verbal")):
            continue
        spell_level = next((v for k, v in LEVELS.items() if k in name), "1")

        text = path.read_text(encoding="utf-8", errors="ignore")
        text = text.replace("\u00a0", " ").replace("\u200b", "")
        if text.lstrip().startswith("---"):
            parts = text.lstrip().split("---", 2)
            if len(parts) >= 3:
                text = parts[2]

        spells, unmatched = find_spells(text)
        total_anchors = len(ANCHOR.findall(text))
        if not spells:
            print(f"Hittade 0 formler i {path.name} (hoppar över)")
            for u in unmatched:
                print("   Kunde inte tolka:", repr(u))
            continue

        out_path = base_dir / path.stem
        out_path.mkdir(parents=True, exist_ok=True)

        for i, sp in enumerate(spells):
            end = spells[i + 1]["tstart"] if i + 1 < len(spells) else len(text)
            body = normalize_labels(text[sp["bstart"]:end])
            title, school_raw = sp["title"], sp["school"]

            f = FIELDS.match(body)
            if f:
                lines = [
                    f"Range: {f['range']}", f"Components: {f['components']}",
                    f"Duration: {f['duration']}", f"Casting Time: {f['casting']}",
                    f"Area of Effect: {f['area']}", f"Saving Throw: {f['save']}",
                ]
                content = "\n\n".join(lines) + "\n\n" + clean_description(f["rest"])
            else:
                print(f"  Varning: kunde inte tolka fälten i '{title}' ({path.name})")
                print("   Börjar med:", repr(body[:150]))
                content = "Range: " + clean_description(body)

            yaml = ["---", f'title: "{title}-- Level {spell_level} Spell"',
                    f'source: "{path.name}"', "type:", "  - Spell",
                    f"level: {spell_level}", "school:"]
            for s in re.split(r"[,/]", school_raw):
                if s.strip():
                    yaml.append(f"  - {s.strip()}")
            yaml.append("---")

            final = ("\n".join(yaml) + f"\n\n**{title}** ({school_raw})\n\n"
                     + content.strip() + "\n\n[[Table of Contents|Table of Contents]]\n")
            safe = re.sub(r'[\\/*?:"<>|]', "", title)
            (out_path / f"{safe}.md").write_text(final, encoding="utf-8")

        print(f"Klart! {path.name} -> {len(spells)} formler "
              f"({total_anchors} 'Range:' hittades) i '{path.stem}/'")
        for u in unmatched:
            print("   Kunde inte tolka:", repr(u))

    print("\nAlla filer har bearbetats!")


if __name__ == "__main__":
    print("--- Batch Spell Folder Splitter v16 ---")
    sokvag = input("Klistra in sökvägen till mappen: ").strip().strip("\"'")
    if sokvag:
        process_folder(sokvag)
    else:
        print("Du måste ange en sökväg.")
