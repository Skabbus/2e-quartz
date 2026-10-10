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


def fm_list_or_scalar(frontmatter, key, default):
  """Läser en frontmatter-nyckel som antingen lista (- X) eller vanligt värde (key: X)."""
  m = re.search(rf"^{key}:[ \t]*\n((?:[ \t]*-[ \t]*.*\n?)+)", frontmatter, re.MULTILINE)
  if m:
    items = [i.strip() for i in re.findall(r"-\s*(.*)", m.group(1)) if i.strip()]
    if items:
      return ", ".join(items)
  m = re.search(rf"^{key}:[ \t]*(\S.*)$", frontmatter, re.MULTILINE)
  if m:
    return m.group(1).strip()
  return default


# ---------- Format A: tabell (Player's Handbook) ----------
def get_field_table(label, text, default):
  """'Label: värde' i en tabellcell, fram till nästa '|'."""
  m = re.search(rf"{label}:\s*([^|]*?)\s*\|", text, re.IGNORECASE)
  if m and m.group(1).strip():
    return m.group(1).strip()
  return default


def split_table_format(body):
  save_m = re.search(r"Saving Throw:\s*[^|]*\|", body, re.IGNORECASE)
  if not save_m:
    return None
  header = body[:save_m.end()]
  text = body[save_m.end():]
  # Extra tabellrader efter Saving Throw (t.ex. "| within a 40-ft. radius |  |")
  extra_txt = ""
  extra = re.match(r"(?:[ \t]*\n[ \t]*\|[^\n]*)*", text)
  if extra and extra.group(0).strip():
    cells = re.findall(r"\|\s*([^|\n]+?)\s*(?=\|)", extra.group(0))
    extra_txt = " ".join(c for c in cells if c.strip())
    text = text[extra.end():]
  fields = {
      "range": get_field_table("Range", header, "—"),
      "aoe": get_field_table("Area of Effect", header, "—"),
      "casting": get_field_table("Casting Time", header, "—"),
      "duration": get_field_table("Duration", header, "—"),
      "save": get_field_table("Saving Throw", header, "None"),
      "components": get_field_table("Components?", header, ""),
  }
  if extra_txt:
    fields["aoe"] = (f"{fields['aoe']} ({extra_txt})"
                     if fields["aoe"] != "—" else extra_txt)
  return header, text, fields


# ---------- Format B: rader (Tome of Magic) ----------
def get_field_lines(label, text, default):
  """'Label: värde' på en rad. Värdet slutar vid radslut eller vid nästa
  'Etikett:' som följer efter 2+ mellanslag (flera fält på samma rad)."""
  m = re.search(
      rf"(?<![A-Za-z]){label}:[ \t]*(.*?)[ \t]*(?=[ \t]{{2,}}[A-Z][A-Za-z ]*:|$)",
      text, re.IGNORECASE | re.MULTILINE)
  if m and m.group(1).strip():
    return re.sub(r"\s{2,}", " ", m.group(1).strip())
  return default


def split_line_format(body):
  # Saving Throw-värdet kan stå på samma rad, på nästa rad efter en tom rad,
  # eller vara hopklistrat med texten ("None*Know time* is ...").
  save_m = re.search(
      r"(?<![A-Za-z])Saving Throw:[ \t]*(?:\n\s*)?([^\n*]+?)[ \t]*(?=\*|\n|$)",
      body, re.IGNORECASE | re.MULTILINE)
  if not save_m:
    return None
  header = body[:save_m.end()]
  text = body[save_m.end():]
  # Extra rader (Spells & Magic): Subtlety, Knockdown, Sensory, Critical
  extra = re.match(r"(?:[ \t]*\n[ \t]*(?:Subtlety|Knockdown|Sensory|Critical):[^\n]*)*", text)
  extra_block = extra.group(0) if extra else ""
  text = text[len(extra_block):]
  header = header + extra_block
  fields = {
      "subtlety": get_field_lines("Subtlety", extra_block, ""),
      "knockdown": get_field_lines("Knockdown", extra_block, ""),
      "sensory": get_field_lines("Sensory", extra_block, ""),
      "critical": get_field_lines("Critical", extra_block, ""),
      "range": get_field_lines("Range", header, "—"),
      "aoe": get_field_lines("Area of Effect", header, "—"),
      "casting": get_field_lines("Casting Time", header, "—"),
      "duration": get_field_lines("Duration", header, "—"),
      "save": save_m.group(1).strip() or "None",
      "components": get_field_lines("Components?", header, ""),
  }
  return header, text, fields


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

  school = fm_list_or_scalar(frontmatter, "school", "Alteration")
  meta_code = get_school_metadata(school)
  sphere_val = fm_list_or_scalar(frontmatter, "sphere", "All")

  # 2. Dela upp brödtexten i [rubrik + fält] och [själva texten]
  if re.search(r"^\s*\|.*Range:", body, re.MULTILINE):
    result = split_table_format(body)
  else:
    result = split_line_format(body)

  if result is None:
    print(f"VARNING: hittade inte spell-fälten i {file_path.name}, hoppar över")
    return
  header, text, f = result

  is_reversible = bool(re.search(r"\bReversible\b", header)) or \
                  bool(re.search(r"\bReversible\b", frontmatter))

  # Komponenter i ordningen S V M
  comps = set(re.findall(r"\b[VSM]\b", f["components"].upper()))
  comp_final = " ".join(c for c in ("S", "V", "M") if c in comps) or "—"

  material_final = "—"
  if "M" in comps:
    # Texten efter "The material component(s) is/are ..." (till slutet av meningen)
    mat_m = re.search(
        r"material components?(?:\s+(?:of|for)\s+[^.\n]*?)?\s+(?:is|are|consists? of)\s+(.+?)\.(?=\s+[A-Z\[]|\s*$)",
        text, re.IGNORECASE | re.DOTALL)
    if mat_m:
      mat = re.sub(r"\s+", " ", mat_m.group(1)).strip()
      material_final = mat[0].upper() + mat[1:]
    else:
      material_final = "See text"

  # 3. Rensa texten och ta bort länken till innehållsförteckningen
  clean_body = text.strip()
  clean_body = re.sub(r"\[\[[^\]]*Table of Contents[^\]]*\]\]", "",
                      clean_body, flags=re.IGNORECASE)
  clean_body = re.sub(r"\n{3,}", "\n\n", clean_body).strip()

  reversible_str = " *Reversible*" if is_reversible else ""

  extra_rows = ""
  if f.get("subtlety") or f.get("knockdown"):
    extra_rows += (f"> | **Subtlety** | **Knockdown** |\n"
                   f"> | {f.get('subtlety') or '—'} | {f.get('knockdown') or '—'} |\n")
  if f.get("sensory") or f.get("critical"):
    extra_rows += (f"> | **Sensory** | **Critical** |\n"
                   f"> | {f.get('sensory') or '—'} | {f.get('critical') or '—'} |\n")
  if f.get("sensory", "").endswith(","):
    print(f"VARNING: {file_path.name}: Sensory/Critical verkar vara hopblandade i källan, kontrollera manuellt")

  # 4. Bygg kortet
  quoted_body = clean_body.replace("\n", "\n> ")
  new_content = f"""---
{frontmatter.strip()}
---

> [!spell|{meta_code}] {spell_level} | {spell_name}{reversible_str}
> | Range | AoE |
> | :--- | :--- |
> | {f['range']} | {f['aoe']} |
> | **Casting Time** | **Duration** |
> | {f['casting']} | {f['duration']} |
> | **Save** | **Damage** |
> | {f['save']} | — |
> | **Components** | **Material** |
> | {comp_final} | {material_final} |
{extra_rows}> 
> {quoted_body}
> 
> | **School** | **Sphere** |
> | :--- | :--- |
> | {school} | {sphere_val} |
"""

  with open(file_path, "w", encoding="utf-8") as fh:
    fh.write(new_content)
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
