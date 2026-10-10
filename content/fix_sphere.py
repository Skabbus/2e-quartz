import re
from pathlib import Path

# Matchar kortets sista tabell och fångar Sphere-cellen om den är exakt "All"
SPHERE_RE = re.compile(
    r"(\|\s*\*\*School\*\*\s*\|\s*\*\*Sphere\*\*\s*\|[ \t]*\r?\n"
    r">\s*\|\s*:?-+:?\s*\|\s*:?-+:?\s*\|[ \t]*\r?\n"
    r">\s*\|[^|\n]*\|\s*)All(\s*\|)")


def fix_file(path):
  with open(path, "r", encoding="utf-8", newline="") as f:
    content = f.read()

  if "[!spell|" not in content:
    return "skip"

  # Prästformler kan ha en riktig sphere (t.ex. All) i frontmattern – rör inte dem
  parts = content.split("---", 2)
  if len(parts) >= 3 and re.search(r"^sphere:", parts[1], re.MULTILINE):
    return "skip"

  new_content, n = SPHERE_RE.subn(r"\1—\2", content)
  if n == 0:
    return "skip"

  with open(path, "w", encoding="utf-8", newline="") as f:
    f.write(new_content)
  return "fixed"


def main():
  folder = Path(input("Ange sökväg till mappen med spell-filer: ").strip().strip('"'))
  if not folder.is_dir():
    print("Fel: Mappen hittades inte.")
    return

  files = list(folder.glob("*.md"))
  fixed = 0
  for p in files:
    if fix_file(p) == "fixed":
      fixed += 1
      print(f"Fixad: {p.name}")
  print(f"Klart! {fixed} av {len(files)} filer ändrades.")


if __name__ == "__main__":
  main()
