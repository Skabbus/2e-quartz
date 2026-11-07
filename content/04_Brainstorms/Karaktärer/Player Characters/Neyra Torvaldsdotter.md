---
player: Martin
type:
  - Player Character
level: 1
class:
  - Fighter
stat.str: 16
stat.dex: 8
stat.con: 16
stat.int: 7
stat.wis: 6
stat.chr: 6
stat.pcp: 6
wps:
  - "[[00_Rulebook/Player's Option- Combat and Tactics/Chapter Four- Weapon Specialization and Mastery/Weapon Proficiencies/Shield Proficiency|Shield Proficiency]]"
nwps:
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Dancing|Dancing]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Endurance|Endurance]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Rope Use|Rope Use]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Running|Running]]"
languages:
  - Abarin
birthday: 532-10-23
age: "21"
---
## Basics
```dataview
TABLE WITHOUT ID
  row["level"] AS Level,
  row["class"] AS Class
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
180 cm
61cm
Right-handed
Hotness 14
## Backstory
***
Neyra föddes upp i Torraks yttre bonde-håla, norr om staden nära floden. Hon växte upp med sin mor, far och bror i en stuga. Varje morgon begav sig familjen till landsherrens marker för att arbeta.

Neyra har spenderat mycket tid på åkern tillsammans med bönderna och djuren. Jobbat som betjänt, styra djuren med ett lasso och en stav, hämta hästar när de behövdes, fästa rep runt varor som skulle skickas vidare.

En kväll skedde firandet av Altumus hos landsherren. Bjöds på lite musik, mat och dans. När Landsherrens dotter ville dansa så sa fadern emot. Hans ville inte att hans dotter skulle spendera tid med o-adlig pojkar. Så dottern frågade om en flicka istället, Neyra. Neyras svar var lika tydligt som om hennes tungan var bunden. _"Um va? J-jag? asså, jo men..."_ Dottern bara garvade och visade henne hur man gör.

Men Neyras vardag ändrades när Valdorianska Kriget bröt ut. _"Familjen Flodbergs flydde, samtidigt som farsan och många bönder blev inkallade. Många som jag var van med att se var plötsligt bort. Vi var plötsligt färre, samtidigt blev vi tvungna fylla i de tomma hålen. Jag hinner knappt hem innan jag ska tillbaka."_ ----- _"Skumma killar börjar stiga fram på gården. De tar vissa korta jobb sedan försvinner. De kallas sig något, Brinke? Brunky? Branky? Brink?-bröder. Skit samma. Jag hoppas bara det här helvetet tar slut snart."_

Inte bara jobbet blev svårare när fadern inkallades, utan hemmet också. En far figur som saknades, speciellt för brorsan. _"Jag såg brorsan snacka med någon av Brinkbröderna. Jag fick en dålig känsla i magen. När de var klara slog jag till brorsan på axeln. Frågade vafan han höll på med och bad honom att hålla sig borta från dom, eventuellt vara försiktig. Han började snacka rabalder och fina ord, men jag har ingen aning om han ens lyssnade."_ ----- _"Morsan gjorde en träfigur av Neral och ställde den hemma på bordet. Hon lägger en kort daglig bön för att farsan ska komma hem. Att hon saknar honom och behöver honom... Hon var är inte den enda"_

Kriget tog slut och Neyras far kom hem, men det var något som annorlunda. _"Jag har aldrig gråtit så tunga tårar när jag såg farsan igen. Han hade med sig något ärr eller två, men lika glad och trevlig som vanligt. Men det var ändå något som saknades. Han började dricka alkohol i smyg och ibland kom hem sent från Gabriela’s. Troligen för att glömma något, men vad? Han förnekade det alltid och skämtade bort det som det var ingenting."_ Kriget var över men familjen Flodberg kom aldrig tillbaka. Istället steg en ny ägare av staden fram, August Vitterbäck. Hans son, Edwin Vitterbäck, sattes som Länsherre. _"Jag tjuvlyssnade på en av de andra bönderna. De sa att Edwin Vitterbäck hade skrivit ut fribrev och köpebrev till utvalda o-adliga? Varför? Jag kan inget om ekonomi, men fortsatte lyssna... Jag hoppas det leder till något positivt. Det låter i varje fall som han försöker och inte bara vältrar i sitt eget guld där hemma. Han verkar ha goda intentioner, men jag ska inte ljuga, jag saknar Flodberg lite..."_

En dag fick Neyra ett brev om värnplikt, att arbeta under sheriffen. Neyra var full av entusiasm. En chans för en framtid och faktiskt sätta egna pengar i fickan. Kanske fly ut ur denna stuga, men hon vill inte lämna familjen efter.


