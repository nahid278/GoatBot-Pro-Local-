
if (!global.client.busyList)
  global.client.busyList = {};

if (!global.client.nahidPending)
  global.client.nahidPending = {};

const NAHID_NAME = "test";
const WAIT_TIME = 10 * 1000;

module.exports = {
  config: {
    name: "busy",
    version: "2.1",
    author: "Nahid Hasan",
    countDown: 5,
    role: 0,
    description: {
      en: "Busy mode with automatic no-reply detection"
    },
    category: "box chat",
    guide: {
      en:
        "{pn}: Turn on busy mode\n" +
        "{pn} <reason>: Turn on busy mode with a reason\n" +
        "{pn} off: Turn off busy mode"
    }
  },

  langs: {
    en: {
      turnedOff: "✅ | Busy mode has been turned off.",
      turnedOn: "✅ | Busy mode has been turned on.",
      turnedOnWithReason: "✅ | Busy mode has been turned on. Reason: %1",
      alreadyOn: "⚠️ | %1 is currently busy.",
      alreadyOnWithReason: "⚠️ | %1 is currently busy. Reason: %2",
      nahidBusy:
        "🔕 | Test এখন Busy! ১০ সেকেন্ড অপেক্ষা করার পরও কোনো উত্তর পাওয়া যায়নি।"
    }
  },

  onStart: async function ({ args, message, event, getLang, usersData }) {
    const { senderID } = event;

    if (args[0] === "off") {
      const { data } = await usersData.get(senderID);
      delete data.busy;

      await usersData.set(senderID, data, "data");
      return message.reply(getLang("turnedOff"));
    }

    const reason = args.join(" ").trim();

    await usersData.set(senderID, reason, "data.busy");

    return message.reply(
      reason
        ? getLang("turnedOnWithReason", reason)
        : getLang("turnedOn")
    );
  },

  onChat: async function ({
    event,
    message,
    getLang,
    usersData,
    api
  }) {
    const { senderID, threadID, body, mentions } = event;

    // Sender name detect
    async function getSenderName(uid) {
      try {
        if (event.senderName) return event.senderName;

        if (usersData && typeof usersData.getName === "function") {
          const name = await usersData.getName(uid);
          if (name) return name;
        }

        const user = global.db?.allUserData?.find(
          item => String(item.userID) === String(uid)
        );

        if (user?.name) return user.name;
        if (user?.data?.name) return user.data.name;
      } catch (e) {}

      return "";
    }

    const senderName = await getSenderName(senderID);
    const isTestUser = senderName.toLowerCase().includes(NAHID_NAME);

    // Test user replies within 10 seconds -> cancel timer
    if (isTestUser) {
      const pending = global.client.nahidPending[threadID];

      if (pending) {
        clearTimeout(pending.timer);
        delete global.client.nahidPending[threadID];

        console.log("[BUSY] Test replied. Timer cancelled.");
      }

      return;
    }

    // Detect test name in message
    const messageText = String(body || "");

    if (new RegExp(`\\b${NAHID_NAME}\\b`, "i").test(messageText)) {
      if (!global.client.nahidPending[threadID]) {
        const timer = setTimeout(async () => {
          try {
            await api.sendMessage(
              getLang("nahidBusy"),
              threadID
            );
          } catch (error) {
            console.error("[BUSY] Message sending error:", error);
          }

          delete global.client.nahidPending[threadID];
        }, WAIT_TIME);

        global.client.nahidPending[threadID] = {
          timer,
          startedAt: Date.now()
        };

        console.log("[BUSY] Test mentioned. 10 second timer started.");
      }
    }

    // Existing manual busy mention system
    if (!mentions || Object.keys(mentions).length === 0) return;

    for (const userID of Object.keys(mentions)) {
      const reasonBusy =
        global.db.allUserData.find(
          item => String(item.userID) === String(userID)
        )?.data?.busy || false;

      if (reasonBusy !== false) {
        return message.reply(
          reasonBusy
            ? getLang(
                "alreadyOnWithReason",
                mentions[userID].replace("@", ""),
                reasonBusy
              )
            : getLang(
                "alreadyOn",
                mentions[userID].replace("@", "")
              )
        );
      }
    }
  }
};
