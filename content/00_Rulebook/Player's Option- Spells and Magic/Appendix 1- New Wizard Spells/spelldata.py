import os
import re
from pathlib import Path

def clean_and_add_metadata(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.splitlines()
    
    # 1. Extrahera befintlig titel och källa
    title = ""
    source = ""
    body_lines = []
    
    in_frontmatter = False
    frontmatter_checked = False

    for line in lines:
        if not frontmatter_checked:
            frontmatter_checked = True
            if line.strip() == "---":
                in_frontmatter = True
                continue
        
        if in_frontmatter:
            if line.strip() == "---":
                in_frontmatter = False
                continue
            if line.startswith('title:'):
                title = line.split(':', 1)[1].strip().strip('"\'')
            elif line.startswith('source:'):
                source = line.split(':', 1)[1].strip().strip('"\'')
            continue

        if not title and line.startswith('title:'):
            title = line.split(':', 1)[1].strip().strip('"\'')
            continue
        if not source and line.startswith('source:'):
            source = line.split(':', 1)[1].strip().strip('"\'')
            continue

        if not body_lines and any(line.startswith(p) for p in ['type:', 'level:', 'school:', 'sphere:', '- ']):
            continue

        body_lines.append(line)

    body = "\n".join(body_lines).strip()

    # Rensa bort markdown-tabelltecken (|) och spridda tabellrester
    body = re.sub(r'\|', '', body)

    # Lägg till radbrytning om skolan sitter ihop direkt med formelnamnet
    body = re.sub(r'^([A-Za-z\s\-\,\.\'\"]+)(\([A-Z][A-Za-z/,\s]+\))', r'\1\n\2', body, flags=re.MULTILINE)

    # Ta bort eventuella överblivna markdown-stjärnor
    body = re.sub(r'\*{2,}', '', body)

    # 2. Fixa radbrytningar där fält har klistrats ihop
    keywords = [
        'Sphere', 'Range', 'Component', 'Components', 'Duration', 
        'Casting Time', 'Casting time', 'Area of Effect', 'Saving Throw',
        'Subtlety', 'Knockdown', 'Sensory', 'Critical'
    ]
    for kw in keywords:
        body = re.sub(r'([a-zA-Z0-9\-\)\.\"\']+?)(' + kw + r':)', r'\1\n\2', body)

    # Separera formelskolan från efterföljande text
    body = re.sub(r'(\([A-Za-z/,\s]+\))([A-Za-z])', r'\1 \2', body)

    # 3. Extrahera nivå (Level) - letar både efter siffror ("1st", "2nd") och ord ("Second-Level", "First-Level")
    level = None
    level_match_digits = re.search(r'(\d+)(?:st|nd|rd|th)\s+Level', title, re.IGNORECASE)
    if level_match_digits:
        level = level_match_digits.group(1)
    else:
        # Ordlist-mappning för ord som "Second-Level"
        word_to_num = {
            'first': '1', 'second': '2', 'third': '3', 'fourth': '4', 
            'fifth': '5', 'sixth': '6', 'seventh': '7', 'eighth': '8', 'ninth': '9'
        }
        for word, num in word_to_num.items():
            if re.search(rf'{word}-level', title, re.IGNORECASE):
                level = num
                break

    # Hämta skolor
    school_match = re.search(r'\(([A-Za-z/,\s]+)\)', body)
    schools = []
    if school_match:
        raw_schools = school_match.group(1)
        parts = [s.strip() for s in raw_schools.split(',')]
        for p in parts:
            if p:
                schools.append(p)

    sphere_match = re.search(r'Sphere:\s*([A-Za-z\s]+?)(?=\n|Range|Component|Duration|Casting|Area|Saving|Subtlety|Knockdown|Sensory|Critical|$)', body)
    sphere = sphere_match.group(1).strip() if sphere_match else None

    # 4. Bygg upp den korrekta YAML-frontmattern
    yaml_lines = ["---"]
    if title:
        yaml_lines.append(f'title: "{title}"')
    if source:
        yaml_lines.append(f"source: {source}")
    
    yaml_lines.append("type:")
    yaml_lines.append("  - Spell")
    
    if level:
        yaml_lines.append(f"level: {level}")
        
    if schools:
        yaml_lines.append("school:")
        for s in schools:
            yaml_lines.append(f"  - {s}")
            
    if sphere:
        yaml_lines.append(f"sphere: {sphere}")
    
    yaml_lines.append("---")

    # Snygga till mellanrum mellan fält och brödtext
    body = re.sub(r'((?:Saving Throw|Critical|Sensory|Knockdown|Subtlety):\s*[A-Za-z\s\-\.\+\d]*)([A-Z])', r'\1\n\n\2', body)

    # Sätt ihop allt
    final_content = "\n".join(yaml_lines) + "\n\n" + body + "\n"

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print(f"Bearbetad: {file_path.name}")

def process_vault(root_dir):
    path = Path(root_dir)
    if not path.exists():
        print(f"Fel: Sökvägen '{root_dir}' existerar inte.")
        return
        
    count = 0
    for md_file in path.rglob('*.md'):
        clean_and_add_metadata(md_file)
        count += 1
        
    print(f"\nKlar! Bearbetade totalt {count} filer.")

if __name__ == "__main__":
    print("--- D&D Spell Metadata & Formatter ---")
    mapp_sokvag = input("Klistra in sökvägen till mappen och tryck Enter: ").strip()
    mapp_sokvag = mapp_sokvag.strip('"\'')
    
    if mapp_sokvag:
        process_vault(mapp_sokvag)
    else:
        print("Ingen sökväg angavs.")