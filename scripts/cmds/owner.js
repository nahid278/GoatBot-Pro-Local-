
const fs = require("fs-extra");
const request = require("request");
const path = require("path");

module.exports = {
  config: {
    name: "owner",
    version: "2.0.0",
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
╭━━━〔 👑 𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 〕━━━╮
┃
┃  ✦ 𝐍𝐀𝐌𝐄       : 𝐍𝐚𝐡𝐢𝐝 𝐇𝐚𝐬𝐚𝐧
┃  ✦ 𝐍𝐈𝐂𝐊𝐍𝐀𝐌𝐄   : 𝐍𝐚𝐡𝐢𝐝
┃  ✦ 𝐀𝐆𝐄        : 20+
┃  ✦ 𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍   : 𝐒𝐢𝐧𝐠𝐥𝐞
┃
┣━━━〔 🎓 𝐄𝐃𝐔𝐂𝐀𝐓𝐈𝐎𝐍 〕━━━
┃
┃  ✦ 𝐏𝐑𝐎𝐅𝐄𝐒𝐒𝐈𝐎𝐍 : 𝐂𝐒𝐄 𝐒𝐭𝐮𝐝𝐞𝐧𝐭
┃  ✦ 𝐈𝐍𝐒𝐓𝐈𝐓𝐔𝐓𝐄 : 𝐔𝐭𝐭𝐚𝐫𝐚 𝐔𝐧𝐢𝐯𝐞𝐫𝐬𝐢𝐭𝐲
┃  ✦ 𝐂𝐎𝐔𝐍𝐓𝐑𝐘   : 𝐁𝐚𝐧𝐠𝐥𝐚𝐝𝐞𝐬𝐡 🇧🇩
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

       ✨ 𝐎𝐖𝐍𝐄𝐑 : 𝐍𝐀𝐇𝐈𝐃 𝐇𝐀𝐒𝐀𝐍
       💜 𝐓𝐇𝐀𝐍𝐊𝐒 𝐅𝐎𝐑 𝐕𝐈𝐒𝐈𝐓𝐈𝐍𝐆
`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");

    try {
      await fs.ensureDir(cacheDir);

      const imgLink = "https://i.imgur.com/1G4ZhU7.jpeg";

      request(imgLink)
        .on("error", (err) => {
          console.error("Owner image error:", err);
          api.sendMessage(ownerText, event.threadID, null, event.messageID);
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

