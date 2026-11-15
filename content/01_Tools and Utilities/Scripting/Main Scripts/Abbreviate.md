<%*
const sel = tp.file.selection();
const desc = await tp.system.prompt("Förklaring (visas vid hover)");

// Avbryt snyggt om inget är markerat eller popupen stängs
if (!sel || !desc) {
  tR += sel ?? "";
  return;
}

// Escapa tecken som skulle bryta title-attributet
const esc = desc
  .replace(/&/g, "&amp;")
  .replace(/"/g, "&quot;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");

tR += `<abbr title="${esc}">${sel}</abbr>`;
%>