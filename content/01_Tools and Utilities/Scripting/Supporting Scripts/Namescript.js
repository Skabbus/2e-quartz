const nameManHuman = //Manlig Human
	["Patrack", "Emersen", "Tarik", "Rylon", "Ryden", "Korban", "Alecor", "Coren", "Culler", "Raman", "Asten", "Ascar", "Levir", "Eddin", "Olivar", "Tobin", "Liram", "Ruban", "Kiran", "Toman", "Reben", "Cerran", "Serion", "Jarad", "Deston", "Korb", "Seban", "Gurnar", "Morsh", "", "Felir", "Tavion", "Ronard", "Croll", "Gabrin", "Narmen", "Rass", "Dalran", "Garrat", "Kollion", "Jorgan", "Brack", "Arvin", "Decran", "Ando", "Corbus", "Arin", "Entan", "Melvan", "Brodin", "Braddock", "Abramo", "Ristoro", "David", "Emanuel", "Helmut", "Galerius", "Christian", "Luther", "Otto", "Florian", "Maso", "Nicolas", "Caius", "Albert", "Theodore", "Matteo", "Wilhard", "Arwin", "Richard", "Mesan", "Grerver", "Vebem", "Hidor", "Derval", "Creman", "Toldid", "Mebin", "Hegrer", "Ervor", "Redim", "Bevig", "Vesel", "Glef", "Redir", "Nidar", "Girden", "Beidum", "Karvan", "Sibar", "Gron", "Kavek", "Sehmad", "Hiban", "Silvec", "Girger", "Eirum", "Badeon", "Vathud", "Ehnud", "Stram", "Tharven", "Eryndor", "Malric", "Jorvan", "Velmir", "Tarnel", "Kestrel", "Orven", "Darian", "Zerik", "Halric", "Brennor", "Calven", "Sorell", "Varek", "Nerion", "Draven", "Elric", "Torven", "Maelor", "Ravik", "Fenric", "Lorant", "Kaedin", "Zadric", "Orren", "Thamir", "Vandor", "Ebran", "Garethor", "Thamric", "Velgor", "Rendak", "Sarnel", "Korrin", "Edran", "Varnic", "Lorik", "Jareth", "Bramor", "Tavrek", "Zorvan", "Kelric", "Dranor", "Mavrik", "Torlan", "Eryndel", "Gorvan", "Serdan", "Nivar", "Keldan", "Ravion", "Thorinel", "Zevran", "Malven", "Orimar", "Drelan", "Karnor", "Veldric", "Orrik", "Zarion", "Thalric", "Karnel", "Edrik", "Vandrel", "Morlan", "Raveth", "Torvik", "Garrion", "Selric", "Brenak", "Jorik", "Darnel", "Kelvon", "Zarik", "Thamirion", "Lorven", "Varik", "Drelik", "Orran", "Malricus", "Keldor", "Fenrik", "Zevrik", "Arveth", "Branor", "Sorvik", "Nerak", "Velric", "Alven", "Torric", "Jasper", "Marek", "Silas", "Eron", "Valen", "Cedric", "Nilo", "Taren", "Isak", "Lior", "Felix", "Rurik", "Jonas", "Kael", "Simon", "Thoren", "Elias", "Riven", "Mathis", "Oren", "Sander", "Tavian", "Lukas", "Aurel", "Neron", "Henrik", "Casian", "Renar", "Tobric", "Elian", "Marken", "Davric", "Soren", "Laziel", "Henric", "Jovan", "Tarnic", "Eliasor", "Branik", "Nestor", "Kilian", "Rasmus", "Valtor", "Oskarion", "Levon", "Marius", "Torben", "Alaric", "Jorren", "Sebric", "Lioran", "Gideon", "Timon", "Rafael", "Korin", "Davinor", "Eldric","Alrik", "Torian", "Vemund", "Elvar", "Jorlan", "Kestan", "Darnor", "Silmar", "Halven", "Roderik",
	"Tarnor", "Ebranor", "Cedan", "Malrik", "Orvenar", "Fenrikar", "Lorien", "Kaelric", "Zorik", "Thamiror",
	"Vandrik", "Edranor", "Garrik", "Selven", "Brenar", "Jorven", "Darnik", "Kelmar", "Zarikar", "Thamiron",
	"Lorikson", "Varun", "Drelor", "Orrikson", "Malvenar", "Keldrik", "Fenlor", "Zevrik", "Arvenor", "Branrik",
	"Sorlan", "Nerik", "Velrikar", "Alvenor", "Toran", "Jaspin", "Marekson", "Silven", "Eronar", "Valrik",
	"Cedanil", "Nilon", "Tarec", "Iskar", "Liorik", "Felan", "Rurian", "Jonrik", "Kaelor", "Simar",
	"Thorinor", "Elisar", "Rivenar", "Mathor", "Oranil", "Sandor", "Tavrik", "Lukar", "Aurek", "Nerionor",
	"Henricar", "Casrik", "Renan", "Toben", "Elionor", "Markenor", "Davan", "Soran", "Lazrik", "Henrikar",
	"Jovik", "Tarnorik", "Eliasen", "Branek", "Nestorin", "Kilven", "Rasmar", "Valtorik", "Oskaril", "Levian",
	"Marion", "Torvenar", "Alarion", "Jorimar", "Sebanil", "Liorikson", "Gidrik", "Timar", "Rafan", "Korven",
	"Davinrik", "Eldan", "Ardan", "Varnor", "Eirik", "Thalrikar", "Korran", "Drelikson", "Orimarik", "Malrikson",
	"Keldanil", "Fenrikson", "Zevranil", "Arvinar", "Branikar", "Sorven", "Nerakil", "Velrikson", "Alvenik", "Torricar",
	"Jaspel", "Marelin", "Silasor", "Eronil", "Valenor", "Cedrikar", "Nilas", "Tarenil", "Isakson", "Lioren",
	"Felior", "Rurikson", "Jonan", "Kaelin", "Simrik", "Thorenil", "Elianor", "Rivenik", "Mathen", "Orenil",
	"Sandrik", "Tavianor", "Lukaril", "Aurelian", "Neromar", "Henrion", "Casen", "Renarik", "Tobricar", "Elionrik",
	"Markenil", "Davrikar", "Sorenil", "Lazielor", "Henricson", "Jovanil", "Tarnikar", "Eliasorik", "Branikson", "Nestorik",
	"Kilianor", "Rasmusen", "Valtorin", "Oskarionik", "Levonar", "Marionik", "Torbenik", "Alarikon", "Jorrenil", "Sebricar",
	"Lioranil", "Gideonar", "Timonil", "Rafaelor", "Korinil", "Davinorik", "Eldricar", "Arvenik", "Halrikson", "Darnorik",
	"Tavrikson", "Lorimar", "Kestanor", "Orvenil", "Darionik", "Zerikar", "Halvenor", "Brennorik", "Calvenil", "Sorellik",
	"Varekson", "Nerionik", "Dravenil", "Elricson", "Torvenik", "Maelorik", "Ravikson", "Fenricar", "Lorantor", "Kaedinil",
	"Zadricar", "Orrenik", "Thamirik", "Vandorik", "Ebranil", "Garethorik", "Thamricar", "Velgorik", "Rendakar", "Sarnelil",
	"Korrinik", "Edranik", "Varnikar", "Lorikson", "Jarethor", "Bramorik", "Tavrekson", "Zorvanil", "Kelricar", "Dranorik",
	"Mavrikson", "Torlanil", "Eryndelrik", "Gorvanil", "Serdanik", "Nivarik", "Keldanik", "Ravionik", "Thorinelrik", "Zevranor", "Adam", "Anton", "Axel", "Benjamin", "Casper", "David", "Elias", "Emil", "Erik", "Felix",
	"Filip", "Gabriel", "Gustav", "Hugo", "Isak", "Jakob", "Joar", "Joel", "John", "Jonas",
	"Jonathan", "Josef", "Kalle", "Karl", "Kevin", "Kristian", "Leo", "Liam", "Linus", "Lucas",
	"Ludvig", "Malte", "Marcus", "Martin", "Melker", "Milo", "Nils", "Noah", "Oskar", "Patrik",
	"Robin", "Ruben", "Samuel", "Sebastian", "Simon", "Stellan", "Teodor", "Tim", "Tobias", "Tom",
	"Valter", "Viktor", "Vincent", "William", "Albin", "Alfred", "Arvid", "August", "Bastian", "Bill",
	"Charlie", "Colin", "Edvin", "Elton", "Elvin", "Emanuel", "Frank", "Frej", "Harry", "Henry",
	"Ian", "Ivar", "Jack", "Jens", "Jesper", "Joel", "Julian", "Kim", "Knut", "Lars",
	"Love", "Melvin", "Mikael", "Neo", "Niklas", "Olle", "Otto", "Rasmus", "Rickard", "Robert",
	"Sigge", "Sixten", "Stefan", "Sven", "Theo", "Ture", "Ulf", "Uno", "Victor", "Wilmer",
	"Yngve", "Arian", "Aron", "Benny", "Bernt", "Bo", "Christer", "Dan", "Dennis", "Douglas",
	"Eje", "Einar", "Eje", "Evald", "Folke", "Georg", "Göran", "Håkan", "Ingmar", "Jan",
	"Johan", "Johnny", "Kenneth", "Kent", "Leif", "Lennart", "Magnus", "Mats", "Morgan", "Olof",
	"Per", "Peter", "Ragnar", "Reidar", "Roy", "Rune", "Stig", "Sune", "Svenne", "Tage",
	"Tomas", "Tony", "Torbjörn", "Ulf", "Urban", "Verner", "Åke", "Örjan", "André", "Artur",
	"Bruno", "Calle", "Dante", "Eddie", "Elis", "Enzo", "Erwin", "Fabian", "Gideon", "Herman",
	"Ilian", "Isidor", "Jasper", "Jaxon", "Jeremias", "Jimmie", "Joachim", "Jonte", "Julien", "Kian",
	"Leon", "Loke", "Louie", "Manfred", "Marius", "Matheo", "Milian", "Neo", "Noel", "Oliver",
	"Omar", "Ralf", "Rayan", "Rico", "Sami", "Sandro", "Teddy", "Thyge", "Tobbe", "Tristan", "Aldric", "Almar", "Alven", "Anselm", "Arden", "Aric", "Asher", "Bain", "Balfor", "Bardon", "Berin", "Boden", "Bran", "Brelan", "Brok", "Caden", "Caius", "Calder", "Cale", "Callum", "Cerin", "Ciar", "Cobb", "Corbin", "Daelan", "Dain", "Daren", "Daveth", "Declan", "Devon", "Doric", "Draven", "Drustan", "Eamon", "Einar", "Elden", "Elian", "Emris", "Eran", "Errol", "Faelar", "Faelen", "Falk", "Farrin", "Finian", "Florian", "Garen", "Garth", "Gawain", "Gideon", "Grimm", "Hadrian", "Hale", "Harlan", "Havard", "Hendrik", "Heston", "Hiram", "Holt", "Ilan", "Ingmar", "Irving", "Isen", "Ivar", "Jael", "Jaren", "Jarvis", "Jarik", "Jona", "Joric", "Kael", "Kalen", "Kellan", "Kian", "Kiran", "Lazar", "Levin", "Liran", "Loric", "Lucan", "Lyndon", "Lysander", "Mabon", "Mace", "Mael", "Malachi", "Marek", "Marlon", "Merrick", "Myles", "Nevan", "Nevin", "Niall", "Niles", "Nolan", "Odran", "Oran", "Orrin", "Orson", "Owen", "Parlan", "Phelan", "Piers", "Quill", "Quinn", "Ragnar", "Raine", "Ramon", "Ranon", "Renard", "Rico", "Rian", "Roric", "Rylan", "Sabin", "Samson", "Sander", "Sarin", "Selden", "Seran", "Silas", "Soren", "Stian", "Stellan", "Sylvan", "Tabor", "Tadhg", "Talon", "Taran", "Tavin", "Teague", "Tiernan", "Tobiah", "Torvin", "Tristan", "Tycho", "Ulf", "Ulric", "Urban", "Uther", "Valen", "Valerius", "Vance", "Varden", "Varian", "Viggo", "Warrick", "Weston", "Willem", "Wymar", "Xavier", "Yael", "Yulian", "Zane", "Zelos", "Zephyr", "Zev", "Zian", "Zoran", "Abner", "Alaric", "Anakin", "Bartholomew", "Benedict", "Brennus", "Brogan", "Cadell", "Caimen", "Clement", "Conall", "Conrad", "Cosmo", "Dacre", "Damian", "Darion", "Donal", "Ephraim", "Everett", "Ferdinand", "Galahad", "Godwin", "Hadrianus", "Ignatius", "Jocelyn", "Leodegrance", "Lysander", "Marius", "Maximilian", "Merlin", "Montague", "Narses", "Octavius", "Osric", "Peregrine", "Phineas", "Raphael", "Rufus", "Septimus", "Silvester", "Thaddeus", "Theon", "Tibalt", "Ulysses", "Valentin", "Virgil", "Wolfram", "Zadok",
	"Tyson", "Valentin", "Viggo", "Vilgot", "Wilhelm", "Zack", "Zander", "Zion", "Algot", "Arnold","Aethan", "Borian", "Calthus", "Dravon", "Elyon", "Fendrel", "Garmon", "Haldrin", "Ithros", "Jaelon", "Kaltar", "Lormen", "Myrin", "Nylos", "Ordan", "Pyrion", "Quellor", "Rendil", "Syrac", "Tarvyn", "Urion", "Veldon", "Xarion", "Yorven", "Zydos", "Amlen", "Balfor", "Ceris", "Dracen", "Elzar", "Feron", "Gavinor", "Helior", "Ivorian", "Jendar", "Kaelus", "Lycan", "Mardon", "Nerian", "Olmar", "Phoros", "Qiran", "Rylos", "Sarvin", "Tyren", "Uldrin", "Varkon", "Xanthar", "Ylvan", "Zathus", "Aerion", "Bardon", "Clytus", "Drakon", "Eldrin", "Faelen", "Gorak", "Harkan", "Irmos", "Joricus", "Kyran", "Lethan", "Mendir", "Nymor", "Othos", "Perrin", "Quillon", "Ragnarok", "Sorian", "Tharon", "Ulysses", "Viggo", "Xylos", "Yorik", "Zelos", "Alistar", "Baelen", "Caspian", "Dorian", "Eirikur", "Faelon", "Glendel", "Hadrian", "Ingvar", "Jaral", "Korian", "Loric", "Mykon", "Novan", "Oryon", "Pharion", "Quentin", "Rimmon", "Seldon", "Thoric", "Uzziel", "Vargen", "Xerxes", "Yandel", "Zoran", "Alderon", "Bramen", "Cadrin", "Darton", "Elsin", "Falkon", "Gerrard", "Hektor", "Ignis", "Jovanel", "Kellan", "Lucius", "Morwen", "Nixus", "Osric", "Parlan", "Quadar", "Ristan", "Septimus", "Talvir", "Uthar", "Valerik", "Xenos", "Yorun", "Zaelen", "Almar", "Brennus", "Calix", "Darion", "Emrys", "Faustian", "Grendel", "Harlon", "Icarus", "Jorah", "Keldric", "Lannus", "Mordian", "Nyxos", "Oberon", "Peregrine", "Quarion", "Rylander", "Silasor", "Targon", "Ulfric", "Vortan", "Xavian", "Yavin", "Zathrian", "Arkon", "Borrin", "Caspianor", "Drevon", "Eldryn", "Faelonus", "Gorion", "Haelen", "Iridian", "Joriksen", "Kaelenor", "Liras", "Myron", "Nazar", "Orion", "Pellin", "Quarn", "Ravalon", "Seryn", "Theronar", "Ulrian", "Varus", "Xandor", "Yorlund", "Zethus", "Aricus", "Bayard", "Cyran", "Dalen", "Eloran", "Faramir", "Garrus", "Hiram", "Ithael", "Javok", "Kaldor", "Lynton", "Mornar", "Niranus", "Olaran", "Pryon", "Quovos", "Rithian", "Sarkon", "Tyrius", "Urmon", "Valan", "Xylo", "Yvran", "Zorion", "Adolf", "Adrian", "Agnar", "Albin", "Alf", "Alfred", "Algot", "Allan", "Anders", "André", "Anker", "Anton", "Ariel", "Arne", "Arvid", "Assar", "Axel", "Bastian", "Ben", "Benjamin", "Benny", "Bernt", "Bertil", "Birger", "Bjarne", "Björn", "Bo", "Börje", "Carl", "Casper", "Christer", "Christian", "Claes", "Conny", "Curt", "Dan", "Daniel", "Dante", "David", "Dennis", "Douglas", "Eddie", "Edgar", "Edvin", "Egon", "Eilert", "Einar", "Elis", "Elliot", "Elmer", "Elton", "Elvin", "Emanuel", "Emil", "Emrik", "Erik", "Erland", "Erling", "Ernst", "Ervin", "Esbjörn", "Esset", "Evald", "Evert", "Fabian", "Filip", "Finn", "Folke", "Frank", "Fredrik", "Frej", "Gabriel", "Georg", "Gunnar", "Gustav", "Gösta", "Göran", "Hampus", "Hans", "Harald", "Harry", "Hasse", "Helge", "Henrik", "Herbert", "Herman", "Hjalmar", "Holger", "Hugo", "Håkan", "Ibrahim", "Ignacy", "Isac", "Isidor", "Ivar", "Jack", "Jakob", "Jan", "Jarl", "Jens", "Jerry", "Jesper", "Joacim", "Joar", "Joel", "Johan", "John", "Johnny", "Jonas", "Jonathan", "Josef", "Jukka", "Julian", "Jörgen", "Kai", "Kaj", "Kalle", "Karel", "Karl", "Kenneth", "Kent", "Kevin", "Kim", "Kjell", "Knut", "Konrad", "Kurt", "Lage", "Lars", "Lasse", "Leif", "Leo", "Leonard", "Leonel", "Liam", "Linus", "Loke", "Love", "Lucas", "Ludvig", "Lukas", "Magnus", "Malte", "Manfred", "Marcus", "Marian", "Markus", "Martin", "Mats", "Mattias", "Melker", "Melvin", "Michael", "Mikael", "Milo", "Morgan", "Morris", "Nathanael", "Neo", "Niklas", "Nils", "Noah", "Noel", "Odin", "Ola", "Olaus", "Olle", "Olof", "Omar", "Osvald", "Otto", "Ove", "Patrik", "Pelle", "Per", "Peter", "Pontus", "Rafael", "Ragnar", "Ralf", "Rami", "Rasmus", "Reidar", "Rickard", "Rikard", "Robert", "Robin", "Roger", "Roland", "Ronny", "Roy", "Ruben", "Rune", "Samuel", "Sebastian", "Seth", "Sigfrid", "Sigvard", "Sigge", "Sixten", "Stefan", "Stig", "Sture", "Sune", "Sven", "Sölve", "Tage", "Teo", "Teodor", "Theo", "Thomas", "Tim", "Tobias", "Tom", "Tomas", "Tony", "Torbjörn", "Tore", "Torsten", "Truls", "Ture", "Ulf", "Uno", "Urban", "Valdemar", "Valter", "Victor", "Viggo", "Viktor", "Vilgot", "Vilhelm", "Ville", "Vincent", "Walter", "Wilhelm", "William", "Wilmer", "Yngve", "Åke", "Örjan", "Aerion", "Alar", "Aldenor", "Alistair", "Alrik", "Andar", "Arathorn", "Argo", "Armin", "Artem", "Arvidian", "Athos", "Aurion", "Balin", "Balthazar", "Bayard", "Belian", "Beric", "Bram", "Branis", "Brannok", "Brom", "Brycen", "Cadoc", "Caelum", "Caspian", "Cassian", "Cathan", "Cedric", "Cian", "Cillian", "Corvin", "Cygnus", "Cyrus", "Dagan", "Dalen", "Darian", "Darren", "Davor", "Denholm", "Dirk", "Donovan", "Doran", "Drex", "Duncan", "Eliasor", "Eldon", "Elian", "Elric", "Elvar", "Endrik", "Eomer", "Eran", "Ergon", "Erikson", "Eryk", "Esmond", "Evander", "Faelar", "Farren", "Favian", "Feron", "Flinn", "Florin", "Frey", "Gaelan", "Gannon", "Garion", "Garrick", "Garth", "Geraint", "Goran", "Grendel", "Grif", "Haldon", "Haldir", "Haldor", "Halvar", "Harken", "Harlow", "Hektor", "Hjalmar", "Holden", "Huron", "Hyllus", "Icarus", "Idris", "Ignis", "Ilias", "Ivor", "Jaelen", "Jago", "Jared", "Jarvin", "Jaxon", "Joric", "Kaelan", "Kaius", "Kaldor", "Kaelen", "Kian", "Kjartan", "Korvin", "Kyrin", "Larsel", "Leander", "Leoric", "Lethan", "Liran", "Lorcan", "Lucian", "Lycus", "Lysander", "Mael", "Magnar", "Malcom", "Malik", "Marik", "Marken", "Marius", "Mavrick", "Merrick", "Miran", "Mithras", "Myron", "Nael", "Navar", "Nerak", "Nestor", "Nevian", "Nicodemus", "Niran", "Niranus", "Oberon", "Octavian", "Oden", "Ordan", "Orion", "Osian", "Osvald", "Perrin", "Phileas", "Philemon", "Phoenix", "Phelan", "Quillon", "Quincy", "Quintus", "Raimund", "Raimar", "Ramin", "Ramir", "Randal", "Rathian", "Ravon", "Regulus", "Remus", "Rendel", "Rian", "Rimmon", "Rogan", "Roric", "Roshan", "Rune", "Rurik", "Sabin", "Sagan", "Samos", "Saros", "Severus", "Shay", "Silvan", "Sirius", "Solon", "Stigandr", "Sylvanus", "Talon", "Tarian", "Tarmon", "Taron", "Tassilo", "Teagan", "Theron", "Thilo", "Torian", "Torvin", "Tristan", "Tyrius", "Ulrik", "Urian", "Vadim", "Valer", "Valerik", "Vance", "Varden", "Varin", "Varrick", "Veren", "Vesper", "Victorin", "Viggo", "Virgil", "Volker", "Waldemar", "Xavier", "Yorun", "Zadok", "Zahir", "Zaren", "Zevon", "Zoran", "Arvond", "Belric", "Caronis", "Darmik", "Elvran",  
	"Falrik", "Gorimar", "Halvenn", "Ismaron", "Jorvikar",  
	"Keldros", "Lorimarik", "Mavron", "Narevus", "Orvind",  
	"Perak", "Quarnor", "Reldric", "Savorin", "Taldrek",  
	"Ulmarin", "Vorgath", "Werrin", "Xandril", "Yarvik",  
	"Zeramon", "Aldrikar", "Balven", "Casrikos", "Delvon",  
	"Eramor", "Faldorik", "Gethran", "Harnic", "Ilvaros",  
	"Jevran", "Kornelis", "Larek", "Malvenor", "Norikar",  
	"Omrik", "Pelvan", "Rovric", "Seldanor", "Tarvikar",  
	"Ulthor", "Vandek", "Waran", "Xerald", "Yovanar",  
	"Zarvek", "Arenor", "Branikos", "Celdric", "Darvok",  
	"Elrimar", "Fenlorin", "Gavrek", "Harvion", "Ildros",  
	"Jorald", "Kedranor", "Lormek", "Meridor", "Navrik",  
	"Olvaren", "Pendor", "Rethos", "Sarvikon", "Telvar",  
	"Urdan", "Vakar", "Wilven", "Xorin", "Yenek",  
	"Zorivar", "Aldemar", "Bastin", "Cirov", "Dranikar",  
	"Elovan", "Farsin", "Glaren", "Hedrak", "Irden",  
	"Jarvinor", "Keldos", "Lorianor", "Mavrekos", "Narvion",  
	"Orrendar", "Paskor", "Rimdar", "Sornic", "Tervan",  
	"Ulvis", "Varionor", "Welden", "Xevor", "Yarndal",  
	"Zalric", "Ambor", "Brekon", "Cavel", "Dornak",  
	"Elvaron", "Farrik", "Ginris", "Haldros", "Irmak",  
	"Jonrel", "Kessen", "Lurikos", "Marveth", "Nerakos",  
	"Ostren", "Penric", "Raddor", "Selvik", "Torvalen",  
	"Undor", "Valdrik", "Wivran", "Xantar", "Yerek",  
	"Zevonar", "Anvorn", "Borell", "Corvikar", "Derrin",  
	"Eridon", "Falkrin", "Gorinor", "Hesmar", "Idron",  
	"Jarikos", "Kaldrin", "Lethron", "Mornik", "Nevric",  
	"Ordonis", "Perrakor", "Reldan", "Serikson", "Tovran",  
	"Umrik", "Varnes", "Weldric", "Xandrilor", "Yrkos",  
	"Zarnell", "Ardenik", "Bolrak", "Cymar", "Dralvon",  
	"Esvin", "Feldros", "Gervan", "Havinor", "Ilveth",  
	"Jarnes", "Korvar", "Lomaros", "Milkor", "Norvak",  
	"Othren", "Pelorin", "Rathos", "Sennar", "Tormek",  
	"Ulvo", "Vandros", "Werrak", "Xalven", "Yranor",  
	"Zorath", "Alvros", "Bennor", "Cathel", "Darikos",  
	"Ervorn", "Felsin", "Granik", "Haldar", "Iseron",  
	"Javik", "Keldorn", "Lorvos", "Marnet", "Navorn",  
	"Ovir", "Perrinor", "Reldros", "Sornel", "Tavricon",  
	"Urdek", "Vornel", "Wistor", "Xerol", "Yevron",  
	"Zaldros", // --- 200 Nya Manliga Människonamn ---
	"Abren", "Adral", "Alvorn", "Ancar", "Ardel", "Arlen", "Arnost", "Astor", "Bairon", "Balderik",
	"Balkor", "Bardan", "Bardo", "Barek", "Barnaby", "Barten", "Bavron", "Belden", "Beltran", "Bergan",
	"Bernic", "Blain", "Borgan", "Bramik", "Brandor", "Bravin", "Brekan", "Brendel", "Breslin", "Brogan",
	"Cadran", "Calderon", "Calos", "Cambar", "Camric", "Carden", "Carric", "Castor", "Cavan", "Cedan",
	"Celvan", "Cenric", "Corban", "Cordin", "Cormac", "Corneel", "Corvin", "Crispin", "Cyran", "Dagrin",
	"Dalen", "Dalton", "Danic", "Danteg", "Darel", "Dargan", "Daron", "Delman", "Doran", "Dorsen",
	"Doval", "Dranic", "Dredan", "Dresden", "Drevnik", "Ebran", "Ector", "Edlan", "Edred", "Elden",
	"Eliphas", "Elmar", "Elric", "Elvyn", "Emrik", "Eoghan", "Ephran", "Erad", "Erden", "Erikon",
	"Erlend", "Ernan", "Ervik", "Esbern", "Eskil", "Eustace", "Evrad", "Faelen", "Falken", "Farold",
	"Farric", "Faxon", "Feldan", "Fenris", "Fereday", "Fergal", "Ferrand", "Fildor", "Florent", "Gair",
	"Galen", "Galt", "Garda", "Gareth", "Garin", "Garlen", "Garren", "Gaston", "Gavin", "Gervais",
	"Giffard", "Gilbert", "Gildas", "Giron", "Godfrey", "Goran", "Gord", "Gostan", "Goyar", "Gregan",
	"Grif", "Gwydion", "Hakon", "Haldan", "Hallen", "Hamnet", "Harlan", "Harmen", "Haron", "Hartman",
	"Haste", "Havelok", "Hawke", "Hendry", "Heward", "Hildar", "Hollis", "Horace", "Idan", "Ingar",
	"Irven", "Iscan", "Jarin", "Jarman", "Jasper", "Jebric", "Jirand", "Joram", "Jordan", "Joran",
	"Joss", "Jubal", "Kadal", "Kaelen", "Kandar", "Karlan", "Karson", "Kedric", "Kelvan", "Kenric",
	"Keridan", "Kester", "Kevon", "Korban", "Kormak", "Koron", "Kristof", "Lamar", "Lander", "Largon",
	"Lawson", "Lazarus", "Lelan", "Lenne", "Leod", "Leopold", "Lidon", "Loras", "Loric", "Lothar",
	"Lucan", "Madden", "Maitland", "Major", "Maksim", "Malkin", "Mallory", "Malric", "Marcellus", "Marden", "Arvandar", "Belrikon", "Caldros", "Dervak", "Elvinar", "Farnel", "Gorvikar", "Haldrik", "Isvaron", "Jorvak", "Keldranor", "Lorimaros", "Mavrikar", "Neravon", "Orvandar", "Peldric", "Quarven", "Ravonar", "Seldrakor", "Tarnivar", "Ulvarin", "Vandrikos", "Worlan", "Xelvar", "Yorimar", "Zarveth", "Aldrosen", "Branikor", "Celdran", "Dornivar", "Eldrak", "Fenvaron", "Gorveth", "Harvandar", "Ildrakor", "Jorvanel", "Karnivar", "Lerikon", "Meldrak", "Norvandar", "Orravel", "Pernak", "Reldrikos", "Sarnivar", "Tervanor", "Ulrikos", "Varnek", "Weldran", "Xarvion", "Yelrik", "Zorvandar",
	"Ardavos", "Belvaron", "Cernik", "Dralven", "Elvarik", "Fendros", "Garnivar", "Helvion", "Israkor", "Jorveth", "Keldrakos", "Lorvinar", "Marnivar", "Neldros", "Orveth", "Pelrik", "Quarnel", "Ravikor", "Selvandar", "Tornivar", "Ulvenor", "Varkelos", "Wernik", "Xelmar", "Yorveth", "Zarnikor",
	
	"Arvok", "Brenivar", "Caldrek", "Dervanor", "Elveth", "Farnikor", "Gorvanel", "Halvenor", "Isdrek", "Jorlanor", "Keldrakor", "Lorveth", "Marnelos", "Nervak", "Orvinar", "Peldros", "Quarveth", "Reldanor", "Sarnikos", "Tervak", "Ulvaros", "Varlinor", "Worvik", "Xandrek", "Yelvar", "Zorlin",
	
	"Ardrek", "Belveth", "Cernivar", "Dralikor", "Elvandar", "Fendrak", "Garnivaros", "Helrakor", "Isvanel", "Jorvinar", "Keldrosen", "Lorvandar", "Marnikor", "Neldrak", "Orvanel", "Pelvandar", "Quarlin", "Ravindor", "Selveth", "Tornivaros", "Ulvarik", "Varkonar", "Wernivar", "Xelvandar", "Yorlin", "Zarnivar",
	
	"Arvanel", "Brenakor", "Caldranor", "Derveth", "Elvinaros", "Farnivar", "Gorlinor", "Haldrakor", "Isveth", "Jorvandar", "Keldranik", "Lorvinaros", "Marnivaros", "Nervandar", "Orvethos", "Peldran", "Quarvandar", "Reldrakor", "Sarnivaros", "Tervandar", "Ulvarinor", "Varlinos", "Worvandar", "Xandrikos", "Yelvandar", "Zorveth",
	
	"Ardavos", "Belranor", "Cernivaros", "Dralveth", "Elvranor", "Fendran", "Garnivarik", "Helvandar", "Isranor", "Jorvethos", "Keldranos", "Lorvethos", "Marnivarik", "Neldranor", "Orvandaros", "Peldrakor", "Quarlinor", "Ravindrak", "Selvranor", "Tornivarik", "Ulvarosik", "Varkandor", "Wernivaros", "Xelranor", "Yorvandaros", "Zarnivaros",
	
	"Arvethos", "Brenvaros", "Caldranik", "Dervandor", "Elvranik", "Farnivaros", "Gorvethos", "Halranor", "Isvandar", "Jorlinor", "Keldrakos", "Lorvandaros", "Marnivaros", "Nervethos", "Orvranor", "Peldranik", "Quarvethos", "Reldranik", "Sarnivarik", "Tervranor", "Ulvarikos", "Varlinik", "Worvethos", "Xandranor", "Yelranik", "Zorvandar",
	
	"Ardren", "Belvandar", "Cernivarik", "Dralranor", "Elvranos", "Fendrakos", "Garnivaros", "Helvranor", "Isvranik", "Jorvranos", "Keldranorik", "Lorvranik", "Marnivarosik", "Neldranik", "Orvranik", "Peldranos", "Quarvranor", "Ravranik", "Selvranik", "Tornivarosik", "Ulvaran", "Varkranor", "Wernivarik", "Xelvranor", "Yorvranik", "Zarnivarik"];


const nameWomanHuman = //Kvinnlig Human
	["Elvira","Alira", "Serina", "Tindra", "Elira", "Mirelle", "Ylva", "Sirelia", "Liora", "Freja", "Nerina",
	"Alva", "Iselin", "Virelle", "Klara", "Elyra", "Ronja", "Selira", "Tavina", "Lunara", "Mira",
	"Jorina", "Elin", "Siv", "Tiriel", "Norelia", "Vilda", "Kassia", "Eira", "Sanna", "Thyra",
	"Melina", "Avelin", "Nerissa", "Saga", "Linnea", "Ysolde", "Talia", "Solea", "Ingrid", "Arina",
	"Lovisa", "Celira", "Ylinda", "Evelina", "Sirelle", "Nerelle", "Lunelle", "Tirsa", "Alvina", "Selma",
	"Isolde", "Karina", "Viona", "Lina", "Mireia", "Tavira", "Elvira", "Sigrid", "Alida", "Ysola",
	"Tilda", "Elina", "Sivelle", "Ronelle", "Lunaria", "Tirina", "Arisel", "Märta", "Celina", "Ylira",
	"Tavella", "Sireen", "Norelle", "Vilja", "Evelis", "Ravina", "Thalia", "Junia", "Elaria", "Soline",
	"Miralyn", "Kassira", "Neraya", "Luneth", "Tavira", "Ylindra", "Selindra", "Aurelia", "Iselith", "Virelia",
	"Thirza", "Elindra", "Sorelle", "Neritha", "Klarin", "Tiranya", "Alindra", "Sivara", "Lorina", "Meliora",
	"Vanya", "Elaris", "Sorelia", "Tavitha", "Lunira", "Ysolith", "Serenya", "Mirena", "Iselina", "Kassindra",
	"Thiriel", "Selitha", "Elarith", "Nerelin", "Tirindra", "Alariel", "Sivitha", "Loriel", "Melira", "Vireth",
	"Junelle", "Elarith", "Sorelin", "Tavindra", "Lunitha", "Yloria", "Serelith", "Miritha", "Isoria", "Kassira",
	"Thirindra", "Seloria", "Elarina", "Neritha", "Tiralia", "Aloria", "Sivina", "Lorindra", "Melitha", "Virelia",
	"Junira", "Eloria", "Sorelia", "Tavira", "Lunaria", "Ysolina", "Serina", "Miralia", "Iselira", "Kassina",
	"Thirina", "Selina", "Elaria", "Nerina", "Tirina", "Alina", "Sivina", "Lorina", "Melina", "Virella",
	"Junia", "Elina", "Sorella", "Tavina", "Lunella", "Ylina", "Serella", "Mirina", "Isella", "Kassella","Adelina", "Alessia", "Anira", "Arlina", "Aster", "Avira", "Bellis", "Briana", "Caelia", "Camira",
	"Cerina", "Cilla", "Dahlia", "Danira", "Delina", "Disa", "Edda", "Edira", "Elva", "Emira",
	"Enna", "Erina", "Esma", "Estrid", "Faria", "Felina", "Fenya", "Fiora", "Floria", "Frida",
	"Galia", "Garnet", "Gilda", "Giselle", "Greta", "Gwenna", "Helia", "Helmi", "Hilja", "Idella",
	"Ilyra", "Indira", "Irmelin", "Isma", "Ivyra", "Jasira", "Jelina", "Jolanda", "Jorunn", "Junessa",
	"Kaisa", "Kalina", "Kamira", "Karinna", "Katira", "Keira", "Kenna", "Kesia", "Klaraia", "Korin",
	"Lana", "Lavinia", "Leira", "Lelina", "Liana", "Lilja", "Linara", "Lioraia", "Lirien", "Livina",
	"Lunessa", "Lyra", "Lysandra", "Maelis", "Maia", "Malina", "Mariel", "Marina", "Melis", "Merina",
	"Meya", "Mila", "Milena", "Minna", "Mirabel", "Mireiaa", "Mirellia", "Miska", "Myra", "Nadina",
	"Nalia", "Nanna", "Neressa", "Nessa", "Nila", "Nima", "Nira", "Nolia", "Norina", "Nyra",
	"Odelia", "Olira", "Onira", "Ophelia", "Orla", "Ovidia", "Palina", "Perla", "Petra", "Quinna",
	"Raelina", "Raisa", "Rania", "Ravella", "Reina", "Rilena", "Riona", "Roselle", "Rosia", "Runa",
	"Sabina", "Sadia", "Saphira", "Selene", "Senna", "Seren", "Shaela", "Sibella", "Silja", "Sina",
	"Siria", "Solina", "Soraya", "Stella", "Sunniva", "Svea", "Sylva", "Syra", "Tahlia", "Talina",
	"Tamina", "Tanya", "Tavirae", "Tayla", "Tessia", "Thaliah", "Thessa", "Tildaia", "Tirra", "Tovaia",
	"Tyraia", "Ulia", "Ulva", "Undine", "Ursa", "Valeria", "Vanira", "Vanyae", "Veraia", "Verina",
	"Vespera", "Veya", "Viara", "Vildaia", "Vilhelmina", "Vina", "Vionaia", "Virena", "Vivara", "Yara",
	"Ylissa", "Ylvaia", "Yria", "Ysella", "Yuna", "Zahra", "Zaira", "Zelina", "Zerina", "Zilia",
	"Zina", "Zira", "Zorina", "Zyra", "Aelina", "Aeris", "Alessa", "Amara", "Annelia", "Arda",
	"Arelia", "Arlissa", "Aurea", "Avina", "Azira", "Belina", "Brisa", "Caia", "Calina", "Carmia",
	"Celestia", "Ceres", "Cira", "Claraia", "Dahlina", "Delara", "Dorelia", "Elaren", "Elisia", "Elvaia",
	"Emelina", "Enira", "Erisa", "Esmeria", "Estara", "Evelith", "Fayra", "Felisia", "Fioraia", "Florin",
	"Galina", "Gavina", "Glenna", "Gracina", "Gweneth", "Helira", "Hesper", "Idara", "Ilira", "Irisa","Aethel", "Alenia", "Amaris", "Astraea", "Avriel", "Belara", "Brynnis", "Caelen", "Carmine", "Daelia", "Darena", "Elora", "Emeria", "Elysia", "Farina", "Fenella", "Galeena", "Gisella", "Halyra", "Hestia", "Ilara", "Indria", "Irenna", "Jaelyn", "Jasmira", "Jessa", "Kaelia", "Kaelith", "Kaelan", "Kaelen", "Leana", "Lenora", "Lianna", "Lyssa", "Maeva", "Mahlia", "Malora", "Morwen", "Niamh", "Niraea", "Nyxara", "Ondine", "Oriana", "Perenna", "Perrin", "Quiana", "Raelen", "Rhianna", "Riona", "Rowena", "Sabrina", "Samira", "Sarya", "Seraphina", "Shaena", "Sidra", "Sienna", "Solara", "Sorina", "Svala", "Taelia", "Talaia", "Tanis", "Tarian", "Telisa", "Thyral", "Valenora", "Valina", "Vespera", "Vivian", "Xena", "Ysaline", "Zarina", "Zylpha", "Aeliana", "Alastrina", "Amoret", "Annelise", "Arlana", "Auriel", "Brenna", "Briallen", "Caelin", "Cerridwen", "Dahlia", "Delpha", "Elowen", "Enya", "Faerlina", "Fianna", "Galadriel", "Gwyneth", "Heloise", "Illyana", "Irina", "Isabeth", "Jadira", "Kaellyn", "Lariana", "Leandra", "Lilen", "Lyna", "Maeve", "Malia", "Mirela", "Myraea", "Nessaia", "Noralia", "Opaline", "Orinda", "Philomena", "Priya", "Quella", "Ramira", "Rhenna", "Riona", "Rosalyn", "Sabelle", "Salara", "Sarai", "Selena", "Seraphine", "Shaelynn", "Siobhan", "Sorsha", "Sylvana", "Taline", "Tayla", "Terina", "Thora", "Tyra", "Valeria", "Vianna", "Vilina", "Xyla", "Yvaine", "Zelia", "Zenobia", "Aerida", "Alcyone", "Arabela", "Auria", "Bellona", "Celena", "Cyra", "Daelina", "Dulcinea", "Elara", "Eriana", "Faelen", "Gemma", "Hafsa", "Ithaca", "Jaelith", "Kaelia", "Larethia", "Linarae", "Luminara", "Maelle", "Melian", "Minerva", "Naida", "Nydia", "Ophira", "Rhiannon", "Sabine", "Saffron", "Saida", "Seraphia", "Shira", "Sorena", "Taevyn", "Tessara", "Thalassa", "Velina", "Venna", "Veridia", "Vivianna", "Yseult", "Zahira", "Zelina", "Zora", "Aira", "Anya", "Brynn", "Cynthia", "Dara", "Devera", "Eirene", "Fey", "Gala", "Halina", "Isa", "Jada", "Kyla", "Lanaia", "Lyra", "Mara", "Nala", "Oona", "Rhea", "Sianna", "Tegan", "Vesper", "Willa", "Yarae", "Zaya", "Arina", "Betha", "Carina", "Darya", "Elara", "Freya", "Gilda", "Hilda", "Juna", "Kira", "Lira", "Mina", "Nola", "Rina", "Soma", "Tara", "Una", "Veda", "Zara", "Evelya","Anya", "Adira", "Adria", "Alanna", "Aleta", "Amira", "Annelie", "Ara", "Ariel", "Asa", "Astrid", "Audra", "Aurora", "Avonlea", "Azalea", "Beata", "Bellatrix", "Bianca", "Blenda", "Bodil", "Britt", "Caila", "Calixta", "Calla", "Carmen", "Celeste", "Celia", "Clara", "Cordelia", "Corina", "Cybele", "Dafne", "Dana", "Daphne", "Delia", "Diana", "Dora", "Drusilla", "Edith", "Eira", "Elara", "Eleanor", "Eliane", "Elodie", "Emera", "Emilia", "Esme", "Estelle", "Ethel", "Eugenia", "Fable", "Faye", "Felicia", "Fern", "Fidelia", "Fiona", "Flavia", "Gala", "Galena", "Gayle", "Gella", "Genevieve", "Gloria", "Greta", "Gudrun", "Hanna", "Hedda", "Hella", "Helmi", "Hesper", "Hildur", "Ida", "Iliana", "Ilsa", "Imogen", "Ina", "Ines", "Iris", "Irma", "Isa", "Isabelle", "Jae", "Jana", "Jenna", "Jessamine", "Jonna", "Juno", "Kaisa", "Kalla", "Kassia", "Katja", "Keri", "Kielo", "Kimber", "Kira", "Leia", "Lena", "Leona", "Lilian", "Lily", "Linnéa", "Lisa", "Liv", "Livia", "Lo", "Lotta", "Luce", "Luna", "Magda", "Magdalena", "Maia", "Malin", "Manda", "Marta", "Matilda", "Meja", "Melodi", "Mila", "Moa", "Mona", "Nadja", "Nala", "Naomi", "Nara", "Nea", "Nella", "Nia", "Nima", "Nina", "Nora", "Nova", "Ofelia", "Olga", "Olympia", "Oona", "Opal", "Petra", "Pippa", "Polina", "Primrose", "Puja", "Rafaela", "Raisa", "Rana", "Raya", "Rea", "Rhea", "Rita", "Ritva", "Rosa", "Rosalind", "Rowan", "Ruth", "Sabina", "Saffron", "Salma", "Sandra", "Sara", "Sari", "Selena", "Sepia", "Signe", "Siri", "Sol", "Sonja", "Stella", "Sunna", "Susanna", "Svea", "Sylvie", "Tala", "Tami", "Tanja", "Tessa", "Thea", "Tora", "Tuva", "Tyra", "Ulla", "Ulrika", "Una", "Urania", "Ursula", "Valea", "Vega", "Vera", "Veronica", "Viola", "Viveca", "Yrsa", "Zara", "Zenobia", "Zia", "Zelda", "Zoe", "Adalia", "Aelin", "Aerith", "Alenka", "Amelie", "Ania", "Arabelle", "Ariadne", "Aura", "Avelina", "Azura", "Belinda", "Brenna", "Brielle", "Britta", "Caelea", "Calista", "Candice", "Carys", "Celia", "Clarissa", "Cleo", "Corisande", "Daliana", "Darya", "Delphine", "Desiree", "Devina", "Dione", "Echo", "Edna", "Eilidh", "Eliza", "Ellina", "Elowen", "Emeralda", "Enya", "Estella", "Ester", "Ethelinda", "Eurydice", "Faelen", "Faylinn", "Fenia", "Fianna", "Filippa", "Freyja", "Gail", "Galatea", "Geneva", "Giselle", "Glynis", "Gwen", "Gwendolyn", "Halla", "Hania", "Helena", "Hermione", "Hilda", "Hyacinth", "Idalia", "Ilona", "Imelda", "Inara", "Indira", "Iridian", "Isabeau", "Jade", "Jocasta", "Jolina", "Juniper", "Kaelina", "Kaelith", "Kaelen", "Kailani", "Kalea", "Kerensa", "Kiana", "Kyra", "Lainie", "Lara", "Larissa", "Laura", "Leandra", "Lenaia", "Letha", "Lillith", "Linnea", "Liviana", "Lorelei", "Luella", "Lumina", "Lyra", "Mabel", "Maeva", "Maia", "Mala", "Mariella", "Maxine", "Melantha", "Melody", "Minerva", "Mirabella", "Morgana", "Myranda", "Nadia", "Naima", "Naida", "Neela", "Nessa", "Netta", "Niamh", "Nicolette", "Nimue", "Nyssa", "Odessa", "Olivine", "Opalina", "Oriana", "Paloma", "Pandora", "Pascale", "Portia", "Phoebe", "Quiana", "Raina", "Ramona", "Rhea", "Rhiannon", "Rina", "Romana", "Rowan", "Rowena", "Ruby", "Samara", "Sapphira", "Sarina", "Selene", "Seraphina", "Shauna", "Shira", "Sierra", "Sigrun", "Siobhan", "Sorcha", "Summer", "Sunniva", "Sylvana", "Tabitha", "Tamsin", "Tindra", "Tirza", "Tonia", "Tullia", "Tuppence", "Twyla", "Valora", "Vanda", "Vespera", "Viviana", "Willa", "Willow", "Winifred", "Xenia", "Yara", "Yona", "Ysabel", "Zada", "Zarya", "Zelda", "Zena", "Zinnia", "Arivelle", "Selindrae", "Melisara", "Tavienne", "Loravine",  
	"Ysolira", "Neralya", "Sarelin", "Elviora", "Viralia",  
	"Aurevyn", "Junelis", "Kassaira", "Miralara", "Thalindra",  
	"Isavira", "Lunethia", "Sivoria", "Arinys", "Vionnara",  
	"Calindra", "Elyssara", "Fioren", "Gwenara", "Halyn",  
	"Iridel", "Jelissa", "Karione", "Lynarae", "Maerina",  
	"Nyssira", "Olivienne", "Ralintha", "Seralyth", "Tiravyn",  
	"Ulvira", "Virethia", "Wynelle", "Ylarae", "Zeressa",  
	"Aerina", "Belithra", "Cynara", "Delirae", "Elarine",  
	"Faylissa", "Galira", "Helyra", "Ilrissa", "Jorania",  
	"Kaslira", "Liravelle", "Melinthra", "Nariel", "Oressa",  
	"Perindra", "Quelina", "Rhyella", "Sirelin", "Tarissa",  
	"Ulirena", "Valirae", "Vesperin", "Wynessa", "Ysindra",  
	"Zelarin", "Aurelin", "Brinelle", "Ceralyth", "Dorethia",  
	"Elyara", "Fenira", "Galenis", "Helindra", "Inyssa",  
	"Jasirel", "Kaerinna", "Lunaris", "Marivelle", "Nyratha",  
	"Orienna", "Palira", "Relissa", "Sarivelle", "Telara",  
	"Urelith", "Vasira", "Vionelle", "Wenira", "Ysolyn",  
	"Zavrissa", "Aelindra", "Brynia", "Cirelle", "Dalyra",  
	"Elmyra", "Fioralyn", "Gwynira", "Haelisse", "Irissa", "Arivelle", "Belira", "Cynelis", "Delarae", "Elyndra",  
	"Fiorenne", "Galissa", "Helindra", "Islyra", "Jorelle",  
	"Kalirae", "Lunissa", "Marelin", "Nirelle", "Orilena",  
	"Padira", "Quelira", "Ravelyn", "Sarentha", "Tirielle",  
	"Ulinae", "Valira", "Wynelis", "Ysolara", "Zeraya",  
	"Aelora", "Brinelle", "Calya", "Dorevin", "Elonys",  
	"Faylira", "Gwenora", "Haelina", "Ilrisse", "Janira",  
	"Karesse", "Lirima", "Melirae", "Niraya", "Oselle",  
	"Perina", "Quenara", "Rhoselle", "Sylira", "Talyra",  
	"Urelia", "Vesira", "Wynira", "Ylindrae", "Zarelin",  
	"Aureth", "Basira", "Cyrala", "Dalinne", "Evistra",  
	"Folina", "Gavira", "Heslinn", "Ilarae", "Jelira",  
	"Kylara", "Levania", "Mirethia", "Nesira", "Orlisa",  
	"Penaya", "Qessira", "Relara", "Seloria", "Thylen",  
	"Ulassa", "Virelle", "Winira", "Ysolenne", "Zyralisa",  
	"Alindrae", "Bellira", "Ceritha", "Daselle", "Eloriah",  
	"Fennira", "Galiste", "Hylissa", "Iveria", "Junellea",  
	"Kellira", "Lunatia", "Merelis", "Nylora", "Oressa",  
	"Parira", "Quinelle", "Rivara", "Sarella", "Tiranae",  
	"Urina", "Vaylira", "Wynora", "Ylanya", "Zerissa",  
	"Amarielle", "Bresia", "Cevina", "Doralyn", "Elystra",  
	"Fayenne", "Glaria", "Hessira", "Ishara", "Jovelle",  
	"Kathelin", "Lysindra", "Mariste", "Neralyth", "Olinnia",  
	"Palisse", "Qalira", "Ranessa", "Serintha", "Talyenne",  
	"Unira", "Verris", "Weslina", "Ysoliah", "Zelrissa",  
	"Avara", "Brelyn", "Cirelith", "Danelia", "Elvenne",  
	"Farielle", "Gynara", "Halyssa", "Ivoria", "Jessira",  
	"Kessalia", "Liryn", "Meladie", "Narentha", "Olevia",  
	"Pirella", "Qerina", "Rosinae", "Sylisse", "Therina",  
	"Umelia", "Vanelith", "Wynelith", "Yrinae", "Zavelle",  
	"Aelania", "Briselle", "Calinas", "Dorethra", "Elunara",  
	"Fylira", "Glenira", "Hynessa", "Isloria", "Jadelyn",  
	"Kalirea", "Levaria", "Maralya", "Nirellin", "Othira",  
	"Peliane", "Qyrana", "Ravys", "Selaithe", "Tirissa",  
	"Uliria", "Vesalyn", "Wenara", "Ysolirae", "Zadelin", // --- 200 Nya Kvinnliga Människonamn ---
	"Aeliya", "Aerina", "Avelia", "Aurelle", "Amalira", "Arisella", "Anatira", "Avelith", "Aylina", "Alisandra",
	"Avilienne", "Arelisse", "Berylla", "Belissa", "Briseis", "Brennida", "Brynelle", "Caelira", "Caelissa", "Calissa",
	"Calyra", "Calinaea", "Celisse", "Cerinna", "Coritha", "Coravia", "Caelith", "Daelia", "Dalinia", "Dalisra",
	"Darissa", "Delira", "Delisse", "Doriella", "Dravia", "Elarienne", "Elenya", "Elinor", "Elunelle", "Elviraea",
	"Elysia", "Elysra", "Elvetia", "Eryna", "Esmira", "Estarissa", "Faelia", "Faereth", "Faeriell", "Fayrina",
	"Fayrian", "Felisse", "Feralia", "Finella", "Fioria", "Florisse", "Gaelina", "Gaelis", "Galienne", "Garisse",
	"Glainia", "Gwyneira", "Halia", "Halyra", "Hazel", "Hesperia", "Idrisse", "Ilianna", "Ilithya", "Ilyssa",
	"Inelia", "Isalia", "Isani", "Iselia", "Isellys", "Ismeria", "Ismira", "Isolde", "Iverna", "Ivisse",
	"Ivoria", "Jaelia", "Jalissa", "Jarisal", "Javira", "Jelena", "Jelissa", "Jocella", "Joralia", "Julieth",
	"Kaelissa", "Kalia", "Kalissa", "Kaloria", "Karilyn", "Karisra", "Kaselia", "Kassielle", "Katarin", "Katria",
	"Kellea", "Kerilys", "Korinne", "Kysandra", "Laelia", "Laerissa", "Lalisa", "Larena", "Larisse", "Lavinne",
	"Lelia", "Lennea", "Leandra", "Lilia", "Lilou", "Liora", "Lirienne", "Lirissa", "Liset", "Livia",
	"Lloria", "Lorelia", "Lorisse", "Lovalie", "Luccia", "Lunell", "Lurissa", "Lyana", "Lyncia", "Lysandra",
	"Maelia", "Maerissa", "Maiora", "Malia", "Mandra", "Maraea", "Marisse", "Melisse", "Mellanis", "Meralya",
	"Merial", "Mervia", "Millea", "Mirina", "Miriel", "Miriella", "Mirona", "Moriah", "Mylea", "Myloria",
	"Naelia", "Naerissa", "Nalira", "Narisra", "Nelaia", "Nelisse", "Nelva", "Nereis", "Nerissa", "Nicasia",
	"Niraya", "Norea", "Norella", "Noriel", "Norisse", "Novalie", "Novia", "Nylira", "Nylisse", "Nymira",
	"Odelia", "Odessa", "Oliva", "Olivria", "Ophelia", "Oralia", "Orissa", "Ovelia", "Paelia", "Parissa",
	"Phaedra", "Philou", "Raelia", "Raelissa", "Ralira", "Ralisra", "Rasalia", "Ravelea", "Ravelisse", "Regina", "Aliryn", "Seralya", "Tavielle", "Lunirae", "Mirelith", "Ysolenne", "Sirelith", "Elvaria", "Neralyss", "Virelith", "Arinelle", "Kassirae", "Melariel", "Tiravelle", "Junirae", "Selariel", "Loravyn", "Miralisse", "Iseloria", "Thalirae", "Alindrae", "Sivoriae", "Vionarae", "Elarisse", "Ylindrae", "Seralyae", "Mirelina", "Taviraen", "Lunareth", "Neralith", "Arivessa", "Kassalyn", "Melithra", "Tiravyn", "Junelith", "Seloriae", "Lorissa", "Miravyn", "Iselithra", "Thiravelle", "Alarisse", "Sivarae", "Virelina", "Elarithra", "Ysolirae", "Serelina", "Mirelissa", "Tavynna", "Lunelith", "Neravelle", "Arivora", "Kasselith", "Melarissa", "Tirissa", "Junoria", "Selindrae", "Loravelle", "Miralynne", "Iselara", "Thalynna", "Alirissa", "Sivellea", "Vionessa", "Elarinae", "Yloriae", "Seralisse", "Mirelora", "Taviraea", "Lunessae", "Neralynna", "Arivellea", "Kassoria", "Melindrae", "Tiravessa", "Junelira", "Selarissa", "Lorilith", "Miralissea", "Iseloriae", "Thiravyn", "Alarielae", "Sivoriah", "Virelissa", "Elarithae", "Ysolenna", "Seralyaen", "Mirelithra", "Tavynelle", "Lunirissa", "Neravyn", "Arivorae", "Kassalisse", "Melarinna", "Tiravellea", "Junelisse", "Seloriah", "Loravynna", "Miralithae", "Iselinna", "Thaliraen", "Alirynna", "Sivaraen", "Vionaraen", "Elarissa", "Ylindraen", "Serelithra", "Mirelinae", "Taviraena", "Lunelissa", "Neralisse", "Arivessae", "Kasselira", "Melithara", "Tirissaen", "Junoriae", "Selindraen", "Loravellea", "Miralynna", "Iselithae", "Thiravessa", "Alarissea", "Sivelleth", "Virelinae", "Elarithra", "Ysoliraen", "Seralynna", "Mirelissaen", "Tavynara", "Lunessaen", "Neravellea", "Arivoraen", "Kassoriae", "Melindraen", "Tiravynna", "Junelirae", "Selarissaen", "Lorilitha", "Miralisseh", "Iseloriah", "Thalynnaen", "Alirissae", "Sivoriaen", "Vionessae", "Elarinaen", "Yloriaen", "Seralissea", "Mirelorae", "Taviraeth", "Lunessaea", "Neralynnae", "Arivelleth", "Kassoriel", "Melindraea", "Tiravessae", "Junelissea", "Seloriaen", "Loravynae", "Miralithra", "Iselinnae", "Thiravynae", "Alarielah", "Sivoriael", "Virelissae", "Elarithaen", "Ysolennaen", "Seralyael", "Mirelithae", "Tavynellea", "Lunirissae", "Neravynae", "Arivorael", "Kassalissae", "Melarinnae", "Tiravelleh", "Junelissah", "Seloriael", "Loravynnah", "Miralithaen", "Iselinnael", "Thalirahel", "Alirynnah", "Sivarahel", "Vionarahel", "Elarissah", "Ylindrahel", "Serelithah", "Mirelinael", "Taviraenah", "Lunelissah", "Neralissah", "Arivessah", "Kasselirah", "Melitharah", "Tirissah", "Junoriah", "Selindrahel", "Loravelleh", "Miralynnah", "Iselithahel", "Thiravessah"];


const nameManDwarf = //Manlig Dwarf
	["Balgrin", "Durgan", "Korrim", "Bromli", "Thorek", "Gimrak", "Dwalin", "Rurik", "Borik", "Kragni",
	"Dorin", "Tharn", "Gorim", "Balinor", "Dromli", "Keldor", "Marnak", "Grimbold", "Durik", "Krogar",
	"Brogni", "Gorak", "Dromgar", "Keldrak", "Dwalrik", "Gromli", "Bromgar", "Kragor", "Durgim", "Gorgrim",
	"Murik", "Branor", "Keldin", "Gorin", "Darnak", "Rogar", "Thamir", "Beldor", "Gundrik", "Norgrim",
	"Varnak", "Dorinor", "Keldrim", "Brurik", "Gorlan", "Durmir", "Kroldin", "Gromrak", "Barik", "Dwalgar",
	"Karnor", "Grorik", "Thamrik", "Durgol", "Keldrakor", "Bromin", "Gorvik", "Thalgrim", "Rorik", "Durnak",
	"Kragmir", "Gundar", "Tholrik", "Beldrak", "Dwalgrim", "Korrak", "Grondar", "Tharik", "Durgrim", "Keldan",
	"Brondin", "Gorik", "Tharnil", "Dwalor", "Krogrim", "Gundrikor", "Bromdor", "Norik", "Durganil", "Keldgrim",
	"Grorak", "Bargrim", "Dwalrak", "Karnil", "Gorgrimor", "Durak", "Kroldor", "Brorik", "Gundrak", "Beldin",
	"Dwalrikor", "Korrgrim", "Grondin", "Durgrimor", "Keldrakil", "Brondak", "Gorlanor", "Dwalgrimor", "Krogrimil", "Gundrikil",
	"Bromrak", "Norgrimil", "Durganor", "Keldgrimil", "Grorikor", "Bargrimil", "Dwalrakor", "Karnilor", "Gorgrimil", "Durakor",
	"Kroldoril", "Brorikor", "Gundrakil", "Beldinor", "Dwalrikil", "Korrgrimil", "Grondinor", "Durgrimil", "Keldrakor", "Brondakor",
	"Gorlanil", "Dwalgrimil", "Krogrimor", "Gundrikgrim", "Bromrik", "Norgrimor", "Durganilak", "Keldgrimil", "Grorikgrim", "Bargrimor",
	"Dwalrakil", "Karnilgrim", "Gorgrimgrim", "Durakil", "Kroldorgrim", "Brorikgrim", "Gundrakgrim", "Beldinil", "Dwalrikgrim", "Korrgrimgrim",
	"Grondingrim", "Durgrimak", "Keldrakmir", "Brondrim", "Gorlanmir", "Dwalgrimak", "Krogrimak", "Gundrikmir", "Bromgrim", "Norgrimak",
	"Durmirak", "Keldorin", "Brondar", "Gorgrimak", "Dwalrakmir", "Kroldrak", "Gundrakmir", "Beldrakmir", "Dwalgrimor", "Korrgrimak",
	"Grondrak", "Durgrimil", "Keldrakil", "Brondil", "Gorlanil", "Dwalgrimil", "Krogrimil", "Gundrikil", "Bromil", "Noril","Gromnir", "Bronkor", "Skarnak", "Voldir", "Rognar", "Fornak", "Grimnar", "Duramak", "Kheldrum", "Torfin", "Krugrum", "Thordin", "Glumrak", "Borund", "Harkon", "Drumnor", "Balderik", "Morgin", "Skorri", "Brundir", "Grimgar", "Drokkar", "Thormik", "Vargrim", "Rorvan", "Kordag", "Durgrim", "Brandur", "Muradin", "Fjolnir", "Grumbel", "Dornak", "Keldrun", "Gundric", "Norvil", "Grimfang", "Dromir", "Thorkin", "Bardin", "Ragnar", "Karrus", "Dorrak", "Bragok", "Skalgrim", "Thromar", "Borrik", "Grolak", "Voldrin", "Durmrak", "Horgar", "Keldarr", "Gundric", "Grimir", "Drokkin", "Thormund", "Brondor", "Marmak", "Rognir", "Krorak", "Dargrim", "Morrin", "Balden", "Grimvald", "Durin", "Kruger", "Thradok", "Grumor", "Dornil", "Kaldur", "Norikson", "Grondak", "Fornir", "Brogun", "Maldor", "Skorgrim", "Thordrak", "Krumdar", "Dwalmir", "Gimlin", "Ruriksson", "Bronnir", "Gorund", "Skarnil", "Voldrak", "Rognarok", "Fornakil", "Grimnirak", "Duramakor", "Kheldrumil", "Torfinak", "Krugrumor", "Thordinak", "Glumrakor", "Borundil", "Harkonil", "Drumnorik", "Balderikil", "Morginak", "Skorrion", "Brundirak", "Grimgaror", "Drokkaril", "Thormikil", "Vargrimor", "Rorvanak", "Kordagor", "Durgrimik", "Branduril", "Muradinak", "Fjolniril", "Grumbelor", "Dornakil", "Keldrunor", "Gundricil", "Norvilak", "Grimfangor", "Dromirak", "Thorkinil", "Bardinil", "Ragnarokil", "Karrusor", "Dorrakil", "Bragokor", "Skalgrimil", "Thromaror", "Borrikin", "Grolakor", "Voldrinil", "Durmrakor", "Horgarin", "Keldarril", "Gundricor", "Grimirak", "Drokkinor", "Thormundil", "Brondorik", "Marmakin", "Rogniror", "Krorakil", "Dargrimor", "Morrinil", "Baldenor", "Grimvaldun", "Durinor", "Krugerak", "Thradokil", "Grumorak", "Dornilin", "Kalduril", "Noriksgrim", "Grondakor", "Fornirak", "Brogunor", "Maldoril", "Skorgrimor", "Thordrakil", "Krumdaror", "Dwalmirak", "Gimlinil", "Rurikgrum", "Balgran", "Durek", "Gormok", "Kragnir", "Brodin", "Fendral", "Grimdal", "Halgir", "Krolak", "Magnor", "Orlan", "Rundor", "Storn", "Thurgim", "Ulfric", "Vargen", "Yorik", "Zarmak", "Asgrim", 	"Gromnir", "Bronkor", "Skarnak", "Voldir", "Rognar", "Fornak", "Grimnar", "Duramak", "Kheldrum", "Torfin",
	"Krugrum", "Thordin", "Glumrak", "Borund", "Harkon", "Drumnor", "Balderik", "Morgin", "Skorri", "Brundir",
	"Grimgar", "Drokkar", "Thormik", "Vargrim", "Rorvan", "Kordag", "Durgrim", "Brandur", "Muradin", "Fjolnir",
	"Grumbel", "Dornak", "Keldrun", "Gundric", "Norvil", "Grimfang", "Dromir", "Thorkin", "Bardin", "Ragnar",
	"Karrus", "Dorrak", "Bragok", "Skalgrim", "Thromar", "Borrik", "Grolak", "Voldrin", "Durmrak", "Horgar",
	"Keldarr", "Gundric", "Grimir", "Drokkin", "Thormund", "Brondor", "Marmak", "Rognir", "Krorak", "Dargrim",
	"Morrin", "Balden", "Grimvald", "Durin", "Kruger", "Thradok", "Grumor", "Dornil", "Kaldur", "Norikson",
	"Grondak", "Fornir", "Brogun", "Maldor", "Skorgrim", "Thordrak", "Krumdar", "Dwalmir", "Gimlin", "Ruriksson",
	"Bronnir", "Gorund", "Skarnil", "Voldrak", "Rognarok", "Fornakil", "Grimnirak", "Duramakor", "Kheldrumil", "Torfinak",
	"Krugrumor", "Thordinak", "Glumrakor", "Borundil", "Harkonil", "Drumnorik", "Balderikil", "Morginak", "Skorrion", "Brundirak",
	"Grimgaror", "Drokkaril", "Thormikil", "Vargrimor", "Rorvanak", "Kordagor", "Durgrimik", "Branduril", "Muradinak", "Fjolniril",
	"Grumbelor", "Dornakil", "Keldrunor", "Gundricil", "Norvilak", "Grimfangor", "Dromirak", "Thorkinil", "Bardinil", "Ragnarokil",
	"Karrusor", "Dorrakil", "Bragokor", "Skalgrimil", "Thromaror", "Borrikin", "Grolakor", "Voldrinil", "Durmrakor", "Horgarin",
	"Keldarril", "Gundricor", "Grimirak", "Drokkinor", "Thormundil", "Brondorik", "Marmakin", "Rogniror", "Krorakil", "Dargrimor",
	"Morrinil", "Baldenor", "Grimvaldun", "Durinor", "Krugerak", "Thradokil", "Grumorak", "Dornilin", "Kalduril", "Noriksgrim",
	"Grondakor", "Fornirak", "Brogunor", "Maldoril", "Skorgrimor", "Thordrakil", "Krumdaror", "Dwalmirak", "Gimlinil", "Rurikgrum",
	"Balgran", "Durek", "Gormok", "Kragnir", "Brodin", "Fendral", "Grimdal", "Halgir", "Krolak", "Magnor",
	"Orlan", "Rundor", "Storn", "Thurgim", "Ulfric", "Vargen", "Yorik", "Zarmak", "Asgrim", "Bolli",
	"Grolin", "Thorgar", "Kaelen", "Drakon", "Fargrim", "Haldor", "Ironfist", "Stonebeard", "Rockhelm", "Deepdelver",
	"Flintaxe", "Gravelock", "Hammerfall", "Oakhart", "Pebblefoot", "Rumblebelly", "Strongarm", "Talonstrike", "Underhill", "Valiant",
	"Wulfgar", "Yarok", "Zoltan", "Axebeard", "Boulderkin", "Coalheart", "Daggermaw", "Earthshaker", "Frostbeard", "Goldhand",
	"Hardrock", "Ironhide", "Keeneye", "Longbeard", "Mightyfist", "Oreheart", "Pikehelm", "Runeaxe", "Shieldbearer", "Thunderfoot",
	"Urgrim", "Vargulf", "Wyrmslayer", "Ymir", "Zarkon", "Anvilmar", "Blackiron", "Cinderfall", "Deepaxe", "Emberbeard",
	"Forgehammer", "Glimmerstone", "Grimfang", "Hearthstone", "Ironbreaker", "Kaelgrim", "Loknar", "Morgar", "Norgim", "Orengrim",
	"Paldin", "Ragnarok", "Skaldor", "Thorgal", "Ulfgrim", "Voldrak", "Wulfric", "Yorgrim", "Zargrim", "Alaric",
	"Bramli", "Corbin", "Dargan", "Einar", "Falkor", "Gareth", "Hakon", "Ingvar", "Jorik", "Kaelan",
	"Lothar", "Mordin", "Njal", "Odin", "Perrin", "Roric", "Sten", "Torvin", "Ulfgar", "Viggo",
	"Wulfstan", "Yngvar", "Zoltan", "Aethelred", "Bjorn", "Cnut", "Dagfinn", "Eirik", "Frode", "Gunnar",
	"Hrolf", "Ivar", "Jarl", "Knut", "Leif", "Magnus", "Nils", "Olaf", "Rolf", "Sven",
	"Thorbjorn", "Ulfhedinn", "Valdemar", "Vidar", "Wodan", "Yngve", "Zygmunt", "Aric", "Bardulf", "Caldor",
	"Durnan", "Eldrin", "Fendrel", "Garm", "Haldan", "Ironside", "Jorgin", "Kaelum", "Loric", "Marnus",
	"Njord", "Orrin", "Pindar", "Ragnarson", "Skorri", "Thrain", "Ulfrik", "Vardis", "Wulfgar", "Yorick",
	"Zoltan", "Aegnor", "Borin", "Cromli", "Dargrim", "Eldrinor", "Fargrimor", "Gorimor", "Haldinor", "Ironfistor",
	"Kaelenor", "Loknaror", "Mordinor", "Norgimor", "Orengrimor", "Paldinor", "Ragnarokor", "Skaldoror", "Thorgalor", "Ulfgrimor",
	"Voldrakor", "Wulfricor", "Yorgrimor", "Zargrimor", "Alaricor", "Bramlior", "Corbinor", "Darganor", "Einaror", "Falkoror",
	"Garethor", "Hakonor", "Ingvaror", "Jorikor", "Kaelanor", "Lotharor", "Mordinor", "Njalor", "Odinor", "Perrinor",
	"Roricor", "Stenor", "Torvinor", "Ulfgaror", "Viggoor", "Wulfstanor", "Yngvaror", "Zoltanor", "Aethelredor", "Bjornor",
	"Cnutor", "Dagfinnor", "Eirikor", "Frodeor", "Gunnaror", "Hrolfor", "Ivaror", "Jarlor", "Knutor", "Leifor",
	"Magnusor", "Nilsor", "Olafor", "Rolfor", "Svenor", "Thorbjornor", "Ulfhedinnor", "Valdemaror", "Vidaror", "Wodanor",
	"Yngveor", "Zygmuntor", "Aricor", "Bardulfor", "Caldoror", "Durnanor", "Eldrinor", "Fendrelor", "Garmor", "Haldanor",
	"Ironsideor", "Jorginor", "Kaelumor", "Loricor", "Marnusor", "Njordor", "Orrinor", "Pindaro", "Ragnarsonor", "Skorrior",
	"Thrainor", "Ulfrikor", "Vardisor", "Wulfgaror", "Yorickor", "Zoltanor", "Aegnoror", "Borinor", "Cromlior", "Dargrimor",
	"Eldrinor", "Fargrimor", "Gorimor", "Haldinor", "Ironfistor", "Kaelenor", "Loknaror", "Mordinor", "Norgimor", "Orengrimor",
	"Paldinor", "Ragnarokor", "Skaldoror", "Thorgalor", "Ulfgrimor", "Voldrakor", "Wulfricor", "Yorgrimor", "Zargrimor", "Alaricor",
	"Bramlior", "Corbinor", "Darganor", "Einaror", "Falkoror", "Garethor", "Hakonor", "Ingvaror", "Jorikor", "Kaelanor",
	"Lotharor", "Mordinor", "Njalor", "Odinor", "Perrinor", "Roricor", "Stenor", "Torvinor", "Ulfgaror", "Viggoor",
	"Wulfstanor", "Yngvaror", "Zoltanor", "Aethelredor", "Bjornor", "Cnutor", "Dagfinnor", "Eirikor", "Frodeor", "Gunnaror",
	"Hrolfor", "Ivaror", "Jarlor", "Knutor", "Leifor", "Magnusor", "Nilsor", "Olafor", "Rolfor", "Svenor",
	"Thorbjornor", "Ulfhedinnor", "Valdemaror", "Vidaror", "Wodanor", "Yngveor", "Zygmuntor", "Aricor", "Bardulfor", "Caldoror",
	"Durnanor", "Eldrinor", "Fendrelor", "Garmor", "Haldanor", "Bolli"
	];


const nameWomanDwarf = //Kvinnlig Dwarf
	["Brynja", "Gilda", "Thorna", "Helga", "Sigrun", "Dagna", "Ylvara", "Astrid", "Freydis", "Gunhild",
	"Ragna", "Eydis", "Torhild", "Brunna", "Hervora", "Svala", "Inga", "Yrla", "Skadi", "Alvilda",
	"Gudrun", "Eira", "Sifrid", "Halla", "Marnis", "Thyra", "Vigdis", "Runa", "Solveig", "Hedra",
	"Drifa", "Kelda", "Syrja", "Tordis", "Embla", "Frida", "Jorunn", "Kara", "Lofna", "Milda",
	"Orla", "Ragna", "Svala", "Torvi", "Ylna", "Asta", "Brida", "Dagny", "Eydun", "Freyja",
	"Grima", "Hilda", "Idra", "Kelda", "Lina", "Morna", "Nissa", "Olga", "Rinda", "Sigrid",
	"Tilda", "Una", "Vala", "Wynna", "Ylsa", "Aldis", "Bera", "Cindra", "Disa", "Eydra",
	"Fjora", "Gerta", "Hedda", "Inna", "Jorna", "Klara", "Lysa", "Mira", "Norna", "Orna",
	"Rysa", "Siv", "Tirna", "Ulda", "Vilda", "Wira", "Yndra", "Asta", "Brynna", "Cira",
	"Druna", "Eira", "Freda", "Gilda", "Horna", "Isla", "Jora", "Kelda", "Lorna", "Milda",
	"Nissa", "Orla", "Ragna", "Svala", "Tora", "Ulla", "Vigga", "Wenna", "Ylva", "Agnis",
	"Brina", "Cindra", "Dagna", "Eydis", "Frona", "Gerta", "Halla", "Idra", "Jorna", "Kira",
	"Lina", "Morna", "Nissa", "Olga", "Rinda", "Sigrid", "Tilda", "Una", "Vala", "Wynna",
	"Ylsa", "Aldis", "Bera", "Cindra", "Disa", "Eydra", "Fjora", "Gerta", "Hedda", "Inna",
	"Jorna", "Klara", "Lysa", "Mira", "Norna", "Orna", "Rysa", "Siv", "Tirna", "Ulda",
	"Vilda", "Wira", "Yndra", "Asta", "Brynna", "Cira", "Druna", "Eira", "Freda", "Gilda",
	"Horna", "Isla", "Jora", "Kelda", "Lorna", "Milda", "Nissa", "Orla", "Ragna", "Svala",
	"Tora", "Ulla", "Vigga", "Wenna", "Ylva", "Agnis", "Brina", "Cindra", "Dagna", "Eydis",
	"Frona", "Gerta", "Halla", "Idra", "Jorna", "Kira", "Lina", "Morna", "Nissa", "Olga",
	"Rinda", "Sigrid", "Tilda", "Una", "Vala", "Wynna", "Ylsa", "Aldis", "Bera", "Cindra", "Gromma", "Karrna", "Druda", "Skaldis", "Throra", "Vyrda", "Jorun", "Keldra", "Bromla", "Dornis", "Runhilda", "Astri", "Berdra", "Grimsa", "Hilda", "Torunn", "Uldra", "Vorna", "Yrsa", "Zisa", "Alara", "Bolga", "Crona", "Dorris", "Eldra", "Frona", "Gorga", "Hjordis", "Ildra", "Jadis", "Kagna", "Lydda", "Mora", "Narda", "Orina", "Pryda", "Qvella", "Rikka", "Stena", "Tova", "Ulrika", "Vesta", "Wulfra", "Xenia", "Zelma", "Arva", "Bolda", "Clara", "Dora", "Elda", "Fenna", "Griva", "Hyrna", "Isol", "Jorra", "Karna", "Lussa", "Myra", "Norda", "Ossia", "Ralda", "Skirra", "Thilda", "Urma", "Valdis", "Winna", "Yngva", "Zinna", "Anga", "Borga", "Cyra", "Dala", "Elma", "Folla", "Gyra", "Honna", "Irsa", "Janna", "Krida", "Leifa", "Marnie", "Niva", "Ossa", "Rilla", "Solrun", "Tara", "Ulla", "Vigdisa", "Wena", "Ylla", "Zina", "Aelis", "Bronda", "Corva", "Dronna", "Eldis", "Freyga", "Groma", "Hella", "Inara", "Jorna", "Klara", "Lysia", "Mora", "Nora", "Orsa", "Ryndis", "Sifta", "Tirsa", "Ulvra", "Valna", "Wyrda", "Ylvaia", "Zanna", "Audra", "Belda", "Crinda", "Dagrun", "Eldfrid", "Frigg", "Gunda", "Hlif", "Idunn", "Jora", "Kolla", "Lovisa", "Mist", "Norvin", "Othala", "Ranveig", "Sigridis", "Thordra", "Ulfhild", "Verda", "Willa", "Ymiria", "Zylpha", "Alarice", "Birgitta", "Caelia", "Dagmar", "Eirlys", "Finna", "Geira", "Hulda", "Ingridis", "Jarlina", "Kaisa", "Liv", "Marta", "Nanna", "Oddrun", "Ragnhild", "Svana", "Thea", "Urda", "Vesta", "Wulfrun", "Ylving", "Zelda", "Alruna", "Brynna", "Candis", "Dahlia", "Elara", "Fenris", "Grimhild", "Hanna", "Iðunn", "Jara", "Kalla", "Lorna", "Myrla", "Njordis", "Oda", "Petrina", "Ria", "Saga", "Thyrla", "Ulvhild"];


const nameManElf = //Man elf
	["Aerendil", "Thalion", "Elarion", "Faelar", "Galion", "Luthen", "Sylvar", "Caelion", "Theren", "Althar",
	"Elros", "Varion", "Naerion", "Ithamar", "Lorion", "Thandor", "Eryndor", "Calen", "Aerendir", "Sylion",
	"Thalor", "Elandor", "Felarion", "Galanor", "Ithilion", "Rhovan", "Aelric", "Thamior", "Erevan", "Lirael",
	"Caelum", "Thanduil", "Elion", "Faenor", "Galadion", "Liraen", "Sylorin", "Calion", "Theramir", "Alarion",
	"Elionas", "Varamir", "Naelion", "Ithilmar", "Loramir", "Thalendir", "Eryndar", "Calendir", "Aerendros", "Sylven",
	"Thalionor", "Elandril", "Felaros", "Galanthir", "Ithilros", "Rhovanor", "Aelion", "Thamiren", "Erevandir", "Liraion",
	"Caelmir", "Thandros", "Elrion", "Faelion", "Galadros", "Luthamir", "Sylionas", "Calenor", "Therion", "Althamir",
	"Elrendir", "Varionas", "Naerandir", "Ithilven", "Lorandor", "Thalorion", "Eryndarion", "Calendor", "Aerendrosil", "Sylvarion",
	"Thalendirion", "Elandros", "Felarien", "Galanoril", "Ithilionas", "Rhovanil", "Aelrion", "Thamioril", "Erevanor", "Liraelor",
	"Caelionas", "Thandoril", "Elrosil", "Faelionas", "Galionor", "Luthenor", "Sylvaril", "Calenion", "Therandor", "Alarionas",
	"Elionir", "Varamirion", "Naelir", "Ithamaril", "Lorionas", "Thalionir", "Eryndoril", "Calendirion", "Aerendilion", "Sylvenor",
	"Thaloril", "Elandoril", "Felarionas", "Galanthirion", "Ithilrosil", "Rhovanir", "Aelricor", "Thamioren", "Erevandor", "Liraelorin",
	"Caelmirion", "Thandrosil", "Elrionas", "Faelir", "Galadrosil", "Luthamirion", "Sylionir", "Calenoril", "Therionas", "Altharion",
	"Elionasor", "Varamiril", "Naelionir", "Ithilmarion", "Loramirion", "Thalendiron", "Eryndaril", "Calendoril", "Aerendrosor", "Sylvenir",
	"Thalionas", "Elandrilor", "Felarosil", "Galanthiron", "Ithilrosor", "Rhovanoril", "Aelionir", "Thamirenor", "Erevandirion", "Liraionor",
	"Caelmiror", "Thandrosor", "Elrionir", "Faelionir", "Galadrosor", "Luthenoril", "Sylionasor", "Calenionor", "Therandoril", "Alarionir",
	"Elionasir", "Varionir", "Naelionor", "Ithilvenor", "Lorandoril", "Thalorionas", "Eryndarionor", "Calendoror", "Aerendrosilor", "Sylvarior",
	"Thalendirior", "Elandrosir", "Felarienor", "Galanorior", "Ithilionir", "Rhovanilor", "Aelrionor", "Thamiorilor", "Erevanoril", "Liraeloror",
	"Caelionir", "Thandorior", "Elrosior", "Faelionor", "Galionir", "Luthenior", "Sylvarilor", "Calenior", "Theranor", "Alarionor","Aelionel", "Anarion", "Berelion", "Celeborn", "Dairon", "Eldarin", "Faelivrin", "Gildor", "Hirion", "Ithiel", "Jaelin", "Kaelenor", "Lomion", "Maedhros", "Neldor", "Oropher", "Pereldar", "Quellion", "Rathalion", "Saurion", "Telcontar", "Tinnuviel", "Undomiel", "Valandil", "Wendelin", "Xandriel", "Yavannor", "Zelion", "Aeridor", "Amroth", "Beleg", "Cirdan", "Daelion", "Elrond", "Fingon", "Glorfindel", "Hadhod", "Imrahil", "Jareth", "Kaelin", "Lindir", "Mithrandir", "Nimrodel", "Olorin", "Peredhil", "Quessar", "Rilmor", "Sindir", "Tirion", "Uldor", "Vanyar", "Welfin", "Xylos", "Ythilien", "Zandor", "Aravir", "Beldron", "Camdor", "Dagor", "Eärendil", "Faelivrinor", "Gil-galad", "Húrin", "Indis", "Joron", "Kaelond", "Lothron", "Maeglin", "Númenor", "Oromë", "Rochallor", "Salion", "Taurion", "Ulmo", "Vardamir", "Welkin", "Xarionel", "Yvranil", "Zorionel", "Aeleth", "Baranor", "Caelenor", "Darthor", "Elorias", "Faelenor", "Gondolin", "Haldor", "Ingwë", "Jorion", "Karthor", "Lathron", "Malorion", "Nénar", "Ossë", "Rimmon", "Saelon", "Teldar", "Umir", "Valinor", "Wethrin", "Xylond", "Yulend", "Zelthar", "Aeliondir", "Beren", "Calenhad", "Daeron", "Eldarion", "Finrod", "Gilthoniel", "Haldir", "Isildur", "Jossar", "Kíli", "Lirion", "Mablung", "Nienor", "Palantir", "Rochon", "Serrion", "Tharion", "Urien", "Vána", "Wylath", "Xandor", "Yavien", "Zorith", "Amdir", "Berethor", "Caranthir", "Denethor", "Elendil", "Faramir", "Gwaihir", "Hasufel", "Irmo", "Julion", "Laerion", "Mandos", "Narcel", "Ostarion", "Rúmil", "Sarkon", "Thorondor", "Urtion", "Varda", "Xylofen", "Yavanna", "Zadrian", "Aelionir", "Brandir", "Caleon", "Dirion", "Elendur", "Faelon", "Gandalf", "Henneth", "Ithilien", "Kelion", "Lórien", "Mirkwood", "Nessa", "Oranor", "Saeldor", "Thandir", "Valandor", "Xylor", "Yavareth", "Zendar",];


const nameWomanElf = //Kvinna elf
	["Aerilaya", "Sylwen", "Lirael", "Elaria", "Thalindra", "Nymeria", "Faelira", "Ysolde", "Araniel", "Serelith",
	"Caladriel", "Elanwe", "Myrren", "Naelira", "Velatha", "Isilme", "Thalira", "Aurelia", "Lyrielle", "Elenwen",
	"Miralith", "Soryn", "Althaea", "Nimriel", "Vaelora", "Elyndra", "Selene", "Ithilwen", "Caelira", "Yavanna",
	"Seraphiel", "Aeris", "Luneth", "Thalassa", "Elariel", "Nuala", "Virelya", "Ariandel", "Sylphira", "Elowen",
	"Nyelith", "Faeniel", "Isolde", "Arannis", "Serenya", "Calithra", "Elira", "Myrielle", "Naevys", "Velwyn",
	"Ilyana", "Thalindrae", "Aurethiel", "Liraena", "Eleniel", "Miriel", "Soryna", "Alariel", "Nimue", "Vaelis",
	"Elyra", "Selindra", "Ithiria", "Caelynn", "Ysolara", "Serelune", "Aerisil", "Lunara", "Thalirae", "Elaris",
	"Nymira", "Virelle", "Arieth", "Sylvara", "Elaniel", "Nyssa", "Faelirae", "Isilra", "Aralyn", "Serindra",
	"Caleniel", "Elindra", "Myrriel", "Naevira", "Velira", "Ilyria", "Thalindrael", "Aurelin", "Liraeth", "Elenara",
	"Miralyn", "Sorynel", "Althiriel", "Nimara", "Vaelira", "Elyndriel", "Selira", "Ithilra", "Caelirae", "Yavira",
	"Seraphira", "Aeriel", "Lunira", "Thalyn", "Elarith", "Nualith", "Virelia", "Ariella", "Sylwenna", "Elowira",
	"Nyelira", "Faenira", "Isolyn", "Aranielae", "Serenyae", "Calithriel", "Eliriel", "Myrielleth", "Naevirae", "Velwynna",
	"Ilyaneth", "Thalindraen", "Aurethira", "Liraenil", "Elenwynn", "Miralira", "Soryniel", "Alarindra", "Nimuel", "Vaelith",
	"Elyraen", "Selindrae", "Ithiriael", "Caelyra", "Ysolira", "Serelira", "Aeriswyn", "Lunethiel", "Thaliraena", "Elarindra",
	"Nymariel", "Virelira", "Ariethiel", "Sylvariel", "Elanira", "Nyssira", "Faelindra", "Isilwen", "Aralira", "Serindrae",
	"Calenira", "Elindriel", "Myrrenil", "Naevyra", "Velindra", "Ilyrielle", "Thaliriel", "Aurelyra", "Liraenor", "Elenyra",
	"Miralindra", "Soryneth", "Althirindra", "Nimirel", "Vaelindra", "Elyndira", "Seliriel", "Ithilindra", "Caelindra", "Yavindra",
	"Seraphen", "Aerindra", "Luniriel", "Thalynae", "Elarindrae", "Nualira", "Virelith", "Arielyra", "Sylweniel", "Elowenil","Aeliana", "Alatarra", "Anariel", "Astraya", "Beleria", "Calenestra", "Celestine", "Darcelle", "Eärendis", "Eloraen", "Faelynn", "Galathiel", "Hirielle", "Ithilda", "Jaelith", "Kaelenis", "Lianore", "Luminara", "Maeriel", "Melianna", "Mirielas", "Naeria", "Náriel", "Orithia", "Perendia", "Quillessa", "Rianna", "Rhianwen", "Saelira", "Seraphine", "Shalana", "Silmaria", "Solandra", "Taelya", "Tarinya", "Tirionna", "Urielis", "Valaria", "Vanyaris", "Xylona", "Yaviel", "Zelana", "Aeryn", "Althalya", "Amareth", "Aranel", "Briellen", "Caithlyn", "Cirith", "Daliana", "Doritha", "Elendilë", "Eloriana", "Faelia", "Galadwen", "Hithael", "Ilmare", "Isilraen", "Jorin", "Kyraela", "Laeriana", "Lúthien", "Maeril", "Mithrille", "Naevis", "Nindë", "Ondine", "Perrina", "Quenya", "Raenys", "Rielle", "Ríanna", "Saelith", "Séren", "Shalari", "Sílwen", "Sórellas", "Talaith", "Tauriel", "Tiril", "Uinen", "Valeriae", "Virenda", "Wylona", "Ylith", "Ziriel", "Aelin", "Almeris", "Anareth", "Arwen", "Belira", "Calamia", "Celairis", "Daeriel", "Eärendira", "Eloralis", "Faelenis", "Galanna", "Hirondel", "Ithilna", "Jalyn", "Kaelarys", "Liriel", "Lunarael", "Maela", "Melliana", "Morynn", "Naevina", "Nienor", "Oriel", "Phaedra", "Quianna", "Rhoswen", "Rinna", "Saraphina", "Sephira", "Shalanae", "Silvelle", "Sophrina", "Talinna", "Thalenia", "Tirionel", "Urmenel", "Valindra", "Vesperia", "Wylwen", "Ylvaen", "Zorina", "Adanessa", "Alathria", "Amrasia", "Astra", "Belariel", "Calessa", "Coriel", "Daryna", "Elaraena", "Eloriel", "Farniel", "Gwenneth", "Helara", "Ithra", "Jocelyn", "Kyrelia", "Laeriel", "Lyrae", "Maella", "Melína", "Myriala", "Naerith", "Nirya", "Orlana", "Pellandra", "Quentina", "Rethiel", "Ryllis", "Sarian", "Senna", "Shirael", "Siranna", "Sulinda", "Taeleria", "Thoraen", "Týrissa", "Uthelia", "Valenna", "Vivienna", "Xylina", "Yssalia", "Zylphae",];


const nameManGnome =
	["Boddin", "Tibber", "Nimlo", "Wicko", "Brambin", "Glimmer", "Nockton", "Tinket", "Ramblet", "Cobble",
	"Fenwick", "Jorbin", "Marnix", "Woddle", "Grindle", "Tobbin", "Snorbin", "Quindle", "Bramble", "Nimwick",
	"Torkel", "Whimble", "Gadget", "Norbik", "Tobble", "Rizzik", "Coggle", "Fenlo", "Jibber", "Marnel",
	"Zook", "Wizzleton", "Grimble", "Tibbin", "Snizzle", "Quibbin", "Brimble", "Nimkin", "Tork", "Whizzle",
	"Glim", "Norbit", "Tobber", "Fizzle", "Rizzel", "Cobbin", "Fenbin", "Jorlo", "Marnik", "Wobble",
	"Gribbin", "Tibberton", "Snibbin", "Quizzle", "Brabble", "Nimkinz", "Torkin", "Whimzik", "Gadgeteer", "Norwick",
	"Tobbit", "Ramblewick", "Cogbin", "Fenrick", "Jibbin", "Marnwick", "Wizzik", "Gramble", "Tibberik", "Snorkel",
	"Quintle", "Brimzik", "Nimzor", "Torkwick", "Whimsy", "Glimmerick", "Norbin", "Tobberik", "Fizzpop", "Rizzwick",
	"Cogbin", "Fenwizzle", "Jorbinik", "Marnibble", "Wobblin", "Grimzik", "Tibberwick", "Snizzleton", "Quibber", "Brimzor",
	"Nimblin", "Torkelson", "Whizzik", "Glimzick", "Norwizzle", "Tobblin", "Fizzlenick", "Ramblebin", "Cobblor", "Fenwobble",
	"Jibberton", "Marnizzle", "Wizzlen", "Gribber", "Tibblin", "Snorkwick", "Quintor", "Brambik", "Nimzick", "Torkibble",
	"Whimblin", "Glimzook", "Norblin", "Tobberwick", "Fizzwhip", "Rizzlin", "Cogwobble", "Fenblin", "Jorblin", "Marnobble",
	"Wobblor", "Grimblin", "Tibberblin", "Snibber", "Quibblor", "Brimzorik", "Nimblor", "Torkobble", "Whimzor", "Glimber",
	"Norblor", "Tobblor", "Fizzlor", "Ramblezor", "Cobblinor", "Fenblor", "Jibberblin", "Marnobbin", "Wizzlor", "Gribblor",
	"Tibblor", "Snorklor", "Quintlor", "Brambor", "Nimzorik", "Torklor", "Whimlor", "Glimzor", "Norzor", "Tobzor",
	"Rizzor", "Cogzor", "Fenlor", "Jorlor", "Marnlor", "Wobblorik", "Grimzor", "Tibzor", "Snibzor", "Quindleton",
	"Bramlor", "Nimrick", "Torkwin", "Whimrick", "Glimrick", "Norwicko", "Tobrick", "Fizzrick", "Rambletuck", "Cobblewin",
	"Fenricko", "Jibberwin", "Marnwin", "Wobbleton", "Gribbleton", "Tibberwin", "Snorkwin", "Quintwin", "Brimrick", "Nimblewin","Knorp", "Tipprik", "Vinkor", "Grumril", "Smäcklor", "Rizzel", "Krytt", "Fjuttar", "Gnubbel", "Pyslar", "Tottlin", "Fiskrin", "Kuggan", "Virrik", "Meklar", "Fimble", "Klemmin", "Praslin", "Snickus", "Jinkel", "Bromler", "Klinko", "Fjumbor", "Bultrim", "Smirrel", "Piprik", "Låssar", "Snirkel", "Klampin", "Vrimmil", "Gnubben", "Fixon", "Måldor", "Rikkelin", "Tjocklin", "Virrikon", "Spåntar", "Bubblan", "Nocklin", "Smäller", "Järnvik", "Toffil", "Krämper", "Vipplin", "Flickel", "Knirren", "Pysmor", "Rullik", "Skruvan", "Tussel", "Vinkilot", "Muffar", "Grubbik", "Knycklin", "Blinkar", "Snärtil", "Klorik", "Vippor", "Svinnev", "Jubbelin", "Bråton", "Kolvir", "Mekkel", "Pinnor", "Skrapin", "Tjallor", "Vantus", "Fladdik", "Knubbur", "Smickel", "Bumlingen", "Gnistrin", "Jöcklin", "Knytlin", "Ludder", "Mossal", "Nabbel", "Ockrin", "Pysselor", "Rabbik", "Slickor", "Snabelin", "Taffel", "Timmar", "Trolldar", "Växlar", "Bälgin", "Knallin", "Myssel", "Smuttil", "Fjummel", "Gnorrik", "Jitter", "Knektar", "Lunkel", "Mufflin", "Nallin", "Pippelin", "Raskar", "Skuttlin", "Slinkor", "Snoddel", "Tafson", "Tjudrin", "Trulle", "Vättel", "Ärtan", "Björnin", "Glänter", "Hackelot", "Järnik", "Krokar", "Lerlin", "Mullar", "Nabbik", "Ollen", "Rabbin", "Skäggar", "Slammer", "Snurran", "Stenvik", "Tärnel", "Tjärnar", "Vargenor", "Viklin", "Flisnik", "Kuggenor", "Nissar", "Rasselon", "Snoddar", "Tippelin", "Vinklaron", "Glufsin", "Smäcklin", "Knåpor", "Fjuttor", "Pysselrik", "Tottlin", "Flisnar", "Kuggbultin", "Virmusar", "Mekanor", "Fimblin", "Klämmik", "Prasslor", "Snattlin", "Jinkelon", "Bromsil", "Klinkrik", "Fjumlar", "Bultrik", "Smirrelin", "Pippelot", "Låssin", "Snirklar", "Klampin", "Vrimlor", "Gnubbelor", "Fixar", "Målsar", "Rikkels", "Tjockar", "Virrulin", "Spåntor", "Bubblor", "Nocker", "Smällor", "Järnsmek", "Tofflin", "Krämpus", "Vippelin", "Flädderik", "Knirrlin", "Pysselman", "Rullerik", "Skruvlin", "Tusslin", "Vinkor", "Mufflon", "Grubb"];


const nameWomanGnome =
	["Bimpnella", "Trixie", "Norna", "Wizzlea", "Brambella", "Glimma", "Nocka", "Tinka", "Rambina", "Cobba",
	"Fenna", "Jorla", "Marnie", "Woddina", "Grinda", "Tibba", "Snorla", "Quinny", "Brambina", "Nimla",
	"Torka", "Whimsy", "Gadgeta", "Norla", "Tobba", "Fizzla", "Cobbina", "Fenella", "Jibba", "Marla",
	"Zooka", "Wizzette", "Grimbella", "Tibbinna", "Snizzla", "Quibba", "Brimsy", "Nimsy", "Torka", "Whizzla",
	"Glimsy", "Norba", "Tobbina", "Fizzy", "Rizzla", "Cogglea", "Fenna", "Jorina", "Marnella", "Wobba",
	"Gribbina", "Tibbera", "Snippa", "Quizzla", "Brabbina", "Nimkinna", "Torkina", "Whimlina", "Gadgetta", "Norwina",
	"Tobella", "Rambella", "Cogga", "Fenrika", "Jibbina", "Marnetta", "Wizzina", "Grambina", "Tibberina", "Snorka",
	"Quintina", "Brimlina", "Nimzella", "Torketta", "Zibella", "Whimetta", "Glimmira", "Norina", "Tobberina", "Fizzetta",
	"Rizzina", "Cogwina", "Fenlina", "Jorwina", "Marnora", "Zindella", "Wobblina", "Grimlina", "Tibzella", "Snibella",
	"Quibella", "Brimora", "Nimblina", "Torkora", "Zibora", "Whimora", "Glimora", "Norora", "Tobora", "Fizzora",
	"Rizzora", "Cogora", "Fenora", "Jorora", "Marnora", "Zindora", "Wobblora", "Grimora", "Tibora", "Snibora",
	"Quintora", "Brambora", "Nimora", "Torkina", "Whimlora", "Glimlora", "Norwora", "Tobwina", "Fizzwina", "Rambora",
	"Cobblina", "Fenwina", "Jibbora", "Marnwina", "Wizzlina", "Gribora", "Tibblina", "Snorkina", "Quintina", "Brimwina",
	"Nimwina", "Torkwina", "Whimwina", "Glimwina", "Norwina", "Tobwina", "Fizzwina", "Rizzwina", "Cogwina", "Fenwina",
	"Jorwina", "Marnwina", "Zindwina", "Wobblina", "Grimwina", "Tibwina", "Snibwina", "Quibwina", "Brimwina", "Nimwina",
	"Torkwina", "Whimwina", "Glimwina", "Norwina", "Tobwina", "Fizzwina", "Rizzwina", "Cogwina", "Fenwina", "Jorwina",
	"Marnwina", "Zindwina", "Wobblina", "Grimwina", "Tibwina", "Snibwina", "Quibwina", "Brimwina", "Nimwina", "Torkwina","Knoppa", "Tipplina", "Vinklia", "Grumma", "Smäckli", "Rizzan", "Krytta", "Fjuttra", "Gnubba", "Pyssela", "Tottila", "Fiskra", "Kuggel", "Virra", "Mekla", "Fimbia", "Klemna", "Prassla", "Snickra", "Jinkla", "Bromlia", "Klinkia", "Fjumba", "Bultra", "Smirra", "Piprina", "Låssa", "Snirkla", "Klampina", "Vrimma", "Gnubina", "Fixina", "Målora", "Rikkela", "Tjockla", "Virrina", "Spånta", "Bubbla", "Nocklina", "Smälla", "Järnvina", "Toffla", "Krämpia", "Vippa", "Flicklia", "Knirra", "Pysmeria", "Rulla", "Skruvina", "Tussla", "Vinklora", "Muffia", "Grubba", "Knyckla", "Blinka", "Snärta", "Kloria", "Vippa", "Svinnia", "Jubbela", "Bråta", "Kolvia", "Mekkela", "Pinna", "Skrapla", "Tjalla", "Vantusa", "Fladda", "Knubba", "Smickla", "Bumlia", "Gnistra", "Jöckla", "Knytla", "Luddra", "Mossa", "Nabba", "Ockra", "Pysseli", "Rabba", "Slickra", "Snabela", "Taffla", "Timmina", "Trollda", "Växla", "Bälgia", "Knallela", "Myssela", "Smuttla", "Fjumla", "Gnorra", "Jittra", "Knekta", "Lunka", "Muffla", "Nalla", "Pippeli", "Raskra", "Skutta", "Slinka", "Snodda", "Tafsa", "Tjudra", "Trulla", "Vättla", "Ärtan", "Björnia", "Glänta", "Hackla", "Järnela", "Kroka", "Lera", "Mulla", "Nabba", "Ollia", "Rabba", "Skäggia", "Slamra", "Snurra", "Stenva", "Tärna", "Tjärna", "Vargna", "Vikla", "Flisina", "Kuggena", "Nissa", "Rasselina", "Snoddis", "Tippelia", "Vinklina", "Glufsia", "Smäcklina", "Knåpina", "Fjuttina", "Pysselina", "Tottlina", "Flisnera", "Kuggbina", "Virmusa", "Mekna", "Fimblina", "Klämmia", "Prasslora", "Snattlina", "Jinkelina", "Bromsina", "Klinkra", "Fjumlera", "Bultra", "Smirrila", "Pippelora", "Låssina", "Snirklora", "Klampina", "Vrimlora", "Gnubbelora", "Fixora", "Målsira", "Rikkels", "Tjockera", "Virrula", "Spånta", "Bubblora", "Nockra", "Smällora", "Järnsmera", "Tofflora", "Krämpusa", "Vippelina", "Flädderina", "Knirrla", "Pysselina", "Rullerina", "Skruvla", "Tusslina", "Vinkorina", "Mufflora", "Grubbina"];


const nameManHalfling =
	["Albo", "Bram", "Coryn", "Derry", "Eldon", "Finnan", "Gilly", "Hob", "Iven", "Jasper",
	"Kip", "Lyle", "Milo", "Ned", "Orrin", "Perrin", "Quin", "Rory", "Samlin", "Tobin",
	"Uric", "Vann", "Wes", "Xander", "Yorick", "Zane", "Arlo", "Benny", "Cedric", "Dale",
	"Elric", "Fergus", "Garrin", "Huck", "Ira", "Jory", "Kellen", "Ludo", "Merrin", "Nico",
	"Odo", "Pip", "Quentin", "Rafe", "Silo", "Tanner", "Ulric", "Vern", "Wiley", "Xeno",
	"Yule", "Zeke", "Alden", "Barley", "Clint", "Derryk", "Ewan", "Flick", "Garrick", "Hobbit",
	"Iggy", "Jasperin", "Klem", "Larkin", "Merrick", "Norbit", "Orin", "Perry", "Quill", "Rondo",
	"Silas", "Tobias", "Ulan", "Viggo", "Wim", "Xan", "Yorin", "Zander", "Alric", "Bramble",
	"Colin", "Dobb", "Eldonor", "Fenn", "Gibber", "Hollis", "Iver", "Jonty", "Kipwick", "Lem",
	"Miloen", "Norrin", "Ollie", "Pax", "Quibble", "Rufus", "Sammel", "Tibby", "Upton", "Varrin",
	"Weslin", "Xavian", "Yarrow", "Zib", "Auber", "Bardin", "Crispin", "Derryson", "Eddin", "Froder",
	"Griff", "Hobbin", "Ilan", "Joryn", "Kester", "Lyleton", "Merril", "Nim", "Orrick", "Pippin",
	"Quen", "Renn", "Sibbin", "Tobber", "Ulwin", "Vint", "Warrin", "Xell", "Yannic", "Zollin",
	"Afton", "Burl", "Clem", "Derrykson", "Eldonik", "Flicker", "Garrinor", "Hucklin", "Ivenor", "Jasperik",
	"Kiplin", "Ludor", "Merrinor", "Nicon", "Odric", "Perrik", "Quinton", "Roryn", "Samlor", "Tobinor",
	"Uricson", "Vannor", "Weslor", "Xandor", "Yorlin", "Zanwick", "Arlow", "Benwick", "Cedrin", "Dalor",
	"Elrick", "Ferguson", "Garrickson", "Huckle", "Iram", "Jorlin", "Kellenor", "Ludwick", "Merrickson", "Nicolin",
	"Odon", "Pipson", "Quentinor", "Rafor", "Silow", "Tannor", "Ulricson", "Vernor", "Wile", "Xenor",
	"Yulor", "Zeklin", "Alben", "Barlow", "Clinton", "Derrin", "Ewanor", "Flickson", "Gibberin", "Hobber",
	"Iggin", "Jaspin", "Klemor", "Lark", "Merriton", "Norbiton", "Orwin", "Perriton", "Quillor", "Rondor","Pipkin", "Hamblin", "Fimble", "Diggle", "Ruffin", "Cobb", "Gaff", "Harrow", "Mutter", "Pylon", "Thistle", "Wimble", "Grig", "Flicker", "Barlowe", "Corwin", "Dimple", "Elmer", "Fenton", "Garret", "Hobbes", "Iggins", "Jaxon", "Kell", "Lorin", "Murrin", "Nevin", "Otis", "Padfoot", "Quince", "Riggle", "Sedgwick", "Timmy", "Usher", "Vallis", "Winston", "Xylon", "Yavin", "Zephyr", "Alf", "Burlin", "Cassel", "Dodd", "Elwood", "Farrow", "Gibbon", "Halford", "Isen", "Joss", "Kenton", "Leif", "Marlow", "Nimrod", "Obi", "Padden", "Quincey", "Radkin", "Silvester", "Tuppence", "Udwin", "Vinson", "Whittle", "Xaver", "Yancy", "Zeff", "Ansel", "Barth", "Crumble", "Digby", "Eamon", "Finnie", "Goodwin", "Hampton", "Idris", "Jeb", "Kirby", "Lester", "Mott", "Newman", "Orwell", "Patten", "Quinton", "Rafferty", "Sling", "Tolman", "Underhill", "Vitus", "Wimbley", "Xylen", "Yavinor", "Zeth", "Alton", "Barnaby", "Clover", "Downes", "Edgar", "Flint", "Granger", "Hobson", "Ingram", "Jervis", "Knox", "Litton", "Mortimer", "Nevinor", "Odran", "Pym", "Quigley", "Randal", "Silbert", "Tarkin", "Utter", "Vance", "Wren", "Xylo", "Yarrowin", "Zeb", "Ambrose", "Brom", "Candle", "Dorian", "Emmet", "Forrest", "Griswold", "Harwin", "Ivy", "Janner", "Kit", "Lum", "Marvin", "Nod", "Olin", "Packer", "Quirk", "Rowan", "Sigil", "Thane", "Urwin", "Vesper", "Wilbur", "Xylonin", "Yendal", "Zinn", "Ankin", "Bramblet", "Corbin", "Duffin", "Elkin", "Fimblet", "Gavin", "Harper", "Iverin", "Jorry", "Kyler", "Ludwig", "Merriman", "Nib", "Ollin", "Patty", "Quincy", "Rocco", "Sutton", "Taffy", "Umbel", "Verrin", "Wick", "Xanthos", "Yorvin", "Zebulon", "Barder", "Crispinor", "Dobbin", "Elwooder", "Fennick", "Gibbs", "Hollisey", "Isk", "Jonty", "Kipsey", "Larkson", "Merrimac", "Nodder", "Olwin", "Paxon", "Quib", "Rudd", "Sander", "Tibb", "Upland", "Varnor", "Wess", "Xanthor", "Yarro", "Zibbin"];


const nameWomanHalfling =
	["Alma", "Bree", "Clover", "Daisy", "Ella", "Fenna", "Ginny", "Hattie", "Isla", "Juna",
	"Kira", "Lina", "Mira", "Nell", "Olive", "Penny", "Quilla", "Rosie", "Sally", "Tilda",
	"Una", "Vivi", "Wren", "Xena", "Yara", "Zinnia", "Annie", "Bess", "Cora", "Dotty",
	"Elsie", "Flicka", "Greta", "Hazel", "Ivy", "Josie", "Kelda", "Lottie", "Mabel", "Nora",
	"Oona", "Pippa", "Queenie", "Rilla", "Sibby", "Tansy", "Ula", "Vera", "Winnie", "Xyla",
	"Yvette", "Zara", "Ayla", "Brina", "Cassie", "Darla", "Etta", "Faye", "Goldie", "Holly",
	"Ina", "Jilly", "Kessie", "Lana", "Mina", "Nixie", "Opal", "Petra", "Quinny", "Rosa",
	"Suki", "Tessa", "Ursie", "Vina", "Willa", "Xandra", "Ysolde", "Zelie", "Arla", "Bina",
	"Cress", "Dina", "Emmy", "Fritta", "Gilda", "Henny", "Ilka", "Junae", "Kirae", "Luma",
	"Maura", "Nessa", "Orla", "Posy", "Quira", "Romi", "Sela", "Tildae", "Ulia", "Vixie",
	"Wenna", "Xalia", "Ylva", "Zadie", "Aubrey", "Blythe", "Cami", "Delia", "Eloise", "Fennae",
	"Gwen", "Hollie", "Iris", "Jovie", "Kyla", "Liora", "Marnie", "Nolie", "Odette", "Prim",
	"Questa", "Rhea", "Saffy", "Tansie", "Uliah", "Vanya", "Wynnie", "Xenna", "Yasmine", "Zibby",
	"Amara", "Bea", "Calla", "Dottie", "Eira", "Fina", "Gertie", "Hilda", "Ila", "Jessa",
	"Kina", "Lettie", "Milly", "Nani", "Oriel", "Pansy", "Quenna", "Rina", "Sunnie", "Trixie",
	"Usha", "Vela", "Wynna", "Xavia", "Yarae", "Zella", "Ailis", "Bryn", "Cinda", "Dulcie",
	"Elka", "Fiora", "Gilly", "Hollin", "Ivyra", "Junaia", "Kessia", "Lunie", "Mirae", "Nimra",
	"Olivie", "Perrie", "Quinra", "Raisa", "Sira", "Tessie", "Uliah", "Vixra", "Wrenna", "Xylae","Blossom", "Poppy", "Eglantine", "Juniper", "Lavender", "Marigold", "Primrose", "Saffron", "Thyme", "Willow", "Briar", "Cloverly", "Dewdrop", "Fern", "Glimmer", "Hollyhock", "Irisa", "Jessamine", "Lilybelle", "Meadow", "Nettle", "Petal", "Roisin", "Sprig", "Tuft", "Violetta", "Wisp", "Yarrow", "Zinnia", "Amaryllis", "Bellflower", "Celandine", "Daffodil", "Erica", "Fuchsia", "Goldenrod", "Heather", "Isabella", "Jasmine", "Kelsy", "Leonie", "Muriel", "Nanette", "Odile", "Pansela", "Quincey", "Rosalie", "Siena", "Tabitha", "Ursulina", "Valerie", "Winona", "Xyla", "Yvanna", "Zora", "Adelie", "Brenna", "Chryssa", "Della", "Elara", "Fiona", "Gemma", "Hanna", "Ilsa", "Jenna", "Kelsey", "Loretta", "Marnina", "Nedra", "Olina", "Prudence", "Quinna", "Rianna", "Sabina", "Teagan", "Ulrica", "Vivian", "Willa", "Xenia", "Yselda", "Zelda", "Audra", "Betony", "Caitlin", "Danica", "Elorie", "Felicia", "Glynnis", "Harriet", "Imogen", "Juliana", "Kerensa", "Lyssa", "Maisie", "Ninette", "Oralie", "Parthenia", "Quillina", "Reina", "Seraphina", "Talia", "Undina", "Vesper", "Wilhelmina", "Xylona", "Yuna", "Zinnia", "Alida", "Bronwyn", "Cleo", "Daphne", "Eilis", "Flora", "Giselle", "Heidi", "Iona", "Jillian", "Kezia", "Lois", "Madge", "Nyssa", "Octavia", "Periwinkle", "Quirina", "Rowena", "Sheena", "Tamsin", "Ursa", "Vianne", "Winifred", "Xanthe", "Ysoria", "Zosia", "Anwen", "Bridie", "Cecily", "Delphine", "Eliza", "Florence", "Gillian", "Honora", "Ives", "Joy", "Kendra", "Lucinda", "Maris", "Neila", "Olympia", "Pandora", "Quinnia", "Rubina", "Shona", "Tilda", "Umi", "Viola", "Wynn", "Xara", "Yola", "Zelia", "Anya", "Clementine", "Dahlia", "Elma", "Fiona", "Greta", "Heidi", "Ida", "June", "Kaitlin", "Laura", "Margot", "Nina", "Olive", "Patrice", "Queta", "Riona", "Susan", "Thea", "Willow", "Yvonne", "Rosetta", "Sorcha", "Twyla", "Valora", "Xylia", "Yarida"];


const nameManOrc =
	["Akh'zul", "Brogdan", "Karnak", "Zul'gar", "Threnk", "Mogdur", "Varkun", "Dren'gar", "Skorvak", "Uthrek",
	"Gral'thor", "Drogash", "Kelgor", "Rug'mar", "Thokren", "Zarnor", "Geh'naghet", "Brakthar", "Kor'dan", "Ulgor",
	"Tharnok", "Vrogash", "Durnek", "Krothak", "Zugren", "Marnok", "Orvash", "Threlgor", "Gor'mek", "Ruk'thar",
	"Zorvak", "Brek'tan", "Ugaron", "Krel'dak", "Throgun", "Varnok", "Drakzul", "Krogar", "Zul'jin", "Grenthak",
	"Thurmak", "Rhazgor", "Mok'thul", "Drogmar", "Karn'zul", "Zug'thar", "Vorgrim", "Thok'gar", "Brug'mak", "Skarn",
	"Urgan", "Gorveth", "Zul'karn", "Thrakor", "Dren'gul", "Kro'mar", "Varneth", "Rugorim", "Tharn'gul", "Zogar",
	"Grak'thul", "Uth'mek", "Brugor", "Kel'zan", "Throgar", "Zul'veth", "Marn'gar", "Drok'thar", "Karn'gul", "Vor'thak",
	"Skarnok", "Threl'mar", "Gor'drak", "Zarn'gul", "Ulgath", "Brak'mor", "Dren'zul", "Kro'mek", "Thok'zul", "Vorgath",
	"Rhaz'mek", "Zug'tan", "Gral'kor", "Tharn'zul", "Mog'gar", "Kel'gor", "Uth'gar", "Brug'thor", "Krel'zan", "Zul'rok",
	"Throg'mar", "Drok'zul", "Karn'veth", "Vor'mek", "Skor'thar", "Threl'gar", "Gor'zan", "Zarnok", "Ulgorim", "Brak'thul",
	"Dren'gar", "Kroth'mar", "Zugorim", "Grenth'mek", "Tharn'gar", "Mog'zul", "Kel'drak", "Uth'zul", "Brug'mor", "Krel'gar",
	"Zul'vok", "Throgor", "Drok'mek", "Karn'rok", "Vor'zul", "Skarnor", "Threl'thar", "Gor'mor", "Zarn'veth", "Ulgathor",
	"Brak'zul", "Dren'vok", "Kro'mor", "Zug'thor", "Gral'veth", "Tharnokor", "Mog'drak", "Kel'vok", "Uth'garon", "Brug'zul",
	"Krel'thor", "Zul'drak", "Throg'vok", "Drok'mor", "Karn'zulor", "Vor'gar", "Skor'zul", "Threl'vok", "Gor'zul", "Zarn'gar",
	"Ulgorak", "Brak'veth", "Dren'zulor", "Kroth'gar", "Zug'mar", "Grenth'zul", "Tharn'vok", "Mog'garon", "Kel'zulor", "Uth'vok",
	"Brug'gar", "Krel'mor", "Zul'garon", "Throg'zul", "Drok'gar", "Karn'garon", "Vor'zulor", "Skarn'zul", "Threl'zulor", "Gor'garon",
	"Zarn'zulor", "Ulgor'zul", "Brak'garon", "Dren'garon", "Kroth'zulor", "Zug'garon", "Gral'zulor", "Tharn'garon", "Mog'zulor", "Kel'garon","Grom'mash", "Haggar", "Kruglak", "Nazgul", "Shagrat", "Dargul", "Grimgor", "Mozar", "Ragnarok", "Thukk", "Vorlag", "Zargoth", "Bogruk", "Drakon", "Fezzik", "Grelok", "Hurok", "Kriggor", "Lorthak", "Morgash", "Nok'dar", "Ogron", "Ruk'tag", "Skalok", "Thrall", "Uraz", "Vrak'ul", "Yarzul", "Zorak", "Bregan", "Durgul", "Fargoth", "Grognak", "Hag'mar", "Korgan", "Lut'rok", "Mazog", "Nargul", "Orzuk", "Ruk'zor", "Skarug", "Thorgul", "Urzog", "Vargul", "Yug'zul", "Zog'mar", "Borgar", "Drok'nar", "Fulgur", "Grimfang", "Hargor", "Kresh", "Luz'gar", "Mazrak", "Narok", "Oskar", "Ruzzok", "Skulldug", "Thrug", "Urzak", "Vashkar", "Yurgoth", "Zarkon", "Brolak", "Drulg", "Furon", "Gurtak", "Hozgar", "Krom", "Lagnor", "Mogrok", "Nuglug", "Ozak", "Rokh'mar", "Skullok", "Thrumak", "Urzul", "Vezgar", "Yarrag", "Zashnar", "Ak'thul", "Brolg", "Drozgul", "Grolak", "Hag'zul", "Kargh", "Khelgar", "Lurgh", "Mok'gul", "Nug'thak", "Othrak", "Rog'mar", "Shak'tar", "Skorgul", "Thrazg", "Uldak", "Vornak", "Yargul", "Zarr", "Bramag", "Drognak", "Frolak", "Grotok", "Hordak", "Krogg", "Lok'nar", "Mazogrim", "Nerok", "Ormak", "Rulgak", "Shazbot", "Skrug", "Thrallok", "Urdak", "Vrakna", "Yazgul", "Zegran", "Barthok", "Drozak", "Fruul", "Gruk", "Hulk", "Kralg", "Marthok", "Nartok", "Olgak", "Ruznak", "Shazgul", "Skarth", "Throk", "Ur'lok", "Vargulak", "Yogg", "Zargothak", "Argok", "Barlak", "Duzar", "Gargok", "Hulgren", "Krak", "Lorgash", "Marzuk", "Nar'zul", "Ogrim", "Ruzzak", "Shrak", "Skrag", "Thrazok", "Ugron", "Vulgur", "Yoruk", "Zarthus", "Brosh", "Drakul", "Gorok", "Kargul", "Lokharr", "Moghul", "Nagash", "Orgrim", "Ruk'zar", "Skorth", "Thraznar", "Umgak", "Vrak'zar", "Yugul", "Zulthar"];


const nameWomanOrc =
	["Grasha", "Thurna", "Drogna", "Karna", "Morga", "Rukka", "Zarna", "Broga", "Hurga", "Varna",
	"Draka", "Gorima", "Thoka", "Rogara", "Kraga", "Uthara", "Bruga", "Zogara", "Marna", "Thruka",
	"Korga", "Durna", "Grola", "Varka", "Throga", "Zugra", "Braka", "Harna", "Kurga", "Droga",
	"Tharnika", "Gruma", "Roka", "Morgara", "Zarnika", "Thurga", "Karnika", "Brugra", "Drogatha", "Goraka",
	"Tharnora", "Rugara", "Zuga", "Kroga", "Marnika", "Thraka", "Grashora", "Varnika", "Drugara", "Hurgana",
	"Throgara", "Brakara", "Zarnora", "Krotha", "Durnika", "Gorgrima", "Tharnaka", "Rogarina", "Kragora", "Uthraka",
	"Brugatha", "Zogarina", "Marnora", "Thrukara", "Korgrima", "Durnaka", "Grolgara", "Varkora", "Throgatha", "Zugraka",
	"Braknora", "Harnika", "Kurgatha", "Drogarina", "Tharngrina", "Grumora", "Rokgara", "Morgarina", "Zarnoraka", "Thurgatha",
	"Karnora", "Brugrima", "Drogora", "Gorgrima", "Tharnakara", "Rugraka", "Zugoraka", "Krogrima", "Marnaka", "Thrakora",
	"Grashoka", "Varnora", "Drugara", "Hurgoka", "Throggrima", "Brakgara", "Zarnoka", "Krogarina", "Durngrima", "Goraknora",
	"Tharnokara", "Rogargrima", "Kragoka", "Utharoka", "Brugoka", "Zogargrima", "Marnokara", "Thrukgrima", "Koragara", "Durnora",
	"Grolgrima", "Varkgrima", "Throgoka", "Zuggrima", "Brakgrima", "Harnora", "Kurgoka", "Drogargrima", "Tharnoraka", "Grumgrima",
	"Rokgrima", "Morgaroka", "Zarngrina", "Thurgoka", "Karnokara", "Bruggrima", "Droggrima", "Gorgrin", "Tharnaka", "Ruggrima",
	"Zugraka", "Krogrin", "Marngrina", "Thrakgrima", "Grashgrima", "Varnokara", "Druggrima", "Hurggrima", "Throgaraka", "Brakoka",
	"Zarnokara", "Krogargrima", "Durngrinora", "Gorakgrima", "Tharngrinora", "Rogargrinora", "Kraggrima", "Uthraka", "Brugraka", "Zogargrinora",
	"Marnokgrima", "Thrukara", "Korgrinora", "Durnakgrima", "Grolgrinora", "Varkgrinora", "Throggrinora", "Zuggrinora", "Brakgrinora", "Harnokgrima",
	"Kurggrima", "Drogargrinora", "Tharnorgrima", "Grumgrinora", "Rokgrinora", "Morgargrinora", "Zarnorgrima", "Thurggrima", "Karnorgrima", "Bruggrinora",
	"Droggrinora", "Gorgringrim", "Tharnakgrima", "Ruggrinora", "Zugrakgrima", "Krogringrim", "Marngrinora", "Thrakgrinora", "Grashgrinora", "Varnokgrinora","Shagga", "Mugga", "Vreka", "Zulfa", "Throgga", "Nargra", "Krigga", "Dargula", "Grotta", "Huroka", "Kruglana", "Lortana", "Mozara", "Ogra", "Ruk'sha", "Skagga", "Threka", "Ulra", "Varga", "Yarrna", "Zogra", "Braga", "Durgaza", "Felgra", "Grellna", "Hagga", "Krona", "Luzgra", "Mazga", "Naroka", "Orzuka", "Rugma", "Skala", "Thorga", "Urazna", "Vrakna", "Yugra", "Zulmara", "Bagra", "Droka", "Fulga", "Grimfa", "Hargra", "Kresha", "Lagnara", "Mogza", "Nugluga", "Ozma", "Rokka", "Skullna", "Thruga", "Urzula", "Vasha", "Yurgra", "Zarla", "Brokla", "Drulga", "Furona", "Gurtra", "Hozga", "Kromma", "Lagna", "Mogra", "Nugra", "Ozna", "Rokkha", "Skulla", "Thruma", "Urzla", "Vezga", "Yaraga", "Zashna", "Akhila", "Brolga", "Drozga", "Grola", "Hagmar", "Kargha", "Khelga", "Lurga", "Mok'na", "Nug'la", "Othra", "Rogna", "Shakta", "Skogra", "Thrazga", "Uldra", "Vorna", "Yagra", "Zarana", "Bramga", "Droga", "Frola", "Grotta", "Horda", "Krogna", "Lokna", "Mazgra", "Nera", "Orma", "Rulga", "Shazba", "Skruga", "Thralla", "Urdra", "Vrakna", "Yazgra", "Zegrina", "Bartha", "Drozna", "Fruula", "Gruka", "Hulka", "Kralga", "Marthra", "Narta", "Olga", "Ruzna", "Shazga", "Skartra", "Throka", "Ulraka", "Vargna", "Yogga", "Zarga", "Argla", "Barlana", "Duzara", "Garga", "Hulga", "Kraka", "Lorga", "Marza", "Narza", "Ogrina", "Ruzza", "Shraka", "Skraga", "Thraza", "Ugra", "Vulga", "Yorga", "Zarthra", "Brosha", "Drakula", "Gorga", "Kargula", "Lokharra", "Moghula", "Nagga", "Orgrima", "Rukza", "Skortha", "Thrazna", "Umga", "Vrakza", "Yugla", "Zulthara", "Akna", "Borgra", "Durgla", "Ferna", "Gluga", "Hurda", "Kortha", "Lygra", "Morzula", "Nogra", "Orga"];

function getSurname(race) {
  const raceLower = race ? race.toLowerCase() : "human";

  const surnamesByRace = {
    // --- MÄNNISKOR (~90% karga/tunga släktnamn, ~10% prefix) ---
	"human": [
	  // --- Karga, Tunga & Riktigt Unika Släktnamn (UTAN prefix) ---
	  "Molder", "Keldorff",
	  "Skarke", "Karnasp", "Vender", "Garn",
	  "Tross", "Drevstam", "Marnell", "Volden", "Krusander",
	  "Brante", "Seldorff", "Brakel", "Vinterdahl", "Mander",
	  "Kardus", "Korsell", "Vasker", "Riderstedt", "Hildeman",
	
	  "Kranck", "Varlen", "Marnis", "Söderling", "Starke",
	  "Barke", "Torgander", "Skarin", "Murelius", "Valendor",
	  "Dalkrantz", "Marnelius", "Korsander", "Vandell", "Seldin",
	  "Tharnander", "Drevander", "Valenkrans", "Molderus", "Brynander",
	  "Trosser", "Venderus", "Manderling", "Korsman", "Brakelius",
	
	  "Malakor", "Gripengrim", "Sartorius", "Karkovitch", "Vanecrest",
	  "Balthazar", "Dorn", "Vandilgard", "Mornenstern", "Skardefors",
	  "Trevander", "Kaldras", "Vandergast", "Maelström", "Brakelwald",
	  "Nattramn", "Zander", "Beringer", "Drakenfalk", "Skarpenfelt",
	
	  "Garnier", "Vandegrift", "Kallok", "Sorn", "Trossian",
	  "Marnagard", "Drevikoff", "Brakensvärd", "Valenius", "Seldic",
	  "Karkov", "Tharner", "Vaskman", "Ravnander", "Moldergard",
	  "Korsenius", "Beldar", "Skardius", "Vaneberg", "Torgel",
	  "Drevicus", "Mobergman", "Korsin", "Brakander", "Vanderlyn",
	
	  "Satsenius", "Vrikkander", "Karnov", "Tharnic", "Muelen",
	  "Vaskovitch", "Riderius", "Dornelius", "Seldian", "Balthus",
	  "Garnius", "Marnenius", "Brakian", "Torgander", "Vrikander",
	  "Brekkenus", "Satsov", "Karkus", "Mornen", "Vondar",
	
	  "Korser", "Drevian", "Beldander", "Vaskius", "Ravner",
	  "Kardian", "Varner", "Tharnerius", "Brakan", "Seldovitch",
	  "Marnian", "Vondian", "Korsovitch", "Drevovitch", "Vaskerov",
	  "Ravnovitch", "Krellex", "Torgovitch", "Garnovitch", "Vanevitch",
	
	  "Beldovitch", "Karkovitch", "Brekkov", "Satsovitch", "Molderian",
	  "Keldorffian", "Venderian", "Korsellian", "Vinterdian", "Morellian",
	  "Kranckian", "Skarkian", "Marnellian", "Söderlingian", "Manderian",
	  "Kardusian", "Drevstamian", "Brantian", "Brakelian", "Voldenian",
	
	  "Seldorffian", "Tornian", "Mobergian", "Vaskian", "Dahlbergian",
	  "Korslingian", "Starkian", "Barkian", "Drakian", "Torgian",
	  "Skarinian", "Murelian", "Valendorian", "Brakanderian", "Kardellian",
	  "Dalkrantzian", "Marnelian", "Korsanderian", "Vandellian", "Seldinian",
	  "Molberg", "Keldran", "Skarnell", "Kardevik", "Vandrus", "Garmell", "Trosvik", "Drevorn", "Marnesk", "Voldran", "Krusvall", "Branter", "Seldrak", "Braskor", "Vinterell", "Mandrell", "Kardesk", "Korvall", "Vaskor", "Ridervall",
	  "Kranvell", "Varndor", "Marneskov", "Södervik", "Starkevall", "Barkevik", "Torgvall", "Skarnes", "Murelund", "Valendorf", "Dalkren", "Marnedor", "Korsvall", "Vandros", "Seldrakor", "Tharnesk", "Drevkorn", "Valenros", "Moldrann", "Brynedor",
	  "Trosvann", "Venderik", "Mandervoss", "Korsamir", "Brakelius", "Malendros", "Grimvask", "Sartorik", "Karkellan", "Vanecrestor", "Baltharion", "Dornesk", "Vandilross", "Mornestahl", "Skardevoss", "Trevaskor", "Kaldross", "Vandergorn", "Maelvorn", "Brakelund", "Nattrask", "Zandrell", "Berengar", "Drakenholt", "Skarpenroth", "Garnedor", "Vandegrost", "Kallorin", "Sornesk", "Trossgard", "Marnagorn", "Drevokar", "Brakensorn", "Valenrik", "Seldrakian", "Karkendor", "Tharneskov", "Vaskorin", "Ravendor", "Molderik", "Korsavian", "Beldrak", "Skardorin", "Vanevoss", "Torgellan", "Drevikar", "Mobergius", "Korsavian", "Brakendor", "Vandrell", "Satsorin", "Vrikkar", "Karnesk", "Tharnov", "Muelendor", "Vaskorin", "Riderov", "Dorneskian", "Seldarov", "Balthorian", "Garneus", "Marnov", "Brakar", "Torgelius", "Vrikkan", "Brekkenov", "Satsorian", "Karkarov", "Mornelius", "Vondrell", "Korsen", "Drevok", "Beldarov", "Vaskerian", "Ravnerov", "Kardov", "Varneus", "Tharnelius", "Brakorian", "Seldarion", "Marnovitch", "Vondarov", "Korsarian", "Drevokian", "Vaskerik", "Ravnovar", "Krelldor", "Torgovian", "Garnovian", "Vanevorn", "Beldorian", "Karkorian", "Brekkarov", "Satsorian", "Molderov", "Keldorv", "Venderov", "Korsellov", "Vinterov", "Morellov", "Kranckorian", "Skarkellian", "Marnellor", "Söderlingor", "Manderell", "Kardusor", "Drevstamell", "Brantorian", "Brakelorian", "Voldenor", "Seldorffor", "Tornellian", "Mobergor", "Vaskorian", "Dahlbergor", "Korslingor", "Starkorian", "Barkorian", "Drakorian", "Torgellian", "von Marnell", "de Vaskor", "von Drevian", "af Brakel", "de Garnov", "von Kardell", "di Mornestahl", "von Skardius", "af Vandrell", "de Torgell", "von Brakensvärd", "de Varndor", "von Seldrak", "af Karkus", "de Vondar", "von Murelian", "di Valenkrans", "von Drakenholt", "af Satsov", "de Krellex",
	  
	
	  // --- ~1/10 Med Prefix (Sällsynta & Exklusiva) ---
	  "von Molder", "de Valens", "von Keldorff", "af Tross", "de Garne",
	  "von Morello", "di Brynolf", "von Drakar", "af Skark", "de Vender",
	  "von Ridelberg", "de Mander", "von Varlen", "af Seldorff", "von Malakor",
	  "de Vandilgard", "von Dorn", "af Karkovitch"
	],
    // --- DVÄRGAR (Helt nya: Metaller, sten, klaner & djupa gruvor) ---
	"dwarf": [
	  // --- Adliga Ätter & Dynastier (Inspirerade av Dwarf Fortress / Anok Rer) ---
	  "Azakogan", "Koluzol", "Gattekil", "Tekurist", "Olinakuk",
	  "Kibdorur", "Tobasor", "Dethinod", "Rortobash", "Zulorist",
	  "Koganazad", "Tekoluk", "Gatdethur", "Azakibon", "Uristol",
	  "Dorfazak", "Azaolin", "Tobazur", "Kibtekil", "Roruzol",
	  "Gatoluk", "Kogandeth", "Uristob", "Dethazad", "Tekorur",
	
	  "Kolgatur", "Zultekil", "Olinurst", "Azadorf", "Tobkibon",
	  "Koluriz", "Gatekosh", "Tekolin", "Uristak", "Kibazor",
	  "Dethdorun", "Roruzob", "Azatek", "Tobolin", "Kogangat",
	  "Zulaza", "Dorfurit", "Olinkib", "Tekdeth", "Gatoliz",
	  "Olinazad", "Kiburist", "Detholin", "Tekazak", "Tobgat",
	
	  "Kogandorf", "Roruzal", "Gattekor", "Zuluriz", "Kibdethun",
	  "Azattek", "Dorfkibon", "Tekolinuk", "Uristazad", "Tobdethor",
	  "Kolurast", "Gatolin", "Rortekuk", "Kibazak", "Kogantob",
	  "Zultekor", "Dethurat", "Azaolinok", "Dorfuzol", "Tekuristur",
	  "Olintobash", "Kibgatur", "Gatdethiz", "Roraza", "Koganuriz",
	
	  "Tekdortob", "Azakibiz", "Uristolin", "Dethtekor", "Koluzad",
	  "Tobazak", "Kibtekuk", "Gatolizor", "Rortobur", "Zulazad",
	  "Koganurist", "Dorftekil", "Olindethun", "Tekaza", "Azaurist"
	],
    // --- ALVER (Uråldriga ätter, element, stjärnor & adlig elegans) ---
	"elf": [
	  // --- Uråldriga Alviska Ätter & Krusidullnamn ---
	  "Ael'Thalor", "Thael'Enor", "Vael'Kaelen", "Kael'Thas", "Fael'Thandir",
	  "Xael'Vandil", "Mael'Seraf", "Zael'Thir", "Rael'Vaelen", "Nael'Aeron",
	  "Shael'Vaelis", "Lael'Thalon", "Yael'Thoria", "Khael'Dharis", "Vael'Maelor",
	  "Ael'Varian", "Thael'Aethel", "Rael'Kaelis", "Zael'Rhael", "Nael'Thir",
	
	  "Sil'Vaelis", "Thal'Aethel", "Eal'Caelum", "Vael'Rhael", "Aer'Thas",
	  "Sael'Vondar", "Kael'Phar", "Lael'Vian", "Shael'Dalar", "Khael'Aeron",
	  "Sil'Thandir", "Thal'Vaelen", "Eal'Thoria", "Vael'Phar", "Aer'Varian",
	  "Sael'Dharis", "Kael'Seraf", "Lael'Dalar", "Shael'Vondar", "Yael'Vaelis",
	
	  "Valerion", "Aethelgard", "Sylvanderon", "Thalandor", "Serafimael",
	  "Vaelthorion", "Aerondael", "Kaeldoris", "Xanthael", "Phaerthan",
	  "Caelumdor", "Aurelianth", "Thalaseron", "Syltherion", "Maelorion",
	  "Vandilaris", "Elorionth", "Phaerithis", "Xanthirion", "Aethelaser",
	
	  "Ael'Dharis", "Thael'Varian", "Kael'Maelor", "Vael'Aeron", "Nael'Thalon",
	  "Rael'Kaelis", "Sael'Aethel", "Lael'Thir", "Xael'Rhael", "Zael'Vaelis",
	  "Khael'Vandil", "Shael'Enor", "Yael'Kaelen", "Ael'Seraf", "Thael'Thandir",
	  "Rael'Thalor", "Sael'Thias", "Lael'Maelor", "Xael'Dharis", "Zael'Varian"
	],
    // --- GNOMER (Precision, verktyg, klockgjutning & alkemi) ---
	"gnome": [
	  // --- Lärda, Kontinentala & Akademiska Släkter ---
	  "Glockner", "Lindeman", "Eisenkrantz", "Schuster", "Vogel",
	  "Aurelius", "Zander", "Faber", "Richten", "Bender",
	  "Pfeiffer", "Winkler", "Sprengel", "Kranz", "Molander",
	  "Braheman", "Rhodin", "Zeiss", "Sartorius", "Kastner",
	  "Celsius", "Schoen", "Burchard", "Helmholtz", "Mercator",
	
	  // --- Urmakar-, Kartograf- & Astronomdynastier ---
	  "Chronander", "Horolog", "Prismander", "Kuggelman", "Vinkelman",
	  "Linsander", "Pendelcreutz", "Nystedt", "Fokusman", "Glimmerstierna",
	  "Astrolab", "Kompander", "Loxander", "Sextander", "Mätarman",
	
	  // --- Borgerliga & Patriciella Hantverkssläkter ---
	  "Bultman", "Svarfvar", "Urmakar", "Kvartell", "Klingberg",
	  "Lodberg", "Gjutar", "Kvarnstedt", "Siktander", "Gyllenlins"
	],
    // --- HALFLINGS / KNATTAR (Jordbruksbyar, lantlig matkultur & natur) ---
	"halfling": [
	  // --- Gårdar, Ängar & Natur ---
	  "Kullander", "Lövängen", "Kornfält", "Hasselgren", "Skogsbacke",
	  "Mölleberg", "Dammängen", "Äppelqvist", "Ängsvall", "Lönnblad",
	  "Lindegård", "Hagtorn", "Smultronbacke", "Bäckadal", "Grönvall",
	  "Kornvall", "Åkerlund", "Hasselkvist", "Mosebacke", "Videgren",
	
	  // --- Hantverk, Gille & Bryggeri ---
	  "Bagarsson", "Bryggarsson", "Möllare", "Källarmästare", "Tunnbindare",
	  "Smörblom", "Mältare", "Skördeman", "Siktdahl", "Humlegård",
	
	  // --- Mjuka & Traditonsenliga Släktnamn ---
	  "Skålpund", "Ekbacke", "Kornander", "Lillestierna", "Åkerblad",
	  "Granvik", "Svalander", "Sjöfälth", "Blomkvist", "Vinterro"
	],
    // --- ORCHER / HALVORCHER (Klaner, krigsbyten & rå brutalitet) ---
    "orc": [
	  // --- Uråldriga & Adliga Klan- / Ättenamn (75% av poolen) ---
	  "Gha'rhan", "Khor'vash", "Mhur'zak", "Drak'thur", "Vaz'gulg",
	  "Ush'khor", "Gha'zul", "Braz'kor", "Khrag'dor", "Rza'khan",
	  "Zhar'khal", "Ghor'dak", "Voz'mhar", "Dhar'kash", "Urh'gal",
	  "Khur'zol", "Vra'gath", "Zhur'kan", "Gha'mhor", "Khrag'mhar",
	  "Braz'khal", "Drak'vash", "Mhur'gath", "Ush'dhor", "Vaz'khan",
	
	  // --- Tunga, Karga & Stolta Släktnamn (25% av poolen) ---
	  "Blodsköld", "Järnklor", "Brynjeskär", "Stålflint", "Dunderkäft",
	  "Klippkäft", "Märgblod", "Stenknäck"
	]
  };

  // Matcha rasen
  let key = "human";
  if (raceLower.includes("dwarf")) key = "dwarf";
  else if (raceLower.includes("elf")) key = "elf";
  else if (raceLower.includes("gnome")) key = "gnome";
  else if (raceLower.includes("halfling")) key = "halfling";
  else if (raceLower.includes("orc")) key = "orc";

  const pool = surnamesByRace[key] || surnamesByRace["human"];
  
  return pool[Math.floor(Math.random() * pool.length)];
}
const RACE_RANGES = {
    "Human": {
        Man: { h: [160, 190], w: [75, 125] },
        Kvinna: { h: [155, 185], w: [60, 105] }
    },
    "Dwarf": {
        Man: { h: [135, 155], w: [85, 110] },
        Kvinna: { h: [130, 150], w: [75, 100] }
    },
    "Elf": {
        Man: { h: [170, 190], w: [55, 75] },
        Kvinna: { h: [160, 180], w: [45, 65] }
    },
    "Half-elf": {
        Man: { h: [165, 190], w: [70, 95] },
        Kvinna: { h: [160, 185], w: [55, 80] }
    },
    "Halfling": {
        Man: { h: [100, 115], w: [35, 45] },
        Kvinna: { h: [95, 110], w: [32, 42] }
    },
    "Gnome": {
        Man: { h: [115, 125], w: [45, 55] },
        Kvinna: { h: [110, 120], w: [42, 52] }
    }
};
function pickNickname(
	  gender = "Man",
	  race = "Human",
	  className = "Fighter",
	  height = 175,
	  weight = 75,
	  hairColor = "Svart",
	  facialHair = "Inget",
	  specialFeatures = []
	) {
	  // 35% chans att karaktären får ett smeknamn
	  if (Math.random() > 0.35) return null;
	
	  const pickNick = arr => arr[Math.floor(Math.random() * arr.length)];
	
	  // Grammatikjustering (maskulinum -e, femininum -a)
	  const isFemale = gender.toLowerCase() === "kvinna";
	  const adjEnd = isFemale ? "a" : "e";
	
	  const candidates = [];
	
	  // --- 1. RAS-RELATIV LÄNGD OCH VIKT ---
	  // Hämtar gränserna för ras + kön (fallback till Human om ras saknas)
	  const raceData = RACE_RANGES[race] || RACE_RANGES["Human"];
	  const genderKey = isFemale ? "Kvinna" : "Man";
	  const bounds = raceData[genderKey] || raceData["Man"];
	
	  // Räknar ut procentuell placering i spannet (0.0 = kortast möjliga, 1.0 = längst möjliga)
	  const heightPercent = (height - bounds.h[0]) / (bounds.h[1] - bounds.h[0]);
	  const weightPercent = (weight - bounds.w[0]) / (bounds.w[1] - bounds.w[0]);
	
	  // Om personen är i översta 20% av sin ras/kön -> "Lång-smeknamn"
	// --- 1. RAS-RELATIV LÄNGD OCH VIKT ---
	
	  // Om personen är i översta 5% av sin ras/kön -> "Lång-smeknamn"
	  if (heightPercent >= 0.95) {
	    candidates.push({
	      style: "epithet",
	      text: pickNick([
	        "Fyrtornet", "Stolpen", `Den Lång${adjEnd}`, "Tornet", "Jätten",
	        "Mastmasten", "Skyhög", "Eken", "Taknudda", "Skyskrapan",
	        "Långben", "Master", "Långskånk", "Staven", "Spiran",
	        "Himmelssträck", "Klivaren", "Pelaren", "Toppen", "Skuggspridaren"
	      ]),
	      weight: 3
	    });
	  }
	  // Om personen är i lägsta 5% av sin ras/kön -> "Kort-smeknamn"
	  else if (heightPercent <= 0.05) {
	    candidates.push({
	      style: "epithet",
	      text: pickNick([
	        "Kortis", "Tvärhanden", "Musen", "Sticklingen", "Lillen",
	        "Tummen", "Tuvan", "Pytten", "Gnistan", "Stubben",
	        "Krypet", "Smulan", "Lillten", "Knappen", "Plutten",
	        "Markkryp", "Skrubban", "Pysslingen", "Lillstrumpa", "Fröet"
	      ]),
	      weight: 3
	    });
	  }
	
	  // Tung/Tjock i förhållande till rasens spann (Topp 5%)
	  if (weightPercent >= 0.95) {
	    candidates.push({
	      style: "epithet",
	      text: pickNick([
	        "Björnen", "Klippan", "Tunnan", "Berget", "Oxen",
	        "Dunderklumpen", "Skåpet", "Muren", "Graniten", "Massan",
	        "Blocket", "Valen", "Tunga-Steg", "Tåget", "Krossen",
	        "Järnblocket", "Bjässen", "Skogen", "Tuggaren", "Klossen"
	      ]),
	      weight: 3
	    });
	  }
	  // Lätt/Smal i förhållande till rasens spann (Botten 5%)
	  else if (weightPercent <= 0.05) {
	    candidates.push({
	      style: "epithet",
	      text: pickNick([
	        "Kvisten", "Stickan", "Skuggan", "Fjädern", "Tråden",
	        "Halmstrået", "Vinden", "Dimman", "Nålen", "Sländan",
	        "Rörstrået", "Bladet", "Askungen", "Lufta", "Sparven",
	        "Spindelben", "Strået", "Papperslappen", "Risslan", "Skuggrännan"
	      ]),
	      weight: 3
	    });
	  }
	
	// --- 2. COMPOUND (Hår, Man, Fläta & Skägg) ---
	
	  const raceLower = race.toLowerCase();
	
	  // Anpassade hårtyper utifrån din raslista
	  let hairTypes = ["hår", "lockar", "man", "svalg"];
	
	  if (raceLower.includes("dwarf")) {
	    hairTypes = ["fläta", "man", "manke", "flätor", "hår"];
	  } else if (raceLower.includes("orc")) {
	    hairTypes = ["manke", "borst", "man", "hår"];
	  } else if (raceLower.includes("gnome") || raceLower.includes("halfling")) {
	    hairTypes = ["tofs", "lockar", "hår", "krona"];
	  } else if (raceLower.includes("elf")) {
	    hairTypes = ["svalg", "lockar", "slöja", "hår"];
	  }
	
	  const hairType = pickNick(hairTypes);
	
	  // Synonymer för hårfärgerna
	  const hairAdjMap = {
	    "Svart": ["Svart", "Kol", "Sot", "Natt", "Bläck", "Skugg", "Korp"],
	    "Mörkbrun": ["Brun", "Mörkbrun", "Jord", "Nöt", "Bark"],
	    "Ljusbrun": ["Ljusbrun", "Kastanje", "Hassels", "Mull"],
	    "Blond": ["Gyllene", "Guld", "Halm", "Sol", "Lin", "Bärnstens"],
	    "Röd": ["Röd", "Eld", "Koppar", "Rost", "Blod", "Tegel"],
	    "Kastanj": ["Kastanje", "Koppar", "Nöt", "Glöd"],
	    "Askblond": ["Ask", "Rök", "Dim", "Damm"],
	    "Grå": ["Grå", "Aska", "Bly", "Sten", "Skugg"],
	    "Vit": ["Vit", "Snö", "Is", "Frost", "Marmor", "Krita"],
	    "Silver": ["Silver", "Mån", "Gläns", "Krit"],
	    "Koppar": ["Koppar", "Glöd", "Malm", "Brons"]
	  };
	
	  const colorSynonyms = hairAdjMap[hairColor] || [hairColor];
	  const chosenAdj = pickNick(colorSynonyms);
	
	  // Skägg & Ansiktshår (om karaktären inte är kvinna)
	  if (!isFemale && facialHair && facialHair !== "Inget" && facialHair !== "Renrakad") {
	    const beardSynonyms = raceLower.includes("dwarf") 
	      ? ["skägg", "skägg", "praktskägg", "haka", "fläta"] 
	      : ["skägg", "skägg", "haka", "borst"];
	    
	    candidates.push({ style: "compound", text: `${chosenAdj}${pick(beardSynonyms)}`, weight: 2 });
	  }
	
	  // Huvudets hår
	  candidates.push({ style: "compound", text: `${chosenAdj}${hairType}`, weight: 2 });
	
	  // --- 3. PREFIX (Klass/Yrke) ---
	const classPrefix = {
	    Fighter: ["Klyvar", "Sköld", "Stål", "Kling", "Järn", "Brynju", "Pansar", "Parer", "Bryn", "Pigg", "Mässings", "Hugg", "Slag", "Spets", "Lans", "Krig", "Gadd", "Sabel", "Klinga", "Svärd", "Spjut", "Ladd", "Tung", "Mur", "Vakt", "Post", "Slagfält", "Märkes"],
	    
	    Cleric: ["Bön", "Ljus", "Helig", "Nåd", "Präst", "Mäss", "Glorie", "Salig", "Själ", "Guds", "Tro", "Altare", "Afton", "Kors", "Klock", "Kalk", "Korsfar", "Ljusstak", "Socken", "Skrift", "Välsignels", "Ängla", "Helgon", "Sanct"],
	    
	    Druid: ["Löv", "Rot", "Bark", "Mossa", "Kvist", "Svampe", "Eke", "Nässel", "Gran", "Törne", "Busk", "Gräs", "Storm", "Bäck", "Korp", "Björn", "Grov", "Skogs", "Dimma", "Åska", "Sjö", "Hulder", "Troll", "Sump", "Åker", "Vild"],
	    
	    Paladin: ["Ed", "Dygd", "Rätts", "Sanning", "Äro", "Ren", "Tapper", "Sköld", "Ljus", "Sol", "Järn", "Brynju", "Skimmels", "Slag", "Pansar", "Kling", "Mott", "Riddar", "Kors", "Guds", "Ängla", "Svärds", "Gyllene"],
	    
	    Ranger: ["Pil", "Spår", "Vind", "Skogs", "Snår", "Jakt", "Gran", "Klöv", "Steg", "Mossa", "Torn", "Snö", "Falk", "Båg", "Ulv", "Korp", "Hök", "Uggle", "Örn", "Hjort", "Snok", "Vessle", "Vass", "Träsk", "Stig", "Gömma", "Glänta", "Fäll"],
	    
	    Thief: ["Skugg", "Kvick", "Tjuv", "Smyg", "Natt", "Slank", "Slink", "Göm", "Tricks", "Skumm", "Tyst", "Dolk", "Lås", "Klink", "Snylt", "Fick", "Nål", "Gift", "Krok", "Sned", "Rök", "List", "Räv", "Slinger", "Väss", "Svinninge", "Rån", "Gata"],
	    
	    Bard: ["Sång", "Rim", "Harpe", "Flöjt", "Vers", "Trubad", "Ton", "Lyra", "Klang", "Trall", "Kvað", "Strid", "Silver", "Gyllene", "Tung", "Skratta", "Saga", "Skrytmåns", "Troll", "Charm", "Snack", "Sammets", "Mask", "Skämt", "Dans", "Gök", "Pajas"],
	    
	    Commoner: ["Slit", "Möck", "Slö", "Bonde", "Plog", "Hö", "Kåls", "Lagg", "Trä", "Sko", "Smed", "Mjölk", "Gröt", "Lort", "Sill", "Sopp", "Bröd", "Öl", "Fläsk", "Rot", "Skorv", "Snopp", "Trög", "Damm", "Late", "Babbel", "Gnet"]
	};
	
	  const prefixPool = classPrefix[className] || ["Sten", "Storm", "Järn"];
	  candidates.push({ style: "prefix", text: pickNick(prefixPool), weight: 2 });
	
	  // --- 4. SPECIALLER & KÄNNETECKEN ---
	// --- 4. SPECIALLER & KÄNNETECKEN ---
	  const featureEpithets = {
	    // Ärr och skador
	    "Ärr över kinden": ["Ärret", "Kindärret", "Strimman", `Den Ärrade`],
	    "Ärr vid ögat": [`Den Enögd${adjEnd}`, "Ögonärret", "Skuggögat"],
	    "Repa över näsan": ["Näsrepan", "Snittet", "Klyftan"],
	    "Brännmärke på handen": ["Brännrispan", "Elden", "Askan", "Märket"],
	    "Ärrat ögonbryn": ["Sprickan", "Brynklyft", "Ärrstriket"],
	    "Ärr längs käken": ["Käkärret", "Sabelstrecket", "Klingan"],
	    "Skärsår på halsen": ["Halsärret", "Snaran", "Strypstrecket"],
	    "Gamla stridsskador": ["Veteranen", "Krigsbrotte", "Skrotet", `Den Härdade`],
	    "Saknar ett finger": ["Niofingret", "Stubben", "Gropen"],
	    "Saknar en tand": ["Gulan", "Glipan", "Gluggen", "Tandlös"],
	    "Skadad näsa": ["Bocknäsan", "Trynet", "Krossen", "Bulten"],
	    "Halvblind": [`Den Enögd${adjEnd}`, "Dimman", "Skuggögat", "Kisen"],
	    "Stel nacke": ["Nacken", "Stelben", "Gipskroken"],
	    "Lätt haltande gång": ["Halte", "Kryckan", "Stappeln", "Snedsteg"],
	    "Krokigt finger": ["Kroken", "Klon", "Kvistfingret"],
	    "Tuggande på läppen": ["Läppbitarn", "Gnisslet", "Nervösen"],
	    "Konstant kisande": ["Kisaren", "Gluggen", "Skuggblicken"],
	    "Huvud som lutar åt sidan": ["Snedskallen", "Snedhalss", "Vinkeln"],
	
	    // Hud och pigment
	    "Fräknar": ["Fräknen", "Mjölet", "Stänkarn", "Pricken"],
	    "Födelsemärke": ["Fläcken", "Märket", "Stämpeln"],
	    "Leverfläck": ["Kopparn", "Skorven", "Fläcken"],
	    "Vit fläck": ["Marmorn", "Kritan", "Frosten"],
	    "Skiftande hudton": ["Kameleonten", "Skuggansikte", "Skiftarn"],
	    "Blemmor": ["Finne", "Skorven", "Koppan"],
	    "Rodnad": ["Blossarn", "Elden", "Sotaren", "Rödan"],
	    "Torr hud": ["Rasken", "Lädret", "Torkan", "Papperet"],
	    "Fjällande hud": ["Ormen", "Ödlan", "Fjällan", "Skorven"],
	    "Mörka ringar under ögonen": ["Nattugglan", "Vålnaden", "Sömnlös", "Skuggöga"],
	    "Glansig panna": ["Speglen", "Pannan", "Glimmarn"],
	
	    // Ögonvariationer
	    "Skelögd": ["Skelögd", "Korsögat", "Vinkeln"],
	    "Olika ögonfärger": ["Tvåfärg", "Uddeöga", "Guld-och-stål"],
	    "Glansiga ögon": ["Glimmern", "Pärlan", "Daggdroppen"],
	    "Halvslutna ögon": ["Sömnis", "Lättingen", "Glasklar"],
	    "Djupa ögonhålor": ["Kraniumet", "Dödsblick", "Hålan"],
	    "Tårkanaler som rinner": ["Snyftarn", "Tåren", "Bäcken"],
	    "Saknar ögonfransar": ["Nakenöga", "Öknen", "Glödöga"],
	    "Ögon som aldrig blinkar": ["Stirrarn", "Ödlan", "Ugglan", `Den Vaksamst${adjEnd}`],
	    "Isblå stirrande ögon": ["Isöga", "Frosten", "Vintern", "Gnistan"],
	    "Rödsprängda ögon": ["Kopparögat", "Blodöga", "Suddarn", "Glöden"],
	
	    // Ansiktsdrag
	    "Sneda tänder": ["Gaddarn", "Staketet", "Krokbiten"],
	    "Saknar ögonbryn": ["Släta", "Skallen", "Skuggansikte"],
	    "Djupa rynkor": ["Gamlingen", "Fåran", "Lädret", "Åldermannen"],
	    "Framträdande käklinje": ["Graniten", "Käken", "Stålkäken", "Städet"],
	    "Hög panna": ["Tänkaren", "Hjärnan", "Pannan", "Kullen"],
	    "Asymmetriskt ansikte": ["Snedan", "Vriden", "Masken"],
	    "Tunn överläpp": ["Strecket", "Tystnaden", "Niparn"],
	    "Skuggad kind": ["Skuggan", "Grottan", "Mörkret"],
	    "Tydliga skrattlinjer": ["Glädjen", "Skojaren", "Solsken"],
	    "Hängande ögonlock": ["Trötten", "Tunga ögat", "Dåren"],
	    "Skrovlig hudstruktur": ["Barken", "Klippan", "Grovläder"],
	    "Tydlig näsrygg": ["Örn näsan", "Kilen", "Kammen"],
	    "Smal haka": ["Spetsen", "Nålen", "Kilen"],
	    "Utstående öron": ["Storöra", "Vingarna", "Seglet", "Lyssnaren"],
	
	    // Tatueringar
	    "Enkla symboler": ["Tecknet", "Ritan", "Märket"],
	    "Stamdesign över axeln": ["Björnen", "Klanen", "Klingan"],
	    "Magiska runor": ["Runan", "Trollkarlen", "Formeln", "Skriften"],
	    "Halvdold tatuering på halsen": ["Halsbandet", "Ormen", "Smygaren"],
	    "Helryggstatuering": ["Tavlan", "Målaren", "Skuggvävarn"],
	    "Tatuering runt ögat": ["Masken", "Korpen", "Ugglan"],
	    "Namn eller initialer": ["Minnet", "Skriften", "Boken"],
	    "Cirkulära mönster": ["Cirkeln", "Hjulet", "Ringen"],
	    "Tatueringar på fingrarna": ["Ringarna", "Knogen", "Bläcket"],
	    "Rituella märken": ["Prästen", "Offret", "Kultisten", "Pakten"],
	    "Bleknade tatueringar": ["Minnen", "Skuggan", "Gamla bläcket"],
	    "Tatueringar med text": ["Skriften", "Poeten", "Boken"],
	
	    // Piercingar
	    "Öronpiercing": ["Mässingen", "Ringarn", "Örat"],
	    "Näspiercing": ["Näsringen", "Tjuren", "Kroken"],
	    "Ögonbrynspiercing": ["Piken", "Stiftet", "Gadd"],
	    "Läpppiercing": ["Kroken", "Betteln", "Stålläpp"],
	    "Flera örhängen": ["Skrammel", "Silvret", "Smycket", "Guldörat"],
	    "Septumring": ["Tjuren", "Oxen", "Näsringen", "Kringlan"],
	    "Tunga-piercing": ["Skammeln", "Mässingstungan", "Kulan"],
	    "Ring i hakan": ["Skägget", "Kroken", "Hakringen"],
	    "Ring i näsvingen": ["Skenet", "Pricken", "Näsringen"],
	    "Små metallstift i kinden": ["Gnistarn", "Stiften", "Piggarn"],
	
	    // Kroppsliga egenheter
	    "Lång hals": ["Giraffen", "Stolpen", "Tranan"],
	    "Kort hals": ["Tjuren", "Blocket", "Klumpen"],
	    "Framåtlutande hållning": ["Korpens", "Gamen", "Lutarn", "Kroken"],
	    "Bredaxlad": ["Skåpet", "Porten", "Oxen", "Muren"],
	    "Smala handleder": ["Stickan", "Tråden", "Sländan"],
	    "Ovanligt långa fingrar": ["Spindeln", "Pianisten", "Klon", "Handen"],
	    "Tydliga blodådror": ["Ådern", "Älven", "Blåtråden", "Marmorn"],
	    "Böjd rygg": ["Puckelryggen", "Säcken", "Kroken"],
	    "Stel gång": ["Trägubben", "Stenmuren", "Stolpen"],
	    "Vaggande gång": ["Sjömannen", "Ankan", "Gungarn"],
	    "Tyst gång": [`Den Tyst${adjEnd}`, "Tygskon", "Katten", "Skuggan"],
	    "Tunga steg": ["Dunderfot", "Jätten", "Tampen", "Stampen"],
	    "Skiftande naglar": ["Skalet", "Klon", "Marmorhand"],
	    "Missfärgade naglar": ["Kopparklon", "Sotfingert", "Rötet"]
	  };
	
	  if (Array.isArray(specialFeatures)) {
	    specialFeatures.forEach(feature => {
	      if (featureEpithets[feature]) {
	        const val = featureEpithets[feature];
	        // Om det är en matris/array plockar vi ett slumpmässigt namn ur den, annars tar vi strängen rakt av
	        const selectedText = Array.isArray(val) ? pickNick(val) : val;
	        candidates.push({ style: "epithet", text: selectedText, weight: 4 });
	      }
	    });
	  }
	
	  // --- 5. GENERELLA KLASSISKA ÖKNAMN ---
	  const e = isFemale ? "a" : "e"; // e-ändelse
	  const o = isFemale ? "a" : "o"; // o-ändelse
	
	const genericEpithets = [
	    // --- 🐾 DJUR & NATUR ---
	    "Räven", "Vargen", "Korpen", "Gamen", "Höken", "Björnen", "Gropvipern", "Paddan",
	    "Grävlingen", "Skorpionen", "Bocken", "Ugglan", "Loet", "Mården", "Råttan",
	    "Mössan", "Tjädern", "Gäddan", "Abborren", "Fladdermusen", "Snoken", "Gnagaren",
	    "Gösen", "Krabban", "Spindeln", "Ekorren", "Uttern", "Bävern", "Vesslan",
	
	    // --- 😈 PERSONLIGHET, KYNNE & ATTYD ---
	    "Grinet", "Skratten", "Sucken", "Bitter", "Gliringen", "Ettermyran", "Surtjuren",
	    "Snålvargen", "Slösaren", "Skrytmånsen", "Lögnaren", "Sanningen", "Stoltheten",
	    "Skuggan", "Dåren", "Skojaren", "Gäckaren", "Etterbullen", "Glädjedödaren",
	    "Snyftaren", "Babbeln", "Tystnaden", "Gnyet", "Brölet", "Hånleendet", "Fnissaren",
	    `Den Mörk${adjEnd}`, `Den Ond${adjEnd}`, `Den God${adjEnd}`, "Den Enkelt Spikade", `Den Galn${adjEnd}`,
	    `Den Envis${adjEnd}`, `Den Tystlåtn${adjEnd}`, `Den Mild${adjEnd}`, `Den Grym${adjEnd}`, `Den Snål${adjEnd}`,
	
	    // --- ⚔️ STRID, BLOD & DÖD ---
	    "Bödeln", "Klingan", "Slaktaren", "Yxan", "Skölden", "Brynjan", "Döden", 
	    "Skräcken", "Banemannen", "Blodshunden", "Krossaren", "Banerföraren", "Gadd",
	    "Piskraken", "Skräckinjagaren", "Mördaren", "Ärret", "Kraniumet", "Banerbrodern",
	    `Den Blodig${adjEnd}`, `Den Barmhärtig${adjEnd}`, `Den Hänsynslös${adjEnd}`, `Den Orädd${adjEnd}`,
	    `Den Falln${adjEnd}`, "Den Skuggade", `Den Oövervinnerlig${adjEnd}`, `Den Rå${adjEnd}`,
	
	    // --- 🍺 KROG, VARDAG & ÖKNAMN ---
	    "Sillen", "Soppan", "Lortpinnaren", "Öltunnan", "Finkel", "Snorren", "Gröten",
	    "Tråden", "Sotaren", "Skorven", "Slasken", "Lappen", "Pipan", "Kasken",
	    "Pungen", "Damsugan", "Skosulan", "Kålbladet", "Slammet", "Träskallen",
	    "Snorunge", "Slingan", "Kringlan", "Kvasten", "Klumpen", "Degklumpen",
	    `Den Lortig${adjEnd}`, `Den Lat${adjEnd}`, `Den Sömnig${adjEnd}`, `Den Fullfrodiga`,
	
	    // --- 🔮 MYSTIK, FORMEL & SKUGGA ---
	    "Glimmern", "Gnistan", "Solen", "Månen", "Skuggspårarn", "Uranus", "Dimman",
	    "Vinden", "Askan", "Skenet", "Röken", "Skuggan", "Ekot", "Gnistansbäraren",
	    "Nattugglan", "Stormbringaren", "Frostbiten", "Skärvan", "Själätaren",
	    `Den Osynlig${adjEnd}`, "Den Seende", `Den Vis${adjEnd}`, `Den Glömd${adjEnd}`, `Den Mörklagda`,
	    `Den Förbannad${adjEnd}`, `Den Salig${adjEnd}`, `Den Tidlös${adjEnd}`, `Den Okänd${adjEnd}`,
	
	    // --- 👑 HÖGMOD, TITLAR & LEGENDER ---
	    "Kungen", "Kejsaren", "Fursten", "Baronen", "Hertigen", "Profeten", "Legenden",
	    "Hjälten", "Kämpen", "Mästaren", "Väktaren", "Beskyddaren", "Skatten",
	    `Den Ärofull${adjEnd}`, `Den Ung${adjEnd}`, `Den Gaml${adjEnd}`, `Den Rättvis${adjEnd}`, `Den Stor${adjEnd}`,
	    `Den Stolt${adjEnd}`, `Den Högmodig${adjEnd}`, `Den Storslagna`, `Den Rik${adjEnd}`
	  ];
	
	  candidates.push({
	    style: "epithet",
	    text: pickNick(genericEpithets),
	    weight: 1
	  });
	
	  // Slumpa baserat på vikt (unika/passande egenskaper har högre chans)
	  const weightedPool = candidates.flatMap(c => Array(c.weight).fill(c));
	
	  return pickNick(weightedPool);
	}
// Klistrar ihop förnamn + smeknamn enligt rätt format för given stil
function applyNickname(firstName, nickname) {
	if (!nickname) return firstName;
	if (nickname.style === "compound") return firstName + " " + nickname.text;
	if (nickname.style === "prefix") return nickname.text + "-" + firstName;
	if (nickname.style === "epithet") return firstName + " \"" + nickname.text + "\"";
	return firstName;
}	
module.exports = () => {
    return {
        nameManHuman,
        nameManElf,
        nameManOrc,
        nameManDwarf,
        nameManGnome,
        nameWomanElf,
        nameWomanOrc,
        nameWomanHuman,
        nameWomanDwarf,
        nameWomanGnome,
		nameManHalfling,
		nameWomanHalfling,
		getSurname,
		pickNickname,
		applyNickname
    };
};


