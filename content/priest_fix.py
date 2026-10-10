import os
import re
from pathlib import Path

def clean_and_format_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        print(f"Kunde inte läsa {file_path.name}: {e}")
        return

    # 1. Rensa bort skräptecken/artefakter i början av filen
    # Letar efter den första förekomsten av ett riktigt ord eller en rubrik/titel
    lines = content.splitlines()
    clean_lines = []
    started = False

    for line in lines:
        # Om raden ser ut som ren skräptext (mycket konstiga tecken), hoppa över den tills vi hittar rikt innehåll
        if not started:
            # En giltig rad brukar börja med bokstäver, titlar eller fältnamn
            if re.search(r'[A-Za-z]+', line) and not re.search(r'[\%\$\#\@\^\&\*\<\>\[\]\{\}]{3,}', line):
                started = True
            elif line.startswith('title:') or 'Spells' in line:
                started = True
        
        if started:
            clean_lines.append(line)

    body = "\n".join(clean_lines).strip()

    # 2. Hämta nivå automatiskt från mappsökvägen (t.ex. "Fifth-Level Spells" -> 5)
    level = None
    path_str = str(file_path)
    level_map = {
        'First-Level': '1', 'Second-Level': '2', 'Third-Level': '3', 
        'Fourth-Level': '4', 'Fifth-Level': '5', 'Sixth-Level': '6', 'Seventh-Level': '7'
    }
    for level_name, num in level_map.items():
        if level_name in path_str:
            level = num
            break

    # 3. Extrahera titel från filnamnet om den saknas i texten
    file_title = file_path.stem.replace('.md', '').replace('.mdux', '')

    # Standardisera fält och radbrytningar
    keywords = ['Sphere', 'Range', 'Component', 'Components', 'Duration', 'Casting Time', 'Area of Effect', 'Saving Throw', 'Subtlety', 'Knockdown', 'Sensory', 'Critical']
    for kw in keywords:
        body = re.sub(r'([a-zA-Z0-9\-\)\.\"\']+?)(' + kw + r':)', r'\1\n\2', body)

    # Hämta skola
    school_match = re.search(r'\(([A-Za-z/,\s]+)\)', body)
    schools = []
    if school_match:
        raw_schools = school_match.group(1)
        for s in raw_schools.split(','):
            if s.strip():
                schools.append(s.strip())

    # Hämta sfär
    sphere_match = re.search(r'Sphere:\s*([A-Za-z\s]+?)(?=\n|Range|Component|Duration|Casting|Area|Saving|$)', body)
    sphere = sphere_match.group(1).strip() if sphere_match else None

    # 4. Skapa ny YAML-frontmatter
    yaml_lines = ["---"]
    yaml_lines.append(f'title: "{file_title}"')
    yaml_lines.append(f'source: "Appendix 2 - New Priest Spells"')
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

    # Sätt ihop det färdiga innehållet
    final_content = "\n".join(yaml_lines) + "\n\n" + body + "\n"

    # Skriv till filen igen (eller spara som .md om de slutar på .mdux)
    new_file_path = file_path.with_suffix('.md')
    with open(new_file_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    # Om filen hette .mdux kan vi rensa bort gamla filen om vi skapat en .md
    if file_path.suffix == '.mdux' and new_file_path != file_path:
        os.remove(file_path)

    print(f"Rensad och formaterad: {file_path.name}")

def process_vault(root_dir):
    path = Path(root_dir)
    if not path.exists():
        print(f"Fel: Sökvägen '{root_dir}' existerar inte.")
        return
        
    count = 0
    # Sök efter både .md och .mdux filer rekursivt
    for file_path in path.rglob('*.*'):
        if file_path.suffix in ['.md', '.mdux']:
            clean_and_format_file(file_path)
            count += 1
        
    print(f"\nKlar! Bearbetade totalt {count} filer.")

if __name__ == "__main__":
    print("--- D&D Priest Spells Cleaner & Formatter ---")
    mapp_sokvag = input("Klistra in sökvägen till mappen (t.ex. 'Appendix 2- New Priest Spells') och tryck Enter: ").strip()
    mapp_sokvag = mapp_sokvag.strip('"\'')
    
    if mapp_sokvag:
        process_vault(mapp_sokvag)
    else:
        print("Ingen sökväg angavs.")