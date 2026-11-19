
if (!global.client.nahidPending)
  global.client.nahidPending = {};

const TARGET_UID = "100012345678901"; // Demo Facebook UID
const TARGET_NAME = "rahim";
const WAIT_TIME = 10 * 1000;

module.exports = {
  config: {
    name: "busy",
    version: "4.0",
    author: "Nahid Hasan",
    countDown: 3,
    role: 0,
    description: {
      en: "Automatic busy detection"
    },
    category: "box chat",
    guide: {
      en: "{pn}: Test automatic busy detection"
    }
  },

  onStart: async function ({ message }) {
    return message.reply(
      "✅ Busy test started!\nTarget: rahim\nUID: " +
      TARGET_UID +
      "\nWait: 10 seconds"
    );
  },

  onChat: async function ({ event, api }) {
    const { senderID, threadID, body } = event;

    console.log("========== BUSY TEST ==========");
    console.log("Sender UID:", senderID);
    console.log("Message:", body);
    console.log("===============================");

    // Target user replied
    if (String(senderID) === TARGET_UID) {
      const pending = global.client.nahidPending[threadID];

      if (pending) {
        clearTimeout(pending);
        delete global.client.nahidPending[threadID];

        console.log("[BUSY] Rahim replied. Timer cancelled.");
      }

      return;
    }

    // Detect target name in message
    const regex = new RegExp(`\\b${TARGET_NAME}\\b`, "i");

    if (regex.test(String(body || ""))) {
      if (global.client.nahidPending[threadID]) return;

      console.log("[BUSY] Rahim mentioned. Timer started.");

      const timer = setTimeout(async () => {
        try {
          await api.sendMessage(
            "🔕 Rahim এখন Busy! ১০ সেকেন্ডেও কোনো উত্তর পাওয়া যায়নি।",
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
