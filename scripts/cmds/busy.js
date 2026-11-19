
if (!global.client.busyList)
  global.client.busyList = {};

if (!global.client.nahidPending)
  global.client.nahidPending = {};

const NAHID_NAME = "nahid";
const WAIT_TIME = 2 * 60 * 1000;

module.exports = {
  config: {
    name: "busy",
    version: "2.0",
    author: "Nahid Hasan",
    countDown: 5,
    role: 0,
    description: {
      en: "Turn on busy mode and automatically detect when Nahid does not reply"
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
        "🔕 | Nahid এখন Busy! ২ মিনিট অপেক্ষা করার পরও কোনো উত্তর পাওয়া যায়নি।"
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

    // Nahid-এর নাম শনাক্ত করার চেষ্টা
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
    const isNahid = senderName.toLowerCase().includes(NAHID_NAME);

    // Nahid এই গ্রুপে উত্তর দিলে অপেক্ষমাণ টাইমার বাতিল
    if (isNahid) {
      const pending = global.client.nahidPending[threadID];

      if (pending) {
        clearTimeout(pending.timer);
        delete global.client.nahidPending[threadID];
      }

      return;
    }

    // মেসেজে Nahid নাম থাকলে ২ মিনিটের টাইমার চালু
    const messageText = String(body || "");

    if (/\bnahid\b/i.test(messageText)) {
      // একই গ্রুপে আগে থেকেই টাইমার থাকলে নতুন করে চালু করবে না
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

        if (typeof timer.unref === "function") {
          timer.unref();
        }
      }
    }

    // আগের manual busy feature
    if (!mentions || Object.keys(mentions).length === 0) return;

    const arrayMentions = Object.keys(mentions);

    for (const userID of arrayMentions) {
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
