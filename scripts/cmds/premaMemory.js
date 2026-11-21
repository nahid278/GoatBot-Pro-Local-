const fs = require("fs-extra");
const path = require("path");

const MEMORY_FILE = path.join(__dirname, "prema_memory.json");

const CONFIG = {
  maxMessages: 30,
  maxRecentReplies: 15,
  maxUsers: 1000
};

let memory = {
  users: {}
};

// Load saved memory
function loadMemory() {
  try {
    if (fs.existsSync(MEMORY_FILE)) {
      const saved = fs.readJsonSync(MEMORY_FILE);

      if (saved && typeof saved === "object") {
        memory = {
          users: saved.users || {}
        };
      }
    }
  } catch (error) {
    console.error("Prema Memory Load Error:", error.message);
  }
}

// Save memory
function saveMemory() {
  try {
    fs.writeJsonSync(MEMORY_FILE, memory, {
      spaces: 2
    });
  } catch (error) {
    console.error("Prema Memory Save Error:", error.message);
  }
}

// Create unique user key
function getUserKey(threadID, senderID) {
  return `${threadID}_${senderID}`;
}

// Create new user memory
function createUserMemory(senderID, threadID) {
  return {
    senderID,
    threadID,

    messages: [],

    recentReplies: [],

    lastCategory: null,

    lastMessage: null,

    lastReply: null,

    lastInteraction: Date.now(),

    conversationCount: 0,

    username: null,

    context: {},

    createdAt: Date.now()
  };
}

// Get user memory
function getUser(threadID, senderID) {
  const key = getUserKey(threadID, senderID);

  if (!memory.users[key]) {
    memory.users[key] = createUserMemory(
      senderID,
      threadID
    );
  }

  const user = memory.users[key];

  user.lastInteraction = Date.now();

  return user;
}

// Add conversation message
function addMessage(threadID, senderID, role, content) {
  const user = getUser(threadID, senderID);

  user.messages.push({
    role,
    content: String(content),
    timestamp: Date.now()
  });

  if (user.messages.length > CONFIG.maxMessages) {
    user.messages = user.messages.slice(
      -CONFIG.maxMessages
    );
  }

  user.conversationCount++;

  saveMemory();

  return user;
}

// Get conversation history
function getHistory(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.messages;
}

// Get last message
function getLastMessage(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.messages.length
    ? user.messages[user.messages.length - 1]
    : null;
}

// Set last category
function setCategory(threadID, senderID, category) {
  const user = getUser(threadID, senderID);

  user.lastCategory = category;

  saveMemory();
}

// Get last category
function getCategory(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.lastCategory;
}

// Set context
function setContext(threadID, senderID, key, value) {
  const user = getUser(threadID, senderID);

  user.context[key] = value;

  saveMemory();
}

// Get context
function getContext(threadID, senderID, key) {
  const user = getUser(threadID, senderID);

  return user.context[key] ?? null;
}

// Save last reply
function setLastReply(threadID, senderID, reply) {
  const user = getUser(threadID, senderID);

  user.lastReply = reply;

  user.recentReplies.push(reply);

  if (user.recentReplies.length > CONFIG.maxRecentReplies) {
    user.recentReplies.shift();
  }

  saveMemory();
}

// Get recent replies
function getRecentReplies(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.recentReplies;
}

// Check repeated reply
function isRepeatedReply(threadID, senderID, reply) {
  const user = getUser(threadID, senderID);

  return user.recentReplies.includes(reply);
}

// Set username
function setUsername(threadID, senderID, username) {
  const user = getUser(threadID, senderID);

  user.username = username;

  saveMemory();
}

// Get username
function getUsername(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.username;
}

// Get conversation count
function getConversationCount(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.conversationCount;
}

// Clear one user's memory
function clearUser(threadID, senderID) {
  const key = getUserKey(threadID, senderID);

  delete memory.users[key];

  saveMemory();

  return true;
}

// Clear one user's conversation history
function clearHistory(threadID, senderID) {
  const user = getUser(threadID, senderID);

  user.messages = [];
  user.recentReplies = [];
  user.lastCategory = null;
  user.lastMessage = null;
  user.lastReply = null;
  user.context = {};

  saveMemory();

  return true;
}

// Remove old memories
function cleanupMemory(days = 30) {
  const limit = days * 24 * 60 * 60 * 1000;
  const now = Date.now();

  for (const key of Object.keys(memory.users)) {
    const user = memory.users[key];

    if (now - user.lastInteraction > limit) {
      delete memory.users[key];
    }
  }

  saveMemory();
}

// Limit total stored users
function limitUsers() {
  const entries = Object.entries(memory.users);

  if (entries.length <= CONFIG.maxUsers) {
    return;
  }

  entries.sort((a, b) => {
    return a[1].lastInteraction - b[1].lastInteraction;
  });

  const removeCount = entries.length - CONFIG.maxUsers;

  for (let i = 0; i < removeCount; i++) {
    delete memory.users[entries[i][0]];
  }

  saveMemory();
}

// Initialize
loadMemory();

// Export functions
module.exports = {
  loadMemory,
  saveMemory,
  getUser,
  addMessage,
  getHistory,
  getLastMessage,
  setCategory,
  getCategory,
  setContext,
  getContext,
  setLastReply,
  getRecentReplies,
  isRepeatedReply,
  setUsername,
  getUsername,
  getConversationCount,
  clearUser,
  clearHistory,
  cleanupMemory,
  limitUsers
};
// Save last user message
function setLastMessage(threadID, senderID, message) {
  const user = getUser(threadID, senderID);

  user.lastMessage = String(message);
  user.lastInteraction = Date.now();

  saveMemory();

  return user.lastMessage;
}

// Get last user message
function getLastUserMessage(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.lastMessage;
}

// Save last interaction time
function updateInteraction(threadID, senderID) {
  const user = getUser(threadID, senderID);

  user.lastInteraction = Date.now();

  saveMemory();

  return user.lastInteraction;
}

// Get time since last interaction
function getTimeSinceLastInteraction(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return Date.now() - user.lastInteraction;
}

// Check whether conversation is continuing
function isConversationActive(
  threadID,
  senderID,
  minutes = 10
) {
  const user = getUser(threadID, senderID);

  const elapsed = Date.now() - user.lastInteraction;

  return elapsed <= minutes * 60 * 1000;
}

// Save a known personal detail
function rememberFact(threadID, senderID, key, value) {
  const user = getUser(threadID, senderID);

  if (!user.context.facts) {
    user.context.facts = {};
  }

  user.context.facts[key] = {
    value,
    updatedAt: Date.now()
  };

  saveMemory();

  return true;
}

// Get a known personal detail
function recallFact(threadID, senderID, key) {
  const user = getUser(threadID, senderID);

  if (!user.context.facts) {
    return null;
  }

  return user.context.facts[key]?.value ?? null;
}

// Get all known personal details
function getAllFacts(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.facts || {};
}

// Remove a known personal detail
function forgetFact(threadID, senderID, key) {
  const user = getUser(threadID, senderID);

  if (!user.context.facts) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(user.context.facts, key)) {
    return false;
  }

  delete user.context.facts[key];

  saveMemory();

  return true;
}

// Save previous question and answer
function setLastExchange(
  threadID,
  senderID,
  question,
  answer
) {
  const user = getUser(threadID, senderID);

  user.context.lastExchange = {
    question: String(question),
    answer: String(answer),
    timestamp: Date.now()
  };

  saveMemory();

  return user.context.lastExchange;
}

// Get previous question and answer
function getLastExchange(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.lastExchange || null;
}

// Save pending conversation topic
function setPendingTopic(threadID, senderID, topic) {
  const user = getUser(threadID, senderID);

  user.context.pendingTopic = topic;

  saveMemory();

  return topic;
}

// Get pending conversation topic
function getPendingTopic(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.pendingTopic || null;
}

// Clear pending conversation topic
function clearPendingTopic(threadID, senderID) {
  const user = getUser(threadID, senderID);

  delete user.context.pendingTopic;

  saveMemory();

  return true;
}

// Get complete conversation context
function getConversationContext(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return {
    username: user.username,
    lastMessage: user.lastMessage,
    lastReply: user.lastReply,
    lastCategory: user.lastCategory,
    pendingTopic: user.context.pendingTopic || null,
    lastExchange: user.context.lastExchange || null,
    facts: user.context.facts || {},
    history: user.messages,
    conversationCount: user.conversationCount
  };
}

// Add functions to existing exports
Object.assign(module.exports, {
  setLastMessage,
  getLastUserMessage,
  updateInteraction,
  getTimeSinceLastInteraction,
  isConversationActive,
  rememberFact,
  recallFact,
  getAllFacts,
  forgetFact,
  setLastExchange,
  getLastExchange,
  setPendingTopic,
  getPendingTopic,
  clearPendingTopic,
  getConversationContext
});
// Normalize text for comparison
function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Save message fingerprint
function saveMessageFingerprint(threadID, senderID, message) {
  const user = getUser(threadID, senderID);

  if (!user.context.messageFingerprints) {
    user.context.messageFingerprints = [];
  }

  const fingerprint = normalizeText(message);

  user.context.messageFingerprints.push({
    text: fingerprint,
    timestamp: Date.now()
  });

  user.context.messageFingerprints =
    user.context.messageFingerprints.slice(-30);

  saveMemory();

  return fingerprint;
}

// Check whether message was recently sent
function hasRecentMessage(threadID, senderID, message) {
  const user = getUser(threadID, senderID);

  const fingerprint = normalizeText(message);

  return (user.context.messageFingerprints || []).some(item => {
    return item.text === fingerprint;
  });
}

// Save user's mood
function setMood(threadID, senderID, mood) {
  const user = getUser(threadID, senderID);

  user.context.mood = {
    value: mood,
    updatedAt: Date.now()
  };

  saveMemory();

  return mood;
}

// Get user's mood
function getMood(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.mood?.value || null;
}

// Save conversation style
function setConversationStyle(threadID, senderID, style) {
  const user = getUser(threadID, senderID);

  user.context.conversationStyle = style;

  saveMemory();

  return style;
}

// Get conversation style
function getConversationStyle(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.conversationStyle || "friendly";
}

// Save favorite category
function setFavoriteCategory(threadID, senderID, category) {
  const user = getUser(threadID, senderID);

  if (!user.context.favoriteCategories) {
    user.context.favoriteCategories = {};
  }

  user.context.favoriteCategories[category] =
    (user.context.favoriteCategories[category] || 0) + 1;

  saveMemory();

  return user.context.favoriteCategories[category];
}

// Get favorite categories
function getFavoriteCategories(threadID, senderID) {
  const user = getUser(threadID, senderID);

  const categories = user.context.favoriteCategories || {};

  return Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => ({
      category,
      count
    }));
}

// Save reply category history
function addCategoryHistory(threadID, senderID, category) {
  const user = getUser(threadID, senderID);

  if (!user.context.categoryHistory) {
    user.context.categoryHistory = [];
  }

  user.context.categoryHistory.push({
    category,
    timestamp: Date.now()
  });

  user.context.categoryHistory =
    user.context.categoryHistory.slice(-30);

  saveMemory();
}

// Get recent category history
function getCategoryHistory(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.categoryHistory || [];
}

// Save bot interaction statistics
function addInteractionStat(threadID, senderID, type) {
  const user = getUser(threadID, senderID);

  if (!user.context.stats) {
    user.context.stats = {
      messagesReceived: 0,
      repliesSent: 0,
      categoriesUsed: 0
    };
  }

  if (type === "received") {
    user.context.stats.messagesReceived++;
  }

  if (type === "replied") {
    user.context.stats.repliesSent++;
  }

  if (type === "category") {
    user.context.stats.categoriesUsed++;
  }

  saveMemory();

  return user.context.stats;
}

// Get interaction statistics
function getInteractionStats(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.stats || {
    messagesReceived: 0,
    repliesSent: 0,
    categoriesUsed: 0
  };
}

// Add new functions to exports
Object.assign(module.exports, {
  normalizeText,
  saveMessageFingerprint,
  hasRecentMessage,
  setMood,
  getMood,
  setConversationStyle,
  getConversationStyle,
  setFavoriteCategory,
  getFavoriteCategories,
  addCategoryHistory,
  getCategoryHistory,
  addInteractionStat,
  getInteractionStats
});

// Detect short follow-up messages
function isFollowUpMessage(message) {
  const text = normalizeText(message);

  const followUpPatterns = [
    "tarpor",
    "tarpor ki",
    "erpor",
    "erpor ki",
    "keno",
    "kivabe",
    "ki holo",
    "bujhlam",
    "accha",
    "hmm",
    "tai naki",
    "sotti",
    "aro bolo",
    "bolte thako",
    "then",
    "what next",
    "details bolo",
    "aro details",
    "mane ki",
    "ki bolle",
    "bujhi nai",
    "bujhlam na"
  ];

  return followUpPatterns.some(pattern => {
    return text === pattern ||
      text.startsWith(pattern + " ") ||
      text.endsWith(" " + pattern);
  });
}

// Save current conversation topic
function setCurrentTopic(threadID, senderID, topic) {
  const user = getUser(threadID, senderID);

  user.context.currentTopic = {
    value: topic,
    updatedAt: Date.now()
  };

  saveMemory();

  return topic;
}

// Get current conversation topic
function getCurrentTopic(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.currentTopic?.value || null;
}

// Save previous topic
function addTopicHistory(threadID, senderID, topic) {
  const user = getUser(threadID, senderID);

  if (!user.context.topicHistory) {
    user.context.topicHistory = [];
  }

  user.context.topicHistory.push({
    topic,
    timestamp: Date.now()
  });

  user.context.topicHistory =
    user.context.topicHistory.slice(-20);

  saveMemory();

  return user.context.topicHistory;
}

// Get previous topics
function getTopicHistory(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.topicHistory || [];
}

// Save conversation state
function setConversationState(threadID, senderID, state) {
  const user = getUser(threadID, senderID);

  user.context.conversationState = state;

  saveMemory();

  return state;
}

// Get conversation state
function getConversationState(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.conversationState || "normal";
}

// Save last question
function setLastQuestion(threadID, senderID, question) {
  const user = getUser(threadID, senderID);

  user.context.lastQuestion = {
    text: String(question),
    timestamp: Date.now()
  };

  saveMemory();

  return question;
}

// Get last question
function getLastQuestion(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.lastQuestion?.text || null;
}

// Save last answer
function setLastAnswer(threadID, senderID, answer) {
  const user = getUser(threadID, senderID);

  user.context.lastAnswer = {
    text: String(answer),
    timestamp: Date.now()
  };

  saveMemory();

  return answer;
}

// Get last answer
function getLastAnswer(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.lastAnswer?.text || null;
}

// Get a short conversation summary
function getShortSummary(threadID, senderID) {
  const user = getUser(threadID, senderID);

  const messages = user.messages.slice(-8);

  return messages.map(message => ({
    role: message.role,
    content: message.content
  }));
}

// Check whether a reply was used recently
function wasReplyRecentlyUsed(
  threadID,
  senderID,
  reply
) {
  const user = getUser(threadID, senderID);

  const normalizedReply = normalizeText(reply);

  return user.recentReplies.some(item => {
    return normalizeText(item) === normalizedReply;
  });
}

// Clear recent reply history
function clearRecentReplies(threadID, senderID) {
  const user = getUser(threadID, senderID);

  user.recentReplies = [];

  saveMemory();

  return true;
}

// Clear conversation context only
function clearConversationContext(threadID, senderID) {
  const user = getUser(threadID, senderID);

  user.context = {};
  user.lastCategory = null;
  user.lastMessage = null;
  user.lastReply = null;

  saveMemory();

  return true;
}

// Export one user's memory
function exportUserMemory(threadID, senderID) {
  const key = getUserKey(threadID, senderID);
  const user = memory.users[key];

  if (!user) {
    return null;
  }

  return JSON.parse(JSON.stringify(user));
}

// Import one user's memory
function importUserMemory(threadID, senderID, data) {
  if (!data || typeof data !== "object") {
    return false;
  }

  const key = getUserKey(threadID, senderID);

  memory.users[key] = {
    ...createUserMemory(senderID, threadID),
    ...data,
    senderID,
    threadID
  };

  saveMemory();

  return true;
}

// Add PART 4 functions to exports
Object.assign(module.exports, {
  isFollowUpMessage,
  setCurrentTopic,
  getCurrentTopic,
  addTopicHistory,
  getTopicHistory,
  setConversationState,
  getConversationState,
  setLastQuestion,
  getLastQuestion,
  setLastAnswer,
  getLastAnswer,
  getShortSummary,
  wasReplyRecentlyUsed,
  clearRecentReplies,
  clearConversationContext,
  exportUserMemory,
  importUserMemory
});
// Save user's preferred name
function setPreferredName(threadID, senderID, name) {
  const user = getUser(threadID, senderID);

  user.context.preferredName = String(name);

  saveMemory();

  return name;
}

// Get user's preferred name
function getPreferredName(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.preferredName || user.username || null;
}

// Save user's nickname
function setNickname(threadID, senderID, nickname) {
  const user = getUser(threadID, senderID);

  user.context.nickname = String(nickname);

  saveMemory();

  return nickname;
}

// Get user's nickname
function getNickname(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.nickname || null;
}

// Save user preference
function setPreference(threadID, senderID, key, value) {
  const user = getUser(threadID, senderID);

  if (!user.context.preferences) {
    user.context.preferences = {};
  }

  user.context.preferences[key] = {
    value,
    updatedAt: Date.now()
  };

  saveMemory();

  return true;
}

// Get user preference
function getPreference(threadID, senderID, key) {
  const user = getUser(threadID, senderID);

  return user.context.preferences?.[key]?.value ?? null;
}

// Get all preferences
function getAllPreferences(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.preferences || {};
}

// Remove preference
function removePreference(threadID, senderID, key) {
  const user = getUser(threadID, senderID);

  if (!user.context.preferences ||
      !Object.prototype.hasOwnProperty.call(
        user.context.preferences,
        key
      )) {
    return false;
  }

  delete user.context.preferences[key];

  saveMemory();

  return true;
}

// Add important event
function addImportantEvent(threadID, senderID, eventName, details = "") {
  const user = getUser(threadID, senderID);

  if (!user.context.importantEvents) {
    user.context.importantEvents = [];
  }

  user.context.importantEvents.push({
    eventName: String(eventName),
    details: String(details),
    timestamp: Date.now()
  });

  user.context.importantEvents =
    user.context.importantEvents.slice(-50);

  saveMemory();

  return true;
}

// Get important events
function getImportantEvents(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.importantEvents || [];
}

// Search saved facts
function searchFacts(threadID, senderID, keyword) {
  const facts = getAllFacts(threadID, senderID);

  const searchText = normalizeText(keyword);

  return Object.entries(facts)
    .filter(([key, item]) => {
      const keyMatch = normalizeText(key).includes(searchText);
      const valueMatch = normalizeText(item.value).includes(searchText);

      return keyMatch || valueMatch;
    })
    .map(([key, item]) => ({
      key,
      value: item.value,
      updatedAt: item.updatedAt
    }));
}

// Update user's profile
function updateUserProfile(threadID, senderID, profile = {}) {
  const user = getUser(threadID, senderID);

  const allowedFields = [
    "preferredName",
    "nickname",
    "location",
    "favoriteColor",
    "favoriteFood",
    "favoriteSong",
    "favoriteMovie",
    "favoriteGame"
  ];

  for (const field of allowedFields) {
    if (
      Object.prototype.hasOwnProperty.call(profile, field) &&
      profile[field] !== undefined
    ) {
      user.context[field] = profile[field];
    }
  }

  saveMemory();

  return user.context;
}

// Get user's profile
function getUserProfile(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return {
    username: user.username,
    preferredName: user.context.preferredName || null,
    nickname: user.context.nickname || null,
    location: user.context.location || null,
    favoriteColor: user.context.favoriteColor || null,
    favoriteFood: user.context.favoriteFood || null,
    favoriteSong: user.context.favoriteSong || null,
    favoriteMovie: user.context.favoriteMovie || null,
    favoriteGame: user.context.favoriteGame || null
  };
}

// Get memory creation date
function getMemoryCreatedAt(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.createdAt;
}

// Get last active date
function getLastActiveAt(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.lastInteraction;
}

// Add PART 5 functions to exports
Object.assign(module.exports, {
  setPreferredName,
  getPreferredName,
  setNickname,
  getNickname,
  setPreference,
  getPreference,
  getAllPreferences,
  removePreference,
  addImportantEvent,
  getImportantEvents,
  searchFacts,
  updateUserProfile,
  getUserProfile,
  getMemoryCreatedAt,
  getLastActiveAt
});

// Get conversation duration
function getConversationDuration(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return Math.max(0, Date.now() - user.createdAt);
}

// Get time since last message
function getTimeSinceLastMessage(threadID, senderID) {
  const user = getUser(threadID, senderID);

  const last = user.messages[user.messages.length - 1];

  if (!last) return null;

  return Math.max(0, Date.now() - last.timestamp);
}

// Check conversation pause
function hasConversationPaused(
  threadID,
  senderID,
  minutes = 30
) {
  const user = getUser(threadID, senderID);

  const elapsed = Date.now() - user.lastInteraction;

  return elapsed > minutes * 60 * 1000;
}

// Get messages by role
function getMessagesByRole(threadID, senderID, role) {
  const user = getUser(threadID, senderID);

  return user.messages.filter(message => {
    return message.role === role;
  });
}

// Search conversation history
function searchConversation(threadID, senderID, keyword) {
  const user = getUser(threadID, senderID);

  const searchText = normalizeText(keyword);

  if (!searchText) return [];

  return user.messages.filter(message => {
    return normalizeText(message.content).includes(searchText);
  });
}

// Get latest user messages
function getRecentUserMessages(
  threadID,
  senderID,
  limit = 10
) {
  const messages = getMessagesByRole(
    threadID,
    senderID,
    "user"
  );

  return messages.slice(-Math.max(0, limit));
}

// Get latest bot messages
function getRecentBotMessages(
  threadID,
  senderID,
  limit = 10
) {
  const messages = getMessagesByRole(
    threadID,
    senderID,
    "assistant"
  );

  return messages.slice(-Math.max(0, limit));
}

// Save message timestamp
function setMessageTimestamp(
  threadID,
  senderID,
  type,
  timestamp = Date.now()
) {
  const user = getUser(threadID, senderID);

  if (!user.context.messageTimes) {
    user.context.messageTimes = {};
  }

  user.context.messageTimes[type] = timestamp;

  saveMemory();

  return timestamp;
}

// Get message timestamp
function getMessageTimestamp(threadID, senderID, type) {
  const user = getUser(threadID, senderID);

  return user.context.messageTimes?.[type] ?? null;
}

// Get time since a specific event
function getTimeSinceEvent(threadID, senderID, type) {
  const timestamp = getMessageTimestamp(
    threadID,
    senderID,
    type
  );

  if (!timestamp) return null;

  return Math.max(0, Date.now() - timestamp);
}

// Get matching history messages
function findRelatedMessages(
  threadID,
  senderID,
  message,
  limit = 5
) {
  const user = getUser(threadID, senderID);

  const words = normalizeText(message)
    .split(" ")
    .filter(word => word.length >= 3);

  if (!words.length) return [];

  const results = user.messages.map(item => {
    const content = normalizeText(item.content);

    const score = words.reduce((total, word) => {
      return total + (content.includes(word) ? 1 : 0);
    }, 0);

    return {
      ...item,
      matchScore: score
    };
  });

  return results
    .filter(item => item.matchScore > 0)
    .sort((a, b) => {
      return b.matchScore - a.matchScore ||
        b.timestamp - a.timestamp;
    })
    .slice(0, Math.max(0, limit));
}

// Validate user memory
function validateUserMemory(threadID, senderID) {
  const user = getUser(threadID, senderID);

  if (!Array.isArray(user.messages)) {
    user.messages = [];
  }

  if (!Array.isArray(user.recentReplies)) {
    user.recentReplies = [];
  }

  if (!user.context || typeof user.context !== "object") {
    user.context = {};
  }

  if (!Number.isFinite(user.lastInteraction)) {
    user.lastInteraction = Date.now();
  }

  saveMemory();

  return true;
}

// Clean old messages without deleting profile
function trimUserHistory(
  threadID,
  senderID,
  keepMessages = 30
) {
  const user = getUser(threadID, senderID);

  const safeLimit = Math.max(
    0,
    Math.floor(Number(keepMessages) || 0)
  );

  user.messages = user.messages.slice(-safeLimit);

  saveMemory();

  return user.messages.length;
}

// Get total stored users
function getTotalUsers() {
  return Object.keys(memory.users).length;
}

// Get total stored messages
function getTotalMessages() {
  return Object.values(memory.users).reduce((total, user) => {
    return total + (
      Array.isArray(user.messages)
        ? user.messages.length
        : 0
    );
  }, 0);
}

// Add PART 6 functions to exports
Object.assign(module.exports, {
  getConversationDuration,
  getTimeSinceLastMessage,
  hasConversationPaused,
  getMessagesByRole,
  searchConversation,
  getRecentUserMessages,
  getRecentBotMessages,
  setMessageTimestamp,
  getMessageTimestamp,
  getTimeSinceEvent,
  findRelatedMessages,
  validateUserMemory,
  trimUserHistory,
  getTotalUsers,
  getTotalMessages
});
// ===============================
// PREMA MEMORY - PART 7
// USER PERSONALITY & RELATIONSHIP
// ===============================

// Save user emotion
function setUserEmotion(threadID, senderID, emotion) {
  const user = getUser(threadID, senderID);

  user.context.emotion = {
    value: String(emotion || "neutral"),
    updatedAt: Date.now()
  };

  saveMemory();

  return user.context.emotion;
}

// Get user emotion
function getUserEmotion(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.emotion?.value || "neutral";
}

// Save user communication style
function setUserCommunicationStyle(
  threadID,
  senderID,
  style
) {
  const user = getUser(threadID, senderID);

  user.context.communicationStyle = String(
    style || "normal"
  );

  saveMemory();

  return user.context.communicationStyle;
}

// Get user communication style
function getUserCommunicationStyle(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.communicationStyle || "normal";
}

// Save user interest
function addUserInterest(threadID, senderID, interest) {
  const user = getUser(threadID, senderID);

  const value = String(interest || "").trim();

  if (!value) return false;

  if (!Array.isArray(user.context.interests)) {
    user.context.interests = [];
  }

  const exists = user.context.interests.some(item => {
    return normalizeText(item) === normalizeText(value);
  });

  if (!exists) {
    user.context.interests.push(value);
  }

  user.context.interests =
    user.context.interests.slice(-50);

  saveMemory();

  return true;
}

// Get user interests
function getUserInterests(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.interests || [];
}

// Remove user interest
function removeUserInterest(threadID, senderID, interest) {
  const user = getUser(threadID, senderID);

  if (!Array.isArray(user.context.interests)) {
    return false;
  }

  const before = user.context.interests.length;

  user.context.interests =
    user.context.interests.filter(item => {
      return normalizeText(item) !== normalizeText(interest);
    });

  saveMemory();

  return before !== user.context.interests.length;
}

// Save important conversation moment
function addConversationMoment(
  threadID,
  senderID,
  description,
  type = "general"
) {
  const user = getUser(threadID, senderID);

  if (!Array.isArray(user.context.moments)) {
    user.context.moments = [];
  }

  const moment = {
    description: String(description || "").trim(),
    type: String(type || "general"),
    timestamp: Date.now()
  };

  if (!moment.description) return false;

  user.context.moments.push(moment);

  user.context.moments =
    user.context.moments.slice(-50);

  saveMemory();

  return moment;
}

// Get conversation moments
function getConversationMoments(
  threadID,
  senderID,
  limit = 10
) {
  const user = getUser(threadID, senderID);

  const moments = user.context.moments || [];

  return moments.slice(-Math.max(0, limit));
}

// Save user behavior pattern
function setUserBehavior(
  threadID,
  senderID,
  behavior,
  value
) {
  const user = getUser(threadID, senderID);

  if (!user.context.behaviors) {
    user.context.behaviors = {};
  }

  user.context.behaviors[String(behavior)] = {
    value,
    updatedAt: Date.now()
  };

  saveMemory();

  return true;
}

// Get user behavior pattern
function getUserBehavior(threadID, senderID, behavior) {
  const user = getUser(threadID, senderID);

  return user.context.behaviors?.[String(behavior)]?.value ?? null;
}

// Get all user behavior patterns
function getAllUserBehaviors(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.behaviors || {};
}

// Count user interactions
function getUserInteractionCount(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.conversationCount || 0;
}

// Calculate familiarity level
function getFamiliarityLevel(threadID, senderID) {
  const count = getUserInteractionCount(
    threadID,
    senderID
  );

  if (count >= 500) return "very_close";
  if (count >= 200) return "close";
  if (count >= 75) return "familiar";
  if (count >= 20) return "known";

  return "new";
}

// Save user's repeated phrase
function addRepeatedPhrase(threadID, senderID, phrase) {
  const user = getUser(threadID, senderID);

  const value = String(phrase || "").trim();

  if (!value) return false;

  if (!Array.isArray(user.context.repeatedPhrases)) {
    user.context.repeatedPhrases = [];
  }

  const normalized = normalizeText(value);

  const existing = user.context.repeatedPhrases.find(item => {
    return normalizeText(item.phrase) === normalized;
  });

  if (existing) {
    existing.count += 1;
    existing.lastSeen = Date.now();
  } else {
    user.context.repeatedPhrases.push({
      phrase: value,
      count: 1,
      firstSeen: Date.now(),
      lastSeen: Date.now()
    });
  }

  user.context.repeatedPhrases =
    user.context.repeatedPhrases.slice(-50);

  saveMemory();

  return true;
}

// Get repeated phrases
function getRepeatedPhrases(
  threadID,
  senderID,
  limit = 10
) {
  const user = getUser(threadID, senderID);

  const phrases = user.context.repeatedPhrases || [];

  return [...phrases]
    .sort((a, b) => b.count - a.count)
    .slice(0, Math.max(0, limit));
}

// Export PART 7 functions
Object.assign(module.exports, {
  setUserEmotion,
  getUserEmotion,
  setUserCommunicationStyle,
  getUserCommunicationStyle,
  addUserInterest,
  getUserInterests,
  removeUserInterest,
  addConversationMoment,
  getConversationMoments,
  setUserBehavior,
  getUserBehavior,
  getAllUserBehaviors,
  getUserInteractionCount,
  getFamiliarityLevel,
  addRepeatedPhrase,
  getRepeatedPhrases
});
// ===============================
// PREMA MEMORY - PART 8
// QUESTION & ANSWER MEMORY
// ===============================

// Save question and answer pair
function saveQuestionAnswer(
  threadID,
  senderID,
  question,
  answer,
  category = "general"
) {
  const user = getUser(threadID, senderID);

  const q = String(question || "").trim();
  const a = String(answer || "").trim();

  if (!q || !a) return false;

  if (!Array.isArray(user.context.questionAnswers)) {
    user.context.questionAnswers = [];
  }

  const entry = {
    question: q,
    answer: a,
    category: String(category || "general"),
    timestamp: Date.now()
  };

  user.context.questionAnswers.push(entry);

  user.context.questionAnswers =
    user.context.questionAnswers.slice(-100);

  user.context.lastQuestionAnswer = entry;

  saveMemory();

  return entry;
}

// Get latest question and answer
function getLastQuestionAnswer(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.lastQuestionAnswer || null;
}

// Get question and answer history
function getQuestionAnswerHistory(
  threadID,
  senderID,
  limit = 10
) {
  const user = getUser(threadID, senderID);

  const history = user.context.questionAnswers || [];

  return history.slice(-Math.max(0, limit));
}

// Search previous question
function findPreviousQuestion(
  threadID,
  senderID,
  question
) {
  const user = getUser(threadID, senderID);

  const target = normalizeText(question);

  if (!target) return null;

  const history = user.context.questionAnswers || [];

  return [...history].reverse().find(item => {
    return normalizeText(item.question) === target;
  }) || null;
}

// Search previous answer
function findPreviousAnswer(
  threadID,
  senderID,
  keyword
) {
  const user = getUser(threadID, senderID);

  const target = normalizeText(keyword);

  if (!target) return [];

  const history = user.context.questionAnswers || [];

  return history.filter(item => {
    return normalizeText(item.answer).includes(target);
  });
}

// Save pending question
function setPendingQuestion(
  threadID,
  senderID,
  question,
  category = "general"
) {
  const user = getUser(threadID, senderID);

  const value = String(question || "").trim();

  if (!value) return false;

  user.context.pendingQuestion = {
    question: value,
    category: String(category || "general"),
    timestamp: Date.now()
  };

  saveMemory();

  return user.context.pendingQuestion;
}

// Get pending question
function getPendingQuestion(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.pendingQuestion || null;
}

// Clear pending question
function clearPendingQuestion(threadID, senderID) {
  const user = getUser(threadID, senderID);

  delete user.context.pendingQuestion;

  saveMemory();

  return true;
}

// Save unanswered topic
function setUnansweredTopic(
  threadID,
  senderID,
  topic
) {
  const user = getUser(threadID, senderID);

  const value = String(topic || "").trim();

  if (!value) return false;

  user.context.unansweredTopic = {
    topic: value,
    timestamp: Date.now()
  };

  saveMemory();

  return true;
}

// Get unanswered topic
function getUnansweredTopic(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.unansweredTopic || null;
}

// Clear unanswered topic
function clearUnansweredTopic(threadID, senderID) {
  const user = getUser(threadID, senderID);

  delete user.context.unansweredTopic;

  saveMemory();

  return true;
}

// Save conversation goal
function setConversationGoal(
  threadID,
  senderID,
  goal
) {
  const user = getUser(threadID, senderID);

  const value = String(goal || "").trim();

  if (!value) return false;

  user.context.conversationGoal = {
    value,
    timestamp: Date.now()
  };

  saveMemory();

  return true;
}

// Get conversation goal
function getConversationGoal(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.conversationGoal?.value || null;
}

// Clear conversation goal
function clearConversationGoal(threadID, senderID) {
  const user = getUser(threadID, senderID);

  delete user.context.conversationGoal;

  saveMemory();

  return true;
}

// Check whether a question was asked before
function wasQuestionAskedBefore(
  threadID,
  senderID,
  question
) {
  return Boolean(
    findPreviousQuestion(threadID, senderID, question)
  );
}

// Get latest question
function getLatestQuestion(threadID, senderID) {
  const user = getUser(threadID, senderID);

  const history = user.context.questionAnswers || [];

  if (!history.length) return null;

  return history[history.length - 1].question;
}

// Export PART 8 functions
Object.assign(module.exports, {
  saveQuestionAnswer,
  getLastQuestionAnswer,
  getQuestionAnswerHistory,
  findPreviousQuestion,
  findPreviousAnswer,
  setPendingQuestion,
  getPendingQuestion,
  clearPendingQuestion,
  setUnansweredTopic,
  getUnansweredTopic,
  clearUnansweredTopic,
  setConversationGoal,
  getConversationGoal,
  clearConversationGoal,
  wasQuestionAskedBefore,
  getLatestQuestion
});
// ===============================
// PREMA MEMORY - PART 9
// USER ACTIVITY & STATISTICS
// ===============================

// Get current date key
function getMemoryDateKey(timestamp = Date.now()) {
  const date = new Date(timestamp);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
}

// Get current hour
function getMemoryHour(timestamp = Date.now()) {
  return new Date(timestamp).getHours();
}

// Record user activity
function recordUserActivity(
  threadID,
  senderID,
  type = "message"
) {
  const user = getUser(threadID, senderID);

  if (!user.context.activity) {
    user.context.activity = {
      total: 0,
      daily: {},
      hourly: {},
      types: {}
    };
  }

  const activity = user.context.activity;
  const dateKey = getMemoryDateKey();
  const hourKey = String(getMemoryHour());

  activity.total += 1;

  activity.daily[dateKey] =
    (activity.daily[dateKey] || 0) + 1;

  activity.hourly[hourKey] =
    (activity.hourly[hourKey] || 0) + 1;

  activity.types[type] =
    (activity.types[type] || 0) + 1;

  user.context.lastActivityType = type;
  user.context.lastActivityTime = Date.now();

  saveMemory();

  return activity;
}

// Get activity statistics
function getUserActivity(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.activity || {
    total: 0,
    daily: {},
    hourly: {},
    types: {}
  };
}

// Get today's activity
function getTodayActivity(threadID, senderID) {
  const activity = getUserActivity(threadID, senderID);
  const dateKey = getMemoryDateKey();

  return activity.daily?.[dateKey] || 0;
}

// Get activity for a specific date
function getActivityByDate(threadID, senderID, date) {
  const activity = getUserActivity(threadID, senderID);

  return activity.daily?.[String(date)] || 0;
}

// Get most active hour
function getMostActiveHour(threadID, senderID) {
  const activity = getUserActivity(threadID, senderID);
  const hourly = activity.hourly || {};

  const entries = Object.entries(hourly);

  if (!entries.length) return null;

  entries.sort((a, b) => b[1] - a[1]);

  return {
    hour: Number(entries[0][0]),
    count: entries[0][1]
  };
}

// Get most used activity type
function getMostUsedActivity(threadID, senderID) {
  const activity = getUserActivity(threadID, senderID);
  const types = activity.types || {};

  const entries = Object.entries(types);

  if (!entries.length) return null;

  entries.sort((a, b) => b[1] - a[1]);

  return {
    type: entries[0][0],
    count: entries[0][1]
  };
}

// Record reply reaction
function recordReplyReaction(
  threadID,
  senderID,
  replyType,
  reaction = "positive"
) {
  const user = getUser(threadID, senderID);

  if (!user.context.replyReactions) {
    user.context.replyReactions = {};
  }

  const key = String(replyType || "general");
  const value = String(reaction || "positive");

  if (!user.context.replyReactions[key]) {
    user.context.replyReactions[key] = {};
  }

  const reactions = user.context.replyReactions[key];

  reactions[value] = (reactions[value] || 0) + 1;

  saveMemory();

  return reactions;
}

// Get reply reactions
function getReplyReactions(threadID, senderID, replyType) {
  const user = getUser(threadID, senderID);

  const reactions = user.context.replyReactions || {};

  if (replyType) {
    return reactions[String(replyType)] || {};
  }

  return reactions;
}

// Get user's preferred reply type
function getPreferredReplyType(threadID, senderID) {
  const reactions = getReplyReactions(threadID, senderID);

  let bestType = null;
  let bestScore = -1;

  for (const [type, values] of Object.entries(reactions)) {
    const positive =
      (values.positive || 0) +
      (values.love || 0) +
      (values.laugh || 0);

    const negative =
      (values.negative || 0) +
      (values.dislike || 0);

    const score = positive - negative;

    if (score > bestScore) {
      bestScore = score;
      bestType = type;
    }
  }

  return bestType;
}

// Save user response preference
function setReplyPreference(
  threadID,
  senderID,
  preference,
  value
) {
  const user = getUser(threadID, senderID);

  if (!user.context.replyPreferences) {
    user.context.replyPreferences = {};
  }

  user.context.replyPreferences[String(preference)] = value;

  saveMemory();

  return true;
}

// Get user response preference
function getReplyPreference(
  threadID,
  senderID,
  preference
) {
  const user = getUser(threadID, senderID);

  return user.context.replyPreferences?.[String(preference)] ?? null;
}

// Get all reply preferences
function getAllReplyPreferences(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.replyPreferences || {};
}

// Reset activity statistics
function resetUserActivity(threadID, senderID) {
  const user = getUser(threadID, senderID);

  user.context.activity = {
    total: 0,
    daily: {},
    hourly: {},
    types: {}
  };

  saveMemory();

  return true;
}

// Export PART 9 functions
Object.assign(module.exports, {
  getMemoryDateKey,
  getMemoryHour,
  recordUserActivity,
  getUserActivity,
  getTodayActivity,
  getActivityByDate,
  getMostActiveHour,
  getMostUsedActivity,
  recordReplyReaction,
  getReplyReactions,
  getPreferredReplyType,
  setReplyPreference,
  getReplyPreference,
  getAllReplyPreferences,
  resetUserActivity
});
// ===============================
// PREMA MEMORY - PART 10
// CONVERSATION SUMMARY & BACKUP
// ===============================

// Create conversation summary
function createConversationSummary(threadID, senderID) {
  const user = getUser(threadID, senderID);

  const messages = user.messages || [];

  const userMessages = messages
    .filter(item => item.role === "user")
    .slice(-10);

  const botMessages = messages
    .filter(item => item.role === "assistant")
    .slice(-10);

  return {
    username: user.username || null,
    preferredName: user.preferredName || null,
    totalMessages: user.conversationCount || 0,
    lastCategory: user.lastCategory || null,
    lastInteraction: user.lastInteraction || null,
    interests: user.context.interests || [],
    emotion: user.context.emotion?.value || "neutral",
    recentUserMessages: userMessages.map(item => item.content),
    recentBotMessages: botMessages.map(item => item.content),
    lastQuestion: user.context.lastQuestion || null,
    currentTopic: user.context.currentTopic || null,
    generatedAt: Date.now()
  };
}

// Save conversation summary
function saveConversationSummary(threadID, senderID) {
  const user = getUser(threadID, senderID);

  const summary = createConversationSummary(
    threadID,
    senderID
  );

  user.context.savedSummary = summary;

  saveMemory();

  return summary;
}

// Get saved conversation summary
function getSavedConversationSummary(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.savedSummary || null;
}

// Get recent conversation summary
function getRecentConversationSummary(
  threadID,
  senderID,
  limit = 5
) {
  const user = getUser(threadID, senderID);

  return (user.messages || [])
    .slice(-Math.max(0, limit))
    .map(item => ({
      role: item.role,
      content: item.content,
      timestamp: item.timestamp
    }));
}

// Save important user information
function saveImportantInformation(
  threadID,
  senderID,
  key,
  value
) {
  const user = getUser(threadID, senderID);

  const name = String(key || "").trim();

  if (!name || value === undefined) return false;

  if (!user.context.importantInformation) {
    user.context.importantInformation = {};
  }

  user.context.importantInformation[name] = {
    value,
    updatedAt: Date.now()
  };

  saveMemory();

  return true;
}

// Get important user information
function getImportantInformation(threadID, senderID, key) {
  const user = getUser(threadID, senderID);

  const information = user.context.importantInformation || {};

  if (key) {
    return information[String(key)]?.value ?? null;
  }

  return information;
}

// Delete important user information
function deleteImportantInformation(threadID, senderID, key) {
  const user = getUser(threadID, senderID);

  const information = user.context.importantInformation || {};
  const name = String(key || "");

  if (!Object.prototype.hasOwnProperty.call(information, name)) {
    return false;
  }

  delete information[name];

  saveMemory();

  return true;
}

// Search messages within a time range
function getMessagesByTimeRange(
  threadID,
  senderID,
  startTime,
  endTime
) {
  const user = getUser(threadID, senderID);

  const start = Number(startTime);
  const end = Number(endTime);

  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return [];
  }

  return (user.messages || []).filter(item => {
    return (
      item.timestamp >= start &&
      item.timestamp <= end
    );
  });
}

// Get conversation messages from last N hours
function getMessagesFromLastHours(
  threadID,
  senderID,
  hours = 24
) {
  const end = Date.now();
  const start = end - Math.max(0, Number(hours) || 0) * 60 * 60 * 1000;

  return getMessagesByTimeRange(
    threadID,
    senderID,
    start,
    end
  );
}

// Create user memory backup
function createUserMemoryBackup(threadID, senderID) {
  const key = getUserKey(threadID, senderID);
  const user = memory.users[key];

  if (!user) return null;

  return JSON.parse(JSON.stringify({
    version: 1,
    exportedAt: Date.now(),
    user
  }));
}

// Restore user memory backup
function restoreUserMemoryBackup(
  threadID,
  senderID,
  backup
) {
  if (
    !backup ||
    backup.version !== 1 ||
    !backup.user ||
    typeof backup.user !== "object"
  ) {
    return false;
  }

  const key = getUserKey(threadID, senderID);

  memory.users[key] = {
    ...backup.user,
    senderID: String(senderID),
    threadID: String(threadID)
  };

  saveMemory();

  return true;
}

// Get user memory size
function getUserMemorySize(threadID, senderID) {
  const backup = createUserMemoryBackup(
    threadID,
    senderID
  );

  if (!backup) return 0;

  return Buffer.byteLength(
    JSON.stringify(backup),
    "utf8"
  );
}

// Export PART 10 functions
Object.assign(module.exports, {
  createConversationSummary,
  saveConversationSummary,
  getSavedConversationSummary,
  getRecentConversationSummary,
  saveImportantInformation,
  getImportantInformation,
  deleteImportantInformation,
  getMessagesByTimeRange,
  getMessagesFromLastHours,
  createUserMemoryBackup,
  restoreUserMemoryBackup,
  getUserMemorySize
});
// ===============================
// PREMA MEMORY - PART 11
// CONVERSATION FLOW & TOPIC TRACKING
// ===============================

// Save conversation stage
function setConversationStage(threadID, senderID, stage) {
  const user = getUser(threadID, senderID);

  user.context.conversationStage = {
    value: String(stage || "normal"),
    updatedAt: Date.now()
  };

  saveMemory();

  return user.context.conversationStage;
}

// Get conversation stage
function getConversationStage(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.conversationStage?.value || "normal";
}

// Save previous topic
function setPreviousTopic(threadID, senderID, topic) {
  const user = getUser(threadID, senderID);

  user.context.previousTopic = String(topic || "");

  saveMemory();

  return user.context.previousTopic;
}

// Get previous topic
function getPreviousTopic(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.previousTopic || null;
}

// Save topic transition
function addTopicTransition(
  threadID,
  senderID,
  fromTopic,
  toTopic
) {
  const user = getUser(threadID, senderID);

  if (!Array.isArray(user.context.topicTransitions)) {
    user.context.topicTransitions = [];
  }

  const transition = {
    from: String(fromTopic || ""),
    to: String(toTopic || ""),
    timestamp: Date.now()
  };

  user.context.topicTransitions.push(transition);

  user.context.topicTransitions =
    user.context.topicTransitions.slice(-50);

  saveMemory();

  return transition;
}

// Get topic transitions
function getTopicTransitions(
  threadID,
  senderID,
  limit = 10
) {
  const user = getUser(threadID, senderID);

  return (user.context.topicTransitions || [])
    .slice(-Math.max(0, limit));
}

// Save current conversation flow
function setConversationFlow(
  threadID,
  senderID,
  flow
) {
  const user = getUser(threadID, senderID);

  user.context.conversationFlow = {
    value: String(flow || "normal"),
    updatedAt: Date.now()
  };

  saveMemory();

  return true;
}

// Get current conversation flow
function getConversationFlow(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.conversationFlow?.value || "normal";
}

// Save last interaction details
function setLastInteractionDetails(
  threadID,
  senderID,
  details = {}
) {
  const user = getUser(threadID, senderID);

  user.context.lastInteractionDetails = {
    ...details,
    updatedAt: Date.now()
  };

  saveMemory();

  return user.context.lastInteractionDetails;
}

// Get last interaction details
function getLastInteractionDetails(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.lastInteractionDetails || null;
}

// Save conversation direction
function setConversationDirection(
  threadID,
  senderID,
  direction
) {
  const user = getUser(threadID, senderID);

  user.context.conversationDirection =
    String(direction || "open");

  saveMemory();

  return user.context.conversationDirection;
}

// Get conversation direction
function getConversationDirection(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.conversationDirection || "open";
}

// Save topic-specific message
function addTopicMessage(
  threadID,
  senderID,
  topic,
  message,
  role = "user"
) {
  const user = getUser(threadID, senderID);

  const topicName = normalizeText(topic);
  const content = String(message || "").trim();

  if (!topicName || !content) return false;

  if (!user.context.topicMessages) {
    user.context.topicMessages = {};
  }

  if (!Array.isArray(user.context.topicMessages[topicName])) {
    user.context.topicMessages[topicName] = [];
  }

  const entry = {
    role: String(role),
    content,
    timestamp: Date.now()
  };

  user.context.topicMessages[topicName].push(entry);

  user.context.topicMessages[topicName] =
    user.context.topicMessages[topicName].slice(-30);

  saveMemory();

  return entry;
}

// Get messages from a specific topic
function getTopicMessages(
  threadID,
  senderID,
  topic,
  limit = 10
) {
  const user = getUser(threadID, senderID);

  const topicName = normalizeText(topic);

  const messages =
    user.context.topicMessages?.[topicName] || [];

  return messages.slice(-Math.max(0, limit));
}

// Clear topic-specific messages
function clearTopicMessages(threadID, senderID, topic) {
  const user = getUser(threadID, senderID);

  const topicName = normalizeText(topic);

  if (!user.context.topicMessages?.[topicName]) {
    return false;
  }

  delete user.context.topicMessages[topicName];

  saveMemory();

  return true;
}

// Export PART 11 functions
Object.assign(module.exports, {
  setConversationStage,
  getConversationStage,
  setPreviousTopic,
  getPreviousTopic,
  addTopicTransition,
  getTopicTransitions,
  setConversationFlow,
  getConversationFlow,
  setLastInteractionDetails,
  getLastInteractionDetails,
  setConversationDirection,
  getConversationDirection,
  addTopicMessage,
  getTopicMessages,
  clearTopicMessages
});
// ===============================
// PREMA MEMORY - PART 12
// USER PREFERENCES & FEEDBACK
// ===============================

// Save user preference history
function addPreferenceHistory(
  threadID,
  senderID,
  category,
  value
) {
  const user = getUser(threadID, senderID);

  const name = String(category || "").trim();
  const preference = String(value || "").trim();

  if (!name || !preference) return false;

  if (!Array.isArray(user.context.preferenceHistory)) {
    user.context.preferenceHistory = [];
  }

  const entry = {
    category: name,
    value: preference,
    timestamp: Date.now()
  };

  user.context.preferenceHistory.push(entry);

  user.context.preferenceHistory =
    user.context.preferenceHistory.slice(-100);

  saveMemory();

  return entry;
}

// Get preference history
function getPreferenceHistory(
  threadID,
  senderID,
  category = null,
  limit = 20
) {
  const user = getUser(threadID, senderID);

  let history = user.context.preferenceHistory || [];

  if (category) {
    history = history.filter(item => {
      return item.category === String(category);
    });
  }

  return history.slice(-Math.max(0, limit));
}

// Save user feedback
function addUserFeedback(
  threadID,
  senderID,
  type,
  feedback,
  details = ""
) {
  const user = getUser(threadID, senderID);

  if (!Array.isArray(user.context.feedback)) {
    user.context.feedback = [];
  }

  const entry = {
    type: String(type || "general"),
    feedback: String(feedback || ""),
    details: String(details || ""),
    timestamp: Date.now()
  };

  user.context.feedback.push(entry);

  user.context.feedback =
    user.context.feedback.slice(-100);

  saveMemory();

  return entry;
}

// Get user feedback
function getUserFeedback(
  threadID,
  senderID,
  limit = 20
) {
  const user = getUser(threadID, senderID);

  return (user.context.feedback || [])
    .slice(-Math.max(0, limit));
}

// Save preferred reply style
function setPreferredReplyStyle(
  threadID,
  senderID,
  style
) {
  const user = getUser(threadID, senderID);

  user.context.preferredReplyStyle =
    String(style || "normal");

  saveMemory();

  return user.context.preferredReplyStyle;
}

// Get preferred reply style
function getPreferredReplyStyle(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.preferredReplyStyle || "normal";
}

// Save disliked topic
function addDislikedTopic(threadID, senderID, topic) {
  const user = getUser(threadID, senderID);

  const value = String(topic || "").trim();

  if (!value) return false;

  if (!Array.isArray(user.context.dislikedTopics)) {
    user.context.dislikedTopics = [];
  }

  const exists = user.context.dislikedTopics.some(item => {
    return normalizeText(item) === normalizeText(value);
  });

  if (!exists) {
    user.context.dislikedTopics.push(value);
  }

  user.context.dislikedTopics =
    user.context.dislikedTopics.slice(-50);

  saveMemory();

  return true;
}

// Get disliked topics
function getDislikedTopics(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.dislikedTopics || [];
}

// Remove disliked topic
function removeDislikedTopic(threadID, senderID, topic) {
  const user = getUser(threadID, senderID);

  const before = (
    user.context.dislikedTopics || []
  ).length;

  user.context.dislikedTopics = (
    user.context.dislikedTopics || []
  ).filter(item => {
    return normalizeText(item) !== normalizeText(topic);
  });

  saveMemory();

  return before !== user.context.dislikedTopics.length;
}

// Check whether a topic is disliked
function isDislikedTopic(threadID, senderID, topic) {
  const topics = getDislikedTopics(threadID, senderID);

  const target = normalizeText(topic);

  return topics.some(item => {
    return normalizeText(item) === target;
  });
}

// Save preferred conversation language
function setPreferredLanguage(
  threadID,
  senderID,
  language
) {
  const user = getUser(threadID, senderID);

  user.context.preferredLanguage =
    String(language || "banglish");

  saveMemory();

  return user.context.preferredLanguage;
}

// Get preferred conversation language
function getPreferredLanguage(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.preferredLanguage || "banglish";
}

// Save emoji preference
function setEmojiPreference(
  threadID,
  senderID,
  enabled
) {
  const user = getUser(threadID, senderID);

  user.context.useEmoji = Boolean(enabled);

  saveMemory();

  return user.context.useEmoji;
}

// Get emoji preference
function getEmojiPreference(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.useEmoji !== false;
}

// Get complete preference profile
function getCompletePreferenceProfile(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return {
    preferences: user.preferences || {},
    replyPreferences: user.context.replyPreferences || {},
    interests: user.context.interests || [],
    dislikedTopics: user.context.dislikedTopics || [],
    replyStyle: user.context.preferredReplyStyle || "normal",
    language: user.context.preferredLanguage || "banglish",
    useEmoji: user.context.useEmoji !== false
  };
}

// Export PART 12 functions
Object.assign(module.exports, {
  addPreferenceHistory,
  getPreferenceHistory,
  addUserFeedback,
  getUserFeedback,
  setPreferredReplyStyle,
  getPreferredReplyStyle,
  addDislikedTopic,
  getDislikedTopics,
  removeDislikedTopic,
  isDislikedTopic,
  setPreferredLanguage,
  getPreferredLanguage,
  setEmojiPreference,
  getEmojiPreference,
  getCompletePreferenceProfile
});
// ===============================
// PREMA MEMORY - PART 13
// SESSION & TIME BASED MEMORY
// ===============================

// Create a new conversation session
function startConversationSession(threadID, senderID) {
  const user = getUser(threadID, senderID);

  if (!Array.isArray(user.context.sessions)) {
    user.context.sessions = [];
  }

  const session = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    startedAt: Date.now(),
    endedAt: null,
    messageCount: 0,
    topic: user.context.currentTopic || null
  };

  user.context.sessions.push(session);

  user.context.sessions =
    user.context.sessions.slice(-50);

  user.context.activeSessionId = session.id;

  saveMemory();

  return session;
}

// Get active session
function getActiveConversationSession(threadID, senderID) {
  const user = getUser(threadID, senderID);

  const sessions = user.context.sessions || [];

  return sessions.find(session => {
    return session.id === user.context.activeSessionId;
  }) || null;
}

// End active session
function endConversationSession(threadID, senderID) {
  const user = getUser(threadID, senderID);

  const session = getActiveConversationSession(
    threadID,
    senderID
  );

  if (!session) return false;

  session.endedAt = Date.now();

  delete user.context.activeSessionId;

  saveMemory();

  return session;
}

// Record message in active session
function recordSessionMessage(threadID, senderID) {
  const user = getUser(threadID, senderID);

  let session = getActiveConversationSession(
    threadID,
    senderID
  );

  if (!session) {
    session = startConversationSession(
      threadID,
      senderID
    );
  }

  session.messageCount += 1;
  session.lastMessageAt = Date.now();

  saveMemory();

  return session;
}

// Get session history
function getConversationSessions(
  threadID,
  senderID,
  limit = 10
) {
  const user = getUser(threadID, senderID);

  return (user.context.sessions || [])
    .slice(-Math.max(0, limit));
}

// Get session duration
function getSessionDuration(session) {
  if (!session || !session.startedAt) return 0;

  const end = session.endedAt || Date.now();

  return Math.max(0, end - session.startedAt);
}

// Get current time period
function getTimePeriod(timestamp = Date.now()) {
  const hour = new Date(timestamp).getHours();

  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";

  return "night";
}

// Record activity by time period
function recordTimePeriodActivity(threadID, senderID) {
  const user = getUser(threadID, senderID);

  if (!user.context.timePeriodActivity) {
    user.context.timePeriodActivity = {
      morning: 0,
      afternoon: 0,
      evening: 0,
      night: 0
    };
  }

  const period = getTimePeriod();

  user.context.timePeriodActivity[period] =
    (user.context.timePeriodActivity[period] || 0) + 1;

  saveMemory();

  return user.context.timePeriodActivity;
}

// Get time period activity
function getTimePeriodActivity(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.timePeriodActivity || {
    morning: 0,
    afternoon: 0,
    evening: 0,
    night: 0
  };
}

// Save a special date or reminder
function addUserReminder(
  threadID,
  senderID,
  title,
  date,
  details = ""
) {
  const user = getUser(threadID, senderID);

  const reminderTitle = String(title || "").trim();
  const reminderDate = String(date || "").trim();

  if (!reminderTitle || !reminderDate) return false;

  if (!Array.isArray(user.context.reminders)) {
    user.context.reminders = [];
  }

  const reminder = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    title: reminderTitle,
    date: reminderDate,
    details: String(details || ""),
    createdAt: Date.now()
  };

  user.context.reminders.push(reminder);

  user.context.reminders =
    user.context.reminders.slice(-100);

  saveMemory();

  return reminder;
}

// Get user reminders
function getUserReminders(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.reminders || [];
}

// Delete reminder
function deleteUserReminder(threadID, senderID, reminderId) {
  const user = getUser(threadID, senderID);

  const reminders = user.context.reminders || [];

  const before = reminders.length;

  user.context.reminders = reminders.filter(item => {
    return item.id !== reminderId;
  });

  saveMemory();

  return before !== user.context.reminders.length;
}

// Get reminders matching a date
function getRemindersByDate(threadID, senderID, date) {
  const reminders = getUserReminders(threadID, senderID);

  const target = String(date || "");

  return reminders.filter(item => item.date === target);
}

// Save last conversation date
function setLastConversationDate(threadID, senderID) {
  const user = getUser(threadID, senderID);

  user.context.lastConversationDate =
    new Date().toISOString();

  saveMemory();

  return user.context.lastConversationDate;
}

// Get last conversation date
function getLastConversationDate(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.lastConversationDate || null;
}

// Export PART 13 functions
Object.assign(module.exports, {
  startConversationSession,
  getActiveConversationSession,
  endConversationSession,
  recordSessionMessage,
  getConversationSessions,
  getSessionDuration,
  getTimePeriod,
  recordTimePeriodActivity,
  getTimePeriodActivity,
  addUserReminder,
  getUserReminders,
  deleteUserReminder,
  getRemindersByDate,
  setLastConversationDate,
  getLastConversationDate
});
// ===============================
// PREMA MEMORY - PART 14
// SMART FACTS & MEMORY MANAGEMENT
// ===============================

// Save a fact with duplicate protection
function saveSmartFact(
  threadID,
  senderID,
  key,
  value,
  category = "general"
) {
  const user = getUser(threadID, senderID);

  const factKey = String(key || "").trim();
  const factValue = String(value || "").trim();

  if (!factKey || !factValue) return false;

  if (!user.context.smartFacts) {
    user.context.smartFacts = {};
  }

  const existing = user.context.smartFacts[factKey];

  if (
    existing &&
    normalizeText(existing.value) === normalizeText(factValue)
  ) {
    existing.lastSeen = Date.now();
    existing.count = (existing.count || 1) + 1;

    saveMemory();

    return existing;
  }

  const fact = {
    value: factValue,
    category: String(category || "general"),
    count: 1,
    createdAt: existing?.createdAt || Date.now(),
    updatedAt: Date.now(),
    lastSeen: Date.now()
  };

  user.context.smartFacts[factKey] = fact;

  saveMemory();

  return fact;
}

// Get a smart fact
function getSmartFact(threadID, senderID, key) {
  const user = getUser(threadID, senderID);

  return user.context.smartFacts?.[String(key)]?.value ?? null;
}

// Get all smart facts
function getAllSmartFacts(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return user.context.smartFacts || {};
}

// Get facts by category
function getSmartFactsByCategory(
  threadID,
  senderID,
  category
) {
  const facts = getAllSmartFacts(threadID, senderID);

  return Object.entries(facts)
    .filter(([key, item]) => {
      return item.category === String(category);
    })
    .map(([key, item]) => ({
      key,
      ...item
    }));
}

// Delete a smart fact
function deleteSmartFact(threadID, senderID, key) {
  const user = getUser(threadID, senderID);

  const facts = user.context.smartFacts || {};
  const factKey = String(key);

  if (!Object.prototype.hasOwnProperty.call(facts, factKey)) {
    return false;
  }

  delete facts[factKey];

  saveMemory();

  return true;
}

// Save fact update history
function addFactChangeHistory(
  threadID,
  senderID,
  key,
  oldValue,
  newValue
) {
  const user = getUser(threadID, senderID);

  if (!Array.isArray(user.context.factChangeHistory)) {
    user.context.factChangeHistory = [];
  }

  const entry = {
    key: String(key),
    oldValue: String(oldValue ?? ""),
    newValue: String(newValue ?? ""),
    timestamp: Date.now()
  };

  user.context.factChangeHistory.push(entry);

  user.context.factChangeHistory =
    user.context.factChangeHistory.slice(-100);

  saveMemory();

  return entry;
}

// Get fact change history
function getFactChangeHistory(
  threadID,
  senderID,
  limit = 20
) {
  const user = getUser(threadID, senderID);

  return (user.context.factChangeHistory || [])
    .slice(-Math.max(0, limit));
}

// Update fact and preserve old value
function updateSmartFact(
  threadID,
  senderID,
  key,
  newValue,
  category = "general"
) {
  const oldValue = getSmartFact(
    threadID,
    senderID,
    key
  );

  if (oldValue !== null) {
    addFactChangeHistory(
      threadID,
      senderID,
      key,
      oldValue,
      newValue
    );
  }

  return saveSmartFact(
    threadID,
    senderID,
    key,
    newValue,
    category
  );
}

// Find facts by keyword
function searchSmartFacts(
  threadID,
  senderID,
  keyword
) {
  const facts = getAllSmartFacts(threadID, senderID);
  const target = normalizeText(keyword);

  if (!target) return [];

  return Object.entries(facts)
    .filter(([key, item]) => {
      return (
        normalizeText(key).includes(target) ||
        normalizeText(item.value).includes(target) ||
        normalizeText(item.category).includes(target)
      );
    })
    .map(([key, item]) => ({
      key,
      ...item
    }));
}

// Remove old conversation moments
function cleanupOldMoments(
  threadID,
  senderID,
  days = 90
) {
  const user = getUser(threadID, senderID);

  const cutoff = Date.now() -
    Math.max(0, Number(days) || 0) * 86400000;

  const before = (user.context.moments || []).length;

  user.context.moments = (
    user.context.moments || []
  ).filter(item => item.timestamp >= cutoff);

  saveMemory();

  return before - user.context.moments.length;
}

// Remove old feedback
function cleanupOldFeedback(
  threadID,
  senderID,
  days = 180
) {
  const user = getUser(threadID, senderID);

  const cutoff = Date.now() -
    Math.max(0, Number(days) || 0) * 86400000;

  const before = (user.context.feedback || []).length;

  user.context.feedback = (
    user.context.feedback || []
  ).filter(item => item.timestamp >= cutoff);

  saveMemory();

  return before - user.context.feedback.length;
}

// Get memory overview
function getMemoryOverview(threadID, senderID) {
  const user = getUser(threadID, senderID);

  return {
    messages: (user.messages || []).length,
    interests: (user.context.interests || []).length,
    moments: (user.context.moments || []).length,
    reminders: (user.context.reminders || []).length,
    smartFacts: Object.keys(
      user.context.smartFacts || {}
    ).length,
    feedback: (user.context.feedback || []).length,
    sessions: (user.context.sessions || []).length,
    createdAt: user.createdAt,
    lastInteraction: user.lastInteraction
  };
}

// Export PART 14 functions
Object.assign(module.exports, {
  saveSmartFact,
  getSmartFact,
  getAllSmartFacts,
  getSmartFactsByCategory,
  deleteSmartFact,
  addFactChangeHistory,
  getFactChangeHistory,
  updateSmartFact,
  searchSmartFacts,
  cleanupOldMoments,
  cleanupOldFeedback,
  getMemoryOverview
});
// ===============================
// PREMA MEMORY - PART 15
// FINAL MEMORY SYSTEM & DATABASE
// ===============================

// Get complete memory database statistics
function getDatabaseStatistics() {
  const users = Object.values(memory.users);

  let totalMessages = 0;
  let totalFacts = 0;
  let totalInterests = 0;
  let totalSessions = 0;

  for (const user of users) {
    totalMessages += (user.messages || []).length;

    totalFacts += Object.keys(
      user.context?.smartFacts || {}
    ).length;

    totalInterests += (
      user.context?.interests || []
    ).length;

    totalSessions += (
      user.context?.sessions || []
    ).length;
  }

  return {
    totalUsers: users.length,
    totalMessages,
    totalFacts,
    totalInterests,
    totalSessions,
    generatedAt: Date.now()
  };
}

// Export complete memory database
function exportCompleteMemory() {
  return JSON.parse(JSON.stringify({
    version: 1,
    exportedAt: Date.now(),
    memory
  }));
}

// Import complete memory database
function importCompleteMemory(backup) {
  if (
    !backup ||
    backup.version !== 1 ||
    !backup.memory ||
    typeof backup.memory.users !== "object" ||
    Array.isArray(backup.memory.users)
  ) {
    return false;
  }

  memory = {
    users: backup.memory.users
  };

  saveMemory();

  return true;
}

// Get user memory by exact key
function getUserMemoryByKey(key) {
  const user = memory.users[String(key)];

  if (!user) return null;

  return JSON.parse(JSON.stringify(user));
}

// Delete user memory by exact key
function deleteUserMemoryByKey(key) {
  const userKey = String(key);

  if (!Object.prototype.hasOwnProperty.call(memory.users, userKey)) {
    return false;
  }

  delete memory.users[userKey];

  saveMemory();

  return true;
}

// Delete all user memories
function deleteAllUserMemories() {
  memory.users = {};

  saveMemory();

  return true;
}

// Check whether a user exists
function userMemoryExists(threadID, senderID) {
  const key = getUserKey(threadID, senderID);

  return Boolean(memory.users[key]);
}

// Get database file information
function getDatabaseInfo() {
  let fileSize = 0;

  try {
    if (fs.existsSync(MEMORY_FILE)) {
      fileSize = fs.statSync(MEMORY_FILE).size;
    }
  } catch (error) {
    fileSize = 0;
  }

  return {
    file: MEMORY_FILE,
    exists: fs.existsSync(MEMORY_FILE),
    fileSize,
    fileSizeKB: Number((fileSize / 1024).toFixed(2)),
    users: Object.keys(memory.users).length
  };
}

// Validate complete memory database
function validateCompleteMemory() {
  const issues = [];

  if (!memory || typeof memory !== "object") {
    issues.push("Invalid memory database");
  }

  if (
    !memory.users ||
    typeof memory.users !== "object" ||
    Array.isArray(memory.users)
  ) {
    issues.push("Invalid users collection");

    return {
      valid: false,
      issues
    };
  }

  for (const [key, user] of Object.entries(memory.users)) {
    if (!user || typeof user !== "object") {
      issues.push(`Invalid user record: ${key}`);
      continue;
    }

    if (!Array.isArray(user.messages)) {
      issues.push(`Invalid messages: ${key}`);
    }

    if (!Array.isArray(user.recentReplies)) {
      issues.push(`Invalid recentReplies: ${key}`);
    }

    if (!user.context || typeof user.context !== "object") {
      issues.push(`Invalid context: ${key}`);
    }
  }

  return {
    valid: issues.length === 0,
    issues,
    checkedUsers: Object.keys(memory.users).length
  };
}

// Save database safely
function forceSaveMemory() {
  try {
    saveMemory();

    return true;
  } catch (error) {
    console.error("Prema Memory Save Error:", error);

    return false;
  }
}

// Get memory system status
function getMemorySystemStatus() {
  const validation = validateCompleteMemory();

  return {
    system: "Prema Memory",
    version: "1.0.0",
    status: validation.valid ? "healthy" : "warning",
    statistics: getDatabaseStatistics(),
    database: getDatabaseInfo(),
    validation
  };
}

// Final exports
Object.assign(module.exports, {
  getDatabaseStatistics,
  exportCompleteMemory,
  importCompleteMemory,
  getUserMemoryByKey,
  deleteUserMemoryByKey,
  deleteAllUserMemories,
  userMemoryExists,
  getDatabaseInfo,
  validateCompleteMemory,
  forceSaveMemory,
  getMemorySystemStatus
});

console.log("[PREMA MEMORY] Memory system loaded successfully.");
