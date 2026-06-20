import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// TAXONOMY — derived from the phonics scope & sequence structure (public domain pedagogy)
// All word lists and sentences below are 100% original
// ─────────────────────────────────────────────────────────────────────────────
const TAXONOMY = [
  {
    group: "Closed Syllables",
    subgroups: [
      { sub: "Consonants", lessons: [1] },
      { sub: "Short Vowels", lessons: [2,3,4,5,6,7,8,9,10,11,12] },
      { sub: "Consonant Blends (front)", lessons: [13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38] },
      { sub: "Sight Words", lessons: [39] },
      { sub: "Consonant Blends (end)", lessons: [40,41,42,43,44,45,46,47,48,49,50] },
      { sub: "Consonant Blends (front and end)", lessons: [51,52,53,54] },
    ],
  },
  {
    group: "More Closed Syllables",
    subgroups: [
      { sub: "Sight Words", lessons: [55] },
      { sub: "Consonant Digraphs & Trigraphs", lessons: [56,57,58,59,60,61,62,63,64,65,66,67] },
      { sub: "Double Consonants at End", lessons: [68,69,70,71,72,73] },
      { sub: "qu and x", lessons: [74,75] },
      { sub: "ng and nk Patterns", lessons: [76,77,78,79,80,81,82,83,84,85] },
    ],
  },
  {
    group: "Vowel Digraph Syllables",
    subgroups: [
      { sub: "Sight Words", lessons: [86] },
      { sub: "ee = /ē/", lessons: [87,88,89,90] },
      { sub: "ea = /ē/", lessons: [91,92,93,94] },
      { sub: "oo (boot)", lessons: [95,96,97] },
      { sub: "ai = /ā/", lessons: [98,99] },
      { sub: "air", lessons: [100] },
      { sub: "ay = /ā/", lessons: [101] },
      { sub: "oa = /ō/", lessons: [102,103,104] },
      { sub: "ou (out)", lessons: [105,106] },
      { sub: "ow (cow)", lessons: [107] },
      { sub: "aw (saw)", lessons: [108] },
      { sub: "au (Paul)", lessons: [109] },
      { sub: "oy (boy)", lessons: [110] },
      { sub: "oi (oil)", lessons: [111] },
    ],
  },
  {
    group: "Endings",
    subgroups: [
      { sub: "Sight Words", lessons: [112] },
      { sub: "Silent e at end", lessons: [113] },
      { sub: "th = voiced", lessons: [114] },
      { sub: "s = /z/", lessons: [115] },
      { sub: "s endings", lessons: [116,117] },
      { sub: "es ending", lessons: [118] },
      { sub: "ed endings", lessons: [119,120,121,122] },
      { sub: "ing endings", lessons: [123,124] },
      { sub: "ful ending", lessons: [125] },
      { sub: "Apostrophe & n't", lessons: [126,127] },
    ],
  },
  {
    group: "Multisyllable",
    subgroups: [
      { sub: "Compound Words", lessons: [128] },
      { sub: "Multisyllable Words", lessons: [129,130,131,132,133,134] },
      { sub: "Reduced vowels", lessons: [135,136] },
      { sub: "al = /ul/", lessons: [137] },
      { sub: "er at end", lessons: [138,139] },
      { sub: "Consonant + le", lessons: [140,141] },
      { sub: "le syllable at end", lessons: [142] },
      { sub: "tle = /l/ at end", lessons: [143] },
      { sub: "y = /ee/ at end", lessons: [144,145,146,147] },
      { sub: "Sight Words in words", lessons: [148,149] },
    ],
  },
  {
    group: "Soft C and G",
    subgroups: [
      { sub: "c = /s/ before e", lessons: [150,151] },
      { sub: "c = /s/ before i or y", lessons: [152] },
      { sub: "g = /j/ before e", lessons: [153,154] },
      { sub: "age = /ij/", lessons: [155] },
      { sub: "dge = /j/ at end", lessons: [156] },
      { sub: "g = /j/ before i or y", lessons: [157] },
    ],
  },
  {
    group: "Magic E Syllables",
    subgroups: [
      { sub: "a = /ā/ (game)", lessons: [158,159,160,161,162,163] },
      { sub: "i = /ī/ (like)", lessons: [164,165,166] },
      { sub: "o = /ō/ (note)", lessons: [167,168,169,170] },
      { sub: "u = /yoo/ (use)", lessons: [171] },
      { sub: "u = /oo/ (tube)", lessons: [172] },
      { sub: "e = /ē/ (Pete)", lessons: [173] },
    ],
  },
  {
    group: "Open Syllables",
    subgroups: [
      { sub: "Sight Words", lessons: [174] },
      { sub: "a = /ā/ (basic)", lessons: [175] },
      { sub: "e = /ē/ (begin)", lessons: [176,177,178] },
      { sub: "i = /ī/ (item)", lessons: [179] },
      { sub: "o = /ō/ (bonus)", lessons: [180,181,182] },
      { sub: "u = /yoo/", lessons: [183] },
      { sub: "u = /oo/", lessons: [184] },
      { sub: "Split vowel pairs", lessons: [185] },
      { sub: "Split vowels i = /ē/", lessons: [186] },
    ],
  },
  {
    group: "More Long Vowels",
    subgroups: [
      { sub: "ie = /ē/ (chief)", lessons: [187,188] },
      { sub: "ei = /ē/ (seize)", lessons: [189] },
      { sub: "ey = /ē/ (key)", lessons: [190] },
      { sub: "y = /ī/ (fly)", lessons: [191,192,193] },
      { sub: "ie = /ī/ (pie)", lessons: [194] },
      { sub: "igh = /ī/ (sigh)", lessons: [195] },
      { sub: "ind (kind)", lessons: [196] },
      { sub: "oe = /ō/ (toe)", lessons: [197] },
      { sub: "ow = /ō/ (grow)", lessons: [198,199] },
      { sub: "ou = /ō/ (soul)", lessons: [200] },
      { sub: "old (gold)", lessons: [201] },
      { sub: "oll (roll)", lessons: [202] },
      { sub: "ol (bolt)", lessons: [203] },
      { sub: "ue = /oo/ (true)", lessons: [204] },
      { sub: "ue = /yoo/ (cue)", lessons: [205] },
      { sub: "ew = /oo/ (new)", lessons: [206] },
      { sub: "ew = /yoo/ (few)", lessons: [207] },
      { sub: "ui = /oo/ (fruit)", lessons: [208] },
      { sub: "ou = /oo/ (group)", lessons: [209] },
      { sub: "eigh = /ā/ (eight)", lessons: [210] },
      { sub: "ei = /ā/ (vein)", lessons: [211] },
      { sub: "ey = /ā/ (hey)", lessons: [212] },
    ],
  },
  {
    group: "R-Controlled Syllables",
    subgroups: [
      { sub: "ar", lessons: [213,214,215,216] },
      { sub: "er", lessons: [217,218] },
      { sub: "ir", lessons: [219] },
      { sub: "or", lessons: [220,221,222] },
      { sub: "ur", lessons: [223,224] },
      { sub: "ear = /er/ (earth)", lessons: [225] },
      { sub: "wor = /wer/ (word)", lessons: [226] },
      { sub: "war (warm)", lessons: [227] },
      { sub: "quar (quart)", lessons: [228] },
    ],
  },
  {
    group: "More Short Vowels",
    subgroups: [
      { sub: "all = /awl/ (tall)", lessons: [229] },
      { sub: "al = /awl/ (salt)", lessons: [230] },
      { sub: "alk = /awk/ (talk)", lessons: [231] },
      { sub: "a = /ŏ/ (wash)", lessons: [232] },
      { sub: "oo = short (good)", lessons: [233] },
      { sub: "u = short oo (put)", lessons: [234] },
      { sub: "ea = /ĕ/ (bread)", lessons: [235,236] },
      { sub: "ear = /air/ (bear)", lessons: [237] },
      { sub: "y = /ĭ/ (gym)", lessons: [238] },
      { sub: "ous = /us/ (famous)", lessons: [239] },
      { sub: "ou = /ŭ/ (touch)", lessons: [240] },
      { sub: "our = /ur/ (journey)", lessons: [241] },
      { sub: "o = /ŭ/ (son)", lessons: [242] },
    ],
  },
  {
    group: "Silent Letters & Advanced",
    subgroups: [
      { sub: "Sight Words", lessons: [243] },
      { sub: "sc = /s/ (scent)", lessons: [244] },
      { sub: "wr = /r/ (wrap)", lessons: [245] },
      { sub: "kn = /n/ (knee)", lessons: [246] },
      { sub: "gn = /n/ (gnaw)", lessons: [247] },
      { sub: "ign (sign)", lessons: [248] },
      { sub: "gh = silent (taught)", lessons: [249] },
      { sub: "ought = /awt/ (thought)", lessons: [250] },
      { sub: "Misc. silent letters", lessons: [251,252,253,254] },
      { sub: "ch = /k/ (school)", lessons: [255] },
      { sub: "ph = /f/ (phone)", lessons: [256,257] },
      { sub: "tion = /shun/ (action)", lessons: [258,259] },
      { sub: "sion = /shun/ (mansion)", lessons: [260] },
      { sub: "sion = /zhun/ (vision)", lessons: [261] },
      { sub: "ci = /sh/ (special)", lessons: [262] },
      { sub: "ti = /sh/ (patient)", lessons: [263] },
      { sub: "ture = /chur/ (picture)", lessons: [264] },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ORIGINAL LESSON SEEDS — one example per subgroup to start
// All content is 100% original (new words & sentences, same phonetic methodology)
// ─────────────────────────────────────────────────────────────────────────────
const SEED_LESSONS = [
  {
    lessonNum: 2,
    group: "Closed Syllables",
    sub: "Short Vowels",
    pattern: "a = /ă/",
    words: ["cab","dab","jab","nab","tab","dam","jam","yam","gap","lap","nap","tap","zap","lax","wax","van","ban","pan","ran","tan"],
    sentences: [
      "The cab has a gap in the tan cab top.",
      "Dab the wax on the pan, Jan.",
      "A fat rat ran and napped on the lap rug.",
      "Tab the map on the wall, Dan.",
      "Max had a nap on the flat tan mat.",
      "Ban the van from the dam road.",
      "A ram ran at a yam in the gap.",
      "Zap the lap with a dab of wax.",
    ],
  },
  {
    lessonNum: 5,
    group: "Closed Syllables",
    sub: "Short Vowels",
    pattern: "i = /ĭ/",
    words: ["bid","hid","kid","lid","dig","fig","jig","pig","wig","dim","rim","dip","hip","lip","nip","rip","sip","tip","zip","bit"],
    sentences: [
      "The kid hid the lid in the dim bin.",
      "A big pig did a jig on the rim.",
      "Did Kim sip from the tip of the jug?",
      "Zip up and tip the bin, Jim.",
      "Rip the wig off the pig, Sid.",
      "Dig a pit, then sip a bit.",
      "Nip the fig at the hip of the stem.",
      "Hip hop and dip, zip and skip!",
    ],
  },
  {
    lessonNum: 7,
    group: "Closed Syllables",
    sub: "Short Vowels",
    pattern: "u = /ŭ/",
    words: ["bud","mud","bug","dug","hug","jug","mug","pug","rug","tug","bun","fun","run","sun","cut","gut","hut","nut","rut","but"],
    sentences: [
      "A pug in the mud got a big hug.",
      "The bug dug under the sun-lit rug.",
      "Run to the hut, but do not cut the bun.",
      "A nut fell in the mud by the hut.",
      "Lug the big jug of fun punch to the bun stand.",
      "Cut the bun and put the nut in the mug.",
      "Tug the rug out of the mud rut.",
      "The sun can bud fun from a dull gut-rot day.",
    ],
  },
  {
    lessonNum: 9,
    group: "Closed Syllables",
    sub: "Short Vowels",
    pattern: "e = /ĕ/",
    words: ["bed","fed","led","red","keg","leg","peg","gem","den","hen","pen","ten","web","get","jet","let","met","net","pet","wet"],
    sentences: [
      "The red hen sat on ten eggs in the den.",
      "Get the wet pet to the vet, Ned.",
      "A jet set the ten men on the net path.",
      "Peg the hem on the bed, Beth.",
      "The gem fell off the red peg.",
      "Let the vet check the leg of the hen.",
      "Ten men in the den met a pet fox.",
      "Set the pen on the red web mat, Jen.",
    ],
  },
  {
    lessonNum: 11,
    group: "Closed Syllables",
    sub: "Short Vowels",
    pattern: "o = /ŏ/",
    words: ["bob","cob","job","mob","rob","sob","cog","dog","fog","hog","jog","log","cot","dot","got","hot","lot","pot","rot","fox"],
    sentences: [
      "The fox got hot on a log in the fog.",
      "Don the dog can jog, not sob on the cot.",
      "A hot pot on the cot can rot the top.",
      "Bob the hog got a cob on the dot.",
      "The mob got a lot of hot fog on the job.",
      "Not a cog on the log did rot at the dot.",
      "Jog to the dot on the hot red road, Tom.",
      "The fox got a cob cot in the fog.",
    ],
  },
  {
    lessonNum: 13,
    group: "Closed Syllables",
    sub: "Consonant Blends (front)",
    pattern: "sl",
    words: ["slab","slag","slam","slap","slid","slim","slip","slit","slob","slop","slot","slug","slum","slung","slunk"],
    sentences: [
      "Slim slid on a slab of wet slag.",
      "The slug slunk into a slim slot in the wall.",
      "Do not slop the pot or slam the lid shut.",
      "A slap on the slab left a slick wet mark.",
      "He slit the rag and slung it on the peg.",
      "The slum had a slop of mud on the step.",
      "Slip the slim slug off the wet stalk.",
      "Slam the slot shut after the slug slips in.",
    ],
  },
  {
    lessonNum: 14,
    group: "Closed Syllables",
    sub: "Consonant Blends (front)",
    pattern: "st",
    words: ["stab","stag","stamp","stand","stem","step","stick","stiff","still","stomp","stop","stub","stuff","stump","stun","stock"],
    sentences: [
      "Stand still or the stag will stomp and stun you.",
      "A stiff stem can stub the tip of a stick.",
      "Step on the stamp, then stop at the stump.",
      "The stuff in the stump can stun a small bug.",
      "Stomp the stem flat on the stone step.",
      "A stag can stand still and stiff in the fog.",
      "Stun the bug, then stuff it in the stump slot.",
      "Stock the stand with stiff stems and fresh stubs.",
    ],
  },
  {
    lessonNum: 15,
    group: "Closed Syllables",
    sub: "Consonant Blends (front)",
    pattern: "sp",
    words: ["span","sped","spin","spit","spot","spud","spun","spar","spec","speck","spill","split","spoke","spool","sport"],
    sentences: [
      "The top spun and spilled the spud on the spot.",
      "Spit the spec of dust off the spool.",
      "She sped across the span of the wet sport track.",
      "A speck of mud split the spool in the sink.",
      "Spin the top and spot the spill on the mat.",
      "The spud spun and split on the hard stone.",
      "Spar with the spin of the spool, Sam.",
      "He spun the spool and sped past the spill.",
    ],
  },
  {
    lessonNum: 21,
    group: "Closed Syllables",
    sub: "Consonant Blends (front)",
    pattern: "br",
    words: ["brad","brag","bran","brat","bred","brig","brim","brisk","broth","brown","brow","brush","brunt","brunt","brace"],
    sentences: [
      "The brat braged about the brim of his brown hat.",
      "Brush the bran off the brim of the brace.",
      "Brisk wind from the brow of the cliff hit the broth pot.",
      "The broth was bred with bran and fresh brown herbs.",
      "Brad brushed the brown brig with a stiff brush.",
      "Brace for the brisk wind off the brown brow.",
      "Brag less, brush more, and brim with brisk cheer.",
      "The brad fell in the broth by the bran basket.",
    ],
  },
  {
    lessonNum: 22,
    group: "Closed Syllables",
    sub: "Consonant Blends (front)",
    pattern: "cr",
    words: ["crab","crack","cram","crash","crept","crisp","crop","cross","crud","crust","crush","cram","crux","crick","crest"],
    sentences: [
      "A crab can crash into the crisp crust of bread.",
      "Cross the crack in the crust with care.",
      "The crop crept up from the moist soft soil.",
      "Crush the crisp shell, then cram it in the pot.",
      "A small crab crept across the cross-shaped crest.",
      "The crash left crud on the fresh crop.",
      "Cram the crust into the crab trap at the creek.",
      "Cross the crick, but do not crush the crisp fern.",
    ],
  },
  {
    lessonNum: 39,
    group: "Closed Syllables",
    sub: "Consonant Blends (end)",
    pattern: "st (end)",
    words: ["best","fast","fist","gust","jest","just","last","list","mast","mist","must","nest","past","rest","rust","test","vast","vest","west","zest"],
    sentences: [
      "The best nest is past the mast in the mist.",
      "Rest in the vest and jest at the last test.",
      "Rust on the mast is a fast and vast problem.",
      "Just a gust of west wind and the nest fell.",
      "The last list must rest on the vest, not the fist.",
      "Test the zest of the best west coast fruit.",
      "A fast gust of mist hit the vast west nest.",
      "Jest and rest are the best cure for rust.",
    ],
  },
  {
    lessonNum: 56,
    group: "More Closed Syllables",
    sub: "Consonant Digraphs & Trigraphs",
    pattern: "sh",
    words: ["shed","shelf","shell","ship","shop","shot","shout","show","shut","cash","clash","crash","dish","flash","fresh","gush","rush","trash","wish","rash"],
    sentences: [
      "Shut the shed and rush to the ship on the dock.",
      "She found a fresh shell on the shelf by the dish.",
      "Flash the light to show the cash in the trash can.",
      "Hush — a crash in the shop set off the rash alarm.",
      "Wash the shell and put it in the show dish.",
      "A lash of rain hit the shell on the shelf.",
      "Wish for fresh fish from the shop by the ship.",
      "The ship shot past the shore with a gush of foam.",
    ],
  },
  {
    lessonNum: 59,
    group: "More Closed Syllables",
    sub: "Consonant Digraphs & Trigraphs",
    pattern: "th = unvoiced",
    words: ["thin","thing","think","three","through","thumb","bath","cloth","math","month","moth","path","teeth","tenth","with","thank","theft","thud","thump","threat"],
    sentences: [
      "Think of three things that match the math on the path.",
      "The thin moth flew through the thick cloth.",
      "Thank the vet with a gift on the tenth month.",
      "That thumb hurt with a thud on the bath ledge.",
      "Though the bath is cold, wash with the soft cloth.",
      "Three teeth fell on the path with a thump.",
      "The thin threat went through the math club this month.",
      "Think fast — the moth is through the cloth again.",
    ],
  },
  {
    lessonNum: 62,
    group: "More Closed Syllables",
    sub: "Consonant Digraphs & Trigraphs",
    pattern: "ck",
    words: ["back","beck","black","block","brick","buck","check","click","clock","crack","deck","dock","duck","flock","jack","kick","knock","lock","neck","pack","pick","quick","rack","rock","sick","sock","stack","stick","stuck","trick","truck","tuck","wick","wreck"],
    sentences: [
      "Knock on the back of the black truck with a stick.",
      "The duck got stuck in the thick black muck.",
      "Click the lock on the dock before the flock lands.",
      "Quick — pick the sock off the brick stack, Jack.",
      "The clock on the deck ticked and the trick began.",
      "Pack the rack, stack the block, and lock the truck.",
      "A sick duck on the dock made a quick trick.",
      "Knock knock! Who's at the brick block on the back deck?",
    ],
  },
  {
    lessonNum: 76,
    group: "More Closed Syllables",
    sub: "ng and nk Patterns",
    pattern: "ing",
    words: ["bring","cling","ding","fling","king","ping","ring","sing","sling","spring","sting","string","swing","thing","wing","wring","zing","cling","fling","ming"],
    sentences: [
      "The king can sing and swing on the spring ring.",
      "Bring the string and fling it past the wing.",
      "A bee sting in spring is a painful thing.",
      "Sing and swing — let your voice ring and zing!",
      "Wring the wet string and fling it on the rack.",
      "The ring on the king's wing had a bright zing.",
      "Cling to the swing and bring the spring song.",
      "Ding! The king rang the ring to start the sing-off.",
    ],
  },
  {
    lessonNum: 77,
    group: "More Closed Syllables",
    sub: "ng and nk Patterns",
    pattern: "ank",
    words: ["bank","blank","clank","crank","drank","flank","frank","plank","prank","rank","sank","shrank","spank","stank","swank","tank","thank","yank"],
    sentences: [
      "Frank drank the tank dry on a blank afternoon.",
      "Yank the crank and the plank will clank down.",
      "The prank at the bank made the rank and file thank us.",
      "He sank the plank and it clank on the tank floor.",
      "Thank the frank crew who drank from the spank-new tank.",
      "The blank flank of the boat clank on the plank dock.",
      "Crank the swank tank and yank the blank rope.",
      "Frank pulled a prank — he drank the bank's ink!",
    ],
  },
  {
    lessonNum: 87,
    group: "Vowel Digraph Syllables",
    sub: "ee = /ē/",
    pattern: "ee = /ē/",
    words: ["bee","fee","free","glee","knee","see","tree","need","feed","seed","weed","speed","steel","wheel","feel","heel","peel","reel","deal","seal","keen","been","teen","green","screen"],
    sentences: [
      "See the bee on the green tree by the creek.",
      "The teen felt free and full of glee in the breeze.",
      "Feed the seed with water and it will grow with speed.",
      "Steel wheels on steel rails screech and squeel.",
      "Feel the heel of the reel — it is keen and clean.",
      "Peel the green weed off the wheel of the cart.",
      "The screen on the porch keeps the bees out for free.",
      "Been at the tree? Feed the keen bee a free seed.",
    ],
  },
  {
    lessonNum: 91,
    group: "Vowel Digraph Syllables",
    sub: "ea = /ē/",
    pattern: "ea = /ē/",
    words: ["bead","beam","beat","clean","cream","deal","dream","eat","heap","lean","meal","neat","real","seal","steam","teach","team","treat","weak","year","read","lead","meat","sea","leaf"],
    sentences: [
      "The seal can leap and beat a drum by the sea.",
      "Eat a real meal of lean meat and steamed greens.",
      "The team made a neat deal by the leaning tree.",
      "Steam a heap of greens and cream them for the meal.",
      "A dream of a clean sea is a real team goal.",
      "Teach the team to read the leaf map each year.",
      "Beat the cream until it peaks and treat the team.",
      "The beam of light hit the bead on the neat shelf.",
    ],
  },
  {
    lessonNum: 95,
    group: "Vowel Digraph Syllables",
    sub: "oo (boot)",
    pattern: "oo = /oo/",
    words: ["boot","cool","drool","fool","groom","hoop","loop","moon","mood","mool","noon","pool","roof","room","root","school","scoop","snoop","soon","spoon","stool","swoon","tool","tooth","zoom"],
    sentences: [
      "At noon the fool sat on a stool by the pool.",
      "A cool scoop of moon ice and the mood will soon lift.",
      "Loop the hoop on the roof of the school room.",
      "The groom swooned in the cool bloom of the moon.",
      "Zoom in, snoop around, and scoop the news at noon.",
      "Root out the drool of the fool on the stool.",
      "The tooth fell in the pool at noon — no swoon!",
      "A spoon is a tool for a cool room at school.",
    ],
  },
  {
    lessonNum: 98,
    group: "Vowel Digraph Syllables",
    sub: "ai = /ā/",
    pattern: "ai = /ā/",
    words: ["bail","brain","chain","claim","drain","faint","gain","grain","hail","jail","mail","main","nail","pain","plain","rain","sail","snail","Spain","stain","tail","train","trail","wait","waist"],
    sentences: [
      "The snail left a plain trail on the rain-soaked rail.",
      "Wait for the main train at the grain silo in Spain.",
      "Hail hit the sail and left a dark stain on the tail.",
      "A nail in the drain caused a lot of pain, Jane.",
      "Rain on the plain is a gain for the grain crop.",
      "Claim the mail at the chain-link gate, Gail.",
      "The brain is the main tool — train it every day!",
      "A stain on the waist of the plain white sail.",
    ],
  },
  {
    lessonNum: 101,
    group: "Vowel Digraph Syllables",
    sub: "ay = /ā/",
    pattern: "ay = /ā/",
    words: ["bay","clay","day","delay","display","gray","hay","jay","lay","may","pay","play","pray","ray","ray","say","slay","spray","stay","stray","sway","tray","way","clay","okay"],
    sentences: [
      "Jay the gray jay lay on the hay all day.",
      "Stay and play in the spray of the bay, Kay.",
      "A ray of sun hit the clay tray in a good way.",
      "Spray the gray clay and let it sway in the ray.",
      "May we display the hay on the wooden tray today?",
      "A stray blue jay will sway and sway on the bay branch.",
      "Pay and play — that is the way to start the day.",
      "Pray for a sunny day and let the clay dry in the ray.",
    ],
  },
  {
    lessonNum: 102,
    group: "Vowel Digraph Syllables",
    sub: "oa = /ō/",
    pattern: "oa = /ō/",
    words: ["boat","coat","float","foam","goal","goat","groan","load","moan","moat","oat","road","roam","roast","soap","soak","toad","toast","throat","coach"],
    sentences: [
      "A goat on a boat can float near the foam.",
      "Toast the oat with soap foam — wait, that is gross!",
      "The toad woke and hopped across the moat road.",
      "Load the coat on the rope and float it home.",
      "The coach made the goal from the road near the moat.",
      "A roast goat by the road left a groan in my throat.",
      "Soak the oat coat in cold water by the moat.",
      "Roam the road and moan a soft goat song.",
    ],
  },
  {
    lessonNum: 105,
    group: "Vowel Digraph Syllables",
    sub: "ou (out)",
    pattern: "ou = /ow/",
    words: ["bout","cloud","clout","couch","count","crouch","doubt","found","gout","ground","hound","loud","mound","mount","mouth","out","ouch","our","pout","proud","round","scout","shout","snout","south","sprout","stout","trout","wound"],
    sentences: [
      "The hound found a trout by the south mound.",
      "Shout out loud — the scout found the round route!",
      "Count the sprouts on the ground around the mound.",
      "Ouch! The proud hound pouted and crouched on the couch.",
      "Without doubt, the stout trout swam south.",
      "Mount the mound and shout from the south end.",
      "A cloud of doubt hung round the proud snout.",
      "The scout crouched and counted the sprouts on the ground.",
    ],
  },
  {
    lessonNum: 107,
    group: "Vowel Digraph Syllables",
    sub: "ow (cow)",
    pattern: "ow = /ow/",
    words: ["bow","brow","brown","clown","cow","crowd","crown","drown","frown","gown","growl","how","howl","now","owl","own","plow","pow","prowl","rowdy","towel","town","vow","wow","yowl"],
    sentences: [
      "The clown in the brown gown made a bow to the crowd.",
      "How now, brown cow? Did you plow the town field?",
      "The owl howls a yowl on the brow of the hill.",
      "Wow — the crown fell in the brown towel by the plow!",
      "The rowdy crowd let out a growl at the frown.",
      "Plow the brow of the hill before the brown cow wanders.",
      "The clown wore a crown and a brown velvet gown.",
      "Vow to mow the town meadow with the plow you own.",
    ],
  },
  {
    lessonNum: 108,
    group: "Vowel Digraph Syllables",
    sub: "aw (saw)",
    pattern: "aw = /aw/",
    words: ["caw","claw","crawl","dawn","draw","drawl","fawn","gnaw","hawk","jaw","law","lawn","paw","raw","saw","shawl","sprawl","squawk","straw","thaw","yawn"],
    sentences: [
      "The hawk saw a fawn on the lawn at dawn.",
      "Draw the claw of the hawk with a raw edge.",
      "Yawn and crawl — thaw out on the warm dawn lawn.",
      "The law says: do not gnaw raw straw by the squawk zone.",
      "A caw from the hawk made the fawn sprawl on the soft lawn.",
      "Saw the raw log and draw a shawl across the dawn chill.",
      "The jaw dropped when the hawk spread its claw on the straw.",
      "Crawl past the fawn and draw the thaw in the soft lawn.",
    ],
  },
  {
    lessonNum: 110,
    group: "Vowel Digraph Syllables",
    sub: "oy (boy)",
    pattern: "oy = /oy/",
    words: ["annoy","boy","buoy","cloy","coy","decoy","deploy","destroy","employ","enjoy","joy","loyal","ploy","royal","soy","toy","Troy","void","voyage","oyster"],
    sentences: [
      "The royal boy enjoyed a toy voyage to Troy.",
      "Deploy the decoy buoy to avoid the void in the bay.",
      "Joy! The loyal royal dog did not annoy the oyster diver.",
      "Enjoy the soy broth — it will not cloy or destroy your gut.",
      "A coy ploy by Troy made the royal court enjoy the day.",
      "The boy found a buoy and felt great joy on his voyage.",
      "Employ the royal ploy to deploy the decoy at sea.",
      "Troy the loyal royal dog will not destroy or annoy.",
    ],
  },
  {
    lessonNum: 111,
    group: "Vowel Digraph Syllables",
    sub: "oi (oil)",
    pattern: "oi = /oy/",
    words: ["broil","coil","coin","foil","hoist","join","joist","loin","moist","noise","oil","point","poison","poise","soil","spoil","toil","turmoil","voice","void"],
    sentences: [
      "Join the toil of the soil without a voice full of noise.",
      "Foil the broil by adding moist oil at the point of heat.",
      "Hoist the coil of rope with poise and avoid the void.",
      "A coin in the moist soil can spoil the turmoil of the day.",
      "Broil the loin in oil and avoid the point of poison.",
      "The joist was moist with oil and made a groaning noise.",
      "Toil in the soil and recoil from the point of poison.",
      "Voice your joy — do not spoil the moist soil with noise.",
    ],
  },
  {
    lessonNum: 128,
    group: "Multisyllable",
    sub: "Compound Words",
    pattern: "Compound Words",
    words: ["backpack","birthday","bookshelf","birdhouse","campfire","classroom","daylight","doorstep","downtown","earthworm","firefly","football","greenhouse","halfway","honeybee","houseboat","keystone","landmark","nightfall","notebook","outside","raincoat","rooftop","seashore","skateboard","snowflake","springtime","sunlight","treefort","weekend"],
    sentences: [
      "Pack the backpack for the weekend trip to the seashore.",
      "The firefly lit up the nightfall by the houseboat.",
      "A honeybee landed on the greenhouse rooftop at daylight.",
      "Grab your raincoat and skateboard before downtown sundown.",
      "The birthday notebook had a snowflake on the bookshelf.",
      "At springtime the earthworm comes out after the rainfall.",
      "The birdhouse landmark was halfway to the campfire site.",
      "Step on the doorstep outside and watch the sunlight fade.",
    ],
  },
  {
    lessonNum: 158,
    group: "Magic E Syllables",
    sub: "a = /ā/ (game)",
    pattern: "a_e = /ā/",
    words: ["bake","blade","brave","cage","came","cane","cape","cave","chase","crane","crate","date","fade","flame","frame","gaze","gave","grade","grape","grave","haze","lake","lane","lame","late","made","make","name","page","pale","pave","place","plane","plate","race","rake","range","rate","safe","sage","sake","same","save","shade","shape","skate","take","tale","tame","wake","wave"],
    sentences: [
      "Jake skates to the lake and waves from the safe lane.",
      "Bake a grape cake and place it on a pale plate.",
      "A brave crane came to the cave at a late date.",
      "The flame in the frame made a haze in the cave shade.",
      "Chase the tame crane along the grape lane, Blake.",
      "Name a safe place to rake and grade the pale lane.",
      "The tale of the brave cave sage made us gaze in awe.",
      "Save the crate of grapes and bake a cake for the race.",
    ],
  },
  {
    lessonNum: 164,
    group: "Magic E Syllables",
    sub: "i = /ī/ (like)",
    pattern: "i_e = /ī/",
    words: ["bite","bride","crime","dike","dine","dive","drive","file","fine","five","glide","gripe","hike","hide","hive","kite","knife","life","like","lime","line","mile","mine","nine","pine","pipe","pride","prime","prize","ride","rile","rise","shine","side","site","size","slide","smile","spike","spine","stride","stripe","time","tire","tide","vine","wide","wife","wine","wise"],
    sentences: [
      "Fly the kite and slide down the wide pine-lined side.",
      "The bride smiled and walked with stride and pride.",
      "Shine a bright light on the vine by the pine line.",
      "Dive to the right side and hide your smile in time.",
      "Life on the wide ridge is fine in the bright sunshine.",
      "Drive to the pine and hike the wide lime-green trail.",
      "A lime vine can climb the high wide side of the wall.",
      "Nine miles on a bike, tide or no tide — what a prime time!",
    ],
  },
  {
    lessonNum: 167,
    group: "Magic E Syllables",
    sub: "o = /ō/ (note)",
    pattern: "o_e = /ō/",
    words: ["bone","clone","close","code","cone","cope","core","cove","dome","drove","globe","grove","hole","home","hope","hose","joke","lone","lobe","mode","mole","more","mope","nose","note","phone","pole","poke","pose","probe","role","rope","rose","scope","slope","smoke","snore","spoke","stole","stone","stove","throne","tone","those","vote","whole","woke","zone"],
    sentences: [
      "A goat on a slope close to home snored by the stone.",
      "The rose grove has a lone mole hole near the stone dome.",
      "Note the smoke from the stove in the cove by the slope.",
      "Hope to vote on the whole code before the phone tone ends.",
      "The mole poked its nose from the hole by the stone hose.",
      "Rope the cone and pose it on the throne zone for the joke.",
      "Those who drove through the grove woke to rose-gold slopes.",
      "Scope the whole globe — home is where the stone rose grows.",
    ],
  },
  {
    lessonNum: 171,
    group: "Magic E Syllables",
    sub: "u = /yoo/ (use)",
    pattern: "u_e = /yoo/",
    words: ["cube","cute","dune","dupe","fume","fuse","huge","hue","mule","muse","mute","nude","pure","tube","tune","use","yule","plume","prude","crude"],
    sentences: [
      "Use a huge cube of pure ice in the cute tube mug.",
      "The mule hummed a tune and mused by the sand dune.",
      "A huge fume cloud blew from the fuse on the crude tube.",
      "The mute muse wore a plume of cute yule-blue hue.",
      "Fuse the tune with a pure note and a huge mule beat.",
      "Dupe the crude prude with a cute yule cube tune.",
      "Pure as a dune, mute as a nude stone — what a huge muse!",
      "Use the fuse tube to cure the crude fuel dune leak.",
    ],
  },
  {
    lessonNum: 187,
    group: "More Long Vowels",
    sub: "ie = /ē/ (chief)",
    pattern: "ie = /ē/",
    words: ["brief","chief","field","fiend","grief","grieve","niece","piece","priest","relief","retrieve","shield","shriek","siege","thief","tier","wield","yield","achieve","believe","pier","diesel"],
    sentences: [
      "The chief of the field held a brief siege at the pier.",
      "Grief and relief — the priest shielded the niece from the fiend.",
      "Achieve your belief and yield a piece of your grief.",
      "The thief shrieked and dropped the piece of gold by the tier.",
      "Retrieve the shield from the field before the brief storm.",
      "A niece of the chief will believe and achieve relief.",
      "The priest stood at the pier and gave a brief, fierce speech.",
      "Yield the field and shield the niece from the chief's grief.",
    ],
  },
  {
    lessonNum: 191,
    group: "More Long Vowels",
    sub: "y = /ī/ (fly)",
    pattern: "y = /ī/",
    words: ["by","cry","dry","fly","fry","guy","my","pry","shy","sky","sly","spy","sty","try","why","bye","dye","eye","lye","rye","wry","comply","defy","deny","rely","reply","supply","imply"],
    sentences: [
      "Why did the shy guy try to pry my dry rye?",
      "Fly high in the blue sky and cry a happy bye.",
      "The spy denied using lye dye on the rye supply.",
      "A sly dry fly buzzed by the shy guy's eye.",
      "Fry the rye in the sty and reply with a wry smile.",
      "The sky is my eye and the cloud is my shy reply.",
      "Try to comply and supply the dry rye by noon.",
      "Deny the sly spy the rye dye and rely on your own eye.",
    ],
  },
  {
    lessonNum: 195,
    group: "More Long Vowels",
    sub: "igh = /ī/ (sigh)",
    pattern: "igh = /ī/",
    words: ["bright","fight","flight","fright","high","knight","light","might","night","plight","right","sigh","sight","slight","tight","tonight","blight","delight","enlighten","frighten","highlight","midnight","moonlight","nightfall","starlight","twilight","upright","candlelight"],
    sentences: [
      "At midnight the knight saw starlight and felt delight.",
      "The bright light of the moon at twilight is a stunning sight.",
      "Sigh at the slight fright of the nightfall candlelight.",
      "Frighten the blight with bright moonlight, brave knight!",
      "The high flight path was tight and right on tonight's route.",
      "Highlight the right path by the faint candlelight tonight.",
      "The knight's plight at midnight was a frightful sight.",
      "Twilight might enlighten the upright knight of his flight.",
    ],
  },
  {
    lessonNum: 213,
    group: "R-Controlled Syllables",
    sub: "ar",
    pattern: "ar = /ar/",
    words: ["arch","arm","art","bar","bark","barn","car","card","cart","carve","chart","dark","dart","far","farm","hard","harm","harp","jar","large","lark","march","mark","park","part","scarf","scar","sharp","star","start","tar","yard"],
    sentences: [
      "March far to the barn and park the farm cart in the yard.",
      "The sharp scar on the dark bark of the large tree.",
      "Start the car and dart past the farm to the park.",
      "A jar of tar and a hard harp — not the best art.",
      "The lark sang on a dark branch in the large yard.",
      "Carve the art with sharp tools in the dark barn.",
      "A star in the dark arch of sky marks the far farm.",
      "March in the yard, cart the hard jar to the barn.",
    ],
  },
  {
    lessonNum: 217,
    group: "R-Controlled Syllables",
    sub: "er",
    pattern: "er = /er/",
    words: ["after","better","butter","center","chapter","clever","dinner","either","ever","fern","her","herd","herb","jerk","kernel","lantern","letter","mercy","never","over","perfect","person","river","serpent","swerve","term","verb","verse","alert","assert"],
    sentences: [
      "The clever person swerved to avoid the fern by the river.",
      "After dinner, read a verse from the last chapter.",
      "A kernel of truth in every term and every verb.",
      "The serpent jerked and swerved past the fern in the river.",
      "Never ever jerk the lantern over the herb garden, Mervyn.",
      "The perfect person is alert and never a jerk.",
      "Her letter had better verb forms than the last chapter.",
      "After the term, we ate butter and herbs by the river.",
    ],
  },
  {
    lessonNum: 220,
    group: "R-Controlled Syllables",
    sub: "or",
    pattern: "or = /or/",
    words: ["born","core","cord","cork","corn","fort","fork","form","horn","horse","lord","more","morning","north","or","orbit","order","porch","port","short","shore","snore","sort","sport","storm","story","store","torch","torn","worn","word","world","worse","worth"],
    sentences: [
      "Horses born at dawn snore on the north shore.",
      "Order a short cord of corn from the port store.",
      "The torch lit the fort porch in the morning storm.",
      "Sort the torn cord by the horn of the horse corral.",
      "A storm from the north shore can short-circuit the port.",
      "Worth more than gold — a kind word in the morning.",
      "The sport of the world is to score in the short window.",
      "A snore from the shore fort woke the morning birds.",
    ],
  },
  {
    lessonNum: 229,
    group: "More Short Vowels",
    sub: "all = /awl/ (tall)",
    pattern: "all = /awl/",
    words: ["all","ball","call","fall","hall","mall","small","stall","tall","wall","call","fall","install","recall","rainfall","footfall","downfall","overall","waterfall","windfall"],
    sentences: [
      "A tall ball rolled down the hall and hit the small wall.",
      "Call for help at the waterfall — do not fall!",
      "The rainfall in the fall was the biggest windfall of all.",
      "Install the stall in the hall of the mall overall.",
      "Recall the small ball from the tall wall stall, all in all.",
      "The overall footfall at the mall was a downfall in autumn.",
      "Tall trees in the fall are a windfall of color for all.",
      "Call and recall — the small stall is down the hall.",
    ],
  },
  {
    lessonNum: 244,
    group: "Silent Letters & Advanced",
    sub: "sc = /s/ (scent)",
    pattern: "sc = /s/",
    words: ["scent","scene","scenic","scepter","science","scissors","scythe","ascend","crescent","descend","fluorescent","luminescent","omniscient","prescient","transcend"],
    sentences: [
      "The science of scent is a scenic and transcendent topic.",
      "Ascend the crescent hill and descend by the old scythe path.",
      "The fluorescent light gave the scene a luminescent glow.",
      "Science and scissors — the tools of the prescient mind.",
      "The scenic crescent was cut with a scythe at dusk.",
      "Ascend past the scene where the scent of pine transcends all.",
      "The omniscient sage held a scepter and a pair of scissors.",
      "Science can transcend the scene and the scent of fear.",
    ],
  },
  {
    lessonNum: 245,
    group: "Silent Letters & Advanced",
    sub: "wr = /r/ (wrap)",
    pattern: "wr = /r/",
    words: ["wrap","wrath","wreck","wren","wrestle","wring","wrist","write","wrong","wrote","wrought","unwrap","wrinkle","wrestle","shipwreck","typewrite","handwritten"],
    sentences: [
      "The wren wrote the wrong word and wrinkled the page.",
      "Wrap the wrist and wrestle the wreck of wrought iron.",
      "Unwrap the handwritten note from the wren on the wreck.",
      "The wrestler wrung the wet cloth and wrote his wrath away.",
      "Wring out the wrong and wrap it in the right word.",
      "The shipwreck was a wrought-iron wrong turn in the wrong sea.",
      "Write it right — wrap the wrong word and rewrite.",
      "The wren with the wrinkled wrist wrote with great wrath.",
    ],
  },
  {
    lessonNum: 246,
    group: "Silent Letters & Advanced",
    sub: "kn = /n/ (knee)",
    pattern: "kn = /n/",
    words: ["knack","knead","knee","kneel","knell","knew","knife","knight","knit","knob","knock","knot","know","knowledge","knuckle","doorknob","jackknife","penknife"],
    sentences: [
      "The knight kneeled on one knee and knocked on the knob.",
      "Knit with the knack of one who knows the knot by heart.",
      "Knock the knob and the knife falls from the knot.",
      "The knell of knowledge knocks at every knuckle.",
      "He knew the knight would kneel and knead the dough.",
      "A penknife, a knob, and a knot — the knack of the craft.",
      "Knock on the door and kneel — the knight will know your knack.",
      "The knot on the knuckle knows no knock from the knife.",
    ],
  },
  {
    lessonNum: 258,
    group: "Silent Letters & Advanced",
    sub: "tion = /shun/ (action)",
    pattern: "tion = /shun/",
    words: ["action","attention","caution","collection","condition","direction","education","election","emotion","fraction","function","instruction","invention","location","mention","motion","nation","notion","option","portion","question","reaction","section","solution","station","tension","vacation"],
    sentences: [
      "The election reaction was a fraction of the nation's emotion.",
      "Pay attention to the instruction on every section of the station.",
      "The invention was a solution to the nation's education condition.",
      "Mention the option of a vacation as a motion to the collection.",
      "Action leads to reaction — that is a basic fraction of life.",
      "The direction of the election caused a great national tension.",
      "Caution! The location of the station lacks a proper function.",
      "Education is the motion that moves every nation in any direction.",
    ],
  },
  {
    lessonNum: 261,
    group: "Silent Letters & Advanced",
    sub: "sion = /zhun/ (vision)",
    pattern: "sion = /zhun/",
    words: ["vision","revision","division","occasion","collision","conclusion","confusion","decision","erosion","explosion","fusion","illusion","inclusion","invasion","lesion","occasion","persuasion","provision","television","version"],
    sentences: [
      "The collision caused confusion and the illusion of an explosion.",
      "On this occasion, the television version led to a decision.",
      "Persuasion and revision led to the inclusion of the vision.",
      "The erosion of the division was a slow and steady conclusion.",
      "Fusion of vision and revision — that is the perfect version.",
      "The invasion caused confusion, but the provision held firm.",
      "A lesion and an illusion on the occasion of the collision.",
      "Make a decision on the television revision with precision.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COLOR SYSTEM
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  ink: "#1a1a2e",
  paper: "#f8f7f2",
  accent: "#e86a33",
  accentLight: "#fff0e8",
  muted: "#6b6b7b",
  border: "#ddddd0",
  groupColors: {
    "Closed Syllables": { bg: "#fde8d8", text: "#7a3010" },
    "More Closed Syllables": { bg: "#fdd8e8", text: "#7a1040" },
    "Vowel Digraph Syllables": { bg: "#d8eafd", text: "#103070" },
    "Endings": { bg: "#d8fdea", text: "#105030" },
    "Multisyllable": { bg: "#ead8fd", text: "#401070" },
    "Soft C and G": { bg: "#fdfad8", text: "#504000" },
    "Magic E Syllables": { bg: "#fde8f8", text: "#601060" },
    "Open Syllables": { bg: "#d8f8fd", text: "#005060" },
    "More Long Vowels": { bg: "#e8d8fd", text: "#300870" },
    "R-Controlled Syllables": { bg: "#fdeed8", text: "#603000" },
    "More Short Vowels": { bg: "#d8fdfd", text: "#006060" },
    "Silent Letters & Advanced": { bg: "#f0f0f0", text: "#303030" },
  },
};

function groupColor(group) {
  return C.groupColors[group] || { bg: "#eeeeee", text: "#333" };
}

// ─────────────────────────────────────────────────────────────────────────────
// UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function Badge({ label, bg, text }) {
  return (
    <span style={{
      background: bg, color: text, borderRadius: 20,
      padding: "2px 10px", fontSize: 11, fontWeight: 700,
      letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function WordGrid({ words, highlight }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 7, margin: "10px 0" }}>
      {words.map((w) => {
        const isHL = highlight && w.toLowerCase().includes(highlight.toLowerCase());
        return (
          <div key={w} style={{
            background: isHL ? C.accentLight : "#fff",
            border: `1.5px solid ${isHL ? C.accent : C.border}`,
            borderRadius: 7, padding: "6px 4px", textAlign: "center",
            fontFamily: "Georgia, serif", fontSize: 14,
            fontWeight: isHL ? 700 : 500,
            color: isHL ? C.accent : C.ink, letterSpacing: 0.4,
          }}>{w}</div>
        );
      })}
    </div>
  );
}

function SentenceList({ sentences }) {
  return (
    <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {sentences.map((s, i) => (
        <li key={i} style={{
          display: "flex", gap: 10, padding: "7px 10px",
          background: i % 2 === 0 ? "#f2f5ff" : "transparent",
          borderRadius: 6, marginBottom: 2,
        }}>
          <span style={{ fontWeight: 700, color: C.accent, minWidth: 22, fontSize: 12 }}>{i + 1}.</span>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 14, lineHeight: 1.6, color: C.ink }}>{s}</span>
        </li>
      ))}
    </ol>
  );
}

function LessonCard({ lesson, searchTerm }) {
  const [open, setOpen] = useState(false);
  const gc = groupColor(lesson.group);
  return (
    <div style={{
      border: `1.5px solid ${C.border}`, borderRadius: 10, overflow: "hidden",
      marginBottom: 8, boxShadow: open ? "0 3px 14px rgba(0,0,0,0.07)" : "none",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", background: open ? gc.bg : C.paper,
        border: "none", cursor: "pointer", padding: "12px 16px",
        display: "flex", alignItems: "center", gap: 10, textAlign: "left",
      }}>
        <span style={{
          fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 18,
          color: C.accent, minWidth: 28, lineHeight: 1,
        }}>{lesson.pattern.split(" ")[0]}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: C.ink }}>{lesson.pattern}</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>
            {lesson.sub} · {lesson.words.length} words · {lesson.sentences.length} sentences
          </div>
        </div>
        {lesson.isGenerated && (
          <Badge label="AI" bg={C.accent} text="#fff" />
        )}
        <Badge label={lesson.group} bg={gc.bg} text={gc.text} />
        <span style={{ fontSize: 14, color: C.muted }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{ padding: "16px 16px 20px", background: "#fff" }}>
          <div style={{ marginBottom: 4 }}>
            <Badge label={lesson.group} bg={gc.bg} text={gc.text} />
            <span style={{ margin: "0 6px", color: C.muted }}>›</span>
            <Badge label={lesson.sub} bg="#eef0ff" text="#3a3aaa" />
          </div>
          <div style={{ fontWeight: 700, fontSize: 10, letterSpacing: 1, color: C.muted, textTransform: "uppercase", margin: "14px 0 4px" }}>Word List</div>
          <WordGrid words={lesson.words} highlight={searchTerm} />
          <div style={{ fontWeight: 700, fontSize: 10, letterSpacing: 1, color: C.muted, textTransform: "uppercase", margin: "14px 0 6px" }}>Practice Sentences</div>
          <SentenceList sentences={lesson.sentences} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
const params =
  new URLSearchParams(
    window.location.search
  );

const initialGroup =
  parseInt(
    params.get("group")
  ) || 0;

const initialSub =
  parseInt(
    params.get("sub")
  ) || 0;

function AIGenerator({ onAdd }) {
  const [group, setGroup] = useState(TAXONOMY[0].group);
  const [sub, setSub] = useState(TAXONOMY[0].subgroups[1].sub);
  const [pattern, setPattern] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentSubs = TAXONOMY.find((t) => t.group === group)?.subgroups || [];

  const generate = async () => {
    if (!pattern.trim()) return;
    setLoading(true); setError("");
    const prompt = `You are an English phonics curriculum designer. Create a NEW, 100% original phonics lesson.

Group: "${group}"
Subgroup: "${sub}"
Phonetic pattern: "${pattern}"

Rules:
- Words must clearly demonstrate the target phonetic pattern
- Use common English words appropriate for adult learners
- Sentences use only simple, real English sentences
- Do NOT copy from any existing curriculum
- Be creative and make sentences fun and memorable

Return ONLY valid JSON, no markdown, no explanation:
{
  "words": ["word1","word2","word3","word4","word5","word6","word7","word8","word9","word10","word11","word12","word13","word14","word15"],
  "sentences": ["Sentence 1.","Sentence 2.","Sentence 3.","Sentence 4.","Sentence 5.","Sentence 6.","Sentence 7.","Sentence 8."]
}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const raw = data.content?.map((c) => c.text || "").join("") || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      onAdd({ id: Date.now(), group, sub, pattern: pattern.trim(), words: parsed.words, sentences: parsed.sentences, isGenerated: true });
      setPattern("");
    } catch {
      setError("Generation failed — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#fff", border: `2px solid ${C.accent}`, borderRadius: 12, padding: "18px 20px", marginBottom: 24 }}>
      <div style={{ fontWeight: 800, fontSize: 14, color: C.ink, marginBottom: 3, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: C.accent }}>✦</span> Generate New Lesson with AI
      </div>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 14 }}>
        Creates 100% original words & sentences — never copies from external sources.
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
        <select value={group} onChange={(e) => { setGroup(e.target.value); setSub(TAXONOMY.find(t => t.group === e.target.value)?.subgroups[0]?.sub || ""); }}
          style={{ padding: "8px 12px", borderRadius: 7, border: `1.5px solid ${C.border}`, fontSize: 12, background: C.paper, cursor: "pointer", flex: 1, minWidth: 140 }}>
          {TAXONOMY.map((t) => <option key={t.group} value={t.group}>{t.group}</option>)}
        </select>
        <select value={sub} onChange={(e) => setSub(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: 7, border: `1.5px solid ${C.border}`, fontSize: 12, background: C.paper, cursor: "pointer", flex: 1, minWidth: 140 }}>
          {currentSubs.map((s) => <option key={s.sub} value={s.sub}>{s.sub}</option>)}
        </select>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={pattern} onChange={(e) => setPattern(e.target.value)} onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder='Type the pattern, e.g. "ou", "igh", "tion"…'
          style={{ flex: 1, padding: "8px 12px", borderRadius: 7, border: `1.5px solid ${C.border}`, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
        <button onClick={generate} disabled={loading || !pattern.trim()}
          style={{ padding: "8px 18px", borderRadius: 7, border: "none", background: loading || !pattern.trim() ? C.border : C.accent, color: "#fff", fontWeight: 700, fontSize: 13, cursor: loading || !pattern.trim() ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}>
          {loading ? "…" : "Generate ✦"}
        </button>
      </div>
      {error && <div style={{ marginTop: 8, color: "#c0392b", fontSize: 12 }}>{error}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [lessons, setLessons] = useState(SEED_LESSONS);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("All");
  const [activeSub, setActiveSub] = useState("All");

  const allGroups = ["All", ...TAXONOMY.map((t) => t.group), "Generated"];
  const currentTaxSubs = TAXONOMY.find((t) => t.group === activeGroup)?.subgroups || [];
  const allSubs = activeGroup === "All" || activeGroup === "Generated"
    ? []
    : ["All", ...currentTaxSubs.map((s) => s.sub)];

  const handleGroupChange = (g) => { setActiveGroup(g); setActiveSub("All"); };

  const filtered = lessons.filter((l) => {
    const inGroup = activeGroup === "All" || (activeGroup === "Generated" && l.isGenerated) || l.group === activeGroup;
    const inSub = activeSub === "All" || l.sub === activeSub;
    const q = search.toLowerCase();
    const matches = !q || l.pattern.toLowerCase().includes(q) || l.sub.toLowerCase().includes(q) || l.group.toLowerCase().includes(q) || l.words.some((w) => w.toLowerCase().includes(q));
    return inGroup && inSub && matches;
  });

  return (
    <div style={{ minHeight: "100vh", background: C.paper, fontFamily: "'Inter','Helvetica Neue',sans-serif" }}>
      {/* Header */}
      <header style={{ background: C.ink, color: "#fff", padding: "14px 20px", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ background: C.accent, borderRadius: 7, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontWeight: 900, fontSize: 16, flexShrink: 0 }}>φ</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 15 }}>Phonics Lesson Builder</div>
          <div style={{ fontSize: 10, opacity: 0.55 }}>{lessons.length} lessons · original content</div>
        </div>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…"
          style={{ background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 7, padding: "6px 12px", color: "#fff", fontSize: 12, fontFamily: "inherit", width: 160, outline: "none" }} />
      </header>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "22px 16px 60px" }}>
        <AIGenerator onAdd={(l) => { setLessons((p) => [l, ...p]); setActiveGroup("Generated"); setActiveSub("All"); }} />

        {/* Group tabs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
          {allGroups.map((g) => {
            const active = activeGroup === g;
            const gc = groupColor(g);
            return (
              <button key={g} onClick={() => handleGroupChange(g)} style={{
                padding: "5px 12px", borderRadius: 18,
                border: `1.5px solid ${active ? C.accent : C.border}`,
                background: active ? C.accent : "#fff",
                color: active ? "#fff" : C.muted,
                fontWeight: active ? 700 : 500, fontSize: 11, cursor: "pointer",
              }}>{g}</button>
            );
          })}
        </div>

        {/* Sub tabs */}
        {allSubs.length > 0 && (
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 16, paddingLeft: 4 }}>
            {allSubs.map((s) => {
              const active = activeSub === s;
              return (
                <button key={s} onClick={() => setActiveSub(s)} style={{
                  padding: "4px 10px", borderRadius: 14,
                  border: `1.5px solid ${active ? "#3a3aaa" : C.border}`,
                  background: active ? "#eef0ff" : "#fafafa",
                  color: active ? "#3a3aaa" : C.muted,
                  fontWeight: active ? 700 : 500, fontSize: 11, cursor: "pointer",
                }}>{s}</button>
              );
            })}
          </div>
        )}

        {search && <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"</div>}

        {filtered.length === 0
          ? <div style={{ textAlign: "center", color: C.muted, padding: "50px 20px", fontSize: 14 }}>No lessons found.<br/>Try generating one above!</div>
          : filtered.map((l) => <LessonCard key={l.id} lesson={l} searchTerm={search} />)}
      </div>
    </div>
  );
}
