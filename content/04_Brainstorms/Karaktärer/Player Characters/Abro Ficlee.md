---
player: Hallberg
type:
  - Player Character
level: 1
class:
  - Cleric
stat.str: 8
stat.dex: 7
stat.con: 8
stat.int: 9
stat.wis: 16
stat.chr: 7
stat.pcp: 13
wps:
nwps:
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Healing|Healing]]"
  - "[[00_Rulebook/Player's Option- Spells and Magic/Chapter 4- Proficiencies/Wizard Proficiencies/Wizard Proficiencies/Omen Reading|Omen Reading]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Religion|Religion]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Reading-Writing|Reading-Writing]]"
  - "[[00_Rulebook/Player's Handbook/Chapter 5- Proficiencies (Optional)/Nonweapon Proficiencies II/Nonweapon Proficiency Descriptions/Agriculture|Agriculture]]"
languages:
  - Abarin
birthday: 526-12-13
age: "27"
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
Height: 190,5 cm
Weight 73,9 kg
Right-handed
9 Hotness

## Backstory
***
Abro växte upp på en karg bondgård under moderns och mormoderns stränga tystnad. Männen lyste med sin frånvaro, varken hans far eller morfar nämndes någonsin vid matbordet. I avsaknaden av ett manligt föredöme och utan något tempel i den avlägsna byn fann Abro tidigt sin fadersgestalt i guden Altemus. Tron blev inte ett påtvingat regelverk utan en levande, trygg ledsagare i ensamheten: en röst av ordning, rättvisa och beskydd. Abro spenderade mycket tid på att läsa de slitna bönerna han kommit över.

Kontakten med omvärlden fanns främst genom granngården och dottern Nerya, vars liv och vägar korsats med hans under uppväxten, samt ett gäng jämngamla byapojkar. I utkanten av vänkretsen fanns också flickan Abro i hemlighet höll av. De skrattade ihop och delade vardagen, men Abros blyghet och tron på att tiden var oändlig gjorde att han aldrig uttalade sina känslor.

Sedan slog kriget till. Mönstringen drabbade byn nyckfullt: vissa vänner slapp undan på grund av havande hustru, sjuka föräldrar som behövde skördehjälp, eller för att de ansågs för klumpiga. Abro togs ut i ledet. På grund av sitt läshuvud och sin hängivenhet placerades han i bakre ledet som fältmedik. Men fältlasaretten bar på en fasa värre än stormningarna. Att dag efter dag såga av krossade lemmar, försöka stoppa sprutande artärer och hålla skrikande kamrater i handen medan de dog av kallbrand knäckte något djupt inom honom. Hans närmaste barndomsvän förblödde rakt över hans förkläde.

Skräcken och överbelastningen slet sönder Abros sinne. För att överleva utvecklade han en djup dissociativ personlighetsklyvning. De två sidorna av honom är helt åtskilda och delar inte minnen, den ene vet inte vad den andre gjort utan att läsa efteråt. För att fungera i vardagen och som Cleric bär han alltid med sig en sliten anteckningsbok där personligheterna lämnar meddelanden, förmaningar och instruktioner till varandra.

När freden kom återvände han hem, men världen hade inte väntat. Både hans mor och mormor hade dukat under för sjukdom under krigsåren, ingen hade funnits där för att vårda dem, och jorden låg i träda. Abro flyttade in ensam på den förfallna gården, omgiven av ekande tomhet och minnen. Flickan han älskat bar nu en annans ring, hon hade gift sig med en annan. 

Att återvända till döden hemmavid, ovanpå all förintelse han bevittnat vid fronten, drev hans vördnad för Altemus till en radikal ytterlighet. För Abro blev varje andetag heligt, allt liv spelar en oändlig roll, och han känner en närmast krampaktig plikt att rädda allt och alla från förgängelsen. Den inre ångesten har också satt sig i kroppen som ett tvångsbeteende. I fickorna bär han alltid på en näve torkade frön och kärnor, så fort stressen, minnesluckorna eller dödens närhet tränger sig på måste han febrilt trycka ner frön i jorden, ett desperat sätt att framkalla liv ur marken där allting annat dör.