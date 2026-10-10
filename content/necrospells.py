import os
import re
from pathlib import Path

SPELL_ATTRIBUTES = [
    "Range:", "Components:", "Duration:", "Casting Time:", 
    "Area of Effect:", "Saving Throw:", "Sphere:", "School:", "Level:"
]

def is_spell_file(content):
    """Kontrollerar om filen innehåller kännetecken för en spell."""
    matches = sum(1 for attr in SPELL_ATTRIBUTES if attr in content)
    return matches >= 3

def fix_line_breaks(content):
    """Lägger till radbrytningar före kända spell-attribut om de sitter ihop."""
    fixed_content = content
    for attr in SPELL_ATTRIBUTES:
        pattern = re.compile(r'([^\n])(' + re.escape(attr) + r')')
        fixed_content = pattern.sub(r'\1\n\2', fixed_content)
    return fixed_content

def extract_metadata(content):
    """Extraherar skola/sfär och gissar nivå/spellist baserat på texten."""
    metadata = {
        "type": ["Spell"],
    }
    
    school_match = re.search(r'\*\*.*?\*\*\s*\(([^)]+)\)', content)
    if school_match:
        schools = [s.strip() for s in school_match.group(1).split(',')]
        if any("Sphere" in attr or "Sphere:" in content for attr in SPELL_ATTRIBUTES):
            metadata["sphere"] = schools
            metadata["spellist"] = ["Priest"]
        else:
            metadata["school"] = schools
            metadata["spellist"] = ["Wizard", "Necromancer"]
    
    level_match = re.search(r'(?:Level|Nivå)[:\s]*(\d+)', content, re.IGNORECASE)
    if level_match:
        metadata["level"] = int(level_match.group(1))
    else:
        metadata["level"] = 3

    return metadata

def generate_frontmatter(metadata, existing_title, existing_source):
    """Bygger YAML Frontmatter-strängen."""
    fm = "---\n"
    fm += f'title: "{existing_title}"\n'
    if existing_source:
        fm += f'source: {existing_source}\n'
    
    fm += "type:\n"
    for t in metadata.get("type", ["Spell"]):
        fm += f"  - {t}\n"
        
    if "level" in metadata:
        fm += f'level: {metadata["level"]}\n'
        
    if "school" in metadata:
        fm += "school:\n"
        for s in metadata["school"]:
            fm += f"  - {s}\n"
            
    if "sphere" in metadata:
        fm += "sphere:\n"
        for s in metadata["sphere"]:
            fm += f"  - {s}\n"
            
    if "spellist" in metadata:
        fm += "spellist:\n"
        for sl in metadata["spellist"]:
            fm += f"  - {sl}\n"
            
    fm += "---\n\n"
    return fm

def main():
    # 1. Fråga om mappen
    folder_input = input("Ange sökväg till mappen med .md-filer: ").strip()
    folder_input = folder_input.strip('"').strip("'")
    
    path = Path(folder_input)
    if not path.exists() or not path.is_dir():
        print("Fel: Mappen existerar inte eller är ogiltig.")
        return

    # 2. Skanna och samla filer
    print("\nSkannar efter spell-filer...")
    identified_files = []
    
    for filepath in path.rglob("*.md"):
        with open(filepath, "r", encoding="utf-8") as f:
            raw_content = f.read()
            
        if is_spell_file(raw_content):
            identified_files.append(filepath)

    if not identified_files:
        print("Inga filer som matchar kriterierna för spells hittades.")
        return

    # 3. Lista filer numrerat
    print(f"\n{len(identified_files)} filer identifierade:")
    for idx, filepath in enumerate(identified_files, start=1):
        rel_path = filepath.relative_to(path)
        print(f"{idx}. {rel_path}")

    # 4. Låt användaren välja vilka som ska uppdateras
    selection = input(
        "\nVilka filer vill du uppdatera? "
        "Ange nummer separerade med komma (t.ex. 1,3,5) eller skriv 'all' för alla: "
    ).strip().lower()

    files_to_process = []
    if selection in ["all", "alla"]:
        files_to_process = identified_files
    else:
        try:
            indices = [int(x.strip()) for x in selection.split(",")]
            files_to_process = [identified_files[i - 1] for i in indices if 0 < i <= len(identified_files)]
        except ValueError:
            print("Ogiltig inmatning. Åtgärden avbröts.")
            return

    if not files_to_process:
        print("Inga giltiga filer valdes. Avbryter.")
        return

    # 5. Utför ändringarna på de valda filerna
    print(f"\nBearbetar {len(files_to_process)} filer...")
    for filepath in files_to_process:
        with open(filepath, "r", encoding="utf-8") as f:
            raw_content = f.read()
            
        title_match = re.search(r'title:\s*"([^"]+)"', raw_content)
        source_match = re.search(r'source:\s*(https?://[^\s]+)', raw_content)
        
        title = title_match.group(1) if title_match else filepath.stem
        source = source_match.group(1) if source_match else None
        
        body_content = re.sub(r'^---\n.*?\n---\n*', '', raw_content, flags=re.DOTALL).strip()
        fixed_body = fix_line_breaks(body_content)
        metadata = extract_metadata(fixed_body)
        
        new_frontmatter = generate_frontmatter(metadata, title, source)
        new_full_content = new_frontmatter + fixed_body + "\n"
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_full_content)
            
    print("\nValda filer har uppdaterats framgångsrikt!")

if __name__ == "__main__":
    main()