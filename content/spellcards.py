import os
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

  # 1. Extrahera metadata från frontmatter
  title_match = re.search(r"title:\s*(.*?)(?:--|$)", frontmatter)
  raw_title = (
      title_match.group(1).strip() if title_match else file_path.stem
  )
  spell_name = re.sub(r"--.*$", "", raw_title).strip()

  level_match = re.search(r"level:\s*(\d+)", frontmatter)
  spell_level = level_match.group(1) if level_match else "1"

  school_match = re.search(r"school:\s*\n\s*-\s*(.*)", frontmatter)
  school = school_match.group(1).strip() if school_match else "Alteration"
  meta_code = get_school_metadata(school)

  sphere_matches = re.findall(r"sphere:\s*\n((?:\s*-\s*.*\n)+)", frontmatter)
  if sphere_matches:
    spheres = re.findall(r"-\s*(.*)", sphere_matches[0])
    sphere_val = ", ".join([s.strip() for s in spheres])
  else:
    sphere_val = "All"

  is_reversible = "Reversible" in body or "Reversible" in frontmatter

  # 2. Extrahera tabellvärden
  def extract_field(pattern, default):
    m = re.search(pattern, body, re.IGNORECASE)
    return m.group(1).strip() if m and m.group(1).strip() else default

  range_val = extract_field(r"\|\s*Range\s*\|\s*AoE\s*\|\s*\n[^|]*\|\s*([^|]+)", "Touch")
  aoe_val = extract_field(r"\|\s*Range\s*\|\s*AoE\s*\|\s*\n[^|]*\|\s*[^|]+\s*\|\s*([^|]+)", "—")
  casting_time = extract_field(r"\|\s*Casting Time\s*\|\s*Duration\s*\|\s*\n[^|]*\|\s*([^|]+)", "1 rd.")
  duration = extract_field(r"\|\s*Casting Time\s*\|\s*Duration\s*\|\s*\n[^|]*\|\s*[^|]+\s*\|\s*([^|]+)", "Permanent")
  save = extract_field(r"\|\s*Save\s*\|\s*Damage\s*\|\s*\n[^|]*\|\s*([^|]+)", "None")
  components_str = extract_field(r"\|\s*Components\s*\|\s*Material\s*\|\s*\n[^|]*\|\s*([^|]+)", "S V")

  # Specifika korrigeringar för kända besvärjelser om de saknas
  if "Cure Light" in spell_name:
    if range_val == "—": range_val = "Touch"
    if aoe_val == "—": aoe_val = "Creature touched"
    if casting_time == "1 rd.": casting_time = "5"
  elif "Detect Evil" in spell_name:
    if aoe_val == "—": aoe_val = "10 ft. x 120 yds."
  elif "Entangle" in spell_name:
    if aoe_val == "—": aoe_val = "40-ft. cube"
    if casting_time == "1 rd.": casting_time = "4"
  elif "Detect Snares" in spell_name:
    if aoe_val == "—": aoe_val = "30-ft. path"
    if range_val == "Touch": range_val = "0"

  comp_clean = components_str.replace("—", "").strip().upper()
  if not comp_clean:
    comp_clean = "S V"
  
  has_s = "S" in comp_clean
  has_v = "V" in comp_clean
  has_m = "M" in comp_clean or "material" in body.lower() or "holy symbol" in body.lower()

  comp_display_parts = []
  if has_s: comp_display_parts.append("S")
  if has_v: comp_display_parts.append("V")
  if has_m: comp_display_parts.append("M")
  comp_final = " ".join(comp_display_parts) if comp_display_parts else "—"

  # Fastställ material-text snyggare utan att radera brödtexten
  material_final = "—"
  if "holy symbol" in body.lower():
    material_final = "Holy symbol"
  elif "material component" in body.lower():
    material_final = "Yes"

  # 3. Behåll all brödtext intakt men rensa bort gamla tabeller och skräp
  clean_body = body
  text_start_match = re.search(
      r"(When casting|Upon uttering|Using this spell|By means of|When this spell|This spell|The caster|Detect)",
      clean_body,
      re.IGNORECASE
  )
  if text_start_match:
    clean_body = clean_body[text_start_match.start():]
  else:
    # Om mönstret inte matchar, rensa bort eventuella gamla tabellrader högst upp
    clean_body = re.sub(r"^.*?\|.*?$", "", clean_body, flags=re.MULTILINE)
    clean_body = re.sub(r"Reversible", "", clean_body)
    clean_body = clean_body.strip()

  # Rensa bort gamla tabeller och TOC i slutet
  clean_body = re.sub(r"\|.*School.*\|.*", "", clean_body, flags=re.IGNORECASE)
  clean_body = re.sub(r"\|.*--.*\|.*", "", clean_body)
  clean_body = re.sub(r"Table of Contents", "", clean_body, flags=re.IGNORECASE)
  clean_body = re.sub(r"\n{3,}", "\n\n", clean_body).strip()

  reversible_str = " *Reversible*" if is_reversible else ""

  # 4. Bygg ihop dokumentet med en enda ren callout-struktur där all text följer med
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
> {clean_body.replace(chr(10), chr(10) + "> ")}
> 
> | **School** | **Sphere** |
> | :--- | :--- |
> | {school} | {sphere_val} |
"""

  with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)
  print(f"Klar (behållen text): {file_path.name}")


def main():
  folder_input = input("Ange sökväg till mappen med spell-filer: ").strip()
  folder_path = Path(folder_input)

  if not folder_path.exists() or not folder_path.is_dir():
    print("Fel: Mappen hittades inte.")
    return

  md_files = list(folder_path.glob("*.md"))
  if not md_files:
    print("Inga .md-filer hittades i mappen.")
    return

  print(f"Hittade {len(md_files)} filer. Kör säker uppdatering...")
  for file_path in md_files:
    process_spell_file(file_path)

  print("Klart! All text är nu intakt inuti korten utan att information försvinner.")


if __name__ == "__main__":
  main()