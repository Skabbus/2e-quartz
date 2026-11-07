---
player: Lukas
type:
  - Player Character
level: 1
class:
  - Thief
stat.str: 8
stat.dex: 18
stat.con: 9
stat.int: 14
stat.wis: 5
stat.chr: 4
stat.pcp: 8
wps:
nwps:
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Forgery|Forgery]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Tumbling|Tumbling]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Local History|Local History]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Reading Lips|Reading Lips]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Rope Use|Rope Use]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Reading-Writing|Reading-Writing]]"
  - "[[Cryptography]]"
languages:
  - Abarin
birthday: 512-12-10
age: "41"
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
Height: 40 inches
Weight 64 lbs
Right-handed
9 Hotness

## Backstory
***
Feg och intelligent. Autistiska drag. Pratar om sig själv i tredje person. Talfel, kan inte rulla sina R. Singel, bor med sin son. Säger till alla att han har en adopterad son, (men berättar aldrig att det i själva verket är en sköldpadda, eftersom i hans värld är det självklart att det är hans son) som han älskar, vid namn Rune. Fick smeknamnet "Lärkan" av några kriminella från (någon kriminell organisation) efter att han blev anställd av dem att smyga in och stjäla bevismaterial samt att han ser sig själv som en begåvad sångare. 

Djupt skuldsatt hos (någon kriminell organisation) efter att Rune fick en sjukdom som orsakade hans skal att ruttna och Bängvarr tog ett enormt lån för att betala för medicin och vård från en  begåvad trollkarl. Rune (sköldpaddan) har bestående handikapp efter sin sjukdom och behandling. Han kan absolut inte under några omständigheter lämna bostaden pga risken att han dör under längre färd. 

Bängvarr är mer eller mindre självlärd i ingenjörskonsten, förfalskning av dokument, låssmederi (lockpicking) , duktigt på att smyga och gömma sig. Han kan även tala 2 språk, och är otroligt duktig på lokalhistoria. Bängvarr's största svaghet (förutom att han är otroligt svag fysiskt) är att han är otroligt feg i strid och extremt ocharmig. Han framstår som elak eftersom han säger det han tänker och gärna dumförklarar personen framför sig. Han kommer ofta undan i olika sammanhang antingen till förmån av sin otroliga förmåga att smyga iväg eller gömma sig, annars uppskattas han för sin "tjänster" han kan bistå med och därav tolereras hans osmakliga framförande. 

Bängvarr blev anställd hos Sheriffen som en förebyggande åtgärd. Bängvarr ställde till med diverse problem för sheriffstyrkan såsom förfalskade dokument, stulet bevismaterial och intrång i officiella utrymmen på uppdrag av ofta uptressande problemmakare och därav kände sig Sheriffen tvungen att anställa Bängvarr istället och "ha honom på sin sida".