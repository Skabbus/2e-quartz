import os
import re
from pathlib import Path

def clean_spell_file(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # 1. Separera frontmatter (YAML) om den finns
    frontmatter = ""
    body = content
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            frontmatter = "---" + parts[1] + "---\n"
            body = parts[2].strip()

    # 2. Rensa bort tabellartefakter
    body = re.sub(r'^\s*---\s*---\s*$', '', body, flags=re.MULTILINE)
    body = re.sub(r'\|\s*\|', '', body)

    # 3. Slå ihop fält vars värden har hamnat på raden under (tillåter flera radbrytningar och mellanslag)
    fields = [
        'Sphere', 'Range', 'Components', 'Component', 'Duration', 
        'Casting Time', 'Area of Effect', 'Saving Throw', 
        'Subtlety', 'Knockdown', 'Sensory', 'Critical'
    ]
    for field in fields:
        # Matchar t.ex. "Saving Throw:\nNone" eller "Sensory:\n\nModerate visual"
        pattern = rf'({field}:\s*)\n+\s*([A-Za-z0-9\+\-\.\s/]+)'
        body = re.sub(pattern, r'\1\2', body)

    # Kör en extra vända för att fånga upp värden som hamnat på raden under (utan mellanslag)
    for field in fields:
        pattern = rf'({field}:)\s*\n([A-Za-z0-9\+\-\.\s/]+)'
        body = re.sub(pattern, r'\1 \2', body)

    # 4. Städa upp trasiga Obsidian-länkar i slutet (sätter dit Table of Contents korrekt)
    body = re.sub(r'\[\[(.*?)Table of ContentsTable of Contents\]\]', r'[[\1|Table of Contents]]', body)
    body = re.sub(r'\[\[([^\]\|]+?)Table of Contents\]\]', r'[[\1|Table of Contents]]', body)
    # Fångar upp om det blev typ [[Mapp/|Table of Contents]] och sätter rätt filnamn före pipen
    body = re.sub(r'\[\[(.*?[/\\])/?\|Table of Contents\]\]', r'[[\1/Table of Contents|Table of Contents]]', body)

    # 5. Städa upp överflödiga tomma rader
    body = re.sub(r'\n{3,}', '\n\n', body)

    lines = body.splitlines()
    cleaned_lines = [line.rstrip() for line in lines]
    
    final_body_lines = []
    prev_empty = False
    for line in cleaned_lines:
        if line == "":
            if not prev_empty:
                final_body_lines.append("")
            prev_empty = True
        else:
            final_body_lines.append(line)
            prev_empty = False

    body = "\n".join(final_body_lines).strip()

    # Sätt ihop frontmatter och brödtext igen
    if frontmatter:
        final_content = frontmatter.strip() + "\n\n" + body + "\n"
    else:
        final_content = body + "\n"

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print(f"Fixad: {file_path.name}")

def process_vault(root_dir):
    path = Path(root_dir)
    if not path.exists():
        print(f"Fel: Sökvägen '{root_dir}' existerar inte.")
        return
        
    count = 0
    for md_file in path.rglob('*.md'):
        clean_spell_file(md_file)
        count += 1
        
    print(f"\nKlar! Bearbetade totalt {count} filer.")

if __name__ == "__main__":
    print("--- D&D Spell Cleaner & Formatter ---")
    mapp_sokvag = input("Klistra in sökvägen till mappen och tryck Enter: ").strip()
    mapp_sokvag = mapp_sokvag.strip('"\'')
    
    if mapp_sokvag:
        process_vault(mapp_sokvag)
    else:
        print("Ingen sökväg angavs.")