
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "2.2.0",
    author: "Nahid Hasan",
    role: 0,
    shortDescription: "Owner Information",
    category: "Information",
    guide: {
      en: "{p}owner"
    }
  },

  onStart: async function ({ api, event }) {
    const ownerText = `
╭━━〔👑 OWNER INFO〕━━╮
┃ ✦ NAME : Nahid Hasan
┃ ✦ NICK : Nahid
┃ ✦ AGE  : 20+
┃ ✦ REL  : Single
┣━━〔🎓 STUDY〕━━
┃ ✦ DEG : CSE
┃ ✦ UNI : Uttara Uni.
┃ ✦ COUNTRY : BD 🇧🇩
╰━━━━━━━━━━━━━━╯

💜 OWNER : NAHID
✨ THANKS FOR VISITING
`;

    const imgPath = path.join(
      __dirname,
      "image",
      "WhatsApp Image 2026-11-20 at 1.21.44 AM.jpg"
    );

    try {
      if (!fs.existsSync(imgPath)) {
        return api.sendMessage(
          "❌ Owner image not found! Check the image folder and file name.",
          event.threadID,
          null,
          event.messageID
        );
      }

      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        (err) => {
          if (err) {
            console.error("Owner command error:", err);
          }
        },
        event.messageID
      );

    } catch (err) {
      console.error("Owner command error:", err);

      api.sendMessage(
        ownerText,
        event.threadID,
        null,
        event.messageID
      );
    }
  }
};
