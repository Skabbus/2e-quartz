const WPG_APH = "Axes, Picks, and Hammers";
const WPG_CMF = "Clubs, Maces, and Flails";
const WPG_SW = "Swords";
const WPG_POLE = "Polearms";
const WPG_SPJ = "Spears & Javelins";
const WP_WEAPONS_RAW = [
	`Battle Axe|=|Axes|${WPG_APH}|M|1|5|6|`,
	`Hand Axe|Hand or Throwing Axe>Hand axe|Axes|${WPG_APH}|MT|1|1|7|k`,
	`Two-handed Axe||Axes|${WPG_APH}|M|2|8|3|B`,
	`Footman's Pick|=|Picks|${WPG_APH}|M|1|8|3|`,
	`Horseman's Pick|=|Picks|${WPG_APH}|M|1|6|4|`,
	`War Hammer|=|Hammers|${WPG_APH}|M|1|2|7|ck`,
	`Maul||Hammers|${WPG_APH}|M|2|5|2|ckB`,
	`Sledge||Hammers|${WPG_APH}|M|2|3|1|ck`,

	`Footman's Mace|=|Maces|${WPG_CMF}|M|1|8|8|c`,
	`Horseman's Mace|=|Maces|${WPG_CMF}|M|1|5|7|c`,
	`Club|=|Clubs|${WPG_CMF}|M|1|0|6|cdtk`,
	`Great Club||Clubs|${WPG_CMF}|M|2|1|2|ckB`,
	`War Club||Clubs|${WPG_CMF}|M|1|1|2|ck`,
	`Morning Star|=|Clubs|${WPG_CMF}|M|1|10|5|`,
	`Horseman's Flail|=|Flails|${WPG_CMF}|M|1|8|6|c`,
	`Footman's Flail|=|Flails|${WPG_CMF}|M|1|15|5|c`,

	`Short Bow|=||Bows|R|2|30|9|tk`,
	`Long Bow|=||Bows|R|2|75|9|B`,
	`Composite Short Bow|Composite Bows>Composite short bow||Bows|R|2|75|4|`,
	`Composite Long Bow|Composite Bows>Composite long bow||Bows|R|2|100|3|B`,

	`Hand Crossbow|Crossbow, Hand>Hand crossbow|Crossbows||R|1|300|3|t`,
	`Light Crossbow|Crossbow, Light and Heavy>Light crossbow|Crossbows||R|2|35|7|tk`,
	`Heavy Crossbow|Crossbow, Light and Heavy>Heavy crossbow|Crossbows||R|2|50|5|B`,

	`Dagger|=|Daggers & Knives;Short Swords|${WPG_SW}|MT|1|2|9|dtwkm`,
	`Knife|=|Daggers & Knives||MT|1|0.5|5|dtwkm`,
	`Stiletto|=|Daggers & Knives||M|1|5|3|tm`,
	`Main-Gauche|=|Daggers & Knives;Fencing Weapons|${WPG_SW}|M|1|3|5|tnm`,
	`Parrying Dagger|Dagger, Parrying>Parrying dagger|Daggers & Knives;Fencing Weapons|${WPG_SW}|M|1|5|3|tnm`,

	`Broad Sword|=|Ancient Swords;Roman Swords;Medium Swords|${WPG_SW}|M|1|10|6|t`,
	`Long Sword|=|Medium Swords|${WPG_SW}|M|1|15|10|tn`,
	`Short Sword|=|Ancient Swords;Middle Eastern Swords;Short Swords|${WPG_SW}|M|1|10|8|t`,
	`Gladius|=|Roman Swords;Short Swords|${WPG_SW}|M|1|15|3|`,
	`Drusus|Gladius>Drusus|Roman Swords;Short Swords|${WPG_SW}|M|1|50|2|n`,
	`Khopesh|=|Ancient Swords|${WPG_SW}|M|1|10|2|`,
	`Scimitar|Sabre-Scimitar>Scimitar|Middle Eastern Swords|${WPG_SW}|M|1|15|6|dt`,
	`Sabre|Sabre-Scimitar>Sabre|Medium Swords;Fencing Weapons|${WPG_SW}|M|1|17|5|n`,
	`Cutlass|=|Oriental Swords;Medium Swords|${WPG_SW}|M|1|12|5|t`,
	`Falchion|=|Medium Swords|${WPG_SW}|M|1|17|4|`,
	`Rapier|=|Fencing Weapons|${WPG_SW}|M|1|15|6|tn`,
	`Bastard Sword|=|Large Swords|${WPG_SW}|M|v|25|5|nB`,
	`Claymore|=|Large Swords|${WPG_SW}|M|2|25|3|B`,
	`Two-Handed Sword|=|Large Swords|${WPG_SW}|M|2|50|5|B`,

	`Awl Pike|=|Spear-like Polearms;Spears|${WPG_POLE};${WPG_SPJ}|M|2|5|3|B`,
	`Partisan|=|Spear-like Polearms|${WPG_POLE}|M|2|10|4|B`,
	`Ranseur|=|Spear-like Polearms|${WPG_POLE}|M|2|6|3|B`,
	`Spetum|=|Spear-like Polearms|${WPG_POLE}|M|2|5|3|B`,
	`Bardiche|=|Poleaxes|${WPG_POLE}|M|2|7|3|B`,
	`Halberd|=|Poleaxes|${WPG_POLE}|M|2|10|7|B`,
	`Voulge|=|Poleaxes|${WPG_POLE}|M|2|5|3|B`,
	`Bill-Guisarme|=|Bills|${WPG_POLE}|M|2|7|2|B`,
	`Glaive-Guisarme|=|Bills|${WPG_POLE}|M|2|10|3|B`,
	`Guisarme-Voulge|=|Bills|${WPG_POLE}|M|2|8|2|B`,
	`Hook Fauchard|Hook-Fauchard>Hook fauchard|Bills|${WPG_POLE}|M|2|10|2|B`,
	`Glaive|=|Glaives|${WPG_POLE}|M|2|6|4|B`,
	`Fauchard|=|Glaives|${WPG_POLE}|M|2|5|3|B`,
	`Fauchard-Fork|=|Glaives|${WPG_POLE}|M|2|8|2|B`,
	`Bec de Corbin|=|Beaked Polearms|${WPG_POLE}|M|2|8|3|B`,
	`Lucern Hammer|=|Beaked Polearms|${WPG_POLE}|M|2|7|3|B`,
	`Military Fork|=||${WPG_POLE}|M|2|5|2|B`,
	`Guisarme|=|||M|2|5|2|B`,

	`Spear|=|Spears|${WPG_SPJ}|MT|v|0.8|9|dk`,
	`Long Spear|Long Spear>Long spear|Spears|${WPG_SPJ}|M|2|5|3|B`,
	`Javelin|=|Javelins|${WPG_SPJ}|T|1|0.5|6|`,
	`Dart|=|Javelins|${WPG_SPJ}|T|1|0.5|4|dtwkm`,
	`Harpoon|=||${WPG_SPJ}|MT|2|2|1|`,
	`Trident|=||${WPG_SPJ}|M|v|15|2|`,

	`Light Horse Lance||Lances||M|1|6|3|sB`,
	`Medium Horse Lance||Lances||M|1|10|3|sB`,
	`Heavy Horse Lance||Lances||M|1|15|3|sB`,
	`Jousting Lance|=|Lances||M|1|20|2|snB`,

	`Quarterstaff|=|||M|2|0|8|cdtwk`,
	`Sling|=|||R|1|0.05|6|cdtwk`,
	`Staff Sling|Staff-Sling>Staff sling|||R|2|0.2|2|cdk`,
	`Sickle|=|||M|1|0.6|3|dk`,
	`Sap|00_Rulebook/The Complete Fighter's Handbook/Combat Rules/Punching, Wrestling and Martial Arts/Sap>Sap|||M|1|1|2|tm`,
	`Bolas|Bola>Bolas|||T|1|0.5|1|m`,
	`Whip|=|||M|1|0.1|1|m`,
	`Chain||Chain & Rope||M|1|0.5|1|m`,
	`Blowgun|=|||R|1|5|1|t`,

	// Gudavapen (flagga g = bara tillgängliga via gudens vapenlista). Kostnader/hands är grova uppskattningar.
	`Scythe|00_Rulebook/The Complete Priest's Handbook/Equipment and Combat/New Weapons List>Scythe|||M|2|5|2|g`,
	`Lasso|=|||T|1|0.5|2|g`,
	`Net|=|||T|1|1|2|g`,
	`Mancatcher|=|||M|2|7|1|g`,
	`Scourge|00_Rulebook/Arms and Equipment Guide/Chapter 3- Weapons/Miscellaneous Weapons/Scourge>Scourge|||M|1|1|2|g`,
	`Stinkpot|Staff-Sling>Stinkpot|||T|1|1|1|g`,
	`Cestus|=|||M|1|1|2|g`,
	`Caltrop|=|||T|1|1|1|g`,
	`Belaying Pin|=|||M|1|0|2|g`
];
const NWP_RAW = [
	"Acting|Rogue|BARD|Charisma|-1",
	"Administration|Priest|PO_P|Intelligence|1",
	"Agriculture|General|PHB|Intelligence|0",
	"Alchemy|Wizard|PO_W|Intelligence|-3",
	"Anatomy|Wizard|PO_W|Intelligence|-2",
	"Ancient History|Priest,Rogue,Wizard|PHB|Intelligence|-1",
	"Animal Handling|General|PHB|Wisdom|-1",
	"Animal Lore|Warrior|PHB|Intelligence|0",
	"Animal Training|General|PHB|Wisdom|0",
	"Appraising|Rogue|PHB|Intelligence|0",
	"Arcanology|Wizard|PO_W|Intelligence|-3",
	"Armorer|Warrior|PHB|Intelligence|-2",
	"Artistic Ability|General|PHB|Wisdom|0",
	"Blacksmithing|General|PHB|Strength|0",
	"Blind-fighting|Rogue,Warrior|PHB||0",
	"Boat Piloting|General|PO_S|Intelligence|0",
	"Bookbinding|Wizard,Priest|PO_W|Intelligence|0",
	"Bowyer-Fletcher|Warrior|PHB|Dexterity|-1",
	"Brewing|General|PHB|Intelligence|0",
	"Bureaucracy|Priest,Rogue|PAL|Intelligence|0",
	"Camouflage|Rogue,Warrior|RANG|Wisdom|0",
	"Carpentry|General|PHB|Strength|0",
	"Cartography|General|RANG|Intelligence|-2",
	"Charioteering|Warrior|PHB|Dexterity|2",
	"Cobbling|General|PHB|Dexterity|0",
	"Concentration|Wizard|PO_W|Wisdom|-2",
	"Cooking|General|PHB|Intelligence|0",
	"Craft Instrument|General|BARD|Dexterity|-2",
	"Cryptography|Rogue,Wizard|PO_S|Intelligence,Wisdom|0",
	"Dancing|General|PHB|Dexterity|0",
	"Direction Sense|General|PHB|Wisdom|1",
	"Disguise|Rogue|PHB|Charisma|-1",
	"Endurance|Warrior|PHB|Constitution|0",
	"Engineering|Priest,Wizard|PHB|Intelligence|-3",
	"Etiquette|General|PHB|Charisma|0",
	"Fire-building|General|PHB|Wisdom|-1",
	"Fishing|General|PHB|Wisdom|-1",
	"Forgery|Rogue|PHB|Dexterity|-1",
	"Gaming|Rogue,Warrior|PHB|Charisma|0",
	"Gem Cutting|Rogue,Wizard|PHB|Dexterity|-2",
	"Glassblowing|Wizard|PO_W|Dexterity|0",
	"Healing|Priest|PHB|Wisdom|-2",
	"Heraldry|General|PHB|Intelligence|0",
	"Herbalism|Priest,Wizard|PHB|Intelligence|-2",
	"Jousting|Warrior|PAL|Dexterity|2",
	"Juggling|Rogue|PHB|Dexterity|-1",
	"Jumping|Rogue|PHB|Strength|0",
	"Languages, Ancient|Priest,Wizard|PHB|Intelligence|0",
	"Languages, Modern|General|PHB|Intelligence|0",
	"Leatherworking|General|PHB|Intelligence|0",
	"Local History|Priest,Rogue|PHB|Charisma|0",
	"Locksmithing|Rogue|THIEF|Dexterity|0",
	"Mining|General|PHB|Wisdom|-3",
	"Mountaineering|Warrior|PHB||0",
	"Musical Instrument|Priest,Rogue|PHB|Dexterity|-1",
	"Navigation|Priest,Warrior,Wizard|PHB|Intelligence|-2",
	"Omen Reading|Wizard,Priest|PO_W|Wisdom|-2",
	"Papermaking|Wizard,Priest|PO_W|Intelligence|0",
	"Poetry|General|PAL|Intelligence|-2",
	"Pottery|General|PHB|Dexterity|-2",
	"Prestidigitation|Wizard|PO_W|Dexterity|-1",
	"Reading Lips|Rogue|PHB|Intelligence|-2",
	"Reading-Writing|Priest,Wizard|PHB|Intelligence|1",
	"Religion|Priest,Wizard|PHB|Wisdom|0",
	"Riding, Airborne|General|PHB|Wisdom|-2",
	"Riding, Land-Based|General|PHB|Wisdom|3",
	"Riding, Sea-based|General|RANG|Dexterity|-2",
	"Rope Use|General|PHB|Dexterity|0",
	"Running|Warrior|PHB|Constitution|-6",
	"Sage Knowledge|Wizard,Priest|PO_W||0",
	"Scribe|Wizard|PO_W|Dexterity|1",
	"Seamanship|General|PHB|Dexterity|1",
	"Seamstress-Tailor|General|PHB|Dexterity|-1",
	"Set Snares|Rogue,Warrior|PHB|Dexterity,Intelligence|-1",
	"Singing|General|PHB|Charisma|0",
	"Spellcraft|Priest,Wizard|PHB|Intelligence|-2",
	"Stonemasonry|General|PHB|Strength|-2",
	"Survival|Warrior|PHB|Intelligence|0",
	"Swimming|General|PHB|Strength|0",
	"Throwing|Rogue|PO_S||0",
	"Tighrope Walking|Rogue|PO_S|Dexterity|0",
	"Toxicology|Rogue|NINJA|Intelligence|0",
	"Tracking|Warrior|PHB|Wisdom|0",
	"Trailing|Rogue|THIEF|Dexterity|0",
	"Tumbling|Rogue|PHB|Dexterity|0",
	"Undead Lore|Priest|PO_P|Intelligence|-1",
	"Ventriloquism|Rogue|PHB|Intelligence|-2",
	"Weaponsmithing|Warrior|PHB|Intelligence|-3",
	"Weaving|General|PHB|Intelligence|-1"
];

// ===================== INRIKTNINGAR (specialiseringar) =====================
// Proficiencies som kräver en inriktning. Varje slot = ett eget ämne (t.ex. två slots
// Musical Instrument = två olika instrument). Format: "Ämne|vikt" (högre vikt = vanligare).
// Rader markerade (tillagd) är mina tillägg utöver din Kladd – ta bort de du inte vill ha.
const NWP_SPEC_RAW = {
	"Artistic Ability": [
		"Painting|4", "Drawing|4", "Sculpture|3", "Composition|2",
		"Calligraphy|2", "Woodcarving|2", "Mosaic|1", "Engraving|1", "Illumination|1" // (tillagda: Calligraphy→Illumination)
	],
	"Animal Training": [
		"dogs|5", "horses|5", "falcons|3", "pigeons|2", "parrots|2", "ferrets|1", "elephants|1",
		"cats|1", "ravens|1", "monkeys|1", "camels|1", "bears|1" // (tillagda: cats→bears)
	],
	"Languages, Modern": [
		"Abarin|2", "Tarnorian|2", "Elerian|2", "Casean|2", "Soek|2", "Valdorian|2", "Calendorian|2", "Kolrogian|2",
		"Halfling|1", "Dwarvish|1", "Elvish|1"
	],
	"Sage Knowledge": [
		"Alchemy|1", "Architecture|1", "Art|1", "Astrology|1", "Astronomy|1", "Botany|1", "Cartography|1",
		"Chemistry|1", "Cryptography|1", "Engineering|1", "Folklore|1", "Genealogy|1", "Geography|1",
		"Heraldry|1", "History|1", "Languages|1", "Law|1", "Mathematics|1", "Medicine|1", "Meteorology|1",
		"Music|1", "Myconology|1", "Oceanography|1", "Philosophy|1", "Physics|1", "Inner Planes|1",
		"Outer Planes|1", "Schools of Magic|1", "Sociology|1", "Theology|1", "Toxicology|1", "Zoology|1"
	]
};

// Sage Knowledge-ämnen som har en motsvarighet i vanliga NWP-listan: karaktären får BÅDA.
// Format: Sage-ämne -> namn på NWP exakt som i NWP_RAW.
const SAGE_PAIRS = {
	"Alchemy": "Alchemy",
	"Cartography": "Cartography",
	"Cryptography": "Cryptography",
	"Engineering": "Engineering",
	"Heraldry": "Heraldry",
	"Toxicology": "Toxicology",
	// Fler möjliga kopplingar om du vill (avkommentera):
	"Botany": "Herbalism",
	"Medicine": "Healing",
	"History": "Ancient History",
	"Theology": "Religion",
};

// Proficiencies där inriktningen lämnas blank i utskriften: "Ancient History (_undetermined_)".
// true = varje slot är ett eget ämne (flera blanka rader), false = en rad, extra slots ger +2.
const NWP_BLANK = {
	"Ancient History": false,
	"Languages, Ancient": true,
	"Local History": false
};

// Instrument ur Kladd.md. Format: Namn|Familj|Era|Kostnad(gp)
const INSTRUMENTS_RAW = [
	// Wind – reeds/holes
	"Bagpipes|Bagpipes|D|80", "Dudy|Bagpipes|D|75", "Zampogna|Bagpipes|D|85",
	"Aulos|Clarinet/Oboe|R|35", "Hautboy|Clarinet/Oboe|M|30", "Serpent|Clarinet/Oboe|R|50", "Tibia|Clarinet/Oboe|A|25",
	"Crumhorn|Shawm|M|20", "Curtall|Shawm|M|25", "Rackett|Shawm|M|20", "Shawm|Shawm|D|15",
	"Bamboo pipe|Fipple flute|A|5", "Cornett|Fipple flute|M|10", "Double fipple|Fipple flute|M|20",
	"Flageolet|Fipple flute|D|15", "Nose flute|Fipple flute|M|5", "Recorder|Fipple flute|D|10", "Gemshorn|Fipple flute|A|5",
	"Penny whistle|Whistle flute|M|5", "Pipe|Whistle flute|D|3",
	"Ocarina|Transverse flute|A|15",
	"Harmonica|Mouth organ|A|5", "Khen|Mouth organ|A|5", "Panpipes|Mouth organ|A|5", "Sheng|Mouth organ|A|5", "Syrinx|Mouth organ|A|5",
	// Wind – tubes/lips
	"Coiled horn|Metal horn|M|65", "Fanfare horn|Metal horn|M|35", "Heralding horn|Metal horn|M|35",
	"Slide horn|Metal horn|M|80", "Straight horn|Metal horn|M|30",
	"Alphorn|Nonmetal horn|D|50", "Animal horn|Nonmetal horn|A|5", "Conch shell|Nonmetal horn|A|5",
	"Hunting horn|Nonmetal horn|D|10", "Lur|Nonmetal horn|A|5", "Side horn|Nonmetal horn|A|10",
	"Sackbut|Trombone|M|95",
	// Stringed – struck/plucked
	"Dulcimer|Dulcimer|M|60", "Cimbalom|Dulcimer|M|55", "Cimbal|Dulcimer|M|55", "Psaltery|Dulcimer|M|65", "Santouri|Dulcimer|M|60",
	"Citole|Guitar|M|40", "Cittern|Guitar|M|40", "Gittern|Guitar|M|55", "Lute|Guitar|D|35",
	"Shamisen|Guitar|D|35", "Sitar|Guitar|M|40", "Mandoline|Guitar|M|40",
	"Harp|Harp|A|75", "Aeolian harp|Harp|A|12", "Clarsach|Harp|A|50", "Lyre|Harp|A|40", "Crwth|Harp|D|35", "Tallharpa|Harp|D|65",
	"Zither|Zither|A|40", "Ganun|Zither|A|35", "Koto|Zither|A|35",
	// Stringed – bowed
	"Short-necked fiddle|Fiddle|D|30", "Lirica|Fiddle|M|30", "Spiked fiddle|Fiddle|D|25",
	"Hurdy gurdy|Hurdy gurdy|M|80", "Organistrum|Hurdy gurdy|M|85", "Rota|Hurdy gurdy|M|80",
	"Rebec|Rebec|D|55", "Lira da braccio|Rebec|M|65", "Lyra|Rebec|D|55", "Tromba marina|Rebec|D|15", "Viol|Rebec|M|70",
	// Percussion – membranes
	"Bongos|Drum|D|6", "Cylinder drum|Drum|A|20", "Changgo|Drum|A|25", "Friction drum|Drum|A|10", "Gong drum|Drum|A|35",
	"Kettledrum|Drum|A|30", "Nakers|Drum|M|35", "Tom-tom|Drum|D|30", "Side drum|Drum|A|15", "Tabor|Drum|M|20",
	"Slit drum|Drum|A|40", "Talking drum|Drum|A|30",
	"Tambourine|Tambourine|A|5", "Tambourine de Provence|Tambourine|D|5",
	// Percussion – without membranes
	"Bells|Chime|A|25", "Cymbals|Chime|D|20", "Chimes|Chime|M|30", "Gong|Chime|D|20", "Tam-tam|Chime|D|20", "Triangle|Chime|D|5",
	"Bones|Clappers|A|1", "Castanets|Clappers|M|2", "Claves|Clappers|A|1",
	"Rattle|Rattle|A|3", "Gourds|Rattle|A|2", "Sistrum|Rattle|A|10",
	"Clogs|Wooden effects|D|2", "Scraper|Wooden effects|A|1", "Stamping stick|Wooden effects|A|0", "Wooden block|Wooden effects|A|1",
	"Glockenspiel|Xylophone|M|80", "Metallophone|Xylophone|D|95", "Wooden xylophone|Xylophone|A|60",
	// Keyboard
	"Clavichord|Keyboard|R|500", "Harpsichord|Keyboard|R|300", "Clavecin|Keyboard|R|275",
	"Clavicembalo|Keyboard|R|300", "Spinet|Keyboard|R|275", "Virginals|Keyboard|R|300",
	"Hydraulis|Organ|A|250", "Positive organ|Organ|D|350", "Pipe organ|Organ|M|1200",
	// Other
	"Jew's harp|Other|D|5", "Kazoo|Other|A|3", "Nightingale|Other|D|25", "Sansa|Other|A|5"
];

module.exports = () => {
    return {
        NWP_RAW,
		WP_WEAPONS_RAW,
		NWP_SPEC_RAW,
		SAGE_PAIRS,
		NWP_BLANK,
		INSTRUMENTS_RAW
    };
};