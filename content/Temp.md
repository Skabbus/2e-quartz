```dataview 
TABLE monster_frequency, monster_hd_min, monster_hd_max
FROM "00_Rulebook/Monstrous Manual" 
WHERE contains(monster_terrain, "plains") AND contains(monster_plane, "material")
```

