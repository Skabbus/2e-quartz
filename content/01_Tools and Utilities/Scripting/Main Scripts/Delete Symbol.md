<%*
const unesc = s => s.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
const from = unesc(await tp.system.prompt("Vilken symbol ska ersättas/raderas?", "", true));
const to = unesc(await tp.system.prompt("Ersätt med (lämna tomt för att radera)", "", true));
const text = tp.file.selection();
tR += text.split(from).join(to);
%>