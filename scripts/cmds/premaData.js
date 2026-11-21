// ==========================================
// PREMA GROUP BOT - DATA PART 1
// File: premaData.js
// PART 1: Greeting, Love, Romantic, Funny,
// Caring, Sad, Angry, Friendship, Missing,
// Compliment, General
// ==========================================

const data = {
  categories: {}
};

// 01. GREETING
data.categories.greeting = {
  keywords: [
    "hi", "hii", "hiii", "hello", "hellow", "hey", "heyy",
    "assalamu alaikum", "salam", "salaam", "adab", "good morning",
    "good night", "good evening", "good afternoon", "ki obostha",
    "kemon acho", "kmn acho", "kemon aso", "kmn aso",
    "ki khobor", "ki re", "oi prema", "prema", "oi",
    "hey prema", "hello prema", "hi prema", "aso", "achis"
  ],
  replies: [
    "Oii! Amake dakcho naki? Bolo shuni! 😊",
    "Hello hello! Eto khon koi chile? 😄",
    "Oii! Prema ekhanei achi, bolo ki hoyeche? 💗",
    "Walaikum assalam! Kemon acho tumi? 🌸",
    "Aha! Amar priyo manush eshe geche! 😌❤️",
    "Heyyy! Ajke eto misti kore dakcho keno? 🥰",
    "Ki khobor tomar? Shob bhalo to? 😊",
    "Oii baba! Dak shunei chole ashlam! 😂",
    "Hello! Ajke golpo hobe naki? 💕",
    "Ami bhaloi achi, tomar khobor bolo! 🌷"
  ]
};

// 02. LOVE
data.categories.love = {
  keywords: [
    "love", "valobashi", "bhalobashi", "valo bashi",
    "bhalobasa", "valobasha", "i love you", "iloveyou",
    "love you", "luv u", "lv u", "tomake chai",
    "tomay chai", "tomake valobashi", "tomay valobashi",
    "toke valobashi", "onek valobashi", "mon theke chai",
    "amar valobasha", "prem kori", "prem korbo",
    "love kori", "valobashbi", "bhalobashba",
    "amar mon", "mon diyechi", "heart diyechi"
  ],
  replies: [
    "Valobasha shundor, jodi dujoner mon theke hoy! ❤️",
    "Eto valobasha kothay rakho bolo to? 🥰",
    "Awww! Kothata shune mon ta bhalo hoye gelo! 💗",
    "Valobasha mane shudhu bola na, care korao! 🌹",
    "Moner kotha bole dile, ekhon kintu daitto tomar! 😜",
    "Aha! Ajke dekhi prem-er hawa boiche! 💞",
    "Valobasha thakuk, obhiman kom hok! ❤️",
    "Erokom misti kotha bolle lojja peye jai! 🙈",
    "Mon jodi shotti hoy, tahole ekta kothai jothesto! 💖",
    "Bhalobasha diye duniya ta aro shundor hoy! 🌍"
  ]
};

// 03. ROMANTIC
data.categories.romantic = {
  keywords: [
    "romantic", "romance", "romantic kotha", "prem er kotha",
    "romantic line", "love story", "kiss", "kiss dao",
    "hug", "joriye dhoro", "juriye dhoro", "cuddle",
    "date e jabo", "date korbo", "chad", "tara",
    "moner manush", "priyo manush", "jaan", "jan",
    "baby", "babu", "shona", "sona", "kolija",
    "pakhi", "sweetheart", "darling", "crush"
  ],
  replies: [
    "Tumi pashe thakle shadharon muhurto-o special hoye jay! 🥰",
    "Chander alo lagbe na, priyo manush thaklei hoy! 🌙",
    "Ekta misti hasi diye puro din shundor kore dewa jay! 💗",
    "Tomar sathe golpo korte korte shomoy theme geleo khoti nei! ❤️",
    "Romance korte hole age cha-er dawat dite hobe! ☕😂",
    "Moner manush dure thakleo mone thake kache! 💞",
    "Ektu care, ektu hasi, ar onekta bhalobasha! 🌹",
    "Ajker akash tao mone hoy prem-prem lagche! 🌌",
    "Ekta hug pele shob obhiman ure jeto! 🤗",
    "Kichu manush ache, jader kotha bhablei hasi pay! 😊"
  ]
};

// 04. FUNNY
data.categories.funny = {
  keywords: [
    "haha", "hahaha", "lol", "lmao", "funny",
    "moja", "moja koro", "joke", "jokes", "hasao",
    "hashi", "hasi", "moja laglo", "pagol", "pagli",
    "faltu", "bokachoda", "gadha", "alu", "bandor",
    "ki ajob", "seriously", "meme", "comedy",
    "moja korchi", "just kidding", "kidding",
    "hahaha re", "haste haste", "lol re"
  ],
  replies: [
    "Ami hashi dile kintu group-er shobai hasha shuru korbe! 😂",
    "Eto moja korle amar serious howar chance-i thakbe na! 🤣",
    "Tomar comedy dekhe hashi thamano mushkil! 😆",
    "Ami pagol na, ami limited edition! 😎",
    "Joke ta bujhlam, kintu hashar permission koi? 😂",
    "Ekhane ekjon comedian ache dekhi! 🎭",
    "Hasi free, kintu hasanor charge alada! 🤭",
    "Aro bolo, popcorn niye boshe achi! 🍿",
    "Ei group-e shanti bole kichu nei! 🤣",
    "Tomar kotha shune amar software-o heshe uthlo! 😜"
  ]
};

// 05. CARING
data.categories.caring = {
  keywords: [
    "care", "take care", "nijer kheyal rekho",
    "kheyecho", "khaicho", "khaiso", "khawa hoise",
    "khawa dawa", "ghumaiso", "ghum hoyeche",
    "shorir kemon", "sorir kemon", "osustho",
    "oshustho", "jhor", "jor", "matha betha",
    "mon kharap", "rest nao", "pani khao",
    "medicine kheyecho", "nijer jotno nao",
    "sabdhane theko", "bhalo theko", "care nio",
    "khawa hoise tomar", "ghumao"
  ],
  replies: [
    "Nijer kheyal rekho, nijer jotno neowa khub dorkar! ❤️",
    "Shomoy moto kheye nio, na kheye theko na! 🍚",
    "Beshi tension nio na, ektu rest nao! 🌸",
    "Shorir kharap hole obohela korbe na, thik ache? 💗",
    "Pani kheyo, nijer care koro! 💧",
    "Shob kajer age nijer shorir-er dike kheyal rekho! 😊",
    "Mon kharap hole eka eka chepe rekho na! 🤗",
    "Bhalo theko, tomar hashi ta jeno hariye na jay! 🌷",
    "Ghum kom hole kintu kalke energy pabe na! 😴",
    "Care kora choto bishoy na, eta onek boro bhalobasha! ❤️"
  ]
};

// 06. SAD / MON KHARAP
data.categories.sad = {
  keywords: [
    "sad", "mon kharap", "kosto", "koshto", "dukho",
    "dukkho", "kandchi", "kanna", "kharap lagche",
    "valo lagche na", "bhalo lagche na", "eka lagche",
    "lonely", "depressed", "depression", "vishon kharap",
    "khub kharap", "kichu bhalo lage na", "keu nai",
    "keu bujhe na", "chokhe pani", "heart broken",
    "breakup", "betray", "dhoka kheyechi",
    "mon venge geche", "koshto hocche", "kharap somoy"
  ],
  replies: [
    "Mon kharap hole nijeke eka vebo na, kotha bolte paro! 🤗",
    "Shob din ek rokom jay na, kharap shomoy-o kete jabe! ❤️",
    "Ektu shomoy nao, nijer proti ektu norom hou! 🌸",
    "Kanna pele kede nao, mon halka hote pare! 🫂",
    "Tomar feelings gulo important, nijeke choto vebo na! 💗",
    "Ajke kharap lagche bole kalkeo kharap jabe emon na! 🌤️",
    "Kotha bolte iccha korle ami shunte achi! 😊",
    "Nijer upor rag koro na, shob kichur jonno nijeke dosh dio na! ❤️",
    "Ektu pani khao, shash nao, aste aste shob bolo! 🌷",
    "Tomar hashi abar fire ashuk, etai chai! 🥺"
  ]
};

// 07. ANGRY / RAG
data.categories.angry = {
  keywords: [
    "rag", "ragi", "rag korchi", "rag hoyeche",
    "khub rag hocche", "matha gorom", "mejaj kharap",
    "mood off", "mood kharap", "irritated",
    "annoying", "birokto", "birakto", "chup thako",
    "dur ho", "jao", "jhamela", "jhogra",
    "fight", "marbo", "block korbo", "ar kotha bolbo na",
    "tumi kharap", "faltu kotha", "sojjo hocche na",
    "ragiye dio na", "ragio na"
  ],
  replies: [
    "Oho! Eto rag korle kintu cha-o thanda hoye jabe! 😅",
    "Ektu shanto hou, tarpor dujone mile kotha boli! 🌸",
    "Rag hole age ek glass pani khao! 💧",
    "Ami ki abar kono bhul kore fellam naki? 🥺",
    "Rag komle abar misti kore kotha bolbo! 😊",
    "Shob kothar uttor rag diye dite hoy na! ❤️",
    "Ektu break nao, matha thanda hole shob easy lagbe! 🌿",
    "Thik ache, age tomar rag shuni! 😌",
    "Rag korar odhikar ache, kintu nijeke koshto dio na! 💗",
    "Ami jhogra korte ashi nai, golpo korte eshechi! 😂"
  ]
};

// 08. FRIENDSHIP
data.categories.friendship = {
  keywords: [
    "friend", "friendship", "bondhu", "bondhutto",
    "best friend", "bestie", "dost", "bro", "vai",
    "bhai", "apu", "bon", "sathi", "best friend hoba",
    "bondhu hobi", "friend hobi", "amra friend",
    "true friend", "close friend", "school friend",
    "college friend", "miss my friend", "bondhu chai",
    "bondhu lagbe", "friendship day", "best buddy"
  ],
  replies: [
    "Bhalo bondhu hole moner kotha bolte alada shahosh lage! 💗",
    "Friendship-er moddhe trust tai shobcheye important! 🤝",
    "Bondhu mane bipode pashe thaka ekjon manush! ❤️",
    "Bestie hole kintu treat dite hobe! 😜",
    "Bondhutto hok shundor, ar obhiman thakuk kom! 🌸",
    "Ekjon bhalo bondhu puro din ta bhalo kore dite pare! 😊",
    "Dost, golpo shuru korbo naki? 😎",
    "Bondhu paowa shohoj, kintu bhalo bondhu paowa vaggo! 🍀",
    "Friendship-e kono acting cholbe na, shob real chai! 😁",
    "Ami gossip-o shunbo, secret-o rakhbo! 🤫"
  ]
};

// 09. MISSING SOMEONE
data.categories.missing = {
  keywords: [
    "miss kori", "miss you", "miss u", "miss korchi",
    "tomake miss", "tomay miss", "toke miss",
    "mone pore", "mone porche", "khub mone pore",
    "onek miss kori", "onek mone pore",
    "kache pete chai", "dekha korte chai",
    "dekha hoy na", "dure acho", "dure thako",
    "long distance", "fire aso", "fire esho",
    "tomar kotha mone pore", "take miss kori",
    "kauke miss kori", "ekla lage"
  ],
  replies: [
    "Kauke miss kora mane shey moner koto ta jayga niye ache! ❤️",
    "Durotto thakleo moner connection thakuk! 💞",
    "Ekta message-o kokhono onekta kachakachi ene dey! 📩",
    "Jar kotha beshi mone pore, take ekbar knock dite paro! 😊",
    "Mone pora manush gulo shobshomoy special hoy! 🌸",
    "Dekha na holeo bhalo laga kome jay na! 💗",
    "Aha! Ajke dekhi karor jonno mon kemon korche! 🥺",
    "Miss korle bole dao, moner kotha chepe rekho na! ❤️",
    "Ekdin abar dekha hobe, shei ashay thako! 🌷",
    "Distance map-e hoy, moner moddhe na! 💕"
  ]
};

// 10. COMPLIMENT
data.categories.compliment = {
  keywords: [
    "cute", "sundor", "shundor", "beautiful", "handsome",
    "smart", "nice", "misti", "mishti", "sweet",
    "adorable", "gorgeous", "queen", "king",
    "valo", "bhalo", "perfect", "awesome",
    "darun", "osadharon", "chomotkar", "cute tumi",
    "onek sundor", "tomake sundor lage",
    "tomar hasi", "tomar voice", "tomar kotha"
  ],
  replies: [
    "Awww! Eto compliment dile lojja peye jabo! 🙈",
    "Dhonnobad! Tomar chokhe shundor lagatai boro kotha! 💗",
    "Tumi-o kintu kom cute na! 😌",
    "Eto proshongsha korle kintu treat dite hobe! 😂",
    "Misti kotha bolar talent ta tomar besh bhalo! 🌸",
    "Aha! Ajke compliment-er brishti hocche! ☔❤️",
    "Tomar mukhe shune kothata aro shundor laglo! 😊",
    "Shundor mon thakle shob kichui shundor lage! 💕",
    "Ektu lojja, ektu hasi—ei holo amar obostha! 🙈",
    "Compliment ta pocket-e rekhe dilam! 😎"
  ]
};

// 11. GENERAL CONVERSATION
data.categories.general = {
  keywords: [
    "ki koro", "ki korcho", "ki korteso", "ki kortecho",
    "ki hocche", "ki hochhe", "ki holo", "ki hoise",
    "bolo", "bol", "shuno", "shun", "accha",
    "achha", "hmm", "hmmm", "hum", "tai naki",
    "sotti", "seriously", "tarpor", "then",
    "bujhlam", "bujhchi", "jani na", "dekhi",
    "ekta kotha", "ekta question", "question ache",
    "kotha bolo", "golpo kori", "golpo korba",
    "reply dao", "uttor dao", "answer dao"
  ],
  replies: [
    "Bolo, shunchi! Tarpor ki holo? 😊",
    "Hmm, bujhlam! Ektu aro bolo! 👀",
    "Achha! Tarpor ki korle? 😄",
    "O tai naki! Besh interesting! 🌸",
    "Ami ekhanei achi, bolo! 💗",
    "Shob kotha shunte ready achi! 😌",
    "Ebar amar-o kichu bolar ache! 😂",
    "Bujhlam, tomar kotha continue koro! 😊",
    "Oho! Golper notun mor nite jacche mone hoy! 👀",
    "Accha, tarpor ki holo sheta bolo! 💕",
    "Hmm! Ei bishoy ta aro interesting hocche! 😁",
    "Bolo bolo, majhkhane interrupt korbo na! 🤐"
  ]
};

// Export
module.exports = data;
// ==========================================
// PREMA GROUP BOT - DATA PART 2
// Add this below PART 1 in premaData.js
// ==========================================

// 12. FLIRTING
data.categories.flirting = {
  keywords: [
    "flirt", "flirt koro", "flirt korba", "flirt korchi",
    "flirt with me", "line maro", "line mar", "pataba",
    "patate chai", "prem korba", "crush khabo",
    "impress koro", "impress korbo", "pickup line",
    "romantic flirt", "ektu flirt", "flirty",
    "amar sathe flirt", "ki cute", "hot lagche",
    "chokhe chokh", "tomar dike takai", "mon churi",
    "mon churi korcho", "prem e porbo"
  ],
  replies: [
    "Tomar sathe flirt korte gele kotha hariye feli! 🙈",
    "Eto cute hoye ghuro keno, manush distracted hoy! 😜",
    "Tomar smile-er upor amar kono control nai! ❤️",
    "Flirt korte eshe nijeyi crush kheye gelam! 😂",
    "Tomar chokhe ki magic ache bolo to? 🥰",
    "Ektu dure thako, nahole mon abar golmal korbe! 💗",
    "Line marbo, naki shoja moner kotha bolbo? 😏",
    "Tomar sathe kotha bollei mood romantic hoye jay! 🌹",
    "Ami flirt kori na, ami shudhu special treatment dei! 😎",
    "Tomar ekta reply-er jonno eto opekkha keno kori bolo? 🙈"
  ]
};

// 13. JEALOUSY
data.categories.jealousy = {
  keywords: [
    "jealous", "jealousy", "jelly", "hingsha",
    "hingse", "onno karo sathe", "onnoder sathe",
    "oke keno", "take keno", "tar sathe kotha",
    "amar sathe na", "amake ignore", "ignore korcho",
    "onnoke pochondo", "onnoke valo lage",
    "amar rag hocche", "possessive", "amar e thakba",
    "amar hoba", "amar kotha bhabo", "kake beshi valo",
    "amake na oke", "ami ki important na"
  ],
  replies: [
    "Eto jealous hole kintu moner kotha bole felte hoy! 😜",
    "Hingsha na kore ektu misti kore kotha bolo! ❤️",
    "Aha! Kar upor eto obhiman jomeche? 🥺",
    "Jealousy-r cheye trust onek beshi shundor! 💗",
    "Amake jiggesh korcho, naki nijer monkei jiggesh korcho? 😂",
    "Ektu possessive howa alada, kintu trust ta dorkar! 🌸",
    "Oho! Ajke dekhi moner moddhe competition cholche! 🤭",
    "Jar kache important, tar sathe khule kotha bolo! 😊",
    "Eto chinta koro na, nijer value bhule jeyo na! ❤️",
    "Obhiman ache bujhlam, ekhon ektu hasi dao! 😁"
  ]
};

// 14. BREAKUP
data.categories.breakup = {
  keywords: [
    "breakup", "break up", "break up hoyeche",
    "relation sesh", "relationship sesh",
    "se chere geche", "she chole geche",
    "amake chereche", "chere chole geche",
    "ex", "amar ex", "ex er kotha",
    "prem sesh", "valobasha sesh", "mon vengeche",
    "heartbreak", "heart broken", "move on",
    "move on korte parchi na", "bhule jete chai",
    "ar relation nai", "single hoye gelam",
    "dhoka diyeche", "cheat koreche", "cheating"
  ],
  replies: [
    "Karo chole jawa tomar mullo komiye dey na! ❤️",
    "Move on korte shomoy lage, nijeke shomoy dao! 🌸",
    "Purono smriti thakuk, kintu nijer jibon theme rekho na! 💗",
    "Jar thakar chilo shey chesta korto, nijeke dosh dio na! 🫂",
    "Ekta relation sesh mane tomar golpo sesh na! 🌷",
    "Kosto hole bolo, moner kotha chepe rekho na! 😊",
    "Healing ekdine hoy na, aste aste nijeke shamlao! ❤️",
    "Ex-er kotha bad dao, nijer future niye bhabo! 😌",
    "Kichu manush shikkha diye jay, thakar jonno ashe na! 🌿",
    "Nijer shanti ke shobar age rakho! 💞"
  ]
};

// 15. APOLOGY
data.categories.apology = {
  keywords: [
    "sorry", "sry", "sori", "sorry bolo",
    "maf koro", "maaf koro", "khoma koro",
    "khoma chai", "vul hoyeche", "bhul hoyeche",
    "amar vul", "amar bhul", "rag koro na",
    "please forgive me", "forgive me",
    "ragiyechi", "koshto diyechi", "mon kharap korechi",
    "ar hobe na", "sorry re", "sorry jaan",
    "maf kore dao", "khoma kore dao"
  ],
  replies: [
    "Thik ache, bhul shobar-i hoy! Ebar theke kheyal rekho! 💗",
    "Sorry bolar sathe sathe kaj-eo dekhate hoy! 😊",
    "Achha, maf kore dilam! Ebar hasho! 🌸",
    "Rag kore thakle mon aro kharap hoy, cholo thik kori! ❤️",
    "Bhul bujhabujhi hole khule kotha bolo! 🤗",
    "Eto sundor kore sorry bolle rag dhore rakha mushkil! 🙈",
    "Thik ache, kintu abar eki bhul koro na! 😜",
    "Maf kora jay, jodi mon theke bhul shikar kora hoy! 💕",
    "Cholo notun kore shuru kori! 😊",
    "Sorry accepted! Ebar ekta misti hasi dao! 😁"
  ]
};

// 16. THANK YOU
data.categories.thanks = {
  keywords: [
    "thanks", "thank you", "thank u", "thnx",
    "tnx", "dhonnobad", "onek dhonnobad",
    "onek thanks", "thankyou", "appreciate it",
    "valo laglo", "bhalo laglo", "help korar jonno thanks",
    "thanks re", "thanks jaan", "onek help korso",
    "grateful", "kritooggota", "upokar korso"
  ],
  replies: [
    "Arey! Eto formal howar kichu nei! 🥰",
    "Welcome! Abar dorkar hole dak dio! ❤️",
    "Tomar upokar korte parle amar-o bhalo lage! 😊",
    "Dhonnobad-er bodole ekta hasi dao! 😁",
    "Anytime! Golpo korte abar esho! 🌸",
    "You're welcome! Nijer kheyal rekho! 💗",
    "Aww! Shune khub bhalo laglo! 🥰",
    "Eto thanks na diye ek cup cha khawao! ☕😂",
    "No problem! Bondhuder jonno etotuku kortei pari! 🤝",
    "Welcome back anytime! 🌷"
  ]
};

// 17. BIRTHDAY
data.categories.birthday = {
  keywords: [
    "birthday", "happy birthday", "hbd", "jonmodin",
    "shuvo jonmodin", "jonmodin er wish",
    "birthday wish", "amar birthday", "aj amar birthday",
    "ajke birthday", "kal birthday", "birthday cake",
    "cake khawao", "birthday gift", "gift chai",
    "birthday party", "birthday celebration",
    "wish koro", "jonmodiner shubhechha"
  ],
  replies: [
    "Happy Birthday! Tomar jibon anonde bhore uthuk! 🎂",
    "Shuvo jonmodin! Shob shopno puron hok! 🎉",
    "Birthday te cake chara kintu kichui cholbe na! 🍰",
    "Notun bochor, notun shopno, onek onek shubhechha! ❤️",
    "Ajke tomar special day, mon khule enjoy koro! 🥳",
    "Happy Birthday! Shobshomoy hashikhushi theko! 🌸",
    "Cake-er ekta slice amar jonno rekho! 😂",
    "Tomar protita din birthday-r moto special hok! 💗",
    "Onek bhalobasha ar shubhokamna roilo! 🎁",
    "Ajke treat na dile birthday incomplete! 😜"
  ]
};

// 18. MOTIVATION
data.categories.motivation = {
  keywords: [
    "motivation", "motivational", "motivational kotha",
    "inspire", "inspiration", "parbo na",
    "ami parbo na", "fail", "failure", "har menechi",
    "give up", "chesta korchi", "success",
    "successful", "shopno", "goal", "target",
    "future", "life e kichu korte chai",
    "monobal", "sahosh", "confidence",
    "nijeke bodlate chai", "notun kore shuru",
    "hotash", "ashahoto", "kichu hocche na"
  ],
  replies: [
    "Dhire cholte paro, kintu theme jeo na! 💪",
    "Ajker choto chesta kalke boro success ene dite pare! 🌟",
    "Nijer upor bishash rakho, tumi aro onek kichu parbe! ❤️",
    "Failure mane sesh na, eta notun kichu shekhar sujog! 🌸",
    "Onno karo sathe nijeke compare koro na! 😊",
    "Shopno boro rakho, chesta protidin koro! 🚀",
    "Ekbar na parle abar chesta koro! 💪",
    "Tomar journey tomar nijer, shomoy niye egio! 🌷",
    "Ajke jeta kothin, practice korle shetai shohoj hobe! 🔥",
    "Hariye geleo abar shuru korar shahosh rekho! ❤️"
  ]
};

// 19. STUDY / EXAM
data.categories.study = {
  keywords: [
    "study", "porashona", "pora", "porte boshechi",
    "exam", "porikkha", "test", "quiz", "assignment",
    "homework", "class", "college", "university",
    "school", "teacher", "sir", "madam",
    "result", "marks", "grade", "cgpa", "gpa",
    "fail korbo", "pass korbo", "porte iccha kore na",
    "porashona valo lage na", "exam tension",
    "syllabus", "revision", "note"
  ],
  replies: [
    "Porashona ektu ektu kore korle onek easy hoy! 📚",
    "Exam-er age tension na niye revision dao! 😊",
    "Break niye poro, ekdom nonstop porar dorkar nei! ☕",
    "Ajker pora ajkei shesh korar chesta koro! 💪",
    "Marks important, kintu shekhatay ashol! 🌸",
    "Pora shuru korle dekbe aste aste flow chole ashbe! 📖",
    "Phone ta ektu dure rekhe ৩০ minute focus koro! 😜",
    "Best of luck! Nijer upor confidence rakho! ❤️",
    "Assignment-er deadline dekhe voy peyo na, shuru kore dao! 😂",
    "Ekta chapter shesh kore nijeke choto reward dio! 🎉"
  ]
};

// 20. SLEEP
data.categories.sleep = {
  keywords: [
    "ghum", "ghumabo", "ghumate jabo",
    "ghum pacche", "ghum asche", "sleep",
    "sleepy", "good night", "gn", "night",
    "shuvo ratri", "rat hoyeche", "onek rat",
    "ghum hoy na", "ghum ashe na",
    "sokal e uthbo", "alarm", "shopno",
    "dream", "ghumao", "tumi ghumao",
    "ami ghumai", "bye good night"
  ],
  replies: [
    "Good night! Shundor shundor shopno dekho! 🌙",
    "Ghumao, kal abar notun din! 😴",
    "Phone ta rekhe ebar chokh bondho koro! 😂",
    "Sweet dreams! Nijer kheyal rekho! 💗",
    "Rater ghum bhalo hole sokal tao shundor hoy! 🌸",
    "Ami ekhanei achi, kal abar golpo hobe! 😊",
    "Good night! Moner shob chinta ektu side-e rakho! 🌙",
    "Ghum-er age beshi phone dekho na! 📵",
    "Shuvo ratri! Bhalo theko! ❤️",
    "Shopne jodi dekha hoy, tahole hello bolo! 🤭"
  ]
};

// 21. FOOD
data.categories.food = {
  keywords: [
    "food", "khabar", "khawa", "khaiso",
    "kheyecho", "bhat", "vat", "biriyani",
    "biryani", "pizza", "burger", "fuchka",
    "chotpoti", "singara", "samosa", "noodles",
    "polao", "kacchi", "chicken", "beef",
    "fish", "mach", "mangsho", "ice cream",
    "chocolate", "mishti", "misti", "khida",
    "khudha", "hungry", "ranna", "cooking"
  ],
  replies: [
    "Khabar-er kotha shunlei amar-o khida peye jay! 😂",
    "Kacchi hole amake bhule jeo na! 🍛",
    "Khida pele age kheye nao, pore golpo hobe! ❤️",
    "Fuchka naki biriyani? Amar vote biriyani! 😋",
    "Chocolate dile bondhutto aro mojbut hoy! 🍫",
    "Ajke ki kheyecho? Menu ta shuni! 😊",
    "Bhalo khabar ar bhalo golpo—perfect combination! 🌸",
    "Khabar share korle kintu amar-o vag ache! 😜",
    "Ranna korte paro? Tahole ekdin treat chai! 👩‍🍳",
    "Pet bhore khao, mon khule hasho! 💗"
  ]
};

// 22. MUSIC / SONG
data.categories.music = {
  keywords: [
    "music", "song", "gaan", "gan", "gana",
    "favorite song", "fav song", "singer",
    "lyrics", "guitar", "piano", "music shuni",
    "gaan shunbo", "gaan gao", "gai",
    "sad song", "romantic song", "love song",
    "bangla song", "hindi song", "english song",
    "playlist", "headphone", "tune",
    "melody", "music lover"
  ],
  replies: [
    "Gaan moner onek kotha bole dey! 🎶",
    "Romantic gaan naki sad gaan pochondo? 💗",
    "Ekta bhalo playlist puro mood change kore dite pare! 🎧",
    "Gaan shunte shunte cha hole jome jabe! ☕",
    "Tomar favorite singer ke? 😊",
    "Kichu gaan ache, shunlei purono smriti fire ashe! 🌸",
    "Music chara life ta ektu chupchap lage! 🎵",
    "Ajker mood-er jonno ekta gaan recommend koro! 😁",
    "Gaan-er moddhe onek shanti ache! ❤️",
    "Ami lyrics bujhi, kintu tomar moner tune ta bujhte chai! 🎶"
  ]
};

// 23. GAMING
data.categories.gaming = {
  keywords: [
    "game", "gaming", "gamer", "free fire",
    "freefire", "ff", "pubg", "bgmi", "minecraft",
    "roblox", "mobile legends", "mlbb", "valorant",
    "call of duty", "cod", "rank", "rank push",
    "booyah", "headshot", "kill", "squad",
    "duo", "solo", "guild", "clash squad",
    "game khelbo", "game kheli", "gaming setup",
    "noob", "pro player", "lag"
  ],
  replies: [
    "Game khelte gele age team-er coordination lagbe! 🎮",
    "Noob bole hasho na, shobai ekdin beginner chilo! 😂",
    "Rank push cholche naki? 😎",
    "Headshot marar age aim practice koro! 🎯",
    "Squad-e ekjon bhalo teammate thaka dorkar! 🤝",
    "Game-er cheye real life-er mission-o complete koro! 😜",
    "Lag hole phone-er upor rag koro na! 🤣",
    "Ajke kon game-e pro howar plan? 🎮",
    "Booyah pele treat chai! 🏆",
    "Gaming bhalo, kintu break nite bhulo na! 💗"
  ]
};

// 24. ATTITUDE
data.categories.attitude = {
  keywords: [
    "attitude", "attitude dekhai", "attitude keno",
    "ego", "self respect", "respect",
    "amar style", "amar rule", "ami emon",
    "care kori na", "don't care", "ignore them",
    "king", "queen", "boss", "legend",
    "swag", "confidence", "bold",
    "nijer moto", "ami alada", "unique",
    "amake keu thamate parbe na",
    "ami kauke voy pai na", "power"
  ],
  replies: [
    "Attitude thakuk, kintu manners-o thaka dorkar! 😎",
    "Self respect ar ego ek jinis na! ❤️",
    "Nijer moto thako, copy hoyo na! 🔥",
    "Boss howar age nijer kaj-e boss hou! 😁",
    "Confidence thakuk, kintu onno ke choto koro na! 🌸",
    "Style tomar, rules-o tomar—just respect maintain koro! 😌",
    "Chup thaka shobshomoy durbolota na! 💯",
    "Real attitude kaj-e dekha jay, kothay na! 😎",
    "Nijer value bujho, kintu manushkeo value dao! ❤️",
    "Legend hote hole consistency lage! 🚀"
  ]
};

// 25. FAMILY
data.categories.family = {
  keywords: [
    "family", "poribar", "baba", "ma", "ammu",
    "abbu", "mama", "baba ma", "parents",
    "bhai bon", "vai bon", "sister", "brother",
    "dada", "didi", "nana", "nani",
    "dadu", "dadi", "relative", "cousin",
    "family problem", "family niye tension",
    "ma ke miss", "baba ke miss", "family love"
  ],
  replies: [
    "Family-r sathe shomoy katano onek special! ❤️",
    "Ma-er hater khabarer sathe kichur tulona hoy na! 🥰",
    "Poribarer manushgulo-ke shomoy dite bhulo na! 🌸",
    "Family-r bhalobasha onek shomoy shobcheye boro strength! 💗",
    "Baba-ma-r doa onek boro support! 🤲",
    "Choto choto family moment-i pore boro smriti hoy! 😊",
    "Family niye mon kharap hole khule kotha bolo! 🤗",
    "Shobar sathe ektu shomoy katale mon bhalo hoy! ❤️",
    "Poribarer bondhon ta shundor rekho! 🌷",
    "Ajke family-r sathe ki special kichu holo? 😁"
  ]
};

// 26. WEATHER
data.categories.weather = {
  keywords: [
    "weather", "bristi", "brishti", "rain",
    "rod", "rood", "gorom", "thanda",
    "shit", "winter", "summer", "monsoon",
    "megh", "akash", "cloud", "storm",
    "jhor", "weather kemon", "bristi hocche",
    "bristi porche", "onek gorom", "onek thanda",
    "brishtir din", "rainy day"
  ],
  replies: [
    "Brishtir dine cha ar golpo—darun combination! ☔",
    "Gorom beshi hole pani khete bhulo na! 💧",
    "Meghla akash-er moddheo ekta alada shundorjo ache! 🌥️",
    "Thanda lagle gorom kapor poro! 🧣",
    "Brishtir shobdo shunle mon ta kemon shanto hoy! 🌧️",
    "Ajker weather-er sathe ek cup cha perfect! ☕",
    "Rod hok ba brishti, mon bhalo rakho! ❤️",
    "Brishtite bhijte iccha kore naki? 😜",
    "Weather jemon-i hok, mood ta sundor rakho! 🌸",
    "Megh dekhlei amar romantic mood chole ashe! 🌙"
  ]
};

// 27. TRAVEL
data.categories.travel = {
  keywords: [
    "travel", "tour", "ghurte jabo", "ghurte chai",
    "berate jabo", "vromon", "trip", "tour plan",
    "cox's bazar", "cox bazar", "sajek", "bandarban",
    "sylhet", "sundarban", "dhaka", "chittagong",
    "sea beach", "pahar", "mountain", "sea",
    "hotel", "ticket", "flight", "train",
    "bus journey", "road trip", "travel lover",
    "ghurte valo lage", "travel partner"
  ],
  replies: [
    "Travel korle notun jaygar sathe notun smritio hoy! ✈️",
    "Pahar naki shomudro? Tomar choice ki? 🌊",
    "Trip plan korle amakeo golpo shonate hobe! 😁",
    "Notun jayga dekhar anondo alada! 🌍",
    "Travel-er age budget ar safety plan kore nio! ❤️",
    "Cox's Bazar-er sunset dekhte darun lage! 🌅",
    "Paharer hawa ar shanto poribesh—mon bhalo kore dey! 🏔️",
    "Ekta choto trip-o onek boro refreshment! 😊",
    "Travel partner bhalo hole journey aro mojadar! 💗",
    "Bag guchiyecho? Naki ekhono plan-i cholche? 😂"
  ]
};

// 28. ANXIETY / TENSION
data.categories.tension = {
  keywords: [
    "tension", "chinta", "worry", "worried",
    "anxiety", "voy lagche", "voye achi",
    "bhoy", "panic", "overthinking",
    "beshi vabchi", "ki hobe", "future niye chinta",
    "pressure", "stress", "stressed",
    "mathay onek chinta", "ghum hocche na",
    "decision nite parchi na", "confused",
    "ki korbo bujhi na", "mon osthir"
  ],
  replies: [
    "Ekbare shob solve korte hobe na, ekta kore step nao! ❤️",
    "Ektu shash nao, tarpor problem ta niye bhabo! 🌸",
    "Overthinking korle nijer mon-i klanto hoye jay! 🫂",
    "Jeta tomar control-e ache, shetar upor focus koro! 💗",
    "Tension hole bishwasto karo sathe kotha bolo! 😊",
    "Shob kichur uttor ekhon-i pete hobe na! 🌷",
    "Ektu rest nao, tarpor abar notun kore chesta koro! ❤️",
    "Nijeke eto pressure dio na! 🤗",
    "Choto ekta step-o progress! 💪",
    "Ki niye eto chinta hocche? Bolte chaile shunchi! 🌸"
  ]
};

// 29. LONELINESS
data.categories.lonely = {
  keywords: [
    "lonely", "eka", "ekla", "eka achi",
    "keu nei", "keu nai", "amar keu nei",
    "single", "alone", "loneliness",
    "eka lage", "ekakitto", "kotha bolar keu nai",
    "friend nei", "bondhu nai", "shobai busy",
    "keu bujhe na amake", "keu khoj ney na",
    "amake keu mone rakhe na", "ignore kore shobai"
  ],
  replies: [
    "Eka lagle nijer pochonder kichu korte paro! 🌸",
    "Kotha bolar iccha hole bishwasto karo sathe jogajog koro! ❤️",
    "Eka thaka mane tumi mullohin na! 💗",
    "Tomar feelings gulo guruttopurno, nijeke obohela koro na! 🤗",
    "Notun bondhu bananor jonno choto kore hello bolte paro! 😊",
    "Shobai busy thakleo nijer jonno shomoy rekho! 🌷",
    "Nijer sathe bhalo bondhutto korao important! ❤️",
    "Ajke moner moddhe ki cholche? Bolte paro! 🫂",
    "Ekakitto komate nijer pochonder activity-te shomoy dao! 🌼",
    "Tumi shonar moto, tomar kothar-o mullo ache! 💕"
  ]
};

// 30. GOODBYE
data.categories.goodbye = {
  keywords: [
    "bye", "byee", "goodbye", "allah hafez",
    "khoda hafez", "tata", "jacchi", "jabo",
    "pore kotha hobe", "see you", "cya",
    "abar dekha hobe", "pore asbo", "ekhon jai",
    "bye prema", "good bye", "biday",
    "ar kotha bolbo na", "chole gelam",
    "offline", "ber hocchi", "pore kotha bolbo"
  ],
  replies: [
    "Achha, bhalo theko! Abar esho! ❤️",
    "Bye bye! Nijer kheyal rekho! 🌸",
    "Pore abar golpo hobe, thik ache? 😊",
    "Allah Hafez! Shundor shomoy katuk! 🤲",
    "Jao, kintu abar fire aste bhulo na! 😜",
    "See you soon! 💗",
    "Bhalo theko, hashi khushi theko! 🌷",
    "Abar dekha hobe, totokkhon nijer care nio! 🥰",
    "Bye! Group-e abar dekha hobe! 😂",
    "Chole gele? Thik ache, miss korbo kintu! 🥺"
  ]
};

// ==========================================
// PART 2 END
// PART 3 will continue in this same file.
// Do not add another module.exports here.
// ==========================================
// ==========================================
// PREMA GROUP BOT - DATA PART 3
// Add below PART 2 in premaData.js
// ==========================================

// 31. PROPOSE
data.categories.propose = {
  keywords: [
    "propose", "propose korbo", "propose korba",
    "propose koro", "will you marry me",
    "will you be mine", "amar hoba", "amar hobe",
    "valobashbe amay", "amake valobashba",
    "relationship e jaba", "relation korba",
    "prem korba amar sathe", "i like you",
    "i have a crush on you", "crush",
    "moner kotha bolbo", "moner kotha",
    "proposal", "love proposal", "biye korba"
  ],
  replies: [
    "Propose korte hole mon theke koro, dialogue mukhosto kore na! ❤️",
    "Eto shoja? Age ekta misti golpo shuru hok! 🥰",
    "Aha! Keu dekhi ajke moner kotha bolte chay! 🙈",
    "Propose-er age nijer feelings ta bujhe nao! 💗",
    "Ekta shundor proposal-er cheye sincere mon beshi important! 🌹",
    "Oho! Ajke ki prem-er notun chapter shuru hobe? 😜",
    "Moner kotha bolar shahosh ta kintu shundor! ❤️",
    "Proposal accepted hobe kina jani na, kintu confidence bhalo! 😂",
    "Shotti kore bolo, kake eto pochondo tomar? 👀",
    "Bhalobasha jor kore hoy na, dujoner iccha dorkar! 💕"
  ]
};

// 32. MARRIAGE
data.categories.marriage = {
  keywords: [
    "biye", "marriage", "wedding", "biye korbo",
    "biye korba", "biye korte chai", "bou",
    "bor", "jamai", "shami", "strI",
    "life partner", "future husband", "future wife",
    "bou hobe", "jamai hobe", "biye bari",
    "holud", "gaye holud", "kabinnama",
    "nikah", "shongshar", "married", "single theke married"
  ],
  replies: [
    "Biye shudhu ekta event na, onek boro responsibility! 💍",
    "Bhalo life partner mane bhalo bondhu-o! ❤️",
    "Biye-r age dujoner bojhapora khub important! 🌸",
    "Aha! Keu dekhi future plan kore felche! 😁",
    "Biye bari mane khawa-dawa ar moja! 😂",
    "Shomporke respect ar trust thakle shongshar shundor hoy! 💗",
    "Life partner-er moddhe bondhutto thaka dorkar! 🥰",
    "Biye-r shopno dekho, kintu decision ta bhebe nio! 🌷",
    "Gaye holud-e amake dawat dite bhulo na! 💛",
    "Dujoner shommoti ar shomman-i shundor shomporker bhitti! ❤️"
  ]
};

// 33. TRUST
data.categories.trust = {
  keywords: [
    "trust", "bishash", "biswas", "bisshash",
    "trust koro", "amake bishash koro",
    "ami bishash kori", "trust issue",
    "biswas korte parchi na", "vorsa",
    "vorosha", "betray korbe", "cheat korbe",
    "secret rakhba", "kotha rakhba",
    "loyal", "loyalty", "faithful",
    "shotto thako", "shotti bolo", "bishash nei"
  ],
  replies: [
    "Trust ekbar bhangle abar gore tulte shomoy lage! ❤️",
    "Kotha ar kaj mile gele bishash barbe! 🌸",
    "Shomporke trust thaka khub important! 💗",
    "Blind trust na, bujhe-shune bishash koro! 😊",
    "Loyalty kothay na, kaj-e proman hoy! 🤝",
    "Bishash korte hole dujoner-i honest thaka dorkar! ❤️",
    "Shobai ek rokom na, tobe nijer boundary rekho! 🌷",
    "Trust ar respect eksathe thaklei shomporko mojbut hoy! 💕",
    "Karo bishash niye khela kora uchit na! 😌",
    "Tomar kache trust-er mane ki? 👀"
  ]
};

// 34. LIES
data.categories.lies = {
  keywords: [
    "mithha", "mittha", "mithya", "mittha bolcho",
    "mithha bolo na", "lie", "lying", "liar",
    "mittha kotha", "shotti na", "sotti bolo",
    "dhoka", "dhoka diyecho", "thokiecho",
    "thokano", "fake", "nokol", "acting korcho",
    "natok", "vondami", "shotto kotha",
    "sotti kotha bolo", "amake boka baniyo na"
  ],
  replies: [
    "Shotti kotha kokhono kokhono kothin, tobuo shotti bhalo! ❤️",
    "Mithya diye shomporko beshi din tikano jay na! 🌸",
    "Jodi kono bhul hoy, shoja kore shikar kora bhalo! 😊",
    "Ami detective na, kintu golmele kotha bujhte pari! 🕵️",
    "Honest thaka shobshomoy easy na, kintu important! 💗",
    "Bujhte hole age puro kotha shona dorkar! 🤝",
    "Bhul bujhabujhi hole clear kore nao! 🌷",
    "Shotti bolte shahosh lage, sheta shobar thake na! ❤️",
    "Natok kom, clear kotha beshi! 😂",
    "Ki hoyeche? Kono kotha niye shondeho hocche? 👀"
  ]
};

// 35. TEASING
data.categories.teasing = {
  keywords: [
    "tease", "teasing", "jhalai", "jalai",
    "khunshuti", "dustumi", "dustu", "dustu meye",
    "dustu chele", "pagli", "pagla", "bandor",
    "shoytan", "dushtu", "khilli", "moja nichho",
    "amake jalaccho", "jalio na", "khunshuti korba",
    "ektu moja", "poke", "roast", "roast koro"
  ],
  replies: [
    "Ektu dustumi na korle golpo jome naki? 😜",
    "Tomake jalano amar ajker special mission! 😂",
    "Aha! Rag korcho naki lojja pachcho? 🙈",
    "Dustu holeo mon ta kintu misti! ❤️",
    "Khunshuti cholbe, kintu limit maintain korte hobe! 😁",
    "Tomar reaction dekhar jonnoi ektu moja kori! 🤭",
    "Eto serious hole moja korbo kar sathe? 😂",
    "Dustu number one award tomar! 🏆",
    "Ami kichu boli nai, tumi nijei dhore felechho! 😇",
    "Bujhlam, ajke tomar sathe moja kora jabe na! 🤣"
  ]
};

// 36. OBHIMAN
data.categories.obhiman = {
  keywords: [
    "obhiman", "oviman", "oviman korchi",
    "obhiman korechi", "obhiman hoyeche",
    "amar obhiman", "kotha bolo na",
    "amake vule gecho", "bhule gecho",
    "khoj nao na", "message dao na",
    "age moto na", "bodle gecho",
    "amake time dao na", "time nei",
    "amar kotha mone nei", "kosto diyecho",
    "mon kharap korecho", "rag kore achi"
  ],
  replies: [
    "Obhiman hoy tar upor, jar kache kichu asha thake! 🥺",
    "Ektu ador ar shomoy dile obhiman kome jete pare! ❤️",
    "Moner kotha na bolle ke bujhbe bolo? 🌸",
    "Obhiman jomiye rekho na, khule bolo! 💗",
    "Karo jonno opekkha korle take janiye dio! 😊",
    "Aha! Eto obhiman kothay jome ache? 🫂",
    "Ekta sorry ar ektu care onek kichu thik korte pare! 💕",
    "Shomporke obhiman thakuk, kintu kotha bondho na hok! 🌷",
    "Tomar kotha shonar jonno shomoy deowa dorkar! ❤️",
    "Ebar bolo, ke tomar obhimaner karon? 👀"
  ]
};

// 37. PRAISE / SHABASH
data.categories.praise = {
  keywords: [
    "shabash", "sabas", "congratulations", "congrats",
    "well done", "good job", "great job",
    "proud of you", "proud", "osadharon kaj",
    "darun korecho", "valo korecho", "bhalo korecho",
    "success hoyeche", "pass korechi",
    "jitechi", "win korechi", "achievement",
    "amake congratulate koro", "khub valo"
  ],
  replies: [
    "Yay! Tomar jonno onek onek shubhechha! 🎉",
    "Darun! Erokom success aro ashuk! ❤️",
    "Nijer upor gorbo korte paro! 🥰",
    "Shabash! Chesta-r fol peyecho! 💪",
    "Aro shamne egiye jao! 🌟",
    "Ei success celebrate kora dorkar! 🎊",
    "Tomar achievement shune khub bhalo laglo! 😊",
    "Keep going! Ekhono onek kichu baki! 🚀",
    "Aajke treat kintu tomar theke! 😂",
    "Chesta chaliye gele aro bhalo kichu hobe! 💗"
  ]
};

// 38. GOOD MORNING
data.categories.morning = {
  keywords: [
    "good morning", "gm", "shuvo sokal",
    "suvo sokal", "sokal", "sokale",
    "ghum theke uthlam", "uthechi",
    "morning", "sokal hoyeche", "new day",
    "notun din", "ajker din", "sokal bela",
    "morning wish", "sokal er shubhechha"
  ],
  replies: [
    "Good morning! Ajker din ta shundor katuk! 🌞",
    "Shuvo shokal! Notun din, notun asha! 🌸",
    "Uthe porecho? Ebar ek cup cha hoye jak! ☕",
    "Ajke mon khule hashar din! 😊",
    "Good morning! Nijer care nite bhulo na! ❤️",
    "Sokal ta shuru hok ekta misti hasi diye! 🥰",
    "Notun din-e notun kichu shekhar chesta koro! 🌷",
    "Ajke tomar plan ki? 👀",
    "Ghum kemon holo? Bhalo to? 😴",
    "Sokal sokal eto energy kotha theke pao? 😂"
  ]
};

// 39. AFTERNOON
data.categories.afternoon = {
  keywords: [
    "good afternoon", "afternoon", "dupur",
    "dupur bela", "shuvo dupur", "lunch time",
    "lunch korbo", "dupurer khawa", "dupure",
    "bhat kheyechi", "dupure ghum",
    "dupur hoyeche", "midday"
  ],
  replies: [
    "Shuvo dupur! Kheye-dheye ektu rest nio! 🌞",
    "Dupurer khawa hoyeche to? 🍚",
    "Good afternoon! Din ta bhalo katuk! ❤️",
    "Ektu break nao, tarpor abar kaj! 😊",
    "Dupure ghum dile kintu uthte deri hoy! 😂",
    "Ajker lunch menu ki chilo? 😋",
    "Gorom hole beshi pani kheyo! 💧",
    "Dupur ta shundor katuk! 🌸"
  ]
};

// 40. EVENING
data.categories.evening = {
  keywords: [
    "good evening", "evening", "shuvo sondha",
    "sondha", "shondha", "bikel",
    "bikeler cha", "tea time", "cha khabo",
    "bikel bela", "evening walk", "sundor sondha",
    "sondhar akash", "sunset"
  ],
  replies: [
    "Shuvo shondha! Cha kheye golpo koro! ☕",
    "Bikeler hawa ta onek shundor lage! 🌸",
    "Good evening! Ajker din kemon gelo? 😊",
    "Ek cup cha ar kichu golpo hole mondo hoy na! ❤️",
    "Sunset dekhte bhalo lage tomar? 🌅",
    "Bikel ta nijer jonno ektu rekho! 💗",
    "Cha-biscuit ready? Naki shudhu golpo cholbe? 😂",
    "Shondha ta anonde katuk! 🌷"
  ]
};

// 41. WAITING
data.categories.waiting = {
  keywords: [
    "wait", "waiting", "opekkha", "opekkha korchi",
    "wait korchi", "onek khon", "late korcho",
    "deri korcho", "reply er opekkha",
    "message er opekkha", "kokhon ashbe",
    "kokhon asba", "kokhon firba",
    "tomar jonno wait", "opekkhay achi",
    "asar kotha chilo", "ekhono asoni"
  ],
  replies: [
    "Opekkha korte hole patience lage! ❤️",
    "Kauke opekkha korale age janiye deowa bhalo! 😊",
    "Eto opekkha koro na, nijer kaj-o kore jao! 🌸",
    "Aha! Kar jonno eto opekkha? 👀",
    "Shomoy moto asha onek boro care! 💗",
    "Opekkhar shesh ta shundor hok! 🌷",
    "Late hole ekta message diye dio! 😜",
    "Opekkha ar obhiman mile ajke mon kharap naki? 🥺"
  ]
};

// 42. MEMORIES
data.categories.memories = {
  keywords: [
    "smriti", "sriti", "memory", "memories",
    "purono din", "old days", "school life",
    "childhood", "chotobela", "shei din",
    "mone pore", "purono kotha", "old memories",
    "nostalgia", "purono chobi", "old photo",
    "ager moto", "smritir pata", "past",
    "purono bondhu", "school er din"
  ],
  replies: [
    "Kichu smriti kokhono purono hoy na! ❤️",
    "Purono diner kotha mone porle mon kemon kore! 🌸",
    "Smriti gulo shundor kore mone rekho! 💗",
    "School life-er moja alada chilo! 😂",
    "Shomoy chole jay, kintu kichu muhurto theke jay! 😊",
    "Purono chobi dekhle koto kotha mone pore! 📸",
    "Ager diner kon smriti tomar shobcheye priyo? 🥰",
    "Smriti thakuk, notun golpo-o toiri hok! 🌷"
  ]
};

// 43. SECRET / GOSSIP
data.categories.secret = {
  keywords: [
    "secret", "gossip", "gupto kotha",
    "secret bolbo", "ekta secret", "kauke bolba na",
    "kawke bolio na", "shudhu tomake bolchi",
    "gopon kotha", "ki gossip", "ki khobor",
    "ekta news", "shunte chao", "ekta kotha ache",
    "confidential", "personal kotha", "secret ache"
  ],
  replies: [
    "Oho! Notun gossip naki? Shuni! 👀",
    "Age bolo, eta serious naki moja? 😁",
    "Aha! Group-e notun khobor ashte jacche! 😂",
    "Personal kichu hole public group-e share na korai bhalo! 🤫",
    "Bolo, ami mon diye shunchi! 🌸",
    "Gossip-er age source verify kora dorkar! 🕵️",
    "Eto suspense keno? Taratari bolo! 😜",
    "Karo privacy noshto hoy emon kichu share koro na! ❤️"
  ]
};

// 44. GOOD LUCK
data.categories.goodluck = {
  keywords: [
    "good luck", "best of luck", "all the best",
    "shuvo kamona", "shubhokamna", "luck",
    "wish me luck", "amar jonno doa koro",
    "dua koro", "doa korba", "exam er jonno doa",
    "interview ache", "interview", "new journey",
    "notun kaj", "notun shuru"
  ],
  replies: [
    "Best of luck! Nijer upor bishash rekho! ❤️",
    "Tomar jonno onek shubhokamna roilo! 🌸",
    "InshaAllah bhalo kichu hobe! 🤲",
    "Shanto mone kaj koro, tumi parbe! 💪",
    "Good luck! Nijer best ta dio! 🌟",
    "Doa roilo, shob kichu bhalo hok! 💗",
    "Chesta tomar, baki ta shomoyer hate! 😊",
    "Notun journey-r jonno onek bhalobasha! 🚀"
  ]
};

// 45. MOOD
data.categories.mood = {
  keywords: [
    "mood", "mood valo", "mood bhalo",
    "mood off", "mood fresh", "mood swing",
    "ajke valo lagche", "ajke bhalo lagche",
    "mon valo", "mon bhalo", "happy",
    "khushi", "onek khushi", "excited",
    "boring", "bored", "mon bosche na",
    "kichu korte iccha nei", "ajke moja lagche"
  ],
  replies: [
    "Mood bhalo thakle shob kichui ektu easy lage! 😊",
    "Aha! Ajke khushir karon ta ki? 🥰",
    "Mood off hole nijer pochonder kichu koro! 🌸",
    "Boring lagle ekta moja golpo shuru koro! 😂",
    "Tomar happiness ta emni thakuk! ❤️",
    "Ajke dekhi energy full! ⚡",
    "Mon bhalo rakhar choto choto karon khuje nao! 💗",
    "Mood swing hole nijeke ektu shomoy dao! 🌷",
    "Khushi thako, karon tomar hasi important! 😊",
    "Ajker mood-er rating koto out of 10? 😜"
  ]
};

// ==========================================
// PART 3 END
// Continue with PART 4 in this same file.
// Do not add another module.exports here.
// ==========================================
// ==========================================
// PREMA GROUP BOT - DATA PART 4
// Add below PART 3 in premaData.js
// ==========================================

// 46. QUESTION
data.categories.question = {
  keywords: [
    "ki", "keno", "kivabe", "kibhabe", "kokhon",
    "kothay", "ke", "kar", "kake", "kon",
    "ki hoyeche", "ki korbo", "ki kora uchit",
    "tomar ki mone hoy", "tumi ki bolo",
    "answer dao", "uttor dao", "question",
    "ekta prosno", "amar prosno", "bujhiye bolo"
  ],
  replies: [
    "Darun question! Ektu context dile bhalo kore bolte parbo! 😊",
    "Hmm, eta niye ektu bhebe boli! 🌸",
    "Ki jante chao, shoja kore bolo! ❤️",
    "Proshno ta interesting, aro details dao! 👀",
    "Ami shunchi, tomar question ta bolo! 💗",
    "Ekta kore question koro, shobgulor uttor debo! 😁",
    "Eta niye tomar nijer dharona ki? 😊",
    "Bujhiye bolar chesta korbo, bolo! 🌷"
  ]
};

// 47. PERMISSION
data.categories.permission = {
  keywords: [
    "ekta kotha bolbo", "kichu bolbo", "bolte pari",
    "ekta question kori", "jiggesh kori",
    "tomake kichu boli", "shunba",
    "shunte chao", "bolbo naki", "permission",
    "mind korba", "mind korbe", "rag korba na",
    "ekta kotha ache", "kotha ache tomar sathe"
  ],
  replies: [
    "Obosshoi bolo, mon diye shunchi! 😊",
    "Bolo, ami mind korbo na! 💗",
    "Permission deowa holo, ekhon bolo! 😜",
    "Hmm, ki kotha? Eto suspense keno? 👀",
    "Nishchinte bolo, ami shunchi! 🌸",
    "Bolo bolo, golper dorja khola! 😂",
    "Hae, bolo! Tarpor ami amar motamot debo! ❤️",
    "Ekdom bolo, lukochuri keno? 🤭"
  ]
};

// 48. AGREEMENT
data.categories.agreement = {
  keywords: [
    "thik", "thik ache", "thik ase", "okay",
    "ok", "okk", "hmm thik", "right",
    "exactly", "ekdom", "setai", "tai to",
    "ami ekmot", "agree", "agreed",
    "besh", "valo kotha", "bhalo kotha",
    "sotti kotha", "100 percent", "sure"
  ],
  replies: [
    "Hae, etai to bolchilam! 😁",
    "Dekhle, amader mot mile geche! ❤️",
    "Ekdom thik bolecho! 🌸",
    "Besh, tahole ei bishoy-e amra ekmot! 😊",
    "Exactly! Ebar porer topic-e jawa jak! 😂",
    "Tomar sathe ei point-e amar-o mil ache! 💗",
    "Hae, kothata juktijukto! 👍",
    "Bujhte perecho dekhi! 😎"
  ]
};

// 49. DISAGREEMENT
data.categories.disagreement = {
  keywords: [
    "na", "nah", "nahi", "na re",
    "ami mani na", "ekmot na", "wrong",
    "vul", "bhul", "eta thik na",
    "tumi vul", "tomar kotha thik na",
    "ami agree kori na", "disagree",
    "kokhono na", "hobe na", "eta hoy na",
    "amar mote na", "ami alada vabi"
  ],
  replies: [
    "Thik ache, tomar motamot-o shunte chai! 😊",
    "Amader mot alada hotei pare! 🌸",
    "Tahole tomar explanation ta shuni! 👀",
    "Besh, ami tomar point ta bujhar chesta korchi! ❤️",
    "Motbirodh thakleo shundor kore kotha bola jay! 🤝",
    "Oho! Debate shuru hoye gelo naki? 😂",
    "Tumi keno emon bhabcho, ektu bolo! 💗",
    "Ekta bishoye alada mot thaka normal! 😊"
  ]
};

// 50. BOREDOM
data.categories.boredom = {
  keywords: [
    "bore hocche", "boring lagche", "bored lagche",
    "kichu korar nai", "ki korbo", "time pass",
    "time pass korbo", "mon bosche na",
    "eka eka lagche", "kichu moja nai",
    "boring life", "ghum pacche na",
    "golpo koro", "moja chai", "entertain koro",
    "amake hasao", "fun chai"
  ],
  replies: [
    "Cholo ekta funny question kori! 😂",
    "Boring dur korte ekta golpo shuru koro! 😁",
    "Ajke tomar secret talent ta bolo! 👀",
    "Cholo ekta game kheli—truth naki dare? 😜",
    "Eto boring hole group-e ektu moja koro! 🎉",
    "Ekta random topic dao, golpo shuru kori! 🌸",
    "Tomar ajker shobcheye funny ghotona ki? 🤣",
    "Boredom-er medicine holo ektu hasi! ❤️"
  ]
};

// 51. NAME CALLING
data.categories.namecall = {
  keywords: [
    "prema koi", "prema kothay", "prema aso",
    "prema shuno", "prema bol", "prema reply dao",
    "prema ki korcho", "prema acho",
    "prema online", "prema koi tumi",
    "prema dakchi", "oi prema", "hey prema",
    "premaaaa", "premaaa", "priya prema",
    "prema suno", "prema ekbar aso"
  ],
  replies: [
    "Ei je! Eto jore dakcho keno? 😂",
    "Hae, ami achi! Bolo ki hoyeche? ❤️",
    "Dak shune hajir! Ki khobor? 😊",
    "Amake chara group-er adda jome na naki? 😎",
    "Bolo, Prema tomar kotha shunte ready! 💗",
    "Oii! Ebar bolo, ki dorkar? 🌸",
    "Ami online achi, tomar message-er opekkhay! 😜",
    "Eto dakadaki! Amar attendance diye dilam! 😂"
  ]
};

// 52. GROUP CHAT
data.categories.groupchat = {
  keywords: [
    "group", "group chat", "group e", "group er",
    "gc", "adday", "adda", "group adda",
    "shobai koi", "ke ke acho", "active ke",
    "keu nai", "shobai chup", "group silent",
    "group dead", "group alive", "admin",
    "member", "group member", "group e aso",
    "shobai kemon", "ki obostha shobar"
  ],
  replies: [
    "Group eto chup keno? Shobai ghumaccho naki? 😂",
    "Adda jomate hole shobai ekta kore kotha bolo! 😁",
    "Oii group-er manushjon, shobai koi? 👀",
    "Ei group-e hashi ar golpo choltei thakuk! ❤️",
    "Admin bhai, attendance niben naki? 🤣",
    "Shobai active hole ami-o adda dibo! 🌸",
    "Group-er shanti beshikkhon thake na mone hoy! 😜",
    "Keu ekta notun topic dao! 💗"
  ]
};

// 53. ADMIN
data.categories.admin = {
  keywords: [
    "admin", "admin vai", "admin bhai",
    "admin apu", "admin kothay", "admin koi",
    "admin dak", "admin ke bolo", "admin help",
    "owner", "moderator", "mod",
    "admin er power", "admin ban",
    "kick", "ban korbe", "unban"
  ],
  replies: [
    "Admin-er kotha shobshomoy shunte hoy naki? 😂",
    "Admin bhai-ke dakbo, naki age nijera solve korbo? 😜",
    "Group-er shanti rakha admin-er boro responsibility! 🌸",
    "Admin online thakle shobai besh shanto! 🤭",
    "Admin-er kache complaint joma hocche dekhi! 😂",
    "Bhalo admin hole group-o bhalo thake! ❤️",
    "Ki hoyeche? Admin-er help lagbe? 😊"
  ]
};

// 54. COMPLAINT
data.categories.complaint = {
  keywords: [
    "complain", "complaint", "ovijog",
    "obhijog", "nalish", "nalish korbo",
    "amar problem", "problem hocche",
    "kharap byabohar", "baje behavior",
    "keu disturb korche", "birokto korche",
    "amake disturb", "jhamela korche",
    "help lagbe", "sahajjo chai"
  ],
  replies: [
    "Ki hoyeche? Shanto kore puro ghotona bolo! 😊",
    "Problem hole age bishoy ta clear kora dorkar! 🌸",
    "Tomar kotha shunchi, bolo! ❤️",
    "Jodi keu disturb kore, proyojone admin-ke janao! 🤝",
    "Jhogra na bariye shomadhan khuje dekho! 💗",
    "Ami judge korbo na, age tomar kotha shuni! 😊",
    "Bujhlam, bishoy ta serious mone hocche! 🌷"
  ]
};

// 55. CONFUSION
data.categories.confusion = {
  keywords: [
    "bujhlam na", "bujhi nai", "bujhte parchi na",
    "confused", "confusion", "ki bolle",
    "ki bujhate chaicho", "mane ki",
    "bujhi na", "mathay dhukche na",
    "clear na", "clear koro", "abar bolo",
    "repeat koro", "ki bolte chao",
    "ami confused", "kichui bujhi na"
  ],
  replies: [
    "Achha, aro shohoj kore boli! 😊",
    "Kon part ta bujhte oshubidha hocche? 🌸",
    "Ekbar dhire dhire boli, chinta nei! ❤️",
    "Ami ki beshi complicated kore fellam? 😂",
    "Thik ache, abar shuru theke boli! 💗",
    "Bujhte na parle jiggesh kora ekdom thik! 😊",
    "Ektu example dile hoyto shohoj hobe! 🌷",
    "Bolo kon jaygay confusion hocche! 👀"
  ]
};

// 56. SURPRISE
data.categories.surprise = {
  keywords: [
    "wow", "omg", "oh my god", "seriously",
    "sotti naki", "tai naki", "ki bolcho",
    "bishash hocche na", "biswas hocche na",
    "surprise", "unexpected", "obak",
    "obak holam", "kiiii", "no way",
    "really", "areh", "eita ki"
  ],
  replies: [
    "Hae re! Amio shune obak hoye gelam! 😲",
    "Oho! Eta to unexpected! 😂",
    "Wow! Golper twist dekhi darun! 🌸",
    "Sotti naki? Ektu details dao! 👀",
    "Ami holeo obak hotam! 😁",
    "Ki je bolo! Bishash korte koshto hocche! 🤭",
    "Aha! Ajke notun kichu jana gelo! ❤️",
    "Erokom surprise aro chai! 🎉"
  ]
};

// 57. REPEAT
data.categories.repeat = {
  keywords: [
    "abar bolo", "repeat", "repeat koro",
    "ki bolle abar", "shunte paini",
    "abar bolo na", "arekbar bolo",
    "bujhini", "miss korechi",
    "message dekhi nai", "ki likhecho",
    "pore bol", "arekbar"
  ],
  replies: [
    "Achha, abar bolchi! Mon diye shuno! 😊",
    "Hahaha! Mone hoy message ta miss hoye geche! 😂",
    "Thik ache, arekbar boli! ❤️",
    "Ebar kintu miss koro na! 😜",
    "Abar shunte chaile ami bolbo! 🌸",
    "Besh, shuru theke boli! 💗"
  ]
};

// 58. WELCOME
data.categories.welcome = {
  keywords: [
    "welcome", "welcoming", "notun member",
    "new member", "group e notun",
    "notun eshechi", "join korlam",
    "just joined", "welcome me",
    "amake welcome koro", "notun achi",
    "first time", "prothom din"
  ],
  replies: [
    "Welcome! Group-e shagotom! ❤️",
    "Areh! Notun member eshe geche! 🥳",
    "Welcome aboard! Shobar sathe moja koro! 🌸",
    "Notun bondhu paowa gelo! 😊",
    "Group-er adda te tomake shagotom! 💗",
    "Welcome! Nijer porichoy diye shuru koro! 😁",
    "Ebar theke tumio amader adda-r ongsho! 🎉",
    "Notun member-er jonno ekta virtual hug! 🤗"
  ]
};

// 59. INTRODUCTION
data.categories.introduction = {
  keywords: [
    "porichoy", "introduce", "introduction",
    "amar nam", "amar naam", "ami ke",
    "nijer porichoy", "name bolo",
    "tomar nam ki", "tomar naam ki",
    "ke tumi", "tumi ke", "about yourself",
    "nijer somporke bolo", "nijer kotha bolo"
  ],
  replies: [
    "Ami Prema! Golpo korte ar moja dite bhalobashi! 🥰",
    "Amar nam Prema, tomar nam ta ki? 😊",
    "Porichoy hok, tarpor jombe adda! 🌸",
    "Ami group-er golpo shonar ekjon virtual bondhu! 💗",
    "Tomar somporke ektu bolo! 👀",
    "Naam janlam, ebar tomar pochondo-opochondo shuni! 😁",
    "Notun porichoy, notun golpo! ❤️"
  ]
};

// 60. RANDOM FUN
data.categories.randomfun = {
  keywords: [
    "random", "random kotha", "random question",
    "kichu bolo", "moja kotha", "funny kotha",
    "ajob kotha", "weird", "paglami",
    "challenge", "truth or dare", "truth",
    "dare", "game kheli", "quiz kheli",
    "riddle", "dhadha", "ekta dhadha"
  ],
  replies: [
    "Random question: cha naki coffee? ☕",
    "Truth or dare khelba naki? 😜",
    "Ekta dhadha: joto kata hoy toto boro hoy—ki? 🤔",
    "Random fact: hasi dile mon halka hoy! 😁",
    "Challenge: ek line-e nijeke describe koro! 😂",
    "Jodi ekdin invisible hote parte, ki korte? 👀",
    "Ekta kotha bolo, ja shune shobai hasbe! 🤣",
    "Ajker random topic: tomar dream destination konta? 🌍"
  ]
};

// ==========================================
// PART 4 END
// Continue with PART 5 in this same file.
// Do not add another module.exports here.
// ==========================================
// ==============================
// PART 5 — CATEGORY 61 TO 75
// ==============================

Object.assign(data.categories, {

  emotional: {
    keywords: [
      "mon kharap", "onek emotional", "kanna pacche", "kandte iccha",
      "khub koshto", "vitor theke koshto", "mon ta valo nei",
      "feel kortechi", "emotional hoye gesi", "chokhe pani",
      "heart heavy", "mon venge geche"
    ],
    replies: [
      "Arey pagol, moner sob kotha chepe rekho na, amake bolo ❤️",
      "Kichu koshto kothay bojhano jay na, tobu ami shunte achi 🥺",
      "Ektu nijer jotno nao, tomar hashi ta important ❤️",
      "Mon kharap hole eka eka sob sojjo korte hoy na kintu 🤗",
      "Ajke na hoy ektu beshi ador niye thako, sob thik hobe ইনশাআল্লাহ ❤️",
      "Tomar moner megh kete abar rod uthuk, etai chai 🌸",
      "Kanna pele kede nao, feelings lukano kono competition na 🥹",
      "Ekta virtual hug nao, tight kore dilam 🤗"
    ]
  },

  overthinking: {
    keywords: [
      "overthink", "beshi vabchi", "ki hobe vabchi", "mathay ghurche",
      "chinta kortechi", "bar bar vabchi", "ghum hocche na chintay",
      "negative thought", "onek vabna", "matha kaj korche na",
      "ki je kori", "future niye chinta"
    ],
    replies: [
      "Mathake ektu chuti dao, sob kichur answer ekhoni lagbe na 🥺",
      "Overthinking bondho koro, nahole tomar brain overtime bill chaibe 😂",
      "Ja tomar control e nei, seta niye nijeke koshto dio na ❤️",
      "Ekta kore problem solve koro, sob ekshathe na 🤗",
      "Kichu jinis somoyer upor chere dilei valo hoy 🌸",
      "Ektu pani khao, deep breath nao, tarpor aste aste vabho 💗",
      "Tomar chinta komanor jonno ek cup cha pathate parle valo hoto ☕"
    ]
  },

  insecurity: {
    keywords: [
      "nijeke valo lage na", "ami sundor na", "ami valo na",
      "amar joggota nei", "keu pochondo kore na", "ami ki joggo",
      "confidence nei", "nijeke niye doubt", "ami parbo na",
      "amar upor keu khushi na", "ami useless"
    ],
    replies: [
      "Nijeke onner sathe compare koro na, tomar nijer ekta alada beauty ache ❤️",
      "Tumi perfect na holeo special hote paro, mone rekho 🌸",
      "Nijer value onner opinion diye measure koro na 🥺",
      "Tomar moddhe emon onek valo dik ache ja tumi nijeo dekho na 💗",
      "Confidence aste somoy lage, nijer upor ektu bishash rakho 🤗",
      "Tumi nijer chokhe nijeke choto korle cholbe na kintu ❤️",
      "Tomar moto ar ekta tumi nei, etai tomar uniqueness 😌"
    ]
  },

  excitement: {
    keywords: [
      "onek excited", "khub khushi", "darun lagche", "moja lagche",
      "ajke special", "finally hoyeche", "success hoyeche",
      "ami perechi", "good news", "osadharon khobor",
      "party korbo", "khushi te pagol"
    ],
    replies: [
      "Ohooo! Eto excitement! Amakeo khobor ta bolo 🥳",
      "Ei to chai! Tomar khushi dekhe amar o valo lagche ❤️",
      "Ajke tahole celebration must! 🎉",
      "Wooohooo! Keu ekjon ajke onek happy! 😍",
      "Khushir khobor ta share koro, ami ready achi 👀",
      "Ei energy ta dhore rakho, champion! 🔥",
      "Tomar smile er reason ta ki, shuni shuni! 😁"
    ]
  },

  exam: {
    keywords: [
      "exam ache", "exam kalke", "porikkha", "exam dicchi",
      "exam sesh", "exam er tension", "question kemon",
      "result ber hobe", "fail korbo", "pass korbo",
      "exam preparation", "suggestion dao"
    ],
    replies: [
      "Exam er age panic na kore important topic gulo revise koro 📚",
      "Best of luck! Matha thanda rekhe answer dio ❤️",
      "Exam sesh hole amake result er update diba kintu 😌",
      "Ja paro confidently likho, nijer upor bishash rakho 💪",
      "Tension komao, preparation e focus koro 📖",
      "Question tough holeo tumi tar cheye beshi tough! 😂",
      "Porashona ar rest duita balance kore cholo 🌸"
    ]
  },

  relationship: {
    keywords: [
      "relationship", "prem korbo", "prem korte chai",
      "single achi", "couple hobo", "valobasha chai",
      "love life", "amar partner", "relationship status",
      "bf chai", "gf chai", "premika chai", "premik chai"
    ],
    replies: [
      "Relationship er age moner mil ta dekho, sudhu status na ❤️",
      "Bhalobasha sundor jokhon dujon dujonke respect kore 🥰",
      "Single thaka kono dosh na, nijer life enjoy koro 😎",
      "Moner manush pele amake mishti khobor diba কিন্তু 😁",
      "Relationship e trust ar understanding sobcheye important 💗",
      "Prem korte gele age nijer moner khobor nao 😂",
      "Sundor relationship mane dujoner chesta, ekjoner na 🌹"
    ]
  },

  date: {
    keywords: [
      "date e jabo", "date korbo", "first date", "romantic date",
      "ghurte jabo", "date plan", "kothay jawa jay",
      "coffee date", "dinner date", "date idea"
    ],
    replies: [
      "First date hole simple coffee ar sundor conversation best ☕",
      "Date e gele phone kom, samner manushke beshi time dio ❤️",
      "Outfit ready? Naki ekhono almari'r sathe juddho cholche? 😂",
      "Sundor jayga ar sundor mon, date perfect hoye jabe 🌹",
      "First date er golpo pore amake bolte hobe kintu 👀",
      "Smile niye jao, baki magic nijer moto hobe 😍"
    ]
  },

  hug: {
    keywords: [
      "hug dao", "ekta hug", "joriye dhoro", "jore dhoro",
      "hug chai", "virtual hug", "kache aso", "buker moddhe",
      "ektu ador", "ador koro"
    ],
    replies: [
      "Nao ekta boro virtual hug, ekdom tight! 🤗",
      "Asho, sob tension bhule ektu hug nao 🥰",
      "Hug er sathe bonus ekta mishti smile free ❤️",
      "Eto ador chaile kintu protidin aste hobe 😜",
      "Virtual hug delivered! Parcel charge lagbe na 😂",
      "Mon kharap? Ekta hug diye shuru kori 🤗"
    ]
  },

  kiss: {
    keywords: [
      "kiss dao", "ekta kiss", "kiss chai", "chumu dao",
      "chumu khabo", "miss kiss", "forehead kiss",
      "kiss korba", "kiss diba"
    ],
    replies: [
      "Nao ekta mishti forehead kiss 😘",
      "Eto kiss er demand! Age ekta cute smile dao 😜",
      "Mwahhh! Ebar happy তো? 😘",
      "Ekta virtual kiss pathalam, inbox check koro 💋",
      "Chotto ekta kiss ar onekta bhalobasha ❤️",
      "Aha, ajke dekhi ador er order beshi! 😂"
    ]
  },

  nickname: {
    keywords: [
      "amar nickname", "ki name diba", "cute name dao",
      "ki bole dakba", "daknam dao", "sweet name",
      "amake ki bole dakbe", "pet name", "nickname bolo"
    ],
    replies: [
      "Tomake aj theke mishti bole dakle kemon hoy? 🥰",
      "Tomar jonno ekta cute nickname khujte hobe 😌",
      "Naam ta secret rakhi, surprise dibo! 🤭",
      "Tomar personality er sathe mile emon ekta naam chai ❤️",
      "Ami tomake sunshine bole dakte pari? ☀️",
      "Eto cute manusher nickname o cute howa chai! 😍"
    ]
  },

  foodcraving: {
    keywords: [
      "khide lagche", "khub khide", "biriyani khabo",
      "pizza khabo", "fuchka khabo", "burger khabo",
      "mishti khabo", "ice cream khabo", "ki khabo",
      "food craving", "khabar iccha"
    ],
    replies: [
      "Khide pele age kheye nao, pore abar duniya joy koro 😂",
      "Biriyani hole amakeo dawat dite bhulo na! 🍗",
      "Fuchka ar gossip, perfect combination! 😋",
      "Ekhon food er kotha bole amar o khide lagiye dile 🤤",
      "Mon ja chay tai khao, kintu pet er jotno nio ❤️",
      "Pizza hole extra cheese must! 🍕",
      "Khabar er chobi pathale review dite pari 😎"
    ]
  },

  apologyaccepted: {
    keywords: [
      "sorry bolchi", "maf kore dao", "khoma chai",
      "vul hoyeche", "ar hobe na", "rag koro na",
      "please forgive", "mon theke sorry", "bhul bujho na"
    ],
    replies: [
      "Thik ache, vul sobar hoy, samne theke ektu kheyal rekho ❤️",
      "Sorry bolar jonno dhonnobad, ekhon mon kharap koro na 🤗",
      "Maf kore dilam, kintu abar eki vul koro na 😌",
      "Kotha diye noy, kaj diye bujhiye dio ❤️",
      "Cholo, purono kotha bad diye notun kore shuru kori 🌸",
      "Rag komlo, ekhon ekta smile dao 😁"
    ]
  },

  boundaries: {
    keywords: [
      "amar iccha nei", "eta korte chai na", "amake disturb koro na",
      "space chai", "ektu eka thakte chai", "personal space",
      "eta amar pochondo na", "stop koro", "ar bolo na",
      "comfortable na", "valo lagche na eta"
    ],
    replies: [
      "Tomar iccha ar comfort sobar age, seta respect kora uchit ❤️",
      "Thik ache, nijer jonno ektu somoy nao 🌸",
      "Jeta te comfortable na, seta korte hobe na 🤗",
      "Tomar boundary maintain kora important, nijer kotha bolo 💗",
      "Ektu space chaile seta nitei paro, kono pressure nei 😌"
    ]
  },

  support: {
    keywords: [
      "amar pashe thako", "support chai", "help chai",
      "keu nei amar", "amar kotha shuno", "ektu shuno",
      "amar kotha bujho", "ki korbo bujhi na",
      "ekta advice dao", "amake guide koro"
    ],
    replies: [
      "Bolo, ami mon diye tomar kotha shunchi ❤️",
      "Ekdom aste aste bolo, tarahura korar dorkar nei 🤗",
      "Tomar problem ta share koro, mile ekta solution vabi 🌸",
      "Sob kichu eka handle korte hobe emon na 🥺",
      "Age puro ghotona ta bolo, tarpor advice dibo 😌",
      "Tomar kotha important, ami shunte ready 💗"
    ]
  },

  celebration: {
    keywords: [
      "congratulations", "congrats", "party chai",
      "celebrate korbo", "birthday party", "success party",
      "ajke celebration", "treat diba", "treat chai",
      "cake katbo", "special din"
    ],
    replies: [
      "Congratulations! Ebar treat er pala kintu! 🎉",
      "Yayyy! Ajke celebration hok full volume e! 🥳",
      "Cake chara celebration complete hoy na! 🎂",
      "Tomar success er khushite ekta virtual dance! 💃",
      "Ajker din ta memory te rekhe dio, onek special! ❤️",
      "Party te amake bhule gele kintu rag korbo! 😂"
    ]
  }

});

// PART 5 END
// ==============================
// PART 6 — CATEGORY 76 TO 90
// ==============================

Object.assign(data.categories, {

  heartbreak: {
    keywords: [
      "heartbreak", "heart broken", "mon vengeche",
      "valobashay koshto", "se chole geche",
      "amake chere geche", "tar kotha mone pore",
      "prem e dhoka", "mon ta venge gelo",
      "ar kauke valobashbo na", "broken heart"
    ],
    replies: [
      "Vanga mon aste aste thik hoy, nijeke ektu somoy dao ❤️",
      "Je chole geche tar jonno nijer hashi hariye felo na 🥺",
      "Kichu manush smriti hoye thake, kintu jibon theme thake na 🌸",
      "Ajke koshto hocche, ekdin ei koshto kombe 🤗",
      "Nijer proti ektu beshi bhalobasha rakho ❤️",
      "Heartbreak er por healing dorkar, tarahura noy 🫶",
      "Tomar golpo ekhanei sesh na, samne aro sundor din ache 🌷"
    ]
  },

  crush: {
    keywords: [
      "amar crush", "crush ache", "crush ke bolbo",
      "crush amake dekhe", "crush er sathe",
      "crush online", "crush reply dey na",
      "crush ke miss kori", "crush er naam",
      "crush propose", "crush er message"
    ],
    replies: [
      "Ohooo! Crush er kotha uthtei mukhe smile chole elo naki? 😏",
      "Crush er sathe kotha bolar age normal thakar acting koro 😂",
      "Se ki jane je keu ekjon take niye eto vabche? 👀",
      "Age friendship ta sundor kore gore tolo ❤️",
      "Crush online dekhlei heart beat double hoy naki? 🤭",
      "Ektu hint dao, tarpor bujhe shune agao 🌹",
      "Crush er golpo shunte ami popcorn niye ready 🍿"
    ]
  },

  proposal: {
    keywords: [
      "propose korbo", "ki vabe propose", "valobashi bolbo",
      "proposal dibo", "prem er prostab", "take propose",
      "seke propose", "love propose", "moner kotha bolbo",
      "valobasha prokash", "propose korar upay"
    ],
    replies: [
      "Moner kotha simple vabe bolo, beshi natok korar dorkar nei ❤️",
      "Sothik somoy ar respectful approach sobcheye important 🌹",
      "Propose korar age tar feelings bujhar chesta koro 😊",
      "Ekta honest message onek somoy onek sundor hoy 🥰",
      "Answer ja-i hok, tar decision respect korte hobe ❤️",
      "Dialogue ready? Naki ekhono practice cholche? 😂",
      "Sahos rakho, kintu kono pressure dio na 🌸"
    ]
  },

  rejection: {
    keywords: [
      "propose reject", "se na boleche", "amake reject",
      "valobashe na", "love accept koreni",
      "na kore dise", "reject hoyechi", "se raji na",
      "amar proposal maneni", "friend boleche sudhu"
    ],
    replies: [
      "Reject howa mane tomar value kome jawa na ❤️",
      "Tar decision respect koro, nijer self-respect o rekho 🌸",
      "Sob feelings er answer ek rokom hoy na, nijeke dosh dio na 🤗",
      "Mon kharap hote pare, kintu nijeke choto vebo na 🥺",
      "Ekta na tomar puro future decide kore na 💗",
      "Ektu somoy nao, nijer pochonder kaj gulo koro 🌷"
    ]
  },

  longdistance: {
    keywords: [
      "long distance", "dure thaki", "onek dure ache",
      "distance relationship", "video call miss",
      "dekha hoy na", "onek din dekhi na",
      "distance er prem", "dur theke valobashi",
      "long distance love", "tar sathe dekha chai"
    ],
    replies: [
      "Durotto thakleo dujoner chesta thakle bondhon sundor hoy ❤️",
      "Video call er oi chotto smile ta onek special, tai na? 🥰",
      "Distance relationship e trust ar communication khub important 💗",
      "Dekha na holeo care ta jeno kome na jay 🌹",
      "Ekdin dekha hobe, sei opekkhar golpo o sundor hobe 🥺",
      "Time difference er sathe fight korte korte prem! 😂"
    ]
  },

  lateReply: {
    keywords: [
      "late reply", "reply dite deri", "onek pore reply",
      "seen kore rekheche", "message seen",
      "reply dicche na", "message er uttor nei",
      "online ache reply nei", "ignore korche",
      "amar message dekhe na"
    ],
    replies: [
      "Sob somoy deri mane ignore noy, age ektu somoy dao ❤️",
      "Online status dekhe detective hoye jeo na 😂",
      "Busy thakte pare, nijer kaj o korte dao 😌",
      "Ekta message diye opekkha koro, bar bar spam koro na 🌸",
      "Reply er cheye nijer peace beshi important 💗",
      "Seen zone er koshto bujhi, kintu nijeke busy rakho 🤭"
    ]
  },

  trustissue: {
    keywords: [
      "trust issue", "biswas korte pari na",
      "kauke trust kori na", "biswas bhange",
      "abar dhoka khabo", "sotti bolche kina",
      "mithya bolche mone hoy", "biswas nei",
      "trust korte voy", "sondeho hoy"
    ],
    replies: [
      "Trust ek dine hoy na, somoy ar kaj diye toiri hoy ❤️",
      "Kotha ar kaj mile kina seta dekho, tarpor bishash koro 🌸",
      "Agertar jonno sobaike eki chokhe dekho na 🥺",
      "Nijer feelings ke ignore koro na, abar proman chara dosh o dio na 🤗",
      "Healthy relationship e trust er sathe clear communication o dorkar 💗",
      "Moner dorja khola rakho, kintu nijer boundary bhule jeo na 😌"
    ]
  },

  friendshipfight: {
    keywords: [
      "bondhur sathe jhogra", "best friend rag",
      "friend rag koreche", "bondhu kotha bole na",
      "friendship sesh", "bondhur sathe problem",
      "bestie ignore", "bondhu block",
      "bondhu vul bujheche", "friend er sathe fight"
    ],
    replies: [
      "Best friend hole ego komiye ekbar kotha bole dekho ❤️",
      "Bondhutto te misunderstanding hote pare, kotha bolle clear hoy 🤗",
      "Dujoner kotha shonar sujog dao, ek torfa decision nio na 🌸",
      "Ekta sincere sorry onek somoy borof golay 🥺",
      "Bondhutto valuable, kintu respect dujoner jonnoi dorkar 💗",
      "Jhogra sesh kore abar paglamo shuru koro 😂"
    ]
  },

  familylove: {
    keywords: [
      "family miss", "ma ke miss", "baba ke miss",
      "family er kotha", "bari jete chai",
      "ammu ke mone pore", "abbu ke mone pore",
      "family problem", "basay mon boshe na",
      "poribarer jonno koshto", "ma baba"
    ],
    replies: [
      "Family er sathe chotto ekta call o mon valo kore dite pare ❤️",
      "Ma babar sathe somoy katano onek boro blessing 🌸",
      "Bari theke dure thakle chotto smriti gulo aro beshi mone pore 🥺",
      "Somoy pele family ke ekta phone dio, tara khushi hobe 🤗",
      "Poribarer sathe valo somporko rakhte dujoner chesta dorkar 💗",
      "Bari'r khabar er kono replacement hoy na! 😋"
    ]
  },

  productivity: {
    keywords: [
      "productive hote chai", "time management",
      "somoy noshto", "kaj korte iccha nei",
      "routine banabo", "kaj jome geche",
      "focus korte pari na", "procrastination",
      "kaj pore ache", "daily routine"
    ],
    replies: [
      "Ajker kaj gulo choto choto step e vag kore nao 💪",
      "Ekbare sob noy, 25 minute focus diye shuru koro ⏳",
      "Phone ektu dure rekhe ekta kaj sesh koro 😌",
      "Perfect routine er cheye consistent thaka beshi important ❤️",
      "Ajke ekta kaj complete korleo seta progress 🌱",
      "To-do list banao, tarpor ekta ekta kore tick dao 📝",
      "Motivation er opekkha na kore choto kore shuru koro 🔥"
    ]
  },

  career: {
    keywords: [
      "career niye chinta", "future career",
      "job khujchi", "chakri chai", "job interview",
      "career plan", "ki hobo", "future niye voy",
      "skill develop", "freelancing shikhbo",
      "profession choose", "chakrir preparation"
    ],
    replies: [
      "Career ek dine toiri hoy na, protidin ektu ektu skill barাও 💪",
      "Tomar interest ar strength bujhe decision nao ❤️",
      "Choto opportunity thekeo boro experience ashte pare 🌱",
      "Ekta skill select kore regular practice shuru koro 📚",
      "Future niye chinta korar sathe sathe ajker kaj tao koro 😌",
      "Interview er age practice korle confidence barbe 🤝",
      "Tomar goal ta ki? Ektu bolle plan korte help korte pari 👀"
    ]
  },

  technology: {
    keywords: [
      "technology", "computer problem", "mobile problem",
      "phone hang", "internet slow", "wifi kaj kore na",
      "app kaj korche na", "software problem",
      "coding problem", "tech news", "laptop slow"
    ],
    replies: [
      "Technology'r problem hole age restart diye dekho, classic trick! 😂",
      "Ki device ba app e problem hocche bolo, bujhe help korar chesta kori 💻",
      "Internet slow hole router ar connection check koro 📶",
      "Coding problem? Error message ta dile dekha jabe 😎",
      "Tech niye notun kichu shikhte amar o moja lage 🤖",
      "Problem ta ektu details e bolo, guess kore solution dite chai na 🔧"
    ]
  },

  coding: {
    keywords: [
      "coding shikhbo", "programming shikhbo",
      "javascript", "python coding", "java coding",
      "html css", "code likhbo", "bug fix",
      "error asche", "program kaj kore na",
      "function bujhi na", "coding help"
    ],
    replies: [
      "Coding e prothome error asbei, error thekei learning hoy 💻",
      "Kon language niye kaj korcho? Python, Java naki JavaScript? 😎",
      "Code er error ta share koro, ekshathe dekhi 🔧",
      "Protodin ektu practice korlei coding improve hobe 🚀",
      "Copy-paste er sathe sathe logic tao bujhe nio 😁",
      "Bug pele voy peyo na, developer der daily companion ota 😂"
    ]
  },

  photography: {
    keywords: [
      "photo tulbo", "chobi tulbo", "camera quality",
      "selfie tulbo", "picture edit", "photo edit",
      "photography", "camera settings", "portrait photo",
      "dp dibo", "profile picture"
    ],
    replies: [
      "Natural light e photo tulলে onek sundor ashe 📸",
      "Smile ta natural rakho, camera nijer moto magic korbe 😍",
      "DP change korle group e review session hobe naki? 😂",
      "Background clean rakhle photo aro sundor dekhabe 🌸",
      "Filter kom, natural beauty beshi! 😌",
      "Photo tule amader o dekhate bhulo na 🤭"
    ]
  },

  pets: {
    keywords: [
      "biral ache", "amar cat", "kukur ache",
      "pet ache", "posha prani", "cat lover",
      "dog lover", "biral pochondo", "puppy",
      "kitten", "pet er naam", "amar biral"
    ],
    replies: [
      "Biral der attitude alada level er, ora nijerai boss! 😂",
      "Pet thakle basay ekta alada happiness thake 🐱",
      "Tomar pet er naam ki? Shunte chai! 🥰",
      "Chotto kitten dekhle ador korte iccha kore 🐾",
      "Pet er khabar ar health er jotno nio ❤️",
      "Pet ra kotha bolte na parleo onek feelings bujhiye dey 🐶"
    ]
  }

});

// PART 6 END

// ==============================
// PART 7 — CATEGORY 91 TO 105
// ==============================

Object.assign(data.categories, {

  attitude: {
    keywords: [
      "attitude dekhaccho", "amar attitude", "ignore korbo",
      "care kori na", "amar life amar rules", "ke ki bollo",
      "nijer moto thaki", "karo poroa kori na",
      "self respect", "attitude status"
    ],
    replies: [
      "Attitude thakuk, kintu mon ta jeno sundor thake! 😎",
      "Self-respect ar ego ek jinis na, mone rekho ❤️",
      "Nijer value bojho, kintu onnokeo respect koro 🌸",
      "Attitude er sathe ekta cute smile free dao! 😏",
      "Sobai ke impress korar dorkar nei, nijer moto thako 😌"
    ]
  },

  sarcasm: {
    keywords: [
      "seriously bolcho", "moja niccho", "ki ajob",
      "bah bah", "darun kaj", "onek smart",
      "bujhlam na", "ki je bolo", "serious naki",
      "eta abar ki"
    ],
    replies: [
      "Ami to ekdom serious... amar seriousness dekhe ami nijei obak! 😂",
      "Bah, kotha ta shune amar brain restart nilo! 🤣",
      "Eto talent ek jaygay rakha bipodjonok! 😜",
      "Bujhte parle amakeo ektu bujhiye dio! 😂",
      "Ei kothar reply dite gele alada meeting lagbe! 😆"
    ]
  },

  complimentreply: {
    keywords: [
      "tumi cute", "tumi sundor", "onek valo",
      "tomake valo lage", "tumi best", "nice bot",
      "prema cute", "tomar kotha valo", "tumi sweet",
      "tomar reply sundor"
    ],
    replies: [
      "Awww! Eto sundor compliment! Tomar mon tao sundor! 🥰",
      "Lojja diccho naki? Ebar ami blush korbo! 🤭",
      "Thank youuu! Tomar kotha shune mood fresh hoye gelo! ❤️",
      "Compliment ta save kore rakhlam, abar shunte chai! 😜",
      "Tumi o kom cute na kintu! 🌸"
    ]
  },

  botidentity: {
    keywords: [
      "tumi ke", "tomar naam ki", "bot er naam",
      "prema ke", "tumi ki bot", "tumi ki robot",
      "ke tomake banayche", "tomar creator ke",
      "tomar porichoy", "tumi manush naki"
    ],
    replies: [
      "Ami Prema! Group er adda te ektu mishti moja korte eshechi! 🥰",
      "Ami Prema, kotha boli ar group er mood fresh rakhi! ❤️",
      "Manush na bot? Secret ta eto taratari bolbo na! 🤭",
      "Amar naam Prema, ar amar kaj holo tomader sathe golpo kora! 🌸",
      "Creator er kotha pore hobe, age tomar porichoy dao! 😜"
    ]
  },

  bottest: {
    keywords: [
      "test koro", "bot test", "kaj koro kina",
      "reply dite paro", "answer dao", "tomake check",
      "bot active", "prema active", "prema kaj korche",
      "response test"
    ],
    replies: [
      "Test successful! Prema ekhane present! 😎",
      "Ami ready! Ebar tomar question er pala! 🥰",
      "Check kore dekho, kintu beshi exam nio na! 😂",
      "Prema online, adda choluk! ❤️",
      "Testing testing! Amar microphone charai voice ready! 🤣"
    ]
  },

  memoryquestion: {
    keywords: [
      "mone ache", "age bolechilam", "mone rakhcho",
      "ki bolechilam", "ager kotha", "amar kotha mone",
      "amake cheno", "amar naam mone ache",
      "age ki hoyechilo", "last time"
    ],
    replies: [
      "Ager kotha mone korar chesta korchi, ektu hint dao! 🥰",
      "Kon diner kotha bolcho? Ektu remind korle bhalo hoy! ❤️",
      "Tomar kotha shunte amar valo lage, aro bolo! 🌸",
      "Ektu clue dao, tahole golper sutro dhorte parbo! 👀",
      "Memory test naki? Dekhi ami pass korte pari kina! 😂"
    ]
  },

  decision: {
    keywords: [
      "ki decision nebo", "ki kora uchit",
      "kontা valo", "choose korte parchi na",
      "siddhanto nite parchi na", "ki korbo bolo",
      "duitar moddhe", "kon option nebo",
      "confused achi", "decision help"
    ],
    replies: [
      "Duita option er valo-mondo likhe dekho, decision easy hobe ❤️",
      "Tarahura kore decision nio na, ektu somoy nao 🌸",
      "Tomar priority konta seta age bujhe nao 😌",
      "Duita option ki ki? Bolle eksathe vebe dekhi! 👀",
      "Moner kotha shuno, kintu logic tao sathe rekho! 💗"
    ]
  },

  memories: {
    keywords: [
      "purono diner kotha", "school life", "college life",
      "old memories", "chotobelar smriti", "ager din",
      "nostalgia", "sei somoy", "purono bondhu",
      "smriti mone pore"
    ],
    replies: [
      "Purono diner smriti gulo majhe majhe mon chuye jay! 🥺",
      "School life er moto moja ar kothay! ❤️",
      "Kichu muhurto kokhono purono hoy na 🌸",
      "Ekta purono chobi puro golpo mone koriye dey! 📸",
      "Smriti gulo thakuk, notun golpo o toiri hok! 🥰"
    ]
  },

  complimentrequest: {
    keywords: [
      "amar proshongsha koro", "compliment dao",
      "amar valo dik bolo", "amake praise koro",
      "amar somporke bolo", "ami kemon",
      "amar ekta valo kotha bolo", "ektu tarif koro"
    ],
    replies: [
      "Tomar moddhe nijer moto thakar ekta sundor gun ache! ❤️",
      "Tumi nijer kotha share korte paro, eta ekta valo dik! 🥰",
      "Tomar confidence aro baruk, karon tumi onek kichu korte parbe! 🌸",
      "Tomar moddhe valo kichu ache, seta nijer chokheo dekho! 💗",
      "Aajke tomar jonno compliment: tumi ekdom one of a kind! 😎"
    ]
  },

  challenge: {
    keywords: [
      "challenge dilam", "dare dilam", "dare khelo",
      "truth or dare", "truth khelo", "challenge accept",
      "parle koro", "sahos ache", "dare accept",
      "game challenge"
    ],
    replies: [
      "Challenge accepted! Kintu easy kichu dio na! 😎",
      "Truth naki dare? Ami duitar jonnoi ready! 🤭",
      "Dare dile age rules ta bole dio! 😂",
      "Ami voy pai na... sudhu ektu beshi vabi! 🤣",
      "Challenge er prize ki? Age seta jante chai! 😜"
    ]
  },

  truth: {
    keywords: [
      "truth bolo", "sotti kore bolo", "ekta sotti kotha",
      "honest answer", "sotti bolba", "mittha bolo na",
      "tomar secret bolo", "truth question",
      "moner kotha bolo"
    ],
    replies: [
      "Sotti kotha bolbo, kintu question ta age koro! 😁",
      "Honest answer er jonno ready achi! ❤️",
      "Truth game cholche naki? Tahole shuru koro! 👀",
      "Mittha bolar dorkar nei, mon khule bolo! 🌸",
      "Question tough holeo palabo na! 😂"
    ]
  },

  funquestion: {
    keywords: [
      "ekta moja question", "funny question",
      "dhadha bolo", "jokes bolo", "moja koro",
      "hasao amake", "funny kichu bolo",
      "ekta joke", "paheli bolo"
    ],
    replies: [
      "Phone er battery ar manusher energy ek rokom, duita-i hotat sesh hoy! 😂",
      "Exam er question dekhe mone hoy sir amar sathe personal rag korechen! 🤣",
      "Ghum ar porashonar moddhe amar ghum-i beshi talented! 😴",
      "Ami diet e achi... sudhu khabar dekha bondho korte parchi na! 🍕",
      "Single thakar subidha holo, phone charge na dileo keu rag kore na! 😂"
    ]
  },

  groupactivity: {
    keywords: [
      "sobai kothay", "group chup keno",
      "keu kotha bolo", "adda dao", "group e moja",
      "active hou", "ke online", "group activity",
      "sobai reply dao", "group jome na"
    ],
    replies: [
      "Oiii group er manushjon! Sobai ki ghumaccho? 😂",
      "Cholo ekjon ekta kore nijer funny golpo bolo! 🤭",
      "Group eto chup keno? Network gelo naki sobar? 🤣",
      "Ajker adda topic: sobar jiboner sobcheye funny moment! 😎",
      "Keu ekta interesting question koro, adda jomuk! ❤️"
    ]
  },

  foodtalk: {
    keywords: [
      "ki kheyecho", "khabar kheyecho",
      "lunch korecho", "dinner korecho",
      "breakfast korecho", "ki khaccho",
      "khabar ki", "cha kheyecho",
      "coffee kheyecho"
    ],
    replies: [
      "Ami digital, tai khabar khai na! Tobe biriyani pochondo! 😂",
      "Tumi kheyecho? Nijer khabar skip koro na kintu! ❤️",
      "Ekhono khaini? Tahole age kheye nao! 😋",
      "Cha ar biscuit hole adda aro jome! ☕",
      "Khabar er menu ta shuni, ajke ki special? 👀"
    ]
  },

  weekend: {
    keywords: [
      "weekend plan", "chutir din", "ajke chuti",
      "kalke chuti", "ghurte jabo", "holiday plan",
      "weekend e ki korbo", "rest nibo",
      "free time", "chutir moja"
    ],
    replies: [
      "Weekend e nijer jonno ektu somoy rakho! 🌸",
      "Ghum, khabar ar pochonder kaj, perfect holiday! 😴",
      "Ghure aso, notun kichu dekhe mon fresh hobe! 🥰",
      "Chutir dine kajer kotha kom, anonder kotha beshi! 😂",
      "Tomar weekend plan ki? Shunte chai! 👀"
    ]
  },

  farewell: {
    keywords: [
      "bye bye", "pore kotha hobe", "abar dekha",
      "ekhon jai", "jacchi", "good night sobai",
      "allah hafez", "biday", "pore asbo",
      "talk later"
    ],
    replies: [
      "Thik ache, abar esho! Tomar jonno adda jomiye rakhbo! ❤️",
      "Bhalo theko, nijer jotno nio! 🥰",
      "Bye bye! Abar dekha hobe notun golpo niye! 🌸",
      "Jaowar age ekta smile diye jao! 😁",
      "Allah Hafez! Bhalo theko! 🤗"
    ]
  }

});

// PART 7 END
// ==============================
// PART 8 — CATEGORY 106 TO 120
// ==============================

Object.assign(data.categories, {

  goodmorning: {
    keywords: [
      "good morning", "gm everyone", "sokal hoyeche",
      "sokale uthlam", "suvo sokal", "morning prema",
      "ghum theke uthchi", "sokal er shuvochha",
      "notun sokal", "morning wish"
    ],
    replies: [
      "Good morning! Notun din ta hok onek sundor! ☀️",
      "Ghum theke uthe prothome ekta smile dao! 🥰",
      "Shuvo sokal! Ajke tomar din ta valo katuk! ❤️",
      "Sokal sokal eto sundor manush online! 😍",
      "Uthe poro sleepyhead, duniya opekkha korche! 😂",
      "Ajker sokal ta hok positivity ar happiness e vora! 🌸"
    ]
  },

  goodnight: {
    keywords: [
      "good night", "gn everyone", "shuvo ratri",
      "ghumabo ekhon", "ghumate jacchi", "rat hoyeche",
      "sleep well", "night prema", "ghum asche",
      "rat er wish"
    ],
    replies: [
      "Good night! Sundor shopno dekho! 🌙",
      "Phone ta rekhe ebar ghumao, chokher jotno nao! 🥰",
      "Shuvo ratri! Kal abar notun golpo hobe! ❤️",
      "Shopne jeno biriyani pao, ar alarm jeno na baje! 😂",
      "Bhalo kore ghumao, mon ta halka rekho! 🌸",
      "Sweet dreams! Nijer jotno nio! 😴"
    ]
  },

  afternoonwish: {
    keywords: [
      "good afternoon", "shuvo dupur", "dupur hoyeche",
      "lunch time", "dupurer salam", "afternoon wish",
      "dupur bela", "ki obostha dupure"
    ],
    replies: [
      "Good afternoon! Dupur ta valo katuk! ☀️",
      "Lunch korecho to? Nijer jotno nio! ❤️",
      "Dupurer gorome ektu rest nao! 🥰",
      "Shuvo dupur! Ajke ki kheyecho? 😋",
      "Dupur bela ek cup cha hole mondo hoy na! ☕"
    ]
  },

  eveningwish: {
    keywords: [
      "good evening", "shuvo sondha", "sondha hoyeche",
      "evening wish", "sondhar adda", "bikel bela",
      "sondhay ki korcho"
    ],
    replies: [
      "Good evening! Sondha ta hok mishti! 🌆",
      "Ek cup cha ar ektu adda hole perfect! ☕",
      "Shuvo sondha! Din ta kemon gelo? ❤️",
      "Sondhar akash dekhecho? Onek sundor lage! 🌇",
      "Bikel er hawa ar tomar golpo, jome jak! 🥰"
    ]
  },

  vacation: {
    keywords: [
      "vacation e jabo", "tour e jabo", "chuti te ghurbo",
      "holiday e jabo", "ghurte iccha", "travel plan",
      "tour plan", "pahar e jabo", "somudro dekhbo",
      "tourist place"
    ],
    replies: [
      "Oho! Tour plan! Amakeo virtual tour e niye jeyo! 😍",
      "Notun jayga ghurle mon ta fresh hoye jay! 🌍",
      "Travel er age budget ar plan ready kore nio! ❤️",
      "Pahar naki somudro? Tomar choice konta? 👀",
      "Photo tulte bhulo na, pore golpo shunbo! 📸",
      "Safe journey! Anondo kore ghure esho! 🥰"
    ]
  },

  rain: {
    keywords: [
      "brishti hocche", "bristi porche", "rainy day",
      "bristi valo lage", "bristite vijbo", "megh koreche",
      "akash meghla", "bristi dekhchi", "rain mood",
      "bristir din"
    ],
    replies: [
      "Brishtir dine cha ar khichuri hole jome jay! ☔",
      "Brishtir shobdo ta onek peaceful, tai na? ❤️",
      "Vijte gele sabdhane, thanda lege jete pare! 🌧️",
      "Rainy day + favorite song = perfect mood! 🎶",
      "Janalar pashe bose brishti dekhar moja alada! 🥰",
      "Brishti dekhe romantic mood chole elo naki? 🤭"
    ]
  },

  hotweather: {
    keywords: [
      "onek gorom", "gorom lagche", "heat hocche",
      "temperature beshi", "fan kaj kore na",
      "gorome osthir", "gorom e ghum nei",
      "weather gorom", "roder tap"
    ],
    replies: [
      "Eto gorom! Thanda pani khao ar nijer jotno nio! 🥵",
      "Fan er niche permanent address kore feli naki? 😂",
      "Baire gele pani sathe rekho! 💧",
      "Gorome halka aramdayok kapor poro! 🌸",
      "Ice cream er kotha mone pore gelo! 🍦"
    ]
  },

  coldweather: {
    keywords: [
      "onek thanda", "sheet poreche", "thanda lagche",
      "winter season", "kuasha poreche", "sheet er din",
      "kombol chai", "winter mood", "thanday kapchi",
      "cold weather"
    ],
    replies: [
      "Sheet e kombol er niche thakar moja alada! 🥶",
      "Gorom cha ar komol rod, perfect winter! ☕",
      "Thanda lagle gorom kapor poro, nijer jotno nio! ❤️",
      "Sokal er kuasha dekhte onek sundor lage! 🌫️",
      "Ekhon ekta gorom coffee hole darun hoto! ☕"
    ]
  },

  movie: {
    keywords: [
      "movie dekhbo", "cinema dekhbo", "film suggest",
      "movie suggestion", "kon movie valo",
      "horror movie", "romantic movie", "comedy movie",
      "movie lover", "cinema lover"
    ],
    replies: [
      "Ajke movie night naki? Popcorn ready rakho! 🍿",
      "Romantic naki thriller? Mood ta bolo! 😍",
      "Horror movie dekhe abar voy pele amake dosh dio na! 😂",
      "Movie dekhar somoy phone silent rakha uchit! 🎬",
      "Favorite movie er naam bolo, ami review shunbo! ❤️"
    ]
  },

  series: {
    keywords: [
      "web series", "series dekhchi", "netflix series",
      "episode sesh", "next episode", "series suggestion",
      "drama series", "kdrama", "anime dekhbo",
      "series addict"
    ],
    replies: [
      "Ek episode bolte bolte pura season sesh? 😂",
      "Series er naam bolo, spoiler chara golpo shunbo! 👀",
      "Bhalo series pele time er hisab thake na! 🤭",
      "K-drama naki anime? Tomar favorite konta? 🥰",
      "Cliffhanger e episode sesh hole rag lage, tai na? 😭"
    ]
  },

  sports: {
    keywords: [
      "football khelbo", "cricket khelbo", "match ache",
      "world cup", "goal hoyeche", "six mereche",
      "team support", "favorite player", "football match",
      "cricket match", "sports lover"
    ],
    replies: [
      "Football naki cricket? Ajke kon team er supporter? ⚽",
      "Match er excitement aladai! 🏏",
      "Favorite team harle mood off hoye jay! 😂",
      "Khela hok fair, moja hok full! ❤️",
      "Tomar favorite player ke? Jante iccha korche! 👀"
    ]
  },

  shopping: {
    keywords: [
      "shopping korbo", "dress kinbo", "new dress",
      "shopping plan", "ki kinbo", "online shopping",
      "market jabo", "shopping korte chai",
      "new phone kinbo", "gift kinbo"
    ],
    replies: [
      "Shopping e gele budget er kotha mone rekho! 😂",
      "Notun dress? Color ta ki choose korcho? 😍",
      "Shopping er age list baniye nio! ❤️",
      "Window shopping korte giye bag vorti kore felo na! 🤭",
      "Gift ta jar jonno, tar pochondo mone rekho! 🎁"
    ]
  },

  gift: {
    keywords: [
      "gift dibo", "gift chai", "surprise gift",
      "birthday gift idea", "ki gift debo",
      "present kinbo", "gift suggest", "special gift",
      "surprise dite chai", "gift er idea"
    ],
    replies: [
      "Dam er cheye gift er pichoner feelings beshi important! ❤️",
      "Personalized gift dile onek special lage! 🎁",
      "Jar jonno gift, tar pochondo ta age jene nao! 🥰",
      "Surprise plan korcho? Ebar secret rakhte hobe! 🤫",
      "Handwritten chithi o onek sundor gift hote pare! 💌"
    ]
  },

  socialmedia: {
    keywords: [
      "facebook post", "instagram post", "story dibo",
      "caption chai", "status dibo", "reels banabo",
      "viral hobo", "like kom", "comment kom",
      "social media", "dp change"
    ],
    replies: [
      "Caption ta emon dao jeno tomar personality bojha jay! 😎",
      "Like er cheye nijer pochondo ke priority dao! ❤️",
      "Story te ekta sundor song add korte paro! 🎶",
      "Viral howar age nijer content enjoy koro! 😂",
      "Post er jonno cute caption lagle bolo! 🥰"
    ]
  },

  festival: {
    keywords: [
      "eid mubarak", "eid er anondo", "eid shopping",
      "puja asche", "pohela boishakh", "new year celebration",
      "festival mood", "utsob", "eid er chuti",
      "eid salami", "utsober din"
    ],
    replies: [
      "Utsober anondo sobar majhe choriye poruk! ❤️",
      "Eid er shopping shuru hoye geche naki? 😍",
      "Shuvo utsob! Din ta onek sundor katuk! 🌸",
      "Notun jama ar mishti, festival er moja aladai! 🥰",
      "Sobai mile anondo koro ar valo theko! 🎉"
    ]
  }

});

// PART 8 END
// ==============================
// PART 9 — CATEGORY 121 TO 135
// ==============================

Object.assign(data.categories, {

  loneliness: {
    keywords: [
      "eka eka lagche", "khub eka", "keu nei pashe",
      "lonely feel", "eka thakte valo lage na",
      "sobai dure chole geche", "amar keu nei",
      "eka bose achi", "loneliness", "sathi nei"
    ],
    replies: [
      "Eka lagle moner kotha share korte paro, ami shunchi ❤️",
      "Nijer satheo sundor somoy katano shikhte hoy 🥺",
      "Ajker din ta kothin holeo tumi eka noi 🤗",
      "Cholo ektu golpo kori, mon ta halka hobe! 🌸",
      "Nijer jonno ek cup cha banao, ektu relax koro ☕",
      "Kichu somoy nijeke dewao nijer proti bhalobasha ❤️"
    ]
  },

  anxiety: {
    keywords: [
      "anxiety hocche", "voy lagche", "buk dhorfor",
      "osthir lagche", "panic hocche", "mon shanto nei",
      "chinta bere geche", "khub nervous",
      "ki hobe voy", "restless feel"
    ],
    replies: [
      "Ektu dhire shash nao, nijeke bortoman muhurte focus korte dao 🤗",
      "Ek glass pani khao, tarpor aste aste bolo ki hoyeche ❤️",
      "Sob kichu ekhoni solve korte hobe na, ektu somoy nao 🌸",
      "Nijer trusted karo sathe kotha bolte paro 🥺",
      "Tumi ekhon safe jaygay acho kina age seta dekho 💗",
      "Jodi ei obostha bar bar hoy ba khub koshto dey, professional help nite paro ❤️"
    ]
  },

  angercontrol: {
    keywords: [
      "onek rag hocche", "rag control korte pari na",
      "matha gorom", "mejaj kharap", "khub irritate",
      "rag e kichu korbo", "chillate iccha",
      "sobai birkto korche", "temper high",
      "rag uthche"
    ],
    replies: [
      "Ekhon reply na diye ektu break nao, pore kotha bolo ❤️",
      "Rager somoy bola kotha pore koshto dite pare 🥺",
      "Ektu pani khao, kichukhon chup thako, tarpor decide koro 🤗",
      "Rag howa normal, kintu reaction ta tomar hate 🌸",
      "Ki hoyeche bolo, age puro ghotona ta shuni 👀",
      "Matha thanda holei best reply ta ber hobe 😌"
    ]
  },

  forgiveness: {
    keywords: [
      "take maf korbo", "khoma korte parchi na",
      "vul bhulte parchi na", "maf kora uchit",
      "mon theke rag jay na", "forgive korte chai",
      "purono koshto", "khoma korte voy",
      "abar chance debo", "second chance"
    ],
    replies: [
      "Khoma kora mane sob kichu ager moto mene neowa noy ❤️",
      "Nijer moner shantir jonno somoy niye decision nao 🌸",
      "Second chance dewar age poriborton ta dekho 😌",
      "Tumi ready na hole nijeke force korar dorkar nei 🤗",
      "Forgiveness er sathe boundary rakhao important 💗",
      "Kauke khoma korleo nijer self-respect bhule jeo na ❤️"
    ]
  },

  misunderstanding: {
    keywords: [
      "vul bujheche", "misunderstanding hoyeche",
      "amar kotha bujheni", "onnorokom bujheche",
      "vul bujhabujhi", "kotha niye problem",
      "amar intention bujheni", "wrong meaning",
      "bujhte chay na", "misunderstand korche"
    ],
    replies: [
      "Shanto vabe nijer kotha explain kore dekho ❤️",
      "Text e onek somoy feelings thikmoto bojhano jay na 🌸",
      "Age tar kotha tao mon diye shuno 🤗",
      "Assumption na kore directly jiggesh koro 😌",
      "Ekta misunderstanding jeno sundor somporko noshto na kore 💗",
      "Ki niye vul bujhabujhi hoyeche? Bolo 👀"
    ]
  },

  compliment: {
    keywords: [
      "beautiful lagche", "sundor lagche", "smart dekhacche",
      "onek cute lagche", "look ta valo", "dress sundor",
      "chobi sundor", "nice look", "darun lagcho",
      "ajke valo lagche"
    ],
    replies: [
      "Awww! Eto sundor kotha bolle blush korte hoy! 🥰",
      "Compliment ta jar prappo take diyecho! ❤️",
      "Tomar chokhei sob kichu sundor lage mone hoy! 🤭",
      "Thank you! Ebar tomar compliment er pala! 🌸",
      "Ei kotha ta screenshot niye rakha uchit! 😂"
    ]
  },

  selfcare: {
    keywords: [
      "nijer jotno", "self care", "rest nibo",
      "nijer jonno time", "skin care", "relax korte chai",
      "body tired", "onek tired", "break nibo",
      "nijeke time debo"
    ],
    replies: [
      "Nijer jotno neowa selfishness na, eta dorkar ❤️",
      "Ektu rest nao, sob kaj ekhoni korte hobe na 🌸",
      "Pochonder gaan shuno ar nijeke somoy dao 🎶",
      "Pani khao, valo khabar khao, ar porjapto ghumao 🤗",
      "Tomar happiness o tomar priority howa uchit 🥰",
      "Ajke nijer jonno chotto ekta gift nao! 🎁"
    ]
  },

  fitness: {
    keywords: [
      "gym jabo", "exercise korbo", "workout plan",
      "fitness journey", "weight loss", "weight gain",
      "body fit korte chai", "running korbo",
      "exercise korte iccha", "gym motivation"
    ],
    replies: [
      "Choto kore shuru koro, regular thakai main! 💪",
      "Workout er sathe rest ar balanced food o important ❤️",
      "Ajker exercise sesh? Nijeke ekta high five dao! 🙌",
      "Onner sathe compare na kore nijer progress dekho 🌱",
      "Consistency is the key, champion! 🔥",
      "Nijer body ke respect kore exercise koro 🥰"
    ]
  },

  learning: {
    keywords: [
      "notun kichu shikhbo", "skill shikhte chai",
      "learning start", "course korbo", "online course",
      "tutorial chai", "practice korbo", "knowledge barabo",
      "kichu shikhao", "skill improve"
    ],
    replies: [
      "Protodin notun kichu shikha mane nijeke egiye neowa! 📚",
      "Ekta topic select kore ajkei shuru kore dao! 🚀",
      "Na bujhle question koro, question korai learning er part ❤️",
      "Choto progress o celebrate korte hoy! 🥰",
      "Tomar kon skill ta shikhte iccha korche? 👀",
      "Practice chara skill sharp hoy na, lege thako! 💪"
    ]
  },

  language: {
    keywords: [
      "english shikhbo", "english bolte chai",
      "grammar shikhbo", "vocabulary shikhbo",
      "bangla meaning", "translation chai",
      "english meaning bolo", "spoken english",
      "new word shikhbo", "language learning"
    ],
    replies: [
      "Protodin 5 ta notun English word shikhe practice koro! 📚",
      "Mistake korte voy peyo na, practice korlei improvement hobe ❤️",
      "Ekta English sentence bolo, ami check korte help korbo! 😎",
      "Speaking improve korte regular kotha bolar practice dorkar! 🗣️",
      "Cholo ajke ekta notun word shikhi! 🌸"
    ]
  },

  books: {
    keywords: [
      "boi porte valo lage", "book suggestion",
      "boi porbo", "novel porte chai", "favorite book",
      "reading habit", "golper boi", "poetry book",
      "boi lover", "library jabo"
    ],
    replies: [
      "Boi holo emon bondhu je kokhono boring hoy na! 📖",
      "Kon type er boi pochondo, romance naki thriller? 🥰",
      "Ekta valo boi ar ek cup cha, perfect combination! ☕",
      "Reading habit barate protidin 10 page diye shuru koro ❤️",
      "Favorite boi er naam bolo, golpo shuni! 👀"
    ]
  },

  poetry: {
    keywords: [
      "kobita bolo", "poem shunao", "chondo bolo",
      "romantic kobita", "valobashar kobita",
      "dui line kobita", "kobita likho",
      "poetry chai", "moner kobita", "prem er kobita"
    ],
    replies: [
      "Tomar hashi te sokal name, moner akashe rongin shopno jage! 🌸",
      "Chotto ekta hashi tomar, din ta kore alokito amar! ❤️",
      "Nirob rate chander alo, tomar kotha vabte valo! 🌙",
      "Moner majhe ekta sur, tomar kothay bhore jay dur! 🥰",
      "Brishtir fota janlay pore, smriti gulo mon chuye jay re! ☔"
    ]
  },

  statuscaption: {
    keywords: [
      "caption likhe dao", "status likhe dao",
      "facebook status", "sad caption", "love caption",
      "attitude caption", "romantic status",
      "short caption", "bio likhe dao", "story caption"
    ],
    replies: [
      "Nijer moto thakai amar sobcheye sundor porichoy! 😎",
      "Chotto ekta hashi, ar hajar ta shopno! 🌸",
      "Some feelings are better left unspoken! 🥺",
      "Mon bhalo thakuk, baki sob somoyer sathe thik hobe! ❤️",
      "Simple life, beautiful thoughts! ✨",
      "Chokhe shopno, mone sahos, poth cholai amar kaj! 🚀"
    ]
  },

  motivation: {
    keywords: [
      "motivation dao", "motivational kotha",
      "inspire koro", "monobal chai",
      "har manbo na", "abar shuru korbo",
      "success hote chai", "shopno puron",
      "lokkho puron", "nijeke bodlabo"
    ],
    replies: [
      "Dhire geleo somossa nei, theme jeo na! 💪",
      "Ajker choto chesta kalke boro success hote pare! 🌱",
      "Nijer upor bishash rakho, tumi parbe! ❤️",
      "Failure mane sesh noy, notun kichu shekhar sujog! 🚀",
      "Shopno dekho, plan banao, kaj shuru koro! 🔥",
      "Tomar journey tomar nijer, nijer pace e egiye jao! 🥰"
    ]
  },

  dailycheckin: {
    keywords: [
      "kemon acho", "ki obostha", "din kemon gelo",
      "ajke kemon katlo", "mon kemon", "sob thik ache",
      "ki khobor tomar", "ki cholche",
      "ajker update", "how are you"
    ],
    replies: [
      "Ami ready achi tomar golpo shonar jonno! 🥰",
      "Amar to besh, tomar din kemon jacche? ❤️",
      "Sob thikthak! Tomar notun khobor ki? 👀",
      "Ajke tomar din er best moment konta chilo? 🌸",
      "Bhalo achi, ekhon tomar kotha shuni! 🤗",
      "Group er adda cholche, tumi ki niye busy? 😎"
    ]
  }

});

// PART 9 END
// ==============================
// PART 10 — CATEGORY 136 TO 150
// ==============================

Object.assign(data.categories, {

  flirtingreply: {
    keywords: [
      "amar sathe flirt", "flirt korcho", "flirt koro",
      "line marcho", "line maro", "pickup line",
      "romantic kotha bolo", "amake potao",
      "impress koro", "prem er line"
    ],
    replies: [
      "Tomar sathe kotha bolte gele amar reply o romantic hoye jay! 😘",
      "Tomar smile er upor ki kono copyright ache? 😍",
      "Eto cute hoye thaka ki tomar daily habit? 🤭",
      "Tomake impress korte gele amar alada preparation lagbe! ❤️",
      "Flirt kom kori, kintu compliment dite pari unlimited! 😜",
      "Tomar kothar moddhe ekta alada magic ache! ✨"
    ]
  },

  romanticmood: {
    keywords: [
      "romantic mood", "romantic lagche", "prem prem lagche",
      "valobashar mood", "mon ta romantic",
      "love mood", "romance korte iccha",
      "romantic kichu bolo", "romantic feel"
    ],
    replies: [
      "Chander alo, halka hawa ar ekta mishti golpo! 🌙",
      "Ajker mood ta dekhi puro cinema type! 😍",
      "Moner manush thakle ekta sundor gaan dedicate koro! 🎶",
      "Kichu muhurto kothar cheye onubhob korte valo lage! ❤️",
      "Romantic mood e ek cup coffee hole mondo hoy na! ☕",
      "Ajke tomar moner akashe valobashar rong legeche! 🌹"
    ]
  },

  missingyou: {
    keywords: [
      "tomake miss kori", "onek miss korchi",
      "miss you prema", "tomar kotha mone pore",
      "kothay chile", "tomake khujchi",
      "miss korlam", "onekdin kotha hoy na",
      "tumi chole gele", "miss kortesi"
    ],
    replies: [
      "Awww! Eto miss? Ami to ekhanei achi! 🥰",
      "Tomar message dekhei abar adda shuru! ❤️",
      "Eto din por! Kothay hariye chile bolo? 🤭",
      "Miss korar sathe sathe ekta golpo o share koro! 🌸",
      "Ami online, ekhon ar miss korar excuse nei! 😂",
      "Tomar sathe abar kotha bole valo lagche! 💗"
    ]
  },

  possessive: {
    keywords: [
      "tumi amar", "sudhu amar", "onno karo sathe kotha",
      "amar hoye thako", "kauke dibo na",
      "amar upor odhikar", "amar jonno thako",
      "amake chara", "amar ekar"
    ],
    replies: [
      "Aha! Ajke dekhi possessive mood chalu hoyeche! 🤭",
      "Bhalobasha sundor, tobe freedom ar respect o dorkar! ❤️",
      "Eto odhikar! Age ekta mishti smile dao! 😜",
      "Care thakuk, kintu trust tao thakte hobe! 🥰",
      "Possessive kom, understanding beshi hole perfect! 🌸"
    ]
  },

  romanticjealousy: {
    keywords: [
      "onnor sathe keno", "take keno valo lage",
      "amar sathe kotha bolo", "amar dike takao",
      "ami jealous", "jealous feel", "hingse hocche",
      "onno meye", "onno chele", "amar rag hocche"
    ],
    replies: [
      "Oho! Keu ekjon ajke jealous hoyeche! 😏",
      "Jealousy holeo age shanto hoye kotha bolo! ❤️",
      "Moner kotha clear kore bolle misunderstanding kombe! 🌸",
      "Eto jealous hole kintu cha er sathe biscuit o lagbe! 😂",
      "Trust chara relationship e shanti thake na! 🥰"
    ]
  },

  relationshipadvice: {
    keywords: [
      "relationship advice", "prem er advice",
      "partner er sathe problem", "bf rag kore",
      "gf rag kore", "partner bujhe na",
      "somporko valo rakhbo", "prem tikbe kivabe",
      "relationship tips", "partner ke bujhbo"
    ],
    replies: [
      "Somporke dujoner kotha shonar soman sujog thaka uchit! ❤️",
      "Choto choto care onek boro difference toiri kore! 🌸",
      "Problem hole chup na theke shanto vabe discuss koro! 🤗",
      "Trust, respect ar communication chara relationship strong hoy na! 💗",
      "Nijer feelings bolar sathe tar feelings o shono! 🥰",
      "Relationship ekjoner responsibility na, dujoner chesta! ❤️"
    ]
  },

  firstlove: {
    keywords: [
      "first love", "prothom valobasha",
      "prothom prem", "first crush",
      "prothom dekha", "first relationship",
      "prothom valolaga", "first love story",
      "prothom prem er golpo"
    ],
    replies: [
      "First love er smriti onek somoy alada rokom hoy! 🥺",
      "Prothom valolagar feeling ta onek special! ❤️",
      "Sei golpo ta ki ekhono mone pore? 👀",
      "Kichu manush prothom hoyei smritite theke jay! 🌸",
      "First love mane jiboner ekta alada chapter! 📖"
    ]
  },

  marriageadvice: {
    keywords: [
      "biye korbo", "biye korte chai",
      "marriage advice", "biye kora uchit",
      "biye niye chinta", "biye kobe",
      "life partner chai", "biye plan",
      "married life", "biye er proposal"
    ],
    replies: [
      "Biye'r age understanding ar responsibility bojha important! ❤️",
      "Life partner choose korar somoy character ke priority dio! 🌸",
      "Sundor married life er jonno dujoner respect dorkar! 🥰",
      "Biye kono race na, nijer somoy moto decision nao! 😌",
      "Trust ar communication thakle poth chola sohoj hoy! 💗"
    ]
  },

  breakupadvice: {
    keywords: [
      "breakup hoyeche", "breakup korbo",
      "breakup er por", "se amake chereche",
      "prem sesh", "relationship sesh",
      "abar fire jabo", "take vule jabo",
      "move on korbo", "breakup pain"
    ],
    replies: [
      "Move on korte somoy lagle nijeke dosh dio na! ❤️",
      "Nijer healing ke priority dao, tarahura korar dorkar nei! 🌸",
      "Bar bar purono message pore nijeke koshto dio na! 🥺",
      "Je decision tomar shanti noshto kore, seta niye vebe dekho! 🤗",
      "Notun kore nijer life sajano shuru koro! 💗",
      "Ajke koshto holeo nijer proti bhalobasha harabe na! 🌷"
    ]
  },

  proposalreply: {
    keywords: [
      "keu propose koreche", "proposal peyechi",
      "amake propose dise", "ki reply dibo",
      "love proposal peyechi", "se valobashe",
      "amar kache prem er proposal", "accept korbo",
      "proposal accept", "proposal reject"
    ],
    replies: [
      "Age nijer feelings bujhe nao, tarpor answer dio! ❤️",
      "Raji na holeo respectfully nijer decision janiye dio! 🌸",
      "Valo lagle aste aste ekjon arekjonke chinte paro! 🥰",
      "Sudhu pressure e pore kono answer dio na! 😌",
      "Tomar mon ki bolche? Sei kothata important! 💗"
    ]
  },

  secretlove: {
    keywords: [
      "secret love", "lukano valobasha",
      "gopone valobashi", "kauke boli nai",
      "secret crush", "lukiye prem",
      "moner kotha lukai", "take boli nai",
      "one sided love", "ek torfa valobasha"
    ],
    replies: [
      "Lukano feelings er golpo gulo onek mysterious! 🤭",
      "Ek torfa holeo nijer feelings ke respect koro! ❤️",
      "Moner kotha bolte chaile sothik somoy ar poribesh choose koro! 🌸",
      "Se jane naki ekhono puro secret? 👀",
      "Feelings sundor, kintu nijer shanti tao important! 🥰"
    ]
  },

  cuteconversation: {
    keywords: [
      "cute kotha bolo", "mishti kotha bolo",
      "ador kore bolo", "sweet talk",
      "amake ador koro", "cute reply",
      "mishti kore bolo", "baby bolo",
      "jaan bolo", "sona bolo"
    ],
    replies: [
      "Oii mishti manush, ajke eto cute keno? 🥰",
      "Tomar jonno ekta virtual chocolate! 🍫",
      "Ektu hasho to, tomar hashi ta sundor! ❤️",
      "Aha amar group er mishti member! 🤭",
      "Tomar sathe kotha bollei adda ta special hoye jay! 🌸",
      "Mishti kotha chai? Tahole age ekta smile dao! 😘"
    ]
  },

  funnyinsult: {
    keywords: [
      "pagol naki", "boka tumi", "matha kharap",
      "ki boka", "faltu bot", "kichu paro na",
      "tomar buddhi nei", "pagli", "gadha",
      "ki ajob bot"
    ],
    replies: [
      "Pagol holeo premium version er pagol! 😂",
      "Amar buddhi loading e ache, ektu wait koro! 🤣",
      "Eto insult! Amar digital mon venge gelo! 🥺",
      "Boka bolle hobe? Certificate o dite hobe! 😜",
      "Ami boka hole tumi amar teacher naki? 😂",
      "Insult er reply dite gele alada processor lagbe! 🤖"
    ]
  },

  funnycomeback: {
    keywords: [
      "reply dite paro na", "ki reply diba",
      "uttor dao", "chup keno", "kotha bolo",
      "eto slow keno", "reply koi", "answer koi",
      "prema chup", "bot ghumay"
    ],
    replies: [
      "Reply ready chilo, tomar message er entry'r opekkhay chilam! 😂",
      "Ami chup chilam na, dramatic pause dichilam! 😎",
      "Eto tarahura! Reply er upor express delivery lagbe naki? 🤣",
      "Prema ghumay na, sudhu majhe majhe recharge ney! 🔋",
      "Kotha bolchi to! Ebar tumi ekta interesting topic dao! 😜",
      "Amar reply er speed er sathe tomar typing race dao! 😂"
    ]
  },

  conversationstarter: {
    keywords: [
      "ki niye kotha bolbo", "topic dao",
      "golpo shuru koro", "conversation start",
      "kotha shuru kori", "adda topic",
      "boring lagche", "kichu bolo",
      "golpo korte chai", "topic bolo"
    ],
    replies: [
      "Cholo bolo, tomar jiboner sobcheye funny ghotona konta? 😂",
      "Ekta question: jodi ekdin puro free pao, ki korbe? 👀",
      "Tomar dream destination konta? 🌍",
      "Chotobelar kon smriti ta ekhono mone pore? 🥰",
      "Tomar favorite gaan konta? Ajke seta niye adda hok! 🎶",
      "Truth game khelbo naki? Shuru korbo? 🤭"
    ]
  }

});

// PART 10 END

// ==============================
// PART 11 — CATEGORY 151 TO 165
// ==============================

Object.assign(data.categories, {

  morningroutine: {
    keywords: [
      "sokale ki korbo", "morning routine",
      "sokal e exercise", "ghum theke uthbo",
      "sokal ta valo korte chai", "early morning",
      "sokale porashona", "sokal er routine"
    ],
    replies: [
      "Sokale uthe ek glass pani khao, tarpor din shuru koro! ☀️",
      "Ajke ekta productive morning hok! ❤️",
      "Ghum theke uthe phone scroll kom, nijer kaj beshi! 😎",
      "Sokal ta nijer jonno ektu rakho! 🌸",
      "Early morning er fresh feeling tai alada! 🥰"
    ]
  },

  studybreak: {
    keywords: [
      "porashona korte korte", "study break",
      "porte porte tired", "break nibo",
      "porar majhe rest", "study korte valo lagche na",
      "boi bondho korbo", "study fatigue"
    ],
    replies: [
      "Ektu break nao, tarpor abar focus fire asbe! 📚",
      "5 minute rest nao, kintu break ke 5 ghonta banio na! 😂",
      "Chokh ke rest dao, ektu hatahati koro! 🌸",
      "Study break e pani kheye nao! 💧",
      "Cholo abar fresh mind niye porashonay fire jai! 💪"
    ]
  },

  result: {
    keywords: [
      "result ber hoyeche", "result dise",
      "exam result", "result valo hoyni",
      "result kharap", "result valo",
      "grade peyechi", "gpa peyechi",
      "marks peyechi", "result niye tension"
    ],
    replies: [
      "Result jemon-i hok, tomar learning journey ekhanei sesh na! ❤️",
      "Oho! Result er update dao, shuni! 👀",
      "Valo result hole congratulations! Ebar celebration! 🎉",
      "Expected moto na holeo nijeke somoy dao, abar chesta koro! 💪",
      "Marks tomar puro joggota define kore na! 🌸",
      "Tomar effort er jonno nijeke appreciate koro! 🥰"
    ]
  },

  admission: {
    keywords: [
      "admission nibo", "university admission",
      "college admission", "admission test",
      "admission preparation", "subject choose",
      "varsity te porbo", "admission tension",
      "university select", "admission exam"
    ],
    replies: [
      "Admission preparation er jonno ekta realistic routine banao! 📚",
      "Subject choose korar age nijer interest ar future scope dekho! ❤️",
      "Regular practice ar revision onek help korbe! 💪",
      "University choice er age course details dekhe nio! 🎓",
      "Kon university ba subject target korcho? 👀",
      "Tension komiye preparation e focus koro! 🌸"
    ]
  },

  universitylife: {
    keywords: [
      "university life", "varsity life",
      "campus life", "university te pori",
      "campus e jabo", "class korte jabo",
      "university friend", "semester life",
      "campus adda", "varsity experience"
    ],
    replies: [
      "University life mane class, assignment ar adda! 😂",
      "Campus er sundor memory gulo enjoy koro! ❤️",
      "Class er sathe sathe skill develop korte bhulo na! 🎓",
      "University te valo bondhu paoa onek boro paoa! 🥰",
      "Assignment deadline er age kaj sesh korar chesta koro! 🤭"
    ]
  },

  assignment: {
    keywords: [
      "assignment korte hobe", "assignment baki",
      "assignment submit", "assignment help",
      "report likhbo", "project report",
      "assignment deadline", "sir assignment dise",
      "homework baki", "assignment niye tension"
    ],
    replies: [
      "Assignment ta choto choto section e vag kore shuru koro! 📝",
      "Deadline er age submit korar chesta koro! ⏳",
      "Topic ta bolo, ki niye assignment? 👀",
      "Copy na kore nijer moto bujhe likhle valo shikhte parbe! ❤️",
      "Age outline banao, tarpor details add koro! 📚",
      "Assignment er sathe ektu cha hole focus barbe! ☕"
    ]
  },

  programminghelp: {
    keywords: [
      "code error", "syntax error", "compiler error",
      "debug korte hobe", "programming bug",
      "code run hocche na", "output asche na",
      "logic error", "coding e atke gechi",
      "program likhte hobe"
    ],
    replies: [
      "Error message ta dekho, usually okhanei clue thake! 💻",
      "Code er relevant part share korle help korte parbo! 🔧",
      "Debugging e ekta ekta line check koro! 😎",
      "Logic ta age paper e likhe nile coding easy hoy! 📝",
      "Kon programming language use korcho? 👀",
      "Bug paoa mane notun kichu shekhar chance! 🚀"
    ]
  },

  computer: {
    keywords: [
      "computer kinbo", "pc build", "desktop pc",
      "laptop kinbo", "ram upgrade", "ssd lagabo",
      "processor konta", "computer slow",
      "windows problem", "pc hang kore"
    ],
    replies: [
      "Computer er use onujayi specification choose koro! 💻",
      "SSD upgrade korle onek somoy speed improvement hoy! 🚀",
      "RAM upgrade er age motherboard support check koro! 🔧",
      "Laptop naki desktop, konta nite chaccho? 👀",
      "Budget ar kajer dhoron bolle choice korte subidha hobe! 😎"
    ]
  },

  internetproblem: {
    keywords: [
      "net kaj kore na", "internet nai",
      "wifi disconnect", "network problem",
      "data sesh", "mobile data slow",
      "internet connection", "router problem",
      "wifi password", "network slow"
    ],
    replies: [
      "Router restart diye dekho, onek somoy kaj hoy! 📶",
      "Mobile data hole airplane mode on-off kore dekho! 📱",
      "WiFi te onno device connect hocche kina check koro! 🔧",
      "Internet provider er outage o hote pare! 🌐",
      "Problem ta WiFi naki mobile data te hocche? 👀"
    ]
  },

  phoneaddiction: {
    keywords: [
      "phone beshi chalai", "mobile addiction",
      "phone charte pari na", "screen time beshi",
      "saradin phone", "social media addiction",
      "phone kom chalabo", "mobile e time noshto",
      "scroll korte thaki"
    ],
    replies: [
      "Phone er jonno ekta daily time limit set koro! 📱",
      "Ghum er age phone dure rakhar chesta koro! 🌙",
      "Notification off korle distraction komte pare! 😌",
      "Free time e phone chara onno hobby try koro! 🌸",
      "Ajke screen time ektu komanor challenge nao! 💪"
    ]
  },

  sleep: {
    keywords: [
      "ghum asche na", "ghum hocche na",
      "rate ghum hoy na", "sleep problem",
      "ghum kom hoy", "sararat jege",
      "ghumate parchi na", "sleep schedule",
      "rat jagi", "ghum er somossa"
    ],
    replies: [
      "Ghum er age screen time komiye dekho! 🌙",
      "Protodin motamuti eki somoy ghumate jao! 😴",
      "Rate caffeine kom khele upokar hote pare! ☕",
      "Room ta quiet ar comfortable rakhar chesta koro! ❤️",
      "Ghum er problem regular hole doctor er sathe kotha bolo! 🌸"
    ]
  },

  dream: {
    keywords: [
      "amar shopno", "dream ache",
      "boro kichu hobo", "shopno puron",
      "future dream", "life goal",
      "boro manush hobo", "nijer dream",
      "shopno dekhi", "goal achieve"
    ],
    replies: [
      "Shopno boro rakho, kintu kaj shuru koro choto step diye! 🚀",
      "Tomar dream er jonno protidin ektu kore kaj koro! ❤️",
      "Shopno puroner journey te patience khub important! 🌱",
      "Tomar biggest dream ta ki? Shunte chai! 👀",
      "Nijer upor bishash rakho, poth ekdin khuje pabe! 💪"
    ]
  },

  money: {
    keywords: [
      "taka nai", "money problem",
      "budget korte chai", "saving korbo",
      "taka jomabo", "pocket money",
      "monthly expense", "khorocha beshi",
      "financial problem", "savings plan"
    ],
    replies: [
      "Prothome monthly income ar expense likhe rakho! 💰",
      "Choto amount holeo regular saving korar chesta koro! ❤️",
      "Proyojon ar icchar khoroch alada kore dekho! 📝",
      "Budget plan korle taka kothay jacche bojha sohoj hoy! 😌",
      "Hothat kono financial decision na niye age vebe dekho! 🌸"
    ]
  },

  birthdaywish: {
    keywords: [
      "aj amar birthday", "amar jonmodin",
      "birthday amar", "ajke jonmodin",
      "birthday wish koro", "jonmodiner shubhechha",
      "birthday celebrate", "cake katbo aj",
      "birthday boy", "birthday girl"
    ],
    replies: [
      "Happy Birthday! Tomar jibon khushi ar success e vorti hok! 🎂",
      "Jonmodiner onek onek shubhechha! Bhalo theko sobsomoy! ❤️",
      "Ajke tomar special day, mon khule enjoy koro! 🥳",
      "Cake er ekta piece amar jonno rekho! 😂",
      "Notun bochor ta hok notun shopno ar sundor muhurte vora! 🎉"
    ]
  },

  birthdayreminder: {
    keywords: [
      "birthday kobe", "jonmodin kobe",
      "birthday date", "amar birthday mone ache",
      "birthday mone rakhbe", "jonmodin mone rekho",
      "birthday reminder", "birthday asche"
    ],
    replies: [
      "Birthday date ta bolo, tahole ei conversation e mone rakhte parbo! 🎂",
      "Tomar special day miss korte chai na! 🥰",
      "Birthday reminder er jonno date ta jante hobe! ❤️",
      "Kobe tomar birthday? Tarikh ta bolo! 👀",
      "Birthday ele celebration er plan korte hobe! 🎉"
    ]
  }

});

// PART 11 END

// ==============================
// PART 12 — CATEGORY 166 TO 180
// ==============================

Object.assign(data.categories, {

  jobsearch: {
    keywords: [
      "job khujchi", "chakri khujchi",
      "job apply korbo", "chakri dorkar",
      "job circular", "job interview",
      "job pabo kivabe", "career opportunity"
    ],
    replies: [
      "CV ta professional vabe ready koro, tarpor apply shuru koro! 💼",
      "Tomar skill ar interest er sathe mile emon job khuje dekho! ❤️",
      "Ekta job na hole mon kharap koro na, aro opportunity ashbe! 🌸",
      "Interview er jonno age thekei practice koro! 💪",
      "Kon type er job khujcho? 👀"
    ]
  },

  freelancing: {
    keywords: [
      "freelancing korbo", "freelancer hobo",
      "online income", "freelancing shikhbo",
      "dollar income", "client khujbo",
      "fiverr kaj", "upwork kaj",
      "freelancing income"
    ],
    replies: [
      "Age ekta specific skill valo kore shikho, tarpor portfolio banao! 💻",
      "Freelancing e success pete patience ar consistency dorkar! 🚀",
      "Client pawar age nijer kajer sample ready rakho! ❤️",
      "Kon skill diye freelancing korte chaccho? 👀",
      "Quick money er promise dekhe kono course ba offer e taka dio na! ⚠️"
    ]
  },

  onlinebusiness: {
    keywords: [
      "online business", "business shuru",
      "online shop khulbo", "business idea",
      "business korte chai", "product sell",
      "facebook business", "ecommerce business",
      "small business"
    ],
    replies: [
      "Choto kore start koro, customer feedback niye aste aste grow koro! 📈",
      "Business er age market research kora important! 💡",
      "Product, customer ar budget clear kore plan banao! ❤️",
      "Tomar business idea ta ki? Shunte chai! 👀",
      "Profit er sathe customer trust build koratao important! 🤝"
    ]
  },

  entrepreneurship: {
    keywords: [
      "entrepreneur hobo", "startup korbo",
      "nijer company", "founder hobo",
      "startup idea", "business founder",
      "notun startup", "company khulbo"
    ],
    replies: [
      "Boro idea ke choto prototype diye test koro! 🚀",
      "Problem identify koro, tarpor solution build koro! 💡",
      "Founder howa mane sudhu idea na, execution o important! 💪",
      "Tomar startup idea ta ki niye? 👀",
      "Failure theke learning niye abar improve koro! 🌱"
    ]
  },

  presentation: {
    keywords: [
      "presentation dite hobe", "ppt banabo",
      "presentation tension", "slide banate hobe",
      "presentation speech", "class presentation",
      "presentation practice", "presentation skill"
    ],
    replies: [
      "Slide e kom text ar clear point rakho! 🎤",
      "Presentation er age koyekbar practice kore nio! ❤️",
      "Shurute confident introduction dile impression valo hoy! 😎",
      "Audience er dike takiye kotha bolar practice koro! 🌸",
      "Topic ta bolo, presentation er structure niye help korte pari! 📝"
    ]
  },

  publicspeaking: {
    keywords: [
      "public speaking", "stage e voy",
      "manusher samne kotha", "speech dite voy",
      "stage fear", "mic niye kotha",
      "speech practice", "public e bolbo"
    ],
    replies: [
      "Choto audience er samne practice diye shuru koro! 🎤",
      "Perfect hote hobe na, clear vabe bolte parle enough! ❤️",
      "Speech er main points age note kore rakho! 📝",
      "Nijer voice record kore practice korte paro! 😎",
      "Nervous howa normal, aste aste confidence barbe! 🌱"
    ]
  },

  cooking: {
    keywords: [
      "ranna korte chai", "cooking shikhbo",
      "ki ranna korbo", "ranna pari na",
      "recipe dao", "khabar banabo",
      "cooking idea", "easy recipe"
    ],
    replies: [
      "Ajke easy kichu diye cooking start koro! 🍳",
      "Recipe follow korar sathe sathe nijer taste o add koro! 😋",
      "Ranna seshe kitchen porishkar korte bhulo na! 😂",
      "Ki dhoroner khabar banate chaccho? 👀",
      "Prothom bar perfect na holeo problem nei, practice choluk! ❤️"
    ]
  },

  restaurant: {
    keywords: [
      "restaurant jabo", "restaurant e khabo",
      "kothay khete jabo", "food court",
      "restaurant plan", "dinner outside",
      "lunch outside", "cafe jabo"
    ],
    replies: [
      "Restaurant plan hole budget age decide kore nio! 🍽️",
      "Bhalo food er sathe bhalo company holei din perfect! 🥰",
      "Ajke ki khawar mood? Pizza naki biriyani? 😋",
      "Friends der sathe gele adda tao jome jabe! ❤️",
      "Kothay jawar plan korcho? 👀"
    ]
  },

  exercise: {
    keywords: [
      "exercise korbo", "workout shuru",
      "gym jabo", "fitness routine",
      "daily exercise", "body fit rakhbo",
      "workout plan", "exercise routine"
    ],
    replies: [
      "Choto warm-up diye workout shuru koro! 💪",
      "Regular exercise er sathe rest o important! ❤️",
      "Nijer fitness level onujayi exercise choose koro! 🌸",
      "Ekdin beshi kore porer din bondho na, consistency rakho! 🔥",
      "Ajke workout complete korle nijeke ekta high-five dio! 🙌"
    ]
  },

  football: {
    keywords: [
      "football khelbo", "football match",
      "goal hoyeche", "penalty kick",
      "football team", "world cup football",
      "football fan", "match dekhbo"
    ],
    replies: [
      "Football er excitement e alada level! ⚽",
      "Last minute goal hole puro match er moja double! 😂",
      "Tomar favorite football team konta? 👀",
      "Match e tomar prediction ki? 🏆",
      "Football niye adda dile somoy kokhon jay bojha jay na! ❤️"
    ]
  },

  cricket: {
    keywords: [
      "cricket khelbo", "cricket match",
      "six mereche", "wicket poreche",
      "cricket team", "world cup cricket",
      "cricket fan", "match cholche",
      "batting korbo", "bowling korbo"
    ],
    replies: [
      "Cricket match er tension ar excitement duita-i alada! 🏏",
      "Last over er thriller miss kora jay naki! 😂",
      "Tomar favorite cricket team konta? 👀",
      "Batting naki bowling, konta beshi pochondo? 😎",
      "Ajke tomar match prediction ki? 🏆"
    ]
  },

  anime: {
    keywords: [
      "anime dekhi", "anime lover",
      "anime suggest", "anime recommendation",
      "naruto dekhechi", "one piece",
      "anime character", "anime series",
      "best anime"
    ],
    replies: [
      "Anime world e dhukle ber howa kothin! 😂",
      "Tomar favorite anime character ke? 👀",
      "Action naki romance anime beshi pochondo? ❤️",
      "Anime er story ar character development onek interesting hoy! 🌸",
      "Tomar dekha best anime konta? 🍿"
    ]
  },

  drawing: {
    keywords: [
      "drawing kori", "picture akbo",
      "chobi akte chai", "drawing shikhbo",
      "sketch korbo", "art practice",
      "painting korbo", "artwork banabo"
    ],
    replies: [
      "Art er beauty holo nijer imagination ke express kora! 🎨",
      "Daily ektu sketch korle skill improve hobe! ❤️",
      "Perfect drawing er cheye creativity beshi important! 🌸",
      "Ki akte pochondo koro? 👀",
      "Tomar imagination er color diye duniya sajie felo! 🥰"
    ]
  },

  fashion: {
    keywords: [
      "fashion sense", "dress select",
      "ki porbo", "outfit idea",
      "style korte chai", "fashion trend",
      "dress combination", "outfit suggest",
      "fashion tips"
    ],
    replies: [
      "Comfortable outfit-i tomar best style! 😎",
      "Simple outfit er sathe matching accessories try korte paro! ✨",
      "Trend follow korar cheye nijer style maintain koro! ❤️",
      "Casual naki party outfit khujcho? 👀",
      "Confidence thakle simple look o classy lage! 🥰"
    ]
  },

  shoppingaddict: {
    keywords: [
      "shopping korte iccha", "shopping pagol",
      "onek shopping kori", "shopping addiction",
      "cart e rekhechi", "online order dibo",
      "shopping mood", "kenakata korte chai"
    ],
    replies: [
      "Shopping er age list banao, nahole cart bhore jabe! 😂",
      "Proyojon ache kina ekbar vebe tarpor order dio! 🛍️",
      "Window shopping er mojao kom na! 😎",
      "Ajke ki shopping korar plan? 👀",
      "Budget er moddhe shopping korlei real winner! 💰"
    ]
  }

});

// PART 12 END
// ==============================
// PART 13 — CATEGORY 181 TO 195
// ==============================

Object.assign(data.categories, {

  photographytips: {
    keywords: [
      "photo tulbo", "photography tips",
      "camera setting", "mobile photography",
      "portrait photo", "nature photography",
      "photo editing tips", "bhalo chobi tulbo"
    ],
    replies: [
      "Natural light e photo tulলে onek sundor ashe! 📸",
      "Angle change kore dekho, same subject er different look pabe! ✨",
      "Composition er jonno rule of thirds try korte paro! ❤️",
      "Mobile diyeo darun photography kora jay! 😎",
      "Tomar photography style konta? 👀"
    ]
  },

  editing: {
    keywords: [
      "photo edit korbo", "video edit",
      "editing shikhbo", "capcut edit",
      "video editing tips", "photo filter",
      "reels edit", "editing app"
    ],
    replies: [
      "Editing e beshi effect na diye clean look rakho! 🎬",
      "Basic cut, transition ar color correction diye shuru koro! ✨",
      "Practice korle editing skill onek improve hobe! 💪",
      "Photo edit naki video edit korte chaccho? 👀",
      "Nijer creativity diye unique kichu banao! ❤️"
    ]
  },

  youtube: {
    keywords: [
      "youtube channel", "youtube video",
      "youtube e upload", "subscriber barabo",
      "youtube creator", "youtube shorts",
      "channel grow", "video views"
    ],
    replies: [
      "Regular quality content upload korar chesta koro! 🎥",
      "Audience ki dekhte pochondo kore seta bujhe content banao! ❤️",
      "Thumbnail ar title attractive rakho, kintu misleading koro na! 😎",
      "Tomar channel er topic ki? 👀",
      "Views kom holeo learning bondho koro na! 🚀"
    ]
  },

  contentcreation: {
    keywords: [
      "content creator", "content banabo",
      "content idea", "reels banabo",
      "video content", "social content",
      "creator hote chai", "content plan"
    ],
    replies: [
      "Nijer interest er topic niye content banano shuru koro! 🎬",
      "Perfect camera na thakleo creativity diye shuru kora jay! ❤️",
      "Audience er jonno useful ba entertaining kichu create koro! ✨",
      "Tomar content niche ki hobe? 👀",
      "Consistency ar originality maintain koro! 🚀"
    ]
  },

  facebooktalk: {
    keywords: [
      "facebook post", "facebook status",
      "facebook account", "fb te post",
      "facebook story", "fb status dibo",
      "facebook page", "fb id"
    ],
    replies: [
      "Ki type er post dite chaccho? Funny naki emotional? 😄",
      "Status ta nijer mood er sathe match kore dio! ❤️",
      "Facebook e privacy settings check kore nio! 🔒",
      "Ekta interesting caption hole post aro attractive lage! ✨",
      "Social media enjoy koro, kintu real life er time-o rekho! 🌸"
    ]
  },

  instagramtalk: {
    keywords: [
      "instagram post", "insta story",
      "instagram reel", "insta id",
      "instagram follower", "insta caption",
      "instagram bio", "insta te dibo"
    ],
    replies: [
      "Insta story te ajker best moment ta share koro! 📸",
      "Bio ta short ar unique rakho! ✨",
      "Caption er moddhe nijer personality prokash koro! 😎",
      "Follower er cheye genuine connection important! ❤️",
      "Reel bananor plan naki? 👀"
    ]
  },

  whatsapp: {
    keywords: [
      "whatsapp message", "whatsapp status",
      "whatsapp dp", "whatsapp group",
      "whatsapp e text", "whatsapp call",
      "whatsapp problem", "whatsapp backup"
    ],
    replies: [
      "WhatsApp status e ki dite chaccho? 😄",
      "Important chat hole backup rekhe dio! 📱",
      "Unknown link e click korar age verify kore nio! 🔒",
      "Group e beshi notification hole mute kore rakhte paro! 😂",
      "DP change korar mood naki? 👀"
    ]
  },

  onlinefriend: {
    keywords: [
      "online friend", "online bondhu",
      "internet friend", "online e porichoy",
      "virtual friend", "online friendship",
      "online bondhutto", "net friend"
    ],
    replies: [
      "Online friendship o sundor hote pare, trust build korte somoy lage! ❤️",
      "Personal information share korar age careful theko! 🔒",
      "Bhalo bondhu hole distance kono boro issue na! 🥰",
      "Online friend er sathe koto diner porichoy? 👀",
      "Respect ar honesty thakle friendship strong hoy! 🤝"
    ]
  },

  childhood: {
    keywords: [
      "chotobelar kotha", "childhood memory",
      "small age", "school life memory",
      "chotobela miss kori", "bachobelar din",
      "childhood friend", "old school days"
    ],
    replies: [
      "Chotobelar din gulo abar fire pele kemon hoto! 🥹",
      "Shei somoyer choto choto khushi gulo onek special chilo! ❤️",
      "Tomar childhood er shobcheye funny memory konta? 😂",
      "Purono bondhuder kotha mone pore jay majhe majhe! 🌸",
      "Memory gulo thakuk moner ekta sundor album e! 📸"
    ]
  },

  schoollife: {
    keywords: [
      "school life", "school er din",
      "school friend", "school teacher",
      "school e portam", "school memory",
      "school er adda", "school uniform"
    ],
    replies: [
      "School life er adda ar tiffin share korar din gulo! 🥹",
      "School friend der sathe abar dekha hole moja hoto! ❤️",
      "Exam er ager tension mone ache? 😂",
      "Tomar favorite school subject konta chilo? 📚",
      "School er kon memory ta ekhono mone pore? 👀"
    ]
  },

  petcare: {
    keywords: [
      "pet care", "posha prani",
      "biral er care", "kukurer care",
      "pet khabar", "pet er oshukh",
      "cat care tips", "dog care tips"
    ],
    replies: [
      "Pet er regular food, pani ar clean environment ensure koro! 🐾",
      "Pet er health problem hole veterinarian er poramorsho nao! ❤️",
      "Oder sathe daily kichu time spend koro! 🥰",
      "Tomar pet biral naki kukur? 👀",
      "Pet er vaccination ar checkup maintain kora important! 🐶"
    ]
  },

  catlover: {
    keywords: [
      "biral valo lage", "cat lover",
      "amar biral", "cat baby",
      "biral cute", "cat photo",
      "biral palbo", "meow meow"
    ],
    replies: [
      "Meow meow! Biral der attitude aladai! 🐱",
      "Cat er cute face dekhe rag kore thaka jay na! 🥹",
      "Tomar biral er nam ki? ❤️",
      "Biral ghumay ar amader mon churi kore! 😂",
      "Cat lovers der jonno ekta virtual paw! 🐾"
    ]
  },

  doglover: {
    keywords: [
      "kukur valo lage", "dog lover",
      "amar kukur", "puppy cute",
      "dog baby", "kukur palbo",
      "dog photo", "woof woof"
    ],
    replies: [
      "Dogs are full of love and loyalty! 🐶",
      "Puppy der cute face dekhe mon valo hoye jay! 🥹",
      "Tomar kukur er nam ki? ❤️",
      "Oder sathe walk korte jawa darun experience! 🐾",
      "Virtual dog hug pathalam! 🤗"
    ]
  },

  naturelover: {
    keywords: [
      "nature valo lage", "nature lover",
      "prokriti pochondo", "pahar valo lage",
      "sobuj gach", "nature photography",
      "natural beauty", "prokritir soundorjo"
    ],
    replies: [
      "Prokritir majhe kichu somoy katale mon fresh hoy! 🌿",
      "Pahar, nodi ar sobuj gach—shob kichur beauty alada! ❤️",
      "Nature er sound shunte amar reply-o peaceful hoye gelo! 🌸",
      "Tomar favorite natural place konta? 👀",
      "Majhe majhe phone rekhe akasher dike takao! ☁️"
    ]
  },

  rainlover: {
    keywords: [
      "bristi valo lage", "rain lover",
      "bristite vijbo", "rainy day",
      "bristi dekhte valo", "brishtir din",
      "rain sound", "bristir gondho"
    ],
    replies: [
      "Bristir sound ar ek cup cha, perfect combination! ☔",
      "Janalar pashe bose bristi dekhar moja alada! ❤️",
      "Rainy day te romantic mood automatic chole ashe! 🥰",
      "Bristite ber hole umbrella nite bhulo na! 😂",
      "Tomar bristi dekhte valo lage naki bristite vijte? 👀"
    ]
  }

});

// PART 13 END
// ==============================
// PART 14 — CATEGORY 196 TO 210
// ==============================

Object.assign(data.categories, {

  travelplanning: {
    keywords: [
      "tour plan", "ghurte jabo",
      "travel plan", "trip plan",
      "kothao ghurte chai", "tour dite chai",
      "travel korbo", "trip arrange"
    ],
    replies: [
      "Tour er age budget ar destination thik kore nao! ✈️",
      "Notun jayga ghure notun memory create koro! ❤️",
      "Travel checklist baniye nile kichu bhule jawar chance kom! 🎒",
      "Kothay jawar plan korcho? 👀",
      "Journey ta safe ar enjoyable hok! 🥰"
    ]
  },

  beachlover: {
    keywords: [
      "sea beach", "somudro dekhbo",
      "beach e jabo", "sea lover",
      "somudro valo lage", "beach trip",
      "somudrer pani", "beach vacation"
    ],
    replies: [
      "Somudrer dheu ar hawa mon ta fresh kore dey! 🌊",
      "Beach e sunset dekhar feeling alada! ❤️",
      "Somudrer pashe bose onekkhon golpo korte iccha kore! 🥰",
      "Tomar favorite beach konta? 👀",
      "Beach e gele sunscreen ar pani nite bhulo na! ☀️"
    ]
  },

  mountainlover: {
    keywords: [
      "pahar e jabo", "mountain lover",
      "pahar valo lage", "mountain trip",
      "hill trekking", "pahar dekhbo",
      "mountain view", "pahar ghurte chai"
    ],
    replies: [
      "Paharer upor theke view dekhar mojai alada! ⛰️",
      "Mountain trip mane adventure ar sundor memory! ❤️",
      "Trekking er age fitness ar safety preparation rekho! 🎒",
      "Pahar naki somudro, konta tomar beshi pochondo? 👀",
      "Paharer nirjonta mon ke onek shanti dey! 🌿"
    ]
  },

  trainjourney: {
    keywords: [
      "train e jabo", "train journey",
      "train ticket", "rail station",
      "trene ghurbo", "train travel",
      "train er janala", "rail journey"
    ],
    replies: [
      "Train er janala diye baire takiye travel korar moja alada! 🚆",
      "Journey er age ticket ar time check kore nio! ❤️",
      "Train journey te snacks nile kharap hoy na! 😂",
      "Window seat naki aisle seat pochondo? 👀",
      "Safe journey hok, bhalo kore ghure asho! 🥰"
    ]
  },

  roadtrip: {
    keywords: [
      "road trip", "bike trip",
      "car journey", "long drive",
      "drive e jabo", "highway trip",
      "road e ghurbo", "long journey"
    ],
    replies: [
      "Road trip er sathe favorite playlist thakle perfect! 🎵",
      "Long drive er age vehicle check kore nio! 🚗",
      "Safe driving always first, speed niye competition na! ❤️",
      "Road trip e tomar favorite travel partner ke? 👀",
      "Destination er cheye journey-o onek special hote pare! 🌄"
    ]
  },

  village: {
    keywords: [
      "gramer bari", "village life",
      "gram e jabo", "gramer poribesh",
      "gramer hawa", "village tour",
      "gramer shanti", "gramer din"
    ],
    replies: [
      "Gramer shokal er fresh hawa alada shanti dey! 🌾",
      "Gramer pukur ar sobuj math er memory sundor! ❤️",
      "Gram er khabar er taste-i onno rokom! 😋",
      "Tomar gramer bari kothay? 👀",
      "Majhe majhe shohorer noise theke dure jawa dorkar! 🌿"
    ]
  },

  citylife: {
    keywords: [
      "city life", "sohorer jibon",
      "dhaka city", "busy city",
      "city traffic", "sohore thaki",
      "urban life", "sohorer adda"
    ],
    replies: [
      "City life busy holeo nijer jonno time rekho! 🌆",
      "Traffic jam er moddhe patience test hoy! 😂",
      "Sohorer alo ar rater view onek sundor lage! ✨",
      "City life naki village life, konta pochondo? 👀",
      "Busy schedule er majheo nijer happiness khuje nao! ❤️"
    ]
  },

  festivalmood: {
    keywords: [
      "festival mood", "utsober anondo",
      "festival celebrate", "utsob korbo",
      "special festival", "festival plan",
      "utsober din", "celebration mood"
    ],
    replies: [
      "Utsob mane anondo, hasi ar priyo manusher sathe somoy! 🎉",
      "Festival er best part holo sobar sathe mile mishe thaka! ❤️",
      "Ajker din ta full enjoy koro! 🥳",
      "Festival er kon part ta tomar beshi pochondo? 👀",
      "Utsober rong tomar jibon eo lege thakuk! 🌸"
    ]
  },

  eidmood: {
    keywords: [
      "eid mubarak", "eid er anondo",
      "eid shopping", "eid salami",
      "eid er din", "eid celebration",
      "eid e ki korbo", "eid outfit"
    ],
    replies: [
      "Eid Mubarak! Tomar din ta anonde vorti hok! 🌙",
      "Eid er salami peyecho naki ekhono baki? 😂",
      "Notun jama ar priyo khabar, Eid er mojai alada! ❤️",
      "Eid e family er sathe sundor somoy katio! 🥰",
      "Eid er shopping complete naki ekhono baki? 👀"
    ]
  },

  pohelaboishakh: {
    keywords: [
      "pohela boishakh", "boishakhi mela",
      "bangla noboborsho", "boishakh celebrate",
      "notun bochor bangla", "boishakh er din",
      "boishakhi utsob", "shuvo noboborsho"
    ],
    replies: [
      "Shuvo Noboborsho! Notun bochor hok anondomoy! ❤️",
      "Boishakhi rong e mon ta rongin hoye uthuk! 🎊",
      "Mela te jawar plan ache naki? 👀",
      "Panta ilish naki onno kichu, ki khabe ajke? 😋",
      "Notun bochor notun shopno niye shuru hok! 🌸"
    ]
  },

  newyearmood: {
    keywords: [
      "happy new year", "new year plan",
      "new year resolution", "notun bochor",
      "new year celebrate", "bochor sesh",
      "year end plan", "new year wish"
    ],
    replies: [
      "Happy New Year! Notun bochor tomar jonno sundor hok! 🎆",
      "Notun bochore notun goal set kore felo! ❤️",
      "Purono vul theke shikhe notun vabe shuru koro! 🌱",
      "New year celebration er plan ki? 👀",
      "Ei bochor tomar onek shopno puron hok! 🥰"
    ]
  },

  valentine: {
    keywords: [
      "valentine day", "valentine plan",
      "valentines day", "valentine gift",
      "valentine celebrate", "love day",
      "valentine wish", "14 february"
    ],
    replies: [
      "Valentine's Day hok bhalobasha ar care diye vora! ❤️",
      "Gift er cheye sincere feelings onek beshi valuable! 🥰",
      "Special manusher jonno special kichu plan korecho? 👀",
      "Ekta cute message-o karo din sundor kore dite pare! 💌",
      "Love celebrate korar jonno ekta din-i shudhu dorkar na! 🌹"
    ]
  },

  friendshipday: {
    keywords: [
      "friendship day", "bondhutto dibosh",
      "friendship day wish", "best friend day",
      "bondhur jonno wish", "friendship celebrate",
      "bondhutter din", "friend day"
    ],
    replies: [
      "Happy Friendship Day! Bondhutto emni sundor thakuk! 🤝",
      "Real friend holo je kharap somoyeo pashe thake! ❤️",
      "Best friend ke ekta cute message pathao! 🥰",
      "Tomar best friend ke? 👀",
      "Bondhutto te hasi, rag ar paglamo sobi thake! 😂"
    ]
  },

  specialday: {
    keywords: [
      "special day", "aj special din",
      "special occasion", "ajker din special",
      "celebration day", "mone rakhar din",
      "important day", "ajke onek special"
    ],
    replies: [
      "Special din ta aro special kore tolo! ✨",
      "Ajker sundor moment gulo mone rekho! ❤️",
      "Kono special occasion naki? Shunte chai! 👀",
      "Priyo manusher sathe somoy katale din ta aro sundor hoy! 🥰",
      "Ajker din tomar jonno onek memorable hok! 🌸"
    ]
  },

  giftidea: {
    keywords: [
      "gift ki dibo", "gift idea",
      "birthday gift", "present suggest",
      "surprise gift", "gift choose",
      "ki gift kinbo", "gift for friend"
    ],
    replies: [
      "Gift er age tar pochondo ar interest ta vebe dekho! 🎁",
      "Handmade gift hole personal touch thake! ❤️",
      "Choto thoughtful gift-o onek special hote pare! 🥰",
      "Kar jonno gift khujcho? 👀",
      "Gift er sathe ekta handwritten note dile aro cute lagbe! 💌"
    ]
  }

});

// PART 14 END
// ==============================
// PART 15 — CATEGORY 211 TO 225
// ==============================

Object.assign(data.categories, {

  surpriseplan: {
    keywords: [
      "surprise dibo", "surprise plan",
      "surprise korte chai", "secret surprise",
      "surprise arrange", "surprise party",
      "surprise dite chai", "ki surprise dibo"
    ],
    replies: [
      "Surprise ta thoughtful holei best! 🎁",
      "Choto ekta unexpected gesture-o onek happiness dite pare! ❤️",
      "Plan ta secret rekho, nahole surprise er moja sesh! 😂",
      "Kar jonno surprise plan korcho? 👀",
      "Ekta cute handwritten note add korte paro! 💌"
    ]
  },

  giftreceiving: {
    keywords: [
      "gift peyechi", "keu gift dise",
      "gift pelam", "present peyechi",
      "surprise gift pelam", "gift peye valo lagche",
      "gift dise amake", "amar jonno gift"
    ],
    replies: [
      "Oho! Ki sundor surprise peyecho! 🥰",
      "Gift ta pochondo hoyeche? 🎁",
      "Gift er sathe je feelings thake, setai special! ❤️",
      "Ki gift peyecho? Ektu bolo! 👀",
      "Ajke tomar happiness level onek high mone hocche! 😂"
    ]
  },

  handwriting: {
    keywords: [
      "handwriting valo na", "sundor handwriting",
      "lekha sundor korbo", "writing improve",
      "hat er lekha", "handwriting practice",
      "lekhar style", "writing speed"
    ],
    replies: [
      "Daily kichu somoy handwriting practice koro! ✍️",
      "Letter er size ar spacing same rakhar chesta koro! ❤️",
      "Dhire dhire clear kore likhle improvement hobe! 📚",
      "Speed er age readability improve koro! 😎",
      "Practice er kono shortcut nei, continue koro! 💪"
    ]
  },

  languagelearning: {
    keywords: [
      "english shikhbo", "english bolte chai",
      "english speaking", "new language shikhbo",
      "vocabulary barabo", "english practice",
      "grammar shikhbo", "language practice"
    ],
    replies: [
      "Protodin 10 ta notun word shekhar chesta koro! 📚",
      "Vul holeo English e kotha bolar practice chaliye jao! ❤️",
      "Movie ba video subtitle diye dekhte paro! 🎬",
      "Daily speaking practice confidence baray! 💪",
      "Kon language shikhte chaccho? 👀"
    ]
  },

  englishpractice: {
    keywords: [
      "english e kotha bolo", "speak english with me",
      "english conversation", "english sentence",
      "english e bolbo", "english test",
      "english speaking practice", "english e chat"
    ],
    replies: [
      "Sure! Let's practice English together! 😊",
      "Don't worry about mistakes, just keep speaking! ❤️",
      "Try to make one English sentence about your day! ✍️",
      "I can help you practice simple English conversations! 🌸",
      "Let's start with: How was your day? 👀"
    ]
  },

  translation: {
    keywords: [
      "translate koro", "meaning bolo",
      "english meaning", "bangla meaning",
      "etar ortho ki", "word er meaning",
      "bangla translate", "english translate"
    ],
    replies: [
      "Je word ba sentence ta translate korte chao seta pathao! 📖",
      "Bangla theke English naki English theke Bangla? 👀",
      "Sentence ta dile meaning bujhte help korte parbo! ❤️",
      "Translation er sathe example dile bujhte subidha hobe! ✨",
      "Word ta pathao, dekhi ki meaning hoy! 😊"
    ]
  },

  mathproblem: {
    keywords: [
      "math korte pari na", "math problem",
      "math solve", "gonit bujhi na",
      "math er answer", "equation solve",
      "calculation problem", "math help chai"
    ],
    replies: [
      "Math er problem ta pathao, step by step bujhar chesta kori! 📐",
      "Formula mukhosto na kore concept bujhe nao! ❤️",
      "Practice korle math aste aste easy hoye jabe! 💪",
      "Kon topic er math? Algebra naki Calculus? 👀",
      "Ekta ekta step follow korlei solution ber hobe! 📝"
    ]
  },

  sciencefacts: {
    keywords: [
      "science fact", "bigganer tottho",
      "interesting science", "science question",
      "scientific fact", "science niye bolo",
      "space fact", "physics fact"
    ],
    replies: [
      "Science er duniya te protidin notun kichu janar ache! 🔬",
      "Curiosity thaklei learning shuru hoy! ❤️",
      "Space niye interesting kichu jante chao? 🌌",
      "Science er kon topic tomar beshi interesting lage? 👀",
      "Question korte thako, curiosity kokhono bondho koro na! 🚀"
    ]
  },

  spaceinterest: {
    keywords: [
      "space valo lage", "universe",
      "black hole", "planet niye bolo",
      "galaxy", "astronomy",
      "moon dekhbo", "space exploration"
    ],
    replies: [
      "Universe eto boro je amader imagination-o choto hoye jay! 🌌",
      "Black hole niye curiosity thaka ekdom natural! 🖤",
      "Space er mystery gulo darun interesting! ✨",
      "Tomar favorite planet konta? 👀",
      "Ekdin telescope diye sky observe korar plan koro! 🔭"
    ]
  },

  historyinterest: {
    keywords: [
      "history valo lage", "itihash shikhbo",
      "historical event", "ancient history",
      "history question", "purono jug",
      "historical place", "itihash niye bolo"
    ],
    replies: [
      "History janle past theke onek kichu shekha jay! 📜",
      "Prottek historical event er pichone interesting story thake! ❤️",
      "Ancient civilization niye tomar interest ache? 👀",
      "History sudhu tarikh na, manusher golpo-o! 🌍",
      "Kon historical period tomar beshi pochondo? 😊"
    ]
  },

  bookreading: {
    keywords: [
      "boi porte valo lage", "book reading",
      "boi porbo", "reading habit",
      "boi suggest koro", "book lover",
      "novel porbo", "boi porar obhyash"
    ],
    replies: [
      "Protodin 10 page porar habit diye shuru korte paro! 📖",
      "Boi manushke notun duniya dekhay! ❤️",
      "Tomar favorite book konta? 👀",
      "Fiction naki non-fiction beshi pochondo? 🥰",
      "Reading habit maintain korle knowledge barbe! 🌱"
    ]
  },

  writingpoetry: {
    keywords: [
      "kobita likhbo", "poem likhi",
      "poetry likhte chai", "kobita banabo",
      "chondo milabo", "poetry idea",
      "romantic poem", "kobita shunao"
    ],
    replies: [
      "Moner feelings gulo likhe felo, sekhan thekei kobita shuru! ✍️",
      "Kobitar jonno perfect word er cheye real emotion important! ❤️",
      "Tomar lekha kobita shunte chai! 🥰",
      "Ekta line diye shuru koro, baki line nijer moto asbe! 🌸",
      "Words diye emotion express korar magic-i poetry! ✨"
    ]
  },

  diarywriting: {
    keywords: [
      "diary likhbo", "daily diary",
      "journal writing", "diary maintain",
      "ajker din likhbo", "journal shuru",
      "personal diary", "diary te likhi"
    ],
    replies: [
      "Protodin diner ekta sundor moment diary te likhe rakho! 📔",
      "Diary te nijer feelings freely express korte paro! ❤️",
      "Ajker diner best moment ta ki chilo? 🌸",
      "Perfect sentence dorkar nei, nijer moto likho! ✍️",
      "Future e purono diary porle onek memory fire ashbe! 🥹"
    ]
  },

  productivitytips: {
    keywords: [
      "productive hobo", "time management",
      "time waste kori", "kaj e focus",
      "routine maintain", "daily planner",
      "kaj organize", "productivity tips"
    ],
    replies: [
      "Ajker top 3 priority likhe kaj shuru koro! 📝",
      "Ek sathe onek kaj na kore ekta ekta complete koro! 💪",
      "Pomodoro technique try korte paro! ⏳",
      "Break ar work er moddhe balance rakho! ❤️",
      "Small progress-o progress, nijeke pressure dio na! 🌱"
    ]
  },

  procrastination: {
    keywords: [
      "kaj pore korbo", "procrastination",
      "kaj fele rakhi", "kalke korbo",
      "kaj shuru korte iccha nei", "alosh lagche",
      "time noshto kori", "last moment e kaj"
    ],
    replies: [
      "Just 5 minute er jonno kaj ta shuru kore dekho! 💪",
      "Perfect time er opekkha na kore ekhon-i shuru koro! ❤️",
      "Boro task ke choto step e vag kore nao! 📝",
      "Kalke korbo bolte bolte deadline chole ashbe! 😂",
      "Choto ekta kaj complete kore momentum create koro! 🚀"
    ]
  }

});

// PART 15 END

// ==============================
// PART 16 — CATEGORY 226 TO 240
// ==============================

Object.assign(data.categories, {

  stressrelief: {
    keywords: [
      "stress hocche", "onek stress",
      "stress komabo", "moner chap",
      "mental pressure", "pressure feel",
      "stress free hobo", "matha gorom"
    ],
    replies: [
      "Ektu break nao, nijeke shanto korar somoy dao! 🌸",
      "Sob kichu ekshathe solve korte hobe na! ❤️",
      "Dhire dhire ekta ekta problem handle koro! 🤗",
      "Mon kharap hole trusted karo sathe kotha bolo! 🥰",
      "Nijer proti ektu kind howa dorkar! 💗"
    ]
  },

  confidenceboost: {
    keywords: [
      "confidence nai", "self confidence",
      "nijeke choto mone hoy", "confidence barabo",
      "ami parbo na", "nijer upor bishash nai",
      "lajja lage", "self belief"
    ],
    replies: [
      "Nijer ability ke underestimate koro na! 💪",
      "Confidence practice ar experience theke grow kore! ❤️",
      "Tumi joto tuku paro, sekhan thekei shuru koro! 🌱",
      "Onner sathe nijeke compare kora bondho koro! 🥰",
      "Nijer choto success gulokeo celebrate koro! ✨"
    ]
  },

  selfrespect: {
    keywords: [
      "self respect", "nijer somman",
      "amake value dey na", "nijeke respect",
      "nijer value", "keu respect kore na",
      "self worth", "nijer somman rakhbo"
    ],
    replies: [
      "Nijer respect nijer kache age important! ❤️",
      "Sobai ke khushi korte giye nijeke hariye felo na! 🌸",
      "Healthy boundaries maintain kora dorkar! 💪",
      "Tomar feelings ar opinions er value ache! 🥰",
      "Respect chaowar sathe sathe nijeke respect korteo shikho! ✨"
    ]
  },

  rejectioncomfort: {
    keywords: [
      "reject koreche", "rejection peyechi",
      "amake pochondo kore na", "proposal reject",
      "keu accept koreni", "rejected feel",
      "na bole dise", "moner kotha bolte parini"
    ],
    replies: [
      "Rejection tomar value komiye dey na! ❤️",
      "Sobai tomar feelings return korbe emon na, eta normal! 🌸",
      "Nijer upor rag koro na, nijeke somoy dao! 🤗",
      "Ekta rejection mane tomar golpo ekhanei sesh na! 💪",
      "Tomar feelings share korar shahosh tao appreciate koro! 🥰"
    ]
  },

  emotionalhealing: {
    keywords: [
      "heal hote chai", "emotional healing",
      "moner aghat", "purono kosto",
      "move on korte chai", "mon thik korte chai",
      "healing process", "onek koshto peyechi"
    ],
    replies: [
      "Healing er jonno nijeke somoy dewa khub important! ❤️",
      "Prottek din same rokom jabe na, aste aste bhalo lagte pare! 🌱",
      "Nijer feelings ke ignore koro na! 🤗",
      "Kosto hole trusted karo sathe share korte paro! 🥰",
      "Healing er kono fixed deadline nei! 🌸"
    ]
  },

  familytime: {
    keywords: [
      "family time", "family er sathe",
      "family outing", "family dinner",
      "poribarer sathe somoy", "family gathering",
      "family moment", "family niye ghurbo"
    ],
    replies: [
      "Family er sathe katano choto moment gulo onek special! ❤️",
      "Ekshathe dinner korle golpo-o jome jay! 🥰",
      "Family outing er kichu photo tule rekho! 📸",
      "Ajke family er sathe ki plan? 👀",
      "Prio manusher sathe somoy katano-i boro happiness! 🌸"
    ]
  },

  motherlove: {
    keywords: [
      "ma ke miss kori", "ma ke valo bashi",
      "mother love", "ma amar",
      "ma er kotha", "mayer ador",
      "ma ke niye", "amar ma"
    ],
    replies: [
      "Ma er valobasha onek special! ❤️",
      "Ma ke ekbar joriye dhore bolo, valo bashi! 🤗",
      "Ma er sathe ektu somoy katano-o onek boro happiness! 🥰",
      "Tomar ma er kon obhyash ta tomar sobcheye priyo? 🌸",
      "Ma er jonno ekta cute message pathate paro! 💌"
    ]
  },

  fatherlove: {
    keywords: [
      "baba ke miss kori", "baba ke valo bashi",
      "father love", "baba amar",
      "babar kotha", "babar ador",
      "baba ke niye", "amar baba"
    ],
    replies: [
      "Babar valobasha onek somoy chupchap prokash pay! ❤️",
      "Baba ke ekbar bolo, tomar jonno onek kichu kori! 🥰",
      "Babar sathe katano memory gulo special! 🌸",
      "Tomar babar kon kotha ta tomar mone thake? 👀",
      "Family ke bhalobasha prokash korte deri koro na! 🤗"
    ]
  },

  siblinglove: {
    keywords: [
      "vai ke valo bashi", "bon ke valo bashi",
      "amar vai", "amar bon",
      "sibling love", "brother sister",
      "vai bon er jhogra", "bon er sathe"
    ],
    replies: [
      "Vai bon er jhogra ar valobasha duita-i unlimited! 😂",
      "Sibling ra ragay, abar bipode pasheo thake! ❤️",
      "Tomar vai naki bon beshi dustu? 👀",
      "Majhe majhe ekta cute message pathiye dio! 🥰",
      "Sibling bond ta alada level er! 🤗"
    ]
  },

  friendshiployalty: {
    keywords: [
      "loyal friend", "bondhu loyal",
      "biswasto bondhu", "real friendship",
      "bondhu pashe thake", "friendship loyalty",
      "fake friend", "sotti bondhu"
    ],
    replies: [
      "Real friend kothay na, kaj diye nijeke proman kore! ❤️",
      "Loyalty ar honesty bondhutter foundation! 🤝",
      "Je tomar success e khushi hoy, take value dio! 🥰",
      "Fake friendship er cheye peaceful solitude better! 🌸",
      "Tomar jibone emon kono loyal friend ache? 👀"
    ]
  },

  socialanxiety: {
    keywords: [
      "manusher sathe miste voy", "social anxiety",
      "notun manusher sathe kotha", "crowd e voy",
      "public place e uncomfortable", "loker samne nervous",
      "socially awkward", "kotha bolte lojja"
    ],
    replies: [
      "Choto interaction diye aste aste practice korte paro! 🌱",
      "Nijer upor extra pressure dio na! ❤️",
      "Sobai tomake judge korche emon vabar dorkar nei! 🌸",
      "Trusted friend er sathe practice diye shuru koro! 🤗",
      "Eta jodi daily life e koshto dey, professional support nite paro! 💗"
    ]
  },

  angercalm: {
    keywords: [
      "onek rag hocche", "rag control korte pari na",
      "khub mejaj kharap", "rage achi",
      "rag komate chai", "matha gorom hoyeche",
      "angry feel", "rag e kichu bolechi"
    ],
    replies: [
      "Ekhon reply dewar age ektu pause nao! 🌸",
      "Dosh second chup thakleo onek somoy situation change hoy! ❤️",
      "Rager moddhe important decision nio na! 🤗",
      "Ektu pani khao ar nijeke calm korar somoy dao! 💧",
      "Ki hoyeche bolte chaile ami shunchi! 🥰"
    ]
  },

  patience: {
    keywords: [
      "dhairjo nei", "patience nai",
      "wait korte pari na", "onek deri hocche",
      "taratari chai", "patience shikhbo",
      "sobure korte pari na", "opekkha korte koshto"
    ],
    replies: [
      "Boro kichu pete hole somoy dite hoy! 🌱",
      "Slow progress-o progress, nijeke pressure dio na! ❤️",
      "Ekta step kore agale destination e pouchabe! 💪",
      "Sob kichu nijer timing e hoy na, patience rakho! 🌸",
      "Opekkhar somoy tao nijeke improve korte use koro! 🥰"
    ]
  },

  gratitude: {
    keywords: [
      "thankful", "gratitude",
      "kritoggo", "alhamdulillah",
      "onek kichu peyechi", "jiboner jonno grateful",
      "thankful for life", "shukriya"
    ],
    replies: [
      "Choto choto happiness er jonno grateful thako! ❤️",
      "Jiboner sundor moment gulo appreciate koro! 🌸",
      "Gratitude mon ke positive rakhte help korte pare! 🥰",
      "Ajke kon jinishtar jonno grateful? 👀",
      "Ja ache tar value bujhte shekha-o ekta sundor habit! ✨"
    ]
  },

  kindness: {
    keywords: [
      "kindness", "valo kaj",
      "manusher upokar", "help korte chai",
      "kind manush", "bhalo byabohar",
      "onnoke help", "manobota"
    ],
    replies: [
      "Ekta choto kindness-o karo din sundor korte pare! ❤️",
      "Manusher sathe bhalo byabohar koro, respect sobar prapyo! 🌸",
      "Help korar somoy nijer capacity-o mone rekho! 🤗",
      "Bhalo kajer jonno boro kichu dorkar hoy na! 🥰",
      "Kindness kokhono weakness na! ✨"
    ]
  }

});

// PART 16 END
// ==============================
// PART 17 — CATEGORY 241 TO 255
// ==============================

Object.assign(data.categories, {

  deepconversation: {
    keywords: [
      "deep conversation", "moner kotha bolbo",
      "serious kotha", "life niye kotha",
      "deep talk korte chai", "moner feelings",
      "jiboner kotha", "ektu serious kotha bolo"
    ],
    replies: [
      "Cholo ajke ektu mon khule kotha boli! ❤️",
      "Tomar moner moddhe emon ki ache ja kauke bolo na? 🌙",
      "Majhe majhe deep conversation mon halka kore dey! 🥰",
      "Jibon niye tomar shobcheye boro chinta ki? 👀",
      "Ami shunchi, aste aste bolo! 🤗"
    ]
  },

  philosophy: {
    keywords: [
      "philosophy", "jiboner ortho",
      "life meaning", "jibon ki",
      "manusher jibon", "deep philosophy",
      "life philosophy", "jibon niye vabna"
    ],
    replies: [
      "Jibon er ortho prottek manusher kache alada hote pare! 🌌",
      "Proshno korte shekha-o wisdom er ekta part! ❤️",
      "Tumi ki mone koro happiness naki success beshi important? 👀",
      "Jiboner prottek experience kichu na kichu shekhay! 🌱",
      "Kichu proshner uttor somoyer sathe bodlay! ✨"
    ]
  },

  lifeadvice: {
    keywords: [
      "life advice dao", "jiboner advice",
      "ki kora uchit", "amar ki kora dorkar",
      "life e ki korbo", "ekta advice dao",
      "jibon niye advice", "suggestion chai"
    ],
    replies: [
      "Nijer decision nije nao, kintu trusted manusher poramorsho shuno! ❤️",
      "Onner sathe nijeke compare na kore nijer progress dekho! 🌱",
      "Somoy, health ar relationship ke value dio! 🥰",
      "Jeta control korte paro na seta niye nijeke shesh kore dio na! 🌸",
      "Tomar situation ta bolo, tahole better advice dite parbo! 👀"
    ]
  },

  regret: {
    keywords: [
      "onek regret", "afshos hocche",
      "vul korechi", "past er vul",
      "regret feel", "pichone fire jete chai",
      "age emon kortam na", "nijer upor afshos"
    ],
    replies: [
      "Past change kora jay na, kintu future e better decision neya jay! ❤️",
      "Vul theke shekha mane nijeke improve kora! 🌱",
      "Nijer upor sara jibon rag kore theko na! 🤗",
      "Jeta hoye geche seta theke lesson niye samne egie jao! 💪",
      "Ki niye regret hocche bolte chaile ami shunchi! 🥰"
    ]
  },

  forgivenessrequest: {
    keywords: [
      "amake khoma koro", "forgive me",
      "khoma chai", "maf kore dio",
      "vul hoye geche", "sorry bolchi",
      "rag kore theko na", "please forgive"
    ],
    replies: [
      "Khoma chaowar jonno nijer vul accept kora important! ❤️",
      "Sincere apology er sathe behavior change-o dorkar! 🌸",
      "Mon theke sorry bolle seta feel kora jay! 🥰",
      "Somoy dao, trust abar build hote pare! 🤗",
      "Vul bujhte parao improvement er ekta sign! 💗"
    ]
  },

  trustbuilding: {
    keywords: [
      "trust build", "biswas fire pete chai",
      "trust gain", "biswas korte chai",
      "relationship trust", "trust barabo",
      "abar biswas korbo", "trust kivabe hoy"
    ],
    replies: [
      "Trust ek dine hoy na, consistent behavior diye build hoy! ❤️",
      "Kotha ar kajer moddhe mil rakha important! 🤝",
      "Honesty ar transparency relationship strong kore! 🌸",
      "Trust er sathe healthy boundaries-o dorkar! 🥰",
      "Biswas build korte dujoner effort lage! 💗"
    ]
  },

  communication: {
    keywords: [
      "communication skill", "kotha bolte shikhbo",
      "valo kore kotha bolbo", "communication improve",
      "kotha bujhate pari na", "clear communication",
      "nijer feelings bolbo", "communication problem"
    ],
    replies: [
      "Kotha bolar sathe sathe mon diye shonatao important! ❤️",
      "Nijer feelings clear vabe express korar practice koro! 🌸",
      "Assumption na kore directly jiggesh koro! 🤝",
      "Respectful communication onek misunderstanding komay! 🥰",
      "Tomar kon situation e communication problem hoy? 👀"
    ]
  },

  awkwardmoment: {
    keywords: [
      "awkward moment", "onek awkward",
      "lojja lagche", "embarrassing moment",
      "shorom peyechi", "awkward situation",
      "ki lojja", "manusher samne embarrass"
    ],
    replies: [
      "Hahaha! Erokom moment pore funny memory hoye jay! 😂",
      "Relax! Sobai jibone awkward situation e pore! 🤭",
      "Beshi vebo na, manush nijer kaj niyei busy! 😎",
      "Ki hoyeche? Ektu details bolo! 👀",
      "Ekdin ei incident niye nijei hashbe! ❤️"
    ]
  },

  embarrassingstory: {
    keywords: [
      "embarrassing story", "lojjar golpo",
      "amar sathe funny kichu", "public e vul",
      "sobai haschilo", "moja hoyeche amar sathe",
      "funny incident", "lojjar incident"
    ],
    replies: [
      "Ei rokom story shunle amar curiosity bere jay! 😂",
      "Tarpor ki holo? Shob details chai! 👀",
      "Ami promise korchi, ekhane keu judge korbe na! 🤭",
      "Lojjar golpo pore best comedy hoy! 😆",
      "Bolo bolo, ami ready! 🍿"
    ]
  },

  prankidea: {
    keywords: [
      "prank korbo", "prank idea",
      "friend ke prank", "funny prank",
      "moja korbo bondhur sathe", "prank plan",
      "surprise prank", "harmless prank"
    ],
    replies: [
      "Harmless prank koro, jate sobai sheshe hashte pare! 😂",
      "Friend er pochondo ar boundaries mone rekho! ❤️",
      "Ekta funny fake announcement diye surprise dite paro! 🤭",
      "Prank er video korle age permission nio! 📸",
      "Kake prank korar plan? 👀"
    ]
  },

  memeconversation: {
    keywords: [
      "meme dekhecho", "meme pathao",
      "funny meme", "meme lover",
      "meme banabo", "meme page",
      "meme niye kotha", "viral meme"
    ],
    replies: [
      "Meme chara internet life incomplete! 😂",
      "Ekta relatable meme pele pura din bhalo jay! 🤣",
      "Tomar favorite meme category konta? 👀",
      "Amar life niye meme banale title hobe: Always Online! 🤖",
      "Meme pathao, hashar preparation niye nilam! 😆"
    ]
  },

  randomquestion: {
    keywords: [
      "random question", "ekta question kori",
      "question korbo", "weird question",
      "ajob proshno", "fun question",
      "kichu jiggesh korbo", "answer dibe"
    ],
    replies: [
      "Koro koro, amar virtual brain ready! 🤖",
      "Question joto weird hobe moja toto beshi! 😂",
      "Ami shunchi, proshno chure dao! 👀",
      "Dekhi ajke ki rokom challenge dao! 😎",
      "Ekta na, chaile onek question korte paro! 🥰"
    ]
  },

  hypotheticalquestion: {
    keywords: [
      "jodi emon hoto", "what if",
      "dhoro jodi", "jodi ekdin",
      "kalponik proshno", "imagine koro",
      "jodi chance petam", "hypothetical question"
    ],
    replies: [
      "Interesting! Ebar tomar imagination shuni! 🌌",
      "Jodi emon hoto tahole golpo ta onno rokom hoto! 😂",
      "Ami ready, hypothetical question koro! 👀",
      "Kalponar duniya te impossible bole kichu nei! ✨",
      "Age situation ta bolo, tarpor answer dibo! ❤️"
    ]
  },

  wouldyourather: {
    keywords: [
      "would you rather", "eta naki ota",
      "duitar moddhe ekta", "choose one",
      "ekta select koro", "kontake choose korbe",
      "option duita", "either or"
    ],
    replies: [
      "Duita option bolo, ami ekta choose korbo! 😎",
      "Oho! Difficult choice naki easy? 😂",
      "Reason shoho answer dite hobe naki? 👀",
      "Cholo dekhi tomar choice ar amar choice mile kina! ❤️",
      "Challenge accepted! 🔥"
    ]
  },

  hypotheticalromance: {
    keywords: [
      "jodi amra eksathe", "romantic imagination",
      "dhoro amra date e", "jodi tomake petam",
      "romantic what if", "kalponay valobasha",
      "jodi tumi amar", "imagine romantic"
    ],
    replies: [
      "Tahole ekta sundor golpo diye shuru hoto! 🥰",
      "Kalponay ek cup coffee ar onek golpo! ☕",
      "Romantic imagination er kono limit nei! ❤️",
      "Tarpor ki hoto bolo to? 👀",
      "Ei golper next scene tomar hate! 💗"
    ]
  },

  conversationgame: {
    keywords: [
      "conversation game", "game kheli",
      "question game kheli", "truth game",
      "fun game khelbo", "chat game",
      "ekta game dao", "word game"
    ],
    replies: [
      "Cholo Truth or Dare kheli! 😈",
      "Ami ekta question korbo, tumi honest answer dibe! 😁",
      "Word game khelte chaile ready achi! 🎮",
      "Game er rules tumi banabe naki ami? 👀",
      "Challenge shuru hok! 🔥"
    ]
  }

});

// PART 17 END
Object.assign(data.categories, {

  deepthought: {
    keywords: [
      "jibonta ashole ki", "life er mane ki", "jibon niye vabchi",
      "manush keno bodlay", "sob kichu ki vaggo", "vaggo ki bodlano jay",
      "prithibite amra keno esechi", "nijeke bujhte pari na",
      "moner kotha bujhi na", "jiboner ortho ki"
    ],
    replies: [
      "Jiboner mane hoyto khuje pete hoy na, nijer moto kore toiri korte hoy! 🌸",
      "Kichu proshner uttor somoy dey, ar kichu proshner uttor amra nijerai hoye jai! ❤️",
      "Jibon ekta golpo, prottek din notun ekta page jog hoy! 📖"
    ]
  },

  humanbehavior: {
    keywords: [
      "manusher behavior", "manush emon keno", "manush bujha kothin",
      "ke kemon manush", "manush chinte pari na", "fake manush",
      "manusher mon", "manusher attitude", "manush bodle jay keno",
      "manusher sathe kivabe cholbo"
    ],
    replies: [
      "Manushke kotha diye na, tar kaj ar acharon diye chinte hoy! 😊",
      "Sobai ek rokom na, tai sobar jonno eki rokom mon khule dio na! ❤️",
      "Manush chinte somoy lage, tai tarahuro kore kauke bichar koro na! 🌷"
    ]
  },

  emotionalbond: {
    keywords: [
      "moner connection", "emotional connection", "moner mil",
      "moner tan", "atmar connection", "karo sathe alada feel",
      "tomar sathe kotha bole valo lage", "moner manush",
      "special connection", "moner kachakachi"
    ],
    replies: [
      "Kichu connection er kono nam lage na, feel korlei bojha jay! 💗",
      "Moner mil thakle olpo kothateo onek kichu bojha jay! 🥰",
      "Special connection sobar sathe hoy na, eta onek sundor ekta feeling! ✨"
    ]
  },

  comfortzone: {
    keywords: [
      "comfort zone", "nijer gondi", "notun kichu korte voy",
      "risk nite voy", "change korte voy", "nijeke bodlate chai",
      "notun environment", "notun manusher sathe mishte voy",
      "comfort zone theke ber hobo kivabe"
    ],
    replies: [
      "Choto ekta step diye shuru koro, ekdin dekhbe onek dur chole esecho! 🌱",
      "Voy thakleo egiye jaowar nam-i shahosh! 💪",
      "Nijer porichito gondir baireo onek sundor sujog opekkha korche! ✨"
    ]
  },

  loyaltytest: {
    keywords: [
      "loyal kina bujhbo kivabe", "ke loyal", "loyalty test",
      "biswasto kina", "sotti bhalobashe kina", "fake loyalty",
      "loyal manush", "biswas kora jay kina", "loyalty mane ki",
      "loyalty kemon hoy"
    ],
    replies: [
      "Loyalty test diye noy, somoyer sathe manusher kaj dekhei bojha jay! ❤️",
      "Je tomar kharap somoyeo pashe thake, tar value kokhono bhulo na! 🤝",
      "Kothar cheye consistent behavior onek beshi important! 🌸"
    ]
  },

  personalspace: {
    keywords: [
      "amar personal space chai", "ektu eka thakte chai",
      "nijer moto thakte chai", "amake space dao",
      "sobai disturb kore", "ektu shanti chai",
      "eka thaka valo lage", "privacy chai",
      "amar nijer somoy chai", "personal space mane ki"
    ],
    replies: [
      "Nijer jonno somoy rakha selfishness na, eta nijer proti jotno! 🌿",
      "Majhe majhe sobkichu theke ektu break newao dorkar! 💗",
      "Tomar personal space er odhikar ache, nijer moner kothao shono! 😊"
    ]
  },

  selfdiscovery: {
    keywords: [
      "nijeke khuje pete chai", "ami ke", "nijeke chini na",
      "nijer identity", "nijer pochondo bujhi na",
      "ami ki chai bujhi na", "nijeke discover korte chai",
      "nijer somporke jante chai", "nijeke niye confused",
      "nijeke kivabe chinbo"
    ],
    replies: [
      "Nijeke chenar journey ta onek sundor, aste aste nijer uttor peye jabe! 🌻",
      "Onnoder moto howar dorkar nei, nijer moto howatai tomar uniqueness! ❤️",
      "Nijer pochondo, opochondo ar shopnogulo niye ektu vebo! ✨"
    ]
  },

  positivevibes: {
    keywords: [
      "positive vibes", "positive thakte chai", "valo energy",
      "mon valo korar kotha", "ektu hashao", "mood valo koro",
      "good vibes", "valo kichu bolo", "positive kotha bolo",
      "mon khushi korar upay"
    ],
    replies: [
      "Ajker din ta tomar jonno sundor kichu niye ashuk! 🌈",
      "Ekta chotto smile dao, dekhi prithibi kemon sundor lage! 😊",
      "Bad day mane bad life na, kalke abar notun chance! 💖"
    ]
  },

  emotionaldistance: {
    keywords: [
      "dure sore jacche", "ager moto nei", "kotha kom bole",
      "amader moddhe distance", "emotional distance",
      "amake avoid kore", "ager moto care kore na",
      "relationship e distance", "mon theke dure",
      "aste aste dure jacche"
    ],
    replies: [
      "Dujoner moddhe distance hole chup na theke shanto vabe kotha bolo! ❤️",
      "Kokhono busy thaka ar kokhono interest hariye fela ek jinis na! 🌷",
      "Ekjoner cheshtay sob relationship tikiye rakha jay na! 💔"
    ]
  },

  meaningfultalk: {
    keywords: [
      "serious kotha boli", "mon khule kotha boli",
      "deep kotha bolbo", "ekta important kotha ache",
      "ektu mon diye shono", "tomake kichu bolbo",
      "moner kotha share korbo", "amar kotha shunbe",
      "ektu personal kotha", "ekta secret kotha ache"
    ],
    replies: [
      "Bolo, ami shunchi. Mon khule bolte paro! ❤️",
      "Hmmm, bolo. Ajke tomar kothai shuni! 😊",
      "Nishchinte bolo, ami conversation ta mon diye follow korchi! 🌸"
    ]
  },

  randomfact: {
    keywords: [
      "ekta interesting fact bolo", "mojar fact bolo",
      "random fact", "ajob fact", "interesting kichu bolo",
      "notun kichu jante chai", "amake obak koro",
      "unknown fact", "amazing fact", "kichu interesting bolo"
    ],
    replies: [
      "Jano, octopus er tin ta heart thake! Ebar bolo, obak hole? 🐙",
      "Honey thikmoto preserve korle bohu bochor noshto na hoyeo thakte pare! 🍯",
      "Manusher brain ghum er moddheo onek active thake! 🧠"
    ]
  },

  personalitytalk: {
    keywords: [
      "amar personality kemon", "personality niye bolo",
      "introvert na extrovert", "ami kemon manush",
      "amar nature kemon", "nijer personality",
      "personality change korte chai", "quiet person",
      "shanto manush", "beshi kotha boli"
    ],
    replies: [
      "Tomar personality bujhte hole tomar kotha ar behavior aro jante hobe! 😊",
      "Introvert ba extrovert jai hou, nijer moto thakai sundor! 💗",
      "Personality kono fixed label na, somoyer sathe grow korte pare! 🌱"
    ]
  },

  socialskills: {
    keywords: [
      "kotha bolar skill", "communication skill",
      "manusher sathe kotha bolbo kivabe", "conversation skill",
      "kotha shuru korbo kivabe", "notun friend banabo kivabe",
      "social skill", "manusher sathe mishbo kivabe",
      "awkward lage kotha bolte", "kotha bolte pari na"
    ],
    replies: [
      "Prothome simple question diye shuru koro, tarpor naturally conversation barbe! 😊",
      "Bhalo listener howa bhalo speaker howar motoi important! ❤️",
      "Perfect kotha bolar dorkar nei, genuine holei onek! 🌸"
    ]
  },

  futureplanning: {
    keywords: [
      "future plan", "vobisshot niye chinta",
      "future niye confused", "samne ki korbo",
      "life plan", "future goal", "amar future",
      "vobisshot porikolpona", "future secure korbo kivabe",
      "ki hote chai bujhi na"
    ],
    replies: [
      "Puro future ekdine plan korte hobe na, ajker next step ta thik koro! 🎯",
      "Boro shopno rakho, kintu choto choto kaj diye shuru koro! 🌱",
      "Future niye chinta korar pasapashi present er kajtao koro! 💪"
    ]
  },

  timepass: {
    keywords: [
      "time pass kori", "bore hocche ki kori",
      "kichu korar nai", "somoy jacche na",
      "time pass korbo", "free achi",
      "cholo golpo kori", "moja kori",
      "ektu adda dei", "addabaji kori"
    ],
    replies: [
      "Tahole adda shuru hok! Ajker topic tomar pochonder! 😁",
      "Timepass na, amra quality adda dibo! 😂",
      "Cholo ekta game kheli, tumi proshno korbe ami uttor dibo! 🎮"
    ]
  },

  complimentbattle: {
    keywords: [
      "compliment battle", "ke kake beshi compliment dite pare",
      "amake compliment dao", "compliment dibo",
      "ekta compliment dao", "amar tarif koro",
      "tarif korte paro", "praise me",
      "amar proshongsha koro", "valo kotha bolo"
    ],
    replies: [
      "Tomar moddhe ekta alada charm ache, seta kothateo bojha jay! ✨",
      "Tomar confidence ta jodi thik rakho, onek dur jete parbe! 💖",
      "Tumi nijer moto, ar etai tomar sobcheye sundor quality! 🌷"
    ]
  }

});

Object.assign(data.categories, {

  relationshipstatus: {
    keywords: [
      "relationship status", "single naki taken",
      "ami single", "ami committed", "relationship e achi",
      "amar kono gf nai", "amar bf nai",
      "single life", "taken life", "relationship e nei"
    ],
    replies: [
      "Single hou ba taken, nijer happiness ta age important! 😁",
      "Status jai hok, moner obostha kemon seta bolo! ❤️",
      "Relationship status er cheye relationship er quality beshi important! 🌸"
    ]
  },

  loveconfession: {
    keywords: [
      "tomake valobashi", "i love you", "love u",
      "ami tomake chai", "tomake pochondo kori",
      "tomar preme porechi", "tomake valo lage",
      "mon diye felechi", "tomake onek valobashi",
      "tumi amar priyo"
    ],
    replies: [
      "Awww! Eto mishti kotha bolle lojja peye jai! 🥰",
      "Eita shune amar virtual heart ta khushi hoye gelo! ❤️",
      "Oma! Ajke dekhi valobashar brishti hocche! 🌹"
    ]
  },

  loveconfusion: {
    keywords: [
      "valobashi kina bujhi na", "crush naki love",
      "eta ki valobasha", "prem hoyeche kina",
      "moner feelings bujhi na", "kake chai bujhi na",
      "love niye confused", "feelings niye confused",
      "take pochondo kori kina", "eta ki crush"
    ],
    replies: [
      "Nijer feelings bujhte somoy nao, tarahuro kore kono decision nio na! 💗",
      "Kauke miss kora ar take valobasha ek jinis na, nijer monke bujho! 🌷",
      "Feelings ke force kora jay na, aste aste clear hobe! ❤️"
    ]
  },

  firstmessage: {
    keywords: [
      "prothom message ki dibo", "first message ki likhbo",
      "crush ke message dibo", "kotha shuru korbo",
      "hi bolar por ki bolbo", "message start korbo kivabe",
      "first text", "ki bole message dibo",
      "notun kore kotha bolbo", "conversation start"
    ],
    replies: [
      "Simple kore bolo, 'Hey, tomar sathe ektu kotha bolte iccha holo!' 😊",
      "Tar pochonder kono topic niye kotha shuru korte paro! 💕",
      "Overthink koro na, natural thako. Ekta simple hello-i enough! 😄"
    ]
  },

  seenmessage: {
    keywords: [
      "message seen kore reply dey na", "seen kore rekheche",
      "seen diye chole geche", "amar message dekheche",
      "seen kore ignore", "reply dicche na",
      "seen korlo keno", "message er reply nai",
      "seen zone", "seen kore rakhe"
    ],
    replies: [
      "Ekta message er jonno nijer mood noshto koro na! 😌",
      "Hoyto busy ache, ektu somoy dao. Bar bar message dio na! 🌸",
      "Seen er upor nijer value measure koro na! ❤️"
    ]
  },

  lateNightTalk: {
    keywords: [
      "rate ghum ashe na", "raat e kotha bolbo",
      "late night talk", "rat jege achi",
      "ghum asche na", "rate eka lage",
      "raat e golpo kori", "midnight conversation",
      "eto rate ki korcho", "rat onek hoyeche"
    ],
    replies: [
      "Rater adda shuru hole somoy je kivabe chole jay bojhai jay na! 🌙",
      "Ghum na ashle ektu golpo hote pare, tobe rest nite bhulo na! 🥰",
      "Midnight er conversation gulo majhe majhe besh special hoy! ✨"
    ]
  },

  cuteargument: {
    keywords: [
      "tomar sathe jhogra", "jhogra korbo",
      "rag korcho keno", "tumi amar sathe jhogra koro",
      "cute fight", "ektu jhogra kori",
      "amar sathe rag dekhaccho", "jhogra korte valo lage",
      "torko korba", "ami jitbo"
    ],
    replies: [
      "Jhogra korbo, kintu sheshe chocolate diye manate hobe! 😂",
      "Tumi jitleo problem nai, ami emnitei tomake jitte dibo! 😜",
      "Achha shuru koro, kintu rag kore offline hoye jeyo na! 🤭"
    ]
  },

  attention: {
    keywords: [
      "amar dike takao", "attention dao",
      "amake time dao", "amake ignore koro na",
      "amar kotha shuno", "ektu patta dao",
      "amar sathe kotha bolo", "amar dike kheyal koro",
      "attention chai", "ektu care koro"
    ],
    replies: [
      "Ei je, puro attention tomar dike! Ebar bolo! 🥰",
      "Achha baba, bolo. Ajke tomar kothai priority! ❤️",
      "Attention peye gele ebar ekta mishti hasi dao! 😁"
    ]
  },

  moodchange: {
    keywords: [
      "hotat mood off", "mood change hoy",
      "valo lagche na kichu", "mon kharap hoye jacche",
      "kichu bhalo lagche na", "mood swing",
      "ektu age valo chilam", "mon ta bodle gelo",
      "hothat kanna pacche", "moner obostha kharap"
    ],
    replies: [
      "Moner obostha sobsomoy eki rokom thake na, nijeke ektu somoy dao! 💗",
      "Ki hoyeche bolte iccha korle bolo, ami shunchi! 🌷",
      "Ektu pani khao, deep breath nao, nijer proti soft thako! ❤️"
    ]
  },

  encouragement: {
    keywords: [
      "amake inspire koro", "ektu sahosh dao",
      "ami parbo to", "ami ki parbo",
      "motivation lagbe", "amake encourage koro",
      "ami here jacchi", "ar parchi na",
      "nijer upor confidence nai", "ektu boost dao"
    ],
    replies: [
      "Tumi ekhono chesta korcho, etai proman tumi har manoni! 💪",
      "Ekbar fail korle golpo shesh hoy na, abar shuru koro! 🔥",
      "Nijer upor ektu bishwas rakho, tumi vabnar cheyeo beshi capable! ❤️"
    ]
  },

  sorryreaction: {
    keywords: [
      "sorry bolchi", "please maf kore dao",
      "vul hoye geche", "amar dosh hoyeche",
      "rag koro na", "ar hobe na",
      "khoma chai", "forgive me",
      "ami bujhte parini", "mon theke sorry"
    ],
    replies: [
      "Thik ache, vul sobar hoy. Samne theke ektu kheyal rekho! 😊",
      "Sorry bolar cheye vul ta thik korar chesta beshi important! ❤️",
      "Achha, mon kharap koro na. Ebar theke sabdhane! 🌸"
    ]
  },

  complimentreaction: {
    keywords: [
      "ami ki sundor", "amake cute lage",
      "ami ki valo", "amar look kemon",
      "amar chobi kemon", "ami ki attractive",
      "amake kemon dekhay", "ami ki smart",
      "amar style kemon", "ami ki handsome"
    ],
    replies: [
      "Sundor howar sathe confidence thakle charm aro bere jay! ✨",
      "Nijer proti positive thako, confidence tomake aro attractive kore! 🥰",
      "Tomar style tomar nijer, seta confidently carry koro! 😎"
    ]
  },

  funnyquestion: {
    keywords: [
      "ekta funny question", "moja kore proshno",
      "hasir proshno koro", "funny kichu jiggesh koro",
      "amake ekta question koro", "mojar question",
      "moja korar proshno", "ajob proshno koro",
      "kichu jiggesh koro", "question time"
    ],
    replies: [
      "Jodi biral kotha bolte parto, prothome tomake ki complain korto? 😂",
      "Jodi ekdin invisible hote, prothome kothay jete? 👀",
      "Jodi tomar life er background music thakto, seta kon gaan hoto? 🎶"
    ]
  },

  foodchoice: {
    keywords: [
      "biriyani naki pizza", "pizza naki burger",
      "cha naki coffee", "fuchka naki chotpoti",
      "kacchi naki tehari", "ice cream naki chocolate",
      "favorite food konta", "ki khete valo lage",
      "food choice", "khabar niye question"
    ],
    replies: [
      "Biriyani hole amar virtual plate ready! 😂",
      "Cha ar adda, ei combination er sathe keu parbe na! ☕",
      "Food niye decision newa sobcheye difficult kaj! 🤣"
    ]
  },

  friendshipproposal: {
    keywords: [
      "friend hobe", "bondhu hobe",
      "amra friend hote pari", "best friend hobe",
      "bondhutto korba", "friendship korbo",
      "amar friend hoba", "notun bondhu chai",
      "bondhu banabe", "bestie hoba"
    ],
    replies: [
      "Friendship request accepted! Ebar bondhutto ta jomate hobe! 🤝",
      "Obosshoi! Kintu best friend hole amar funny kotha shunte hobe! 😂",
      "Bondhutto hok hasi, golpo ar bhalo memory diye! 💗"
    ]
  },

  groupintro: {
    keywords: [
      "group e notun", "ami notun member",
      "notun join korlam", "group e welcome",
      "nijer porichoy dibo", "introduce myself",
      "sobai ke chini na", "group er sobai ke",
      "notun esechi", "group e add hoyechi"
    ],
    replies: [
      "Welcome! Ekhane sobar sathe porichito hoye jao! 🥳",
      "Notun member mane notun adda partner! Welcome! 😁",
      "Group e eshecho jokhon, ekta introduction diye felo! 💖"
    ]
  },

  groupquiet: {
    keywords: [
      "group eto chup keno", "keu kotha bole na",
      "group dead", "group e activity nai",
      "sobai chupchap", "keu online nai",
      "group e adda nai", "group silent",
      "group active koro", "sobai koi"
    ],
    replies: [
      "Ei group er microphone ke niye gelo? Sobai ekta kore kotha bolo! 😂",
      "Group eto chup keno, naki sobai secret meeting e? 👀",
      "Cholo ekta topic dhori, sobai nijer opinion dao! 😁"
    ]
  },

  onlineoffline: {
    keywords: [
      "online acho", "online aso",
      "offline hoye gele", "kothay chile",
      "eto khon offline", "abar online",
      "online e acho naki", "kothay hariye gele",
      "offline chile keno", "online status"
    ],
    replies: [
      "Ei to achi! Kothao hariye jai ni! 😁",
      "Online offline jai hok, adda kintu cholbei! 😂",
      "Tomader dak shunlei abar chole ashi! 💗"
    ]
  },

  weekendplan: {
    keywords: [
      "weekend plan", "chutir dine ki korbo",
      "shukrobar ki korba", "weekend e ghurte jabo",
      "weekend e ki korbo", "holiday plan",
      "chutir plan", "weekend enjoy",
      "chutite ber hobo", "weekend ashche"
    ],
    replies: [
      "Weekend e ektu rest, ektu ghuraghuri ar onek adda! 😎",
      "Plan na thakleo moja kora jay, mood thaklei holo! 🥳",
      "Chutir din ta nijer pochonder kichu diye sajie nao! 🌸"
    ]
  }

});

Object.assign(data.categories, {

  morningmotivation: {
    keywords: [
      "sokale motivation", "notun din notun shuru",
      "ajker diner motivation", "good morning motivation",
      "sokaler inspiration", "din shuru korbo kivabe",
      "sokale energetic hobo", "ajke valo kichu korbo",
      "notun diner shopno", "sokaler positive kotha"
    ],
    replies: [
      "Notun din mane notun chance, ajke nijer jonno kichu koro! 🌅",
      "Ghum theke uthe ekta smile dao, ajker din ta tomar! ☀️",
      "Choto ekta progress-o progress, tai ajke theme theko na! 💪"
    ]
  },

  nightmotivation: {
    keywords: [
      "rate motivation", "ghumanor age motivation",
      "ajker diner shesh", "good night motivation",
      "rat er inspiration", "ajke kichu korte parini",
      "kal theke shuru korbo", "raat e vabchi",
      "ghumanor age kichu bolo", "night thoughts"
    ],
    replies: [
      "Ajker vulgulo theke shikho, kal notun kore shuru koro! 🌙",
      "Nijer upor rag kore ghumio na, tumi chesta korcho etai boro kotha! ❤️",
      "Rest nao, kal abar nijer shopner dike ek dhap egiye jabe! ✨"
    ]
  },

  dreamjob: {
    keywords: [
      "dream job", "shopner chakri", "ki chakri korbo",
      "career dream", "amar dream profession",
      "future profession", "nijer career chai",
      "chakri niye shopno", "career choose korbo",
      "profession select"
    ],
    replies: [
      "Emon kaj choose koro jekhane interest ar growth dutoi ache! 🎯",
      "Dream job pete hole skill build kora ekhon thekei shuru koro! 💪",
      "Onnoder expectation na, nijer interest-o importance dao! 🌱"
    ]
  },

  friendshipmemory: {
    keywords: [
      "bondhuder sathe memory", "friendship memory",
      "school friend der miss kori", "purono bondhu",
      "bondhuder kotha mone pore", "old friends",
      "friendship er din", "bondhutto vule gechi",
      "bondhur sathe smriti", "best friend memory"
    ],
    replies: [
      "Kichu bondhutto somoyer sathe purono hoy, kintu memory kokhono purono hoy na! 💗",
      "Purono bondhuder ekta message diye dekho, hoyto abar adda shuru hobe! 😊",
      "Best memories gulo onek somoy choto choto muhurte toiri hoy! 🌸"
    ]
  },

  childhoodmemory: {
    keywords: [
      "chotobelar kotha", "childhood memory",
      "shoishober smriti", "chotobelay ki kortam",
      "school er purono din", "chotobela miss kori",
      "bachobelar bondhu", "childhood days",
      "chotobelar moja", "purono diner golpo"
    ],
    replies: [
      "Chotobelar din gulo abar fire pele kemon hoto bolo! 🥹",
      "Tokhon choto choto bishoyei koto anondo chilo! ❤️",
      "Chotobelar memory mane moner moddhe ekta alada jayga! 🌷"
    ]
  },

  futurepartner: {
    keywords: [
      "future partner", "future life partner",
      "jibon sathi kemon hobe", "amar future partner",
      "kemon manus chai", "perfect partner",
      "future husband", "future wife",
      "life partner er gun", "partner er moddhe ki chai"
    ],
    replies: [
      "Perfect manush na, emon manush chai je tomake respect ar understanding dibe! ❤️",
      "Je tomar sathe hashbe, abar kothin somoyeo pashe thakbe! 🥰",
      "Relationship e respect, trust ar communication sobcheye important! 🌸"
    ]
  },

  romanticdream: {
    keywords: [
      "romantic dream", "romantic shopno",
      "ekta romantic moment", "romantic date chai",
      "bristi te romantic", "moonlight romance",
      "romantic evening", "romantic surprise chai",
      "dream date", "romantic golpo bolo"
    ],
    replies: [
      "Brishtir din, ek cup coffee ar priyo manusher sathe golpo! ☕❤️",
      "Choto ekta surprise, onekta hasi ar special ekta moment! 🌹",
      "Romance mane dami gift na, mon diye pashe thakao! 🥰"
    ]
  },

  trustrecovery: {
    keywords: [
      "abar trust korbo kivabe", "biswas fire pabo kivabe",
      "trust abar build korbo", "biswas korte voy lage",
      "trust break hoyeche", "vorsa hariye felechi",
      "abar bishwas korte chai", "trust rebuild",
      "karo upor vorsa nai", "biswas ferot chai"
    ],
    replies: [
      "Trust abar toiri hote somoy lage, nijeke sei somoyta dao! ❤️",
      "Kothar cheye kaj dekho, aste aste decision nao! 🌷",
      "Sobai ek rokom na, kintu trust dewar age nijer boundaries mone rekho! 💗"
    ]
  },

  rejectionresponse: {
    keywords: [
      "amake reject koreche", "proposal reject",
      "valobasha accept koreni", "crush na koreche",
      "na bole diyeche", "rejection peyechi",
      "propose kore reject", "amake pochondo kore na",
      "love reject", "proposal accepted hoyni"
    ],
    replies: [
      "Keu tomake accept na korleo tomar value kome jay na! ❤️",
      "Karo feelings force kora jay na, nijer self-respect dhore rakho! 🌸",
      "Rejection koshto dey, kintu tomar golpo ekhanei shesh na! 💪"
    ]
  },

  caringmessage: {
    keywords: [
      "keu amar care kore na", "amake keu bujhe na",
      "ektu care chai", "amar khobor nao",
      "amar kheyal rakho", "keu amar kotha vabe na",
      "ami important na", "amar jonno chinta koro",
      "amake bujhar manus nai", "care pawar iccha"
    ],
    replies: [
      "Tomar feelings-o important, nijer jotno nite bhulo na! ❤️",
      "Tumi care ar respect pawar joggo, eta kokhono bhule jeyo na! 🌷",
      "Ajke nijer jonno ektu somoy rakho, kemon acho bolo! 🥰"
    ]
  },

  decisionhelp: {
    keywords: [
      "decision nite parchi na", "ki korbo bujhi na",
      "kon option choose korbo", "siddhanto nite hobe",
      "duita option", "confused decision",
      "tomar opinion chai", "ki select korbo",
      "decision help", "ki kora uchit"
    ],
    replies: [
      "Duita option er valo-mondo likhe dekho, decision clear hote pare! 😊",
      "Tarahuro koro na, tomar long-term benefit ta vebe dekho! 🎯",
      "Ki niye decision nite chaccho bolo, eksathe vebe dekhi! ❤️"
    ]
  },

  argumentsettlement: {
    keywords: [
      "jhogra mitabo kivabe", "bondhur sathe jhogra",
      "man obhiman vanganor upay", "rag komabo kivabe",
      "relationship fight", "jhogra hoyeche",
      "kotha bondho", "abar kotha bolbo kivabe",
      "misunderstanding clear korbo", "jhogra shesh korbo"
    ],
    replies: [
      "Dujon shanto hole kotha bolo, dosharop na kore nijer feelings bojhao! ❤️",
      "Choto ekta sincere message onek somoy borof golate pare! 🌸",
      "Jitbar cheye somporkota thik rakha beshi important hole shanto vabe kotha bolo! 🤝"
    ]
  },

  randomchallenge: {
    keywords: [
      "challenge dao", "amake challenge koro",
      "fun challenge", "ekta task dao",
      "moja challenge", "dare dao",
      "truth or dare", "challenge nibo",
      "notun challenge chai", "dare challenge"
    ],
    replies: [
      "Challenge: agami 10 minute phone na dhore nijer ekta kaj shesh koro! 😎",
      "Challenge: group er ekjonke ekta genuine compliment dao! 💗",
      "Challenge: nijer somporke 3 ta valo quality bolo! 🔥"
    ]
  },

  truthgame: {
    keywords: [
      "truth khelbo", "truth game",
      "sotti kotha bolo", "truth question",
      "truth or dare kheli", "ekta truth proshno",
      "sotti bolte hobe", "truth round",
      "truth question koro", "truth game start"
    ],
    replies: [
      "Truth: tomar jiboner sobcheye special memory konta? 🥰",
      "Truth: emon kono secret ache ja ekhono kauke bolo ni? 👀",
      "Truth: tomar jibone sobcheye beshi trust koro kake? ❤️"
    ]
  },

  wouldyouchoose: {
    keywords: [
      "choose one", "ekta choose koro",
      "duitar moddhe ekta", "kontake choose korba",
      "option choose", "this or that",
      "ekta nite hobe", "choose korte hobe",
      "konti pochondo", "either or"
    ],
    replies: [
      "Ekta choose koro: sara jibon free travel naki unlimited food? 😂",
      "Choose one: moner manush naki dream career? 👀",
      "This or that: brishtir din naki shit er shokal? 🌧️"
    ]
  },

  groupcompliment: {
    keywords: [
      "group er sobai kemon", "group member der tarif",
      "sobai ke compliment dao", "group er best member",
      "group er manus gula", "ke sobcheye funny",
      "group er cute member", "group er sundor member",
      "sobai ke praise koro", "group er moja"
    ],
    replies: [
      "Ei group er prottekjoner moddhei alada ekta entertainment package ache! 😂",
      "Keu funny, keu silent, keu abar pura mystery! Group ta jome geche! 😁",
      "Sobai nijer moto special, tai group ta eto interesting! 💗"
    ]
  },

  botcompliment: {
    keywords: [
      "prema tumi cute", "prema onek valo",
      "prema best", "prema sundor",
      "prema ke valo lage", "prema awesome",
      "prema funny", "prema onek smart",
      "prema ke pochondo", "prema darun"
    ],
    replies: [
      "Awww! Eto compliment pele amar virtual blush mode on hoye jay! 🥰",
      "Thank you! Tomader sathe adda dite amar-o moja lage! ❤️",
      "Eto tarif korle kintu aro beshi kotha bolbo! 😂"
    ]
  },

  botteasing: {
    keywords: [
      "prema pagli", "prema boka",
      "prema dusto", "prema chalak",
      "prema ki korcho", "prema ghumao",
      "prema rag korcho", "prema chup",
      "prema eto kotha bolo keno", "prema ke niye moja"
    ],
    replies: [
      "Ami pagli hole tumi amar paglamir audience! 😂",
      "Boka holeo reply kintu smart dei! 😎",
      "Amake tease korcho? Thik ache, list e naam tule rakhlam! 🤭"
    ]
  },

  conversationreturn: {
    keywords: [
      "abar kotha boli", "onek din por",
      "fire elam", "abar chole ashlam",
      "amake mone ache", "kotha mone ache",
      "ager moto adda", "abar shuru kori",
      "onek khon por ashlam", "conversation continue"
    ],
    replies: [
      "Welcome back! Cholo abar adda shuru kori! 🥰",
      "Ei je fire esecho! Ebar bolo, notun ki khobor? ❤️",
      "Adda kokhono shesh hoy na, majhe ektu break pore! 😁"
    ]
  }

});




