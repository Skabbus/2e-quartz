async function calloutToRoll20(tp) {
    // 1. Hämta den markerade texten från den aktiva editorn
    const activeView = app.workspace.getActiveViewOfType(tp.obsidian.MarkdownView);
    if (!activeView) {
        new Notice("Ingen aktiv markdown-editor hittades!");
        return;
    }
    
    const editor = activeView.editor;
    const text = editor.getSelection();

    if (!text || text.trim() === "") {
        new Notice("Ingen text markerad! Markera callouten först.");
        return;
    }

    let npc = {};

    // Namn (# Esset)
    let nameMatch = text.match(/#\s+([^\r\n]+)/);
    if (nameMatch) npc.name = nameMatch[1].trim();

    // Klass, Level, Ras, Sex (Klass: Fighter (Level 6) | Human | Man)
    let classMatch = text.match(/Klass:\s*([^(]+)\s*\(Level\s*(\d+)\)\s*\|\s*([^|]+)\|\s*([^\r\n]+)/i);
    if (classMatch) {
        npc.classes = classMatch[1].trim();
        npc.level = parseInt(classMatch[2]);
        npc.race = classMatch[3].trim();
        npc.sex = classMatch[4].trim();
    }

    // HP
    let hpMatch = text.match(/Hit Points:\s*(\d+)/i);
    if (hpMatch) npc.hp = parseInt(hpMatch[1]);

    // Stats (STR: 9 | DEX: 8 ...)
    let statsLine = text.match(/Stats:\s*([^\r\n]+)/i);
    if (statsLine) {
        let statsStr = statsLine[1];
        ['str', 'dex', 'con', 'int', 'wis', 'chr', 'pcp'].forEach(s => {
            let m = statsStr.match(new RegExp(s + ':\\s*(\\d+)', 'i'));
            if (m) npc[s] = parseInt(m[1]);
        });
    }

    // Ålder, Längd, Vikt
    let ageMatch = text.match(/\*\*Ålder:\*\*\s*([^\r\n]+)/i);
    if (ageMatch) npc.age = ageMatch[1].trim();

    let heightMatch = text.match(/\*\*Längd & Vikt:\*\*\s*([\d\s]+cm),\s*([\d\s]+kg)/i);
    if (heightMatch) {
        npc.height = heightMatch[1].trim();
        npc.weightchar = parseInt(heightMatch[2]);
    }

    // Bygg JSON-sträng
    let commandString = "!import-npc " + JSON.stringify(npc);

    // Kopiera till urklipp
    try {
        await navigator.clipboard.writeText(commandString);
        new Notice("Kopierat till urklipp! Klistra in i Roll20.");
    } catch (err) {
        new Notice("Fel vid kopiering: " + err);
    }
}

module.exports = calloutToRoll20;