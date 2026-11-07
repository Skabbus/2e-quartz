---
player: Körner
type:
  - Player Character
level: 1
class:
  - Cleric
stat.str: 9
stat.dex: 7
stat.con: 12
stat.int: 7
stat.wis: 15
stat.chr: 12
stat.pcp: 6
wps:
  - "[[00_Rulebook/Player's Option- Combat and Tactics/Chapter Four- Weapon Specialization and Mastery/Weapon Proficiencies/Shield Proficiency|Shield Proficiency]]"
  - "[[Footman's Mace]]"
nwps:
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Singing|Singing]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Fishing|Fishing]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Healing|Healing]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Gaming|Gaming]]"
languages:
  - Abarin
  - Tarnor
birthday: 509-02-01
age: "44"
family:
  - "[[Iliana]]"
  - "[[Viggo]]"
  - "[[Sindril]]"
  - "[[Mathilde]]"
---
## Basics
```dataview
TABLE WITHOUT ID
  row["level"] AS Level,
  row["class"] AS Class,
  row["birthday"] AS Birthday,
  row["age"] AS Age
FROM ""
WHERE file.path = this.file.path
```
## Stats
```dataview
TABLE WITHOUT ID
  row["stat.str"] AS Strength,
  row["stat.dex"] AS Dexterity,
  row["stat.con"] AS Constitution,
  row["stat.int"] AS Intelligence,
  row["stat.wis"] AS Wisdom,
  row["stat.chr"] AS Charisma,
  row["stat.pcp"] AS Perception
FROM ""
WHERE file.path = this.file.path
```
## Proficiencies
```dataview
TABLE WITHOUT ID
  join(wps, "<br>") AS "Weapon Proficiencies",
  join(nwps, "<br>") AS "Nonweapon Proficiencies",
  join(languages, "<br>") AS "Languages"
FROM ""
WHERE file.path = this.file.path
```
170cm
80kg
Right-handed
Hotness 14
## Close Relationships
```dataview
TABLE WITHOUT ID
  join(family, "<br>") AS "Family"
FROM ""
WHERE file.path = this.file.path
```
## Backstory
***
En Cleric och familjefar. Försöker och lyckas leva ett hederligt liv. Medelålders, fru och två barn. Går till templet varje dag och gör sitt jobb.

Dotter på 18, Son på 14, Dotter på 6

Hans dialekt tyder på att han kommer någon annastans ifrån, Tarnor. Lärde sig slåss som yngre. När han först kom till Torrak så var han fortfarande vild. Han svinade runt och gjorde _namn_ på smällen. Han valde att stanna som far, och lyckades vända sitt liv, dock fortfarande svårt ekonomisk, han tog odd jobs. Han hängav sig till familjen och blev vald av Neral. Han började då jobba på barnhemet.

Vis och insiktsfull. Loyal, rättviss och ödmjuk

Beroendeproblem. Särskilt spel och alkohol. Nykterist sedan länge. Lyckats spara och hålla i sina pengar för sin familjs skull.

Viss avundsjuka mot andras framgång. Ser ner på de som jagar framgång och äventyr istället för att leva ett lugnt familjecentrerat liv. Samtidigt som han själv ibland önskar att han var fri, ångrar ibland i hemlighet sitt val att bli en trygg präst istället för äventyrare/soldat.