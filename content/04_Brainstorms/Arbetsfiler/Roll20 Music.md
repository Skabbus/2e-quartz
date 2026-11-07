
```dataviewjs
let container = dv.container;

// 1. Hitta filen automatiskt oavsett vilken mappsstruktur du har i valvet
let allFiles = app.vault.getMarkdownFiles();
let targetFile = allFiles.find(f => f.name === "Roll20 Music.md");

if (!targetFile) {
    container.innerHTML = "<p style='color: var(--text-error);'><b>Kunde inte hitta 'Roll20 Music.md' i valvet.</b> Kontrollera att filnamnet stämmer exakt.</p>";
    return;
}

// Läs filens innehåll via Obsidians egna API
let fileContent = await app.vault.read(targetFile);
let lines = fileContent.split("\n");
let items = [];

for (let line of lines) {
    let trimmed = line.trim();
    if (trimmed.startsWith("|")) {
        let parts = trimmed.split("|").map(p => p.trim());
        // parts[1]=Titel, parts[2]=Känslor, parts[3]=Passar för, parts[4]=Beskrivning, parts[5]=Övrigt
        if (parts.length >= 6) {
            let titel = parts[1];
            let känslor = parts[2];
            let passar = parts[3];
            let beskrivning = parts[4];
            let övrigt = parts[5];

            let isHeaderOrDivider = titel.toLowerCase().includes("titel") || titel.includes("---");
            if (titel && !isHeaderOrDivider) {
                items.push({ titel, känslor, passar, beskrivning, övrigt });
            }
        }
    }
}

// Kontrollera om gränssnittet redan är skapat
let selectKänsla = container.querySelector("#select-känsla");
let selectPassar = container.querySelector("#select-passar");
let tableDiv = container.querySelector("#tabell-div");

if (!selectKänsla) {
    container.innerHTML = "";

    // Samla unika värden dynamiskt från tabellen för dropdowns
    let känslorSet = new Set();
    let passarSet = new Set();

    items.forEach(i => {
        i.känslor.split(",").forEach(k => { if (k.trim()) känslorSet.add(k.trim()); });
        i.passar.split(",").forEach(p => { if (p.trim()) passarSet.add(p.trim()); });
    });

    // Bygg layouten för dropdowns
    let wrapper = container.createEl("div", { attr: { style: "display: flex; gap: 15px; margin-bottom: 20px;" } });

    // Dropdown 1: Känslor
    let box1 = wrapper.createEl("div", { attr: { style: "flex: 1; display: flex; flex-direction: column; gap: 5px;" } });
    box1.createEl("label", { text: "🎭 Filtrera på känsla:" }).style.cssText = "font-size: 0.9em; color: var(--text-muted);";
    selectKänsla = box1.createEl("select", { attr: { id: "select-känsla" } });
    styleSelect(selectKänsla);
    
    selectKänsla.createEl("option", { text: "Alla känslor", attr: { value: "alla" } });
    Array.from(känslorSet).sort().forEach(k => {
        selectKänsla.createEl("option", { text: k, attr: { value: k } });
    });

    // Dropdown 2: Passar för
    let box2 = wrapper.createEl("div", { attr: { style: "flex: 1; display: flex; flex-direction: column; gap: 5px;" } });
    box2.createEl("label", { text: "🎯 Filtrera på tillfälle / passar för:" }).style.cssText = "font-size: 0.9em; color: var(--text-muted);";
    selectPassar = box2.createEl("select", { attr: { id: "select-passar" } });
    styleSelect(selectPassar);

    selectPassar.createEl("option", { text: "Alla tillfällen", attr: { value: "alla" } });
    Array.from(passarSet).sort().forEach(p => {
        selectPassar.createEl("option", { text: p, attr: { value: p } });
    });

    tableDiv = container.createEl("div", { attr: { id: "tabell-div" } });

    selectKänsla.addEventListener("change", () => updateTable(items));
    selectPassar.addEventListener("change", () => updateTable(items));
}

function styleSelect(sel) {
    sel.style.cssText = "padding: 8px 12px; border-radius: 6px; border: 1px solid var(--background-modifier-border); background: var(--background-primary); color: var(--text-normal); outline: none; width: 100%; cursor: pointer;";
}

function updateTable(dataItems) {
    let valKänsla = selectKänsla.value.toLowerCase();
    let valPassar = selectPassar.value.toLowerCase();

    let filtered = dataItems.filter(i => {
        let matchKänsla = valKänsla === "alla" || i.känslor.toLowerCase().includes(valKänsla);
        let matchPassar = valPassar === "alla" || i.passar.toLowerCase().includes(valPassar);
        return matchKänsla && matchPassar;
    });

    let html = `<table class="dataview table-view-table" style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr>
                <th style="text-align: left; padding: 8px;">Titel</th>
                <th style="text-align: left; padding: 8px;">Känslor</th>
                <th style="text-align: left; padding: 8px;">Passar för</th>
                <th style="text-align: left; padding: 8px;">Beskrivning</th>
                <th style="text-align: left; padding: 8px;">Övrigt</th>
            </tr>
        </thead>
        <tbody>`;
    
    if (filtered.length === 0) {
        html += `<tr><td colspan="5" style="text-align: center; padding: 15px; color: var(--text-muted);">Inga låtar matchade filtret</td></tr>`;
    } else {
        for (let item of filtered) {
            html += `<tr style="border-bottom: 1px solid var(--background-modifier-border);">
                <td style="padding: 8px;"><b>${item.titel}</b></td>
                <td style="padding: 8px;">${item.känslor}</td>
                <td style="padding: 8px;">${item.passar}</td>
                <td style="padding: 8px; color: var(--text-muted);">${item.beskrivning}</td>
                <td style="padding: 8px;">${item.övrigt}</td>
            </tr>`;
        }
    }
    html += `</tbody></table>`;

    tableDiv.innerHTML = html;
}

// Kör vid start
updateTable(items);
```




| Titel               | Känslor                                             | Passar för           | Beskrivning                                                                                                           | Övrigt                                                     |
| :------------------ | :-------------------------------------------------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| The Undercroft      | obehaglig, nyfiken, utredning, mysterium            |                      | Milt obehag. Passar bra för en utredning av eller diskussion om något obehagligt.                                     | Lite miljöljud, kryp.                                      |
| Spectral Abbey      | obehaglig, intensiv, brådskande, jagad, paranormalt |                      | Väldigt paranormalt kopplad. Hade passat bra att vara i ett hemsökt hus och bli jagad av spöken, men inte i livsfara. |                                                            |
| Lair of the Wyrm    |                                                     |                      |                                                                                                                       |                                                            |
| Fire Dance          | intensiv, kult, ceremoni,                           |                      | Någon form av ceremoni där en grupp bränner någon på bål eller dylikt.                                                |                                                            |
| The Sisterhood      |                                                     |                      |                                                                                                                       |                                                            |
| Magical Flora       |                                                     |                      |                                                                                                                       |                                                            |
| Ghost Ship          | mörk                                                |                      |                                                                                                                       |                                                            |
| The Maddening Crowd | målmedveten, smälta in, intensiv                    | dagtid, folkmassa    | Stoppa en lönnmördare i en folkmassa utan att orsaka en scen.                                                         |                                                            |
| Counting House      | mild, nyfiken, lugn                                 |                      | En del miljöljud med mynt och pennor. Låter som inne på en enorm bank.                                                |                                                            |
| Hidden Passage      | obehaglig, fara, hemlighet                          | natt,                | Vandra genom en gömd mörk tunnel där det kan finnas monster runt varje hörn.                                          |                                                            |
| Pagan Woods         | obehaglig, ceremoni, natur                          |                      | Går genom en obehaglig skog där man väntar kannibaler.                                                                |                                                            |
| Rebuilding          | hoppfull, nyfiken, obehaglig, lugn                  |                      |                                                                                                                       |                                                            |
| Collegium Magica    |                                                     |                      |                                                                                                                       |                                                            |
| Tomb Guardians      |                                                     |                      |                                                                                                                       |                                                            |
| Forgotten Forest    | milt obehaglig, naturlig, nyfiken                   | skog, natt           |                                                                                                                       |                                                            |
| Nautiloid Escape    |                                                     |                      |                                                                                                                       |                                                            |
| Viking Tavern       | festlig, munter, intensiv                           | taverna              | Något stökig taverna.                                                                                                 |                                                            |
| Treacherous Path    |                                                     |                      |                                                                                                                       |                                                            |
| Brood Mother        |                                                     |                      |                                                                                                                       |                                                            |
| Vampyr              |                                                     |                      |                                                                                                                       |                                                            |
| Steel Foundry       |                                                     |                      |                                                                                                                       |                                                            |
| The Drowned Tower   | mäktig, mystisk                                     |                      |                                                                                                                       |                                                            |
| Feast of Crispian   | lågmäld, munter, festlig                            | folkfest             | Passar en folkfest.                                                                                                   |                                                            |
| Whispering Caverns  |                                                     |                      |                                                                                                                       |                                                            |
| Whiteout            |                                                     |                      |                                                                                                                       |                                                            |
| The Misty Marsh     | vacker, lugn, reflektion                            | morgon, avkoppling   | Efter något stort har hänt, men allt slutade okej.                                                                    | En del miljöljud, implicerar vatten.                       |
| Homecoming          | glad, äventyr, framgång, spänning                   | utforskning          | Anlända till ny plats som verkar bra.                                                                                 |                                                            |
| Demon Army          |                                                     |                      |                                                                                                                       |                                                            |
| Hellhound Alley     | diskret, smyg, hund                                 | smyg                 | Smyger runt på natten i staden.                                                                                       | Mycket hundar.                                             |
| Desert Devotional   | helig, obehaglig, mystisk                           | religion             | Svära en ed till en gud på stor risk.                                                                                 |                                                            |
| Medieval Market     | vacker, lugn, glad, säker                           | dag, säker, trevligt | En dag på staden där solen skiner, alla hälsar på varandra och det finns inget att oroa sig över.                     |                                                            |
| Lord of Bones       |                                                     |                      |                                                                                                                       |                                                            |
|                     |                                                     |                      |                                                                                                                       |                                                            |
| Western Watchtower  | planering, krig, farlig                             |                      | Planerar ett anfall.                                                                                                  |                                                            |
| Banshee's Lair      | dyster, nyfiken, lugn, märkligt                     | natt                 | En natt där man förväntar sig att något ska hända, men inget har hänt.                                                |                                                            |
| Long Rest           | avvaktande, farlig, lugn, diskret                   |                      | Känslan av att  något kan hända när som helst. Alla är på sin vakt.                                                   |                                                            |
| Halfling Sneak      | lurig, smyg                                         |                      | Diskreta knasigheter i kikaren.                                                                                       |                                                            |
|                     |                                                     |                      |                                                                                                                       |                                                            |
| The Great Lift      | struktur, bygg, spänning                            |                      | Något kommer gå sönder.                                                                                               | Väldigt mycket miljöljud, stora trästrukturer som knarrar. |
| Descent             | magi, nyfiken, lugn, mysterium                      |                      | Utreda en magisk effekt.                                                                                              |                                                            |
| Den of Iniquity     | dunkel, lågmäld                                     | kriminell            | Kriminell/sunkig taverna.                                                                                             |                                                            |


