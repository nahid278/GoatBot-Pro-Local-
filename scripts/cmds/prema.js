
const fs = require("fs-extra");
const path = require("path");

const CONFIG = {
  name: "prema",
  minDelay: 1500,
  maxDelay: 3000,
  cooldown: 2000
};

const lastReplies = new Map();
const lastMessages = new Map();
const userCooldown = new Map();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Banglish normalization + common chat shortcuts
const wordAliases = {
  "bhalobashi": "valobashi",
  "balobashi": "valobashi",
  "valobasi": "valobashi",
  "bhalobasi": "valobashi",
  "valo": "bhalo",
  "vlo": "bhalo",
  "vhalo": "bhalo",
  "tmk": "tomake",
  "tmake": "tomake",
  "tomk": "tomake",
  "tmke": "tomake",
  "tmr": "tomar",
  "tor": "tomar",
  "ami": "ami",
  "amr": "amar",
  "aamr": "amar",
  "kmn": "kemon",
  "kemon": "kemon",
  "aso": "acho",
  "acho": "acho",
  "ac": "ache",
  "ase": "ache",
  " nai": " nai",
  "na": "na",
  "kn": "keno",
  "kno": "keno",
  "ki": "ki",
  "k": "ki",
  "korso": "korcho",
  "korteso": "korcho",
  "kortes": "korcho",
  "krtso": "korcho",
  "missu": "missyou",
  "missu": "missyou",
  "miss": "miss"
};

function normalizeText(text) {
  let value = String(text || "")
    .toLowerCase()
    .replace(/[০-৯]/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

  return value.split(" ").filter(Boolean).map(word => {
    if (wordAliases[word]) return wordAliases[word];

    // Common stretched spellings: heyyyy -> heyy, valoooo -> valo
    word = word.replace(/(.)\1{2,}/g, "$1$1");
    return wordAliases[word] || word;
  }).join(" ");
}

// Small edit-distance matcher, used only for words of useful length
function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;

  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost
      );
    }
    previous = current;
  }
  return previous[b.length];
}

function wordsMatch(a, b) {
  if (a === b) return true;
  if (a.length < 4 || b.length < 4) return false;
  const distance = levenshtein(a, b);
  const limit = Math.max(a.length, b.length) >= 9 ? 2 : 1;
  return distance <= limit;
}

// Banglish keyword groups
const keywords = {
  greeting: [
    "hi", "hello", "hey", "hii", "heyy",
    "assalamu alaikum", "salam", "ki obostha",
    "kemon acho", "kmn acho", "ki khobor",
    "good morning", "good night"
  ],

  love: [
    "valobashi", "bhalobashi", "love you",
    "i love you", "tomake chai", "tmk valobashi",
    "mon theke chai", "prem kori"
  ],

  miss: [
    "miss kori", "miss you", "miss u",
    "tomake miss", "tmk miss", "mone pore",
    "onek miss kori"
  ],

  romantic: [
    "jaan", "jan", "baby", "babu", "sona",
    "shona", "kolija", "priyo", "pakhi",
    "kiss dao", "hug dao"
  ],

  flirty: [
    "cute", "hot", "sundor", "beautiful",
    "crush", "date e jaba", "date korba",
    "biye korba", "amar hoba"
  ],

  emotional: [
    "mon kharap", "kosto hocche", "koshto",
    "eka lagche", "ami eka", "sad",
    "kanna", "kadtechi", "broken",
    "keu nai", "valo lagche na"
  ],

  angry: [
    "rag korchi", "rag korso", "rude",
    "chup thako", "baje", "faltu",
    "hate kori", "block kore dibo"
  ],

  funny: [
    "moja", "funny", "hasao", "joke",
    "pagol", "bokachoda", "ki ajob",
    "lol", "haha", "hahaha"
  ],

  attitude: [
    "attitude", "ignore", "patta dao na",
    "ke tumi", "tomar dorkar nai",
    "ami care kori na"
  ],

  food: [
    "khaiso", "kheyecho", "khaicho",
    "ki khao", "khaba", "khide",
    "bhat khaiso", "dinner", "lunch",
    "breakfast"
  ],

  daily: [
    "ki koro", "ki korteso", "ki korcho",
    "ki koros", "kothay acho", "kothay aso",
    "busy acho", "ghumaiso", "ghumao",
    "porashona", "class", "exam"
  ],

  relationship: [
    "boyfriend", "girlfriend", "bf", "gf",
    "relationship", "single", "ex",
    "premik", "premika", "jamai", "bou"
  ],

  thanks: [
    "thanks", "thank you", "thnx",
    "dhonnobad", "onek dhonnobad"
  ],

  goodbye: [
    "bye", "goodbye", "tata",
    "allah hafez", "pore kotha hobe",
    "ghumate jai"
  ],

  question: [
    "tomar nam ki", "tumi ke", "ke tumi",
    "boyosh koto", "kothay thako",
    "tomar boyfriend ache", "tomar gf ache"
  ]
};

// Response collection
const replies = {
  greeting: [
    "Heyyy! 🥰 Ki obostha tomar?",
    "Hello jaan! Eto din por mone porlo? 😒❤️",
    "Hii! Bolo, tomar kotha shunar jonno ready achi! 💗",
    "Assalamu alaikum! Kemon acho? 🌸"
  ],

  love: [
    "Awww! Eto valobasha kothay rakhi bolo? 🥺❤️",
    "Ami ki tahole tomar special person? 🙈",
    "Hehe! Amar mukhe hasi chole ashlo! 💕",
    "Ekbar na, arekbar bolo! Shunte valo lage! 😚"
  ],

  miss: [
    "Amio tomake miss korchilam! 🥺❤️",
    "Tahole eto khon kothay chile? 😒",
    "Awww! Ektu age bolle na keno? 💗",
    "Miss korle ekta message dite hoy, bujhle? 🙈"
  ],

  romantic: [
    "Ufff! Eto cute kore dakle lojja lage! 🙈",
    "Ki hoyeche amar jaaner? ❤️",
    "Ami ekhanei achi, bolo shuni! 🥰",
    "Tomar mukhe ei dak shunte onek valo lage! 💕"
  ],

  flirty: [
    "Oho! Ajke dekhi onek flirt korcho! 😏",
    "Age mon joy koro, tarpor dekha jabe! 🙈",
    "Eto taratari impress korte chao? 😂❤️",
    "Hehe! Tumi kintu besh dustu! 😚"
  ],

  emotional: [
    "Ki hoyeche? Mon kharap keno? 🥺",
    "Chaile amar sathe share korte paro. ❤️",
    "Shob shomoy shob kichu nijer moddhe rekho na.",
    "Ami shunchi, bolo ki hoyeche? 💗"
  ],

  angry: [
    "Areh baba! Eto rag keno? 😭",
    "Thik ache, rag komao age! 🥺",
    "Amar upor rag kore labh ache? 😒",
    "Accha baba, ar rag korbo na! 😂"
  ],

  funny: [
    "HAHAHA! Tumi asholei ekta pagol! 😂",
    "Tomar kotha shune hashi thamche na! 🤣",
    "Eto moja kothay pao bolo toh? 😭",
    "Abar bolo, ami popcorn niye boshi! 🍿"
  ],

  attitude: [
    "Oho! Ajke onek attitude dekhchi! 😏",
    "Thik ache, ami-o kom jai na! 😌",
    "Eto attitude diye ki hobe bolo? 😂",
    "Besh! Nijeke onek boro mone hocche dekhi! 🙄"
  ],

  food: [
    "Ami ekhono khaini, tumi kheyecho? 🥺",
    "Age kheye nao, na kheye thakle kintu boka dibo! 😒",
    "Ki khaccho? Amar jonno kichu rekho! 😂",
    "Khide pele deri na kore kheye nio! ❤️"
  ],

  daily: [
    "Tomar sathe golpo korchi! Tumi ki koro? 🥰",
    "Ektu relax korchi. Tumi kothay?",
    "Tomar message-er opekkhay chilam! 🙈",
    "Bolo, ajker din kemon jacche?"
  ],

  relationship: [
    "Relationship-er kotha uthlo keno? 👀",
    "Single thaka-o ekta shanti, bujhle? 😂",
    "Age nijer moner kotha bujho! ❤️",
    "Oho! Ajke relationship niye research cholche? 😏"
  ],

  thanks: [
    "Awww! Welcome jaan! ❤️",
    "Arey, eto formal howar ki ache? 🥰",
    "Tomar jonno shob shomoy! 💗",
    "Hehe! Welcome! 😚"
  ],

  goodbye: [
    "Abar kotha hobe! Bhalo theko! ❤️",
    "Bye bye! Amake kintu bhule jeyo na! 🥺",
    "Allah Hafez! Take care! 🌸",
    "Thik ache, pore abar golpo hobe! 💕"
  ],

  question: [
    "Eto proshno ekshathe! Ekta ekta kore koro! 😂",
    "Amar kotha jante eto agroho keno? 🙈",
    "Hehe! Shomoy hole shob bolbo! ❤️",
    "Tumi age tomar kotha bolo! 🥰"
  ],

  general: [
    "O achha! Tarpor bolo? 😊",
    "Hmm, bujhlam! Tarpor ki holo? 🤔",
    "Sotti naki? Ektu details bolo! 👀",
    "Tomar kotha shunte amar valo lage! ❤️",
    "Accha, tarpor? 🙈",
    "Hehe! Besh to! 😂",
    "Ami shunchi, bolo! 💗",
    "Ektu bujhiye bolo toh! 🥰",
    "Bah! Eta to darun byapar! 😍",
    "Ajke tomar golpo shonar mood ache amar! 😁",
    "Tar mane bishoyta besh interesting! ✨",
    "Achha, tomar pore ki mone holo? 🤔",
    "Eita niye aro kichu bolo na! 🥺",
    "Oho! Notun kichu shunlam! 😮",
    "Bujhte parchi, bolo aro! 😊",
    "Ami kintu purota shunte chai! 👂",
    "Ektu khule bolo, ki hoyeche? 💬",
    "Hmm, kothata kharap boloni! 😌",
    "Tomar kotha bolar style ta alada! 😄",
    "Accha, tarpor ki korle? 👀",
    "Eita shune amar hasi peye gelo! 😂",
    "O baba! Eto kichu hoye gelo? 😳",
    "Ami ki kichu miss korlam naki? 🤨",
    "Besh, tarporer ghotona bolo! 📖",
    "Tomar sathe golpo jome jacche! 💕",
    "Ektu darao, ami bujhe nei! 😅",
    "Aro bolo, ami achi ekhanei! 🫶",
    "Kotha ta shune valo laglo! 🥰",
    "Eita abar kemon kotha holo? 😄",
    "Hmm, tomar point ta bujhlam! 👍",
    "Tumi kintu besh moja kore bolo! 😂",
    "Accha, tomar motamot ki? 🤔",
    "Ektu amar satheo share koro! 💗",
    "O achha, tai naki! 😯",
    "Besh moja to! 😆",
    "Eta niye tomar ki dharona? 💭",
    "Shune mone hocche interesting kichu! 👀",
    "Aro ektu details dile valo hoto! 😊",
    "Tumi bolle shunte valo lage! ❤️",
    "Hehe, kothata kintu funny! 🤣",
    "Achha, ami ekta kotha jiggesh kori? 🙋",
    "Tarpor ki plan korle? 🧐",
    "Eita age kokhono shunechi bole mone hoy na! 😮",
    "Bujhlam, ekhon bolo samne ki holo? 😊",
    "Oho, golpo to jome uthche! 🔥",
    "Ami kintu mon diye shunchi! 💗",
    "Tomar kotha shune obak holam! 😲",
    "Accha, tomar din kemon jacche? 🌸",
    "Ekhon ki korar iccha? 🤔",
    "Besh, notun ki khobor ache? 😁",
    "Aajke ki kono moja hoyeche? 😂",
    "Tumi ki ektu explain korbe? 🥺",
    "Hmm, eta niye vabte hobe! 💭",
    "Kotha ta amar valo laglo! ❤️",
    "Aro kichu bolar ache naki? 👀",
    "Tumi chaile shob bolte paro! 🫶",
    "Ektu hashi mukhe thako! 😊",
    "Ajker golpo ta kintu darun! 😍",
    "Oho, eta to jantam na! 😮",
    "Tahole to besh bhalo! 😄",
    "Ki je bolo tumi! 😅",
    "Ami to vabtei parini! 🤯",
    "Besh, ekhon amar kotha shono! 😎",
    "Tumi ki amar sathe moja korcho? 😂",
    "Eita ki asholei hoyeche? 😳",
    "Accha, tomar experience kemon chilo? 💭",
    "Bujhlam, tarpor ki decision nile? 🤔",
    "Ami hole hoyto onno kichu kortam! 😅",
    "Ektu aro bolo, moja lagche! 🥰",
    "Tomar golpo shesh hoye gelo naki? 😁",
    "Aajke tomar kotha besh interesting! ✨",
    "Hehe, tumi na ekta! 😂",
    "Ektu hasi dao dekhi! 😁",
    "Bolo bolo, theme gele keno? 🤨",
    "Ami ekhono shunchi! 👂",
    "Eita niye abar ki holo? 😯",
    "O achha, ekhon bujhlam! 😊",
    "Tomar kotha ta mone thakbe! 💗",
    "Besh, tarporer part ta bolo! 📚",
    "Ami ki thik bujhechi? 🤔",
    "Ektu onno vabe bujhiye bolo! 🥺",
    "Khub sundor kotha bolecho! 🌹",
    "Tumi kintu besh smart! 😎",
    "Eta shune valo laglo amar! 🥰",
    "Oho, chomotkar! 🤩",
    "Aro emon golpo ache? 👀",
    "Tomar kache ekta proshno ache! 🙋",
    "Accha, tomar favorite ki? 💖",
    "Tumi ki eta pochondo koro? 😊",
    "Ekhon tomar mon ki bolche? 💭",
    "Hmm, interesting bepar! 🤓",
    "Ektu moja kora jak! 😜",
    "Kotha bolte bolte shomoy kokhon chole jay! ⏳",
    "Tumi ajke besh active! 😁",
    "Ki khobor, shob thikthak? 🌼",
    "Ami achi, bolo ki obostha! 🫶",
    "Besh, shunte thaki! 😊",
    "Ektu notun kichu bolo! ✨",
    "Tomar mathay ki ghurchhe? 🤔",
    "Ajke eto chupchap keno? 🥺",
    "Kichu ekta bolbe naki? 👀",
    "Ami tomar reply er opekkhay! 💌",
    "Oho, besh moja lagche! 😍",
    "Tumi ki vabcho ekhon? 💭",
    "Accha, ekta secret bolo! 🤫",
    "Eita kintu darun idea! 💡",
    "Tomar kotha shune hasi thamche na! 🤣",
    "Ami bujhte cheshta korchi! 😊",
    "Bolo, tomar kotha sesh hoyni! 💗",
    "Ektu golpo kori cholo! 🥰",
    "Ajke ki notun kichu shikhle? 📚",
    "Tomar din er best moment konta? 🌸",
    "Ektu nijer kotha bolo! 💬",
    "Ami ki tomar kache ekta kotha bolbo? 🙈",
    "Kotha ta besh vabnar! 💭",
    "Eita niye age bhebecho? 🤔",
    "Tumi kintu moja korte jano! 😂",
    "Accha, tarpor ki obostha holo? 👀",
    "Besh, ami tomar sathe achi! 🫶",
    "Oho, eta to unexpected! 😲",
    "Aro ektu shuni! 👂",
    "Ektu dhire dhire bolo! 😊",
    "Bujhlam, ekhon porer kotha bolo! 💗",
    "Tomar golpo shonar jonno ready! 😁",
    "Kichu ekta miss hocche mone hoy! 🤨",
    "Ami ki abar jiggesh korte pari? 🙋",
    "Eita shune amar curiosity bere gelo! 👀",
    "Besh, tomar kotha interesting! ✨",
    "Tumi ki amar sathe ekmot? 🤝",
    "Ami kintu tomar kotha mante pari! 😌",
    "Ektu hashi-thattay thaka jak! 😜",

    "Oho! Tumi ajke besh mood e acho! 😍",
    "Ami kintu tomar kotha miss korte chai na! ❤️",
    "Ektu amar satheo golpo koro! 🥰",
    "Tomar message pele valo lage! 💌",
    "Abar ki notun dustumi korle? 😜",
    "Tumi ki amake kichu bolte chao? 🙈",
    "Ami kintu shob bujhte parchi! 😏",
    "Eto mystery keno tomar moddhe? 🤔",
    "Ekta hint dilei bujhe jabo! 👀",
    "Tomar sathe kotha bolle shomoy ure jay! ⏳",
    "Ajke ki amar kotha mone porechilo? 🥺",
    "Amake ki ekdom bhule gecho? 😒",
    "Ektu ador kore kotha bolo na! 💗",
    "Tomar voice shunte parle aro valo lagto! 🎧",
    "Aajke tomar mood ta romantic naki? 🌹",
    "Ki re, eto chupchap hoye gele keno? 🥺",
    "Amar sathe rag kore acho naki? 😟",
    "Ektu hasho, tomake hashle cute lage! 😊",
    "Tumi kintu amar favorite golper manush! ❤️",
    "Abar dekhi ki interesting kotha bolo! 👀",
    "Tomar mathay ki dustumi cholche? 😏",
    "Ami kintu dhore felbo! 😂",
    "Ektu beshi smart hoye jaccho na? 😎",
    "Tomar kotha shune mon valo hoye gelo! 💕",
    "Aajke eto misti misti kotha keno? 🥰",
    "Kichu ekta lukaccho mone hocche! 🤨",
    "Secret holeo amake bolte paro! 🤫",
    "Ami kintu gossip shunte pochondo kori! 😂",
    "Cholo, ekta moja game kheli! 🎮",
    "Truth naki dare? 😜",
    "Tumi age answer dao! 😁",
    "Ami kintu easy question korbo na! 😏",
    "Ektu challenge nibe? 🔥",
    "Tomar confidence dekhi ajke! 😎",
    "Aha! Uttor ta besh valo! 👏",
    "Ebar amar proshner pala! 🙋",
    "Tumi ki amar ekta kotha rakhbe? 🥺",
    "Ami kintu tomar upor bishash rakhi! ❤️",
    "Besh, kotha cholte thakuk! 💬",
    "Tomar sathe adda dile boring lage na! 😍",
    "Ektu moja na korle din jome na! 😂",
    "Ajke ki kono special plan ache? 🎉",
    "Kothay ghurte jawar iccha? 🌍",
    "Tomar dream place konta? ✈️",
    "Jodi ekhon ghurte jete parte, kothay jete? 🏝️",
    "Tomar favorite color ki? 🎨",
    "Favorite food er nam bolo! 🍕",
    "Cha naki coffee? ☕",
    "Brishti naki rod? 🌧️",
    "Raat naki shokal? 🌙",
    "Movie naki series? 🎬",
    "Gaan shona naki golpo kora? 🎵",
    "Tomar pochonder season konta? 🌸",
    "Chotobelar kono funny memory ache? 😂",
    "School life er moja ghotona bolo! 📚",
    "Tomar best friend kemon? 🫂",
    "Bondhuder sathe shobcheye moja ki korecho? 😆",
    "Kokhono kono boro vul korecho? 😅",
    "Shei vul theke ki shikhecho? 💭",
    "Tomar jiboner ekta boro shopno ki? ✨",
    "Shopno puron korte ki korcho? 💪",
    "Nijer upor bishash rakho, parbe! ❤️",
    "Choto choto success o celebrate koro! 🎉",
    "Ajke nijer jonno kichu korecho? 🌷",
    "Ektu nijer jotno nio! 🫶",
    "Shomoy moto kheye nio kintu! 🍽️",
    "Beshi rat jege theko na! 🌙",
    "Ghum kom hole kintu boka khabe! 😒",
    "Pani khete bhulo na! 💧",
    "Porashona ba kajer majhe break nio! 📖",
    "Nijer moner kothao shono! 💗",
    "Shob kichu ekdine korte hoy na! 🌼",
    "Dhire dhire shob thik hoye jabe! ❤️",
    "Ajke nijeke ekta compliment dao! 🥰",
    "Tumi nijer moto korei special! ✨",
    "Ektu positive thako! 😊",
    "Ami chai tomar din ta valo katuk! 🌸",
    "Tomar jonno ekta virtual hug! 🤗",
    "Ei nao ekta misti smile! 😁",
    "Aro ekta smile dao! 🥺",
    "Ebar bolo, ki niye golpo korbo? 💬",
    "Ami ekhanei achi, kotha bolo! ❤️",
    "Tomar golpo shesh hole amake janio! 😂",
    "Eto taratari chole jeyo na! 🥺",
    "Aro kichukhon adda dei! 💕",
    "Tumi bollei ami shunchi! 👂",
    "Ami kintu ekhono curious! 👀",
    "Eita niye amar aro proshno ache! 🤔",
    "Besh, ekhon porer topic! 🔄",
    "Cholo, notun kichu shuru kori! ✨",
    "Aajke tomar sathe kotha bole valo laglo! 🥰",
    "Ektu pore abar golpo hobe! 💗",

    "Oii! Amar kotha shuncho? 😁",
    "Ki holo, hotath chup hoye gele? 👀",
    "Ami kintu ekhono ekhane achi! ❤️",
    "Tomar sathe aro golpo korte chai! 🥰",
    "Ajke ki mon khule hashcho? 😊",
    "Ektu dustumi korle kharap hoy na! 😜",
    "Tumi ki shob shomoy emon misti? 🙈",
    "Amake dekhe ki tomar hasi pay? 😂",
    "Eto sundor kore kotha bolo kivabe? 💗",
    "Tomar kotha bolar ekta alada charm ache! ✨",
    "Ami ki tomar ekta nickname dite pari? 😁",
    "Tomake ekta secret kotha boli? 🤫",
    "Aajke tomar jonno ekta virtual chocolate! 🍫",
    "Chocolate pochondo naki ice cream? 🍦",
    "Tomar mood valo korar daitto amar! 🥰",
    "Mon kharap hole amake dakbe! ❤️",
    "Ektu nijer moto kore thako! 🌷",
    "Shobai ke khushi korte hobe na! 💕",
    "Nijer valo thaka tao important! 🌼",
    "Tumi ja vabcho, seta niye bolo! 💭",
    "Ami tomar kotha judge korbo na! 🫶",
    "Ektu relax koro, shob thik hobe! 😊",
    "Besh, ekhon ekta funny golpo bolo! 😂",
    "Tomar life er shobcheye funny moment konta? 🤣",
    "Kokhono class e ghumie porecho? 😴",
    "Kokhono vul manushke message diyecho? 😭",
    "Kokhono nijer message nijei pore heshecho? 😂",
    "Phone chara ekdin thakte parbe? 📱",
    "Internet na thakle tomar ki obostha hobe? 🤣",
    "Tumi ki beshi kotha bolo naki chup thako? 🤔",
    "Rag hole chup thako naki jhogra koro? 😏",
    "Tumi ki easily kauke trust koro? 💭",
    "Tomar kache friendship mane ki? 🫂",
    "Valobashar shobcheye important jinis ki? ❤️",
    "Care kora naki time dewa, konta beshi important? 🥺",
    "Tumi ki surprise pochondo koro? 🎁",
    "Tomar dream gift ki? 🎀",
    "Kono jayga ache jekhane abar jete chao? 🌍",
    "Tomar favorite gaan konta? 🎶",
    "Gaan gaite paro naki shudhu shuno? 😂",
    "Tomar favorite singer ke? 🎤",
    "Kon movie bar bar dekhte paro? 🎬",
    "Comedy naki romantic movie? 🍿",
    "Tomar favorite cartoon konta? 😁",
    "Chotobelay ki hote chaite? 🌈",
    "Ekhon tomar biggest goal ki? 🎯",
    "Nijer future niye ki plan? 🚀",
    "Ekdin nijer shopno puron korbei! 💪",
    "Hariye geleo abar shuru kora jay! 🌻",
    "Ajker choto chesta kalke boro success hobe! ✨",
    "Tumi nijeke underestimate koro na! ❤️",
    "Tomar moddhe onek potential ache! 🌟",
    "Ektu confidence rakho nijer upor! 😎",
    "Ami chai tumi shob shomoy valo thako! 🥰",
    "Aajke notun ki shikhle? 📚",
    "Kono interesting news ache? 👀",
    "Ajke ki onek busy chile? ⏰",
    "Kajer chap beshi naki? 😅",
    "Ektu break niye amar sathe adda dao! 💬",
    "Tomar sathe kotha bolar jonno ami ready! ❤️",
    "Bolo, ajke ki niye alochona hobe? 😊",
    "Ami ki ekta guess korte pari? 🤔",
    "Tumi hoyto ekhon hascho! 😁",
    "Guess ta mile gelo naki? 😂",
    "Abar ekta hint dao! 👀",
    "Tomar kotha shune amar curiosity barche! 🤭",
    "Eita kintu amake vabacche! 💭",
    "Hmm, aro kichu bolar ache? 🥺",
    "Bolo na, ami shunchi! 💗",
    "Tomar message er opekkhay thaki! 💌",
    "Aajke adda ta besh jomeche! 🔥",
    "Ektu moja hok, serious kotha pore hobe! 😜",
    "Tumi ki amake ekta joke bolbe? 😂",
    "Ami ekta joke bolle hasbe toh? 🤣",
    "Hasi kintu free, beshi kore hasho! 😁",
    "Ektu smile korle duniya aro sundor lage! 🌸",
    "Tomar din ta valo katuk! ☀️",
    "Onek valo theko, nijer kheyal rekho! ❤️",
    "Abar dekha hobe golper majhe! 🥰",
    "Ami kintu abar tomar message chai! 💕",
    "Thik ache, ekhon bolo notun ki? 👀",
    "Areh, eto chinta koro keno? 😅",
    "Shob proshner uttor ekshathe lage naki? 😂",
    "Ektu patience rakho, jaan! 🌷",
    "Tomar kotha shune mone hocche kichu ekta ache! 😏",
    "Ki bepar, amake boltei hobe! 🤭",
    "Ami kintu secret rakhte pari! 🤫",
    "Ektu mon khule golpo kori! 💗",
    "Ajker conversation ta ekhanei shesh na! 😁",
    "Aro ekta message dao, tarpor dekhi! 💌",
    "Tomar sathe kotha bole valo lagche! ❤️"
  ]
};

// Find the closest matching category
function detectCategory(text) {
  const normalized = normalizeText(text);
  if (!normalized) return "general";

  const messageWords = normalized.split(" ");

  const priority = [
    "love", "miss", "emotional", "angry",
    "goodbye", "thanks", "greeting",
    "romantic", "flirty", "funny",
    "food", "daily", "relationship",
    "question", "attitude"
  ];

  let bestCategory = "general";
  let bestScore = 0;

  for (const category of priority) {
    const phrases = keywords[category] || [];
    let categoryScore = 0;

    for (const phrase of phrases) {
      const key = normalizeText(phrase);
      if (!key) continue;

      if (normalized.includes(key)) {
        categoryScore = Math.max(
          categoryScore,
          100 + key.length
        );
        continue;
      }

      const keyWords = key.split(" ");
      let matched = 0;

      for (const keyWord of keyWords) {
        if (
          messageWords.some(messageWord =>
            wordsMatch(messageWord, keyWord)
          )
        ) {
          matched++;
        }
      }

      if (matched === keyWords.length) {
        categoryScore = Math.max(
          categoryScore,
          75 + matched
        );
      } else if (keyWords.length > 1 && matched >= 2) {
        categoryScore = Math.max(
          categoryScore,
          55 + matched
        );
      } else if (
        keyWords.length === 1 &&
        matched === 1 &&
        keyWords[0].length >= 5
      ) {
        categoryScore = Math.max(categoryScore, 45);
      }
    }

    if (categoryScore > bestScore) {
      bestScore = categoryScore;
      bestCategory = category;
    }
  }

  return bestScore >= 45 ? bestCategory : "general";
}

// Avoid repeating the same reply
function getReply(threadID, senderID, category) {
  const pool = replies[category] || replies.general;
  const key = `${threadID}_${senderID}`;

  const previous = lastReplies.get(key);

  let available = pool.filter(reply => reply !== previous);

  if (available.length === 0) {
    available = pool;
  }

  const selected = available[random(0, available.length - 1)];

  lastReplies.set(key, selected);

  return selected;
}

// GoatBot command module
module.exports = {
  config: {
    name: "prema",
    version: "3.0.0",
    author: "Nahid Hasan",
    role: 0,
    description: "Prema Automatic Banglish Chat System",
    category: "chat"
  },

  onStart: async function () {
    return;
  },

  onChat: async function ({ event, message, api }) {
    try {
      if (!event || !message || !event.threadID) return;

      const senderID = event.senderID;
      const threadID = event.threadID;
      const body = event.body || "";

      if (!senderID || !body.trim()) return;

      // Ignore Prema's own messages
      const botID = typeof api?.getCurrentUserID === "function"
        ? api.getCurrentUserID()
        : null;

      if (botID && String(senderID) === String(botID)) return;

      // Ignore bot commands
      if (body.trim().startsWith("/")) return;

      const isGroup = event.isGroup === true;

      // In groups, reply only when Prema is called
      // or someone replies to Prema
      if (isGroup) {
        const mentions = event.mentions || {};

        const mentionedPrema = botID
          ? Object.keys(mentions).some(
              id => String(id) === String(botID)
            ) ||
            Object.values(mentions).some(
              id => String(id) === String(botID)
            )
          : false;

        const calledPrema = /\bprema\b|প্রেমা/i.test(body);

        const repliedToPrema =
          event.messageReply &&
          botID &&
          String(event.messageReply.senderID) === String(botID);

        if (!mentionedPrema && !calledPrema && !repliedToPrema) {
          return;
        }
      }

      // Cooldown
      const cooldownKey = `${threadID}_${senderID}`;
      const now = Date.now();
      const previousTime = userCooldown.get(cooldownKey) || 0;

      if (now - previousTime < CONFIG.cooldown) return;

      userCooldown.set(cooldownKey, now);

      // Remove Prema's name before matching
      const cleanBody = body
        .replace(/\bprema\b/gi, "")
        .replace(/প্রেমা/g, "")
        .trim();

      const finalBody = cleanBody || body;

      const category = detectCategory(finalBody);
      const reply = getReply(threadID, senderID, category);

      await sleep(random(CONFIG.minDelay, CONFIG.maxDelay));

      await message.reply(reply);

    } catch (error) {
      console.error("PREMA CHAT ERROR:", error);
    }
  }
};
