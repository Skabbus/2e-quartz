import os
import re
from pathlib import Path

def parse_and_split_elf_spells(source_file_path, output_dir):
    path = Path(source_file_path)
    if not path.exists():
        print(f"Fel: Hittade inte filen {source_file_path}")
        return

    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()

    # Rensa bort eventuell befintlig frontmatter om den finns i början
    if text.strip().startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            text = parts[2]

    # Uppdaterat mönster som fångar formler med fetstil runt namnet (t.ex. **Camouflage**)
    pattern = r'(?m)^\*\*([A-Z][A-Za-z\s\-\']+?)\*\*\s*\(([A-Za-z/,\s]+)\)'
    
    matches = list(re.finditer(pattern, text))
    print(f"Debug: Hittade {len(matches)} formler via mönstret.")

    if not matches:
        print("Inga formler hittades. Kontrollera att filen har rätt format.")
        return

    out_path = Path(output_dir)
    out_path.mkdir(parents=True, exist_ok=True)
    
    count = 0
    for i in range(len(matches)):
        start_pos = matches[i].start()
        end_pos = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        
        block = text[start_pos:end_pos].strip()
        if not block or "Table of Contents" in block and len(block) < 30:
            continue
            
        spell_title = matches[i].group(1).strip()
        school_raw = matches[i].group(2).strip()
        
        # Extrahera nivå-raden
        level_match = re.search(r'Level:\s*([^\n]+?)(?=Range|$)', block)
        level_text = level_match.group(1).strip() if level_match else ""

        # 1. Hämta enbart siffran för 'level'
        num_match = re.search(r'\d+', level_text)
        spell_level = num_match.group(0) if num_match else "1"

        # 2. Avgör spellist (Wizard och/eller Priest)
        spellists = []
        lower_level_text = level_text.lower()
        if 'wiz' in lower_level_text:
            spellists.append("Wizard")
        if 'pr' in lower_level_text:
            spellists.append("Priest")

        # Städa upp brödtexten och lägg till radbrytningar före nyckelord
        body = block
        keywords = ['Level', 'Range', 'Components', 'Duration', 'Casting Time', 'Area of Effect', 'Saving Throw']
        for kw in keywords:
            body = re.sub(rf'({kw}:)', r'\n\1', body)
            
        # Ta bort eventuella eftersläpande stjärnor
        body = re.sub(r'(\*\*|\*)', '', body)

        # Bygg YAML-frontmatter
        yaml_lines = [
            "---",
            f'title: "{spell_title}-- Elf Spell"',
            f'source: "https://regalgoblins.com/2erules/CBE/DD04808.htm"',
            "type:",
            "  - Spell",
            f'level: {spell_level}',
        ]

        if spellists:
            yaml_lines.append("spellist:")
            for sl in spellists:
                yaml_lines.append(f"  - {sl}")

        yaml_lines.append("school:")
        
        schools = re.split(r'[,/]', school_raw)
        for s in schools:
            if s.strip():
                yaml_lines.append(f"  - {s.strip()}")
                
        yaml_lines.append("---")
        
        final_content = "\n".join(yaml_lines) + "\n\n" + body.strip() + "\n\n[[The Complete Book of Elves/Table of Contents|Table of Contents]]\n"
        
        safe_title = re.sub(r'[\\/*?:"<>|]', "", spell_title)
        spell_file = out_path / f"{safe_title}.md"
        
        with open(spell_file, 'w', encoding='utf-8') as sf:
            sf.write(final_content)
            
        print(f"Skapade fil: {spell_file.name}")
        count += 1

    print(f"\nKlar! Splittade och formaterade {count} formler till mappen '{output_dir}'.")

if __name__ == "__main__":
    print("--- Elf Spell Bulk Splitter v4 ---")
    fil_vokvag = input("Klistra in sökvägen till din textfil (.txt eller .md): ").strip().strip('"\'')
    mapp_mal = input("Ange namn på mappen där de enskilda filerna ska sparas: ").strip().strip('"\'')
    
    if fil_vokvag and mapp_mal:
        parse_and_split_elf_spells(fil_vokvag, mapp_mal)
    else:
        print("Du måste ange både fil och målnamn.")