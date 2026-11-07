<%*
const group = (await tp.system.prompt("Klassgrupp (t.ex. warrior, priest, rogue, wizard, commoner)")).trim().toLowerCase();

const clean = s => s.replace(/\*\*/g, "").trim();

const rows = tp.file.selection()
  .split("\n")
  .map(l => l.trim())
  .filter(l => l.startsWith("|"));

const out = [];

for (const line of rows) {
  const cells = line.split("|").slice(1, -1).map(clean);
  const first = cells[0];
  if (!first || /^:?-+:?$/.test(first)) continue;

  let min, max, m;
  if ((m = first.match(/^(\d+)$/))) {
    min = max = parseInt(m[1], 10);
  } else if ((m = first.match(/^(\d+)\s*-\s*(\d+)$/))) {
    min = parseInt(m[1], 10); max = parseInt(m[2], 10);
  } else if ((m = first.match(/^(\d+)\s*(\+|or\b|and\b|higher|up)/i))) {
    min = parseInt(m[1], 10); max = 99;
  } else {
    continue; // rubrikrader och annat hoppas över
  }

  const vals = cells.slice(1, 6)
    .map((c, i) => `[s${i + 1}:: ${c}]`)
    .join(" ");

  out.push(`- [group:: ${group}] [minlvl:: ${min}] [maxlvl:: ${max}] ${vals}`);
}

tR += out.join("\n");
%>