
const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "2.1.0",
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

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");

    try {
      await fs.ensureDir(cacheDir);

      const imgLink = "https://i.imgur.com/1G4ZhU7.jpeg";

      request(imgLink)
        .on("error", (err) => {
          console.error("Owner image error:", err);
          api.sendMessage(
            ownerText,
            event.threadID,
            null,
            event.messageID
          );
        })
        .pipe(fs.createWriteStream(imgPath))
        .on("finish", () => {
          api.sendMessage(
            {
              body: ownerText,
              attachment: fs.createReadStream(imgPath)
            },
            event.threadID,
            (err) => {
              if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
              }

              if (err) console.error(err);
            },
            event.messageID
          );
        });

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
