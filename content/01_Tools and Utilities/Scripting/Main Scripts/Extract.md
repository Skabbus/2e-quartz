<%*
// ===== Inställningar =====
const BULK = true;             // true = dela markeringen i flera filer, en per rad som börjar med **X**
const REPLACE_WITH_LINK = true; // true = ersätt markeringen i originalet med [[länk]] till nya filen
const OPEN_NEW = false;         // true = öppna den nya filen direkt (bara när BULK = false)
// =========================

const editor = app.workspace.activeEditor?.editor;
const sel = editor?.getSelection();
if (!sel || !sel.trim()) { new Notice("Inget markerat."); return; }

const srcFile = app.workspace.getActiveFile();
const folder = srcFile.parent.path === "/" ? "" : srcFile.parent.path + "/";

// Dela upp i delar
let chunks = [];
if (BULK) {
  let cur = null;
  for (const line of sel.split("\n")) {
    if (/^\s*(#+\s*)?\*\*.+?\*\*/.test(line)) {
      if (cur) chunks.push(cur.join("\n"));
      cur = [line];
    } else if (cur) {
      cur.push(line);
    }
  }
  if (cur) chunks.push(cur.join("\n"));
} else {
  chunks = [sel];
}

const links = [];
let created = [];
for (const text of chunks) {
  const m = text.match(/\*\*(.+?)\*\*/);
  if (!m) { new Notice("Hittade ingen **text** i en del – hoppar över."); continue; }

const name = m[1].trim().replace(/[\\/:*?"<>|#^\[\].]/g, "").replace(/\s+/g, " ").trim();
  let path = `${folder}${name}.md`;
  let i = 2;
  while (app.vault.getAbstractFileByPath(path)) {
    path = `${folder}${name} ${i++}.md`;
  }

  const content = `---\nsource: "[[${srcFile.basename}]]"\n---\n\n${text.trim()}\n`;
  const f = await app.vault.create(path, content);
  created.push(f);
  links.push(`![[${f.basename}]]\n`);
}

if (created.length === 0) return;

if (REPLACE_WITH_LINK) {
  editor.replaceSelection(links.join("\n"));
}
if (OPEN_NEW && !BULK) {
  await app.workspace.getLeaf("tab").openFile(created[0]);
}
new Notice(`Skapade ${created.length} fil(er).`);
%>