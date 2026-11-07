// =====================================================================
//  Roll20 Export för 2e NPC-kort  (Dataview "view" – anropas med dv.view)
//  Läser ENDAST det statblock-callout som den här koden ligger nestad i.
//  Allt som räknas ut av Roll20 själv (AC-bonus från Dex m.m.) hoppas över.
// =====================================================================
// Dual-mode: fungerar både som Dataview-view (dv.view) och som Templater user script i samma mapp.
async function roll20Export(dv, input) {
const CFG = Object.assign({
	TABLE6:  "Table 6- Master Weapons Chart",       // länknamn/sökväg till vapentabellen
	TABLE45: "Table 45- Missile Weapon Ranges",     // länknamn/sökväg till range-tabellen
	ARMOR_TABLE: "00_Rulebook/Player's Handbook/Chapter 6- Money and Equipment/Equipment Lists/Armor", // rustnings- och sköldtabellen
	ARMOR_TABLE_PO: "00_Rulebook/Player's Option- Combat and Tactics/Chapter Seven- Weapons and Armor/Equipment Groups/Armor", // Player's Option-tabellen: reserv för rustningar som saknas i PHB-tabellen
	ABILITIES_FILE: "01_Tools and Utilities/Scripting/Metadata/Abilities",          // Dataview-listorna med ability-data (används för Dex "Missile Attack Adj." = two-weapon-justering)
	SOA_DATA: "SoA_data",                           // metadatafil med "current_year::NNN" (eller frontmatter SoA_year) – används för age = current_year − birthyear
	ARMOR_PROF_WEIGHT: 0.5,                         // rustningens vikt i gear när NPC:n har Armor Proficiency i den (halv börda)
	AMMO_QTY: 20,                                   // antal pilar/kast-ammo som läggs i gear för bågar, armborst m.m.
	COIN_GP: { pp: 5, gp: 1, ep: 0.5, sp: 0.1, cp: 0.01 },    // växelkurs till gp (PHB: 100 cp = 10 sp = 1 gp)
	PLAYER_NAME: "NPC",                             // "" = tomt
	// Språk som alla NPC:er kan (utöver rasens eget språk + Languages, Modern):
	BASE_LANGUAGES: ["Abariska"],
	SPELL_DESCRIPTIONS: true,                       // false = JSON blir betydligt mindre
	PRIEST_EXPORT_ALL: false,                       // true = ALLA gudens spells (memorerade får spellmems), false = bara memorerade
	BOOK_EXPORT_ALL: true,                          // wizard/bard: hela spellbooken (true) eller bara memorerade (false)
}, input || {});

const warnings = [];
const norm = s => String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9]/g, "");
const stripMd = s => String(s || "").replace(/<abbr[^>]*>.*?<\/abbr>/g, "").replace(/\*+/g, "").replace(/[_]/g, "").replace(/\s+/g, " ").trim();
const splitRow = line => line.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map(c => c.trim());
const isSep = line => /^\|?\s*:?-+:?\s*(\||$)/.test(line.trim());
const stripQ = line => line.replace(/^\s*(>\s?)+/, "");
const linkInner = s => { const m = /\[\[([^\]]*)\]\]/.exec(s || ""); return m ? m[1] : null; };
const linkParts = inner => { const p = inner.split(/\\?\|/); return { target: p[0].trim(), display: (p[p.length - 1] || "").trim() }; };
const linkDisplay = s => { const i = linkInner(s); return i == null ? stripMd(s) : linkParts(i).display; };

// ---------- deterministiska Roll20-id:n (samma NPC => samma id vid varje omritning) ----------
const ID_CH = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
function hash32(str, seed) {
	let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
	for (let i = 0; i < str.length; i++) { const c = str.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
	h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
	return (h2 >>> 0) * 4096 + (h1 >>> 0);
}
function rowId(seed) {
	let s = "-";
	for (let i = 0; i < 19; i++) s += ID_CH[Math.floor(hash32(seed, i + 1)) % ID_CH.length];
	return s;
}

// ---------- hitta rätt statblock i filens källtext ----------
async function getBlock() {
	const page = dv.current();
	const file = app.vault.getAbstractFileByPath(page.file.path);
	const text = await app.vault.cachedRead(file);
	const lines = text.split(/\r?\n/);
	const blocks = [];
	let cur = null;
	for (const l of lines) {
		if (/^>\s*\[!statblock[\w-]*\]/.test(l)) { cur = []; blocks.push(cur); cur.push(l); continue; }
		if (cur && /^\s*>/.test(l)) cur.push(l);
		else cur = null;
	}
	if (!blocks.length) return null;
	// Vilket kort ligger det här skriptet i? Matcha på rubriken (h1) i DOM, annars ordning.
	const el = dv.container.closest('.callout[data-callout^="statblock"]');
	if (el && blocks.length > 1) {
		const h = el.querySelector("h1");
		const dom = norm(h ? h.textContent : "");
		const byName = blocks.filter(b => { const t = b.find(x => /^\s*>\s*#\s/.test(x)); return t && norm(stripQ(t).replace(/^#\s*/, "")) === dom; });
		if (byName.length === 1) return byName[0];
		const all = Array.from(el.ownerDocument.querySelectorAll('.callout[data-callout^="statblock"]')).filter(x => x.closest(".markdown-preview-view, .markdown-reading-view, .cm-editor") === el.closest(".markdown-preview-view, .markdown-reading-view, .cm-editor"));
		const idx = all.indexOf(el);
		if (byName.length > 1 && idx >= 0) { const pos = all.slice(0, idx).filter(x => norm((x.querySelector("h1") || {}).textContent) === dom).length; return byName[Math.min(pos, byName.length - 1)]; }
		if (idx >= 0 && idx < blocks.length) return blocks[idx];
	}
	return blocks[0];
}

// ---------- dela upp i sektioner (callouts) ----------
function sectionize(block) {
	const sections = [{ type: "statblock", title: "", lines: [] }];
	for (const raw of block) {
		const t = stripQ(raw).trim();
		const m = /^\[!([\w-]+)\][+-]?\s*(.*)$/.exec(t);
		if (m) { if (/^statblock/.test(m[1])) continue; sections.push({ type: m[1], title: m[2], lines: [] }); continue; }
		sections[sections.length - 1].lines.push(t);
	}
	return sections;
}

// ---------- läs tabeller ur vault-filer ----------
async function readFileByLink(link, from) {
	const f = app.metadataCache.getFirstLinkpathDest(link.replace(/\.md$/, ""), from || "");
	if (!f) return null;
	return { file: f, text: await app.vault.cachedRead(f) };
}
function parseMdTables(text) {
	const out = [];
	let hdr = null;
	for (const l of text.split(/\r?\n/)) {
		if (!/^\s*\|/.test(l)) { hdr = null; continue; }
		if (isSep(l)) continue;
		const c = splitRow(l);
		if (!hdr) { hdr = c.map(x => stripMd(x).toLowerCase()); continue; }
		out.push({ hdr, c });
	}
	return out;
}
// "<abbr ...>‡</abbr>" = 1/10 lb, "2/10" = 0.2, "--" = inget värde
function parseWeight(raw) {
	if (/‡/.test(raw || "")) return "0.1";
	const t = stripMd(raw);
	if (!t || /^[-—]+$/.test(t)) return "";
	let m = /^(\d+(?:\.\d+)?)\s*\/\s*(\d+)$/.exec(t);
	if (m) return String(Math.round(Number(m[1]) / Number(m[2]) * 1000) / 1000);
	m = /^\d+(?:\.\d+)?/.exec(t);
	return m ? m[0] : "";
}
// "500 gp" -> 500, "2 cp" -> 0.01, "3 sp/12" -> pris per styck i gp
function parseCostGp(raw) {
	const m = /^([\d,]+(?:\.\d+)?)(?:\s*-\s*[\d,]+)?\s*(pp|gp|ep|sp|cp)(?:\s*\/\s*(\d+))?/i.exec(stripMd(raw));
	if (!m) return null;
	const gp = Number(m[1].replace(/,/g, "")) * CFG.COIN_GP[m[2].toLowerCase()] / (m[3] ? Number(m[3]) : 1);
	return Math.round(gp * 10000) / 10000;
}
const GENERIC_CHILD = /^-?\s*(one|two)-handed$|^attached$|^held$/i;
async function loadWeaponTable(from) {
	const r = await readFileByLink(CFG.TABLE6, from);
	if (!r) { warnings.push("Hittade inte vapentabellen '" + CFG.TABLE6 + "' – vapen exporteras utan damage/speed."); return null; }
	const disp = {}, tgt = {};
	let parent = null;
	const reg = (idx, key, row) => { const k = norm(key); if (k && !idx[k]) idx[k] = row; };
	for (const { c } of parseMdTables(r.text)) {
		if (c.length < 6) continue;
		const rawItem = c[0];
		const clean = stripMd(rawItem.replace(/\[\[([^\]]*)\]\]/g, (_, i) => linkParts(i).display));
		if (!clean) continue;
		const val = i => stripMd(c[i] || "");
		const row = { name: clean, cost: val(1), costGp: parseCostGp(c[1]), weight: parseWeight(c[2]), size: val(3), type: val(4) === "--" ? "" : val(4), speed: val(5) === "--" ? "" : val(5), dmgSM: val(6) === "--" ? "" : val(6), dmgL: val(7) === "--" ? "" : val(7) };
		const isHeader = ["cost", "size", "type", "speed", "dmgSM"].every(k => !row[k] || row[k] === "--") && val(1) === "--";
		const generic = GENERIC_CHILD.test(clean.replace(/^-\s*/, ""));
		if (isHeader) { parent = row; row.children = []; }
		else if (generic && parent) { parent.children.push(row); row.name = parent.name + " (" + clean.replace(/^-\s*/, "") + ")"; }
		else if (!generic) { /* vanlig rad, ev. barn till tidigare header (Lance m.fl.) */ }
		const target = (isHeader ? row : row);
		const links = [...rawItem.matchAll(/\[\[([^\]]*)\]\]/g)].map(m => linkParts(m[1]));
		for (const lk of links) { reg(disp, lk.display, target); reg(tgt, lk.target, target); }
		reg(disp, clean, target);
		if (generic && parent) continue; // underrader registreras inte på namn (föräldern pekar på första barnet)
	}
	// Header med barn => använd första (one-handed) barnet som data
	const resolve = row => (row && row.children && row.children.length ? Object.assign({}, row.children[0], { name: row.name }) : row);
	return {
		find(inner) {
			if (!inner) return null;
			const p = linkParts(inner);
			const tries = [[disp, p.display], [tgt, p.display], [disp, p.target], [tgt, p.target]];
			for (const [idx, k] of tries) { const row = idx[norm(k)]; if (row) return resolve(row); }
			return null;
		}
	};
}
async function loadArmorTable(from) {
	const disp = {}, tgt = {}, po = {};
	const reg = (idx, key, row) => { const k = norm(key); if (k && !idx[k]) idx[k] = row; };
	const num = s => { const m = /[+-]?\d+/.exec(stripMd(s || "")); return m ? Number(m[0]) : null; }; // "+3/+4" -> 3
	// PHB-tabellen: länkar, AC-bonus, vikt, pris (+ sköldar med AC / AC (Proficient))
	const r = await readFileByLink(CFG.ARMOR_TABLE, from);
	if (!r) warnings.push("Hittade inte rustningstabellen '" + CFG.ARMOR_TABLE + "'.");
	else for (const { c } of parseMdTables(r.text)) {
		if (c.length < 5) continue;
		const bonus = num(c[3]);
		if (bonus == null) continue; // hjälmar m.m. utan AC
		const clean = stripMd(c[0].replace(/\[\[([^\]]*)\]\]/g, (_, i) => linkParts(i).display));
		const prof = num(c[4]);
		const row = { name: clean, weight: parseWeight(c[2]), costGp: parseCostGp(c[1]), bonus, bonusProf: prof == null ? bonus : prof };
		for (const lk of [...c[0].matchAll(/\[\[([^\]]*)\]\]/g)].map(m => linkParts(m[1]))) { reg(disp, lk.display, row); reg(tgt, lk.target, row); }
		reg(disp, clean, row);
	}
	// Player's Option-tabellen (Full AC / Full Weight / Common Cost): reserv för t.ex. Cord armor, Light scale, Improved mail
	const rp = await readFileByLink(CFG.ARMOR_TABLE_PO, from);
	if (!rp) warnings.push("Hittade inte Player's Option-rustningstabellen '" + CFG.ARMOR_TABLE_PO + "'.");
	else for (const { c } of parseMdTables(rp.text)) {
		if (c.length < 11) continue;
		const bonus = num(c[9]);
		if (bonus == null) continue;
		const name = stripMd(c[0]).replace(/\++$/, "").trim();
		po[norm(name)] = { name, weight: parseWeight(c[10]), costGp: parseCostGp(c[1]), bonus, bonusProf: bonus };
	}
	return {
		find(inner) {
			if (!inner) return null;
			const p = linkParts(inner);
			for (const [idx, k] of [[tgt, p.target], [disp, p.display], [tgt, p.display], [disp, p.target]]) { const row = idx[norm(k)]; if (row) return row; }
			return null;
		},
		findPO(name) { return po[norm(name)] || null; },
		findShield(name) {
			const k = norm(String(name).replace(/\s*shield$/i, ""));
			return disp[k] || disp[norm(name)] || null;
		}
	};
}
async function loadRangeTable(from) {
	const r = await readFileByLink(CFG.TABLE45, from);
	if (!r) { warnings.push("Hittade inte range-tabellen '" + CFG.TABLE45 + "' – wrange lämnas tomt."); return {}; }
	const map = {};
	for (const { c } of parseMdTables(r.text)) {
		if (c.length < 5) continue;
		const name = stripMd(c[0]);
		if (!name || /^weapon$/i.test(name)) continue;
		const S = stripMd(c[2]), M = stripMd(c[3]), L = stripMd(c[4]);
		const parts = [];
		if (S && S !== "--") parts.push(S + " S");
		if (M && M !== "--") parts.push(M + " M");
		if (L && L !== "--") parts.push(L + " L");
		map[norm(name)] = parts.join("/");
	}
	return map;
}

// Dex "Missile Attack Adj." ur Abilities-filen = justering av two-weapon-straffen. Rad: [stat:: dex] [value:: 16] … [pN:: "Missile Attack Adj.: +1"]
async function dexMissileAdj(dex, from) {
	const r = await readFileByLink(CFG.ABILITIES_FILE, from);
	if (!r) { warnings.push("Hittade inte '" + CFG.ABILITIES_FILE + "' – Dex-justering av two-weapon-straff sätts till 0."); return 0; }
	for (const l of r.text.split(/\r?\n/)) {
		if (!/\[stat::\s*dex\s*\]/i.test(l)) continue;
		const v = /\[value::\s*(\d+)\s*\]/i.exec(l);
		if (!v || Number(v[1]) !== Number(dex)) continue;
		const m = /Missile Attack Adj\.?\s*:\s*([+\-−–]?\s*\d+)/i.exec(l);
		if (m) return Number(m[1].replace(/[−–]/g, "-").replace(/\s+/g, ""));
	}
	warnings.push("Hittade ingen 'Missile Attack Adj.' för Dex " + dex + " i '" + CFG.ABILITIES_FILE + "' – Dex-justering sätts till 0.");
	return 0;
}
// Two-weapon-straff (to hit): basstil −2/−4, Two-Weapon Style Specialization 0/−2, ambidextrös specialist 0/0.
// Dex-justering läggs på (aldrig bonus). Ranger i studded leather eller lättare: ingen straff.
function twoWeaponPenalty(spec, dexAdj, rangerFree, ambi) {
	if (rangerFree) return { main: 0, off: 0 };
	const base = spec ? (ambi ? { main: 0, off: 0 } : { main: 0, off: -2 }) : { main: -2, off: -4 };
	return { main: Math.min(0, base.main + dexAdj), off: Math.min(0, base.off + dexAdj) };
}

// ---------- vapen: primär + (om möjligt) sekundär av motsatt typ ----------
const LAUNCHERS = {
	longbow: { ammo: "Flight Arrow", r45: ["Longbow, flight arrow"], label: "Longbow, Flight arrow" },
	shortbow: { ammo: "Flight Arrow", r45: ["Short bow"], label: "Short bow, Flight arrow" },
	compositelongbow: { ammo: "Flight Arrow", r45: ["Comp. long bow, flight arrow"], label: "Composite long bow, Flight arrow" },
	compositeshortbow: { ammo: "Flight Arrow", r45: ["Comp. short bow"], label: "Composite short bow, Flight arrow" },
	lightcrossbow: { ammo: "Light quarrel", r45: ["Light crossbow"], label: "Light crossbow, Light quarrel" },
	heavycrossbow: { ammo: "Heavy quarrel", r45: ["Heavy crossbow"], label: "Heavy crossbow, Heavy quarrel" },
	handcrossbow: { ammo: "Hand quarrel", r45: ["Hand crossbow"], label: "Hand crossbow, Hand quarrel" },
	sling: { ammo: "Sling bullet", r45: ["Sling bullet"], label: "Sling, Bullet" },
	staffsling: { ammo: "Sling bullet", r45: ["Staff sling bullet"], label: "Staff sling, Bullet" },
	blowgun: { ammo: "Needle", r45: ["Blowgun"], label: "Blowgun, Needle" },
};
const RANGED_THROWN = ["dart", "javelin"];
const isRanged = n => !!LAUNCHERS[norm(n)] || RANGED_THROWN.includes(norm(n));

function buildWeapon(inner, wt, rt, ranged) {
	const p = linkParts(inner);
	const row = wt ? wt.find(inner) : null;
	const L = LAUNCHERS[norm(p.display)] || LAUNCHERS[norm(p.target)];
	let name = p.display, dmg = row ? row.dmgSM : "", type = row ? row.type : "", speed = row ? row.speed : "";
	let rangeKeys = [p.display, p.target];
	if (L) {
		const ammo = wt ? wt.find(L.ammo) : null;
		if (ammo) { dmg = ammo.dmgSM; type = ammo.type; }
		else warnings.push("Hittade inte ammunition '" + L.ammo + "' i vapentabellen för " + p.display + ".");
		name = L.label; rangeKeys = L.r45.concat(rangeKeys);
	}
	if (!row) warnings.push("Hittade inte '" + p.display + "' i vapentabellen – bara namnet exporteras.");
	const o = { name, dmg, type, speed, ranged, gear: [] };
	const gearOf = (r, fallbackName, qty) => ({ name: r ? r.name : fallbackName, qty: qty || 1, cost: r ? r.costGp : null, weight: r ? r.weight : "" });
	o.gear.push(gearOf(row, p.display, 1));
	if (L) o.gear.push(gearOf(wt ? wt.find(L.ammo) : null, L.ammo, CFG.AMMO_QTY));
	if (ranged) {
		for (const k of rangeKeys) { const r = rt[norm(k)]; if (r) { o.range = r; break; } }
		if (!o.range) warnings.push("Ingen range hittades för " + name + ".");
	}
	return o;
}

// ---------- spells ----------
function parseSpellLines(lines) {
	// returnerar [{level, items:[{target, display, bold, count}]}]
	const out = [];
	for (const l of lines) {
		const m = /^\*\s*\*\*(\d)(?:st|nd|rd|th)\s*\((\d+)\):\*\*\s*(.*)$/.exec(l);
		if (!m) continue;
		const items = [];
		const re = /(\*\*)?\[\[([^\]|]+)\|([^\]]+)\]\](\*\*)?(?:\s*×(\d+))?/g;
		let k;
		while ((k = re.exec(m[3]))) items.push({ target: k[2], display: k[3], bold: !!k[1], count: k[5] ? Number(k[5]) : 1 });
		out.push({ level: Number(m[1]), items });
	}
	return out;
}
async function loadSpell(target, display, level, from) {
	const r = await readFileByLink(target, from);
	if (!r) { warnings.push("Hittade inte spell-filen för '" + display + "' (" + target + ")."); return { name: display, level }; }
	let j = null;
	const m = /```json\s*([\s\S]*?)```/.exec(r.text);
	if (m) { try { j = JSON.parse(m[1]); } catch (e) { warnings.push("Trasig JSON i spell-filen för '" + display + "'."); } }
	else warnings.push("Inget JSON-block i spell-filen för '" + display + "'.");
	const fm = (app.metadataCache.getFileCache(r.file) || {}).frontmatter || {};
	return Object.assign({ name: display, level: level || Number(fm.level) || 1 }, j || {});
}

// ---------- själva exporten ----------
async function main() {
	const block = await getBlock();
	if (!block) { dv.paragraph("⚠️ Hittade inget statblock-callout i filen."); return; }
	const sections = sectionize(block);
	const head = sections[0].lines;
	const sec = t => sections.filter(s => s.type === t);
	const from = dv.current().file.path;

	// --- grunddata ---
	const nameLine = head.find(l => /^#\s/.test(l));
	const fullName = nameLine ? stripMd(nameLine.replace(/^#\s*/, "")) : "NPC";
	let cls = "", spec = "", level = "", race = "", gender = "";
	const cl = head.find(l => /^\*\*[^*]+\*\*\s*\(Level/.test(l)); // nytt format: **Thief** (Level **5**), Human woman
	const kl = head.find(l => /^Klass:/.test(l));                    // gammalt format (äldre kort)
	if (cl) {
		const m = /^\*\*(.+?)\*\*\s*\(Level\s*\**(\d+)\**\)\s*,\s*(.+?)\s+(\S+)\s*$/.exec(cl);
		if (m) { const pr = m[1].split(/\s+[–-]\s+/); cls = pr[0].trim(); spec = (pr[1] || "").trim(); level = m[2]; race = m[3].trim(); gender = m[4]; }
		else warnings.push("Kunde inte tolka klassraden.");
	} else if (kl) {
		const m = /^Klass:\s*([^|(–]+?)(?:\s+[–-]\s+(.+?))?\s*\(Level\s*(\d+)\)\s*\|\s*(.+?)\s*\|\s*(\w+)/.exec(kl);
		if (m) { cls = m[1].trim(); spec = (m[2] || "").trim(); level = m[3]; race = m[4].trim(); gender = m[5]; }
		else warnings.push("Kunde inte tolka Klass-raden.");
	}
	const hpLine = head.find(l => /Hit Points:/.test(l));
	const hp = hpLine ? (/Hit Points:\s*\**(\d+)/.exec(hpLine) || [])[1] : "";

	// --- stats (tabell, med fallback till gamla "Stats:"-raden) ---
	const stats = {};
	const hi = head.findIndex(l => /^\|\s*STR\s*\|/i.test(l));
	// Nytt format: Dataview inline-fält i tabellcellerna, t.ex. (stat_str::16) och ev. (stat_str_pct::50) för 18/xx
	const inl = {};
	for (const l of head) for (const m of l.matchAll(/stat_(str|dex|con|int|wis|chr|pcp)(_pct)?::\s*(\d+)/g)) inl[m[1] + (m[2] || "")] = m[3];
	if (inl.str !== undefined || inl.dex !== undefined) {
		const SMAP = { str: "STR", dex: "DEX", con: "CON", int: "INT", wis: "WIS", chr: "CHA", pcp: "PCP" };
		for (const k in SMAP) if (inl[k] !== undefined) stats[SMAP[k]] = inl[k] + (k === "str" && inl.str_pct ? "/" + inl.str_pct : "");
	} else if (hi >= 0) {
		const keys = splitRow(head[hi]).map(x => stripMd(x).toUpperCase());
		const vals = splitRow(head.slice(hi + 1).find(l => /^\|/.test(l) && !isSep(l)) || "");
		keys.forEach((k, i) => { stats[k] = stripMd(vals[i]); });
	} else {
		const sl = head.find(l => /Stats:/.test(l));
		if (sl) for (const m of sl.matchAll(/(STR|DEX|CON|INT|WIS|CHA|PCP):\s*([\d\/]+)/g)) stats[m[1]] = m[2];
		else warnings.push("Hittade inga stats.");
	}

	// --- bio ---
	const bio = (sec("bio")[0] || { lines: [] }).lines.join("\n");
	let age = (/Ålder:\*\*\s*(\d+)/.exec(bio) || [])[1]; // gamla kort med fast ålder
	const by = (/birthyear::\s*(\d+)/.exec(block.join("\n")) || [])[1];
	if (by) {
		const sf = await readFileByLink(CFG.SOA_DATA, from);
		const cm = sf ? (/current_year::\s*(\d+)/.exec(sf.text) || /^SoA_year:\s*(\d+)/m.exec(sf.text)) : null;
		if (cm) age = String(Number(cm[1]) - Number(by));
		else warnings.push("Hittade inte current_year i '" + CFG.SOA_DATA + "' – age lämnas tomt.");
	}
	const hw = /Längd & Vikt:\*\*\s*(\d+)\s*cm,\s*(\d+)\s*kg/.exec(bio);

	// --- thief skills: bara "Improve" (diskretionära poäng). Roll20 räknar Base/Adjust/Armor själv ---
	const thiefImprove = {};
	const tsec = sec("thief-skills")[0];
	if (tsec) {
		const il = tsec.lines.find(l => /Improve \(Roll20\):/.test(l));
		if (il) for (const m of il.matchAll(/\b(pp|ol|fr|ms|hs|dn|cw|rl)\s+(-?\d+)/g)) thiefImprove[m[1]] = m[2];
		else if (/^Thief$/i.test(cls)) warnings.push("Thief-kortet saknar 'Improve (Roll20)'-raden – generera om NPC:n för att få med thief skills.");
	}

	// --- NWP ---
	const nwps = [];
	const nwpSec = sec("nwp")[0];
	const modernLangs = [];
	if (nwpSec) for (const l of nwpSec.lines) {
		if (!/^\|/.test(l) || isSep(l)) continue;
		const c = splitRow(l);
		if (/^proficiency$/i.test(stripMd(c[0])) || /^\*?inga\*?$/i.test(stripMd(c[0]))) continue;
		const inner = linkInner(c[0]);
		const base = inner ? linkParts(inner).display : stripMd(c[0]).replace(/\(.*$/, "").trim();
		const rest = c[0].replace(/\[\[[^\]]*\]\]/, "");
		let subject = "", bonus = 0;
		for (const m of rest.matchAll(/\(([^)]*)\)/g)) { const t = m[1].trim(); if (/^\+\d+$/.test(t)) bonus = Number(t); else subject = t.replace(/_/g, ""); }
		const ab = (stripMd(c[1]).split("/")[0] || "").toUpperCase();
		const attr = { STR: "strength", DEX: "dexterity", CON: "constitution", INT: "intelligence", WIS: "wisdom", CHA: "charisma" }[ab];
		const nm = base + (subject ? " (" + subject + ")" : "");
		nwps.push({ name: nm, attr: attr ? "@{" + attr + "}" : "", adj: stripMd(c[3]).replace(/^—$/, "") });
		if (/^Languages, Modern$/i.test(base) && subject && !/undetermined/i.test(subject)) modernLangs.push(subject);
	}

	// --- språk: bas + ras + Languages, Modern ---
	const raceLang = [];
	if (/dwarf/i.test(race)) raceLang.push("Dwarvish");
	if (/elf/i.test(race)) raceLang.push("Elvish");
	if (/gnome/i.test(race)) raceLang.push("Gnomish");
	if (/halfling/i.test(race)) raceLang.push("Halfling");
	const languages = [...new Set([...CFG.BASE_LANGUAGES, ...raceLang, ...modernLangs])];

	// --- weapon proficiencies ---
	const wps = [], singles = [];
	let primaryInner = null, offhandInner = null, styleLine = "", twoWeaponSpec = false, armorTxt = null, shieldTxt = null, shieldProf = false;
	const wpnSec = sec("wpn")[0];
	if (wpnSec) {
		for (const l of wpnSec.lines) {
			if (/^\|/.test(l) && !isSep(l)) {
				const c = splitRow(l);
				if (/^proficiency$/i.test(stripMd(c[0]))) continue;
				const inner = linkInner(c[0]);
				const isShieldArmor = /Shield Proficiency|Armor Proficiency/.test(c[0]);
				const isStyleRow = /^(Style:|Extra style)/i.test(stripMd(c[0])); // fighting style-rader är inga vapen
				if (/^Style:/i.test(stripMd(c[0])) && /Two-Weapon/i.test(c[0])) twoWeaponSpec = true;
				let nm = isShieldArmor ? stripMd(c[0].replace(/\[\[([^\]]*)\]\]/g, (_, i) => linkParts(i).display)) : (inner ? linkParts(inner).display : stripMd(c[0]));
				nm = nm.replace(/★/g, "").replace(/\(utanför gudens lista\)/g, "").replace(/\(retroaktivt\)/g, "").replace(/↳/g, "").replace(/\s+/g, " ").trim();
				const lvl = stripMd(c[1].replace(/\[\[([^\]]*)\]\]/g, (_, i) => linkParts(i).display)).replace(/\(halv börda\)/, "").trim();
				const slots = /^\d+$/.test(stripMd(c[2])) ? Number(stripMd(c[2])) : 0;
				if (isShieldArmor && /Shield/.test(nm)) { shieldTxt = nm.replace(/^Shield Proficiency:\s*/, ""); shieldProf = true; } // sköld finns i listan = NPC:n har Shield Proficiency
				wps.push({ name: nm + (lvl && !/^Proficient$/i.test(lvl) ? " (" + lvl + ")" : ""), slots });
				if (inner && !isShieldArmor && !isStyleRow && !/group/i.test(c[0])) singles.push({ inner, slots });
			} else {
				const pm = /Primärvapen:\*\*\s*(\[\[[^\]]*\]\])/.exec(l);
				if (pm) primaryInner = linkInner(pm[1]);
				const om = /Off-hand:\*\*\s*(\[\[[^\]]*\]\])/.exec(l);
				if (om) offhandInner = linkInner(om[1]);
				if (/Fighting style:/.test(l)) styleLine = l;
				const am = /Rustning:\*\*\s*(.*)$/.exec(l);
				if (am && !/^Ingen/.test(am[1])) {
					const inner = linkInner(am[1]);
					const t = stripMd(am[1].replace(/\[\[([^\]]*)\]\]/g, (_, i) => linkParts(i).display));
					const m = /^(.*?)\s*\((?:AC\s*\+?(\d+),\s*)?(\d+(?:\.\d+)?)\s*lbs/.exec(t);
					armorTxt = { inner, name: (m ? m[1] : t.replace(/\(.*$/, "")).trim(), ac: m && m[2] != null ? Number(m[2]) : null, wt: m ? m[3] : "", trained: !/ej tränad/.test(am[1]) };
				}
			}
		}
	}

	// --- combat-vapen ---
	const weapons = [];
	if (primaryInner) {
		const [wt, rt] = await Promise.all([loadWeaponTable(from), loadRangeTable(from)]);
		const pDisp = linkParts(primaryInner).display;
		const pRanged = isRanged(pDisp) || isRanged(linkParts(primaryInner).target);
		weapons.push(buildWeapon(primaryInner, wt, rt, pRanged));
		const cands = singles.filter(s => s.inner !== primaryInner && norm(linkParts(s.inner).display) !== norm(pDisp));
		// Two Weapon: off-hand-vapnet är med i gear och som eget vapen. Explicit "Off-hand:" i kortet har företräde;
		// äldre kort med Two Weapon-stil men utan fältet får en gissning (närstridsvapen, helst Small/Medium).
		let offInner = pRanged ? null : offhandInner;
		if (!pRanged && !offInner && /Fighting style:\*\*\s*Two Weapon|\+\s*Two Weapon \(inlärd\)/.test(styleLine)) {
			const melee = cands.filter(s => !isRanged(linkParts(s.inner).display) && !isRanged(linkParts(s.inner).target));
			const pick = melee.find(s => { const r = wt ? wt.find(s.inner) : null; return r && /^[SM]/i.test(r.size); }) || melee[0];
			if (pick) { offInner = pick.inner; warnings.push("Kortet har Two Weapon men inget 'Off-hand:' – gissade " + linkParts(pick.inner).display + " som off-hand."); }
		}
		if (offInner) {
			const od = linkParts(offInner);
			const ow = buildWeapon(offInner, wt, rt, isRanged(od.display) || isRanged(od.target));
			ow.name += " (off-hand)";
			const dexAdj = await dexMissileAdj(stats.DEX, from);
			const rangerFree = /^Ranger$/i.test(cls) && (!armorTxt || (armorTxt.ac != null && armorTxt.ac <= 3));
			const ambi = /Dominant hand:\**\s*Ambidextr/i.test(bio);
			const spec = twoWeaponSpec || /^Ranger$/i.test(cls); // Ranger har första slotten i specialization gratis
			const pen = twoWeaponPenalty(spec, dexAdj, rangerFree, ambi);
			weapons[0].hit = pen.main; ow.hit = pen.off;
			weapons.push(ow);
		}
		let sec2 = null;
		if (pRanged) sec2 = cands.filter(s => !isRanged(linkParts(s.inner).display)).sort((a, b) => b.slots - a.slots)[0];
		else sec2 = cands.filter(s => isRanged(linkParts(s.inner).display) || isRanged(linkParts(s.inner).target)).sort((a, b) => (LAUNCHERS[norm(linkParts(b.inner).display)] ? 1 : 0) - (LAUNCHERS[norm(linkParts(a.inner).display)] ? 1 : 0) || b.slots - a.slots)[0];
		if (sec2) weapons.push(buildWeapon(sec2.inner, wt, rt, !pRanged));
	}

	// --- spells ---
	const spellRows = [];
	const groups = [];
	for (const s of sections) {
		if (s.type === "spells") groups.push({ title: s.title, mem: parseSpellLines(s.lines), list: null });
		else if (s.type === "spell-list" && groups.length) groups[groups.length - 1].list = parseSpellLines(s.lines);
	}
	for (const g of groups) {
		const isPriest = /priest|paladin|ranger|druid/i.test(g.title) || (g.list && g.list.some(x => x.items.some(i => !i.bold)) && !/wizard|bard/i.test(g.title) && false);
		const memCount = new Map(); // target -> {display, level, n}
		for (const lv of g.mem) for (const it of lv.items) { const e = memCount.get(it.target) || { display: it.display, level: lv.level, n: 0 }; e.n += it.count; memCount.set(it.target, e); }
		let all = [...memCount.entries()].map(([t, e]) => ({ target: t, display: e.display, level: e.level, n: e.n }));
		const exportAll = isPriest ? CFG.PRIEST_EXPORT_ALL : CFG.BOOK_EXPORT_ALL;
		if (exportAll && g.list) {
			all = [];
			for (const lv of g.list) for (const it of lv.items) all.push({ target: it.target, display: it.display, level: lv.level, n: (memCount.get(it.target) || { n: 0 }).n });
		}
		for (const sp of all) spellRows.push(sp);
	}
	const spells = [];
	const seen = new Set();
	for (const sp of spellRows) {
		const key = sp.level + "|" + sp.target;
		if (seen.has(key)) continue; seen.add(key);
		const d = await loadSpell(sp.target, sp.display, sp.level, from);
		spells.push(Object.assign(d, { level: sp.level, mems: sp.n }));
	}
	spells.sort((a, b) => a.level - b.level || String(a.name).localeCompare(String(b.name)));

	// ---------- bygg Roll20-JSON ----------
	const attrs = [];
	const add = (name, current, max) => attrs.push({ name, current: current == null ? "" : current, max: max == null ? "" : max });
	add("age", age || "");
	add("charisma", stats.CHA || ""); add("constitution", stats.CON || ""); add("dexterity", stats.DEX || "");
	add("intelligence", stats.INT || ""); add("strength", stats.STR || ""); add("wisdom", stats.WIS || "");
	if (stats.PCP) add("perception", stats.PCP);
	add("classes", cls + (spec && !/^Mage$/i.test(spec) ? " (" + spec + ")" : ""));
	if (hw) { add("height", hw[1] + "cm"); add("weightchar", hw[2] + "kg"); }
	if (hp) add("hp", hp, hp);
	add("languages", languages.join(", "));
	add("level", level);
	add("player_name", CFG.PLAYER_NAME);
	add("race", race);
	add("sex", /^woman|female/i.test(gender) ? "Female" : "Male");

	// Sheet-inställningar som måste vara på för att respektive flik ska visas
	add("settingPerception", "1"); add("settingPerceptionGlobal", "1");
	if (/^Thief$/i.test(cls) || Object.keys(thiefImprove).length) { add("settingThief", "1"); add("settingThiefGlobal", "1"); }
	if (groups.length || spells.length) { add("settingSpell", "1"); add("settingSpellGlobal", "1"); }
	const THIEF_ATTR = { pp: "OPPP", ol: "OOLP", fr: "OFRTP", ms: "OMSP", hs: "OHSP", dn: "ODNP", cw: "OCWP", rl: "ORLP" };
	for (const k in thiefImprove) add("thief" + THIEF_ATTR[k], thiefImprove[k]);
	nwps.forEach((n, i) => {
		const id = rowId("nwp|" + i + "|" + n.name);
		add("repeating_nwp_" + id + "_nwpname", n.name);
		if (n.attr) add("repeating_nwp_" + id + "_nwpattr", n.attr);
		if (n.adj !== "") add("repeating_nwp_" + id + "_nwpadj", n.adj.replace(/^\+/, ""));
	});
	wps.forEach((w, i) => {
		const id = rowId("wps|" + i + "|" + w.name);
		add("repeating_wps_" + id + "_wpsname", w.name);
		add("repeating_wps_" + id + "_wpsslots", String(w.slots));
	});
	weapons.forEach((w, i) => {
		const id = rowId("weapon|" + i + "|" + w.name);
		const p = "repeating_weapons_" + id + "_";
		add(p + "wname", w.name);
		if (w.dmg) add(p + "wdambase", w.dmg);
		if (w.speed) add(p + "wspeed", w.speed);
		if (w.type) add(p + "wtype", w.type);
		add(p + "wmode", w.ranged ? "@{attackmissile}" : "@{attackmelee}");
		add(p + "watks", "1");
		add(p + "whit", String(w.hit || 0));
		if (w.ranged && w.range) add(p + "wrange", w.range);
	});
	// --- rustning & sköld: egna poster i repeating_armor (aac = rustning, ashield = sköld; adex används inte) + rader i gear ---
	const armorEntries = [], carried = [];
	const r2 = x => String(Math.round(x * 100) / 100);
	if (armorTxt || shieldTxt) {
		const at = await loadArmorTable(from);
		if (armorTxt) {
			const row = at ? (at.find(armorTxt.inner || armorTxt.name) || at.findPO(armorTxt.name)) : null;
			let aac = null, wt = armorTxt.wt, cost = null;
			if (row) { aac = String(row.bonus); if (row.weight !== "") wt = row.weight; cost = row.costGp; }
			else if (armorTxt.ac != null) aac = String(armorTxt.ac);
			else warnings.push("Hittade inte rustningen '" + armorTxt.name + "' i rustningstabellerna – aac saknas.");
			armorEntries.push({ name: armorTxt.name, aac });
			if (wt !== "" && wt != null) carried.push({ name: armorTxt.name, qty: 1, cost, weight: r2(Number(wt) * (armorTxt.trained ? CFG.ARMOR_PROF_WEIGHT : 1)) });
		}
		if (shieldTxt) {
			const row = at ? at.findShield(shieldTxt) : null;
			let ashield = "1";
			if (row) ashield = String(shieldProf ? row.bonusProf : row.bonus); // proficient => kolumnen AC (Proficient), annars vanliga AC
			else warnings.push("Hittade inte skölden '" + shieldTxt + "' i rustningstabellen – ashield sätts till 1.");
			armorEntries.push({ name: shieldTxt, ashield });
			carried.push({ name: shieldTxt, qty: 1, cost: row ? row.costGp : null, weight: row ? row.weight : "" });
		}
	}
	armorEntries.forEach((a, i) => {
		const id = rowId("armor|" + i + "|" + a.name);
		const p = "repeating_armor_" + id + "_";
		add(p + "aname", a.name);
		if (a.aac != null) add(p + "aac", a.aac);
		if (a.ashield != null) add(p + "ashield", a.ashield);
		add(p + "aequipped", "1");
		add(p + "amagic", "0");
	});

	// --- gear: rustning, sköld och de vapen (+ ammunition) NPC:n bär, med cost/weight ur tabellerna ---
	const gear = carried.map(x => Object.assign({}, x));
	for (const w of weapons) for (const g of w.gear) { const ex = gear.find(x => x.name === g.name); if (ex) ex.qty = Math.max(ex.qty, g.qty); else gear.push(Object.assign({}, g)); }
	gear.forEach((g, i) => {
		const id = rowId("gear|" + i + "|" + g.name);
		add("repeating_gear1_" + id + "_g1name", g.name);
		add("repeating_gear1_" + id + "_g1quantity", String(g.qty));
		if (g.weight !== "") add("repeating_gear1_" + id + "_g1weight", g.weight);
		if (g.cost != null) add("repeating_gear1_" + id + "_g1cost", String(g.cost));
		add("repeating_gear1_" + id + "_gspot", "1");
	});
	spells.forEach(sp => {
		const id = rowId("spell|" + sp.level + "|" + sp.name);
		const p = "repeating_spells" + sp.level + "_" + id + "_";
		add(p + "spellName", sp.name);
		if (sp.school) add(p + "spellSchool", sp.school);
		if (sp.range) add(p + "spellRange", sp.range);
		if (sp.aoe) add(p + "spellAoe", sp.aoe);
		if (sp.castingTime) add(p + "spellCastingTime", sp.castingTime);
		if (sp.duration) add(p + "spellDuration", sp.duration);
		if (sp.save) add(p + "spellSave", sp.save);
		if (sp.damage) add(p + "spellDamage", sp.damage);
		add(p + "spellVerbal", sp.verbal ? "{{v=1}}" : "");
		add(p + "spellSomatic", sp.somatic ? "{{s=1}}" : "");
		add(p + "spellMaterial", sp.material ? "{{m=1}}" : 0);
		if (sp.materials) add(p + "spellMat1", sp.materials);
		if (CFG.SPELL_DESCRIPTIONS && sp.description) add(p + "spellDescription", sp.description);
		add(p + "spellmems", String(sp.mems || 0));
	});
	attrs.sort((a, b) => a.name.localeCompare(b.name));
	const json = JSON.stringify({ name: fullName, attributes: attrs }, null, 1);

	// ---------- rendera ----------
	const root = dv.container;
	const btn = root.createEl("button", { text: "📋 Kopiera Roll20-JSON" });
	const info = root.createEl("span", { text: " " + attrs.length + " attribut · " + (json.length / 1024).toFixed(1) + " kB" });
	info.style.opacity = "0.7";
	const ta = root.createEl("textarea");
	ta.value = json; ta.readOnly = true; ta.rows = 12; ta.spellcheck = false;
	ta.style.cssText = "width:100%;margin-top:6px;font-family:var(--font-monospace);font-size:0.75em;resize:vertical;";
	ta.addEventListener("focus", () => ta.select());
	btn.addEventListener("click", async () => {
		try { await navigator.clipboard.writeText(json); } catch (e) { ta.focus(); ta.select(); document.execCommand("copy"); }
		btn.textContent = "✅ Kopierat!"; setTimeout(() => { btn.textContent = "📋 Kopiera Roll20-JSON"; }, 1500);
	});
	if (warnings.length) dv.paragraph("⚠️ **Export-varningar**\n" + [...new Set(warnings)].map(w => "- " + w).join("\n"));
}
try { await main(); } catch (e) { dv.paragraph("❌ Roll20 Export misslyckades: " + e.message); console.error(e); }

}
if (typeof dv !== "undefined" && dv && dv.container) {
	// Dataview (dv.view): kör direkt. (Kollas först – Obsidian har ett globalt "module" även i Dataview.)
	return roll20Export(dv, typeof input !== "undefined" ? input : undefined);
} else if (typeof module !== "undefined" && module) {
	// Templater laddar filen som user script: registrera bara funktionen (körs aldrig av Templater)
	module.exports = roll20Export;
}
