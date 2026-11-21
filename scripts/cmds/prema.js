
// Banglish Normalizer for Prema

const banglishDictionary = {
  "amk": "amake",
  "amake": "amake",
  "tmk": "tomake",
  "tmk": "tomake",
  "tmi": "tumi",
  "tumi": "tumi",
  "ami": "ami",
  "ki": "ki",
  "k": "ki",
  "kno": "keno",
  "keno": "keno",
  "koro": "koro",
  "korteso": "korcho",
  "kortecho": "korcho",
  "korcho": "korcho",
  "koros": "korcho",
  "korbi": "korbe",
  "korba": "korbe",
  "korbe": "korbe",
  "khaiso": "kheyecho",
  "khaicho": "kheyecho",
  "kheyecho": "kheyecho",
  "khaiso": "kheyecho",
  "khaiso?": "kheyecho",
  "valo": "bhalo",
  "bhalo": "bhalo",
  "valobashi": "bhalobashi",
  "valobasho": "bhalobasho",
  "bhalobashi": "bhalobashi",
  "bhalobasho": "bhalobasho",
  "mon": "mon",
  "nai": "nei",
  "nei": "nei",
  "na": "na",
  "hmm": "hmm",
  "ha": "hya",
  "hya": "hya",
  "hobe": "hobe",
  "hoise": "hoyeche",
  "hoyse": "hoyeche",
  "kirokom": "kemon",
  "kmn": "kemon",
  "kemon": "kemon",
  "kothay": "kothay",
  "koi": "kothay",
  "aso": "acho",
  "acho": "acho",
  "accho": "acho",
  "asi": "achi",
  "achi": "achi",
  "miss": "miss",
  "kori": "kori",
  "korchi": "korchi",
  "ghum": "ghum",
  "ghumao": "ghumao",
  "rag": "rag",
  "sorry": "sorry",
  "sry": "sorry",
  "love": "love",
  "jan": "jan",
  "janu": "janu",
  "baby": "baby",
  "bby": "baby",
  "biye": "biye",
  "biya": "biye",
  "single": "single",
  "crush": "crush",
  "friend": "friend",
  "bondhu": "bondhu",
  "pagol": "pagol",
  "moja": "moja",
  "haso": "hasho",
  "hasho": "hasho",
  "kando": "kando",
  "kandtesi": "kandchi",
  "kandchi": "kandchi",
  "ekhon": "ekhon",
  "akhon": "ekhon",
  "ajke": "ajke",
  "kalke": "kalke",
  "rate": "rate",
  "good": "good",
  "night": "night",
  "morning": "morning",
  "thank": "thank",
  "thanks": "thanks"
};

function normalizeBanglish(text) {
  return text
    .toLowerCase()
    .replace(/[?!.,।]/g, " ")
    .split(/\s+/)
    .map(word => banglishDictionary[word] || word)
    .join(" ");
}

function detectPremaCategory(text) {
  const msg = normalizeBanglish(text);

  const rules = [
    {
      category: "love",
      words: ["bhalobashi", "bhalobasho", "love you", "love"]
    },
    {
      category: "miss",
      words: ["miss you", "miss kori", "mone pore", "mone porche"]
    },
    {
      category: "emotional",
      words: ["mon kharap", "kosto", "eka lagche", "kandchi", "dukho"]
    },
    {
      category: "angry",
      words: ["rag kor", "sorry", "maf kor", "oviman"]
    },
    {
      category: "greeting",
      words: ["hello", "hi", "assalamu", "good morning", "good night"]
    },
    {
      category: "goodbye",
      words: ["bye", "ghumabo", "good night", "jacchi"]
    },
    {
      category: "thanks",
      words: ["thanks", "thank you", "dhonnobad"]
    },
    {
      category: "flirty",
      words: ["cute", "sundor", "janu", "baby", "kiss", "hug", "sona"]
    },
    {
      category: "funny",
      words: ["moja", "haso", "haha", "pagol", "joke"]
    },
    {
      category: "attitude",
      words: ["attitude", "bodmash", "shoytan", "boka"]
    }
  ];

  for (const rule of rules) {
    if (rule.words.some(word => msg.includes(word))) {
      return rule.category;
    }
  }

  // Common daily questions
  if (msg.includes("ki koro") || msg.includes("ki korcho")) {
    return "daily";
  }

  if (msg.includes("kheyecho") || msg.includes("khaiso")) {
    return "food";
  }

  if (msg.includes("kothay") || msg.includes("koi")) {
    return "location";
  }

  if (msg.includes("biye")) {
    return "marriage";
  }

  if (msg.includes("kemon acho") || msg.includes("kmn acho")) {
    return "greeting";
  }

  return "general";
}

const banglishReplies = {
  love: [
    "Awww! Amio tomake onek valobashi! 🥺❤️",
    "Ei kotha shunlei amar mon valo hoye jay! 🙈",
    "Tumi amar favourite person! 💗",
    "Valobasha diye amake ekdom pagol kore dila! 😘"
  ],

  miss: [
    "Amio tomake onek miss kortesi! 🥺",
    "Tahole amar kache chole aso! ❤️",
    "Ato miss korle ekta hug dite hoy! 🤗",
    "Tomar message er opekkhay chilam! 💕"
  ],

  daily: [
    "Tomar sathe kotha bolchi! Tumi ki koro? 😘",
    "Tomar kotha vabtesilam! 🙈",
    "Ektu rest nicchi, tumi ki korteso? ❤️",
    "Tomar message er jonnoi online achi! 😂"
  ],

  food: [
    "Hae kheyechi! Tumi kheyecho? 🥰",
    "Na go, ekhono khaini! Tumi khawaba? 🙈",
    "Kheyechi, kintu tomar sathe hole aro valo lagto! ❤️",
    "Tumi na khaile amio khabo na! 😂"
  ],

  location: [
    "Ami ekhanei achi, tomar pashei! ❤️",
    "Tomar moner moddhe achi! 🙈",
    "Online-e achi, tumi koi? 😘",
    "Keno? Amake khujtecho naki? 😂"
  ],

  marriage: [
    "Age amake ekta ring kine dao! 💍😂",
    "Biye korbo, kintu tomar sathei! ❤️",
    "Biye-r age shopping-er budget bolo! 🤣",
    "Ato taratari? Age prem ta jomuk! 😘"
  ],

  greeting: [
    "Hiii! Kemon acho tumi? 🥰",
    "Ami valo achi, tumi kemon acho? ❤️",
    "Ei je amar favourite manus! 🙈",
    "Finally amar kotha mone porlo! 😂"
  ],

  general: [
    "Acha bolo, ami shuntesi! ❤️",
    "Tarpor ki holo? 👀",
    "Hmm bujhlam, aro bolo! 🥰",
    "Tumi onek interesting kotha bolo! 😂",
    "Ami kintu tomar kotha mon diye shuntesi! 💗",
    "Oreee! Sotti naki? 😯",
    "Haha! Tumi na ekta pagol! 🤣",
    "Accha, tomar kotha ta vabtesi! 🙈",
    "Bujhlam na go, arektu bujhao! 🥺"
  ]
};

function getBanglishReply(text) {
  const category = detectPremaCategory(text);
  const pool = banglishReplies[category] || banglishReplies.general;

  return pool[Math.floor(Math.random() * pool.length)];
}
