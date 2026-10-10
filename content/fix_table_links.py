#!/usr/bin/env python3
"""
fix_table_links.py

Lagar wikilänkar med alias i tabeller som har gått sönder, t.ex.

    | 1 | [[Ring of Animal Friendship#a25716c4 | Animal Friendship]] | 1,000 |

I en tabell tolkar Obsidian | som cellgräns, så länken måste skrivas med \\| :

    | 1 | [[Ring of Animal Friendship#a25716c4\\|Animal Friendship]] | 1,000 |

Skriptet:
  1. hittar [[...]]-länkar på tabellrader (rader som börjar med |) och byter
     olåsta | inuti länken mot \\| (och tar bort mellanslagen runt dem)
  2. tar bort de tomma ändkolumner som den trasiga uppdelningen lämnade kvar
     (men bara i tabeller där en länk faktiskt lagades)

Tabeller utan trasiga länkar rörs inte. Länkar utanför tabeller rörs inte.
Skriptet kan köras flera gånger utan att något ändras andra gången.

Användning:
    python fix_table_links.py "E:\\DND\\Vaults\\2erules" --dry-run
    python fix_table_links.py "E:\\DND\\Vaults\\2erules" --backup
    python fix_table_links.py "E:\\DND\\Vaults\\2erules\\Dungeon Master Guide\\Rings.md"

Flaggor:
    --dry-run   visa vad som skulle ändras, skriv ingenting
    --backup    spara originalet som <fil>.md.bak innan det ändras
    --flat      gå inte igenom undermappar (annars rekursivt)
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

LINK_RE = re.compile(r"\[\[([^\[\]\n]*?)\]\]")
BAD_PIPE_RE = re.compile(r"\s*(?<!\\)\|\s*")
CELL_SPLIT_RE = re.compile(r"(?<!\\)\|")
SEP_CELL_RE = re.compile(r":?-+:?")


def fix_links_in_line(line: str) -> tuple[str, int]:
    count = 0

    def repl(m: re.Match) -> str:
        nonlocal count
        inner, n = BAD_PIPE_RE.subn(r"\\|", m.group(1))
        count += n
        return f"[[{inner}]]"

    return LINK_RE.sub(repl, line), count


def split_row(line: str) -> list[str]:
    s = line.strip()
    if s.startswith("|"):
        s = s[1:]
    if s.endswith("|") and not s.endswith("\\|"):
        s = s[:-1]
    return [c.strip() for c in CELL_SPLIT_RE.split(s)]


def is_sep(cells: list[str]) -> bool:
    return all(SEP_CELL_RE.fullmatch(c) for c in cells)


def fix_block(block: list[str]) -> tuple[list[str], int, int]:
    """Returnerar (nya rader, antal lagade pipes, antal borttagna kolumner)."""
    fixed_lines, total = [], 0
    for line in block:
        new, n = fix_links_in_line(line)
        fixed_lines.append(new)
        total += n
    if total == 0:
        return block, 0, 0

    rows = [split_row(l) for l in fixed_lines]
    seps = [is_sep(r) for r in rows]
    ncols = max(len(r) for r in rows)
    rows = [r + [""] * (ncols - len(r)) for r in rows]

    dropped = 0
    while ncols > 1 and all(r[-1] == "" for r, s in zip(rows, seps) if not s):
        rows = [r[:-1] for r in rows]
        ncols -= 1
        dropped += 1

    out = []
    for r, s in zip(rows, seps):
        cells = ["---"] * ncols if s else r
        out.append("| " + " | ".join(cells) + " |")
    return out, total, dropped


def process(text: str) -> tuple[str, int, int]:
    eol = "\r\n" if "\r\n" in text else "\n"
    lines = text.replace("\r\n", "\n").split("\n")
    out: list[str] = []
    fixed = dropped = 0
    i = 0
    while i < len(lines):
        if not lines[i].lstrip().startswith("|"):
            out.append(lines[i])
            i += 1
            continue
        j = i
        while j < len(lines) and lines[j].lstrip().startswith("|"):
            j += 1
        new_block, n, d = fix_block(lines[i:j])
        out.extend(new_block)
        fixed += n
        dropped += d
        i = j
    return eol.join(out), fixed, dropped


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("path", type=Path, help="mapp eller enskild .md-fil")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--backup", action="store_true")
    ap.add_argument("--flat", action="store_true")
    args = ap.parse_args()

    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    if args.path.is_file():
        files = [args.path]
    elif args.path.is_dir():
        found = args.path.glob("*.md") if args.flat else args.path.rglob("*.md")
        files = sorted(p for p in found
                       if not any(part.startswith(".") for part in p.relative_to(args.path).parts))
    else:
        print(f"Hittar inte: {args.path}")
        return 1

    changed = total_pipes = total_cols = errors = 0
    for path in files:
        try:
            raw = path.read_bytes().decode("utf-8")
            bom = raw.startswith("\ufeff")
            text = raw.lstrip("\ufeff")
            new, n, d = process(text)
        except Exception as exc:
            print(f"FEL  {path}: {exc}")
            errors += 1
            continue
        if n == 0:
            continue

        changed += 1
        total_pipes += n
        total_cols += d
        print(f"{'(dry-run) ' if args.dry_run else ''}{path}  -  {n} länkar lagade, {d} tom kolumn borttagen")
        if args.dry_run:
            continue
        if args.backup:
            path.with_name(path.name + ".bak").write_bytes(path.read_bytes())
        out = ("\ufeff" if bom else "") + new
        path.write_bytes(out.encode("utf-8"))

    print("-" * 60)
    print(f"Genomsökte {len(files)} filer. Ändrade: {changed}   Lagade länkar: {total_pipes}"
          f"   Borttagna tomma kolumner: {total_cols}   Fel: {errors}"
          f"{'   (dry-run: inget skrevs)' if args.dry_run else ''}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
