---
player: Jonte
type:
  - Player Character
level: 1
class:
  - Wizard
stat.str: 6
stat.dex: 11
stat.con: 6
stat.int: 18
stat.wis: 6
stat.chr: 9
stat.pcp: 10
wps:
nwps:
  - "[[00_Rulebook/Player's Option- Spells and Magic/Chapter 4- Proficiencies/Wizard Proficiencies/Wizard Proficiencies/Bookbinding|Bookbinding]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Engineering|Engineering]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Spellcraft|Spellcraft]]"
languages:
  - Abarin
birthday: 518-07-07
age: "35"
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
Height: 178 cm
Weight: 71 kg
Right-handed
Hotness: 14