
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

// Banglish normalization
function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[.,!?;:'"()[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
    "Hmm, bujhlam! Tarpor ki holo?",
    "Sotti naki? Ektu details bolo! 👀",
    "Tomar kotha shunte amar valo lage! ❤️",
    "Accha, tarpor?",
    "Hehe! Besh to! 😂",
    "Ami shunchi, bolo! 💗",
    "Ektu bujhiye bolo toh! 🙈"
  ]
};

// Detect message category
function detectCategory(text) {
  const normalized = normalizeText(text);

  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => normalized.includes(word))) {
      return category;
    }
  }

  return "general";
}

// Avoid repeated replies
function getReply(threadID, senderID, category) {
  const pool = replies[category] || replies.general;
  const key = `${threadID}_${senderID}`;

  let previous = lastReplies.get(key);

  let available = pool.filter(reply => reply !== previous);

  if (available.length === 0) {
    available = pool;
  }

  const selected = available[random(0, available.length - 1)];

  lastReplies.set(key, selected);

  return selected;
}

module.exports = {
  config: {
    name: CONFIG.name,
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

      // Ignore bot's own messages
      const botID = api.getCurrentUserID();

      if (String(senderID) === String(botID)) return;

      // Ignore commands
      if (body.trim().startsWith("/")) return;

      const isGroup = event.isGroup === true;

      // In groups, reply only when Prema is called
      // or someone replies to Prema's message
      if (isGroup) {
        const mentions = event.mentions || {};
        const mentionedPrema = Object.values(mentions)
          .some(id => String(id) === String(botID));

        const calledPrema = /\bprema\b|প্রেমা/i.test(body);

        const repliedToPrema =
          event.messageReply &&
          String(event.messageReply.senderID) === String(botID);

        if (!mentionedPrema && !calledPrema && !repliedToPrema) {
          return;
        }
      }

      // Cooldown to avoid rapid repeated replies
      const cooldownKey = `${threadID}_${senderID}`;
      const now = Date.now();

      const previousTime = userCooldown.get(cooldownKey) || 0;

      if (now - previousTime < CONFIG.cooldown) return;

      userCooldown.set(cooldownKey, now);

      // Remove Prema's name before detecting category
      const cleanBody = body
        .replace(/\bprema\b/gi, "")
        .replace(/প্রেমা/g, "")
        .trim();

      const finalBody = cleanBody || body;

      const category = detectCategory(finalBody);

      const reply = getReply(threadID, senderID, category);

      // Natural response delay for conversation pacing
      await sleep(random(CONFIG.minDelay, CONFIG.maxDelay));

      await message.reply(reply);

    } catch (error) {
      console.error("PREMA CHAT ERROR:", error);
    }
  }
};
