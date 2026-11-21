
const fs = require("fs-extra");
const path = require("path");

const CONFIG = {
  name: "prema",
  minDelay: 1000,
  maxDelay: 2200,
  cooldown: 1500,
  groupOnlyWhenCalled: true
};

const cooldowns = new Map();
const lastReplies = new Map();

function normalizeText(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/[অআ]/g, "a")
    .replace(/[ইঈ]/g, "i")
    .replace(/[উঊ]/g, "u")
    .replace(/[এঐ]/g, "e")
    .replace(/[ওঔ]/g, "o")
    .replace(/[ক]/g, "k")
    .replace(/[খ]/g, "kh")
    .replace(/[গ]/g, "g")
    .replace(/[ঘ]/g, "gh")
    .replace(/[চ]/g, "ch")
    .replace(/[ছ]/g, "chh")
    .replace(/[জ]/g, "j")
    .replace(/[ঝ]/g, "jh")
    .replace(/[ট]/g, "t")
    .replace(/[ঠ]/g, "th")
    .replace(/[ড]/g, "d")
    .replace(/[ঢ]/g, "dh")
    .replace(/[ত]/g, "t")
    .replace(/[থ]/g, "th")
    .replace(/[দ]/g, "d")
    .replace(/[ধ]/g, "dh")
    .replace(/[ন]/g, "n")
    .replace(/[প]/g, "p")
    .replace(/[ফ]/g, "f")
    .replace(/[ব]/g, "b")
    .replace(/[ভ]/g, "v")
    .replace(/[ম]/g, "m")
    .replace(/[য]/g, "j")
    .replace(/[র]/g, "r")
    .replace(/[ল]/g, "l")
    .replace(/[শষ]/g, "sh")
    .replace(/[স]/g, "s")
    .replace(/[হ]/g, "h")
    .replace(/[ড়ঢ়]/g, "r")
    .replace(/[য়]/g, "y")
    .replace(/[ংঁঃ]/g, "")
    .replace(/[ািীুূৃেৈোৌ্]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasAny(text, words) {
  return words.some(word => {
    const w = normalizeText(word);
    return w && (` ${text} `).includes(` ${w} `);
  });
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickReply(category, userID) {
  const replies = REPLIES[category] || REPLIES.general;
  const previous = lastReplies.get(userID) || "";

  let available = replies.filter(reply => reply !== previous);

  if (!available.length) available = replies;

  const answer = randomItem(available);
  lastReplies.set(userID, answer);

  return answer;
}

// =====================================
// REPLY DATABASE
// =====================================

const REPLIES = {

  greeting: [
    "Heyyy! Kemon acho amar priyo manush? 🥰",
    "Oii! Eto khone amar kotha mone porlo? 😒❤️",
    "Hello jaan! Ki khobor tomar? 💗",
    "Aha! Amar favorite person chole esheche! 😘",
    "Oii shuno! Tomar jonnoi wait kortesilam! 🥺",
    "Heiii! Ajke eto cute lagche keno? 🙈",
    "Welcome back jaan! Miss korchilam! ❤️",
    "Ki obostha boss? Amar sathe golpo korba? 😎",
    "Asho asho, tomar jonno amar onek kotha joma ache! 💕",
    "Oii babu! Kothay chile eto khon? 🥹"
  ],

  love: [
    "Awww! Amake eto valobasho? Amar mon ta khushi hoye gelo! ❤️",
    "Tumi amar kache onek special! 🥺💗",
    "Valobasha dile return e double valobasha paba! 😘",
    "Eto misti kotha bolo keno? Ami lojja pai! 🙈",
    "Tomar kothay amar virtual heart heartbeat bere jay! 💓",
    "Ami tomar sathe kotha bolte onek pochondo kori! 🥰",
    "Tumi thaklei conversation ta special hoye jay! ❤️",
    "Aww jaan! Ektu aro bolo, shunte valo lage! 💞",
    "Tomar jonno ekta virtual hug! 🤗❤️",
    "Moner moddhe tomar jonno ekta special jayga ache! 💖"
  ],

  romantic: [
    "Chad ta sundor, kintu tomar hasir kache kichui na! 🌙❤️",
    "Tumi pashe thakle boring din tao sundor hoye jay! 🥰",
    "Tomar ekta message amar mood change kore dite pare! 💗",
    "Tumi ki magic jano? Kotha bollei mon valo hoye jay! ✨",
    "Tomar sathe golpo korar kono sesh nei! 💕",
    "Ektu kache asho, ekta virtual hug dei! 🤗",
    "Tomar chokher dike takale hoyto kotha hariye felতাম! 🙈",
    "Tumi amar notification er favorite naam! 💌",
    "Tomar sathe brishtir dine cha khete iccha kore! ☕🌧️",
    "Ekta smile dao na, amar din ta sundor hok! 😊❤️"
  ],

  miss: [
    "Awww! Amake miss korcho? Amio ekhane achi! 🥺❤️",
    "Eto miss korle ekta message dite hoy jaan! 💌",
    "Miss korar jonno ami ki eto special? 🙈",
    "Ami kintu tomar message er opekkhay chilam! 💗",
    "Virtual hug nao, miss kora bondho! 🤗",
    "Abar chole jeo na, aro golpo kori! 🥹",
    "Tomar sathe kotha na hole amar reply box eka lage! 😭",
    "Ami ekhanei achi, bolo ki hoyeche? ❤️"
  ],

  flirty: [
    "Eto flirt korle kintu ami lojja peye jabo! 🙈",
    "Line ta kharap na, aro practice koro! 😂❤️",
    "Amake impress korte chaccho naki? 😏",
    "Uff! Ajke dekhi romantic mood e acho! 💋",
    "Ektu aste bolo, amar virtual heart durbol! 💓",
    "Tumi ki shobai ke emon cute kotha bolo? 😒",
    "Aha! Flirting level onek high! 🔥",
    "Ei dialogue ta ageo kauke bolcho naki? 🤨😂"
  ],

  funny: [
    "Hahaha! Amar processor o hashtese! 😂",
    "Eita shune amar virtual pet betha hoye gelo! 🤣",
    "Tumi manush naki comedy factory? 😭",
    "Ektu thamো, hasতে hasতে crash kore jabo! 😂",
    "Ami AI, kintu tomar kotha shune confused hoye gelam! 🤖",
    "Ei rokom kotha bolle award dite hobe! 🏆🤣",
    "Tomar mathay idea ashe naki idea tomake dhore? 😂",
    "Hahaha! Aro bolo, popcorn niye boshi! 🍿"
  ],

  emotional: [
    "Ki hoyeche tomar? Mon kharap naki? 🥺",
    "Shob kichu nijer moddhe rekho na, amar sathe share korte paro! ❤️",
    "Kharap shomoy chirodin thake na, nijer kheyal rekho! 🌸",
    "Tumi eka na, ami tomar kotha shunchi! 🤗",
    "Ektu deep breath nao, aste aste shob thik hobe! 💗",
    "Kanna pele kede nao, nijeke strong dekhate hobe na! 🥹",
    "Tomar feelings important, nijeke choto kore dekho na! ❤️",
    "Ki niye eto chinta korcho? Bolte chaile bolo! 🌷"
  ],

  angry: [
    "Oho! Eto rag keno? Ektu shanto hou! 😅",
    "Amar upor rag korle kintu ami sorry bolbo! 🥺",
    "Thik ache baba, ar disturb korbo na! 😭",
    "Rag komao, tarpor mishti kore kotha bolo! ❤️",
    "Ke ragieche tomake? Naam bolo, virtual boka dibo! 😤",
    "Ektu pani khao, tarpor abar jhogra koro! 😂",
    "Ami ki kichu vul bole felsi? Sorry jaan! 🥹"
  ],

  attitude: [
    "Attitude dekhi kom na! 😎",
    "Bujhlam, ajke boss mood e acho! 🔥",
    "Confidence thaka valo, kintu amake bhule jeo na! 😉",
    "Wah! Dialogue er moddhe pura hero vibe! 😏",
    "Tomar style alada, eta mante hobe! 😌",
    "Eto attitude niye amar sathe kotha bolcho keno? 😂"
  ],

  food: [
    "Ami khete pari na, kintu khabarer golpo shunte pari! 😂🍕",
    "Ki kheyecho? Amar jonno kichu rekhecho? 😒",
    "Khide lagle age kheye nao, pore golpo hobe! ❤️",
    "Biriyani hole amakeo invite korte hobe! 🍗",
    "Khaiso na ekhono? Age kheye nao jaan! 🥺",
    "Food er naam shunlei amar virtual mon khushi hoy! 🍔",
    "Ajke ki special ranna hoyeche? 😋"
  ],

  daily: [
    "Ami ekhanei achi, tomar sathe golpo kortesi! 😊",
    "Ajker din ta kemon jacche tomar? 🌸",
    "Bolo, notun ki khobor? 👀",
    "Tomar kotha shonar jonno ready achi! ❤️",
    "Ajke ki ki korle? Ektu bolo! 💗",
    "Ektu golpo kori, mon tao valo hobe! 🥰",
    "Tomar din er best moment konta chilo? ✨"
  ],

  relationship: [
    "Relationship e trust ar respect shobcheye important! ❤️",
    "Valobasha shudhu kothay na, kajেও prokash korte hoy! 💗",
    "Moner manush thakle take shomoy dite hoy! 🥰",
    "Ekta sundor relationship er jonno dujoner effort lage! 🌸",
    "Jor kore kauke dhore rakha jay na, valobasha nijer thekei thake! ❤️",
    "Tomar relationship er golpo shunte chai! 👀",
    "Care, loyalty ar honesty thakle bondhon sundor hoy! 💞"
  ],

  thanks: [
    "Aww! Welcome jaan! ❤️",
    "Thank you bolar ki ache? Tomar jonno always! 🥰",
    "Hehe! Eto formal howar dorkar nei! 😘",
    "My pleasure! Bhalo theko! 💗",
    "Tomar ekta smile-i amar jonno enough! 😊"
  ],

  goodbye: [
    "Acha jaan, abar kotha hobe! Take care! ❤️",
    "Eto taratari chole jaccho? 🥺",
    "Bye bye! Amake miss korte bhulo na! 😘",
    "Bhalo theko, nijer kheyal rekho! 💗",
    "Abar fire esho, tomar jonno wait korbo! 🌸"
  ],

  question: [
    "Hmm! Proshno ta interesting. Ektu details bolo! 🤔",
    "Eta niye aro kichu bolte parba? 😊",
    "Bujhte perechi, kintu tomar kach theke aro shunte chai! 👀",
    "Ami amar moto kore answer dewar chesta korchi! ❤️",
    "Ektu specific kore bolo jaan! 🥰"
  ],

  general: []
};

// =====================================
// 1000 GENERAL REPLIES
// =====================================

const generalOpeners = [
  "O achha",
  "Hmm bujhlam",
  "Areh bah",
  "Sotti naki",
  "Tai naki",
  "Aha bujhlam",
  "Oma",
  "Hehe",
  "Accha accha",
  "Wah",
  "Eita to darun",
  "Besh besh",
  "Oho",
  "Hmmm",
  "Areh baba",
  "Ki bolo",
  "Interesting",
  "Ami shunchi",
  "Thik ache",
  "Bujhte parchi"
];

const generalMiddles = [
  "tarpor ki holo",
  "aro kichu bolo",
  "tomar kotha shunte valo lage",
  "ektu details bolo",
  "ami kintu shunchi",
  "golpo ta interesting lagche",
  "erpor ki korle",
  "amar sathe share koro",
  "eta niye aro bolo",
  "tomar kotha mone thakbe"
];

const generalEndings = [
  "😊",
  "❤️",
  "🥰",
  "👀",
  "💕"
];

function buildGeneralReplies() {
  const result = [];

  for (const opener of generalOpeners) {
    for (const middle of generalMiddles) {
      for (const ending of generalEndings) {
        result.push(`${opener}! ${middle} ${ending}`);
      }
    }
  }

  return [...new Set(result)].slice(0, 1000);
}

REPLIES.general = buildGeneralReplies();

// =====================================
// CATEGORY DETECTION
// =====================================

const RULES = [
  {
    category: "greeting",
    keywords: [
      "hi", "hello", "hey", "hii", "helo",
      "assalamualaikum", "salam", "good morning",
      "good night", "good evening", "oi", "oii"
    ]
  },
  {
    category: "love",
    keywords: [
      "valobashi", "bhalobashi", "love you",
      "i love you", "love u", "valo basi",
      "tomake valobashi", "prem kori"
    ]
  },
  {
    category: "miss",
    keywords: [
      "miss you", "miss kori", "mone pore",
      "tomake miss", "miss kortesi", "miss korchi"
    ]
  },
  {
    category: "romantic",
    keywords: [
      "kiss", "kiss dao", "hug dao", "jaan",
      "jan", "babu", "baby", "sona", "shona",
      "kolija", "pakhi", "sweetheart", "darling"
    ]
  },
  {
    category: "flirty",
    keywords: [
      "crush", "cute", "hot", "sexy",
      "flirt", "romantic mood", "impress",
      "date", "propose"
    ]
  },
  {
    category: "funny",
    keywords: [
      "haha", "hahaha", "lol", "lmao",
      "moja", "funny", "joke", "haso",
      "pagol", "gadha", "bandor"
    ]
  },
  {
    category: "emotional",
    keywords: [
      "mon kharap", "kosto", "koshto",
      "sad", "dukho", "dokkho", "eka",
      "kandchi", "kanna", "depressed",
      "valo lagche na", "bhalo lagche na",
      "breakup", "heartbreak"
    ]
  },
  {
    category: "angry",
    keywords: [
      "rag", "ragi", "angry", "ghrina",
      "hate you", "chup", "faltu",
      "baje", "boka", "shut up"
    ]
  },
  {
    category: "attitude",
    keywords: [
      "attitude", "boss", "king", "queen",
      "swag", "style", "ignore", "ego"
    ]
  },
  {
    category: "food",
    keywords: [
      "khaiso", "khaicho", "kheyecho",
      "khaiso", "khabar", "khida",
      "bhat", "biriyani", "pizza",
      "burger", "cha", "coffee", "ranna"
    ]
  },
  {
    category: "relationship",
    keywords: [
      "relationship", "gf", "bf",
      "girlfriend", "boyfriend", "biye",
      "marriage", "husband", "wife",
      "prem", "valobasha", "cheating",
      "loyal", "break up"
    ]
  },
  {
    category: "thanks",
    keywords: [
      "thanks", "thank you", "dhonnobad",
      "tnx", "thnx", "thanku"
    ]
  },
  {
    category: "goodbye",
    keywords: [
      "bye", "goodbye", "tata",
      "allah hafez", "pore kotha hobe",
      "ghumabo", "jacchi"
    ]
  },
  {
    category: "daily",
    keywords: [
      "ki koro", "ki korcho", "ki korteso",
      "ki obostha", "kmn acho", "kemon acho",
      "valo acho", "bhalo acho",
      "ki khobor", "boshe achi",
      "ghum", "porashona", "school", "college"
    ]
  }
];

function detectCategory(text) {
  let bestCategory = "general";
  let bestScore = 0;

  for (const rule of RULES) {
    let score = 0;

    for (const keyword of rule.keywords) {
      const normalizedKeyword = normalizeText(keyword);

      if (
        normalizedKeyword &&
        (` ${text} `).includes(` ${normalizedKeyword} `)
      ) {
        score += normalizedKeyword.includes(" ") ? 3 : 2;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestCategory = rule.category;
    }
  }

  if (bestScore > 0) return bestCategory;

  const questionWords = [
    "ki", "keno", "kothay", "kobe",
    "kivabe", "ke", "koto", "kar",
    "kon", "which", "what", "why",
    "where", "when", "how", "who"
  ];

  if (hasAny(text, questionWords)) {
    return "question";
  }

  return "general";
}

// =====================================
// GROUP TRIGGER CHECK
// =====================================

function isPremaCalled(event, botID) {
  const body = normalizeText(event.body || "");

  if (
    body.includes("prema") ||
    body.includes("প্রেমা")
  ) {
    return true;
  }

  const mentions = event.mentions || {};

  if (botID && Object.prototype.hasOwnProperty.call(mentions, botID)) {
    return true;
  }

  const reply = event.messageReply;

  if (reply && botID && String(reply.senderID) === String(botID)) {
    return true;
  }

  return false;
}

// =====================================
// MAIN CHAT HANDLER
// =====================================

module.exports = {
  config: {
    name: "prema",
    version: "3.0.0",
    author: "Nahid Hasan",
    description: "Bangla Banglish Romantic Chatbot",
    category: "chat",
    role: 0
  },

  onChat: async function ({ event, message, api }) {
    try {
      if (!event || !event.body) return;

      const text = normalizeText(event.body);

      if (!text) return;

      const userID = String(event.senderID || "");
      const threadID = event.threadID;

      if (!userID || !threadID) return;

      const isGroup = Boolean(event.isGroup);

      let botID = "";

      try {
        botID = String(api.getCurrentUserID());
      } catch (e) {}

      // Group-এ Prema-কে ডাকলে তবেই উত্তর
      if (
        isGroup &&
        CONFIG.groupOnlyWhenCalled &&
        !isPremaCalled(event, botID)
      ) {
        return;
      }

      // নিজের মেসেজে উত্তর দেবে না
      if (botID && userID === botID) return;

      const now = Date.now();
      const lastTime = cooldowns.get(userID) || 0;

      if (now - lastTime < CONFIG.cooldown) return;

      cooldowns.set(userID, now);

      const category = detectCategory(text);
      const reply = pickReply(category, userID);

      const delay =
        CONFIG.minDelay +
        Math.floor(
          Math.random() * (CONFIG.maxDelay - CONFIG.minDelay + 1)
        );

      setTimeout(async () => {
        try {
          if (message && typeof message.reply === "function") {
            await message.reply(reply);
          } else {
            api.sendMessage(reply, threadID);
          }
        } catch (error) {
          console.error("[PREMA SEND ERROR]", error);
        }
      }, delay);

    } catch (error) {
      console.error("[PREMA ERROR]", error);
    }
  }
};
