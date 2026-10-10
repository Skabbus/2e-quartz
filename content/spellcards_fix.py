import re
from pathlib import Path


def get_school_metadata(school_text):
  s = school_text.lower()
  if "abjuration" in s:
    return "abj"
  if "alteration" in s:
    return "alt"
  if "conjuration" in s or "summoning" in s:
    return "con"
  if "enchantment" in s or "charm" in s:
    return "enc"
  if "greater divination" in s:
    return "gdiv"
  if "lesser divination" in s:
    return "ldiv"
  if "divination" in s:
    return "gdiv"
  if "illusion" in s:
    return "ill"
  if "invocation" in s or "evocation" in s:
    return "inv"
  if "necromancy" in s:
    return "nec"
  return "grey"


def get_field(label, text, default):
  """Hämtar värdet efter 'Label:' fram till nästa '|'.
  \\s* slukar även radbrytningar (Saving Throw har en tom rad i källan)."""
  m = re.search(rf"{label}:\s*([^|]*?)\s*\|", text, re.IGNORECASE)
  if m and m.group(1).strip():
    return m.group(1).strip()
  return default


def process_spell_file(file_path):
  with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

  if not content.startswith("---"):
    return

  parts = content.split("---", 2)
  if len(parts) < 3:
    return

  frontmatter = parts[1]
  body = parts[2].strip()

  # Redan konverterad? Hoppa över (annars förstörs kortet vid andra körningen)
  if "[!spell|" in body:
    print(f"Hoppar över (redan kort): {file_path.name}")
    return

  # 1. Metadata från frontmatter
  title_match = re.search(r"title:\s*(.*?)(?:--|$)", frontmatter, re.MULTILINE)
  raw_title = title_match.group(1).strip() if title_match else file_path.stem
  spell_name = re.sub(r"--.*$", "", raw_title).strip()

  level_match = re.search(r"level:\s*(\d+)", frontmatter)
  spell_level = level_match.group(1) if level_match else "1"

  school_match = re.search(r"school:\s*\n\s*-\s*(.*)", frontmatter)
  school = school_match.group(1).strip() if school_match else "Alteration"
  meta_code = get_school_metadata(school)

  sphere_match = re.search(r"sphere:\s*\n((?:\s*-\s*.*\n?)+)", frontmatter)
  if sphere_match:
    spheres = re.findall(r"-\s*(.*)", sphere_match.group(1))
    sphere_val = ", ".join(s.strip() for s in spheres)
  else:
    sphere_val = "All"

  # 2. Dela upp brödtexten: [rubrik + tabell] och [själva texten]
  #    Tabellen slutar efter cellen "Saving Throw: ... |"
  save_m = re.search(r"Saving Throw:\s*[^|]*\|", body, re.IGNORECASE)
  if save_m:
    header = body[:save_m.end()]
    text = body[save_m.end():]
    # Extra tabellrader efter Saving Throw (t.ex. "| within a 40-ft. radius |  |")
    extra = re.match(r"(?:[ \t]*\n[ \t]*\|[^\n]*)*", text)
    if extra and extra.group(0).strip():
      extra_cells = re.findall(r"\|\s*([^|\n]+?)\s*(?=\|)", extra.group(0))
      extra_txt = " ".join(c for c in extra_cells if c.strip())
      text = text[extra.end():]
    else:
      extra_txt = ""
  else:
    header = ""
    text = body
    extra_txt = ""

  is_reversible = bool(re.search(r"\bReversible\b", header)) or \
                  bool(re.search(r"\bReversible\b", frontmatter))

  range_val = get_field("Range", header, "—")
  aoe_val = get_field("Area of Effect", header, "—")
  if extra_txt:
    aoe_val = f"{aoe_val} ({extra_txt})" if aoe_val != "—" else extra_txt
  casting_time = get_field("Casting Time", header, "—")
  duration = get_field("Duration", header, "—")
  save = get_field("Saving Throw", header, "None")
  components_str = get_field("Components?", header, "")

  # Komponenter i ordningen S V M
  comps = set(re.findall(r"\b[VSM]\b", components_str.upper()))
  comp_final = " ".join(c for c in ("S", "V", "M") if c in comps) or "—"

  material_final = "—"
  if "M" in comps:
    # Hämta texten efter "The material component(s) is/are ..." (till slutet av meningen)
    mat_m = re.search(
        r"material components?(?:\s+(?:of|for)\s+[^.\n]*?)?\s+(?:is|are|consists? of)\s+(.+?)\.(?=\s+[A-Z\[]|\s*$)",
        text, re.IGNORECASE | re.DOTALL)
    if mat_m:
      mat = re.sub(r"\s+", " ", mat_m.group(1)).strip()
      material_final = mat[0].upper() + mat[1:]
    else:
      material_final = "See text"

  # 3. Rensa texten (men behåll länken till innehållsförteckningen)
  clean_body = text.strip()
  # Ta bort länken till innehållsförteckningen
  clean_body = re.sub(r"^\[\[[^\]]*Table of Contents[^\]]*\]\][ \t]*$", "",
                      clean_body, flags=re.MULTILINE | re.IGNORECASE)
  clean_body = re.sub(r"\n{3,}", "\n\n", clean_body).strip()

  reversible_str = " *Reversible*" if is_reversible else ""

  # 4. Bygg kortet
  quoted_body = clean_body.replace("\n", "\n> ")
  new_content = f"""---
{frontmatter.strip()}
---

> [!spell|{meta_code}] {spell_level} | {spell_name}{reversible_str}
> | Range | AoE |
> | :--- | :--- |
> | {range_val} | {aoe_val} |
> | **Casting Time** | **Duration** |
> | {casting_time} | {duration} |
> | **Save** | **Damage** |
> | {save} | — |
> | **Components** | **Material** |
> | {comp_final} | {material_final} |
> 
> {quoted_body}
> 
> | **School** | **Sphere** |
> | :--- | :--- |
> | {school} | {sphere_val} |
"""

  with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)
  print(f"Klar: {file_path.name}")


def main():
  folder_input = input("Ange sökväg till mappen med spell-filer: ").strip().strip('"')
  folder_path = Path(folder_input)

  if not folder_path.exists() or not folder_path.is_dir():
    print("Fel: Mappen hittades inte.")
    return

  md_files = list(folder_path.glob("*.md"))
  if not md_files:
    print("Inga .md-filer hittades i mappen.")
    return

  print(f"Hittade {len(md_files)} filer.")
  for file_path in md_files:
    process_spell_file(file_path)
  print("Klart!")


if __name__ == "__main__":
  main()
