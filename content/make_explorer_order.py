#!/usr/bin/env python3
"""Bygger explorer-order.json (Quartz-slug -> position bland syskon) från sortspec.md.

Användning:
  python make_explorer_order.py sortspec.md explorer-order.json
  python make_explorer_order.py sortspec.md explorer-order.json --check public/static/contentIndex.json

--check jämför specens slugs mot en byggd sajts contentIndex.json och
skriver ut poster som inte matchar (t.ex. för att slugifieringen skiljer sig).
"""
import argparse
import json
import re
import sys
from pathlib import Path


def slugify(path: str) -> str:
    """Efterliknar Quartz slugifiering av sökvägssegment."""
    def seg(s: str) -> str:
        s = re.sub(r"\s", "-", s)
        s = s.replace("&", "-and-")
        s = s.replace("%", "-percent")
        s = s.replace("?", "")
        s = s.replace("#", "")
        return s
    return "/".join(seg(p) for p in path.split("/")).rstrip("/")


def parse(spec_path: str):
    lines = Path(spec_path).read_text(encoding="utf-8").splitlines()
    start = next((i for i, l in enumerate(lines) if l.startswith("sorting-spec:")), None)
    if start is None:
        sys.exit("Hittar inte 'sorting-spec:' i filen")

    blocks = []  # [(folder, [namn, ...])]
    cur = None
    for raw in lines[start + 1:]:
        if raw.strip() == "":
            cur = None            # tomrad avslutar blocket
            continue
        if not raw.startswith(" "):
            break                 # slut på det indragna spec-blocket
        line = raw[2:].rstrip()   # ta bort YAML-indraget (2 mellanslag)
        if line.startswith("target-folder:"):
            folder = line.split(":", 1)[1].strip()
            cur = ("" if folder == "/" else folder.strip("/"), [])
            blocks.append(cur)
        elif cur is not None:
            name = line[2:] if line.startswith("% ") else line  # '% '-prefix från make_sortspec.py
            if name.lower().endswith(".md"):
                name = name[:-3]
            cur[1].append(name)
    return blocks


def main():
    ap = argparse.ArgumentParser(description="Bygg explorer-order.json från sortspec.md")
    ap.add_argument("spec")
    ap.add_argument("out")
    ap.add_argument("--check", help="sökväg till contentIndex.json från en byggd sajt")
    a = ap.parse_args()
    spec_path, out_path, check = a.spec, a.out, a.check

    order = {}
    for folder, names in parse(spec_path):
        for pos, name in enumerate(names):
            path = f"{folder}/{name}" if folder else name
            order[slugify(path)] = pos

    Path(out_path).write_text(
        json.dumps(order, ensure_ascii=False, indent=0), encoding="utf-8"
    )
    print(f"Skrev {len(order)} poster till {out_path}")

    if check:
        index = json.loads(Path(check).read_text(encoding="utf-8"))
        files = set(index.keys())
        folders = set()
        for s in files:
            parts = s.split("/")
            for i in range(1, len(parts)):
                folders.add("/".join(parts[:i]))
        missing = [s for s in order if s not in files and s not in folders]
        print(f"{len(missing)} av {len(order)} slugs hittades inte i {check}")
        for s in missing[:50]:
            print("  saknas:", s)
        if len(missing) > 50:
            print(f"  ... och {len(missing) - 50} till")


if __name__ == "__main__":
    main()
