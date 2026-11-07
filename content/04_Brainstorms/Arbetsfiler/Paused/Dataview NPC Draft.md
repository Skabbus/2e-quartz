
> [!statblock-2e-wizard]
> # Soren
> Klass: Wizard – Mage (Level `=this.level`) | Human | Man
> Hit Points: `= sum(this.hprolls)` | Hit Dice: `= filter([[Class_data]].file.lists, (l) => l.savegroup = this.savegroup AND l.level = this.level)[0].hd` | Attack Bonus: `= filter([[Class_data]].file.lists, (l) => l.savegroup = this.savegroup AND l.level = this.level)[0].to_hit`
>
> ```dataview
>TABLE WITHOUT ID
 > this.stat_str AS Strength,
 > this.stat_dex AS Dexterity,
 > this.stat_con AS Constitution,
 > this.stat_int AS Intelligence,
 > this.stat_wis AS Wisdom,
 > this.stat_chr AS Charisma,
 > this.stat_pcp AS Perception
>FROM "" 
>WHERE file.path = this.file.path
>```
>
> > [!bio]-
> > **Biografi & Utseende:**
> > * **Ålder:** `= [[SoA_data]].current_year - this.birthyear`
> > * **Längd & Vikt:** `=this.height`, `=this.weight`
> > * **Sexuell läggning:** Heterosexual
> > * **Social stil:** <abbr title="Mån om andras välmående i rummet och tar instinktivt på sig rollen som försvarare.">Skyddande</abbr>
> > * **Temperament:** <abbr title="Ständigt på helspänn; ser potentiella faror och problem i varje gathörn.">Orolig</abbr>
> > * **Moral:** <abbr title="Håller fast vid sina vänner, sin familj eller sin herre oavsett omständigheter; sviker aldrig ett förtroende.">Lojal</abbr>
> > * **Rädsla:** Att maten ska vara förgiftad
> > * **Hemlighet:** Har blivit förbannad men döljer symptomen
> > * **Talang:** Inget
> > * **Religion:** Dyrkar `=this.god`, är Fanatisk – lever för sin gud, extremt hängiven
> > * **Utseende:** Hår: Kastanj (Lockigt), Skägg: Stubb, Ögon: Ljusblå
> > * **Övrigt:** Skrovlig hudstruktur
>
>> [!saves]-
> > ```dataview
> > TABLE WITHOUT ID
> >   L.s1 AS "Paralyzation, Poison, Death Magic",
> >   L.s2 AS "Rod, Staff, Wand",
> >   L.s3 AS "Petrification, Polymorph",
> >   L.s4 AS "Breath Weapon",
> >   L.s5 AS "Spell"
> > FROM "Metadata/Saves.md"
> > FLATTEN file.lists AS L
> > WHERE L.group AND L.group = this.savegroup
> >   AND L.minlvl <= this.level AND L.maxlvl >= this.level
> > ```
> 
> 
>> [!abilities]-
> > ```dataview
> > TABLE WITHOUT ID
> >   upper(L.stat) AS Stat,
> >   L.p1 AS "1", L.p2 AS "2", L.p3 AS "3", L.p4 AS "4", L.p5 AS "5", L.p6 AS "6"
> > FROM "Metadata/Abilities.md"
> > FLATTEN file.lists AS L
> > WHERE L.value AND (
> >   (L.stat = "str" AND L.value = this.stat_str
> >      AND L.xmin <= default(this.stat_str_pct, 0) AND L.xmax >= default(this.stat_str_pct, 0))
> >   OR (L.stat = "dex" AND L.value = this.stat_dex)
> >   OR (L.stat = "con" AND L.value = this.stat_con)
> >   OR (L.stat = "int" AND L.value = this.stat_int)
> >   OR (L.stat = "wis" AND L.value = this.stat_wis)
> >   OR (L.stat = "chr" AND L.value = this.stat_chr)
> >   OR (L.stat = "pcp" AND L.value = this.stat_pcp)
> > )
> > ```
>
> > [!spells]- Wizard Spells (`= sum(map(filter([[Class_data]].file.lists, (l) => l.savegroup = this.savegroup AND l.level = this.level), (l) => l.s1 + l.s2 + l.s3 + l.s4 + l.s5 + l.s6 + l.s7 + l.s8 + l.s9)) + choice(this.savegroup = "priest", sum(map(split(regexreplace(filter([[abilities]].file.lists, (l) => l.stat = "wis" AND l.value = this.stat_wis)[0].p2, "^.*: ", ""), ", *"), (b) => choice(regextest("^[0-9](st|nd|rd|th)", b), choice(contains(b, " x"), number(regexreplace(b, "^.* x", "")), 1), 0))), 0)` slots, 11 i spellbook)
> > * **Specialisering:** Mage (ingen)
> > ```dataview
> > TABLE WITHOUT ID level AS "Spell level", file.link AS "Memorized spell",
> >   length(filter(split(this.spellsmem, "; *"), (x) => x = file.name)) AS Castings
> > FROM ""
> > WHERE contains(lower(string(spellist)), lower(this.savegroup))
> >   AND length(filter(split(this.spellsmem, "; *"), (x) => x = file.name)) > 0
> > SORT level ASC, file.name ASC
> > ```
> > 
> > > [!spell-list]- All Spells
> > > 
> > > ```dataview
> > > TABLE WITHOUT ID level AS "Spell level",
> > >   choice(length(filter(split(this.spellsmem, "; *"), (x) => x = file.name)) > 0,
> > >     "**[[" + file.path + "|" + file.name + "]]**",
> > >     "[[" + file.path + "|" + file.name + "]]") AS Spellbook,
> > >   default(school, default(sphere, "?")) AS "School / Sphere"
> > > FROM ""
> > > WHERE contains(lower(string(spellist)), lower(this.savegroup))
> > > FLATTEN [filter([[God_Data]].file.lists, (l) => l.god AND l.god = this.god)[0]] AS g
> > > WHERE (this.savegroup != "priest"
> > >     AND length(filter(split(this.spellbook, "; *"), (x) => x = file.name)) > 0)
> > >   OR (this.savegroup = "priest" AND level > 0 AND g AND level <= this.level AND (
> > >     length(filter(split(join(flat(list(g.spheres_major)), ", "), ", *"), (m) => contains(lower(string(sphere)), lower(m)))) > 0
> > >     OR (level <= 3 AND length(filter(split(join(flat(list(g.spheres_minor)), ", "), ", *"), (m) => contains(lower(string(sphere)), lower(m)))) > 0)))
> > > SORT level ASC, file.name ASC
> > > ```
>
>> ```dataview
>>TABLE WITHOUT ID
>>file.link AS NWP,
>>  ability AS Ability,
 >> split(entry, "\|")[1] AS Slots,
  >>split(entry, "\|")[2] AS Test,
 >> check_modifier AS "Base Mod"
>>FROM ""
>>WHERE contains(type, "NWP")
  >>AND (duplicate != 1 AND duplicate != true)
  >>AND (disabled != 1 AND disabled != true)
 >> AND length(class_group) > 0
>>FLATTEN filter(flat(list(this.nwp)), (x) => startswith(x, file.name + "|")) AS entry
>>WHERE entry
>>SORT file.name ASC
>>```
>
>>```dataview
TABLE WITHOUT ID
  choice(lower(name) = lower(file.name), file.link, link(file.path, name)) AS WP,
  split(item, "[|]")[1] AS Slots,
   split(item, "[|]")[2] AS Level
FROM ""
WHERE contains(type, "WP")
  AND !contains(type, "NWP")
FLATTEN flat(list(this.wp)) AS item
FLATTEN split(item, "[|]")[0] AS name
WHERE lower(name) = lower(file.name)
>OR startswith(lower(file.name), lower(name) + " (")
  OR contains(map(flat(list(file.aliases)), (a) => lower(a)), lower(name))
SORT file.name ASC
>>```
> 
>> [!line]+ Metadata
>> [stat_str:: 18], [stat_dex:: 13], [stat_con:: 17], [stat_int:: 11], [stat_wis::9], [stat_chr::9],[stat_pcp::8]
>> [nwp:: Languages, Modern|2|Test, Valdorianska], [nwp:: Acting|2]
>> [height::159 cm], [weight:: 45 kg], [birthyear::512], [savegroup::priest], [level::5], [hprolls::4, 6], [god::Altumus], [race:: Halfling]
>> [wp::Light Crossbow|3|Mastery], [wp::Awl Pike|2|Specialization], [wp::Small Shield|1|Proficient], [wp::Chain Mail], [wp::bg_aph]
>> [spellbook:: "Audible Glamer; Burning Hands; Change Self; Chromatic Orb; Comprehend Languages; Corpse Visage; Detect Magic; Hold Portal; Mount; Patternweave; Sound Bubble; Invisibility, 10' Radius"]
>>[spellsmem::Change Self; Chromatic Orb]

```dataview
TABLE WITHOUT ID
  (L.s1 - choice(contains(list("Dwarf", "Halfling", "Gnome"), this.race), min(5, floor(default(this.stat_con, 0) / 3.5)), 0)) AS "Paralyzation, Poison, Death Magic",
  (L.s2 - choice(contains(list("Dwarf", "Halfling", "Gnome"), this.race), min(5, floor(default(this.stat_con, 0) / 3.5)), 0)) AS "Rod, Staff, Wand",
  L.s3 AS "Petrification, Polymorph",
  L.s4 AS "Breath Weapon",
  (L.s5 - choice(contains(list("Dwarf", "Halfling", "Gnome"), this.race), min(5, floor(default(this.stat_con, 0) / 3.5)), 0)) AS "Spell"
FROM "Metadata/Saves.md"
FLATTEN file.lists AS L
WHERE L.group AND L.group = this.savegroup
  AND L.minlvl <= this.level AND L.maxlvl >= this.level
```

```dataview
TABLE WITHOUT ID
  (L.s1 - choice(contains(list("dwarf", "halfling", "gnome"), lower(string(this.race))), min(5, floor(number(default(this.stat_con, 0)) / 3.5)), 0)) AS "Paralyzation, Poison, Death Magic",
  (L.s2 - choice(contains(list("dwarf", "halfling", "gnome"), lower(string(this.race))), min(5, floor(number(default(this.stat_con, 0)) / 3.5)), 0)) AS "Rod, Staff, Wand",
  L.s3 AS "Petrification, Polymorph",
  L.s4 AS "Breath Weapon",
  (L.s5 
    - choice(contains(list("dwarf", "halfling", "gnome"), lower(string(this.race))), min(5, floor(number(default(this.stat_con, 0)) / 3.5)), 0)
    - number(default(L_wis.p1, 0))
  ) AS "Spell"
FROM "Metadata/Saves.md"
FLATTEN file.lists AS L
FLATTEN link("Metadata/Abilities.md").file.lists AS L_wis
WHERE L.group AND L.group = this.savegroup
  AND L.minlvl <= this.level AND L.maxlvl >= this.level
  AND L_wis.stat = "wis" AND L_wis.value = this.stat_wis
```

