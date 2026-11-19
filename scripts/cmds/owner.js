
const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "2.1.0",
    author: "Nahid Hasan",
    role: 0,
    shortDescription: "Premium Owner Information",
    category: "Information",
    guide: {
      en: "{p}owner"
    }
  },

  onStart: async function ({ api, event }) {

    const ownerText = `
╭━━〔👑 𝙊𝙒𝙉𝙀𝙍〕━━╮
┃
┃ ✦ 𝙉𝘼𝙈𝙀 : 𝙉𝙖𝙝𝙞𝙙 𝙃𝙖𝙨𝙖𝙣
┃ ✦ 𝙉𝙄𝘾𝙆 : 𝙉𝙖𝙝𝙞𝙙
┃ ✦ 𝘼𝙂𝙀 : 20+
┃ ✦ 𝙍𝙀𝙇 : 𝙎𝙞𝙣𝙜𝙡𝙚
┣━━〔🎓 𝙎𝙏𝙐𝘿𝙔〕━━
┃ ✦ 𝘿𝙀𝙂 : 𝘾𝙎𝙀
┃ ✦ 𝙐𝙉𝙄 : 𝙐𝙩𝙩𝙖𝙧𝙖 𝙐𝙣𝙞.
┃ ✦ 𝘾𝙊𝙐𝙉𝙏𝙍𝙔 : 𝘽𝘿 🇧🇩
╰━━━━━━━━━━━━━━╯
💜 𝙊𝙒𝙉𝙀𝙍 : 𝙉𝘼𝙃𝙄𝘿
✨ 𝙏𝙃𝘼𝙉𝙆𝙎 𝙁𝙊𝙍 𝙑𝙄𝙎𝙄𝙏𝙄𝙉𝙂
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
