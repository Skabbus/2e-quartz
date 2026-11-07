<%*
const clean = s => s.replace(/\*\*/g, "").trim();

const fixedIn = await tp.system.prompt("Fasta fält (t.ex. stat=str eller group=commoner)", "", true);
const firstIn = await tp.system.prompt("Första kolumnen: ett namn = ett värde per rad, två namn = min,max", "value", true);
const colsIn  = await tp.system.prompt("Övriga kolumner: prefix (p, s) eller lista (hit,dmg,...)", "p", true);
const withHeaders = await tp.system.suggester(["Ja", "Nej"], [true, false], true, "Include headers?");

const fixed = fixedIn.split(",").map(s => s.trim()).filter(Boolean)
  .map(s => { const [k, ...v] = s.split("="); return `[${k.trim()}:: ${v.join("=").trim()}]`; })
  .join(" ");
const first = firstIn.split(",").map(s => s.trim()).filter(Boolean);
const colNames = colsIn.split(",").map(s => s.trim()).filter(Boolean);
const nameFor = i => colNames.length > 1 ? (colNames[i] ?? `p${i + 1}`) : `${colNames[0] ?? "p"}${i + 1}`;

// "--" blir 0, "1,535" blir 1535, "+8" blir 8 (används bara utan headers)
const norm = c => {
  if (/^-+$/.test(c)) return "0";
  if (/^\d{1,3}(,\d{3})+$/.test(c)) return c.replace(/,/g, "");
  return c.replace(/^\+(?=\d)/, "");
};

// Första tabellraden är rubrikrad, resten data
const lines = tp.file.selection().split("\n").map(l => l.trim()).filter(l => l.startsWith("|"));
let headers = null;
const parsed = [];
for (const line of lines) {
  const cells = line.split("|").slice(1, -1).map(clean);
  if (!cells.length || cells.every(c => /^:?-*:?$/.test(c))) continue;
  if (!headers) { headers = cells; continue; }
  parsed.push(cells);
}

const hasExc = parsed.some(c => /^18\/\d+/.test(c[0])); // 18/xx-rader finns i tabellen
const out = [];

for (const cells of parsed) {
  const f = cells[0];
  let m, heads = [];

  if (first.length === 1) {
    // ett värde per rad
    if ((m = f.match(/^(\d+)$/))) {
      heads.push([+m[1], 0, 0]);
    } else if ((m = f.match(/^(\d+)\s*-\s*(\d+)$/))) {
      for (let v = +m[1]; v <= +m[2]; v++) heads.push([v, 0, 0]);
    } else if ((m = f.match(/^18\/(\d+)-(\d+)$/))) {
      heads.push([18, +m[1], +m[2]]);
    } else if (f === "18/00") {
      heads.push([18, 100, 100]);
    } else continue;
    heads = heads.map(([v, a, b]) =>
      `[${first[0]}:: ${v}]` + (hasExc ? ` [xmin:: ${a}] [xmax:: ${b}]` : ""));
  } else {
    // intervall: min,max
    let a, b;
    if ((m = f.match(/^(\d+)$/))) { a = b = +m[1]; }
    else if ((m = f.match(/^(\d+)\s*-\s*(\d+)$/))) { a = +m[1]; b = +m[2]; }
    else if ((m = f.match(/^(\d+)\s*(\+|or\b|and\b|higher|up)/i))) { a = +m[1]; b = 99; }
    else continue;
    heads = [`[${first[0]}:: ${a}] [${first[1]}:: ${b}]`];
  }

  const cols = cells.slice(1).map((c, i) => {
    if (!c) return "";
    const n = nameFor(i);
    return withHeaders
      ? `[${n}:: "${(headers[i + 1] ?? "").replace(/"/g, "'")}: ${c.replace(/"/g, "'")}"]`
      : `[${n}:: ${norm(c)}]`;
  }).filter(Boolean).join(" ");

  for (const h of heads) out.push("* " + [fixed, h, cols].filter(Boolean).join(" "));
}

tR += out.join("\n");
%>