<%*
const dv = app.plugins.plugins.dataview?.api;
if (!dv) {
    new Notice("Dataview-pluginet är inte tillgängligt!");
    return selection;
}

// 1. Hämta den aktiva filens data
const currentFile = app.workspace.getActiveFile();
const pageData = dv.page(currentFile.path);

// 2. Hämta texten från din markering (t.ex. dina NWP-länkar)
const editor = app.workspace.getActiveViewOfType(tp.obsidian.MarkdownView).editor;
const selection = editor.getSelection();

if (!selection) {
    new Notice("Du måste markera den text/sektion du vill exportera!");
    return "";
}

// 3. Extrahera länkar från markeringen
const links = [...selection.matchAll(/\[\[(.*?)\]\]/g)].map(m => m[1]);

// Samla ihop data till ett objekt
let exportData = {
    name: currentFile.basename,
    strength: pageData.stat_str || 10,
    wisdom: pageData.stat_wis || 10,
    proficiencies: []
};

for (let linkName of links) {
    let nwpPage = dv.page(linkName);
    if (nwpPage) {
        exportData.proficiencies.push({
            name: linkName,
            ability: nwpPage.ability,
            mod: nwpPage.mod || 0
        });
    }
}

// 4. Gör om till JSON-sträng
const jsonString = JSON.stringify(exportData, null, 2);

// 5. Kopiera till urklipp
navigator.clipboard.writeText(jsonString).then(() => {
    new Notice("✅ Roll20-data kopierad till urklipp!");
}).catch(err => {
    new Notice("❌ Kunde inte kopiera: " + err);
});

// 6. VIKTIGT: Returnera markeringen så den inte raderas!
return selection;
-%>