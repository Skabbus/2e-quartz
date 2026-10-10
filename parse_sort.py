import json
import re

def parse_customsort(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    sort_map = {}
    current_folder = "/"

    for line in lines:
        line_str = line.rstrip('\r\n')
        if not line_str.strip():
            continue
        
        # Matchar 'target-folder: <sökväg>' eller '  target-folder: <sökväg>'
        folder_match = re.match(r'^\s*target-folder:\s*(.*)$', line_str)
        if folder_match:
            folder_path = folder_match.group(1).strip()
            # Sanera sökvägen så den stämmer med Quartz
            if not folder_path.startswith('/'):
                folder_path = '/' + folder_path
            current_folder = folder_path.rstrip('/')
            if not current_folder:
                current_folder = "/"
            if current_folder not in sort_map:
                sort_map[current_folder] = []
        else:
            # Det är en fil eller undermapp i den aktuella mappen
            item_name = line_str.strip()
            if current_folder not in sort_map:
                sort_map[current_folder] = []
            sort_map[current_folder].append(item_name)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(sort_map, f, ensure_ascii=False, indent=2)

    print(f"Läst in sortering för {len(sort_map)} mappar och sparat i {output_file}")

if __name__ == "__main__":
    parse_customsort("sortspec.txt", "sort-order.json")