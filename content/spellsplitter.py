import os
import re
from pathlib import Path

def parse_and_split_spells(source_file_path, output_dir):
    path = Path(source_file_path)
    if not path.exists():
        print(f"Fel: Hittade inte filen {source_file_path}")
        return

    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()

    # Hämta nivå från filnamnet (t.ex. "Fifth-level Spells.md" -> 5)
    file_name = path.stem.lower()
    level_map = {
        'first-level': '1', 'second-level': '2', 'third-level': '3', 
        'fourth-level': '4', 'fifth-level': '5', 'sixth-level': '6', 'seventh-level': '7'
    }
    level = "5" # Standardval om den inte hittar
    for key, val in level_map.items():
        if key in file_name:
            level = val
            break

    # Vi delar upp texten baserat på mönstret där en formel börjar: 
    # T.ex. "**Cloudscape** (Alteration)" eller "Nature's Charm (Enchantment/Charm)"
    # Vi söker efter en radbrytning följt av valfri fetstil eller text, följt av en skola inom parentes.
    
    # Låt oss rensa bort den befintliga frontmattern först så den inte skapar problem
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            text = parts[2]

    # Delar upp texten vid varje formelnamn som följs av skola i parentes
    # Exempel: **Cloudscape** (Alteration) eller Nature's Charm (Enchantment/Charm)
    pattern = r'\n(?=[^\n]+\s*\([A-Za-z/,\s]+\)Sphere:)'
    spell_blocks = re.split(pattern, text)
    
    out_path = Path(output_dir)
    out_path.mkdir(parents=True, exist_ok=True)
    
    count = 0
    for block in spell_blocks:
        block = block.strip()
        if not block or "Table of Contents" in block and len(block) < 30:
            continue
            
        # Extrahera titel och skola från början av blocket
        header_match = re.search(r'^(\*\*.*?\*\*|[A-Za-z\s\-\']+?)\s*\(([A-Za-z/,\s]+)\)', block)
        if not header_match:
            continue
            
        raw_title = header_match.group(1).replace('*', '').strip()
        school = header_match.group(2).strip()
        
        spell_title = raw_title
        
        # Städa upp brödtexten och lägg till radbrytningar före nyckelord
        body = block
        keywords = ['Sphere', 'Range', 'Components', 'Duration', 'Casting Time', 'Area of Effect', 'Saving Throw']
        for kw in keywords:
            body = re.sub(rf'({kw}:)', r'\n\1', body)
            
        # Extrahera sfär
        sphere_match = re.search(r'Sphere:\s*([A-Za-z\s\(\),]+?)(?=\n|Range|Components|Duration|Casting|Area|Saving|$)', body)
        sphere = sphere_match.group(1).strip() if sphere_match else None

        # Bygg YAML-frontmatter
        yaml_lines = [
            "---",
            f'title: "{spell_title}-- {level}th Level Priest Spell (Comp. Druid\'s Handbook)"',
            f'source: "https://regalgoblins.com/2erules/CDH/DD05090.htm"',
            "type:",
            "  - Spell",
            f"level: {level}",
            "school:",
        ]
        for s in school.split('/'):
            yaml_lines.append(f"  - {s.strip()}")
            
        if sphere:
            yaml_lines.append(f"sphere: {sphere}")
            
        yaml_lines.append("---")
        
        final_content = "\n".join(yaml_lines) + "\n\n" + body + "\n\n[[The Complete Druid's Handbook/Table of Contents|Table of Contents]]\n"
        
        # Spara till enskild fil
        safe_title = re.sub(r'[\\/*?:"<>|]', "", spell_title)
        spell_file = out_path / f"{safe_title}.md"
        
        with open(spell_file, 'w', encoding='utf-8') as sf:
            sf.write(final_content)
            
        print(f"Skapade fil: {spell_file.name}")
        count += 1

    print(f"\nKlar! Splittade och formaterade {count} formler till mappen '{output_dir}'.")

if __name__ == "__main__":
    print("--- D&D Bulk Spell Splitter v2 ---")
    fil_vokvag = input("Klistra in sökvägen till din stora textfil (.md): ").strip().strip('"\'')
    mapp_mal = input("Ange namn på mappen där de enskilda filerna ska sparas: ").strip().strip('"\'')
    
    if fil_vokvag and mapp_mal:
        parse_and_split_spells(fil_vokvag, mapp_mal)
    else:
        print("Du måste ange både fil och målnamn.")