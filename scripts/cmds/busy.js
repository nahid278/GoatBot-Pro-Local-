
if (!global.client.nahidPending)
  global.client.nahidPending = {};

const TARGET_UID = "100066315452598";
const TARGET_NAME = "nahid";
const WAIT_TIME = 30 * 1000;

module.exports = {
  config: {
    name: "busy",
    version: "4.1",
    author: "Nahid Hasan",
    countDown: 3,
    role: 0,
    description: {
      en: "Automatic busy detection for Nahid"
    },
    category: "box chat",
    guide: {
      en: "{pn}: Check busy system"
    }
  },

  onStart: async function ({ message }) {
    return message.reply(
      "✅ Nahid Busy System Active!\n" +
      "UID: " + TARGET_UID + "\n" +
      "Wait Time: 10 Seconds"
    );
  },

  onChat: async function ({ event, api }) {
    const { senderID, threadID, body } = event;

    console.log("========== BUSY SYSTEM ==========");
    console.log("Sender UID:", senderID);
    console.log("Message:", body);
    console.log("=================================");

    // Nahid replies: cancel pending timer
    if (String(senderID) === TARGET_UID) {
      const pending = global.client.nahidPending[threadID];

      if (pending) {
        clearTimeout(pending);
        delete global.client.nahidPending[threadID];

        console.log("[BUSY] Nahid replied. Timer cancelled.");
      }

      return;
    }

    // Detect Nahid name in message
    const regex = new RegExp(`\\b${TARGET_NAME}\\b`, "i");

    if (regex.test(String(body || ""))) {
      if (global.client.nahidPending[threadID]) return;

      console.log("[BUSY] Nahid mentioned. Timer started.");

      const timer = setTimeout(async () => {
        try {
          await api.sendMessage(
            "🔕 Nahid এখন Busy! ১০ সেকেন্ডেও কোনো উত্তর পাওয়া যায়নি।",
            threadID
          );
        } catch (error) {
          console.log("[BUSY ERROR]", error);
        }

        delete global.client.nahidPending[threadID];
      }, WAIT_TIME);

      global.client.nahidPending[threadID] = timer;
    }
  }
};
