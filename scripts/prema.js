// ============================================
// PREMA AI GROUP BOT
// MAIN CONVERSATION ENGINE
// PART 1 - INITIALIZATION & CORE UTILITIES
// ============================================

const fs = require("fs-extra");
const path = require("path");

const memory = require("./premaMemory");
const premaData = require("./premaData");

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  name: "prema",
  version: "1.0.0",

  minDelay: 1200,
  maxDelay: 2800,

  maxMessageLength: 1500,
  maxReplyHistory: 15,

  enableMemory: true,
  enableFollowUp: true,
  enableFuzzyMatch: true,
  enableEmoji: true,

  defaultLanguage: "banglish",

  triggerNames: [
    "prema",
    "prem",
    "প্রেমা",
    "প্রেম"
  ],

  ownerOnly: false
};

// ============================================
// INTERNAL STATE
// ============================================

const STATE = {
  lastReplies: new Map(),
  lastMessages: new Map(),
  processing: new Set(),
  cooldowns: new Map(),
  userSessions: new Map()
};

// ============================================
// TEXT NORMALIZATION
// ============================================

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ============================================
// SAFE STRING
// ============================================

function safeString(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

// ============================================
// RANDOM NUMBER
// ============================================

function randomNumber(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}

// ============================================
// RANDOM ITEM
// ============================================

function randomItem(array) {
  if (!Array.isArray(array) || !array.length) {
    return null;
  }

  return array[
    Math.floor(Math.random() * array.length)
  ];
}

// ============================================
// TEXT MATCHING
// ============================================

function containsKeyword(message, keyword) {
  const text = normalizeText(message);
  const word = normalizeText(keyword);

  if (!text || !word) return false;

  return text.includes(word);
}

// ============================================
// MULTIPLE KEYWORD MATCHING
// ============================================

function containsAnyKeyword(message, keywords) {
  if (!Array.isArray(keywords)) {
    return false;
  }

  return keywords.some(keyword => {
    return containsKeyword(message, keyword);
  });
}

// ============================================
// CHECK PREMA NAME
// ============================================

function isPremaName(message) {
  const text = normalizeText(message);

  if (!text) return false;

  return CONFIG.triggerNames.some(name => {
    return text.includes(normalizeText(name));
  });
}

// ============================================
// GET USER IDENTIFIER
// ============================================

function getUserIdentifier(event) {
  return {
    threadID: safeString(event.threadID),
    senderID: safeString(event.senderID)
  };
}

// ============================================
// GET MESSAGE TEXT
// ============================================

function getMessageText(event) {
  return safeString(event.body).slice(
    0,
    CONFIG.maxMessageLength
  );
}

// ============================================
// CHECK EMPTY MESSAGE
// ============================================

function isEmptyMessage(message) {
  return !normalizeText(message);
}

// ============================================
// GET CATEGORY DATABASE
// ============================================

function getCategories() {
  if (
    premaData &&
    premaData.categories &&
    typeof premaData.categories === "object"
  ) {
    return premaData.categories;
  }

  return {};
}

// ============================================
// GET CATEGORY DATA
// ============================================

function getCategory(categoryName) {
  const categories = getCategories();

  return categories[categoryName] || null;
}

// ============================================
// CHECK CATEGORY EXISTS
// ============================================

function categoryExists(categoryName) {
  return Boolean(getCategory(categoryName));
}

// ============================================
// GET USER MEMORY
// ============================================

function getUserMemory(threadID, senderID) {
  if (!CONFIG.enableMemory) {
    return null;
  }

  return memory.getUser(threadID, senderID);
}

// ============================================
// ADD USER MESSAGE TO MEMORY
// ============================================

function rememberUserMessage(
  threadID,
  senderID,
  message
) {
  if (!CONFIG.enableMemory) return false;

  memory.addMessage(
    threadID,
    senderID,
    "user",
    message
  );

  memory.updateInteraction(
    threadID,
    senderID
  );

  return true;
}

// ============================================
// ADD PREMA REPLY TO MEMORY
// ============================================

function rememberPremaReply(
  threadID,
  senderID,
  reply
) {
  if (!CONFIG.enableMemory) return false;

  memory.addMessage(
    threadID,
    senderID,
    "assistant",
    reply
  );

  memory.setLastReply(
    threadID,
    senderID,
    reply
  );

  return true;
}

// ============================================
// GET CONVERSATION HISTORY
// ============================================

function getConversationHistory(threadID, senderID) {
  if (!CONFIG.enableMemory) return [];

  return memory.getHistory(
    threadID,
    senderID
  );
}

// ============================================
// GENERATE UNIQUE USER KEY
// ============================================

function getConversationKey(threadID, senderID) {
  return `${threadID}:${senderID}`;
}

// ============================================
// CHECK PROCESSING STATUS
// ============================================

function isUserProcessing(threadID, senderID) {
  return STATE.processing.has(
    getConversationKey(threadID, senderID)
  );
}

// ============================================
// SET PROCESSING STATUS
// ============================================

function setProcessing(threadID, senderID, status) {
  const key = getConversationKey(threadID, senderID);

  if (status) {
    STATE.processing.add(key);
  } else {
    STATE.processing.delete(key);
  }
}

// ============================================
// CHECK COOLDOWN
// ============================================

function isOnCooldown(threadID, senderID) {
  const key = getConversationKey(threadID, senderID);

  const lastTime = STATE.cooldowns.get(key) || 0;

  return Date.now() - lastTime < CONFIG.minDelay;
}

// ============================================
// SET COOLDOWN
// ============================================

function setCooldown(threadID, senderID) {
  const key = getConversationKey(threadID, senderID);

  STATE.cooldowns.set(key, Date.now());
}

// ============================================
// RANDOM RESPONSE DELAY
// ============================================

function getResponseDelay() {
  return randomNumber(
    CONFIG.minDelay,
    CONFIG.maxDelay
  );
}

// ============================================
// EXPORT INITIAL ENGINE
// ============================================

module.exports = {
  config: {
    name: "prema",
    version: "1.0.0",
    author: "Prema AI",
    role: 0,
    shortDescription: "Prema Group Conversation Bot",
    longDescription: "Romantic, funny and conversational group bot",
    category: "chat",
    guide: {
      en: "Call Prema by name or mention to start a conversation."
    }
  },

  onStart: async function ({ api, event }) {
    return api.sendMessage(
      "Hey! Ami Prema! ❤️ Amake daklei ami kotha bolbo! 😊",
      event.threadID
    );
  }
};

// ============================================
// EXPORT INTERNAL FUNCTIONS FOR NEXT PARTS
// ============================================

Object.assign(module.exports, {
  CONFIG,
  STATE,
  normalizeText,
  safeString,
  randomNumber,
  randomItem,
  containsKeyword,
  containsAnyKeyword,
  isPremaName,
  getUserIdentifier,
  getMessageText,
  isEmptyMessage,
  getCategories,
  getCategory,
  categoryExists,
  getUserMemory,
  rememberUserMessage,
  rememberPremaReply,
  getConversationHistory,
  getConversationKey,
  isUserProcessing,
  setProcessing,
  isOnCooldown,
  setCooldown,
  getResponseDelay
});

console.log("[PREMA] Conversation Engine initialized.");
// ============================================
// PART 2 - ADVANCED KEYWORD MATCHING SYSTEM
// ============================================

// --------------------------------------------
// TEXT ALIASES
// --------------------------------------------

const TEXT_ALIASES = {
  "kmn": "kemon",
  "kmon": "kemon",
  "kemon": "kemon",
  "kmn": "kemon",

  "aso": "acho",
  "acho": "acho",
  "achis": "acho",
  "accho": "acho",

  "tmi": "tumi",
  "tmr": "tomar",
  "amr": "amar",
  "ami": "ami",

  "valo": "bhalo",
  "vhalo": "bhalo",
  "bhalo": "bhalo",
  "valobasha": "bhalobasha",
  "vlobashi": "bhalobashi",

  "kno": "keno",
  "kn": "keno",
  "kivabe": "kibhabe",
  "kivbe": "kibhabe",
  "kirokom": "kemon",

  "nai": "nei",
  "naii": "nei",
  "ase": "ache",
  "asee": "ache",

  "plz": "please",
  "pls": "please",
  "thx": "thanks",
  "tnx": "thanks",

  "hmm": "hmm",
  "hmmm": "hmm",
  "hmmmm": "hmm",

  "naah": "na",
  "nah": "na",
  "haa": "ha",
  "hya": "ha",
  "ji": "ha",

  "gf": "girlfriend",
  "bf": "boyfriend",
  "crushh": "crush",
  "frnd": "friend",
  "frndz": "friends",

  "gn": "goodnight",
  "gm": "goodmorning",
  "tc": "takecare"
};

// --------------------------------------------
// NORMALIZE ALIASES
// --------------------------------------------

function normalizeAliases(message) {
  const words = normalizeText(message).split(" ");

  return words.map(word => {
    return TEXT_ALIASES[word] || word;
  }).join(" ");
}

// --------------------------------------------
// TOKENIZE MESSAGE
// --------------------------------------------

function tokenizeMessage(message) {
  return normalizeAliases(message)
    .split(" ")
    .filter(Boolean);
}

// --------------------------------------------
// REMOVE COMMON WORDS
// --------------------------------------------

const STOP_WORDS = new Set([
  "ami",
  "tumi",
  "amar",
  "tomar",
  "amake",
  "tomake",
  "ki",
  "keno",
  "kobe",
  "kothay",
  "kivabe",
  "ar",
  "ebong",
  "to",
  "ta",
  "the",
  "a",
  "an",
  "is",
  "are",
  "was",
  "were",
  "please",
  "plz",
  "just",
  "ekta",
  "akta",
  "ektu",
  "onek",
  "onekta",
  "na",
  "ha"
]);

function removeStopWords(tokens) {
  return tokens.filter(word => !STOP_WORDS.has(word));
}

// --------------------------------------------
// SIMPLE SIMILARITY SCORE
// --------------------------------------------

function calculateSimilarity(text, keyword) {
  const a = normalizeAliases(text);
  const b = normalizeAliases(keyword);

  if (!a || !b) return 0;

  if (a === b) return 100;

  if (a.includes(b)) return 90;

  if (b.includes(a)) return 85;

  const wordsA = new Set(tokenizeMessage(a));
  const wordsB = new Set(tokenizeMessage(b));

  const intersection = [...wordsA].filter(word => {
    return wordsB.has(word);
  });

  const union = new Set([...wordsA, ...wordsB]);

  if (!union.size) return 0;

  return Math.round(
    (intersection.length / union.size) * 100
  );
}

// --------------------------------------------
// KEYWORD COLLECTION
// --------------------------------------------

function getCategoryKeywords(category) {
  if (!category || typeof category !== "object") {
    return [];
  }

  const keywords = [];

  if (Array.isArray(category.keywords)) {
    keywords.push(...category.keywords);
  }

  if (Array.isArray(category.triggers)) {
    keywords.push(...category.triggers);
  }

  if (Array.isArray(category.questions)) {
    keywords.push(...category.questions);
  }

  return [...new Set(
    keywords
      .map(safeString)
      .filter(Boolean)
  )];
}

// --------------------------------------------
// MATCH ONE CATEGORY
// --------------------------------------------

function matchCategory(message, categoryName, category) {
  const keywords = getCategoryKeywords(category);

  if (!keywords.length) {
    return {
      category: categoryName,
      score: 0,
      matchedKeyword: null
    };
  }

  let bestScore = 0;
  let matchedKeyword = null;

  for (const keyword of keywords) {
    const score = calculateSimilarity(message, keyword);

    if (score > bestScore) {
      bestScore = score;
      matchedKeyword = keyword;
    }
  }

  return {
    category: categoryName,
    score: bestScore,
    matchedKeyword
  };
}

// --------------------------------------------
// MATCH ALL CATEGORIES
// --------------------------------------------

function findMatchingCategories(message) {
  const categories = getCategories();
  const results = [];

  for (const [name, category] of Object.entries(categories)) {
    const result = matchCategory(
      message,
      name,
      category
    );

    if (result.score > 0) {
      results.push(result);
    }
  }

  return results.sort((a, b) => {
    return b.score - a.score;
  });
}

// --------------------------------------------
// GET BEST MATCH
// --------------------------------------------

function findBestCategory(message) {
  const results = findMatchingCategories(message);

  if (!results.length) {
    return null;
  }

  const best = results[0];

  if (best.score < 35) {
    return null;
  }

  return best;
}

// --------------------------------------------
// EXACT KEYWORD MATCH
// --------------------------------------------

function findExactKeywordMatch(message) {
  const text = normalizeAliases(message);
  const categories = getCategories();

  for (const [name, category] of Object.entries(categories)) {
    const keywords = getCategoryKeywords(category);

    for (const keyword of keywords) {
      const normalizedKeyword = normalizeAliases(keyword);

      if (
        normalizedKeyword &&
        text.includes(normalizedKeyword)
      ) {
        return {
          category: name,
          keyword,
          score: 100
        };
      }
    }
  }

  return null;
}

// --------------------------------------------
// GET MATCH CONFIDENCE
// --------------------------------------------

function getMatchConfidence(score) {
  if (score >= 85) return "very_high";
  if (score >= 65) return "high";
  if (score >= 45) return "medium";
  if (score >= 35) return "low";

  return "none";
}

// --------------------------------------------
// DETECT MESSAGE TYPE
// --------------------------------------------

function detectMessageType(message) {
  const text = normalizeText(message);

  if (!text) return "empty";

  if (
    text.endsWith("?") ||
    /^(ki|keno|kobe|kothay|ke|kar|kemon|kibhabe)\b/.test(text)
  ) {
    return "question";
  }

  if (
    /^(hi|hello|hey|hii|assalamu alaikum|salam)\b/.test(text)
  ) {
    return "greeting";
  }

  if (
    /\b(love|bhalobashi|valobashi|miss kori|miss you)\b/.test(text)
  ) {
    return "romantic";
  }

  if (
    /\b(kosto|mon kharap|sad|dukho|kandchi|eka)\b/.test(text)
  ) {
    return "emotional";
  }

  return "general";
}

// --------------------------------------------
// GET MESSAGE KEYWORDS
// --------------------------------------------

function getImportantKeywords(message) {
  const tokens = tokenizeMessage(message);

  return removeStopWords(tokens);
}

// --------------------------------------------
// CHECK KEYWORD OVERLAP
// --------------------------------------------

function hasKeywordOverlap(messageA, messageB) {
  const a = new Set(getImportantKeywords(messageA));
  const b = new Set(getImportantKeywords(messageB));

  return [...a].some(word => b.has(word));
}

// --------------------------------------------
// FIND SIMILAR CATEGORY
// --------------------------------------------

function findSimilarCategory(message) {
  const result = findBestCategory(message);

  if (!result) return null;

  return {
    name: result.category,
    score: result.score,
    confidence: getMatchConfidence(result.score),
    keyword: result.matchedKeyword
  };
}

// --------------------------------------------
// EXPORT PART 2 FUNCTIONS
// --------------------------------------------

Object.assign(module.exports, {
  TEXT_ALIASES,
  STOP_WORDS,
  normalizeAliases,
  tokenizeMessage,
  removeStopWords,
  calculateSimilarity,
  getCategoryKeywords,
  matchCategory,
  findMatchingCategories,
  findBestCategory,
  findExactKeywordMatch,
  getMatchConfidence,
  detectMessageType,
  getImportantKeywords,
  hasKeywordOverlap,
  findSimilarCategory
});

console.log("[PREMA] Advanced Keyword Matching loaded.");
// ============================================
// PART 3 - SMART REPLY SELECTION SYSTEM
// ============================================

// --------------------------------------------
// REPLY CONFIGURATION
// --------------------------------------------

const REPLY_CONFIG = {
  minLength: 2,
  maxLength: 1000,
  avoidRepeated: true,
  emojiAtEnd: true,
  maxAttempts: 10
};

// --------------------------------------------
// EMOJI DATABASE
// --------------------------------------------

const PREMA_EMOJIS = [
  "❤️",
  "🥰",
  "😊",
  "😘",
  "💕",
  "✨",
  "🌸",
  "😌",
  "🤭",
  "💗",
  "🫶",
  "😍",
  "😉",
  "💖",
  "🌷",
  "😇",
  "🥹",
  "💞",
  "😜",
  "🤍"
];

// --------------------------------------------
// GET CATEGORY REPLIES
// --------------------------------------------

function getCategoryReplies(categoryName) {
  const category = getCategory(categoryName);

  if (!category || typeof category !== "object") {
    return [];
  }

  const possibleFields = [
    "replies",
    "responses",
    "answers",
    "messages"
  ];

  for (const field of possibleFields) {
    if (Array.isArray(category[field])) {
      return category[field]
        .map(safeString)
        .filter(reply => {
          return reply.length >= REPLY_CONFIG.minLength &&
            reply.length <= REPLY_CONFIG.maxLength;
        });
    }
  }

  return [];
}

// --------------------------------------------
// CHECK REPLY VALIDITY
// --------------------------------------------

function isValidReply(reply) {
  if (typeof reply !== "string") {
    return false;
  }

  const text = reply.trim();

  if (
    text.length < REPLY_CONFIG.minLength ||
    text.length > REPLY_CONFIG.maxLength
  ) {
    return false;
  }

  if (!normalizeText(text)) {
    return false;
  }

  return true;
}

// --------------------------------------------
// GET USER REPLY HISTORY
// --------------------------------------------

function getUserReplyHistory(threadID, senderID) {
  const key = getConversationKey(threadID, senderID);

  return STATE.lastReplies.get(key) || [];
}

// --------------------------------------------
// SAVE REPLY HISTORY
// --------------------------------------------

function saveReplyHistory(threadID, senderID, reply) {
  const key = getConversationKey(threadID, senderID);

  let history = getUserReplyHistory(
    threadID,
    senderID
  );

  history = history.filter(item => item !== reply);

  history.push(reply);

  if (history.length > CONFIG.maxReplyHistory) {
    history = history.slice(-CONFIG.maxReplyHistory);
  }

  STATE.lastReplies.set(key, history);

  return true;
}

// --------------------------------------------
// CHECK REPEATED REPLY
// --------------------------------------------

function isRepeatedReply(threadID, senderID, reply) {
  if (!REPLY_CONFIG.avoidRepeated) {
    return false;
  }

  const history = getUserReplyHistory(
    threadID,
    senderID
  );

  return history.includes(reply);
}

// --------------------------------------------
// ADD EMOJI TO REPLY
// --------------------------------------------

function addReplyEmoji(reply) {
  let text = safeString(reply).trim();

  if (!text || !REPLY_CONFIG.emojiAtEnd) {
    return text;
  }

  const hasEmoji = /[\p{Extended_Pictographic}]/u.test(text);

  if (hasEmoji) {
    return text;
  }

  const emoji = randomItem(PREMA_EMOJIS);

  return `${text} ${emoji}`;
}

// --------------------------------------------
// SELECT UNIQUE REPLY
// --------------------------------------------

function selectUniqueReply(
  replies,
  threadID,
  senderID
) {
  if (!Array.isArray(replies) || !replies.length) {
    return null;
  }

  const validReplies = replies.filter(isValidReply);

  if (!validReplies.length) {
    return null;
  }

  const availableReplies = validReplies.filter(reply => {
    return !isRepeatedReply(
      threadID,
      senderID,
      reply
    );
  });

  const selected = randomItem(
    availableReplies.length
      ? availableReplies
      : validReplies
  );

  return selected || null;
}

// --------------------------------------------
// GET SMART CATEGORY REPLY
// --------------------------------------------

function getSmartCategoryReply(
  categoryName,
  threadID,
  senderID
) {
  const replies = getCategoryReplies(categoryName);

  if (!replies.length) {
    return null;
  }

  const selected = selectUniqueReply(
    replies,
    threadID,
    senderID
  );

  if (!selected) {
    return null;
  }

  const finalReply = addReplyEmoji(selected);

  saveReplyHistory(
    threadID,
    senderID,
    selected
  );

  return finalReply;
}

// --------------------------------------------
// GET REPLY FROM MATCH RESULT
// --------------------------------------------

function getReplyFromMatch(
  match,
  threadID,
  senderID
) {
  if (!match || !match.category) {
    return null;
  }

  return getSmartCategoryReply(
    match.category,
    threadID,
    senderID
  );
}

// --------------------------------------------
// GET RANDOM REPLY FROM ALL CATEGORIES
// --------------------------------------------

function getRandomCategoryReply(
  threadID,
  senderID
) {
  const categories = getCategories();

  const names = Object.keys(categories);

  if (!names.length) {
    return null;
  }

  const shuffled = names.sort(() => Math.random() - 0.5);

  for (const name of shuffled) {
    const reply = getSmartCategoryReply(
      name,
      threadID,
      senderID
    );

    if (reply) {
      return reply;
    }
  }

  return null;
}

// --------------------------------------------
// RESET USER REPLY HISTORY
// --------------------------------------------

function resetReplyHistory(threadID, senderID) {
  const key = getConversationKey(threadID, senderID);

  STATE.lastReplies.delete(key);

  return true;
}

// --------------------------------------------
// GET REPLY STATISTICS
// --------------------------------------------

function getReplyStatistics(threadID, senderID) {
  const history = getUserReplyHistory(
    threadID,
    senderID
  );

  return {
    totalReplies: history.length,
    uniqueReplies: new Set(history).size,
    recentReplies: history.slice(-5)
  };
}

// --------------------------------------------
// FINAL REPLY BUILDER
// --------------------------------------------

function buildFinalReply(
  reply,
  threadID,
  senderID
) {
  if (!isValidReply(reply)) {
    return null;
  }

  const finalReply = addReplyEmoji(reply);

  saveReplyHistory(
    threadID,
    senderID,
    reply
  );

  return finalReply;
}

// --------------------------------------------
// EXPORT PART 3
// --------------------------------------------

Object.assign(module.exports, {
  REPLY_CONFIG,
  PREMA_EMOJIS,
  getCategoryReplies,
  isValidReply,
  getUserReplyHistory,
  saveReplyHistory,
  isRepeatedReply,
  addReplyEmoji,
  selectUniqueReply,
  getSmartCategoryReply,
  getReplyFromMatch,
  getRandomCategoryReply,
  resetReplyHistory,
  getReplyStatistics,
  buildFinalReply
});

console.log("[PREMA] Smart Reply Selection loaded.");
// ============================================
// PART 4 - CONVERSATION CONTEXT & FOLLOW-UP
// ============================================

// --------------------------------------------
// CONTEXT CONFIGURATION
// --------------------------------------------

const CONTEXT_CONFIG = {
  maxTopics: 15,
  maxContextMessages: 20,
  followUpThreshold: 2,
  contextExpiry: 30 * 60 * 1000
};

// --------------------------------------------
// FOLLOW-UP PHRASES
// --------------------------------------------

const FOLLOW_UP_PHRASES = [
  "tarpor",
  "tarpor ki",
  "then",
  "erpor",
  "erpor ki",
  "accha tarpor",
  "bujhlam",
  "bujhchi",
  "hmm",
  "hmm bolo",
  "bolo",
  "bolo na",
  "ki holo",
  "ki hoyeche",
  "keno",
  "keno bolo",
  "karon",
  "ki bolle",
  "mane",
  "mane ki",
  "aro bolo",
  "details bolo",
  "sotti",
  "tai naki",
  "achha",
  "acha",
  "hmm accha",
  "r tarpor",
  "ar tarpor",
  "ki bolte chao",
  "continue",
  "continue koro"
];

// --------------------------------------------
// SHORT FOLLOW-UP WORDS
// --------------------------------------------

const SHORT_FOLLOW_UPS = new Set([
  "keno",
  "karon",
  "tarpor",
  "erpor",
  "bolo",
  "hmm",
  "acha",
  "accha",
  "mane",
  "sotti",
  "tai",
  "ki",
  "kivabe",
  "kokhon",
  "kothay",
  "aro",
  "then"
]);

// --------------------------------------------
// GET CONVERSATION CONTEXT
// --------------------------------------------

function getConversationContextData(threadID, senderID) {
  const key = getConversationKey(threadID, senderID);

  let context = STATE.userSessions.get(key);

  if (!context) {
    context = {
      topics: [],
      messages: [],
      lastCategory: null,
      lastUserMessage: "",
      lastBotReply: "",
      lastQuestion: "",
      lastUpdated: Date.now(),
      followUpCount: 0,
      conversationStarted: Date.now()
    };

    STATE.userSessions.set(key, context);
  }

  return context;
}

// --------------------------------------------
// UPDATE CONVERSATION CONTEXT
// --------------------------------------------

function updateConversationContext(
  threadID,
  senderID,
  role,
  message
) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  const entry = {
    role,
    message: safeString(message),
    timestamp: Date.now()
  };

  context.messages.push(entry);

  if (context.messages.length > CONTEXT_CONFIG.maxContextMessages) {
    context.messages = context.messages.slice(
      -CONTEXT_CONFIG.maxContextMessages
    );
  }

  if (role === "user") {
    context.lastUserMessage = entry.message;
  }

  if (role === "assistant") {
    context.lastBotReply = entry.message;
  }

  if (role === "user" && entry.message.includes("?")) {
    context.lastQuestion = entry.message;
  }

  context.lastUpdated = Date.now();

  return context;
}

// --------------------------------------------
// SAVE CURRENT CATEGORY
// --------------------------------------------

function setCurrentConversationCategory(
  threadID,
  senderID,
  category
) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  context.lastCategory = category;
  context.lastUpdated = Date.now();

  return true;
}

// --------------------------------------------
// GET CURRENT CATEGORY
// --------------------------------------------

function getCurrentConversationCategory(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  return context.lastCategory;
}

// --------------------------------------------
// ADD TOPIC TO CONTEXT
// --------------------------------------------

function addConversationTopic(
  threadID,
  senderID,
  topic
) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  const normalizedTopic = normalizeText(topic);

  if (!normalizedTopic) return false;

  context.topics = context.topics.filter(item => {
    return item.topic !== normalizedTopic;
  });

  context.topics.push({
    topic: normalizedTopic,
    timestamp: Date.now()
  });

  if (context.topics.length > CONTEXT_CONFIG.maxTopics) {
    context.topics.shift();
  }

  context.lastUpdated = Date.now();

  return true;
}

// --------------------------------------------
// GET RECENT TOPICS
// --------------------------------------------

function getRecentConversationTopics(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  return context.topics.map(item => item.topic);
}

// --------------------------------------------
// CHECK FOLLOW-UP MESSAGE
// --------------------------------------------

function isFollowUpMessage(message) {
  const text = normalizeAliases(message);

  if (!text) return false;

  if (FOLLOW_UP_PHRASES.some(phrase => {
    return text === normalizeAliases(phrase);
  })) {
    return true;
  }

  const tokens = tokenizeMessage(text);

  if (
    tokens.length <= CONTEXT_CONFIG.followUpThreshold &&
    tokens.some(word => SHORT_FOLLOW_UPS.has(word))
  ) {
    return true;
  }

  return false;
}

// --------------------------------------------
// CHECK CONTEXT EXPIRY
// --------------------------------------------

function isContextExpired(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  return Date.now() - context.lastUpdated >
    CONTEXT_CONFIG.contextExpiry;
}

// --------------------------------------------
// CLEAR EXPIRED CONTEXT
// --------------------------------------------

function clearExpiredContext(threadID, senderID) {
  const key = getConversationKey(threadID, senderID);

  if (isContextExpired(threadID, senderID)) {
    STATE.userSessions.delete(key);
    return true;
  }

  return false;
}

// --------------------------------------------
// GET LAST USER MESSAGE FROM CONTEXT
// --------------------------------------------

function getContextLastUserMessage(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  return context.lastUserMessage;
}

// --------------------------------------------
// GET LAST BOT REPLY FROM CONTEXT
// --------------------------------------------

function getContextLastBotReply(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  return context.lastBotReply;
}

// --------------------------------------------
// GET LAST QUESTION FROM CONTEXT
// --------------------------------------------

function getContextLastQuestion(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  return context.lastQuestion;
}

// --------------------------------------------
// GET FOLLOW-UP CONTEXT
// --------------------------------------------

function getFollowUpContext(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  return {
    previousMessage: context.lastUserMessage,
    previousReply: context.lastBotReply,
    previousQuestion: context.lastQuestion,
    previousCategory: context.lastCategory,
    recentTopics: getRecentConversationTopics(
      threadID,
      senderID
    )
  };
}

// --------------------------------------------
// INCREASE FOLLOW-UP COUNT
// --------------------------------------------

function increaseFollowUpCount(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  context.followUpCount++;

  return context.followUpCount;
}

// --------------------------------------------
// RESET FOLLOW-UP COUNT
// --------------------------------------------

function resetFollowUpCount(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  context.followUpCount = 0;

  return true;
}

// --------------------------------------------
// GET CONTEXT SUMMARY
// --------------------------------------------

function getContextSummary(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  return {
    totalMessages: context.messages.length,
    totalTopics: context.topics.length,
    lastCategory: context.lastCategory,
    lastUserMessage: context.lastUserMessage,
    lastBotReply: context.lastBotReply,
    lastUpdated: context.lastUpdated,
    followUpCount: context.followUpCount
  };
}

// --------------------------------------------
// RESET USER CONVERSATION CONTEXT
// --------------------------------------------

function resetConversationContext(threadID, senderID) {
  const key = getConversationKey(threadID, senderID);

  STATE.userSessions.delete(key);

  return true;
}

// --------------------------------------------
// GET CONTEXT MESSAGES
// --------------------------------------------

function getContextMessages(threadID, senderID, limit = 10) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  return context.messages.slice(-Math.max(0, limit));
}

// --------------------------------------------
// FIND RELATED PREVIOUS MESSAGE
// --------------------------------------------

function findRelatedPreviousMessage(
  threadID,
  senderID,
  currentMessage
) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  const previousMessages = context.messages
    .filter(item => item.role === "user")
    .slice(-10);

  let bestMessage = null;
  let bestScore = 0;

  for (const item of previousMessages) {
    const score = calculateSimilarity(
      currentMessage,
      item.message
    );

    if (score > bestScore) {
      bestScore = score;
      bestMessage = item.message;
    }
  }

  return bestScore >= 25
    ? {
        message: bestMessage,
        score: bestScore
      }
    : null;
}

// --------------------------------------------
// DETERMINE CONVERSATION FLOW
// --------------------------------------------

function detectConversationFlow(threadID, senderID, message) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  if (isFollowUpMessage(message)) {
    return "follow_up";
  }

  if (!context.lastUserMessage) {
    return "new_conversation";
  }

  if (
    hasKeywordOverlap(
      message,
      context.lastUserMessage
    )
  ) {
    return "same_topic";
  }

  return "new_topic";
}

// --------------------------------------------
// EXPORT PART 4
// --------------------------------------------

Object.assign(module.exports, {
  CONTEXT_CONFIG,
  FOLLOW_UP_PHRASES,
  SHORT_FOLLOW_UPS,
  getConversationContextData,
  updateConversationContext,
  setCurrentConversationCategory,
  getCurrentConversationCategory,
  addConversationTopic,
  getRecentConversationTopics,
  isFollowUpMessage,
  isContextExpired,
  clearExpiredContext,
  getContextLastUserMessage,
  getContextLastBotReply,
  getContextLastQuestion,
  getFollowUpContext,
  increaseFollowUpCount,
  resetFollowUpCount,
  getContextSummary,
  resetConversationContext,
  getContextMessages,
  findRelatedPreviousMessage,
  detectConversationFlow
});

console.log("[PREMA] Conversation Context System loaded.");
// ============================================
// PART 5 - SMART EMOTION & MOOD DETECTION
// ============================================

const MOOD_CONFIG = {
  confidenceThreshold: 30,
  maxMoodHistory: 20
};

// --------------------------------------------
// MOOD KEYWORDS
// --------------------------------------------

const MOOD_KEYWORDS = {
  happy: [
    "valo lagche",
    "bhalo lagche",
    "onek khushi",
    "khushi achi",
    "happy",
    "moja lagche",
    "haschi",
    "darun lagche",
    "ajke valo",
    "mon valo",
    "excited",
    "awesome",
    "great",
    "mast",
    "joss",
    "alhamdulillah valo"
  ],

  sad: [
    "mon kharap",
    "kosto hocche",
    "koshto hocche",
    "dukho",
    "sad",
    "kandchi",
    "kanna pacche",
    "valo lagche na",
    "kichu valo lage na",
    "eka lagche",
    "heart broken",
    "broken heart",
    "depressed",
    "chokhe pani",
    "khub kosto"
  ],

  angry: [
    "rag hoyeche",
    "rag kore achi",
    "onek rag",
    "matha gorom",
    "angry",
    "irritated",
    "birakto",
    "sojjo hocche na",
    "ghenna lage",
    "rude",
    "mood off"
  ],

  romantic: [
    "bhalobashi",
    "valobashi",
    "love you",
    "miss kori",
    "miss you",
    "tomake chai",
    "tomar kotha mone pore",
    "crush",
    "prem kori",
    "romantic",
    "moner manush",
    "jan pakhi",
    "kolija"
  ],

  lonely: [
    "eka achi",
    "eka lagche",
    "keu nei",
    "keu bujhe na",
    "keu amar nai",
    "alone",
    "lonely",
    "kotha bolar keu nei",
    "ignore kore",
    "sobai dure"
  ],

  tired: [
    "onek tired",
    "klanto",
    "ghum pacche",
    "ghum asche",
    "energy nei",
    "ar parchi na",
    "exhausted",
    "matha betha",
    "rest chai",
    "bishram chai"
  ],

  confused: [
    "bujhte parchi na",
    "confused",
    "ki korbo",
    "ki je kori",
    "decision nite parchi na",
    "mathay dhukche na",
    "golmele",
    "confusion",
    "ki hocche"
  ],

  worried: [
    "chinta hocche",
    "tension hocche",
    "worried",
    "anxiety",
    "voy lagche",
    "ki hobe",
    "future niye chinta",
    "onek tension",
    "stress hocche"
  ],

  shy: [
    "lojja lagche",
    "lajja pacche",
    "shy",
    "blush korchi",
    "ki lojja",
    "mukh lal",
    "bolte lojja lage"
  ],

  excited: [
    "excited",
    "onek moja",
    "wait korte parchi na",
    "darun kichu",
    "khub excited",
    "party",
    "celebrate",
    "ready"
  ],

  neutral: [
    "normal",
    "thik achi",
    "motamuti",
    "chole jacche",
    "same as usual",
    "kichu na",
    "nothing special"
  ]
};

// --------------------------------------------
// DETECT ONE MOOD
// --------------------------------------------

function detectMood(message) {
  const text = normalizeAliases(message);

  if (!text) return {
    mood: "neutral",
    confidence: 0
  };

  const scores = {};

  for (const [mood, keywords] of Object.entries(MOOD_KEYWORDS)) {
    let score = 0;

    for (const keyword of keywords) {
      const normalizedKeyword = normalizeAliases(keyword);

      if (text.includes(normalizedKeyword)) {
        score += normalizedKeyword.split(" ").length * 10;
      }
    }

    scores[mood] = score;
  }

  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1]);

  if (!sorted.length || sorted[0][1] === 0) {
    return {
      mood: "neutral",
      confidence: 0
    };
  }

  const [mood, score] = sorted[0];

  return {
    mood: score >= MOOD_CONFIG.confidenceThreshold
      ? mood
      : "neutral",
    confidence: Math.min(score, 100)
  };
}

// --------------------------------------------
// DETECT MULTIPLE MOODS
// --------------------------------------------

function detectMultipleMoods(message) {
  const text = normalizeAliases(message);
  const results = [];

  for (const [mood, keywords] of Object.entries(MOOD_KEYWORDS)) {
    const matched = keywords.filter(keyword => {
      return text.includes(normalizeAliases(keyword));
    });

    if (matched.length) {
      results.push({
        mood,
        matchedKeywords: matched,
        score: matched.length
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

// --------------------------------------------
// SAVE USER MOOD
// --------------------------------------------

function saveUserMood(threadID, senderID, mood) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  if (!Array.isArray(context.moodHistory)) {
    context.moodHistory = [];
  }

  context.currentMood = mood;

  context.moodHistory.push({
    mood,
    timestamp: Date.now()
  });

  if (context.moodHistory.length > MOOD_CONFIG.maxMoodHistory) {
    context.moodHistory = context.moodHistory.slice(
      -MOOD_CONFIG.maxMoodHistory
    );
  }

  return true;
}

// --------------------------------------------
// GET CURRENT USER MOOD
// --------------------------------------------

function getCurrentUserMood(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  return context.currentMood || "neutral";
}

// --------------------------------------------
// GET USER MOOD HISTORY
// --------------------------------------------

function getUserMoodHistory(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  return context.moodHistory || [];
}

// --------------------------------------------
// UPDATE MOOD FROM MESSAGE
// --------------------------------------------

function updateMoodFromMessage(threadID, senderID, message) {
  const result = detectMood(message);

  if (result.confidence >= MOOD_CONFIG.confidenceThreshold) {
    saveUserMood(threadID, senderID, result.mood);
  }

  return result;
}

// --------------------------------------------
// GET MOOD DESCRIPTION
// --------------------------------------------

function getMoodDescription(mood) {
  const descriptions = {
    happy: "User is feeling happy.",
    sad: "User may be feeling sad.",
    angry: "User may be angry.",
    romantic: "User is expressing romantic feelings.",
    lonely: "User may be feeling lonely.",
    tired: "User may be tired.",
    confused: "User may be confused.",
    worried: "User may be worried.",
    shy: "User may be shy.",
    excited: "User is excited.",
    neutral: "No clear mood detected."
  };

  return descriptions[mood] || descriptions.neutral;
}

// --------------------------------------------
// GET MOOD RESPONSE STYLE
// --------------------------------------------

function getMoodResponseStyle(mood) {
  const styles = {
    happy: "cheerful",
    sad: "caring",
    angry: "calm",
    romantic: "romantic",
    lonely: "supportive",
    tired: "gentle",
    confused: "helpful",
    worried: "reassuring",
    shy: "playful",
    excited: "enthusiastic",
    neutral: "friendly"
  };

  return styles[mood] || "friendly";
}

// --------------------------------------------
// CLEAR MOOD HISTORY
// --------------------------------------------

function clearMoodHistory(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  context.moodHistory = [];
  context.currentMood = "neutral";

  return true;
}

// --------------------------------------------
// EXPORT PART 5
// --------------------------------------------

Object.assign(module.exports, {
  MOOD_CONFIG,
  MOOD_KEYWORDS,
  detectMood,
  detectMultipleMoods,
  saveUserMood,
  getCurrentUserMood,
  getUserMoodHistory,
  updateMoodFromMessage,
  getMoodDescription,
  getMoodResponseStyle,
  clearMoodHistory
});

console.log("[PREMA] Emotion & Mood Detection loaded.");
// ============================================
// PART 6 - SMART CONVERSATION INTELLIGENCE
// ============================================

const INTELLIGENCE_CONFIG = {
  maxTopics: 20,
  contextWindow: 10,
  questionConfidence: 30
};

// --------------------------------------------
// QUESTION WORDS
// --------------------------------------------

const QUESTION_WORDS = {
  what: ["ki", "what", "kiser", "konta"],
  why: ["keno", "why", "karone"],
  when: ["kokhon", "kobe", "when"],
  where: ["kothay", "where", "kothay acho"],
  who: ["ke", "who", "kara"],
  whose: ["kar", "kader", "whose"],
  how: ["kemon", "kibhabe", "how", "kirokom"],
  which: ["kon", "konti", "which"],
  howMuch: ["koto", "kotota", "how much"],
  howMany: ["koita", "koyta", "how many"]
};

// --------------------------------------------
// QUESTION DETECTION
// --------------------------------------------

function isQuestionMessage(message) {
  const text = normalizeAliases(message);

  if (!text) return false;

  if (String(message).includes("?")) {
    return true;
  }

  return Object.values(QUESTION_WORDS)
    .flat()
    .some(word => {
      return new RegExp(
        `(^|\\s)${word}(\\s|$)`
      ).test(text);
    });
}

// --------------------------------------------
// GET QUESTION TYPE
// --------------------------------------------

function detectQuestionType(message) {
  const text = normalizeAliases(message);

  if (!isQuestionMessage(message)) {
    return "not_question";
  }

  for (const [type, words] of Object.entries(QUESTION_WORDS)) {
    if (words.some(word => {
      return new RegExp(
        `(^|\\s)${word}(\\s|$)`
      ).test(text);
    })) {
      return type;
    }
  }

  return "general_question";
}

// --------------------------------------------
// DETECT YES / NO RESPONSE
// --------------------------------------------

function detectYesNo(message) {
  const text = normalizeAliases(message);

  const yesWords = [
    "ha", "yes", "hya", "ji", "oboshshoi",
    "sure", "thik", "ekdom", "nischoy"
  ];

  const noWords = [
    "na", "no", "never", "kokhono na",
    "lagbe na", "chai na", "hobe na"
  ];

  if (yesWords.includes(text)) return "yes";
  if (noWords.includes(text)) return "no";

  return null;
}

// --------------------------------------------
// DETECT AGREEMENT
// --------------------------------------------

function detectAgreement(message) {
  const text = normalizeAliases(message);

  const words = [
    "thik bolecho",
    "ekdom thik",
    "ami o tai mone kori",
    "right",
    "exactly",
    "true",
    "sotti",
    "ekdom",
    "correct"
  ];

  return words.some(word => text.includes(word));
}

// --------------------------------------------
// DETECT DISAGREEMENT
// --------------------------------------------

function detectDisagreement(message) {
  const text = normalizeAliases(message);

  const words = [
    "ami mani na",
    "vul bolecho",
    "eta thik na",
    "wrong",
    "not true",
    "ekmot na",
    "agree na",
    "na eta na"
  ];

  return words.some(word => text.includes(word));
}

// --------------------------------------------
// DETECT USER INTENT
// --------------------------------------------

function detectUserIntent(message) {
  const text = normalizeAliases(message);

  const intents = {
    greeting: [
      "hi", "hello", "hey", "salam",
      "assalamu alaikum", "good morning"
    ],

    question: [
      "ki", "keno", "kobe", "kothay",
      "kemon", "kibhabe", "who", "what", "why"
    ],

    request: [
      "bolo", "bolo na", "help koro",
      "ektu bolo", "please", "dekhaw"
    ],

    thanks: [
      "thanks", "thank you", "dhonnobad",
      "onek dhonnobad", "thnx"
    ],

    apology: [
      "sorry", "dukhoito", "khoma koro",
      "maf kore dao"
    ],

    farewell: [
      "bye", "goodbye", "allah hafez",
      "pore kotha hobe", "ghumate jai"
    ],

    romantic: [
      "love you", "bhalobashi",
      "miss you", "miss kori",
      "tomake chai"
    ],

    emotional: [
      "mon kharap", "kosto hocche",
      "eka lagche", "kanna pacche"
    ]
  };

  for (const [intent, keywords] of Object.entries(intents)) {
    if (keywords.some(word => {
      return text.includes(normalizeAliases(word));
    })) {
      return intent;
    }
  }

  return "general";
}

// --------------------------------------------
// DETECT TOPIC CHANGE
// --------------------------------------------

function detectTopicChange(
  threadID,
  senderID,
  message
) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  if (!context.lastUserMessage) {
    return false;
  }

  const overlap = hasKeywordOverlap(
    message,
    context.lastUserMessage
  );

  const followUp = isFollowUpMessage(message);

  return !overlap && !followUp;
}

// --------------------------------------------
// DETECT CONVERSATION STAGE
// --------------------------------------------

function detectConversationStage(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  const count = context.messages.length;

  if (count <= 2) return "starting";
  if (count <= 8) return "early";
  if (count <= 20) return "developing";
  if (count <= 40) return "active";

  return "long_conversation";
}

// --------------------------------------------
// GET LAST USER QUESTIONS
// --------------------------------------------

function getRecentQuestions(threadID, senderID, limit = 5) {
  const messages = getContextMessages(
    threadID,
    senderID,
    INTELLIGENCE_CONFIG.contextWindow
  );

  return messages
    .filter(item => {
      return item.role === "user" &&
        isQuestionMessage(item.message);
    })
    .slice(-limit)
    .map(item => item.message);
}

// --------------------------------------------
// GET LAST USER INTENT
// --------------------------------------------

function getLastUserIntent(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  if (!context.lastUserMessage) {
    return "unknown";
  }

  return detectUserIntent(context.lastUserMessage);
}

// --------------------------------------------
// DETECT MESSAGE RELATION
// --------------------------------------------

function detectMessageRelation(
  threadID,
  senderID,
  message
) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  if (!context.lastUserMessage) {
    return "first_message";
  }

  if (isFollowUpMessage(message)) {
    return "follow_up";
  }

  if (hasKeywordOverlap(message, context.lastUserMessage)) {
    return "related_message";
  }

  if (isQuestionMessage(message)) {
    return "new_question";
  }

  return "new_message";
}

// --------------------------------------------
// GET CONVERSATION INSIGHTS
// --------------------------------------------

function getConversationInsights(
  threadID,
  senderID,
  message
) {
  const mood = detectMood(message);
  const intent = detectUserIntent(message);

  return {
    mood: mood.mood,
    moodConfidence: mood.confidence,
    intent,
    question: isQuestionMessage(message),
    questionType: detectQuestionType(message),
    followUp: isFollowUpMessage(message),
    topicChanged: detectTopicChange(
      threadID,
      senderID,
      message
    ),
    relation: detectMessageRelation(
      threadID,
      senderID,
      message
    ),
    stage: detectConversationStage(
      threadID,
      senderID
    )
  };
}

// --------------------------------------------
// GET USER CONVERSATION PROFILE
// --------------------------------------------

function getConversationProfile(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  return {
    messageCount: context.messages.length,
    topicCount: context.topics.length,
    currentMood: context.currentMood || "neutral",
    currentCategory: context.lastCategory,
    lastIntent: getLastUserIntent(threadID, senderID),
    conversationStage: detectConversationStage(
      threadID,
      senderID
    ),
    startedAt: context.conversationStarted,
    lastUpdated: context.lastUpdated
  };
}

// --------------------------------------------
// EXPORT PART 6
// --------------------------------------------

Object.assign(module.exports, {
  INTELLIGENCE_CONFIG,
  QUESTION_WORDS,
  isQuestionMessage,
  detectQuestionType,
  detectYesNo,
  detectAgreement,
  detectDisagreement,
  detectUserIntent,
  detectTopicChange,
  detectConversationStage,
  getRecentQuestions,
  getLastUserIntent,
  detectMessageRelation,
  getConversationInsights,
  getConversationProfile
});

console.log("[PREMA] Conversation Intelligence loaded.");
// ============================================
// PART 7 - USER PROFILE & PERSONALIZATION
// ============================================

const PROFILE_CONFIG = {
  maxFacts: 100,
  maxInterests: 50,
  maxNicknames: 10
};

// --------------------------------------------
// PROFILE STORAGE
// --------------------------------------------

function getPersonalProfile(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  if (!context.profile) {
    context.profile = {
      name: null,
      nickname: null,
      preferredName: null,
      favoriteColor: null,
      favoriteFood: null,
      favoriteSong: null,
      favoriteMovie: null,
      favoriteGame: null,
      interests: [],
      facts: [],
      nicknames: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
  }

  return context.profile;
}

// --------------------------------------------
// UPDATE PROFILE FIELD
// --------------------------------------------

function updatePersonalProfile(
  threadID,
  senderID,
  field,
  value
) {
  const allowedFields = [
    "name",
    "nickname",
    "preferredName",
    "favoriteColor",
    "favoriteFood",
    "favoriteSong",
    "favoriteMovie",
    "favoriteGame"
  ];

  if (!allowedFields.includes(field)) {
    return false;
  }

  const cleanValue = safeString(value);

  if (!cleanValue) return false;

  const profile = getPersonalProfile(
    threadID,
    senderID
  );

  profile[field] = cleanValue;
  profile.updatedAt = Date.now();

  if (field === "nickname") {
    if (!profile.nicknames.includes(cleanValue)) {
      profile.nicknames.push(cleanValue);

      profile.nicknames = profile.nicknames.slice(
        -PROFILE_CONFIG.maxNicknames
      );
    }
  }

  return true;
}

// --------------------------------------------
// GET PROFILE FIELD
// --------------------------------------------

function getProfileField(threadID, senderID, field) {
  const profile = getPersonalProfile(
    threadID,
    senderID
  );

  return profile[field] ?? null;
}

// --------------------------------------------
// ADD USER INTEREST
// --------------------------------------------

function addUserInterest(threadID, senderID, interest) {
  const value = normalizeText(interest);

  if (!value) return false;

  const profile = getPersonalProfile(
    threadID,
    senderID
  );

  if (!profile.interests.includes(value)) {
    profile.interests.push(value);

    profile.interests = profile.interests.slice(
      -PROFILE_CONFIG.maxInterests
    );
  }

  profile.updatedAt = Date.now();

  return true;
}

// --------------------------------------------
// REMOVE USER INTEREST
// --------------------------------------------

function removeUserInterest(threadID, senderID, interest) {
  const profile = getPersonalProfile(
    threadID,
    senderID
  );

  const value = normalizeText(interest);

  profile.interests = profile.interests.filter(
    item => item !== value
  );

  profile.updatedAt = Date.now();

  return true;
}

// --------------------------------------------
// GET USER INTERESTS
// --------------------------------------------

function getUserInterests(threadID, senderID) {
  return getPersonalProfile(
    threadID,
    senderID
  ).interests;
}

// --------------------------------------------
// SAVE PERSONAL FACT
// --------------------------------------------

function savePersonalFact(
  threadID,
  senderID,
  fact,
  value
) {
  const profile = getPersonalProfile(
    threadID,
    senderID
  );

  const cleanFact = normalizeText(fact);
  const cleanValue = safeString(value);

  if (!cleanFact || !cleanValue) {
    return false;
  }

  const existing = profile.facts.find(
    item => item.fact === cleanFact
  );

  if (existing) {
    existing.value = cleanValue;
    existing.updatedAt = Date.now();
  } else {
    profile.facts.push({
      fact: cleanFact,
      value: cleanValue,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }

  profile.facts = profile.facts.slice(
    -PROFILE_CONFIG.maxFacts
  );

  profile.updatedAt = Date.now();

  return true;
}

// --------------------------------------------
// GET PERSONAL FACT
// --------------------------------------------

function getPersonalFact(threadID, senderID, fact) {
  const profile = getPersonalProfile(
    threadID,
    senderID
  );

  const key = normalizeText(fact);

  const found = profile.facts.find(
    item => item.fact === key
  );

  return found ? found.value : null;
}

// --------------------------------------------
// GET ALL PERSONAL FACTS
// --------------------------------------------

function getAllPersonalFacts(threadID, senderID) {
  return getPersonalProfile(
    threadID,
    senderID
  ).facts;
}

// --------------------------------------------
// REMEMBER USER NAME
// --------------------------------------------

function rememberUserName(threadID, senderID, name) {
  return updatePersonalProfile(
    threadID,
    senderID,
    "name",
    name
  );
}

// --------------------------------------------
// REMEMBER USER NICKNAME
// --------------------------------------------

function rememberUserNickname(threadID, senderID, nickname) {
  return updatePersonalProfile(
    threadID,
    senderID,
    "nickname",
    nickname
  );
}

// --------------------------------------------
// GET PREFERRED USER NAME
// --------------------------------------------

function getPreferredUserName(threadID, senderID) {
  const profile = getPersonalProfile(
    threadID,
    senderID
  );

  return (
    profile.preferredName ||
    profile.nickname ||
    profile.name ||
    null
  );
}

// --------------------------------------------
// SET PREFERRED USER NAME
// --------------------------------------------

function setPreferredUserName(threadID, senderID, name) {
  return updatePersonalProfile(
    threadID,
    senderID,
    "preferredName",
    name
  );
}

// --------------------------------------------
// CLEAR USER PROFILE
// --------------------------------------------

function clearPersonalProfile(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  context.profile = null;

  return true;
}

// --------------------------------------------
// EXPORT PROFILE
// --------------------------------------------

function exportPersonalProfile(threadID, senderID) {
  const profile = getPersonalProfile(
    threadID,
    senderID
  );

  return JSON.parse(JSON.stringify(profile));
}

// --------------------------------------------
// IMPORT PROFILE
// --------------------------------------------

function importPersonalProfile(
  threadID,
  senderID,
  importedProfile
) {
  if (
    !importedProfile ||
    typeof importedProfile !== "object" ||
    Array.isArray(importedProfile)
  ) {
    return false;
  }

  const context = getConversationContextData(
    threadID,
    senderID
  );

  const current = getPersonalProfile(
    threadID,
    senderID
  );

  context.profile = {
    ...current,
    ...importedProfile,
    interests: Array.isArray(importedProfile.interests)
      ? importedProfile.interests.slice(
          -PROFILE_CONFIG.maxInterests
        )
      : current.interests,
    facts: Array.isArray(importedProfile.facts)
      ? importedProfile.facts.slice(
          -PROFILE_CONFIG.maxFacts
        )
      : current.facts,
    nicknames: Array.isArray(importedProfile.nicknames)
      ? importedProfile.nicknames.slice(
          -PROFILE_CONFIG.maxNicknames
        )
      : current.nicknames,
    updatedAt: Date.now()
  };

  return true;
}

// --------------------------------------------
// GET PROFILE SUMMARY
// --------------------------------------------

function getPersonalProfileSummary(threadID, senderID) {
  const profile = getPersonalProfile(
    threadID,
    senderID
  );

  return {
    name: profile.name,
    preferredName: profile.preferredName,
    nickname: profile.nickname,
    interests: profile.interests.length,
    facts: profile.facts.length,
    favoriteColor: profile.favoriteColor,
    favoriteFood: profile.favoriteFood,
    favoriteSong: profile.favoriteSong,
    updatedAt: profile.updatedAt
  };
}

// --------------------------------------------
// EXPORT PART 7
// --------------------------------------------

Object.assign(module.exports, {
  PROFILE_CONFIG,
  getPersonalProfile,
  updatePersonalProfile,
  getProfileField,
  addUserInterest,
  removeUserInterest,
  getUserInterests,
  savePersonalFact,
  getPersonalFact,
  getAllPersonalFacts,
  rememberUserName,
  rememberUserNickname,
  getPreferredUserName,
  setPreferredUserName,
  clearPersonalProfile,
  exportPersonalProfile,
  importPersonalProfile,
  getPersonalProfileSummary
});

console.log("[PREMA] User Personalization System loaded.");
// ============================================
// PART 8 - ADVANCED PERSISTENT MEMORY
// ============================================

const PERSISTENT_MEMORY_CONFIG = {
  enabled: true,
  profileKey: "prema_personal_profile",
  summaryKey: "prema_conversation_summary",
  importantKey: "prema_important_information",
  maxImportantFacts: 100,
  maxSummaryLength: 1500
};

// --------------------------------------------
// SAFE MEMORY CALL
// --------------------------------------------

function safeMemoryCall(methodName, ...args) {
  try {
    if (
      memory &&
      typeof memory[methodName] === "function"
    ) {
      return memory[methodName](...args);
    }
  } catch (error) {
    console.error(
      `[PREMA MEMORY] ${methodName}:`,
      error.message
    );
  }

  return null;
}

// --------------------------------------------
// GET PERSISTENT USER MEMORY
// --------------------------------------------

function getPersistentUserMemory(threadID, senderID) {
  if (!PERSISTENT_MEMORY_CONFIG.enabled) {
    return null;
  }

  return safeMemoryCall(
    "getUser",
    threadID,
    senderID
  );
}

// --------------------------------------------
// SAVE PERSISTENT FACT
// --------------------------------------------

function savePersistentFact(
  threadID,
  senderID,
  key,
  value
) {
  if (!PERSISTENT_MEMORY_CONFIG.enabled) {
    return false;
  }

  const cleanKey = safeString(key);
  const cleanValue = safeString(value);

  if (!cleanKey || !cleanValue) {
    return false;
  }

  const result = safeMemoryCall(
    "rememberFact",
    threadID,
    senderID,
    cleanKey,
    cleanValue
  );

  return result !== null;
}

// --------------------------------------------
// RECALL PERSISTENT FACT
// --------------------------------------------

function recallPersistentFact(threadID, senderID, key) {
  if (!PERSISTENT_MEMORY_CONFIG.enabled) {
    return null;
  }

  return safeMemoryCall(
    "recallFact",
    threadID,
    senderID,
    safeString(key)
  );
}

// --------------------------------------------
// SAVE PERSONAL PROFILE TO MEMORY
// --------------------------------------------

function saveProfileToPersistentMemory(threadID, senderID) {
  const profile = exportPersonalProfile(
    threadID,
    senderID
  );

  const serialized = JSON.stringify(profile);

  return savePersistentFact(
    threadID,
    senderID,
    PERSISTENT_MEMORY_CONFIG.profileKey,
    serialized
  );
}

// --------------------------------------------
// RESTORE PERSONAL PROFILE FROM MEMORY
// --------------------------------------------

function restoreProfileFromPersistentMemory(
  threadID,
  senderID
) {
  const saved = recallPersistentFact(
    threadID,
    senderID,
    PERSISTENT_MEMORY_CONFIG.profileKey
  );

  if (!saved) return false;

  try {
    const profile = typeof saved === "string"
      ? JSON.parse(saved)
      : saved;

    return importPersonalProfile(
      threadID,
      senderID,
      profile
    );
  } catch (error) {
    console.error(
      "[PREMA] Profile restore failed:",
      error.message
    );

    return false;
  }
}

// --------------------------------------------
// SAVE IMPORTANT INFORMATION
// --------------------------------------------

function saveImportantInformation(
  threadID,
  senderID,
  information
) {
  const cleanInformation = safeString(information);

  if (!cleanInformation) return false;

  const result = safeMemoryCall(
    "rememberImportantInformation",
    threadID,
    senderID,
    cleanInformation
  );

  return result !== null;
}

// --------------------------------------------
// GET IMPORTANT INFORMATION
// --------------------------------------------

function getImportantInformation(threadID, senderID) {
  const result = safeMemoryCall(
    "getImportantInformation",
    threadID,
    senderID
  );

  return result || [];
}

// --------------------------------------------
// CREATE CONVERSATION SUMMARY
// --------------------------------------------

function createPersistentConversationSummary(
  threadID,
  senderID
) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  const recentMessages = context.messages
    .slice(-10)
    .map(item => {
      return `${item.role}: ${item.message}`;
    });

  const summary = {
    user: getPreferredUserName(threadID, senderID),
    mood: getCurrentUserMood(threadID, senderID),
    category: context.lastCategory,
    topics: getRecentConversationTopics(
      threadID,
      senderID
    ),
    recentMessages,
    createdAt: Date.now()
  };

  return summary;
}

// --------------------------------------------
// SAVE CONVERSATION SUMMARY
// --------------------------------------------

function savePersistentConversationSummary(
  threadID,
  senderID
) {
  const summary = createPersistentConversationSummary(
    threadID,
    senderID
  );

  const serialized = JSON.stringify(summary).slice(
    0,
    PERSISTENT_MEMORY_CONFIG.maxSummaryLength
  );

  return savePersistentFact(
    threadID,
    senderID,
    PERSISTENT_MEMORY_CONFIG.summaryKey,
    serialized
  );
}

// --------------------------------------------
// GET PREVIOUS CONVERSATION SUMMARY
// --------------------------------------------

function getPreviousConversationSummary(
  threadID,
  senderID
) {
  const saved = recallPersistentFact(
    threadID,
    senderID,
    PERSISTENT_MEMORY_CONFIG.summaryKey
  );

  if (!saved) return null;

  try {
    return typeof saved === "string"
      ? JSON.parse(saved)
      : saved;
  } catch {
    return null;
  }
}

// --------------------------------------------
// SAVE USER PROFILE AND SUMMARY
// --------------------------------------------

function saveCompleteUserContext(threadID, senderID) {
  const profileSaved = saveProfileToPersistentMemory(
    threadID,
    senderID
  );

  const summarySaved = savePersistentConversationSummary(
    threadID,
    senderID
  );

  return {
    profileSaved,
    summarySaved
  };
}

// --------------------------------------------
// RESTORE USER CONTEXT
// --------------------------------------------

function restoreCompleteUserContext(threadID, senderID) {
  const profileRestored = restoreProfileFromPersistentMemory(
    threadID,
    senderID
  );

  const previousSummary = getPreviousConversationSummary(
    threadID,
    senderID
  );

  return {
    profileRestored,
    previousSummary
  };
}

// --------------------------------------------
// GET MEMORY STATUS
// --------------------------------------------

function getPersistentMemoryStatus(threadID, senderID) {
  const userMemory = getPersistentUserMemory(
    threadID,
    senderID
  );

  return {
    enabled: PERSISTENT_MEMORY_CONFIG.enabled,
    memoryAvailable: Boolean(userMemory),
    profileAvailable: Boolean(
      recallPersistentFact(
        threadID,
        senderID,
        PERSISTENT_MEMORY_CONFIG.profileKey
      )
    ),
    summaryAvailable: Boolean(
      getPreviousConversationSummary(
        threadID,
        senderID
      )
    )
  };
}

// --------------------------------------------
// EXPORT PART 8
// --------------------------------------------

Object.assign(module.exports, {
  PERSISTENT_MEMORY_CONFIG,
  safeMemoryCall,
  getPersistentUserMemory,
  savePersistentFact,
  recallPersistentFact,
  saveProfileToPersistentMemory,
  restoreProfileFromPersistentMemory,
  saveImportantInformation,
  getImportantInformation,
  createPersistentConversationSummary,
  savePersistentConversationSummary,
  getPreviousConversationSummary,
  saveCompleteUserContext,
  restoreCompleteUserContext,
  getPersistentMemoryStatus
});

console.log("[PREMA] Persistent Memory Integration loaded.");
// ============================================
// PART 9 - ADVANCED REPLY INTELLIGENCE
// ============================================

const REPLY_INTELLIGENCE_CONFIG = {
  maxReplyAttempts: 15,
  maxStyleHistory: 20,
  avoidSameCategory: true,
  personalizeReplies: true
};

// --------------------------------------------
// REPLY STYLES
// --------------------------------------------

const REPLY_STYLES = {
  romantic: [
    "romantic",
    "love",
    "affection",
    "sweet",
    "cute"
  ],

  funny: [
    "funny",
    "joke",
    "teasing",
    "playful",
    "humor"
  ],

  caring: [
    "caring",
    "supportive",
    "comfort",
    "emotional",
    "gentle"
  ],

  friendly: [
    "friendly",
    "general",
    "casual",
    "normal"
  ],

  enthusiastic: [
    "excited",
    "energetic",
    "positive",
    "cheerful"
  ],

  thoughtful: [
    "deep",
    "meaningful",
    "serious",
    "advice"
  ]
};

// --------------------------------------------
// GET REPLY STYLE FROM MOOD
// --------------------------------------------

function getReplyStyleFromMood(mood) {
  const mapping = {
    happy: "enthusiastic",
    sad: "caring",
    angry: "caring",
    romantic: "romantic",
    lonely: "caring",
    tired: "gentle",
    confused: "thoughtful",
    worried: "caring",
    shy: "funny",
    excited: "enthusiastic",
    neutral: "friendly"
  };

  return mapping[mood] || "friendly";
}

// --------------------------------------------
// DETECT STYLE FROM CATEGORY
// --------------------------------------------

function detectReplyStyleFromCategory(categoryName) {
  const name = normalizeText(categoryName);

  for (const [style, keywords] of Object.entries(REPLY_STYLES)) {
    if (
      keywords.some(keyword => name.includes(keyword))
    ) {
      return style;
    }
  }

  return "friendly";
}

// --------------------------------------------
// GET USER'S REPLY STYLE HISTORY
// --------------------------------------------

function getReplyStyleHistory(threadID, senderID) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  return context.replyStyleHistory || [];
}

// --------------------------------------------
// SAVE REPLY STYLE
// --------------------------------------------

function saveReplyStyleHistory(
  threadID,
  senderID,
  style
) {
  const context = getConversationContextData(
    threadID,
    senderID
  );

  if (!Array.isArray(context.replyStyleHistory)) {
    context.replyStyleHistory = [];
  }

  context.replyStyleHistory.push({
    style,
    timestamp: Date.now()
  });

  context.replyStyleHistory =
    context.replyStyleHistory.slice(
      -REPLY_INTELLIGENCE_CONFIG.maxStyleHistory
    );

  return true;
}

// --------------------------------------------
// SELECT CONVERSATION STYLE
// --------------------------------------------

function selectConversationStyle(
  threadID,
  senderID,
  message,
  categoryName
) {
  const moodResult = detectMood(message);

  if (
    moodResult.confidence >= MOOD_CONFIG.confidenceThreshold &&
    moodResult.mood !== "neutral"
  ) {
    return getReplyStyleFromMood(moodResult.mood);
  }

  if (categoryName) {
    return detectReplyStyleFromCategory(categoryName);
  }

  const context = getConversationContextData(
    threadID,
    senderID
  );

  if (context.lastCategory) {
    return detectReplyStyleFromCategory(
      context.lastCategory
    );
  }

  return "friendly";
}

// --------------------------------------------
// GET STYLE COMPATIBLE CATEGORIES
// --------------------------------------------

function getCategoriesByStyle(style) {
  const categories = getCategories();
  const result = [];

  for (const [name, category] of Object.entries(categories)) {
    const detectedStyle = detectReplyStyleFromCategory(name);

    if (detectedStyle === style) {
      result.push({
        name,
        category
      });
    }
  }

  return result;
}

// --------------------------------------------
// SELECT STYLE-BASED REPLY
// --------------------------------------------

function getStyleBasedReply(
  style,
  threadID,
  senderID
) {
  const compatibleCategories = getCategoriesByStyle(style);

  if (!compatibleCategories.length) {
    return null;
  }

  const shuffled = compatibleCategories
    .slice()
    .sort(() => Math.random() - 0.5);

  for (const item of shuffled) {
    const reply = getSmartCategoryReply(
      item.name,
      threadID,
      senderID
    );

    if (reply) {
      setCurrentConversationCategory(
        threadID,
        senderID,
        item.name
      );

      return reply;
    }
  }

  return null;
}

// --------------------------------------------
// PERSONALIZE REPLY
// --------------------------------------------

function personalizeReply(reply, threadID, senderID) {
  if (!reply || !REPLY_INTELLIGENCE_CONFIG.personalizeReplies) {
    return reply;
  }

  const name = getPreferredUserName(
    threadID,
    senderID
  );

  if (!name) return reply;

  const text = safeString(reply);

  if (text.includes("{name}")) {
    return text.replace(/\{name\}/g, name);
  }

  return text;
}

// --------------------------------------------
// GET CONVERSATION-AWARE REPLY
// --------------------------------------------

function getConversationAwareReply(
  message,
  threadID,
  senderID
) {
  const match = findBestCategory(message);

  if (match) {
    const reply = getReplyFromMatch(
      match,
      threadID,
      senderID
    );

    if (reply) {
      setCurrentConversationCategory(
        threadID,
        senderID,
        match.category
      );

      return personalizeReply(
        reply,
        threadID,
        senderID
      );
    }
  }

  const style = selectConversationStyle(
    threadID,
    senderID,
    message,
    match ? match.category : null
  );

  const styleReply = getStyleBasedReply(
    style,
    threadID,
    senderID
  );

  if (styleReply) {
    saveReplyStyleHistory(
      threadID,
      senderID,
      style
    );

    return personalizeReply(
      styleReply,
      threadID,
      senderID
    );
  }

  return null;
}

// --------------------------------------------
// GET NATURAL CONVERSATION RESPONSE
// --------------------------------------------

function generateNaturalResponse(
  message,
  threadID,
  senderID
) {
  const cleanMessage = safeString(message);

  if (isEmptyMessage(cleanMessage)) {
    return null;
  }

  const moodResult = updateMoodFromMessage(
    threadID,
    senderID,
    cleanMessage
  );

  const insights = getConversationInsights(
    threadID,
    senderID,
    cleanMessage
  );

  const reply = getConversationAwareReply(
    cleanMessage,
    threadID,
    senderID
  );

  if (!reply) {
    return null;
  }

  updateConversationContext(
    threadID,
    senderID,
    "user",
    cleanMessage
  );

  updateConversationContext(
    threadID,
    senderID,
    "assistant",
    reply
  );

  saveCompleteUserContext(
    threadID,
    senderID
  );

  return {
    reply,
    mood: moodResult.mood,
    intent: insights.intent,
    style: selectConversationStyle(
      threadID,
      senderID,
      cleanMessage,
      getCurrentConversationCategory(
        threadID,
        senderID
      )
    ),
    category: getCurrentConversationCategory(
      threadID,
      senderID
    )
  };
}

// --------------------------------------------
// EXPORT PART 9
// --------------------------------------------

Object.assign(module.exports, {
  REPLY_INTELLIGENCE_CONFIG,
  REPLY_STYLES,
  getReplyStyleFromMood,
  detectReplyStyleFromCategory,
  getReplyStyleHistory,
  saveReplyStyleHistory,
  selectConversationStyle,
  getCategoriesByStyle,
  getStyleBasedReply,
  personalizeReply,
  getConversationAwareReply,
  generateNaturalResponse
});

console.log("[PREMA] Advanced Reply Intelligence loaded.");
// ============================================
// PART 10 - MESSENGER GROUP MESSAGE HANDLER
// ============================================

const GROUP_HANDLER_CONFIG = {
  enabled: true,
  groupOnly: true,
  respondToName: true,
  respondToMention: true,
  respondToReply: true,
  minDelay: 1200,
  maxDelay: 2500,
  maxProcessingTime: 15000
};

const GROUP_HANDLER_STATE = {
  processing: new Set(),
  lastResponse: new Map(),
  botID: null
};

// --------------------------------------------
// GET BOT ID
// --------------------------------------------

async function getPremaBotID(api) {
  if (GROUP_HANDLER_STATE.botID) {
    return GROUP_HANDLER_STATE.botID;
  }

  try {
    if (typeof api.getCurrentUserID === "function") {
      GROUP_HANDLER_STATE.botID = await api.getCurrentUserID();
      return GROUP_HANDLER_STATE.botID;
    }
  } catch (error) {
    console.error("[PREMA] Bot ID error:", error.message);
  }

  return null;
}

// --------------------------------------------
// CHECK GROUP MESSAGE
// --------------------------------------------

function isGroupMessage(event) {
  if (!event || !event.threadID || !event.senderID) {
    return false;
  }

  if (event.isGroup === true) {
    return true;
  }

  return String(event.threadID) !== String(event.senderID);
}

// --------------------------------------------
// CHECK PREMA NAME
// --------------------------------------------

function isPremaCalled(message) {
  const text = safeString(message).toLowerCase();

  const names = [
    "prema",
    "prem",
    "প্রেমা",
    "প্রেম",
    "oi prema",
    "hey prema",
    "hello prema",
    "hi prema"
  ];

  return names.some(name => {
    const escaped = name.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    return new RegExp(
      `(^|\\s)${escaped}($|\\s|[,!?।])`,
      "i"
    ).test(text);
  });
}

// --------------------------------------------
// CHECK BOT MENTION
// --------------------------------------------

function isPremaMentioned(event, botID) {
  if (!event || !event.mentions) {
    return false;
  }

  const mentions = event.mentions;

  if (botID && mentions[String(botID)]) {
    return true;
  }

  return Object.values(mentions).some(mention => {
    if (!mention) return false;

    return (
      botID &&
      String(mention.id || mention.userID || "") ===
      String(botID)
    );
  });
}

// --------------------------------------------
// CHECK REPLY TO PREMA
// --------------------------------------------

function isReplyToPrema(event, botID) {
  if (!event || !event.messageReply) {
    return false;
  }

  const repliedMessage = event.messageReply;

  if (!botID) return false;

  return (
    String(repliedMessage.senderID || "") ===
    String(botID)
  );
}

// --------------------------------------------
// CHECK RESPONSE TRIGGER
// --------------------------------------------

function shouldPremaRespond(event, botID) {
  if (!event) return false;

  const message = getMessageText(event);

  if (isEmptyMessage(message)) {
    return false;
  }

  if (
    GROUP_HANDLER_CONFIG.groupOnly &&
    !isGroupMessage(event)
  ) {
    return false;
  }

  if (
    GROUP_HANDLER_CONFIG.respondToName &&
    isPremaCalled(message)
  ) {
    return true;
  }

  if (
    GROUP_HANDLER_CONFIG.respondToMention &&
    isPremaMentioned(event, botID)
  ) {
    return true;
  }

  if (
    GROUP_HANDLER_CONFIG.respondToReply &&
    isReplyToPrema(event, botID)
  ) {
    return true;
  }

  return false;
}

// --------------------------------------------
// PROCESSING LOCK
// --------------------------------------------

function getGroupProcessingKey(event) {
  return `${event.threadID}:${event.senderID}`;
}

function isGroupProcessing(event) {
  return GROUP_HANDLER_STATE.processing.has(
    getGroupProcessingKey(event)
  );
}

function setGroupProcessing(event, status) {
  const key = getGroupProcessingKey(event);

  if (status) {
    GROUP_HANDLER_STATE.processing.add(key);
  } else {
    GROUP_HANDLER_STATE.processing.delete(key);
  }
}

// --------------------------------------------
// GROUP COOLDOWN
// --------------------------------------------

function isGroupCooldownActive(event) {
  const key = getGroupProcessingKey(event);
  const lastTime = GROUP_HANDLER_STATE.lastResponse.get(key) || 0;

  return Date.now() - lastTime < CONFIG.minDelay;
}

function updateGroupCooldown(event) {
  GROUP_HANDLER_STATE.lastResponse.set(
    getGroupProcessingKey(event),
    Date.now()
  );
}

// --------------------------------------------
// NATURAL RESPONSE DELAY
// --------------------------------------------

function getGroupResponseDelay() {
  return randomNumber(
    GROUP_HANDLER_CONFIG.minDelay,
    GROUP_HANDLER_CONFIG.maxDelay
  );
}

function waitForGroupResponse(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

// --------------------------------------------
// SEND PREMA MESSAGE
// --------------------------------------------

function sendPremaGroupMessage(api, message, threadID) {
  return new Promise((resolve, reject) => {
    try {
      api.sendMessage(
        message,
        threadID,
        error => {
          if (error) {
            reject(error);
          } else {
            resolve(true);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

// --------------------------------------------
// MAIN GROUP HANDLER
// --------------------------------------------

async function handlePremaGroupMessage({ api, event }) {
  if (!GROUP_HANDLER_CONFIG.enabled) return;
  if (!api || !event) return;

  if (event.senderID === event.userID && event.isFromMe) {
    return;
  }

  if (event.type && event.type !== "message") {
    return;
  }

  if (!isGroupMessage(event)) return;

  const message = getMessageText(event);

  if (isEmptyMessage(message)) return;

  const botID = await getPremaBotID(api);

  if (!shouldPremaRespond(event, botID)) {
    return;
  }

  if (isGroupProcessing(event)) return;
  if (isGroupCooldownActive(event)) return;

  setGroupProcessing(event, true);

  try {
    const responseData = generateNaturalResponse(
      message,
      event.threadID,
      event.senderID
    );

    if (!responseData || !responseData.reply) {
      return;
    }

    await waitForGroupResponse(
      getGroupResponseDelay()
    );

    await sendPremaGroupMessage(
      api,
      responseData.reply,
      event.threadID
    );

    updateGroupCooldown(event);

    rememberUserMessage(
      event.threadID,
      event.senderID,
      message
    );

    rememberPremaReply(
      event.threadID,
      event.senderID,
      responseData.reply
    );

  } catch (error) {
    console.error(
      "[PREMA] Group Handler Error:",
      error.message
    );
  } finally {
    setGroupProcessing(event, false);
  }
}

// --------------------------------------------
// GOATBOT ONCHAT EVENT
// --------------------------------------------

async function premaOnChat({ api, event }) {
  return handlePremaGroupMessage({
    api,
    event
  });
}

// --------------------------------------------
// EXPORT PART 10
// --------------------------------------------

Object.assign(module.exports, {
  GROUP_HANDLER_CONFIG,
  GROUP_HANDLER_STATE,
  getPremaBotID,
  isGroupMessage,
  isPremaCalled,
  isPremaMentioned,
  isReplyToPrema,
  shouldPremaRespond,
  getGroupProcessingKey,
  isGroupProcessing,
  setGroupProcessing,
  isGroupCooldownActive,
  updateGroupCooldown,
  getGroupResponseDelay,
  waitForGroupResponse,
  sendPremaGroupMessage,
  handlePremaGroupMessage,
  premaOnChat,

  onChat: premaOnChat
});

console.log("[PREMA] Group Message Handler loaded.");
// ============================================
// PART 11 - SMART FOLLOW-UP CONVERSATION
// ============================================

const FOLLOWUP_SYSTEM_CONFIG = {
  enabled: true,
  maxFollowUps: 8,
  maxContextAge: 30 * 60 * 1000,
  minContextMessages: 1
};

const FOLLOWUP_STATE = {
  userContexts: new Map(),
  usedReplies: new Map()
};

// --------------------------------------------
// FOLLOW-UP PHRASES
// --------------------------------------------

const FOLLOWUP_WORDS = [
  "ha",
  "haa",
  "hmm",
  "hum",
  "na",
  "nah",
  "keno",
  "tarpor",
  "accha",
  "acha",
  "bujhlam",
  "bujhchi",
  "tai naki",
  "sotti",
  "really",
  "then",
  "okay",
  "ok",
  "right",
  "bolo",
  "bol",
  "ki holo",
  "erpor",
  "aro bolo",
  "continue",
  "yes",
  "no",
  "maybe",
  "thik ache"
];

// --------------------------------------------
// GET FOLLOW-UP KEY
// --------------------------------------------

function getFollowupKey(threadID, senderID) {
  return `${threadID}:${senderID}`;
}

// --------------------------------------------
// GET FOLLOW-UP CONTEXT
// --------------------------------------------

function getFollowupContext(threadID, senderID) {
  const key = getFollowupKey(threadID, senderID);

  let context = FOLLOWUP_STATE.userContexts.get(key);

  if (!context) {
    context = {
      messages: [],
      lastTopic: null,
      lastReply: null,
      lastQuestion: null,
      followUpCount: 0,
      updatedAt: Date.now()
    };

    FOLLOWUP_STATE.userContexts.set(key, context);
  }

  if (
    Date.now() - context.updatedAt >
    FOLLOWUP_SYSTEM_CONFIG.maxContextAge
  ) {
    context.messages = [];
    context.lastTopic = null;
    context.lastReply = null;
    context.lastQuestion = null;
    context.followUpCount = 0;
  }

  return context;
}

// --------------------------------------------
// CHECK FOLLOW-UP MESSAGE
// --------------------------------------------

function isFollowupMessage(message) {
  const text = normalizeText(message);

  if (!text) return false;

  if (FOLLOWUP_WORDS.includes(text)) {
    return true;
  }

  const shortPhrases = [
    "ki bolle",
    "ki bolcho",
    "bistarito bolo",
    "aro bolo na",
    "tarpor ki",
    "then what",
    "what happened",
    "why though",
    "how come",
    "bolte thako",
    "shuni",
    "bolo na"
  ];

  return shortPhrases.some(phrase =>
    text.includes(normalizeText(phrase))
  );
}

// --------------------------------------------
// SAVE FOLLOW-UP MESSAGE
// --------------------------------------------

function saveFollowupMessage(
  threadID,
  senderID,
  role,
  message
) {
  const context = getFollowupContext(
    threadID,
    senderID
  );

  context.messages.push({
    role,
    message: safeString(message),
    timestamp: Date.now()
  });

  context.messages = context.messages.slice(-20);
  context.updatedAt = Date.now();

  return context;
}

// --------------------------------------------
// SAVE FOLLOW-UP TOPIC
// --------------------------------------------

function saveFollowupTopic(
  threadID,
  senderID,
  topic
) {
  const context = getFollowupContext(
    threadID,
    senderID
  );

  context.lastTopic = topic;
  context.updatedAt = Date.now();

  return true;
}

// --------------------------------------------
// SAVE LAST FOLLOW-UP REPLY
// --------------------------------------------

function saveLastFollowupReply(
  threadID,
  senderID,
  reply
) {
  const context = getFollowupContext(
    threadID,
    senderID
  );

  context.lastReply = reply;
  context.updatedAt = Date.now();

  return true;
}

// --------------------------------------------
// GET LAST FOLLOW-UP REPLY
// --------------------------------------------

function getLastFollowupReply(threadID, senderID) {
  return getFollowupContext(
    threadID,
    senderID
  ).lastReply;
}

// --------------------------------------------
// GET FOLLOW-UP HISTORY
// --------------------------------------------

function getFollowupHistory(
  threadID,
  senderID,
  limit = 10
) {
  const context = getFollowupContext(
    threadID,
    senderID
  );

  return context.messages.slice(-Math.max(1, limit));
}

// --------------------------------------------
// CHECK CONTEXT AVAILABILITY
// --------------------------------------------

function hasFollowupContext(threadID, senderID) {
  const context = getFollowupContext(
    threadID,
    senderID
  );

  return (
    context.messages.length >=
    FOLLOWUP_SYSTEM_CONFIG.minContextMessages
  );
}

// --------------------------------------------
// DETECT FOLLOW-UP INTENT
// --------------------------------------------

function detectFollowupIntent(message) {
  const text = normalizeText(message);

  const patterns = {
    agreement: ["ha", "haa", "yes", "thik", "okay", "accha"],
    disagreement: ["na", "nah", "no", "hobe na"],
    explanation: ["keno", "why", "ki jonno", "how come"],
    continuation: ["tarpor", "erpor", "then", "aro bolo"],
    confirmation: ["sotti", "really", "tai naki", "sure"],
    question: ["ki", "kivabe", "kokhon", "where", "what"]
  };

  for (const [intent, words] of Object.entries(patterns)) {
    if (
      words.some(word =>
        text === word ||
        text.startsWith(word + " ")
      )
    ) {
      return intent;
    }
  }

  return "unknown";
}

// --------------------------------------------
// GET FOLLOW-UP REPLY FROM CONTEXT
// --------------------------------------------

function generateFollowupReply(
  message,
  threadID,
  senderID
) {
  if (!FOLLOWUP_SYSTEM_CONFIG.enabled) {
    return null;
  }

  if (!hasFollowupContext(threadID, senderID)) {
    return null;
  }

  if (!isFollowupMessage(message)) {
    return null;
  }

  const context = getFollowupContext(
    threadID,
    senderID
  );

  if (
    context.followUpCount >=
    FOLLOWUP_SYSTEM_CONFIG.maxFollowUps
  ) {
    context.followUpCount = 0;
  }

  const intent = detectFollowupIntent(message);

  const replies = {
    agreement: [
      "Hae, ami o etai bolchilam! 😄",
      "Dekhle, amader chinta mile jacche! ❤️",
      "Exactly! Ebar bolo, tomar ki mone hoy? 😊"
    ],

    disagreement: [
      "Oho, tomar mot ta alada! Keno emon mone holo? 🤔",
      "Thik ache, tomar point tao shuni! 😊",
      "Accha, tahole tomar explanation ta bolo! 💗"
    ],

    explanation: [
      "Karon kichu kotha mon diye bujhte hoy! ❤️",
      "Bujhiye bolchi, age bolo kon part ta jante chao? 😊",
      "Arey, etar pichone ekta interesting karon ache! 😄"
    ],

    continuation: [
      "Tarpor golpo ta aro interesting hoye gelo! 😄",
      "Aro shunbe? Tahole mon diye shono! ❤️",
      "Achha, ebar tomar pala! Tumi ki bolbe? 😊"
    ],

    confirmation: [
      "Hae re, ekdom sotti! 😄",
      "Biswas hocche na naki? ❤️",
      "Sotti bolchi, moja korchi na! 😊"
    ],

    question: [
      "Bhalo proshno! Ektu details e bolo! 🤔",
      "Eta niye kotha bola jay! ❤️",
      "Ami shunchi, bolo! 😊"
    ],

    unknown: [
      "Hmm, bujhte parchi! Tarpor bolo! 😊",
      "Accha, ami shunchi! ❤️",
      "Ebar tomar kotha shuni! 😄"
    ]
  };

  const options = replies[intent] || replies.unknown;

  const key = getFollowupKey(threadID, senderID);
  const previous = FOLLOWUP_STATE.usedReplies.get(key) || [];

  const available = options.filter(
    reply => !previous.includes(reply)
  );

  const selected = randomItem(
    available.length ? available : options
  );

  FOLLOWUP_STATE.usedReplies.set(
    key,
    [...previous, selected].slice(-10)
  );

  context.followUpCount++;
  context.updatedAt = Date.now();

  saveLastFollowupReply(
    threadID,
    senderID,
    selected
  );

  return selected;
}

// --------------------------------------------
// RESET FOLLOW-UP CONTEXT
// --------------------------------------------

function resetFollowupContext(threadID, senderID) {
  const key = getFollowupKey(threadID, senderID);

  FOLLOWUP_STATE.userContexts.delete(key);
  FOLLOWUP_STATE.usedReplies.delete(key);

  return true;
}

// --------------------------------------------
// EXPORT PART 11
// --------------------------------------------

Object.assign(module.exports, {
  FOLLOWUP_SYSTEM_CONFIG,
  FOLLOWUP_STATE,
  FOLLOWUP_WORDS,
  getFollowupKey,
  getFollowupContext,
  isFollowupMessage,
  saveFollowupMessage,
  saveFollowupTopic,
  saveLastFollowupReply,
  getLastFollowupReply,
  getFollowupHistory,
  hasFollowupContext,
  detectFollowupIntent,
  generateFollowupReply,
  resetFollowupContext
});

console.log("[PREMA] Follow-up Conversation System loaded.");

