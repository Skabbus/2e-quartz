<%*
const stat = await tp.system.suggester(
  ["str", "dex", "con", "int", "wis", "chr", "pcp"],
  ["str", "dex", "con", "int", "wis", "chr", "pcp"],
  false, "Vilken stat?"
);

const clean = s => s.replace(/\*\*/g, "").trim();

const rows = tp.file.selection()
  .split("\n")
  .map(l => l.trim())
  .filter(l => l.startsWith("|"));

const out = [];
let headers = [];

for (const line of rows) {
  const cells = line.split("|").slice(1, -1).map(clean);
  const first = cells[0];
  if (!first || /^:?-+:?$/.test(first)) continue;

  // Rubrikraden: första cellen innehåller bokstäver (t.ex. "Ability Score")
  if (/[a-z]/i.test(first)) { headers = cells; continue; }

  let vals = [], xmin = 0, xmax = 0, m;
  if ((m = first.match(/^(\d+)$/))) {
    vals = [parseInt(m[1], 10)];
  } else if ((m = first.match(/^(\d+)-(\d+)$/))) {
    for (let v = parseInt(m[1], 10); v <= parseInt(m[2], 10); v++) vals.push(v);
  } else if ((m = first.match(/^18\/(\d+)-(\d+)$/))) {
    vals = [18]; xmin = parseInt(m[1], 10); xmax = parseInt(m[2], 10);
  } else if (first === "18/00") {
    vals = [18]; xmin = 100; xmax = 100;
  } else {
    continue;
  }

  const fields = cells.slice(1)
    .map((c, i) => c ? `[p${i + 1}:: "${headers[i + 1] ?? "Kolumn " + (i + 2)}: ${c}"]` : "")
    .filter(Boolean)
    .join(" ");

  const ex = stat === "str" ? ` [xmin:: ${xmin}] [xmax:: ${xmax}]` : "";

  for (const v of vals) {
    out.push(`- [stat:: ${stat}] [value:: ${v}]${ex} ${fields}`);
  }
}

tR += out.join("\n");
%>