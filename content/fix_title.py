import re, sys
from pathlib import Path

root = Path(sys.argv[1])          # t.ex. din content-mapp
dry = "--apply" not in sys.argv   # kör torrt som standard

fm = re.compile(r"\A---\r?\n(.*?\r?\n)---", re.S)

for p in root.rglob("*.md"):
    text = p.read_text(encoding="utf-8")
    m = fm.match(text)
    if not m:
        continue
    block = m.group(1)
    new = re.sub(r"^title:", "heading:", block, flags=re.M)
    if new != block:
        print(("[dry] " if dry else "") + str(p))
        if not dry:
            p.write_text(text[:m.start(1)] + new + text[m.end(1):], encoding="utf-8")