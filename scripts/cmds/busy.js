
if (!global.client.nahidPending)
  global.client.nahidPending = {};

const TARGET_NAME = "rahim";
const WAIT_TIME = 10 * 1000;

module.exports = {
  config: {
    name: "busy",
    version: "3.1",
    author: "Nahid Hasan",
    countDown: 3,
    role: 0,
    description: {
      en: "Automatic busy detection test"
    },
    category: "box chat",
    guide: {
      en: "{pn}: Test automatic busy detection"
    }
  },

  onStart: async function ({ message }) {
    return message.reply(
      "✅ Busy test system is running!\nTarget: rahim\nWait: 10 seconds"
    );
  },

  onChat: async function ({ event, api }) {
    const { senderID, threadID, body } = event;

    console.log("========== BUSY TEST ==========");
    console.log("Sender ID:", senderID);
    console.log("Sender Name:", event.senderName);
    console.log("Message:", body);
    console.log("===============================");

    const senderName = String(
      event.senderName ||
      event.sender?.name ||
      event.userName ||
      ""
    ).toLowerCase();

    // Target person replied: cancel timer
    if (senderName.includes(TARGET_NAME)) {
      const pending = global.client.nahidPending[threadID];

      if (pending) {
        clearTimeout(pending);
        delete global.client.nahidPending[threadID];

        console.log("[BUSY TEST] Rahim replied. Timer cancelled.");
      }

      return;
    }

    // Detect target name in message
    const regex = new RegExp(`\\b${TARGET_NAME}\\b`, "i");

    if (regex.test(String(body || ""))) {
      if (global.client.nahidPending[threadID]) return;

      console.log("[BUSY TEST] Rahim mentioned. Timer started.");

      const timer = setTimeout(async () => {
        try {
          await api.sendMessage(
            "🔕 Rahim এখন Busy! ১০ সেকেন্ডেও কোনো উত্তর পাওয়া যায়নি।",
            threadID
          );
        } catch (error) {
          console.log("[BUSY TEST ERROR]", error);
        }

        delete global.client.nahidPending[threadID];
      }, WAIT_TIME);

      global.client.nahidPending[threadID] = timer;
    }
  }
};
