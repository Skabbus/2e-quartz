---
obsidianUIMode: preview
cssclasses:
  - wide-page
---

```js
<%*
function roll(max) { return Math.trunc(Math.random() * max + 1); }
function aPick(a) { return a[roll(a.length)-1]; }
function aPickWeight(a, wIndex, theRoll)
	{
	wIndex = wIndex || 1;
	theRoll = theRoll || roll(a.last()[wIndex]);
	for (let i = 0; i < a.length; i++)
	{
		if (a[i][wIndex] >= theRoll)
		{
			return a[i];
		}
	}
	return a.last();
	}
function weightedChoice(options, weights) {
	const totalWeight = weights.reduce((a, b) => a + b, 0);
	let roll = Math.random() * totalWeight;
	for (let i = 0; i < options.length; i++) {
		if (roll < weights[i]) return options[i];
		roll -= weights[i];
	}
	return options[options.length - 1];
	}
function getFacialHair(gender) {
	if (gender === "Woman") return "Inget";
	const styles = [
		"Renrakad", "Stubb", "Skägg", "Mustasch", "Bockskägg",
		"Polisonger", "Långt skägg", "Ojämnt skägg", "Fläckvis skäggväxt",
		"Skäggflätor", "Tunt skägg", "Vildvuxet skägg",
		"Kort skägg", "Fylligt skägg", "Skepparkrans", "Van Dyke-skägg",
		"Soul patch", "Hakskägg", "Helmustasch", "Styrmustasch",
		"Ankarskägg", "Balboskägg", "Garibaldiskägg", "Trimmat skägg"
	];

	const weights = [
		5, // Renrakad
		4, // Stubb
		3, // Skägg
		2, // Mustasch
		2, // Bockskägg
		2, // Polisonger
		1, // Långt skägg
		1, // Ojämnt skägg
		1, // Fläckvis skäggväxt
		1, // Skäggflätor
		1, // Tunt skägg
		1  // Vildvuxet skägg
	];

	return weightedChoice(styles, weights);
	}
function getBirthday() {
    const months = [
        { name: "Januari", days: 31 },
        { name: "Februari", days: 28 }, // (Eller 29 om du vill räkna med skottår!)
        { name: "Mars", days: 31 },
        { name: "April", days: 30 },
        { name: "Maj", days: 31 },
        { name: "Juni", days: 30 },
        { name: "Juli", days: 31 },
        { name: "Augusti", days: 31 },
        { name: "September", days: 30 },
        { name: "Oktober", days: 31 },
        { name: "November", days: 30 },
        { name: "December", days: 31 }
    ];
	
    const month = aPick(months);
    const day = roll(month.days);
	
    return `${day} ${month.name}`;
	}

// Sökväg (utan .js) till Roll20-exportens view, ex. "…/Supporting Scripts/Roll20Export.js" => "…/Supporting Scripts/Roll20Export"
const ROLL20_EXPORT_VIEW = "01_Tools and Utilities/Scripting/Supporting Scripts/Roll20Export";

const CORE_CLASSES = ['Fighter', 'Cleric', 'Druid', 'Paladin', 'Ranger', 'Thief', 'Bard', "Wizard"];

const CLASS_WEIGHTS = [
    { name: 'Fighter', weight: 30 },
    { name: 'Thief', weight: 25 },

    { name: 'Bard', weight: 12 },
    { name: 'Ranger', weight: 10 },
    { name: 'Cleric', weight: 10 },
	{ name: 'Wizard', weight: 8 }, // Härsmäktiga trollkarlar får sin rättmätiga plats
    { name: 'Druid', weight: 5 },
    { name: 'Paladin', weight: 3 }
];

const CLASS_REQUIREMENTS = {
    "Fighter": { Strength: 9 },
    "Paladin": { Strength: 12, Constitution: 9, Wisdom: 13, Charisma: 17 },
    "Ranger": { Strength: 13, Dexterity: 13, Constitution: 14, Wisdom: 14 },
    "Cleric": { Wisdom: 9 },
    "Druid": { Wisdom: 12, Charisma: 15 },
    "Thief": { Dexterity: 9 },
    "Bard": { Dexterity: 13, Intelligence: 13, Charisma: 15 },
    "Wizard": { Intelligence: 9 }, // Viktig detalj!
    "Commoner": {} 
};
const spellTables = tp.user.Spellists();
function pickClass(validClasses = null) {
    let available = validClasses 
        ? CLASS_WEIGHTS.filter(c => validClasses.includes(c.name))
        : CLASS_WEIGHTS;

    if (available.length === 0) return "Fighter"; // Fallback

    let totalWeight = available.reduce((sum, c) => sum + c.weight, 0);
    let random = Math.random() * totalWeight;

    for (const entry of available) {
        if (random < entry.weight) {
            return entry.name;
        }
        random -= entry.weight;
    }
    return available[0].name;
}
// Hjälpfunktion för att kontrollera om ett statblock uppfyller en klass krav
function meetsRequirements(stats, className) {
    const reqs = CLASS_REQUIREMENTS[className];
    if (!reqs) return true;
    for (const [stat, minVal] of Object.entries(reqs)) {
        if (stats[stat] < minVal) return false;
    }
    return true;
}
const pick = (arr, n = 1) => arr.sort(() => .5 - Math.random()).slice(0, n).join(", ");
// Basfärdigheter på nivå 1 för en ren Thief
const BASE_THIEF_SKILLS = {
    pp: 15, ol: 10, fr: 5, ms: 10, hs: 5, dn: 15, cw: 60, rl: 0
};

function calculateThiefSkills(className, level, race, dexterity) {
    if (level === 0 || (["Warrior", "Priest", "Wizard"].includes(getClassGroup(className)) && className !== "Ranger")) {
        return null;
    }

    let skills = { pp: 0, ol: 0, fr: 0, ms: 0, hs: 0, dn: 0, cw: 0, rl: 0 };
    let racMod = THIEF_RACE_MODIFIERS[race] || THIEF_RACE_MODIFIERS["Human"];
    let dexMod = getDexteritySkillModifiers(dexterity);

    if (className === "Thief") {
        skills = { pp: 15, ol: 10, fr: 5, ms: 10, hs: 5, dn: 15, cw: 60, rl: 0 };

        const archetypes = [
            { name: "Burglar", weights: { ol: 35, fr: 30, ms: 15, hs: 10, dn: 5, pp: 5, cw: 0 } },
            { name: "Infiltrator", weights: { ms: 35, hs: 35, ol: 10, dn: 10, fr: 5, pp: 5, cw: 0 } },
            { name: "Cutpurse", weights: { pp: 40, cw: 20, ol: 15, ms: 10, hs: 10, dn: 5, fr: 0 } },
            { name: "Scout", weights: { dn: 35, ms: 25, hs: 20, cw: 10, fr: 5, ol: 5, pp: 0 } }
        ];
        let chosenArchetype = archetypes[Math.floor(Math.random() * archetypes.length)];

        // Nivå 1: 60 diskretionära poäng, därefter 30 per nivå. Max 30 poäng per färdighet och nivå (PHB).
        for (let lvl = 1; lvl <= level; lvl++) {
            let pointsToSpend = (lvl === 1) ? 60 : 30;
            const spentThisLevel = {};
            let guard = 0;
            while (pointsToSpend > 0 && guard++ < 300) {
                let targetSkill = pickWeightedSkillFromArchetype(chosenArchetype.weights);
                let room = 30 - (spentThisLevel[targetSkill] || 0);
                if (room <= 0) continue;
                let blockSize = (Math.random() < 0.3 && pointsToSpend >= 10) ? 10 : 5;
                if (blockSize > pointsToSpend) blockSize = pointsToSpend;
                if (blockSize > room) blockSize = room;
                skills[targetSkill] += blockSize;
                spentThisLevel[targetSkill] = (spentThisLevel[targetSkill] || 0) + blockSize;
                pointsToSpend -= blockSize;
            }
            if (lvl >= 4) skills.rl += 5;
        }

        for (let key in skills) { skills[key] += racMod[key] || 0; }
        skills.pp += dexMod.pp || 0;
        skills.ol += dexMod.ol || 0;
        skills.fr += dexMod.fr || 0;
        skills.ms += dexMod.ms || 0;
        skills.hs += dexMod.hs || 0;

    } else if (className === "Bard") {
        // Bardens fasta startvärden på nivå 1
        skills = { pp: 10, ol: 0, fr: 0, ms: 0, hs: 0, dn: 20, cw: 50, rl: 5 };
        const bardWeights = { cw: 30, dn: 30, pp: 25, rl: 15 };

        // Nivå 1 distribuerar 20 poäng
        distributeBlockPoints(skills, 20, bardWeights);

        // Därefter 15 poäng per extra nivå (från nivå 2 och uppåt)
        for (let lvl = 2; lvl <= level; lvl++) {
            distributeBlockPoints(skills, 15, bardWeights);
        }

        // Ras och Dex (bards påverkas primärt av Pick Pockets på Dex)
        for (let key in skills) { skills[key] += racMod[key] || 0; }
        skills.pp += dexMod.pp || 0;

    } else if (className === "Ranger") {
        const rangerTable = [
            { hs: 10, ms: 15 }, { hs: 15, ms: 21 }, { hs: 20, ms: 27 }, { hs: 25, ms: 33 },
            { hs: 31, ms: 40 }, { hs: 37, ms: 47 }, { hs: 43, ms: 55 }, { hs: 49, ms: 62 },
            { hs: 56, ms: 70 }, { hs: 63, ms: 78 }, { hs: 70, ms: 86 }, { hs: 77, ms: 94 },
            { hs: 85, ms: 99 }, { hs: 93, ms: 99 }, { hs: 99, ms: 99 }, { hs: 99, ms: 99 }
        ];

        let index = Math.min(level, 16) - 1;
        let base = rangerTable[index] || rangerTable[rangerTable.length - 1];

        skills.hs = base.hs;
        skills.ms = base.ms;

        skills.hs += (racMod.hs || 0) + (dexMod.hs || 0);
        skills.ms += (racMod.ms || 0) + (dexMod.ms || 0);
    }

    // Tak/golv-validering
    for (let key in skills) {
        if (skills[key] < 0) skills[key] = 0;
        if (skills[key] > 99 && className !== "Thief") skills[key] = 99;
    }

    return skills;
}

// Hjälpfunktioner för poängfördelning
function distributeBlockPoints(skills, pointsToSpend, weights) {
    while (pointsToSpend > 0) {
        let targetSkill = pickWeightedSkillFromArchetype(weights);
        let blockSize = (Math.random() < 0.3 && pointsToSpend >= 10) ? 10 : 5;
        if (blockSize > pointsToSpend) blockSize = pointsToSpend;

        skills[targetSkill] += blockSize;
        pointsToSpend -= blockSize;
    }
}

function pickWeightedSkillFromArchetype(weights) {
    let totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    for (let key in weights) {
        let w = weights[key];
        if (random < w) return key;
        random -= w;
    }
    return Object.keys(weights)[0];
}

function getDexteritySkillModifiers(dex) {
    let mod = { pp: 0, ol: 0, fr: 0, ms: 0, hs: 0 };
    if (dex <= 9) {
        mod.pp = -15; mod.ol = -10; mod.fr = -10; mod.ms = -20; mod.hs = -10;
    } else if (dex === 10) {
        mod.pp = -10; mod.ol = -5;  mod.fr = -10; mod.ms = -15; mod.hs = -5;
    } else if (dex === 11) {
        mod.pp = -5;  mod.ol = 0;   mod.fr = -5;  mod.ms = -10; mod.hs = 0;
    } else if (dex === 12) {
        mod.pp = 0;   mod.ol = 0;   mod.fr = 0;   mod.ms = -5;  mod.hs = 0;
    } else if (dex >= 13 && dex <= 15) {
        // Enligt tabellen: allt är -- (0) för 13-15
        // (ingen modifierare alls)
    } else if (dex === 16) {
        mod.ol = +5;
    } else if (dex === 17) {
        mod.pp = +5;  mod.ol = +10; mod.ms = +5;  mod.hs = +5;
    } else if (dex === 18) {
        mod.pp = +10; mod.ol = +15; mod.fr = +5;  mod.ms = +10; mod.hs = +10;
    } else if (dex >= 19) {
        mod.pp = +15; mod.ol = +20; mod.fr = +10; mod.ms = +15; mod.hs = +15;
    }
    return mod;
}

const THIEF_RACE_MODIFIERS = {
    "Human":     { pp:  0, ol:  0, fr:  0, ms:  0, hs:  0, dn:  0, cw:  0, rl:  0 },
    "Dwarf":     { pp:  0, ol: +10, fr: +15, ms:  0, hs:  0, dn:  0, cw: -10, rl: -5 },
    "Elf":       { pp: +5,  ol: -5,  fr:  0, ms: +5,  hs: +10, dn: +10, cw: -15, rl:  0 },
    "Gnome":     { pp: 0,   ol: +5,  fr: +10, ms: +5,  hs: +5,  dn: +10, cw: -15, rl:  0 },
    "Half-elf":  { pp: +10, ol:  0,  fr:  0, ms: +5,  hs: +5,  dn:  0,   cw:  0,   rl:  0 },
    "Halfling":  { pp: +5,  ol: +5,  fr: +5,  ms: +10, hs: +15, dn: +5,   cw: -15, rl: -5 }
};
// Förkortningar:
// pp: Pick Pockets, ol: Open Locks, fr: Find/Remove Traps, 
// ms: Move Silently, hs: Hide in Shadows, dn: Detect Noise, 
// cw: Climb Walls, rl: Read Languages


// Hjälpfunktion för att rulla enskild stat med valbar metod ("3d6" eller "4d6")
let statMethod = "3d6"; // Standardvärde om inget annat angetts

function rollStat() {
    if (statMethod === "4d6") {
        let rolls = [roll(6), roll(6), roll(6), roll(6)];
        rolls.sort((a, b) => a - b);
        rolls.shift(); // Ta bort lägsta
        return rolls.reduce((sum, val) => sum + val, 0);
    }
    // Klassisk 3d6
    return roll(6) + roll(6) + roll(6);
}


function rollCharacterStats(method = "3d6") {
    return {
        Strength: rollStat(method),
        Dexterity: rollStat(method),
        Constitution: rollStat(method),
        Intelligence: rollStat(method),
        Wisdom: rollStat(method),
        Charisma: rollStat(method),
        Pcp: rollStat(method)
    };
}
function getHairColor() {
	const colors = [
		"Svart", "Mörkbrun", "Ljusbrun", "Blond", "Röd",
		"Kastanj", "Askblond", "Grå", "Vit", "Silver", "Koppar"
	];
	return colors[Math.floor(Math.random() * colors.length)];
}
function getEyeColor() {
	const pool = [
		// Vanliga färger (högre sannolikhet)
		"Brun", "Brun", "Brun", "Brun", "Brun", // ~35%
		"Blå", "Blå", "Blå", "Blå", // ~28%
		"Grön", "Grön", "Grön", // ~21%
		"Grå", "Grå", // ~7%
		
		// Mindre vanliga
		"Hassel", // ~3%
		"Bärnsten", // ~2%
		"Isblå", // ~1.5%
		"Mörkgrön", // ~1.5%
		"Ljusblå", // ~1.5%
		"Violet", // ~1%
		"Svart" // ~1%
	];
	return pool[Math.floor(Math.random() * pool.length)];
}
function pickLevel() {
    const levelWeights = [
        { level: 1, weight: 100 },
        { level: 2, weight: 80 },
        { level: 3, weight: 60 },
        { level: 4, weight: 40 },
        { level: 5, weight: 25 },
        { level: 6, weight: 15 },
        { level: 7, weight: 10 },
        { level: 8, weight: 6 },
        { level: 9, weight: 4 },
        { level: 10, weight: 2 },
        { level: 11, weight: 1.5 },
        { level: 12, weight: 1 },
        { level: 13, weight: 0.8 },
        { level: 14, weight: 0.5 },
        { level: 15, weight: 0.3 },
        { level: 16, weight: 0.2 }
    ];

    const totalWeight = levelWeights.reduce((sum, l) => sum + l.weight, 0);
    let random = Math.random() * totalWeight;

    for (const entry of levelWeights) {
        if (random < entry.weight) {
            return entry.level;
        }
        random -= entry.weight;
    }
}

function pickLevel(className) {
    // Commoner är alltid level 0
    if (className === "Commoner") return 0;

    // Viktad spridning upp till level 20 (17-20 har vikt 0 för slumpning)
    const levelWeights = [
        { level: 1, weight: 25 },
        { level: 2, weight: 20 },
        { level: 3, weight: 15 },
        { level: 4, weight: 10 },
        { level: 5, weight: 8 },
        { level: 6, weight: 6 },
        { level: 7, weight: 4 },
        { level: 8, weight: 3 },
        { level: 9, weight: 2 },
        { level: 10, weight: 2 },
        { level: 11, weight: 1 },
        { level: 12, weight: 1 },
        { level: 13, weight: 1 },
        { level: 14, weight: 1 },
        { level: 15, weight: 0.5 },
        { level: 16, weight: 0.5 },
        { level: 17, weight: 0 },
        { level: 18, weight: 0 },
        { level: 19, weight: 0 },
        { level: 20, weight: 0 }
    ];

    let totalWeight = levelWeights.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;

    for (const entry of levelWeights) {
        if (random < entry.weight) {
            return entry.level;
        }
        random -= entry.weight;
    }
    return 1; // Fallback
}

const RACE_RESTRICTIONS = {
    "Human": ["Fighter", "Paladin", "Ranger", "Cleric", "Druid", "Thief", "Bard", "Wizard", "Commoner"],
    "Dwarf": ["Fighter", "Cleric", "Thief", "Commoner"], // Dvärgar kan inte vara Druid, Ranger, Bard, Paladin i strikt 2e
    "Elf": ["Fighter", "Ranger", "Cleric", "Thief", "Wizard", "Commoner"], // Elver kan inte vara Paladin/Druid/Bard
    "Halfling": ["Fighter", "Thief", "Cleric", "Commoner"],
    "Gnome": ["Fighter", "Cleric", "Thief", "Wizard", "Commoner"], // Wizard: bara som Illusionist (hanteras i wizard-blocket)
    "Half-elf": ["Fighter", "Ranger", "Cleric", "Druid", "Thief", "Bard", "Wizard", "Commoner"]
};
const { PROGRESSION_DATA,   SAVING_THROWS_DATA,   CONSTITUTION_DATA,   STRENGTH_DATA,   DEXTERITY_DATA,   INTELLIGENCE_DATA,   WISDOM_DATA,   CHARISMA_DATA,   PERCEPTION_DATA } = tp.user.ProgressionStats();

PROGRESSION_DATA["Commoner"] = [{ level: 0, hitDice: "1", hitDiceType: "d4", attackBonus: 0 }];
function getProgressionData(className, lvl) {
    const groupName = CLASS_GROUPS[className] || className;
    const groupData = PROGRESSION_DATA[groupName];

    if (!groupData) return null;

    // Hittar exakt matchning för level
    return groupData.find(item => item.level === lvl) || null;
};




function getSavingThrows(classGroup, level) {
    let groupData = SAVING_THROWS_DATA[classGroup] || SAVING_THROWS_DATA["Commoner"];
    // Hitta första intervallet där karaktärens nivå ryms under maxLvl
    let bracket = groupData.find(b => level <= b.maxLvl) || groupData[groupData.length - 1];
    return bracket;
}

// Hjälpfunktion för att kolla om en kombination är giltig
function isRaceClassCompatible(race, className) {
    if (className === "Commoner") return true;
    const allowedClasses = RACE_RESTRICTIONS[race];
    if (!allowedClasses) return true; // Om rasen saknas i listan, tillåt allt som fallback
    return allowedClasses.includes(className);
}

const CLASS_GROUPS = {
    "Fighter": "Warrior",
    "Paladin": "Warrior",
    "Ranger": "Warrior",
    "Cleric": "Priest",
    "Druid": "Priest",
    "Thief": "Rogue",
    "Bard": "Rogue",
    "Wizard": "Wizard",
    "Commoner": "Commoner" // Eller lägg till i lämplig grupp om de ska följa någon specifik mall
};
// Hjälpfunktion för att hämta grupp
function getClassGroup(className) {
    return CLASS_GROUPS[className] || "Commoner";
}

function getHairstyle(gender) {
	if (gender === "Man") {
		const maleStyles = [
			"Kortklippt", "Snaggat", "Rufsigt", "Sidbena", "Mittbena", "Halvlångt", "Långt",
			"Vågigt", "Lockigt", "Rakt", "Flätor", "Hästsvans", "Knut", "Delvis rakat",
			"Oklippt", "Tovigt", "Mohawk", "Slickat bakåt", "Tunn hårkrans",
			"Skalligt", "Halvt skalligt", "Toppknut", "Tjockt och yvigt", "Vildvuxet"
	 ];
		const weights = [
			5, 4, 4, 3, 2, 3, 2, 3, 2, 2, 2, 2, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
		];
		return weightedChoice(maleStyles, weights);
	}

	if (gender === "Woman") {

		const femaleStyles = [
			"Långt", "Halvlångt", "Vågigt", "Lockigt", "Rakt", "Flätor", "Hästsvans", "Knut",
			"Sidbena", "Mittbena", "Rufsigt", "Tovigt", "Oklippt", "Delvis rakat", "Kortklippt",
			"Uppsatt med nålar", "Toppknut", "Lösa flätor", "Snedknut", "Slingor",
			"Tjockt och yvigt", "Vildvuxet", "Rak lugg", "Gardinlugg", "Snedlugg",
			"Pixiefrisyr", "Bobfrisyr", "Lobfrisyr", "Pagefrisyr", "Lagerklippt",
			"Uppsatt", "Halvuppsatt", "Inbakad fläta", "Utbakad fläta", "Fiskbensfläta",
			"Dubbla flätor", "Låg hästsvans", "Hög hästsvans", "Rufsigt knut", "Chignon",
			"Vattenfallsfläta", "Kronafläta", "Tofsar", "Med diadem", "Volym",
			"Slät", "Beach waves", "Afro", "Dreadlocks", "Ombre"
		];
		const weights = [
			5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1
		];
		return weightedChoice(femaleStyles, weights);
	}

	return "Okänd frisyr";
}
function getSpecialFeatures() {
	const features = [
		// Ärr och skador
		"Ärr över kinden", "Ärr vid ögat", "Repa över näsan", "Brännmärke på handen", "Ärrat ögonbryn",
		"Ärr längs käken", "Skärsår på halsen", "Gamla stridsskador", "Saknar ett finger", "Saknar en tand",
		"Skadad näsa", "Halvblind", "Stel nacke", "Lätt haltande gång", "Krokigt finger", "Tuggande på läppen",
		"Konstant kisande", "Huvud som lutar åt sidan",

		// Hud och pigment
		"Fräknar", "Födelsemärke", "Leverfläck", "Vit fläck", "Skiftande hudton", "Blemmor", "Rodnad",
		"Torr hud", "Fjällande hud", "Mörka ringar under ögonen", "Glansig panna",

		// Ögonvariationer
		"Skelögd", "Olika ögonfärger", "Glansiga ögon", "Halvslutna ögon", "Djupa ögonhålor",
		"Tårkanaler som rinner", "Saknar ögonfransar", "Ögon som aldrig blinkar", "Isblå stirrande ögon",
		"Rödsprängda ögon",

		// Ansiktsdrag
		"Sneda tänder", "Saknar ögonbryn", "Djupa rynkor", "Framträdande käklinje", "Hög panna",
		"Asymmetriskt ansikte", "Tunn överläpp", "Skuggad kind", "Tydliga skrattlinjer", "Hängande ögonlock",
		"Skrovlig hudstruktur", "Tydlig näsrygg", "Smal haka", "Utstående öron",

		// Tatueringar
		"Enkla symboler", "Stamdesign över axeln", "Magiska runor", "Halvdold tatuering på halsen",
		"Helryggstatuering", "Tatuering runt ögat", "Namn eller initialer", "Cirkulära mönster",
		"Tatueringar på fingrarna", "Rituella märken", "Bleknade tatueringar", "Tatueringar med text",

		// Piercingar
		"Öronpiercing", "Näspiercing", "Ögonbrynspiercing", "Läpppiercing", "Flera örhängen", "Septumring",
		"Tunga-piercing", "Ring i hakan", "Ring i näsvingen", "Små metallstift i kinden",

		// Kroppsliga egenheter
		"Lång hals", "Kort hals", "Framåtlutande hållning", "Bredaxlad", "Smala handleder",
		"Ovanligt långa fingrar", "Tydliga blodådror", "Böjd rygg", "Stel gång", "Vaggande gång",
		"Tyst gång", "Tunga steg", "Skiftande naglar", "Missfärgade naglar"
	];

	// Fördelning: 50% inget, 25% ett, 15% två, 10% tre
	const roll = Math.random();
	let count = 0;
	if (roll < 0.5) count = 0;
	else if (roll < 0.75) count = 1;
	else if (roll < 0.9) count = 2;
	else count = 3;

	const shuffled = features.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

// --- ADLIGA EFTERNAMN ---
// Liten pool (5st) per raskategori. Halv-raser mappas mot sin huvudkategori.


// --- SMEKNAMN BASERAT PÅ UTSEENDE ---
// Returnerar antingen null (inget smeknamn) eller ett objekt {style, text}.
// style avgör hur det ska klistras ihop med förnamnet i applyNickname().



const ageTable = {
    "Human": [
        { label: "Young Adult (18–25)", weight: 15 },
        { label: "Adult (26–44)", weight: 45 },
        { label: "Early Middle Age (45–59)", weight: 25 },
        { label: "Late Middle Age (60–74)", weight: 10 },
        { label: "Old (75–89)", weight: 4 },
        { label: "Venerable (90–109)", weight: 0.9 },
        { label: "Ancient (110+)", weight: 0.1 }
    ],
    "Dwarf": [
        { label: "Young Adult (30–50)", weight: 10 },
        { label: "Adult (51–124)", weight: 40 },
        { label: "Early Middle Age (125–166)", weight: 30 },
        { label: "Late Middle Age (167–249)", weight: 15 },
        { label: "Old (250–299)", weight: 4 },
        { label: "Venerable (300–349)", weight: 0.9 },
        { label: "Ancient (350+)", weight: 0.1 }
    ],
    "Elf": [
        { label: "Young Adult (50–99)", weight: 10 },
        { label: "Adult (100–174)", weight: 40 },
        { label: "Early Middle Age (175–232)", weight: 30 },
        { label: "Late Middle Age (233–349)", weight: 15 },
        { label: "Old (350–420)", weight: 4 },
        { label: "Venerable (421–499)", weight: 0.9 },
        { label: "Ancient (500+)", weight: 0.1 }
    ],
    "Half-elf": [
        { label: "Young Adult (20–35)", weight: 15 },
        { label: "Adult (36–61)", weight: 45 },
        { label: "Early Middle Age (62–82)", weight: 25 },
        { label: "Late Middle Age (83–124)", weight: 10 },
        { label: "Old (125–149)", weight: 4 },
        { label: "Venerable (150–179)", weight: 0.9 },
        { label: "Ancient (180+)", weight: 0.1 }
    ],
    "Halfling": [
        { label: "Young Adult (20–30)", weight: 15 },
        { label: "Adult (31–49)", weight: 45 },
        { label: "Early Middle Age (50–66)", weight: 25 },
        { label: "Late Middle Age (67–99)", weight: 10 },
        { label: "Old (100–119)", weight: 4 },
        { label: "Venerable (120–139)", weight: 0.9 },
        { label: "Ancient (140+)", weight: 0.1 }
    ],
    "Gnome": [
        { label: "Young Adult (30–50)", weight: 10 },
        { label: "Adult (51–99)", weight: 40 },
        { label: "Early Middle Age (100–132)", weight: 30 },
        { label: "Late Middle Age (133–199)", weight: 15 },
        { label: "Old (200–249)", weight: 4 },
        { label: "Venerable (250–299)", weight: 0.9 },
        { label: "Ancient (300+)", weight: 0.1 }
    ]
};

function getAgeCategory(race, manualLabel) {
    const categories = ageTable[race] || ageTable["Human"];

    // 1. HANTERA SLUMP
    if (!manualLabel || manualLabel.toLowerCase() === "x" || manualLabel.toLowerCase() === "random") {
        return performRandomRoll(categories);
    }

    // 2. STENHÅRD MATCHNING
    // Vi rensar bort allt som inte är bokstäver/siffror för att undvika strul med specialtecken
    const search = manualLabel.toLowerCase().trim();
    
    // Vi letar efter en label som är EXAKT det du skrev, ELLER som börjar med det 
    // men INTE innehåller ordet "ung" om du söker efter "vuxen"
    let match = categories.find(c => {
        const label = c.label.toLowerCase();
        
        // Om du söker "vuxen" och label är "ung vuxen", så nekar vi den direkt
        if (search === "vuxen" && label.includes("ung vuxen")) return false;
        
        // Annars kör vi på exakt träff
        return label === search || label.startsWith(search);
    });

    return match ? match.label : performRandomRoll(categories);
}
// ---------- Födelseår ----------
// Metadatafilen (länknamn utan .md) innehåller "current_year::553" (alternativt frontmatter "SoA_year: 553").
const SOA_DATA_FILE = "SoA_data";
async function readCurrentYear() {
	try {
		const f = tp.file.find_tfile(SOA_DATA_FILE);
		if (!f) return null;
		const text = await app.vault.cachedRead(f);
		const m = /current_year::\s*(\d+)/.exec(text) || /^SoA_year:\s*(\d+)/m.exec(text);
		return m ? Number(m[1]) : null;
	} catch (e) { return null; }
}
// Slumpar en exakt ålder inom kategorins spann, t.ex. "Adult (26–44)". "Ancient (110+)" saknar övre gräns => 110 till 1,4 × 110.
function rollAgeInYears(label) {
	const m = /\((\d+)(?:\s*[–-]\s*(\d+)|\+)\)/.exec(label || "");
	if (!m) return null;
	const lo = Number(m[1]);
	const hi = m[2] ? Number(m[2]) : Math.round(lo * 1.4);
	return lo + Math.floor(Math.random() * (hi - lo + 1));
}
async function rollBirthYear(ageLabel) {
	const cy = await readCurrentYear();
	const years = rollAgeInYears(ageLabel);
	return (cy == null || years == null) ? null : cy - years;
}

// Hjälpfunktion: viktad slumpning mellan kategorier (t.ex. ålderskategorier, vikt-kategorier)
function performRandomRoll(categories) {
    const totalWeight = categories.reduce((sum, c) => sum + c.weight, 0);
    let roll = Math.random() * totalWeight;
    for (let i = 0; i < categories.length; i++) {
        if (roll < categories[i].weight) return categories[i].label;
        roll -= categories[i].weight;
    }
    return categories[categories.length - 1].label;
}
function raceExists(raceName) {
    const validRaces = [
        "Human",
        "Dwarf",
        "Elf",
        "Gnome",
        "Half-elf",
        "Halfling"
    ];
    
    // Jämför oavsett stora/små bokstäver
    return validRaces.some(r => r.toLowerCase() === raceName.toLowerCase());
}

function getGod() {
  const gods = [
    { name: "Altumus", chance: 0.08 },
    { name: "Urila", chance: 0.08 },
    { name: "Absuum", chance: 0.08 },
    { name: "Reluna", chance: 0.08 },
    { name: "Valentyia", chance: 0.08 },
    { name: "Catun", chance: 0.08 },
    { name: "Zhok", chance: 0.08 },
    { name: "Izgimmer", chance: 0.005 },
    { name: "Forsetus", chance: 0.0395 },
    { name: "Inganna", chance: 0.0395 },
    { name: "Vilfantur", chance: 0.0395 },
    { name: "Bolestus", chance: 0.0395 },
    { name: "Sanoo", chance: 0.0395 },
    { name: "Mercario", chance: 0.0395 },
    { name: "Neral", chance: 0.0395 },
    { name: "Confana", chance: 0.0395 },
    { name: "Zanatus", chance: 0.0395 },
    { name: "Khu'thal", chance: 0.0395 },
  ];

  while (true) {
    let roll = Math.random();
    let cumulative = 0;
    for (let god of gods) {
      cumulative += god.chance;
      if (roll < cumulative) return god.name;
    }
    // Om vi hamnar utanför (avrundningsfel), rulla igen
  }
}

const { getSocialStyle, getTemperament, getMoralCompass, getFear, getSecret, getTalent } = tp.user.PersonalityTraits();
// Hjälpfunktion för tärningsslag (t.ex. roll(10) för 1-10 eller d10)
function rollDice(sides, count = 1) {
    let total = 0;
    for (let i = 0; i < count; i++) {
        total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
}
function calculateHitPoints(hitDiceStr, hitDiceType, conModifier = 0) {
    // Om hitDice är t.ex. "9+3"
    let parts = hitDiceStr.split("+");
    let baseDiceCount = parseInt(parts[0], 10);
    let flatBonus = parts[1] ? parseInt(parts[1], 10) : 0;
    
    let dieSides = parseInt(hitDiceType.replace("d", ""), 10);
    let totalHp = 0;

    // Rulla tärningarna för basnivåerna (upp till max 9 om det är en modifierad sträng, annars hela antalet)
    let diceToRoll = Math.min(baseDiceCount, 9); 
    for (let i = 0; i < diceToRoll; i++) {
        totalHp += Math.floor(Math.random() * dieSides) + 1;
    }

    // Om det finns extra tärningar/nivåer efter 9 (t.ex. 9+3, där +3 ofta är +1 per level eller fasta tillägg beroende på regelverk, 
    // men i AD&D får tunga klasser ofta fasta HP per level efter level 9, t.ex. +3 per level för Warrior)
    if (baseDiceCount > 9) {
        // Om strängen är "9+3", "9+6" osv. (där tärningsslagen stannar på 9 och man lägger till fasta hit points per nivå)
        // Lägg till flatBonus direkt, eller om du vill rulla: här lägger vi på flatBonus som fasta HP.
        totalHp += flatBonus;
    }

    // Om det är en klass med lägre level än 9 (eller exakt 9) och det finns en flatBonus av någon anledning:
    if (baseDiceCount <= 9 && parts.length > 1) {
        totalHp += flatBonus;
    }

    // Lägg på Constitution-modifikator per tärning (eller per level upp till max gällande regler, här räknar vi per tärning/level)
    // OBS: Warriors får ofta full Con-bonus även efter level 9, andra klasser brukar få fasta +1 eller 2 totalt. 
    // Vi lägger till Con-modifikator per baslevel för enkelhetens skull:
    let totalLevels = baseDiceCount; // Förenklat
    let conTotal = conModifier * totalLevels;
    
    // Säkerställ att man alltid har minst 1 HP
    return Math.max(1, totalHp + conTotal);
}
function rollHeight(race, gender) {
    let isMan = (gender === "Man");
    let baseInches = 0;
    let modInches = 0;
    if (race === "Human") {
        baseInches = isMan ? 60 : 59;
        modInches = rollDice(10, 2); // 2d10
    } else if (race === "Dwarf") {
        baseInches = isMan ? 43 : 41;
        modInches = rollDice(10, 1); // 1d10
    } else if (race === "Elf") {
        baseInches = isMan ? 55 : 50;
        modInches = rollDice(10, 1); // 1d10
    } else if (race === "Half-elf") {
        baseInches = isMan ? 60 : 58;
        modInches = rollDice(6, 2);  // 2d6
    } else if (race === "Halfling") {
        baseInches = isMan ? 32 : 30;
        modInches = rollDice(8, 2);  // 2d8
    } else if (race === "Gnome") {
        baseInches = isMan ? 38 : 36;
        modInches = rollDice(6, 1);  // 1d6
    } else {
        baseInches = 60;
        modInches = rollDice(10, 2);
    }

    // Konvertera totalt antal tum till cm (1 tum = 2.54 cm)
    let totalInches = baseInches + modInches;
    return Math.round(totalInches * 2.54);
}
function rollWeight(race, gender) {
    let isMan = (gender === "Man");
    let baseLbs = 0;
    let modLbs = 0;
    if (race === "Human") {
        baseLbs = isMan ? 140 : 100;
        modLbs = rollDice(10, 6); // 6d10
    } else if (race === "Dwarf") {
        baseLbs = isMan ? 130 : 105;
        modLbs = rollDice(10, 4); // 4d10
    } else if (race === "Elf") {
        baseLbs = isMan ? 90 : 70;
        modLbs = rollDice(10, 3);  // 3d10
    } else if (race === "Half-elf") {
        baseLbs = isMan ? 110 : 85;
        modLbs = rollDice(12, 3); // 3d12
    } else if (race === "Halfling") {
        baseLbs = isMan ? 52 : 48;
        modLbs = rollDice(4, 5);  // 5d4
    } else if (race === "Gnome") {
        baseLbs = isMan ? 72 : 68;
        modLbs = rollDice(4, 5);  // 5d4
    } else {
        baseLbs = 140;
        modLbs = rollDice(10, 6);
    }

    // Konvertera totalt antal pund till kg (1 lb = ~0.4536 kg)
    let totalLbs = baseLbs + modLbs;
    return Math.round(totalLbs * 0.4536);
}
function pickHandedness() {
	let roll = Math.random();
	if (roll < 0.8) return "Right-handed";                    
	if (roll < 0.90) return "Left-handed";             
	return "Ambidextrous";                                
}
function pickSexuality() {
	let roll = Math.random();
	if (roll < 0.8) return "Heterosexual";                    
	if (roll < 0.90) return "Bisexual";             
	return "Homosexual";                                
}
const godMappning = {
    "Altumus": ["Life Domain"],
    "Urila": ["Death Domain", "Grave Domain"],
    "Absuum": ["Knowledge Domain"],
    "Reluna": ["Twilight Domain"],
    "Valentyia": ["Life Domain", "Peace Domain"],
    "Catun": ["War Domain"],
    "Zhok": ["Tempest Domain", "Trickery Domain"],
    "Izgimmer": ["Knowledge Domain", "Light Domain"], // Light som substitut för magiskt sken
    "Forsetus": ["Order Domain", "War Domain"],
    "Inganna": ["Trickery Domain"],
    "Vilfantur": ["Nature Domain"],
    "Bolestus": ["Death Domain", "Nature Domain"],
    "Sanoo": ["Trickery Domain", "Light Domain"],
    "Mercario": ["Forge Domain", "Order Domain"],
    "Neral": ["Peace Domain", "Life Domain"],
    "Confana": ["Grave Domain", "Life Domain"],
    "Zanatus": ["Forge Domain"],
    "Khu'thal": ["War Domain", "Death Domain"]
};

function getClericDomain(godName) {
    const domains = godMappning[godName];
    // Slumpa fram en av de tillåtna domänerna för just denna gud
    return domains[Math.floor(Math.random() * domains.length)];
}
function pickRace() {
    let roll = Math.random();
    if (roll < 0.80) return "Human";        // 80%
    if (roll < 0.84) return "Dwarf";        // 4%
    if (roll < 0.88) return "Elf";          // 4%
    if (roll < 0.92) return "Half-elf";     // 4%
    if (roll < 0.96) return "Halfling";     // 4%
    return "Gnome";                         // 4%
}
function getStatEntry(statName, value) {
    // Kopplar stat-namnet till era befintliga tabellvariabler
    const tables = {
        "Strength": STRENGTH_DATA["Strength"],
        "Dexterity": DEXTERITY_DATA["Dexterity"],
        "Constitution": CONSTITUTION_DATA["Constitution"],
        "Intelligence": INTELLIGENCE_DATA["Intelligence"],
        "Wisdom": WISDOM_DATA["Wisdom"],
        "Charisma": CHARISMA_DATA["Charisma"],
        "Perception": PERCEPTION_DATA["Perception"] // Byt ut om er tabell heter något annat
    };
    
    const dataArray = tables[statName];
    if (!dataArray) return {};
    const valStr = String(value);

    // 1. Försök hitta exakt matchning (t.ex. score: 16 eller score: "18/50")
    let found = dataArray.find(entry => String(entry.score) === valStr);
    if (found) return found;

    // 2. Leta i intervall (t.ex. "4-5" eller styrkans "18/01-50")
    return dataArray.find(entry => {
        const scoreStr = String(entry.score);
        if (!scoreStr.includes('-')) return false;

        // Hantera styrkans procentintervall om det är aktuellt
        if (scoreStr.includes('/')) {
            return isWithinSub18Range(valStr, scoreStr);
        }

        // Vanliga numeriska intervall (t.ex. "4-5")
        const [minStr, maxStr] = scoreStr.split('-');
        const numVal = parseInt(valStr, 10);
        return numVal >= parseInt(minStr, 10) && numVal <= parseInt(maxStr, 10);
    }) || dataArray[0]; // Fallback till första raden om inget annat matchar
}

// Hjälpfunktion för att hantera 18/xx-procentintervall i Styrka
function isWithinSub18Range(playerVal, rangeStr) {
    if (playerVal === rangeStr) return true;
    if (!playerVal || !playerVal.startsWith("18/")) return false;
    
    const playerPercent = parseInt(playerVal.split('/')[1], 10);
    const [r1, r2] = rangeStr.split('-');
    const minP = parseInt(r1.split('/')[1], 10);
    const maxP = r2 === "00" ? 100 : parseInt(r2, 10);

    return playerPercent >= minP && playerPercent <= maxP;
}
// Huvudfunktion som tar emot karaktärens rullade stats och klass
function getCharacterStatData(charStats, className) {
    // Först kollar vi om karaktären är en Warrior, för att hantera 18 i Strength korrekt (med procent)
    const isWarrior = getClassGroup(className) === "Warrior"; // Förutsätter att du har din getClassGroup-funktion
    
    // (Om du behöver hantera om Strength rullats som "18" men ska bli "18/01-50" osv. kan du göra den kollen först, 
    // men vi utgår från att charStats.Strength redan innehåller t.ex. "18/50" eller ett vanligt värde)

    return {
        strength: getStatEntry("Strength", charStats.Strength),
        dexterity: getStatEntry("Dexterity", charStats.Dexterity),
        constitution: getStatEntry("Constitution", charStats.Constitution),
        intelligence: getStatEntry("Intelligence", charStats.Intelligence),
        wisdom: getStatEntry("Wisdom", charStats.Wisdom),
        charisma: getStatEntry("Charisma", charStats.Charisma),
        perception: getStatEntry("Perception", charStats.Pcp) // Observera .Pcp eller .Perception beroende på ditt objekt
    };
}
// ===================== NON-WEAPON PROFICIENCIES =====================
// Klistra in detta block i "Supporting"-koden (t.ex. precis före raden: const classOptions = ...)

const NWP_PATHS = {
	PHB:  "Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions",
	PO_W: "Player's Option- Spells and Magic/Chapter 4- Proficiencies/Wizard Proficiencies/Wizard Proficiencies",
	PO_P: "Player's Option- Spells and Magic/Chapter 4- Proficiencies/Priest Proficiencies",
	PO_S: "Player's Option- Skills and Powers/Chapter 6- Nonweapon Proficiencies/Proficiency Descriptions",
	BARD: "The Complete Bard's Handbook/Chapter 4- Proficiencies/New Proficiencies",
	PAL:  "The Complete Paladin's Handbook/Chapter 5- Proficiencies/New Proficiencies",
	RANG: "The Complete Ranger's Handbook/Chapter 5- Proficiencies/New Proficiencies",
	THIEF:"The Complete Thief's Handbook/Chapter 2- Proficiencies/New Proficiencies",
	NINJA:"The Complete Ninja's Handbook/Chapter 4- Proficiencies and Martial Arts/Nonweapon Proficiencies"
};

// Format: Namn | Grupper | Källa | Ability (komma-separerat, tomt = ingen) | Modifier

const { NWP_RAW, WP_WEAPONS_RAW, NWP_SPEC_RAW, SAGE_PAIRS, NWP_BLANK, INSTRUMENTS_RAW } = tp.user.Proficiencies();


const NWP_LIST = NWP_RAW.map(line => {
	const [name, groups, src, stats, mod] = line.split("|");
	return {
		name: name,
		groups: groups.split(","),
		path: NWP_PATHS[src] + "/" + name,
		stats: stats ? stats.split(",") : [],
		mod: Number(mod) || 0
	};
});
const NWP_BY_NAME = {};
NWP_LIST.forEach(p => { NWP_BY_NAME[p.name] = p; });

// Antal proficiencies per grupp (används för att jämna ut vikterna mellan stora och små grupper)
const NWP_GROUP_SIZE = {};
NWP_LIST.forEach(p => p.groups.forEach(g => { NWP_GROUP_SIZE[g] = (NWP_GROUP_SIZE[g] || 0) + 1; }));

// ---------- Inriktningar ----------
// Instrument: kostnad styr hur vanliga de är. Era-koder som listas här slumpas aldrig (R = renässans: klaviatur m.m.).
const INSTRUMENT_EXCLUDE_ERAS = ["R"];
function instrumentWeight(cost) {
	if (cost <= 10) return 4;
	if (cost <= 40) return 3;
	if (cost <= 80) return 2;
	if (cost < 200) return 1;
	return 0.3;
}

// NWP_SPECS[proficiency] = [{ name, weight, family? }]
const NWP_SPECS = {};
for (const [pName, rows] of Object.entries(NWP_SPEC_RAW)) {
	NWP_SPECS[pName] = rows.map(r => {
		const [n, w] = r.split("|");
		return { name: n, weight: Number(w) || 1 };
	});
}
NWP_SPECS["Musical Instrument"] = INSTRUMENTS_RAW
	.map(r => { const [n, fam, era, cost] = r.split("|"); return { name: n, family: fam, era: era, weight: instrumentWeight(Number(cost)) }; })
	.filter(o => !INSTRUMENT_EXCLUDE_ERAS.includes(o.era));

// Rasens eget språk kan inte tas som Languages, Modern (det kan man redan).
function ownRaceLanguages(race) {
	const r = String(race || "");
	const own = [];
	if (/dwarf/i.test(r)) own.push("Dwarvish");
	if (/elf/i.test(r)) own.push("Elvish");   // matchar även Half-elf
	if (/halfling/i.test(r)) own.push("Halfling");
	return own;
}

function isSpecProf(name) { return !!NWP_SPECS[name]; }
// "multi" = varje extra slot är ett nytt ämne (istället för +2-bonus)
function isMultiProf(name) { return isSpecProf(name) || NWP_BLANK[name] === true; }

// Vad en proficiency kostar utanför/innanför klassens grupper
function nwpCostFor(p, info) {
	return p.groups.some(g => info.groups[g] !== undefined) ? 1 : 2;
}

// Väljer ett ämne för en proficiency med inriktning.
// used = ämnen som redan tagits för just den proficiencyn, chosen = alla valda NWP hittills,
// slotsLeft = slots kvar EFTER att själva proficiencyn betalats.
// Returnerar { subject, pairName, pairCost } eller null om inget ämne går att välja.
function pickNwpSubject(p, used, chosen, slotsLeft, info, race) {
	let options = (NWP_SPECS[p.name] || []).filter(o => !used.includes(o.name));
	if (p.name === "Languages, Modern") {
		const own = ownRaceLanguages(race);
		options = options.filter(o => !own.includes(o.name));
	}
	const usedFamilies = (NWP_SPECS[p.name] || []).filter(o => o.family && used.includes(o.name)).map(o => o.family);

	const cands = [];
	for (const o of options) {
		let w = o.weight;
		if (o.family && usedFamilies.includes(o.family)) w *= 4; // spelar gärna instrument i samma familj

		let pairName = null, pairCost = 0;
		if (p.name === "Sage Knowledge" && SAGE_PAIRS[o.name] && NWP_BY_NAME[SAGE_PAIRS[o.name]]) {
			pairName = SAGE_PAIRS[o.name];
			if (chosen[pairName]) {
				w *= 6;                                   // redan vald: perfekt match
			} else {
				pairCost = nwpCostFor(NWP_BY_NAME[pairName], info);
				if (pairCost > slotsLeft) continue;       // har inte råd med båda
			}
		}
		cands.push({ subject: o.name, weight: w, pairName: pairName, pairCost: pairCost });
	}
	if (cands.length === 0) return null;

	const total = cands.reduce((s, c) => s + c.weight, 0);
	let r = Math.random() * total;
	for (const c of cands) {
		if (r < c.weight) return c;
		r -= c.weight;
	}
	return cands[cands.length - 1];
}

// Proficiencies som "hör ihop". Relationerna görs dubbelriktade automatiskt.
const NWP_SYNERGY_RAW = {
	"Acting": ["Musical Instrument", "Singing", "Dancing", "Disguise", "Ventriloquism", "Poetry", "Etiquette"],
	"Musical Instrument": ["Singing", "Craft Instrument", "Dancing", "Poetry"],
	"Singing": ["Poetry", "Dancing", "Craft Instrument"],
	"Dancing": ["Tumbling", "Etiquette"],
	"Disguise": ["Forgery", "Ventriloquism", "Trailing"],
	"Blacksmithing": ["Armorer", "Weaponsmithing", "Mining", "Engineering"],
	"Armorer": ["Weaponsmithing", "Leatherworking"],
	"Weaponsmithing": ["Bowyer-Fletcher"],
	"Bowyer-Fletcher": ["Carpentry", "Tracking", "Survival"],
	"Tracking": ["Survival", "Animal Lore", "Camouflage", "Set Snares", "Direction Sense", "Trailing"],
	"Survival": ["Fire-building", "Fishing", "Direction Sense", "Set Snares", "Animal Lore", "Endurance", "Mountaineering"],
	"Camouflage": ["Set Snares", "Survival"],
	"Fishing": ["Cooking", "Seamanship", "Swimming", "Boat Piloting"],
	"Animal Handling": ["Animal Training", "Riding, Land-Based", "Animal Lore", "Riding, Airborne", "Agriculture"],
	"Animal Training": ["Riding, Land-Based", "Charioteering", "Animal Lore"],
	"Riding, Land-Based": ["Jousting", "Charioteering", "Heraldry"],
	"Jousting": ["Heraldry", "Etiquette"],
	"Heraldry": ["Etiquette", "Local History", "Ancient History"],
	"Etiquette": ["Local History", "Bureaucracy", "Administration"],
	"Bureaucracy": ["Administration", "Reading-Writing", "Local History", "Forgery"],
	"Administration": ["Reading-Writing", "Local History"],
	"Alchemy": ["Herbalism", "Arcanology", "Glassblowing", "Toxicology", "Spellcraft", "Anatomy"],
	"Herbalism": ["Healing", "Toxicology", "Cooking", "Brewing", "Agriculture"],
	"Healing": ["Anatomy", "Religion", "Undead Lore", "Toxicology"],
	"Anatomy": ["Toxicology"],
	"Reading-Writing": ["Languages, Ancient", "Languages, Modern", "Scribe", "Bookbinding", "Papermaking", "Cryptography", "Ancient History"],
	"Scribe": ["Bookbinding", "Papermaking", "Forgery"],
	"Bookbinding": ["Papermaking"],
	"Forgery": ["Papermaking", "Cryptography"],
	"Religion": ["Undead Lore", "Ancient History", "Languages, Ancient", "Local History", "Omen Reading"],
	"Spellcraft": ["Arcanology", "Concentration", "Languages, Ancient", "Omen Reading"],
	"Arcanology": ["Ancient History", "Sage Knowledge", "Languages, Ancient", "Concentration"],
	"Sage Knowledge": ["Ancient History", "Languages, Ancient", "Languages, Modern"],
	"Ancient History": ["Languages, Ancient", "Local History"],
	"Seamanship": ["Boat Piloting", "Navigation", "Swimming", "Rope Use", "Riding, Sea-based"],
	"Navigation": ["Cartography", "Direction Sense", "Boat Piloting"],
	"Cartography": ["Direction Sense", "Mountaineering"],
	"Direction Sense": ["Mountaineering"],
	"Locksmithing": ["Appraising", "Gem Cutting", "Forgery", "Blacksmithing"],
	"Appraising": ["Gem Cutting", "Gaming", "Local History"],
	"Gem Cutting": ["Mining"],
	"Gaming": ["Prestidigitation", "Juggling"],
	"Tumbling": ["Jumping", "Tighrope Walking", "Juggling", "Rope Use"],
	"Juggling": ["Prestidigitation", "Tighrope Walking", "Throwing"],
	"Jumping": ["Running", "Tighrope Walking"],
	"Prestidigitation": ["Ventriloquism"],
	"Cooking": ["Brewing", "Agriculture"],
	"Brewing": ["Agriculture"],
	"Carpentry": ["Stonemasonry", "Engineering", "Boat Piloting"],
	"Stonemasonry": ["Mining", "Engineering"],
	"Mining": ["Engineering"],
	"Leatherworking": ["Cobbling", "Seamstress-Tailor"],
	"Seamstress-Tailor": ["Weaving"],
	"Pottery": ["Glassblowing", "Artistic Ability"],
	"Artistic Ability": ["Poetry", "Heraldry"],
	"Endurance": ["Running", "Swimming", "Mountaineering"],
	"Mountaineering": ["Rope Use"],
	"Reading Lips": ["Trailing", "Disguise"],
	"Set Snares": ["Trailing"]
};
const NWP_RELATED = {};
Object.entries(NWP_SYNERGY_RAW).forEach(([a, list]) => {
	list.forEach(b => {
		(NWP_RELATED[a] = NWP_RELATED[a] || new Set()).add(b);
		(NWP_RELATED[b] = NWP_RELATED[b] || new Set()).add(a);
	});
});

// initial = startslots, every = ny slot per X nivåer, groups = viktning per proficiency-grupp
const NWP_CLASS_INFO = {
	"Fighter":  { initial: 3, every: 3, groups: { Warrior: 10, General: 5 } },
	"Paladin":  { initial: 3, every: 3, groups: { Warrior: 8, Priest: 6, General: 4 } },
	"Ranger":   { initial: 3, every: 3, groups: { Warrior: 8, Wizard: 3, General: 5 } },
	"Cleric":   { initial: 4, every: 3, groups: { Priest: 10, General: 5 } },
	"Druid":    { initial: 4, every: 3, groups: { Priest: 8, Warrior: 4, General: 5 } },
	"Wizard":   { initial: 4, every: 3, groups: { Wizard: 10, General: 5 } },
	"Thief":    { initial: 3, every: 4, groups: { Rogue: 10, General: 5 } },
	"Bard":     { initial: 3, every: 4, groups: { Rogue: 7, Warrior: 3, Wizard: 3, General: 5 } },
	"Commoner": { initial: 3, every: 0, groups: { General: 10 } }
};

function getIntNwpBonus(int) {
	int = Number(int);
	if (int <= 1) return 0;
	if (int <= 8) return 1;
	if (int <= 11) return 2;
	if (int <= 13) return 3;
	if (int <= 15) return 4;
	if (int === 16) return 5;
	if (int === 17) return 6;
	if (int === 18) return 7;
	if (int === 19) return 8;
	if (int === 20) return 9;
	if (int === 21) return 10;
	if (int === 22) return 11;
	if (int === 23) return 12;
	if (int === 24) return 15;
	return 20;
}

function getNwpSlots(className, level, intelligence) {
	const info = NWP_CLASS_INFO[className] || NWP_CLASS_INFO["Commoner"];
	// Enligt exemplet: lvl 6 wizard = 4 + 1. Vill du ha "en ny slot PÅ nivå 3, 6, 9..."
	// byt (level - 1) mot level nedan.
	const levelSlots = (info.every && level > 0) ? Math.floor((level - 1) / info.every) : 0;
	return info.initial + levelSlots + getIntNwpBonus(intelligence);
}

// Hur väl en proficiency matchar karaktärens ability scores (0.4x – 2.2x)
function nwpStatFactor(p, charStats) {
	if (!p.stats.length) return 1;
	const avg = p.stats.reduce((s, st) => s + Number(charStats[st] || 10), 0) / p.stats.length;
	return Math.max(0.4, Math.min(2.2, 0.4 + (avg - 3) * 0.12));
}

// Returnerar { slots, list: [{ p, count, subjects }] } sorterad alfabetiskt.
// count = antal slots i proficiencyn. För proficiencies med inriktning (Musical Instrument m.fl.)
// är varje slot ett eget ämne i subjects; för övriga ger extra slots +2 per slot.
function pickNonweaponProficiencies(className, level, charStats, race) {
	const info = NWP_CLASS_INFO[className] || NWP_CLASS_INFO["Commoner"];
	const totalSlots = getNwpSlots(className, level, charStats.Intelligence);
	let slots = totalSlots;

	// Vid många slots ökar chansen att man väljer utanför sina grupper
	const surplus = Math.max(0, totalSlots - 8);
	const outsideWeight = Math.min(1.2, 0.1 + 0.04 * surplus);

	const chosen = {};     // namn -> antal slots
	const subjects = {};   // namn -> valda ämnen (bara proficiencies med inriktning)
	const blocked = {};    // proficiencies där inga ämnen återstår
	let guard = 0;

	while (slots > 0 && guard++ < 300) {
		const candidates = [];

		for (const p of NWP_LIST) {
			if (blocked[p.name]) continue;
			const have = chosen[p.name] || 0;
			const multi = isMultiProf(p.name);
			if (have >= (multi ? 4 : 3)) continue;

			// Bästa gruppvikt, normaliserad mot gruppens storlek
			let weight = 0;
			for (const g of p.groups) {
				if (info.groups[g] !== undefined) {
					weight = Math.max(weight, info.groups[g] * 10 / NWP_GROUP_SIZE[g]);
				}
			}
			let cost = 1;
			if (weight === 0) { weight = outsideWeight; cost = 2; } // utanför grupp kostar +1 slot
			if (have > 0) { weight *= multi ? 0.35 : 0.12; cost = 1; } // extra slot i samma = ovanligt
			if (cost > slots) continue;

			weight *= nwpStatFactor(p, charStats);

			// Synergi med redan valda
			const related = NWP_RELATED[p.name];
			if (related) {
				let matches = 0;
				for (const c in chosen) if (related.has(c)) matches++;
				weight *= Math.min(6, 1 + 2 * matches);
			}

			candidates.push({ p: p, weight: weight, cost: cost });
		}

		if (candidates.length === 0) break;

		const totalWeight = candidates.reduce((s, c) => s + c.weight, 0);
		let r = Math.random() * totalWeight;
		let picked = candidates[candidates.length - 1];
		for (const c of candidates) {
			if (r < c.weight) { picked = c; break; }
			r -= c.weight;
		}

		const name = picked.p.name;

		if (isSpecProf(name)) {
			const used = subjects[name] || [];
			const res = pickNwpSubject(picked.p, used, chosen, slots - picked.cost, info, race);
			if (!res) { blocked[name] = true; continue; }   // inget ämne kvar/inte råd: välj något annat
			(subjects[name] = subjects[name] || []).push(res.subject);
			chosen[name] = (chosen[name] || 0) + 1;
			slots -= picked.cost;
			// Sage Knowledge i ett ämne som även finns som vanlig NWP: karaktären får båda
			if (res.pairName && !chosen[res.pairName]) {
				chosen[res.pairName] = 1;
				slots -= res.pairCost;
			}
		} else {
			chosen[name] = (chosen[name] || 0) + 1;
			slots -= picked.cost;
		}
	}

	const list = NWP_LIST
		.filter(p => chosen[p.name])
		.map(p => ({ p: p, count: chosen[p.name], subjects: (subjects[p.name] || []).slice().sort() }))
		.sort((a, b) => a.p.name.localeCompare(b.p.name));

	return { slots: totalSlots, list: list };
}

// Bygger Obsidian-callouten som rader. Pipe i wikilänken måste escapas (\|) inuti en tabell.
// Proficiencies med inriktning skrivs "Namn (ämne)"; Ancient History / Languages, Ancient / Local History
// skrivs "Namn (_undetermined_)" så att du själv fyller i dem.
function buildNwpCallout(nwp, charStats) {
	const lines = [
		">",
		">> [!nwp]- Non-weapon Proficiencies (" + nwp.slots + " slots)",
		"> > | Proficiency | Ability | Score | Mod |",
		"> > | ----------- | :-----: | :---: | :-: |"
	];
	if (nwp.list.length === 0) {
		lines.push("> > | *Inga* | | | |");
		return lines;
	}
	const addRow = (p, label, bonus) => {
		const link = "[[" + p.path + "\\|" + p.name + "]]" + (label ? " (" + label + ")" : "") + (bonus ? " (+" + bonus + ")" : "");
		const ability = p.stats.length ? p.stats.map(s => s.slice(0, 3).toUpperCase()).join("/") : "—";
		const score = p.stats.length ? p.stats.map(s => charStats[s]).join("/") : "—";
		const mod = p.stats.length ? ((p.mod + bonus) >= 0 ? "+" : "") + (p.mod + bonus) : "—";
		lines.push("> > | " + link + " | " + ability + " | " + score + " | " + mod + " |");
	};
	for (const entry of nwp.list) {
		const p = entry.p;
		const bonus = (entry.count - 1) * 2;
		if (entry.subjects.length) {
			entry.subjects.forEach(s => addRow(p, s, 0));                       // ett ämne per slot
		} else if (NWP_BLANK[p.name] === true) {
			for (let i = 0; i < entry.count; i++) addRow(p, "_undetermined_", 0); // ett blankt ämne per slot
		} else if (NWP_BLANK[p.name] === false) {
			addRow(p, "_undetermined_", bonus);
		} else {
			addRow(p, "", bonus);
		}
	}
	return lines;
}

// ===================== WEAPON PROFICIENCIES =====================
// Klistra in detta block i "Supporting"-koden, direkt efter NWP-blocket
// (före raden: const classOptions = ...)
//
// Regler som används (från Weapon Proficiencies.md):
//  - Slots: Warrior 4 (+1 per 3 nivåer), Wizard 1 (+1/6), Priest 2 (+1/4), Rogue 2 (+1/4)
//  - 1 slot = en vapen-proficiency (+ familiarity med resten av tight group)
//  - 2 slots = tight group, 3 slots = broad group (gäller retroaktivt)
//  - Specialization (+1 slot) bara Warrior-klasser, Mastery/High/Grand (+1 vardera) bara Fighter
//  - Shield Proficiency och Armor Proficiency kostar 1 slot vardera
//  - Fighting style: basstilen är gratis (Single/Missile: alla, Two-handed: Warrior/Priest/Wizard,
//    Weapon & Shield: Warrior/Priest, Two Weapon: Warrior/Rogue). Style specialization = 1 slot.

const WPG_APH = "Axes, Picks, and Hammers";
const WPG_CMF = "Clubs, Maces, and Flails";
const WPG_SW = "Swords";
const WPG_POLE = "Polearms";
const WPG_SPJ = "Spears & Javelins";

const WP_CLASS_INFO = {
	Warrior:  { initial: 4, every: 3, unprof: -2, fam: -1 },
	Wizard:   { initial: 1, every: 6, unprof: -5, fam: -3 },
	Priest:   { initial: 2, every: 4, unprof: -3, fam: -2 },
	Rogue:    { initial: 2, every: 4, unprof: -3, fam: -2 },
	Commoner: { initial: 1, every: 0, unprof: -5, fam: -3 }
};

// OBS: CLASS_GROUPS saknar "Wizard" -> getClassGroup("Wizard") ger "Commoner". Se till att lägga till
// "Wizard": "Wizard" i CLASS_GROUPS (påverkar även saves). Den här hjälparen funkar oavsett.
function wpGroup(className) { return className === "Wizard" ? "Wizard" : getClassGroup(className); }

// Namn | Wikilänk ("=" = samma som namn, "Mål>Alias", tomt = ingen länk) | Tight groups (;) | Broad groups (;)
// | Typ (M=närstrid, R=skjutvapen, T=kast) | Händer (1/2/v=versatile) | Kostnad gp | Popularitet | Flaggor
// Flaggor: c=Cleric d=Druid t=Thief w=Wizard k=Commoner (övriga klasser får allt)
//          n=adlig favorit  s=sekundärvapen (lans)  m=sidovapen (aldrig primärt för Warrior/Priest)  B=stort (ej Halfling/Gnome)


const WP_WEAPONS = WP_WEAPONS_RAW.map(line => {
	const f = line.split("|");
	return {
		name: f[0], link: f[1],
		tights: f[2] ? f[2].split(";") : [],
		broads: f[3] ? f[3].split(";") : [],
		kind: f[4], hands: f[5], cost: Number(f[6]), pop: Number(f[7]), flags: f[8] || ""
	};
});
const WP_BY_NAME = {};
WP_WEAPONS.forEach(w => { WP_BY_NAME[w.name] = w; });

// Vilka broad groups tillhör en tight group (via dess medlemmar)
const WP_TIGHT_BROADS = {};
WP_WEAPONS.forEach(w => w.tights.forEach(t => {
	WP_TIGHT_BROADS[t] = WP_TIGHT_BROADS[t] || [];
	w.broads.forEach(b => { if (!WP_TIGHT_BROADS[t].includes(b)) WP_TIGHT_BROADS[t].push(b); });
}));

function wpLink(w) {
	if (!w.link) return w.name;
	if (w.link === "=") return "[[" + w.name + "]]";
	const p = w.link.split(">");
	return "[[" + p[0] + "\\|" + p[1] + "]]";
}

// Cleric: gudens vapen och vapengrupper kostar 1 slot (som vanligt). Alla andra vapen går att köpa, men kostar 2 slots.
const WP_OFFLIST_WEIGHT = 0.03; // 🎲 Relativ sannolikhet att en Cleric väljer ett vapen utanför gudens lista (1 = lika ofta som gudens egna vapen)
function wpOffList(className, w) {
	if (className !== "Cleric" || !currentGod()) return false;
	return !godAllowsWeapon(globalThis.__NPC_GOD, w);
}
function wpCostOf(className, w) { return wpOffList(className, w) ? 2 : 1; }

function wpAllowed(className, w) {
	if (className === "Cleric" && currentGod()) return godAllowsWeapon(globalThis.__NPC_GOD, w) || !w.flags.includes("g");
	if (w.flags.includes("g")) return false; // "g" = bara via gudens vapenlista
	if (["Fighter", "Paladin", "Ranger", "Bard"].includes(className)) return true;
	const f = { Cleric: "c", Druid: "d", Thief: "t", Wizard: "w", Commoner: "k" }[className];
	return !!f && w.flags.includes(f);
}

// ---------- Rustning ----------
const WP_ARMOR = [
	{ name: "Padded armor", cost: 4, ac: 2, wt: 10, link: "Padded Armor (AC 8)" },
	{ name: "Leather armor", cost: 5, ac: 2, wt: 15, link: "Leather Armor (AC 8)" },
	{ name: "Cord armor", cost: 10, ac: 2, wt: 15, link: "00_Rulebook/Player's Option- Combat and Tactics/Chapter Seven- Weapons and Armor/Equipment Groups/Armor" },
	{ name: "Studded leather", cost: 20, ac: 3, wt: 25, link: "Studded Leather Armor (AC 7)" },
	{ name: "Hide armor", cost: 35, ac: 4, wt: 30, link: "Hide Armor (AC 6)" },
	{ name: "Ring mail", cost: 40, ac: 3, wt: 30, link: "Ring Mail" },
	{ name: "Wood/bone armor", cost: 50, ac: 3, wt: 20, link: "00_Rulebook/Player's Option- Combat and Tactics/Chapter Seven- Weapons and Armor/Equipment Groups/Armor" },
	{ name: "Scale armor", cost: 60, ac: 4, wt: 40, link: "Scale Mail (AC 6)" },
	{ name: "Chain mail", cost: 75, ac: 5, wt: 40, link: "Chain Mail (AC 5)" },
	{ name: "Light scale", cost: 80, ac: 3, wt: 25, link: "00_Rulebook/Player's Option- Combat and Tactics/Chapter Seven- Weapons and Armor/Equipment Groups/Armor" },
	{ name: "Splint mail", cost: 80, ac: 6, wt: 40, link: "Splint Mail" },
	{ name: "Brigandine", cost: 120, ac: 4, wt: 35, link: "Brigandine Armor (AC 6)" },
	{ name: "Improved mail", cost: 180, ac: 6, wt: 50, link: "00_Rulebook/Player's Option- Combat and Tactics/Chapter Seven- Weapons and Armor/Equipment Groups/Armor" },
	{ name: "Banded mail", cost: 200, ac: 6, wt: 35, link: "Banded Mail (AC 4)" },
	{ name: "Metal lamellar", cost: 250, ac: 5, wt: 35, link: "00_Rulebook/Player's Option- Combat and Tactics/Chapter Seven- Weapons and Armor/Equipment Groups/Armor" },
	{ name: "Bronze plate", cost: 400, ac: 6, wt: 45, link: "Bronze Plate Mail (AC 4)" },
	{ name: "Plate mail", cost: 600, ac: 7, wt: 50, link: "Plate Mail (AC 3)" },
	{ name: "Field plate", cost: 2000, ac: 8, wt: 60, link: "Field Plate Armor (AC 2)" },
	{ name: "Full plate", cost: 4000, ac: 9, wt: 70, link: "Full Plate Armor (AC 1)" }
];
const WP_ARMOR_ACCESS = {
	Fighter: null, Paladin: null, Ranger: null, Cleric: null, // null = all
	Druid: ["Padded armor", "Leather armor", "Cord armor", "Hide armor", "Wood/bone armor"],
	Thief: ["Padded armor", "Leather armor", "Cord armor", "Studded leather"],
	Bard: ["Padded armor", "Leather armor", "Cord armor", "Studded leather", "Hide armor", "Ring mail", "Wood/bone armor", "Scale armor", "Light scale", "Brigandine", "Chain mail"],
	Wizard: [], Commoner: []
};

// Ungefärlig "plånbok" för utrustning i gp. Adliga har betydligt mer.
function wpBudget(className, lvl, isNoble) {
	if (className === "Commoner") return isNoble ? 150 : 40;
	let b = 120 * Math.pow(1.5, Math.max(0, lvl - 1));
	if (isNoble) b = b * 3 + 200;
	return b * (0.7 + Math.random() * 0.6);
}

// Tung rustning väljs oftare av adliga och av folk med låg Dex (de har ingen Dex-bonus att luta sig mot).
// Studded leather eller lättare = rustning som rangerns specialförmågor (two-weapon utan straff, hide/move silently) kräver
const WP_LIGHT_ARMOR = ["Padded armor", "Leather armor", "Cord armor", "Studded leather"];
function wpPickArmor(className, isNoble, dex, str, budget, lvl, style) {
	// Bards (level 2+) kan inte casta i rustning, så de flesta reser utan. Bara en liten andel (BARD_ARMOR_CHANCE, flaggan __BARD_ARMORED) bär rustning på resa.
	if (className === "Bard" && lvl >= 2 && !globalThis.__BARD_ARMORED) return null;
	const access = (className === "Cleric" && currentGod()) ? godArmorList(currentGod()) : WP_ARMOR_ACCESS[className];
	if (access && access.length === 0) return null;
	if (Math.random() < 0.05) return null;
	const list = WP_ARMOR.filter(a => (!access || access.includes(a.name)) && a.cost <= budget);
	if (!list.length) return null;
	let p = 1.2 + (isNoble ? 0.8 : 0) + (dex <= 9 ? 0.8 : dex <= 11 ? 0.4 : 0) - (dex >= 15 ? 0.6 : 0) - (dex >= 17 ? 0.6 : 0);
	if (className === "Paladin") p += 0.5;
	if (className === "Ranger") p -= 0.5;
	p = Math.max(0.2, p);
	// Ranger: kraftigt föredra studded leather eller lättare (särskilt med two-weapon-stil, där tung rustning ger attackstraff)
	const rangerHeavy = className === "Ranger" ? (style === "twoweapon" ? 0.08 : 0.25) : 1;
	const ws = list.map(a => Math.pow(a.ac, p) * (a.cost > budget * 0.6 ? 0.5 : 1) * ((str <= 8 && a.wt > 40) ? 0.4 : 1)
		* (className === "Ranger" ? (WP_LIGHT_ARMOR.includes(a.name) ? 4 : rangerHeavy) : className === "Bard" ? (WP_LIGHT_ARMOR.includes(a.name) ? 5 : 0.15) : 1));
	return weightedChoice(list, ws);
}

// Länk till rustningens sida (om den finns i PHB-tabellen), annars bara namnet.
function wpArmorLink(a) {
	return a.link ? "[[" + a.link + "\\|" + a.name + "]]" : a.name;
}

function wpPickShield(className, isNoble, armor) {
	const types = ["Buckler", "Small shield", "Medium shield", "Body shield"];
	const w = [2, 3, 4, 3];
	if (armor && armor.ac >= 6) { w[3] *= 2; w[2] *= 1.5; w[0] *= 0.3; }
	if (isNoble) { w[2] *= 1.3; w[3] *= 1.3; }
	if (["Thief", "Bard", "Ranger"].includes(className)) { w[0] *= 2; w[1] *= 1.5; w[3] *= 0.2; }
	if (className === "Cleric" && currentGod()) {
		const allowed = godShieldList(currentGod());
		const idx = types.map((t, i) => i).filter(i => allowed.includes(types[i]));
		if (!idx.length) return null;
		return weightedChoice(idx.map(i => types[i]), idx.map(i => w[i]));
	}
	return weightedChoice(types, w);
}

// ---------- Fighting styles ----------
const WP_STYLE_WEIGHTS = {
	Fighter:  { single: 20, twohand: 22, shield: 34, twoweapon: 14, missile: 10 },
	Paladin:  { single: 15, twohand: 20, shield: 55, twoweapon: 5, missile: 5 },
	Ranger:   { single: 10, twohand: 8, shield: 3, twoweapon: 50, missile: 29 }, // Two-weapon gratis utan straff i lätt rustning
	Cleric:   { single: 30, twohand: 10, shield: 60 },
	Druid:    { single: 35, twohand: 25, shield: 30, missile: 10 },
	Thief:    { single: 45, twoweapon: 25, missile: 30 },
	Bard:     { single: 55, twoweapon: 25, missile: 20 },
	Wizard:   { single: 40, twohand: 45, missile: 15 },
	Commoner: { single: 50, missile: 20 }
};
const WP_STYLE_INFO = {
	single:    { name: "Single Weapon", spec: "[[One-handed Weapon Style]]" },
	twohand:   { name: "Two-handed Weapon", spec: "[[Two-handed Weapon Style]]" },
	shield:    { name: "Weapon and Shield", spec: "[[00_Rulebook/Player's Option- Combat and Tactics/Chapter Four- Weapon Specialization and Mastery/Fighting Style Specializations/Weapon and Shield Style\\|Weapon and Shield Style]]" },
	twoweapon: { name: "Two Weapon", spec: "[[00_Rulebook/Player's Option- Combat and Tactics/Chapter Four- Weapon Specialization and Mastery/Fighting Style Specializations/Two-Weapon Style\\|Two-Weapon Style]]" },
	missile:   { name: "Missile or Thrown Weapon", spec: "[[Missile or Thrown Weapon Style]]" }
};
const WP_STYLE_FILTER = {
	single:    w => w.kind.includes("M") && (w.hands === "1" || w.hands === "v"),
	shield:    w => w.kind.includes("M") && (w.hands === "1" || w.hands === "v"),
	twoweapon: w => w.kind.includes("M") && w.hands === "1",
	twohand:   w => w.kind.includes("M") && (w.hands === "2" || w.hands === "v"),
	missile:   w => /[RT]/.test(w.kind)
};

// Stilar som INTE är gratis för gruppen men som man kan lära sig mot en slot (antagande: 1 slot).
// Värdena är relativa vikter. Warrior har redan alla gratis; Commoner/Wizard-sköld är ovanligt men möjligt.
const WP_EXTRA_STYLES = {
	Priest: { twoweapon: 100 },
	Rogue:  { shield: 50, twohand: 50 },
	Wizard: { twoweapon: 60, shield: 20 }
};

// Vapnets "funktion" i en strid. Två vapen med samma funktion är redundanta; olika funktioner kompletterar varandra.
//  melee = vanligt närstridsvapen, reach = tvåhands/stavvapen/polearms, ranged = skjut- och kastvapen,
//  sidearm = dolk-liknande reserv, mounted = lans
function wpRole(w) {
	if (w.flags.includes("s")) return "mounted";
	if (w.kind.includes("R") || w.kind === "T") return "ranged";
	if (w.flags.includes("m")) return "sidearm";
	if (w.hands === "2" || w.broads.includes(WPG_POLE)) return "reach";
	return "melee";
}

// ---------- Viktning av vapen ----------
function wpRaceFactor(race, w) {
	let f = 1;
	const inB = b => w.broads.includes(b);
	if (race === "Dwarf") { if (inB(WPG_APH)) f *= 3; if (w.tights.includes("Crossbows")) f *= 1.5; if (inB("Bows")) f *= 0.5; }
	else if (race === "Elf") { if (inB("Bows")) f *= 2.5; if (inB(WPG_SW)) f *= 1.5; }
	else if (race === "Half-elf") { if (inB("Bows")) f *= 1.4; }
	else if (race === "Halfling") { if (w.name === "Sling") f *= 4; if (w.name === "Short Sword" || w.name === "Hand Axe") f *= 2; }
	else if (race === "Gnome") { if (["War Hammer", "Light Crossbow", "Hand Crossbow"].includes(w.name)) f *= 2.5; if (w.name === "Short Sword") f *= 1.5; }
	return f;
}

function wpWeight(w, ctx) {
	if (w.cost > ctx.budget) return 0;
	let wt = w.pop;
	if (w.cost * 3 > ctx.budget) wt *= 0.25;
	if (w.flags.includes("n")) wt *= ctx.noble ? 3 : 0.7;
	else if (ctx.noble && w.cost <= 2) wt *= 0.5;
	if (w.hands === "2" || w.flags.includes("B")) { if (ctx.str >= 14) wt *= 1.3; else if (ctx.str <= 8) wt *= 0.4; }
	if (/[RT]/.test(w.kind) && !w.kind.includes("M")) { if (ctx.dex >= 14) wt *= 1.3; else if (ctx.dex <= 8) wt *= 0.6; }
	if (ctx.off && ctx.off(w)) wt *= WP_OFFLIST_WEIGHT; // Cleric: vapen utanför gudens lista är ovanliga (kostar 2 slots)
	return wt * wpRaceFactor(ctx.race, w);
}

function wpPick(list, ctx, extra) {
	if (ctx.afford) list = list.filter(ctx.afford); // har man råd (slots kvar) med vapnets kostnad?
	if (!list.length) return null;
	const ws = list.map(w => Math.max(0, wpWeight(w, ctx) * (extra ? extra(w) : 1)));
	if (ws.every(x => x === 0)) return null;
	return weightedChoice(list, ws);
}

// ---------- Huvudfunktion ----------
// Returnerar { slots, used, style, primary, st, retroTights, retroBroads, armor, familiar, info, arch }
function pickWeaponProficiencies(className, lvl, race, charStats, isNoble) {
	const grp = wpGroup(className);
	const info = WP_CLASS_INFO[grp] || WP_CLASS_INFO.Commoner;
	const slots = info.initial + (info.every ? Math.floor(lvl / info.every) : 0);
	const str = Number(charStats.Strength), dex = Number(charStats.Dexterity);
	const warrior = grp === "Warrior", fighter = className === "Fighter";
	const small = race === "Halfling" || race === "Gnome";
	const budget = wpBudget(className, lvl, isNoble);
	const weapons = WP_WEAPONS.filter(w => wpAllowed(className, w) && !(small && w.flags.includes("B")));
	const ctx = { budget: budget, noble: isNoble, str: str, dex: dex, race: race };
	const isOff = w => wpOffList(className, w);
	ctx.off = isOff;
	// Gruppköp (tight/broad) för Cleric: bara grupper där ALLA vapen finns på gudens lista (annars skulle man få vapen utanför listan för 2-3 slots)
	const groupOnList = (key, n) => !WP_WEAPONS.some(x => x[key].includes(n) && isOff(x));
	const has = (w, f) => w.flags.includes(f);
	const isMissile = w => /[RT]/.test(w.kind);
	const isMelee = w => w.kind.includes("M");
	const sameGroup = (a, b) => a.tights.some(t => b.tights.includes(t)) || a.broads.some(x => b.broads.includes(x));

	const st = { singles: {}, extra: {}, tights: [], broads: [], shield: null, armor: null, styleSpec: null, extraStyle: null };
	let rem = slots;
	ctx.afford = w => wpCostOf(className, w) <= rem;
	// st.extra[namn] = extra slots utöver 1 (Cleric: vapen utanför gudens lista kostar 2 slots totalt)
	const buySingle = w => {
		if (!w || st.singles[w.name]) return false;
		const c = wpCostOf(className, w);
		if (rem < c) return false;
		st.singles[w.name] = 1; if (c > 1) st.extra[w.name] = c - 1; rem -= c; return true;
	};
	const upgrade = (w, capN) => { const cur = st.singles[w.name]; if (!cur || rem < 1 || cur >= capN) return false; st.singles[w.name] = cur + 1; rem--; return true; };
	const buyTight = t => { if (rem < 2 || st.tights.includes(t)) return false; st.tights.push(t); rem -= 2; return true; };
	const buyBroad = b => { if (rem < 3 || st.broads.includes(b)) return false; st.broads.push(b); rem -= 3; return true; };
	const covered = w => st.singles[w.name] > 0 || st.tights.some(t => w.tights.includes(t)) || st.broads.some(b => w.broads.includes(b));

	// Specialist / generalist (bara krigare kan välja på riktigt)
	let arch = "balanced";
	if (warrior) arch = weightedChoice(["specialist", "generalist", "balanced"], fighter ? [35, 25, 40] : (className === "Ranger" ? [15, 25, 60] : [25, 20, 55]));
	else if (slots >= 4 && Math.random() < 0.2) arch = "generalist";

	// 1. Fighting style + primärvapen (man väljer alltid ett vanligt huvudvapen först)
	const sw = WP_STYLE_WEIGHTS[className] || WP_STYLE_WEIGHTS.Commoner;
	const swUse = Object.assign({}, sw);
	if (className === "Cleric" && currentGod() && godShieldList(currentGod()).length === 0) delete swUse.shield;
	let style = weightedChoice(Object.keys(swUse), Object.values(swUse));
	// Primärvapnet väljs alltid ur gudens egen lista (för Cleric)
	const poolFor = s => weapons.filter(w => !isOff(w) && WP_STYLE_FILTER[s](w) && !has(w, "s") && !(has(w, "m") && (grp === "Warrior" || grp === "Priest")));
	let primary = wpPick(poolFor(style), ctx, style === "missile" ? (w => (w.kind.includes("R") ? 3 : 0.4)) : null);
	if (!primary) { style = "single"; primary = wpPick(poolFor("single"), ctx); }
	if (!primary) primary = weapons.find(w => !isOff(w) && isMelee(w)) || weapons.find(w => !isOff(w)) || weapons.find(isMelee) || weapons[0];

	if (arch === "generalist" && slots >= 5 && primary.broads.length && groupOnList("broads", primary.broads[0]) && Math.random() < 0.35 && buyBroad(primary.broads[0])) { /* broad group */ }
	else if (arch === "generalist" && slots >= 3 && primary.tights.length && groupOnList("tights", primary.tights[0]) && Math.random() < 0.75 && buyTight(primary.tights[0])) { /* tight group */ }
	else buySingle(primary);

	// 2. Rustning: tung rustning + adlig/låg Dex => mer sannolikt
	const armor = wpPickArmor(className, isNoble, dex, str, budget, lvl, style);
	let wantArmor = false;
	if (armor) {
		let p = armor.wt >= 60 ? 0.9 : armor.wt >= 50 ? 0.7 : armor.wt >= 40 ? 0.45 : armor.wt >= 30 ? 0.2 : armor.wt >= 25 ? 0.1 : 0.03;
		if (isNoble) p *= 1.25;
		if (dex <= 9) p *= 1.25; else if (dex >= 16) p *= 0.7;
		if (grp === "Priest") p *= 0.8;
		wantArmor = Math.random() < Math.min(0.95, p);
		if (slots <= 2 && armor.wt < 50) wantArmor = false;
	}
	const buyArmor = () => { if (wantArmor && !st.armor && rem >= 1) { st.armor = armor; rem--; } };
	if (wantArmor && (armor.wt >= 50 || isNoble)) buyArmor();

	// 3. Sköld (bara om stilen är Weapon & Shield; tvåhandsfolk väljer aldrig sköld)
	if (style === "shield" && rem >= 1 && Math.random() < 0.85) { st.shield = wpPickShield(className, isNoble, armor); rem--; }

	// 4. Two-weapon: off-hand, helst i samma grupp som huvudvapnet
	if (style === "twoweapon" && rem >= 1) {
		const pool = weapons.filter(w => isMelee(w) && w.hands === "1" && !has(w, "s") && w.name !== primary.name && !covered(w));
		const oh = wpPick(pool, ctx, w => (sameGroup(w, primary) ? 4 : 1) * (has(w, "m") ? 1.5 : 1));
		buySingle(oh);
	}

	// 5. Specialization (endast Warrior-klasser)
	if (arch === "specialist" && warrior) upgrade(primary, 2);
	buyArmor();

	// 6. Style specialization (1 slot)
	if (warrior && rem >= 1 && slots >= 4 && Math.random() < (arch === "specialist" ? 0.6 : arch === "balanced" ? 0.3 : 0.1)) { st.styleSpec = style; rem--; }

	// 7. Reservvapen: distansvapen
	const missileChance = { Ranger: 0.9, Fighter: 0.55, Paladin: 0.3, Thief: 0.65, Bard: 0.5, Cleric: 0.1, Druid: 0.4, Wizard: 0.3, Commoner: 0.2 }[className];
	if (style !== "missile" && rem >= 1 && Math.random() < (missileChance === undefined ? 0.3 : missileChance)) {
		const pool = weapons.filter(w => isMissile(w) && !has(w, "s") && !covered(w));
		buySingle(wpPick(pool, ctx, w => (w.kind.includes("R") ? 2.5 : 0.5) * (className === "Ranger" && w.broads.includes("Bows") ? 3 : 1)));
	}

	// 8. Sidovapen (dolk/kniv)
	if (style !== "missile" && rem >= 1 && Math.random() < (warrior ? 0.4 : 0.35)) {
		buySingle(wpPick(weapons.filter(w => has(w, "m") && isMelee(w) && !covered(w)), ctx));
	}

	// 8b. Melee-backup för folk vars huvudvapen är ett distansvapen (bågskytten kan också slåss när fienden är nära)
	if (wpRole(primary) === "ranged" && rem >= 1) {
		const ch = arch === "specialist" ? 0.4 : (grp === "Warrior" ? 0.85 : grp === "Rogue" ? 0.75 : grp === "Priest" ? 0.5 : grp === "Wizard" ? 0.6 : 0.3);
		if (Math.random() < ch) {
			const pool = weapons.filter(w => ["melee", "sidearm"].includes(wpRole(w)) && !has(w, "s") && !covered(w));
			buySingle(wpPick(pool, ctx, w => (wpRole(w) === "melee" ? 2 : 1)));
		}
	}

	// 9. Lans: bara som komplement till ett vanligt huvudvapen, mest paladiner och adliga
	const lanceChance = className === "Paladin" ? 0.6 : (warrior ? (isNoble ? 0.4 : 0.08) : 0);
	if (rem >= 1 && Math.random() < lanceChance) {
		buySingle(wpPick(weapons.filter(w => has(w, "s") && !covered(w)), ctx));
	}

	// 9b. Extra fighting style som inte är gratis för klassen (kostar 1 slot + stilens följdköp).
	// Måste passa huvudvapnet (t.ex. two-weapon kräver ett enhandsvapen, sköld kräver enhands/versatile).
	if (WP_EXTRA_STYLES[grp] && rem >= 2 && Math.random() < 0.15) {
		const ew = WP_EXTRA_STYLES[grp];
		const okFor = { twoweapon: isMelee(primary) && primary.hands === "1", shield: isMelee(primary) && (primary.hands === "1" || primary.hands === "v"), twohand: true };
		const keys = Object.keys(ew).filter(k => k !== style && okFor[k] && !(k === "shield" && className === "Bard" && lvl >= 2 && !globalThis.__BARD_ARMORED)); // bards utan "reserustning" bär ingen sköld
		if (keys.length) {
			const k = weightedChoice(keys, keys.map(x => ew[x]));
			if (k === "shield") {
				if (!st.shield) { st.extraStyle = k; rem--; st.shield = wpPickShield(className, isNoble, armor); rem--; }
			} else if (k === "twoweapon") {
				const oh = wpPick(weapons.filter(w => !isOff(w) && isMelee(w) && w.hands === "1" && !has(w, "s") && w.name !== primary.name && !covered(w)), ctx, w => (sameGroup(w, primary) ? 4 : 1));
				if (oh) { st.extraStyle = k; rem--; buySingle(oh); }
			} else if (k === "twohand") {
				const th = wpPick(weapons.filter(w => !isOff(w) && w.kind.includes("M") && w.hands === "2" && !has(w, "s") && !has(w, "m") && !covered(w)), ctx);
				if (th) { st.extraStyle = k; rem--; buySingle(th); }
			}
		}
	}

	// 10. Resterande slots
	const cap =fighter ? Math.min(5, 2 + Math.floor(lvl / 4)) : (warrior ? 2 : 1);
	// Komplement-bonus (gäller alla utom specialister): en roll man redan täcker är mindre intressant,
	// en ny roll (t.ex. armborst till svärd) är mycket mer rimlig än ännu ett närstridsvapen (t.ex. yxa till svärd).
	let rolesNow = new Set();
	const roleF = w => {
		if (arch === "specialist") return 1;
		const have = rolesNow.has(wpRole(w));
		return arch === "generalist" ? (have ? 0.6 : 2) : (have ? 0.3 : 3);
	};
	const groupCands = (key, minSize) => {
		const g = {};
		weapons.forEach(w => w[key].forEach(n => { (g[n] = g[n] || []).push(w); }));
		return Object.keys(g).filter(n => g[n].length >= minSize
			&& !(key === "tights" ? st.tights : st.broads).includes(n)
			&& groupOnList(key, n)
			&& !g[n].some(w => st.singles[w.name])
			&& !g[n].some(w => key === "tights" ? st.broads.some(b => w.broads.includes(b)) : st.tights.some(t => w.tights.includes(t)))
		).map(n => ({ name: n, wt: g[n].reduce((s, w) => s + wpWeight(w, ctx) * roleF(w), 0) })).filter(x => x.wt > 0);
	};
	let guard = 0;
	while (rem > 0 && guard++ < 60) {
		const opts = [], wts = [];
		const owned = Object.keys(st.singles);
		rolesNow = new Set(weapons.filter(covered).map(wpRole));
		if (warrior && st.singles[primary.name] && st.singles[primary.name] < cap) { opts.push("upPrimary"); wts.push(arch === "specialist" ? (fighter ? 55 : 35) : arch === "balanced" ? 15 : 3); }
		const upOthers = owned.filter(n => n !== primary.name && st.singles[n] === 1);
		if (warrior && upOthers.length) { opts.push("upOther"); wts.push(arch === "specialist" ? 12 : 6); }
		const singlePool = weapons.filter(w => !covered(w) && !has(w, "s") && ctx.afford(w));
		if (singlePool.length) { opts.push("single"); wts.push(arch === "generalist" ? 30 : 38); }
		const tc = rem >= 2 ? groupCands("tights", 2) : [];
		if (tc.length) { opts.push("tight"); wts.push(arch === "generalist" ? 40 : (warrior ? 10 : 14)); }
		const bc = (rem >= 3 && (warrior || className === "Bard")) ? groupCands("broads", 3) : [];
		if (bc.length) { opts.push("broad"); wts.push(arch === "generalist" ? 25 : 3); }
		if (!opts.length) break;
		const act = weightedChoice(opts, wts);
		if (act === "upPrimary") upgrade(primary, cap);
		else if (act === "upOther") upgrade(WP_BY_NAME[upOthers[Math.floor(Math.random() * upOthers.length)]], 2);
		else if (act === "single") buySingle(wpPick(singlePool, ctx, w => (1 + 3 * owned.filter(n => sameGroup(w, WP_BY_NAME[n])).length) * roleF(w)));
		else if (act === "tight") buyTight(weightedChoice(tc, tc.map(x => x.wt)).name);
		else if (act === "broad") buyBroad(weightedChoice(bc, bc.map(x => x.wt)).name);
	}

	// 11. Retroaktiva grupper: två vapen i samma tight group => tight group; tre slots i en broad group => broad group
	const own = Object.keys(st.singles).map(n => WP_BY_NAME[n]);
	const tightCount = {};
	own.forEach(w => w.tights.forEach(t => { tightCount[t] = (tightCount[t] || 0) + 1; }));
	const retroTights = Object.keys(tightCount).filter(t => tightCount[t] >= 2 && !st.tights.includes(t));
	const allTights = st.tights.concat(retroTights);
	const broadPts = {};
	own.forEach(w => {
		if (w.tights.some(t => retroTights.includes(t))) return; // räknas via tight group
		w.broads.forEach(b => { broadPts[b] = (broadPts[b] || 0) + 1; });
	});
	allTights.forEach(t => (WP_TIGHT_BROADS[t] || []).forEach(b => { broadPts[b] = (broadPts[b] || 0) + 2; }));
	const retroBroads = Object.keys(broadPts).filter(b => broadPts[b] >= 3 && !st.broads.includes(b));
	const allBroads = st.broads.concat(retroBroads);

	// 12. Familiarity: resten av tight group för varje enskilt vapen
	const prof = new Set(own.map(w => w.name));
	WP_WEAPONS.forEach(w => { if (w.tights.some(t => allTights.includes(t)) || w.broads.some(b => allBroads.includes(b))) prof.add(w.name); });
	const familiar = WP_WEAPONS.filter(w => !prof.has(w.name) && w.tights.some(t => own.some(o => o.tights.includes(t)))).map(w => w.name);

	return { slots: slots, used: slots - rem, style: style, primary: primary, st: st, retroTights: retroTights, retroBroads: retroBroads, armor: armor, familiar: familiar, info: info, arch: arch };
}

const WP_LEVELS = ["", "Proficient", "Specialized", "[[Effects of Mastery\\|Mastery]]", "[[High Mastery]]", "[[Grand Mastery]]"];
const WP_SHIELD_LINK = "[[00_Rulebook/Player's Option- Combat and Tactics/Chapter Four- Weapon Specialization and Mastery/Weapon Proficiencies/Shield Proficiency\\|Shield Proficiency]]";
const WP_ARMOR_LINK = "[[00_Rulebook/Player's Option- Combat and Tactics/Chapter Four- Weapon Specialization and Mastery/Weapon Proficiencies/Armor Proficiency\\|Armor Proficiency]]";

// Bygger Obsidian-callouten som rader (samma upplägg som buildNwpCallout).
function buildWeaponCallout(wp) {
	const L = [
		">",
		">> [!wpn]- Weapon Proficiencies (" + wp.slots + " slots)",
		"> > | Proficiency | Level | Slots |",
		"> > | ----------- | :---: | :---: |"
	];
	const row = (a, b, c) => L.push("> > | " + a + " | " + b + " | " + c + " |");
	const names = Object.keys(wp.st.singles).sort((a, b) => (wp.st.singles[b] - wp.st.singles[a]) || a.localeCompare(b));
	names.forEach(n => {
		const s = wp.st.singles[n];
		const ex = (wp.st.extra && wp.st.extra[n]) || 0; // Cleric: vapen utanför gudens lista kostar 2 slots
		row(wpLink(WP_BY_NAME[n]) + (n === wp.primary.name ? " ★" : "") + (ex ? " *(utanför gudens lista)*" : ""), WP_LEVELS[s], s + ex);
	});
	wp.st.tights.forEach(t => row("Tight group: **" + t + "**", "Proficient", 2));
	wp.st.broads.forEach(b => row("Broad group: **" + b + "**", "Proficient", 3));
	wp.retroTights.forEach(t => row("↳ Tight group: *" + t + "* (retroaktivt)", "Proficient", "—"));
	wp.retroBroads.forEach(b => row("↳ Broad group: *" + b + "* (retroaktivt)", "Proficient", "—"));
	if (wp.st.styleSpec) row("Style: " + WP_STYLE_INFO[wp.st.styleSpec].spec, "Specialized", 1);
	if (wp.st.extraStyle) row("Extra style (ej gratis): " + WP_STYLE_INFO[wp.st.extraStyle].name, "Trained", 1);
	if (wp.st.shield) row(WP_SHIELD_LINK + ": " + wp.st.shield, "Proficient", 1);
	if (wp.st.armor) row(WP_ARMOR_LINK + ": " + wp.st.armor.name, "Proficient (halv börda)", 1);
	L.push("> >");
	L.push("> > * **Fighting style:** " + WP_STYLE_INFO[wp.style].name + " (basstil gratis)" + (wp.st.extraStyle ? " + " + WP_STYLE_INFO[wp.st.extraStyle].name + " (inlärd)" : "") + " | **Primärvapen:** " + wpLink(wp.primary));
	L.push("> > * **Rustning:** " + (wp.armor ? wpArmorLink(wp.armor) + (globalThis.__BARD_ARMORED ? ' <abbr title="Kan inte casta spells med rustningen på sig. Tar av den när han inte är på resa, t.ex. på värdshuset.">Kan ej casta i rustning</abbr>' : "") + " (AC +" + wp.armor.ac + ", " + wp.armor.wt + " lbs, full)" + (wp.st.armor ? " – tränad" : " – ej tränad") : "Ingen"));
	L.push("> > * **Unproficient / Familiar:** " + wp.info.unprof + " / " + wp.info.fam + (wp.familiar.length ? " | Familiar med: " + wp.familiar.slice(0, 8).join(", ") + (wp.familiar.length > 8 ? ", …" : "") : ""));
	return L;
}



// ===================== GUDAR, FAITH & PRIEST SPELLS (Cleric) =====================
// Data från "For Claude"-filerna. Gäller bara klassen Cleric (Druid/Paladin påverkas inte).
const CLERIC_MIN_FAITH = 40; // 🎲 Random faith för Cleric slumpas bara från "Troende" och uppåt (ändra här vid behov)

const FAITH_LEVELS = [
	{ max: 10,  label: "Ignorant – känner till guden men bryr sig inte" },
	{ max: 25,  label: "Passiv – följer traditioner men utan engagemang" },
	{ max: 40,  label: "Vardagstroende – ber ibland, respekterar guden" },
	{ max: 55,  label: "Troende – vördar sin gud och följer läran" },
	{ max: 70,  label: "Hängiven – aktiv i kulten, offrar och ber regelbundet" },
	{ max: 85,  label: "Zelotisk – missionerande, vill sprida tron" },
	{ max: 101, label: "Fanatisk – lever för sin gud, extremt hängiven" }
];

// minFaith = lägsta faith-värde (0-100) vid slump. forcedIdx = index i FAITH_LEVELS (eller "X"/null för slump).
function getFaithLevel(minFaith, forcedIdx) {
	if (forcedIdx !== undefined && forcedIdx !== null && forcedIdx !== "X" && FAITH_LEVELS[Number(forcedIdx)]) return FAITH_LEVELS[Number(forcedIdx)].label;
	minFaith = minFaith || 0;
	let faith, guard = 0;
	do {
		const u = 1 - Math.random(), v = Math.random();
		const standardNormal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
		faith = Math.max(0, Math.min(100, Math.round(50 + standardNormal * 15)));
	} while (faith < minFaith && guard++ < 1000);
	if (faith < minFaith) faith = minFaith;
	return FAITH_LEVELS.find(f => faith < f.max).label;
}

const WPG_BOWS = "Bows";
// armor: null = alla, [] = ingen, annars lista med namn i WP_ARMOR. shields: null = alla, [] = ingen.
// groups matchas mot både tight och broad groups i WP_WEAPONS; weapons = enskilda vapen.
// Uppdaterad enligt "Gods and Spheres.md".
// armor/shields: null = alla, [] = ingen, lista = bara dessa, { maxWt: N } = alla upp till N lbs.
// spells = totalt antal priest spells guden ger tillgång till (från tabellen, för kontroll).
const GOD_DATA = {
	"Altumus": { title: "Liv", combat: "Medium", hd: "d8", spells: 87, major: ["Healing", "Protection", "Sun"], minor: ["Plant", "Creation", "Wards"],
		groups: [WPG_CMF, "Spears", "Hammers"], weapons: ["Short Bow", "Quarterstaff", "Sling", "Staff Sling", "Dagger"],
		armor: null, shields: null,
		high: ["[[Turning Undead]]"], medium: ["[[Laying On of Hands]]"], low: [] },
	"Urila": { title: "Död", combat: "Medium", hd: "d8", spells: 87, major: ["Necromantic", "Guardian", "Astral"], minor: ["Wards", "Time", "War"],
		groups: ["Daggers & Knives", "Short Swords"], weapons: ["Sickle", "Scythe", "Quarterstaff", "Sling", "Lasso"],
		armor: null, shields: null,
		high: ["Command Undead"], medium: ["[[Prophecy]] från level 8 (de dödas viskningar, bara passiv profetia)"], low: ["[[Soothing Word]] på döende och sörjande"] },
	"Reluna": { title: "Tid & Öde", combat: "Poor", hd: "d6", spells: 85, major: ["Time", "Divination", "Astral"], minor: ["Chaos", "Law", "Guardian"],
		groups: ["Daggers & Knives", WPG_CMF], weapons: ["Lasso", "Net", "Mancatcher"],
		armor: null, shields: null,
		high: [], medium: ["[[Prophecy]] (aktiv och passiv)"], low: [] },
	"Valentyia": { title: "Kärlek", combat: "Medium", hd: "d8", spells: 81, major: ["Charm", "Healing", "Thought"], minor: ["Protection", "Creation", "Astral", "Sun"],
		groups: ["Daggers & Knives", "Fencing Weapons", WPG_BOWS], weapons: ["Short Sword", "Sling", "Quarterstaff"],
		armor: null, shields: null,
		high: ["[[Charm, Fascination]] (icke-stridande, villiga måltavlor)"], medium: [], low: ["[[Analysis, Detection, Identification|Analysis]] (kärlek och relationer)"] },
	"Absuum": { title: "Kunskap", combat: "Poor", hd: "d6", spells: 102, major: ["Divination", "Thought", "Numbers"], minor: ["Time", "Wards", "Charm"],
		groups: ["Daggers & Knives"], weapons: ["Quarterstaff", "Dart", "Sling"],
		armor: null, shields: null,
		high: [], medium: ["Language and Communication"], low: ["[[Analysis, Detection, Identification|Analysis]] (identifiera föremål och deras syfte, analysera skrifter och identifiera magi)"] },
	"Catun": { title: "Styrka", combat: "Good", hd: "d8", spells: 85, major: ["Combat", "War", "Guardian"], minor: ["Protection", "Healing"],
		groups: [WPG_APH, WPG_CMF, "Ancient Swords", "Medium Swords", "Large Swords", "Poleaxes", "Glaives", "Lances", WPG_BOWS, WPG_SPJ], weapons: ["Dagger"],
		armor: null, shields: null,
		high: [], medium: ["[[Incite Berserker Rage]]"], low: ["[[Low Immunities]] +2 mot fear"] },
	"Zhok": { title: "Kaos", combat: "Medium", hd: "d8", spells: 90, major: ["Chaos", "Weather", "Summoning"], minor: ["Elemental", "Time", "Charm"],
		groups: ["Clubs", "Chain & Rope", "Axes"], weapons: ["Dagger", "Javelin", "Sling", "Net", "Whip", "Bolas", "Cutlass"],
		armor: null, shields: null,
		high: [], medium: ["[[Defiance of Restriction or Obstacle]] (fasthållande attacker som lasso och nät)"], low: ["[[Low Immunities]] +2 mot Hold, Geas och Binding"] },
	"Vilfantur": { title: "Natur", combat: "Poor", hd: "d6", spells: 102, major: ["Animal", "Plant", "Weather"], minor: ["Elemental", "Healing", "Sun"],
		groups: ["Spears", "Clubs"], weapons: ["Knife", "Short Bow", "Sling"],
		// Bär inget metall: bara rustningar av tyg, läder, rep, hud, trä och ben. (Sköldar antas vara av trä.)
		armor: ["Padded armor", "Leather armor", "Cord armor", "Hide armor", "Wood/bone armor"], shields: null,
		high: ["[[Shapechanging]] (level 5, 3/dag)"], medium: ["[[Defiance of Restriction or Obstacle]] (växtlighet)", "Language and Communication (naturliga språk)"], low: ["[[Soothing Word]] (på naturliga djur)"] },
	"Neral": { title: "Familj", combat: "Medium", hd: "d8", spells: 82, major: ["Protection", "Creation", "Travelers"], minor: ["Healing", "Charm", "Wards"],
		groups: [WPG_CMF, "Hammers", "Spears"], weapons: ["Quarterstaff", "Hand Axe", "Sickle", "Sling", "Knife"],
		armor: null, shields: null,
		high: ["Turning Undead"], medium: ["[[Laying On of Hands]]"], low: ["[[Soothing Word]]", "Language and Communication"] },
	"Bolestus": { title: "Sjukdom", combat: "Medium", hd: "d8", spells: 85, major: ["Necromantic", "Healing"], minor: ["Weather", "Plant", "Time"],
		groups: [WPG_BOWS, "Daggers & Knives"], weapons: ["Blowgun", "Dart", "Scourge", "Sickle", "Scythe", "Whip", "Stinkpot", "Sling"],
		armor: null, shields: null,
		high: ["[[High Immunities]] (sjukdom)"], medium: ["[[Laying On of Hands]] (omvänd, skadar)"], low: ["[[Analysis, Detection, Identification|Analysis]] (sjukdom, stadium och prognos)"] },
	"Mercario": { title: "Handel", combat: "Medium", hd: "d8", spells: 84, major: ["Travelers", "Numbers", "Charm"], minor: ["Creation", "Wards", "Divination"],
		groups: ["Fencing Weapons", "Crossbows", "Daggers & Knives"], weapons: ["Short Sword", "Cutlass", "Quarterstaff", "Sling", "Dart"],
		armor: null, shields: null,
		high: ["[[Charm, Fascination]] (icke-stridande, förhandlingar)"], medium: [], low: ["[[Analysis, Detection, Identification|Analysis]] (värdera föremål)"] },
	"Zanatus": { title: "Hantverk", combat: "Medium", hd: "d8", spells: 93, major: ["Creation", "Elemental"], minor: ["Protection", "Wards"],
		groups: [WPG_APH, "Maces"], weapons: ["Morning Star", "Footman's Flail", "Sling", "Dagger"],
		armor: null, shields: null,
		high: [], medium: ["[[Medium Immunities]] (icke-magisk eld och hetta)"], low: ["[[Analysis, Detection, Identification|Analysis]] (material, hantverk och konstruktioner)"] },
	"Forsetus": { title: "Rättvisa", combat: "Good", hd: "d8", spells: 83, major: ["Law", "Guardian", "Divination"], minor: ["Combat", "Protection"],
		groups: ["Roman Swords", "Medium Swords", WPG_SPJ, "Lances", "Poleaxes", "Glaives", WPG_BOWS, "Crossbows", "Hammers", "Maces"], weapons: ["Mancatcher", "Net", "Lasso", "Dagger"],
		armor: null, shields: null,
		high: ["[[High Immunities]] (+4 på save mot charm)"], medium: [], low: ["[[Analysis, Detection, Identification|Analysis]] (upptäcka brutna eder)"] },
	"Khu'thal": { title: "Rädsla & Instinkt", combat: "Medium", hd: "d8", spells: 82, major: ["Combat", "Animal"], minor: ["Thought", "Charm", "Necromantic", "Chaos"],
		groups: ["Spears", "Daggers & Knives"], weapons: ["Cestus", "Club", "Hand Axe", "Net", "Bolas", "Sling", "Caltrop"],
		armor: null, shields: null,
		high: ["[[Inspire Fear]] (2/dag)"], medium: ["[[Medium Immunities]] (immun mot rädsla)"], low: ["[[Analysis, Detection, Identification|Analysis]] (upptäcka fara och bakhåll)"] },
	"Confana": { title: "Lidande & Hopplöshet", combat: "Medium", hd: "d8", spells: 88, major: ["Thought", "Necromantic"], minor: ["Chaos", "Weather", "Protection"],
		groups: ["Daggers & Knives", "Clubs"], weapons: ["Sling", "Whip", "Scourge", "Quarterstaff", "Sickle", "Dart", "Chain"],
		armor: null, shields: null,
		high: ["_Inspire Despair_ (-2 på alla saving throws och morale checks i rundor lika med castarens level, 2/dag, save v spell)"], medium: [], low: ["[[Analysis, Detection, Identification|Analysis]] (känna lidande)", "[[Low Immunities]] +2 mot Enchantment/Charm"] },
	"Inganna": { title: "Bedrägeri & Mörker", combat: "Medium", hd: "d8", spells: 94, major: ["Wards", "Divination"], minor: ["Charm", "Travelers", "Necromantic"],
		groups: ["Daggers & Knives", "Fencing Weapons", "Crossbows"], weapons: ["Hand Crossbow", "Light Crossbow", "Dart", "Blowgun", "Short Sword", "Sling"],
		// Bär ingen tung rustning. Tolkning: "tung" = över 40 lbs (utesluter Improved mail, Bronze plate, Plate mail, Field plate, Full plate). Ändra WP-gränsen här vid behov.
		armor: { maxWt: 40 }, shields: null,
		high: ["[[Charm, Fascination]] (när hon/han ljuger)"], medium: ["[[Medium Immunities]] mot ESP, detect lie och know alignment"], low: [] },
	"Sanoo": { title: "Galenskap & Spratt", combat: "Medium", hd: "d8", spells: 85, major: ["Chaos", "Thought", "Charm"], minor: ["Numbers", "Travelers", "Divination"],
		groups: ["Clubs", "Daggers & Knives"], weapons: ["Hand Axe", "Javelin", "Sling", "Dart", "Net", "Bolas", "Whip", "Quarterstaff", "Belaying Pin", "Stinkpot", "Cutlass"],
		armor: null, shields: null,
		high: ["[[Shapechanging]] (till andra personer, bara när Sanoo anser det vara ett spratt, level 6)"], medium: [], low: ["[[Low Immunities]] +2 mot confusion och fear", "Language and Communication"] },
	"Izgimmer": { title: "Magi", combat: "Poor", hd: "d6", spells: 110, major: ["Divination", "Wards", "Protection"], minor: ["Numbers", "Creation", "Astral", "Time"],
		groups: ["Daggers & Knives"], weapons: ["Quarterstaff", "Dart", "Staff Sling"],
		armor: [], shields: [],
		high: ["Vid level 5 väljer prästen en magiskola och får tillgång till att lära sig Wizard-spells ur den"], medium: [], low: ["[[Analysis, Detection, Identification|Analysis]] (detect magic, 3/dag)"] }
};

const GOD_NAMES = Object.keys(GOD_DATA);

function godData(godName) { return GOD_DATA[godName] || null; }
// Aktuell gud för Cleric sätts av npcspec före vapenvalet (null för alla andra klasser).
function currentGod() { return godData(globalThis.__NPC_GOD); }

const _godWeaponCache = {};
function godAllowsWeapon(godName, w) {
	const g = godData(godName);
	if (!g) return false;
	return g.weapons.includes(w.name) || g.groups.some(grp => w.tights.includes(grp) || w.broads.includes(grp));
}
// null = alla rustningar tillåtna
function godArmorList(g) {
	if (!g || g.armor === null) return null;
	if (Array.isArray(g.armor)) return g.armor;
	if (g.armor.maxWt !== undefined) return WP_ARMOR.filter(a => a.wt <= g.armor.maxWt).map(a => a.name);
	return WP_ARMOR.map(a => a.name).filter(n => !(g.armor.except || []).includes(n));
}
function godShieldList(g) {
	const all = ["Buckler", "Small shield", "Medium shield", "Body shield"];
	if (!g || g.shields === null) return all;
	return g.shields;
}

// ---------- Priest spells ----------
	const PRIEST_SPELL_DIRS = spellTables.PRIEST_SPELL_DIRS;
	const PRIEST_SPELL_ROWS = spellTables.PRIEST_SPELL_ROWS;
	const PRIEST_SPELLS = PRIEST_SPELL_ROWS.map(r => {
		const f = r.split("|");
		const dir = PRIEST_SPELL_DIRS[Number(f[3])];
		return { name: f[0], level: Number(f[1]), spheres: f[2].split(";"), path: dir + "/" + f[0] + ".md" };
	});
	
	// Spells received per priest level (kolumn 1-7). Nivå 6 kräver Wis 17+, nivå 7 kräver Wis 18+.
	const PRIEST_SLOTS = [null,
		[1,0,0,0,0,0,0],[2,0,0,0,0,0,0],[2,1,0,0,0,0,0],[3,2,0,0,0,0,0],[3,3,1,0,0,0,0],[3,3,2,0,0,0,0],[3,3,2,1,0,0,0],
		[3,3,3,2,0,0,0],[4,4,3,2,1,0,0],[4,4,3,3,2,0,0],[5,4,4,3,2,1,0],[6,5,5,3,2,2,0],[6,6,6,4,2,2,0],[6,6,6,5,3,2,1],
		[6,6,6,6,4,2,1],[7,7,7,6,4,3,1],[7,7,7,7,5,3,2],[8,8,8,8,6,4,2],[9,9,8,8,6,4,2],[9,9,9,8,7,5,2]
	];
	// Bonusspells från Wisdom (kumulativt): [score, [spell levels]]
	const WIS_BONUS_SPELLS = [[13,[1]],[14,[1]],[15,[2]],[16,[2]],[17,[3]],[18,[4]],[19,[1,3]],[20,[2,4]],[21,[3,5]],[22,[4,5]],[23,[1,6]],[24,[5,6]],[25,[6,7]]];
	
	function priestSlotsFor(lvl, wis) {
		const base = PRIEST_SLOTS[Math.max(1, Math.min(20, lvl))].slice();
		if (wis < 17) base[5] = 0;
		if (wis < 18) base[6] = 0;
		const slots = base.slice();
		WIS_BONUS_SPELLS.forEach(([score, lvls]) => {
			if (wis >= score) lvls.forEach(l => { if (base[l - 1] > 0) slots[l - 1]++; }); // bonus bara på nivåer prästen redan kan casta
		});
		return slots;
	}
	
	// En spell är tillgänglig om någon av dess spheres är "All", major (alla nivåer) eller minor (spell level 1-3)
	function godSpellAccess(g, sp) {
		if (sp.spheres.includes("All")) return 2;
		if (sp.spheres.some(s => g.major.includes(s))) return 3;
		if (sp.level <= 3 && sp.spheres.some(s => g.minor.includes(s))) return 1;
		return 0;
}

function pickPriestSpells(godName, lvl, wis) {
	const g = godData(godName);
	if (!g || lvl < 1) return null;
	const slots = priestSlotsFor(lvl, wis);
	const result = [];
	for (let L = 1; L <= 7; L++) {
		const n = slots[L - 1];
		if (!n) continue;
		const pool = PRIEST_SPELLS.filter(sp => sp.level === L && godSpellAccess(g, sp) > 0);
		const weights = pool.map(sp => godSpellAccess(g, sp));
		const allAvail = pool.slice().sort((a, b) => a.name.localeCompare(b.name));
		const chosen = [];
		// Varje slot väljer oberoende av de andra (med återläggning): samma spell kan memoreras flera gånger
		for (let i = 0; i < n && pool.length; i++) chosen.push(pool[weightedIndex(weights)]);
		chosen.sort((a, b) => a.name.localeCompare(b.name));
		result.push({ level: L, slots: n, spells: chosen, all: allAvail });
	}
	return result;
}
function weightedIndex(weights) {
	const tot = weights.reduce((a, b) => a + b, 0);
	let r = Math.random() * tot;
	for (let i = 0; i < weights.length; i++) { r -= weights[i]; if (r < 0) return i; }
	return weights.length - 1;
}

const ORD = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"];
function spellLink(sp) { return "[[" + sp.path.replace(/\.md$/, "") + "|" + sp.name + "]]"; }
function spellLinksCounted(arr) {
	const m = new Map();
	arr.forEach(sp => m.set(sp, (m.get(sp) || 0) + 1));
	return Array.from(m.entries()).map(([sp, c]) => spellLink(sp) + (c > 1 ? " ×" + c : "")).join(", ");
}

function buildGodCallout(godName, faithLabel, wizSchool) {
	const g = godData(godName);
	if (!g) return [];
	const fmt = a => a.length ? a.join(", ") : "—";
	const L = [
		">",
		">> [!god]- Gud: " + godName + " (" + g.title + ")",
		"> > * **Tro:** " + faithLabel,
		"> > * **Spheres:** Major: " + g.major.join(", ") + " | Minor (spell level 1–3): " + g.minor.join(", ") + " | Totalt " + g.spells + " spells",
		"> > * **Combat Rating:** " + g.combat + " | **Hit Dice:** " + g.hd,
		"> > * **High Powers:** " + fmt(g.high),
		"> > * **Medium Powers:** " + fmt(g.medium),
		"> > * **Low Powers:** " + fmt(g.low)
	];
	if (wizSchool) L.push("> > * **Vald magiskola (level 5):** " + wizSchool + " – Wizard-spells ur denna skola kan läras");
	if (FAITH_LEVELS.findIndex(f => f.label === faithLabel) < 3) L.push("> > * *Svag tro – SL avgör om gudens krafter fungerar fullt ut.*");
	return L;
}

// ---------- Paladin & Ranger: begränsade priest spells (enligt Instructions.md) ----------
// Paladin: priest spells från level 9, bara spheres Combat, Divination, Healing och Protection. Ingen Wisdom-bonus.
// Ranger: priest spells från level 8, bara spheres Animal och Plant (2e-standard, ändra vid behov). Ingen Wisdom-bonus.
const PALADIN_SPHERES = ["Combat", "Divination", "Healing", "Protection"];
const RANGER_SPHERES = ["Animal", "Plant"];
// Rad = class level (index 0 = level 1). [casting level, spells per spell level 1..n]
const PALADIN_SPELL_TABLE = [null, null, null, null, null, null, null, null,
	[1,1,0,0,0],[2,2,0,0,0],[3,2,1,0,0],[4,2,2,0,0],[5,2,2,1,0],[6,3,2,1,0],[7,3,2,1,1],[8,3,3,2,1],
	[9,3,3,3,1],[9,3,3,3,1],[9,3,3,3,2],[9,3,3,3,3]];
const RANGER_SPELL_TABLE = [null, null, null, null, null, null, null,
	[1,1,0,0],[2,2,0,0],[3,2,1,0],[4,2,2,0],[5,2,2,1],[6,3,2,1],[7,3,2,2],[8,3,3,2],[9,3,3,3],
	[9,3,3,3],[9,3,3,3],[9,3,3,3],[9,3,3,3]]; // level 17-20: samma som 16 (tabellen slutar vid 16)

function pickSphereSpells(className, lvl) {
	const table = className === "Paladin" ? PALADIN_SPELL_TABLE : className === "Ranger" ? RANGER_SPELL_TABLE : null;
	const spheres = className === "Paladin" ? PALADIN_SPHERES : RANGER_SPHERES;
	const row = table && table[Math.max(1, Math.min(20, lvl)) - 1];
	if (!row) return null;
	const result = [];
	for (let L = 1; L < row.length; L++) {
		const n = row[L];
		if (!n) continue;
		// "All"-spells ingår inte: bara de angivna spheres
		const pool = PRIEST_SPELLS.filter(sp => sp.level === L && sp.spheres.some(s => spheres.includes(s)));
		const allAvail = pool.slice().sort((a, b) => a.name.localeCompare(b.name));
		const chosen = [];
		// Varje slot väljer oberoende av de andra (med återläggning)
		for (let i = 0; i < n && pool.length; i++) chosen.push(pool[Math.floor(Math.random() * pool.length)]);
		chosen.sort((a, b) => a.name.localeCompare(b.name));
		result.push({ level: L, slots: n, spells: chosen, all: allAvail });
	}
	return { casterLevel: row[0], spheres: spheres, res: result };
}

function buildSphereSpellCallout(className, lvl) {
	const d = pickSphereSpells(className, lvl);
	if (!d || !d.res.length) return [];
	return buildSpellCallout(null, lvl, 0, { res: d.res, label: className + " Spells (casting level " + d.casterLevel + ")", note: "Spheres: " + d.spheres.join(", ") + " – ingen Wisdom-bonus" });
}

function buildSpellCallout(godName, lvl, wis, custom) {
	const res = custom ? custom.res : pickPriestSpells(godName, lvl, wis);
	if (!res || !res.length) return [];
	const total = res.reduce((s, r) => s + r.slots, 0);
	const L = [">", ">> [!spells]- " + (custom ? custom.label : "Priest Spells") + " (" + total + " memorerade)"];
	if (custom && custom.note) L.push("> > * *" + custom.note + "*");
	res.forEach(r => L.push("> > * **" + ORD[r.level] + " (" + r.slots + "):** " + spellLinksCounted(r.spells)));
	// Hela spellistan: en priest har tillgång till alla sin guds spells och memorerar bara så många som slots tillåter.
	L.push("> >");
	L.push("> > > [!spell-list]- Alla spells guden ger tillgång till (memorerade i **fet stil**)");
	res.forEach(r => {
		const mem = new Set(r.spells.map(sp => sp.name));
		L.push("> > > * **" + ORD[r.level] + " (" + r.all.length + "):** " + r.all.map(sp => mem.has(sp.name) ? "**" + spellLink(sp) + "**" : spellLink(sp)).join(", "));
	});
	return L;
}


// ===================== WIZARD SPELLS (spellbook + memorerade) =====================
	// Data från Wizards.md. Gäller bara klassen Wizard (Mage eller Specialist).
	const WIZ_SPECIALIST_CHANCE = 0.10; // 🎲 Chans att en slumpad Wizard blir specialist (vid "Random" i dropdownen)
	
	// % chans att wizarden "stöter på" en given spell av respektive spell level (index = spell level) under sitt liv.
	// Varje spell som dyker upp får sedan en spell learning-check (Int-tabellen, +15 % egen skola / -15 % andra skolor för specialist).
	const WIZ_ENCOUNTER_PCT = [null, 12, 10, 9, 8, 7, 6, 5, 4, 3];
	// Små multiplikatorer på encounter-chansen. Äldre hinner samla mer, adliga har råd att köpa/byta till sig spells.
	const WIZ_AGE_MULT = { "young adult": 0.9, "early middle": 1.05, "late middle": 1.15, "adult": 1.0, "old": 1.25, "venerable": 1.35, "ancient": 1.4 };
	const WIZ_NOBLE_MULT = 1.2;
	const WIZ_LEVEL_STEP = 0.03; // +3 % encounter-chans per wizard level över 1 (en högre level wizard har hunnit uppleva mer). 0 = av
	const BARD_BOOK_MULT = 0.3; // Bards "stöter på" bara en bråkdel så många spells som wizards (litet spellbook, inte lika magi-fokuserade)
	const WIZ_START_SPELLS = [2, 3]; // [min, max] slumpade level 1-spells i wizardens spellbook från start (ingen automatisk Read Magic längre)
	// Lesser divination är tillgänglig för alla wizards, även för en specialist som har Divination som opposition (Conjurer).
	const WIZ_LESSER_DIVINATION = ["Read Magic", "Detect Magic", "Identify", "Detect Undead", "Detect Invisibility", "Locate Object"];
	
	// Specialister (Wizards.md). races = tillåtna raser (gemener), req = minimum ability scores, opposed = opposition schools.
	const WIZ_SPECIALISTS = {
		"Abjurer":     { school: "Abjuration",            races: ["human"],                         req: { Wisdom: 15, Intelligence: 9 },       opposed: ["Alteration", "Illusion/Phantasm"] },
		"Conjurer":    { school: "Conjuration/Summoning", races: ["human", "half-elf"],             req: { Constitution: 15, Intelligence: 9 }, opposed: ["Divination", "Invocation/Evocation"] },
		"Diviner":     { school: "Divination",            races: ["human", "half-elf", "elf"],      req: { Wisdom: 16, Intelligence: 9 },       opposed: ["Conjuration/Summoning"] },
		"Enchanter":   { school: "Enchantment/Charm",     races: ["human", "half-elf", "elf"],      req: { Charisma: 16, Intelligence: 9 },     opposed: ["Invocation/Evocation", "Necromancy"] },
		"Illusionist": { school: "Illusion/Phantasm",     races: ["human", "gnome"],                req: { Dexterity: 16, Intelligence: 9 },    opposed: ["Necromancy", "Invocation/Evocation", "Abjuration"] },
		"Invoker":     { school: "Invocation/Evocation",  races: ["human"],                         req: { Constitution: 16, Intelligence: 9 }, opposed: ["Enchantment/Charm", "Conjuration/Summoning"] },
		"Necromancer": { school: "Necromancy",            races: ["human"],                         req: { Wisdom: 16, Intelligence: 9 },       opposed: ["Illusion/Phantasm", "Enchantment/Charm"] },
		"Transmuter":  { school: "Alteration",            races: ["human", "half-elf"],             req: { Dexterity: 15, Intelligence: 9 },    opposed: ["Abjuration", "Necromancy"] }
	};
	const WIZ_MAGE_RACES = ["human", "elf", "half-elf"]; // Mage (ej specialist) enligt Wizards.md
	
	// Spells per wizard level (kolumn = spell level 1-9). Specialister får +1 per spell level de kan casta.
	const WIZ_SLOTS = [null, 
		[1,0,0,0,0,0,0,0,0],
		[2,0,0,0,0,0,0,0,0],
		[2,1,0,0,0,0,0,0,0],
		[3,2,0,0,0,0,0,0,0],
		[4,2,1,0,0,0,0,0,0],
		[4,2,2,0,0,0,0,0,0],
		[4,3,2,1,0,0,0,0,0],
		[4,3,3,2,0,0,0,0,0],
		[4,3,3,2,1,0,0,0,0],
		[4,4,3,2,2,0,0,0,0],
		[4,4,4,3,3,0,0,0,0],
		[4,4,4,4,4,1,0,0,0],
		[5,5,5,4,4,2,0,0,0],
		[5,5,5,4,4,2,1,0,0],
		[5,5,5,5,5,2,1,0,0],
		[5,5,5,5,5,3,2,1,0],
		[5,5,5,5,5,3,3,2,0],
		[5,5,5,5,5,3,3,2,1],
		[5,5,5,5,5,3,3,3,1],
		[5,5,5,5,5,4,3,3,2]];
	
	// Spellbookens skolnamn -> de 8 kärnskolorna. Sub-skolor (Dimension, Force, Mentalism m.fl.) ignoreras när spellen även har en kärnskola.
	const WIZ_SCHOOL_ALIAS = {
		"Abjuration": ["Abjuration"], "Alteration": ["Alteration"],
		"Conjuration": ["Conjuration/Summoning"], "Summoning": ["Conjuration/Summoning"], "Conjuration/Summoning": ["Conjuration/Summoning"],
		"Divination": ["Divination"],
		"Enchantment": ["Enchantment/Charm"], "Enchantment/Charm": ["Enchantment/Charm"],
		"Evocation": ["Invocation/Evocation"], "Invocation": ["Invocation/Evocation"], "Invocation/Evocation": ["Invocation/Evocation"],
		"Illusion": ["Illusion/Phantasm"], "Phantasm": ["Illusion/Phantasm"], "Illusion/Phantasm": ["Illusion/Phantasm"],
		"Necromancy": ["Necromancy"], "Necromancy/Alteration": ["Necromancy", "Alteration"], "Divination/Illusion": ["Divination", "Illusion/Phantasm"]
	};
	function wizCoreSchools(tags) {
		if (tags.includes("All Schools")) return { universal: true, schools: [] };
		const s = new Set();
		tags.forEach(t => (WIZ_SCHOOL_ALIAS[t] || []).forEach(x => s.add(x)));
		if (!s.size) s.add("Alteration"); // spell med bara en sub-skola (t.ex. Etherealness/Dimension)
		return { universal: false, schools: Array.from(s) };
	}
	
	const WIZ_SPELL_DIRS= spellTables.WIZ_SPELL_DIRS;
	const WIZ_SPELL_ROWS = spellTables.WIZ_SPELL_ROWS;
	const WIZARD_SPELLS = WIZ_SPELL_ROWS.map(r => {
		const f = r.split("|");
		const tags = f[2].split(";");
		const core = wizCoreSchools(tags);
		return { name: f[0], level: Number(f[1]), tags: tags, universal: core.universal, schools: core.schools, path: WIZ_SPELL_DIRS[Number(f[3])] + "/" + f[0] + ".md" };
	});
	
	function wizOwn(spec, sp) { return !!spec && !sp.universal && sp.schools.includes(spec.school); }
	function wizOpposed(spec, sp) {
		if (!spec || sp.universal) return false;
		if (!sp.schools.some(s => spec.opposed.includes(s))) return false;
		if (sp.schools.length === 1 && sp.schools[0] === "Divination" && WIZ_LESSER_DIVINATION.includes(sp.name)) return false;
		return true;
	}
	function wizShuffle(a) {
		const r = a.slice();
		for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = r[i]; r[i] = r[j]; r[j] = t; }
		return r;
	}
	function wizAgeMult(ageLabel) {
		const s = String(ageLabel || "").toLowerCase();
		const key = Object.keys(WIZ_AGE_MULT).find(k => s.startsWith(k));
		return key ? WIZ_AGE_MULT[key] : 1;
	}
	function wizMeets(req, stats) { return Object.entries(req).every(([k, v]) => Number(stats[k]) >= v); }
	function wizRaceOk(race, specKey) {
		const r = String(race).toLowerCase();
		return specKey ? WIZ_SPECIALISTS[specKey].races.includes(r) : WIZ_MAGE_RACES.includes(r);
	}
	
	// Bygger spellbook (alla kända spells) + memorerade spells per spell level.
	// Spellbook per level: 1) wizard level 1: 2-3 slumpade startspells  2) specialist: 1 gratis spell ur egen skola (ingen roll)
	// 3) varje spell på leveln: encounter-chans -> spell learning-check -> in i boken (max Int-tabellens "Max # of Spells/Level")
	// 4) boken fylls upp till antalet memorerade slots (lärd av mästare/köpt) så att alla memorerade spells finns i boken.
	function pickWizardSpells(lvl, intScore, ageLabel, isNoble, specKey, slotsRow) {
		// slotsRow: valfri egen spelltabell (t.ex. Bard) i stället för WIZ_SLOTS
		const spec = specKey ? WIZ_SPECIALISTS[specKey] : null;
		const ent = getStatEntry("Intelligence", intScore) || {};
		const maxSpellLvl = parseInt(ent.spellLevel) || 0;   // "--" -> 0, "4th" -> 4
		const learnPct = Number(ent.chanceToLearn) || 0;
		const cap = ent.maxSpellsPerLevel === "All" ? Infinity : (Number(ent.maxSpellsPerLevel) || 0);
		const slots = (slotsRow || WIZ_SLOTS[Math.max(1, Math.min(20, lvl))]).map((n, i) => (i + 1 > maxSpellLvl || n === 0) ? 0 : (spec ? n + 1 : n));
		const mult = wizAgeMult(ageLabel) * (isNoble ? WIZ_NOBLE_MULT : 1) * (1 + WIZ_LEVEL_STEP * (Math.max(1, lvl) - 1)) * (slotsRow ? BARD_BOOK_MULT : 1);
		const result = [];
		for (let L = 1; L <= 9; L++) {
			const n = slots[L - 1];
			if (!n) continue;
			const pool = WIZARD_SPELLS.filter(sp => sp.level === L && !wizOpposed(spec, sp));
			const book = [];
			const add = sp => { if (!book.includes(sp) && book.length < cap) { book.push(sp); return true; } return false; };
			if (L === 1 && !slotsRow) {
					// Startbok: 2-3 slumpade level 1-spells (bara riktiga wizards, inte bards)
					const nStart = WIZ_START_SPELLS[0] + Math.floor(Math.random() * (WIZ_START_SPELLS[1] - WIZ_START_SPELLS[0] + 1));
					wizShuffle(pool).slice(0, nStart).forEach(sp => add(sp));
				}
			if (spec) {
				const own = pool.filter(sp => wizOwn(spec, sp) && !book.includes(sp));
				if (own.length) add(own[Math.floor(Math.random() * own.length)]);
			}
			const pEnc = Math.min(95, WIZ_ENCOUNTER_PCT[L] * mult) / 100;
			wizShuffle(pool).forEach(sp => {
				if (book.includes(sp) || Math.random() >= pEnc) return;
				let chance = learnPct;
				if (spec && !sp.universal) chance += wizOwn(spec, sp) ? 15 : -15;
				chance = Math.max(1, Math.min(100, chance));
				if (Math.floor(Math.random() * 100) + 1 <= chance) add(sp);
			});
			const rest = wizShuffle(pool.filter(sp => !book.includes(sp)));
			while (book.length < Math.min(n, cap) && rest.length) add(rest.pop());
			// Memorerade: specialistens bonusslot är alltid en spell ur egen skola
			const mem = [];
			if (spec) {
				const ownBook = book.filter(sp => wizOwn(spec, sp));
				if (ownBook.length) mem.push(ownBook[Math.floor(Math.random() * ownBook.length)]);
			}
			// Varje slot väljer oberoende av de andra ur hela boken (med återläggning): samma spell kan memoreras flera gånger.
			// Egen skola väger dubbelt för specialister.
			const w = book.map(sp => wizOwn(spec, sp) ? 2 : 1);
			while (mem.length < n && book.length) mem.push(book[weightedIndex(w)]);
			const byName = (a, b) => a.name.localeCompare(b.name);
			result.push({ level: L, slots: n, book: book.slice().sort(byName), mem: mem.sort(byName) });
		}
		return result;
	}
	
	function buildWizardSpellCallout(res, specKey, label) {
		if (!res || !res.length) return [];
		const spec = specKey ? WIZ_SPECIALISTS[specKey] : null;
		const memN = res.reduce((s, r) => s + r.mem.length, 0);
		const bookN = res.reduce((s, r) => s + r.book.length, 0);
		const L = [">", ">> [!spells]- " + (label || "Wizard Spells") + " (" + memN + " memorerade, " + bookN + " i spellbook)"];
		if (spec) {
			L.push("> > * **Specialisering:** " + specKey + " (" + spec.school + ") | **Opposition:** " + spec.opposed.join(", "));
			L.push("> > * *+1 spell per spell level (egen skola), +15 % / −15 % på spell learning (egen / andra skolor), +1 på saves mot egen skolas spells från andra wizards, −1 för offer av hans egna.*");
		} else if (!label) {
			L.push("> > * **Specialisering:** Mage (ingen)");
		}
		res.forEach(r => L.push("> > * **" + ORD[r.level] + " (" + r.mem.length + "):** " + spellLinksCounted(r.mem)));
		L.push("> >");
		L.push("> > > [!spell-list]- Spellbook (memorerade i **fet stil**)");
		res.forEach(r => {
			const m = new Set(r.mem.map(sp => sp.name));
			L.push("> > > * **" + ORD[r.level] + " (" + r.book.length + "):** " + r.book.map(sp => m.has(sp.name) ? "**" + spellLink(sp) + "**" : spellLink(sp)).join(", "));
		});
		return L;
}

const classOptions = ["Fighter", "Cleric", "Druid", "Paladin", "Ranger", "Thief", "Bard", "Wizard", "Commoner"];

const RANDOM_LABEL = "🎲 Random";

// Din vanliga hjälpfunktion (om du vill ha den kvar)


// Den asynkrona meny-funktionen döpt till selectOption
async function selectOption(promptText, options) {
    // tp.system.suggester tar (visningstext_matris, returvärdes_matris)
    // Om användaren trycker Esc/avbryter returnerar den null/undefined.
    return await tp.system.suggester(options, options);
}

// --- 1. Class (Här använde du 'pick' av misstag tidigare, ändrat till 'selectOption') ---
const classPick = await selectOption("Välj Class:", [RANDOM_LABEL, ...classOptions]);
if (!classPick) return;
const classVal = (classPick === RANDOM_LABEL) ? "X" : classPick;

// --- 1b. Gud + faith level (bara för Cleric) ---
let godVal = "X", faithVal = "X";

if (classVal === "Cleric") { // <-- Ändrat till ===
    const godLabels = GOD_NAMES.map(n => n + " – " + GOD_DATA[n].title);
    const godPick = await selectOption("Välj gud:", [RANDOM_LABEL, ...godLabels]);
    if (!godPick) return;
    godVal = (godPick === RANDOM_LABEL) ? "X" : godPick.split(" – ")[0]; // <-- Ändrat till ===

    const faithLabels = FAITH_LEVELS.map(f => f.label);
    const faithPick = await selectOption("Välj faith level:", ["🎲 Random (Troende eller högre)", ...faithLabels]);
    if (!faithPick) return;
    faithVal = (faithPick.startsWith("🎲")) ? "X" : String(FAITH_LEVELS.findIndex(f => f.label === faithPick));
}

// --- 1c. Specialisering (bara för Wizard) ---
let schoolVal = "X";
if (classVal === "Wizard") {
    const specKeys = Object.keys(WIZ_SPECIALISTS);
    const specLabels = specKeys.map(k => k + " – " + WIZ_SPECIALISTS[k].school);
    const specPick = await selectOption("Välj specialisering:", ["🎲 Random (" + Math.round(WIZ_SPECIALIST_CHANCE * 100) + "% specialist)", "Mage – ingen specialisering", ...specLabels]);
    if (!specPick) return;
    schoolVal = (specPick.startsWith("🎲")) ? "X" : (specPick.startsWith("Mage")) ? "Mage" : specPick.split(" – ")[0];
}

// --- 2. Level ---
const levelOptions = Array.from({ length: 21 }, (_, i) => String(i)); // 0–20
const levelPick = await selectOption("Välj Level:", [RANDOM_LABEL, ...levelOptions]);
if (!levelPick) return;
const levelVal = (levelPick === RANDOM_LABEL) ? "X" : levelPick;

// --- 3. Race ---
const raceOptions = Object.keys(ageTable);
const racePick = await selectOption("Välj Race:", [RANDOM_LABEL, ...raceOptions]);
if (!racePick) return;
const raceVal = (racePick === RANDOM_LABEL) ? "X" : racePick;

// --- 4. Age (beror på vald Race) ---
let ageVal = "X";
if (raceVal !== "X") {
    const ageOptions = ageTable[raceVal].map(c => c.label);
    const agePick = await selectOption(`Välj Age (${raceVal}):`, [RANDOM_LABEL, ...ageOptions]); // <-- Lagt till backticks här
    if (!agePick) return;
    ageVal = (agePick === RANDOM_LABEL) ? "X" : agePick;
}

// --- 5. Gender ---
const genderPick = await selectOption("Välj Gender:", [RANDOM_LABEL, "Man", "Woman"]);
if (!genderPick) return;
const genderVal = (genderPick === RANDOM_LABEL) ? "X" : genderPick;

// --- 6. Adlig ---
const noblePick = await selectOption("Adlig?", ["🎲 Random (10%)", "Ja", "Nej"]);
if (!noblePick) return;
const nobleVal = (noblePick.startsWith("🎲")) ? "X" : noblePick;

// --- 7. Stat Method (3d6 vs 4d6) ---
const statPick = await selectOption("Välj Tärningsmetod för Stats:", [RANDOM_LABEL, "3d6", "4d6"]);
if (!statPick) return;
const statMethodVal = (statPick === RANDOM_LABEL) ? "3d6" : statPick;

// --- Bygg spec-sträng ---
const statField = (classVal === "Cleric") ? (statMethodVal + "~" + godVal + "~" + faithVal)
    : (classVal === "Wizard") ? (statMethodVal + "~" + schoolVal)
    : statMethodVal;
const spec = [classVal, levelVal, raceVal, ageVal, genderVal, nobleVal, statField].join("_");

// --- Synkronisera dropdown-valen till de gamla $-variablerna ---
let $1 = classVal;
let $2 = levelVal;
let $3 = (raceVal === "X") ? "" : raceVal;
let $4 = (ageVal === "X") ? "X" : ageVal;
let $5 = (genderVal === "X") ? "X" : genderVal;
let $6 = nobleVal.startsWith("🎲") ? "X" : nobleVal;
let $7 = statField;

let genderInput = $5.trim();
let genders = ["Man", "Woman"];

// Logik för att sätta kön
let gender;
if (genderInput.toLowerCase() === "x" || genderInput.toLowerCase() === "random") {
    gender = genders[Math.floor(Math.random() * genders.length)];
} else {
    gender = genderInput.charAt(0).toUpperCase() + genderInput.slice(1).toLowerCase();
}

// 1. Grundläggande input
let lvl = ($2 === 'X') ? pickLevel() : Number($2);
let className = ($1 === 'X') ? (lvl === 0 ? "Commoner" : "X") : $1; // "X" = slumpas längre ner, när ras och stats är kända
if (className === "Commoner") lvl = 0;
if (lvl === 0) className = "Commoner";
let inputRace = $3 ? $3.trim() : "";

// 2. Hantera Ras & Biologi
const raceIsRandom = !(inputRace && raceExists(inputRace)); // true = rasen slumpas (och får bytas om den inte passar klassen)
let race = raceIsRandom ? pickRace() : inputRace;
let weight = rollWeight(race, gender);
let height = rollHeight(race, gender);
let inputAgeLabel = $4 ? $4.trim() : "X";
let age = getAgeCategory(race, inputAgeLabel);

// 2b. Hantera Adlig
let inputAdlig = $6 ? $6.trim().toLowerCase() : "";
let isNoble = (inputAdlig === "x" || inputAdlig === "random")
    ? Math.random() < 0.1
    : ["ja", "adlig", "yes", "y"].includes(inputAdlig);
// Statmethod ($7) - sätter 3d6 som standard om inget annat anges
const _specParts = ($7 ? $7.trim() : "3d6").split("~");
statMethod = (_specParts[0] || "3d6").toLowerCase();
const godInput = _specParts[1] || "X";
const faithInput = _specParts[2] || "X";
const schoolInput = _specParts[1] || "X"; // Wizard: "X" (random), "Mage" eller specialist-namn (t.ex. "Illusionist")
// Utseende & Personlighet
let charHairColor = getHairColor();
let charHairstyle = getHairstyle(gender);
let charFacialHair = getFacialHair(gender);
let charEyeColor = getEyeColor();
let charSpecialFeatures = getSpecialFeatures();
let myGod = getGod(); 
// 1. Rulla stats först (med vald statMethod)
// 1. Rulla stats med rätt metod skickad som argument
// 1. Rulla stats först
let charStats = rollCharacterStats(statMethod);

// 2. Hantera Ras (om angiven eller slumpad)

const _raceBeforeClass = race;
// 3. Hantera Klass med BÅDE stat-krav och ras-restriktioner!
if (className === "X") {
    // A. Hitta klasser som uppfyller stat-krav OCH är tillåtna för den valda rasen
    let validClassNames = CLASS_WEIGHTS
        .map(c => c.name)
        .filter(c => {
            // Kolla ras-restriktion
            if (!isRaceClassCompatible(race, c)) return false;
            
            // Kolla stat-krav
            const reqs = CLASS_REQUIREMENTS[c];
            if (!reqs) return true;
            return Object.entries(reqs).every(([stat, minVal]) => Number(charStats[stat]) >= Number(minVal));
        });
    
    // Slumpa med vikter bland de godkända, eller bli Commoner om det är helt kört
    className = validClassNames.length > 0 ? pickClass(validClassNames) : "Commoner";
    if (className === "Commoner") lvl = 0;
	} else {
	    // B. Om en specifik klass VALTS av användaren (t.ex. en Dvärg-Paladin eller liknande som bryter reglerna):
	    // Om rasen inte tillåter klassen, kan vi antingen tvinga fram en tillåten ras, eller låta loopen justera.
	    // Men det snyggaste är att säkerställa att rasen matchar klassen om rasen var slumpad ("X"):
	    
	    if (raceIsRandom && !isRaceClassCompatible(race, className)) {
	        // Om rasen slumpades fram men inte matchar den valda klassen, byt ras till en som funkar!
	        let compatibleRaces = Object.keys(RACE_RESTRICTIONS).filter(r => isRaceClassCompatible(r, className));
	        race = compatibleRaces.length > 0 ? compatibleRaces[Math.floor(Math.random() * compatibleRaces.length)] : "Human";
	    }
	
	    // Säkerställ även att stats matchar klassens minimikrav
	    const reqs = CLASS_REQUIREMENTS[className];
	    if (reqs) {
	        let attempts = 0;
	        while (!Object.entries(reqs).every(([stat, minVal]) => Number(charStats[stat]) >= Number(minVal)) && attempts < 50) {
	            charStats = rollCharacterStats(statMethod);
	            attempts++;
	        }
	        if (attempts >= 50) {
	            for (const [stat, minVal] of Object.entries(reqs)) {
	                if (Number(charStats[stat]) < Number(minVal)) charStats[stat] = Number(minVal);
	            }
	        }
	    }
	}

// --- Wizard: Mage/Specialist, rasfix & spellbook ---
if (race === "Half-Elf") race = "Half-elf"; // RACE_RESTRICTIONS använder "Half-Elf", ageTable/namnlogiken "Half-elf"
const isWizard = className === "Wizard";
let wizSpec = null; // null = Mage (ingen specialisering)
if (isWizard) {
    const raceLc = String(race).toLowerCase();
    if (schoolInput === "Mage") {
        wizSpec = null;
    } else if (schoolInput !== "X" && WIZ_SPECIALISTS[schoolInput]) {
        wizSpec = schoolInput;
    } else if (raceLc === "gnome") {
        wizSpec = "Illusionist"; // gnomer kan bara vara illusionister
    } else if (Math.random() < WIZ_SPECIALIST_CHANCE) {
        // Slumpa specialist bland dem rasen tillåter. Föredra skolor vars stat-krav redan är uppfyllda.
        const byRace = Object.keys(WIZ_SPECIALISTS).filter(k => wizRaceOk(race, k));
        const byStats = byRace.filter(k => wizMeets(WIZ_SPECIALISTS[k].req, charStats));
        const poolK = byStats.length ? byStats : byRace;
        wizSpec = poolK.length ? poolK[Math.floor(Math.random() * poolK.length)] : null;
    }
    // Slumpad ras som inte får vara just den här sortens wizard -> byt till en ras som får det
    if (raceIsRandom && !wizRaceOk(race, wizSpec)) {
        const okRaces = wizSpec ? WIZ_SPECIALISTS[wizSpec].races : WIZ_MAGE_RACES;
        race = { "human": "Human", "elf": "Elf", "half-elf": "Half-elf", "gnome": "Gnome" }[okRaces[Math.floor(Math.random() * okRaces.length)]];
    }
    // Specialisten måste uppfylla sina minimum ability scores (samma princip som klasskraven ovan)
    if (wizSpec) {
        const sreq = WIZ_SPECIALISTS[wizSpec].req;
        let attempts = 0;
        while (!wizMeets(sreq, charStats) && attempts < 50) { charStats = rollCharacterStats(statMethod); attempts++; }
        if (attempts >= 50) {
            for (const [stat, minVal] of Object.entries(sreq)) {
                if (Number(charStats[stat]) < minVal) charStats[stat] = minVal;
            }
        }
    }
}
// Om rasen byttes ovan (klass- eller wizardlogik) måste längd/vikt/ålder rullas om för den nya rasen
if (race !== _raceBeforeClass) {
    weight = rollWeight(race, gender);
    height = rollHeight(race, gender);
    age = getAgeCategory(race, inputAgeLabel);
}
const wizBook = isWizard ? pickWizardSpells(lvl, Number(charStats.Intelligence), age, isNoble, wizSpec) : null;

// Bard: wizard-spells enligt egen tabell (Instructions.md). Int styr max spell level, chance to learn och max spells/level som för wizards.
const BARD_SLOTS = [null,
	[0,0,0,0,0,0],[1,0,0,0,0,0],[2,0,0,0,0,0],[2,1,0,0,0,0],[3,1,0,0,0,0],[3,2,0,0,0,0],[3,2,1,0,0,0],
	[3,3,1,0,0,0],[3,3,2,0,0,0],[3,3,2,1,0,0],[3,3,3,1,0,0],[3,3,3,2,0,0],[3,3,3,2,1,0],[3,3,3,3,1,0],
	[3,3,3,3,2,0],[4,3,3,3,2,1],[4,4,3,3,3,1],[4,4,4,3,3,2],[4,4,4,4,3,2],[4,4,4,4,4,3]];
// Bards behåller alltid sina spells, men de flesta reser lätt utan rustning. Låg chans att en bard (level 2+) ändå äger/bär rustning
// (t.ex. på resa mellan städer) – spells kan då bara castas när rustningen är avtagen (visas som <abbr> i vapenblocket).
const BARD_ARMOR_CHANCE = 0.5;
const bardArmored = className === "Bard" && lvl >= 2 && Math.random() < BARD_ARMOR_CHANCE;
globalThis.__BARD_ARMORED = bardArmored; // läses av vapen-/rustningsvalet
const bardBook = (className === "Bard" && lvl >= 2) ? pickWizardSpells(lvl, Number(charStats.Intelligence), age, isNoble, null, BARD_SLOTS[Math.min(20, lvl)]) : null;

// --- Gud & faith (Cleric) ---
const isCleric = className === "Cleric";
if (isCleric && godInput !== "X" && GOD_DATA[godInput]) myGod = godInput;
globalThis.__NPC_GOD = isCleric ? myGod : null; // används av vapen-/rustningsvalet
const godInfo = isCleric ? GOD_DATA[myGod] : null;
const myFaith = getFaithLevel(isCleric ? CLERIC_MIN_FAITH : 0, isCleric ? faithInput : "X");

let classGroup = getClassGroup(className);
let saves = getSavingThrows(classGroup, lvl);
let progress = getProgressionData(className, lvl);
if (godInfo && progress) {
    // Gudens Hit Dice (d6/d8) och Combat Rating (Good = Warrior, Medium = Priest, Poor = Wizard)
    const crGroup = { Good: "Priest", Medium: "Priest", Poor: "Priest" }[godInfo.combat];
    const alt = PROGRESSION_DATA[crGroup].find(p => p.level === lvl);
    progress = Object.assign({}, progress, { hitDiceType: godInfo.hd, attackBonus: alt ? alt.attackBonus : progress.attackBonus });
}
// Con-bonus på HP: warriors använder warriorHpBonus (17+ ger mer), övriga max hitPointAdjustment (+2). Läggs på per hit die (se calculateHitPoints).
const _conEnt = getStatEntry("Constitution", charStats.Constitution) || {};
const conHpMod = (lvl === 0 || className === "Commoner") ? 0
    : (getClassGroup(className) === "Warrior" && _conEnt.warriorHpBonus !== undefined) ? _conEnt.warriorHpBonus
    : (_conEnt.hitPointAdjustment || 0);
let totalHp = calculateHitPoints(progress.hitDice, progress.hitDiceType, conHpMod);
let thiefSkillsBlock = "";
let tSkills = calculateThiefSkills(className, lvl, race, charStats.Dexterity);
if (tSkills) {
    if (className === "Thief") {
        thiefSkillsBlock = [
            "> > [!thief-skills]-",
            "> > | Pick Pockets | Open Locks | Find/Rem. Traps | Move Silently | Hide in Shadows | Detect Noise | Climb Walls | Read Languages |",
            "> > | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |",
            "> > | " + tSkills.pp + "% | " + tSkills.ol + "% | " + tSkills.fr + "% | " + tSkills.ms + "% | " + tSkills.hs + "% | " + tSkills.dn + "% | " + tSkills.cw + "% | " + tSkills.rl + "% |",
            "> >",
            // Roll20 räknar Base/Adjust(ras+Dex)/Armor själv; "Improve" = diskretionära poäng = total - bas - ras - Dex
            "> > * **Improve (Roll20):** " + (() => {
                const rm = THIEF_RACE_MODIFIERS[race] || THIEF_RACE_MODIFIERS["Human"];
                const dm = getDexteritySkillModifiers(charStats.Dexterity);
                return ["pp", "ol", "fr", "ms", "hs", "dn", "cw", "rl"]
                    .map(k => k + " " + (tSkills[k] - BASE_THIEF_SKILLS[k] - (rm[k] || 0) - (dm[k] || 0))).join(" | ");
            })(),
            ">"
        ].join("\n");

    } else if (className === "Bard") {
        thiefSkillsBlock = [
            "> > [!bard-skills]-",
            "> > | Pick Pockets | Detect Noise | Climb Walls | Read Languages |",
            "> > | :---: | :---: | :---: | :---: |",
            "> > | " + tSkills.pp + "% | " + tSkills.dn + "% | " + tSkills.cw + "% | " + tSkills.rl + "% |",
            ">"
        ].join("\n");

    } else if (className === "Ranger") {
        thiefSkillsBlock = [
            "> > [!ranger-skills]-",
            "> > | Move Silently | Hide in Shadows |",
            "> > | :---: | :---: |",
            "> > | " + tSkills.ms + "% | " + tSkills.hs + "% |",
            ">"
        ].join("\n");
    }
}
// Exempel på hur du kan lägga in dem i din return-sats eller statblock:
// "> > * **Stats:** STR: " + charStats.Strength + " | DEX: " + charStats.Dexterity + " | CON: " + charStats.Constitution + " | INT: " + charStats.Intelligence + " | WIS: " + charStats.Wisdom + " | CHA: " + charStats.Charisma + " | PCP: " + charStats.Pcp
// Namngivning
const nameTables = tp.user.Namescript();

// Hjälpfunktion för att slumpa ett namn ur en array
const pickRandom = (arr) => arr && arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : "test";

let firstName = "test";

// Kontrollera kön och ras
if (gender === "Man") {
    if (race === "Human") {
        firstName = pickRandom(nameTables.nameManHuman);
    } else if (race.includes("Dwarf")) {
        firstName = pickRandom(nameTables.nameManDwarf);
    } else if (race.includes("Elf")) {
        firstName = pickRandom(nameTables.nameManElf);
    } else if (race.includes("Halfling")) {
        firstName = pickRandom(nameTables.nameManHalfling);
    } else if (race.includes("Gnome")) {
        firstName = pickRandom(nameTables.nameManGnome);
    } else if (race === "Half-elf") {
        firstName = Math.random() < 0.5 ? pickRandom(nameTables.nameManElf) : pickRandom(nameTables.nameManHuman);
    }
} else if (gender === "Woman") {
    if (race === "Human") {
        firstName = pickRandom(nameTables.nameWomanHuman);
    } else if (race.includes("Dwarf")) {
        firstName = pickRandom(nameTables.nameWomanDwarf);
    } else if (race.includes("Elf")) {
        firstName = pickRandom(nameTables.nameWomanElf);
    } else if (race.includes("Halfling")) {
        firstName = pickRandom(nameTables.nameWomanHalfling);
    } else if (race.includes("Gnome")) {
        firstName = pickRandom(nameTables.nameWomanGnome);
    } else if (race === "Half-elf") {
        firstName = Math.random() < 0.5 ? pickRandom(nameTables.nameWomanElf) : pickRandom(nameTables.nameWomanHuman);
    }
}
// Hämta ut alla uträknade dataobjekt direkt baserat på vad karaktären rullade
const statsData = getCharacterStatData(charStats, className);
let nickname = nameTables.pickNickname(gender, race, className, height, weight, charHairColor, charFacialHair, charSpecialFeatures);
let charFullName = nameTables.applyNickname(firstName, nickname);
if (isNoble) {
    charFullName = charFullName + " " + nameTables.getSurname(race);
}

const birthYear = await rollBirthYear(age); // null om SoA_data/current_year saknas
return [
"",
"> [!statblock-2e-"+ className +"]",
"> # " + charFullName,
"> Klass: " + className + (isWizard ? " – " + (wizSpec || "Mage") : "") + " (Level " + lvl + ") | " + race + " | " + gender,
"> Hit Points: " + totalHp + " | Hit Dice: " + progress.hitDice + " (" + progress.hitDiceType + ") | Attack Bonus: " + (progress.attackBonus >= 0 ? "+" : "") + progress.attackBonus + (progress.attacksPerRound ? " | Attacks/Round: " + progress.attacksPerRound : ""),
">",
"> | STR | DEX | CON | INT | WIS | CHA | PCP |",
"> | :-: | :-: | :-: | :-: | :-: | :-: | :-: |",
"> | " + charStats.Strength + " | " + charStats.Dexterity + " | " + charStats.Constitution + " | " + charStats.Intelligence + " | " + charStats.Wisdom + " | " + charStats.Charisma + " | " + charStats.Pcp + " |",
">",
"> > [!bio]-",
"> > **Biografi & Utseende:**",
"> > * **Ålder:** " + (birthYear != null ? "`= [[" + SOA_DATA_FILE + "]].current_year - this.birthyear` years – " + age : age + " years"),
"> > * **Längd & Vikt:** " + height + " cm, " + weight + " kg",
"> > * **Sexuell läggning:** " + pickSexuality(),
"> > * **Social stil:** " + getSocialStyle(),
"> > * **Temperament:** " + getTemperament(),
"> > * **Moral:** " + getMoralCompass(),
"> > * **Rädsla:** " + getFear(),
"> > * **Hemlighet:** " + getSecret(),
"> > * **Talang:** " + getTalent(),
"> > * **Religion:** Dyrkar " + myGod + ", är " + myFaith,
"> > * **Utseende:** Hår: " + charHairColor + " (" + charHairstyle + "), Skägg: " + charFacialHair + ", Ögon: " + charEyeColor,
"> > * **Övrigt:** " + charSpecialFeatures,
">",
">> [!saves]-",
"> > | Paralyzation, Poison, Death Magic | Rod, Staff, Wand | Petrification, Polymorph | Breath Weapon | Spell |",
"> > | :---: | :---: | :---: | :---: | :---: |",
"> > | " + saves.paralyzation + " | " + saves.rod + " | " + saves.petrification + " | " + saves.breath + " | " + saves.spell + " |",
">",
...(className === "Thief" && tSkills ? [
"> > [!thief-skills]-",
"> > | Pick Pockets | Open Locks | Find/Rem. Traps | Move Silently | Hide in Shadows | Detect Noise | Climb Walls | Read Languages |",
"> > | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |",
"> > | " + tSkills.pp + "% | " + tSkills.ol + "% | " + tSkills.fr + "% | " + tSkills.ms + "% | " + tSkills.hs + "% | " + tSkills.dn + "% | " + tSkills.cw + "% | " + tSkills.rl + "% |",
"> >",
// Roll20 räknar Base/Adjust(ras+Dex)/Armor själv; "Improve" = diskretionära poäng = total - bas - ras - Dex
"> > * **Improve (Roll20):** " + (() => {
    const rm = THIEF_RACE_MODIFIERS[race] || THIEF_RACE_MODIFIERS["Human"];
    const dm = getDexteritySkillModifiers(charStats.Dexterity);
    return ["pp", "ol", "fr", "ms", "hs", "dn", "cw", "rl"]
        .map(k => k + " " + (tSkills[k] - BASE_THIEF_SKILLS[k] - (rm[k] || 0) - (dm[k] || 0))).join(" | ");
})(),
">"
] : []),

...(className === "Bard" && tSkills ? [
"> > [!thief-skills]-",
"> > | Pick Pockets | Detect Noise | Climb Walls | Read Languages |",
"> > | :---: | :---: | :---: | :---: |",
"> > | " + tSkills.pp + "% | " + tSkills.dn + "% | " + tSkills.cw + "% | " + tSkills.rl + "% |",
">"
] : []),

...(className === "Ranger" && tSkills ? [
"> > [!thief-skills]-",
"> > | Move Silently | Hide in Shadows |",
"> > | :---: | :---: |",
"> > | " + tSkills.ms + "% | " + tSkills.hs + "% |",
">"
] : []),
    // Abilities-sektionen som använder vår nya funktion
    ">> [!abilities]-",
    "> > | **Hit Prob.** | **Dmg. Adj.** | **Weight Allow.** | **Max. Press** | **Open Doors** | **Bend Bars/Lift Gates** |",
    "> > | ------------- | ------------- | ----------------- | -------------- | -------------- | ------------------------ |",
    "> > | " + statsData.strength.hitProb + " | " + statsData.strength.dmgAdj + " | " + statsData.strength.weightAllow + " | " + statsData.strength.maxPress + " | " + statsData.strength.openDoors + " | " + statsData.strength.bendBars + "% |",
    "> >",
    "> > | **Missile Attack Adj.** | **Defensive Adj.** |",
    "> > | ----------------------- | ------------------ |",
    "> > | " + statsData.dexterity.missileAttackAdj + " | " + (statsData.dexterity.defensiveAdj > 0 ? "+" : "") + statsData.dexterity.defensiveAdj + " |",
    "> >",
    "> > | **Hit Point Adjustment** | **System Shock** | **Resurrection Survival** | **Poison Save** | **Regeneration** |",
    "> > | ------------------------ | ---------------- | ------------------------- | --------------- | ------------- |",
    "> > | " + statsData.constitution.hitPointAdjustment + " | " + statsData.constitution.systemShock + "% | " + statsData.constitution.resurrectionSurvival + "% | " + statsData.constitution.poisonSave + " | " + statsData.constitution.regeneration + " |",
    "> >",
    "> > | **# of Lang.** | **# of NWP** | **Spell Level** | **Chance to Learn Spell** | **Max. # of Spells/Level** |",
    "> > | -------------- | ------------ | --------------- | ------------------------- | -------------------------- |",
    "> > | " + statsData.intelligence.languages + " | " + statsData.intelligence.nonWeaponProficiencies + " | " + statsData.intelligence.spellLevel + " | " + statsData.intelligence.chanceToLearn + "% | " + statsData.intelligence.maxSpellsPerLevel + " |",
    "> >",
    "> > | **Magical Defense Adjustment** | **Bonus Spells** | **Chance of Spell Failure** | **Spell Immunity** |",
    "> > | ------------------------------ | ------------ | --------------------------- | ----------------------------------------------------------- |",
    "> > | " + statsData.wisdom.magicalDefenseAdj + " | " + statsData.wisdom.bonusSpells + " | " + statsData.wisdom.chanceOfSpellFailure + "% | " + statsData.wisdom.spellImmunity + " |",
    "> >",
    "> > | **Maximum # of Henchmen** | **Loyalty Base** | **Reaction Adjustment** |",
    "> > | ------------------------- | ---------------- | ----------------------- |",
    "> > | " + statsData.charisma.maxHenchmen + " | " + statsData.charisma.loyaltyBase + " | " + statsData.charisma.reactionAdjustment + " |",
    "> >",
    "> > | **Illusion Immunity** | **Surprise Adj.** |",
    "> > | --------------------- | ----------------- |",
    "> > | " + statsData.perception.illusionImmunity + " | " + statsData.perception.surpriseAdj + " |",
    ...(isCleric ? buildGodCallout(myGod, myFaith, (myGod === "Izgimmer" && lvl >= 5) ? aPick(Object.values(WIZ_SPECIALISTS).map(x => x.school)) : null) : []),
    ...(isCleric ? buildSpellCallout(myGod, lvl, Number(charStats.Wisdom)) : []),
    ...(isWizard ? buildWizardSpellCallout(wizBook, wizSpec) : []),
    ...(bardBook ? buildWizardSpellCallout(bardBook, null, "Bard Spells") : []),    ...(className === "Paladin" && lvl >= 9 ? buildSphereSpellCallout("Paladin", lvl) : []),
    ...(className === "Ranger" && lvl >= 8 ? buildSphereSpellCallout("Ranger", lvl) : []),
    // ----------------------------------------------------
    ...buildNwpCallout(pickNonweaponProficiencies(className, lvl, charStats, race), charStats),
    ...buildWeaponCallout(pickWeaponProficiencies(className, lvl, race, charStats, isNoble)),
    // ----------------------------------------------------
    // Roll20 Export: dataviewjs som läser just det här kortet (skriptet ligger i ROLL20_EXPORT_VIEW)
    ">",
    ">> [!line]- Roll20 Export",
    "> > " + "`".repeat(3) + "dataviewjs",
    "> > await dv.view(\"" + ROLL20_EXPORT_VIEW + "\");",
    "> > " + "`".repeat(3),
    ...(birthYear != null ? ["> > birthyear::" + birthYear + "\n"] : [])
].join("\n");
let generatedNPC = tp.user.npcEngine.generateFromSpec(spec);
tR += generatedNPC;
%>
```