
const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { loadImage, createCanvas } = require("canvas");

module.exports = {
  config: {
    name: "kiss",
    version: "2.0.0",
    author: "Nahid",
    countDown: 5,
    role: 0,
    description: {
      en: "Create a kiss card with a mentioned member"
    },
    category: "love",
    guide: {
      en: "{pn} @mention"
    }
  },

  onStart: async function ({ message, event, api, usersData }) {
    let imgPath;
    let avatar1Path;
    let avatar2Path;

    try {
      const mentions = Object.keys(event.mentions || {});

      if (mentions.length === 0) {
        return message.reply("💋 Please mention someone to kiss!");
      }

      const senderID = event.senderID;
      const targetID = mentions[0];

      const [user1, user2] = await Promise.all([
        usersData.get(senderID),
        usersData.get(targetID)
      ]);

      const name1 = user1?.name || "Someone";
      const name2 = user2?.name || "Someone";

      const cacheDir = path.join(__dirname, "cache");
      await fs.ensureDir(cacheDir);

      const ts = Date.now();

      imgPath = path.join(cacheDir, `nahid_kiss_${ts}.jpg`);
      avatar1Path = path.join(cacheDir, `nahid_avt1_${ts}.jpg`);
      avatar2Path = path.join(cacheDir, `nahid_avt2_${ts}.jpg`);

      const getAvatar = async (uid, savePath) => {
        const response = await axios.get(
          `https://graph.facebook.com/${uid}/picture?height=720&width=720`,
          {
            responseType: "arraybuffer",
            timeout: 20000
          }
        );

        await fs.writeFile(savePath, Buffer.from(response.data));
        return loadImage(savePath);
      };

      const [img1, img2] = await Promise.all([
        getAvatar(senderID, avatar1Path),
        getAvatar(targetID, avatar2Path)
      ]);

      const W = 1000;
      const H = 550;

      const canvas = createCanvas(W, H);
      const ctx = canvas.getContext("2d");

      // Background
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#ff9aaf");
      bg.addColorStop(0.5, "#ff4f91");
      bg.addColorStop(1, "#a83279");

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Decorative hearts
      ctx.font = "40px sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.35)";

      [
        [100, 100], [880, 90], [500, 100],
        [130, 460], [870, 450], [500, 490]
      ].forEach(([x, y]) => {
        ctx.fillText("♥", x, y);
      });

      // Title
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 48px sans-serif";
      ctx.fillText("NAHID KISS", W / 2, 65);

      // Avatar positions
      const r = 155;
      const cy = 275;
      const x1 = 250;
      const x2 = 750;

      function drawAvatar(img, x) {
        ctx.save();

        ctx.shadowColor = "#8b174e";
        ctx.shadowBlur = 25;

        ctx.beginPath();
        ctx.arc(x, cy, r + 8, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(x, cy, r, 0, Math.PI * 2);
        ctx.clip();

        const scale = Math.max(
          (r * 2) / img.width,
          (r * 2) / img.height
        );

        const width = img.width * scale;
        const height = img.height * scale;

        ctx.drawImage(
          img,
          x - width / 2,
          cy - height / 2,
          width,
          height
        );

        ctx.restore();
      }

      drawAvatar(img1, x1);
      drawAvatar(img2, x2);

      // Kiss emoji
      ctx.textAlign = "center";
      ctx.font = "100px sans-serif";
      ctx.fillText("💋", W / 2, cy + 35);

      // Names
      ctx.font = "bold 28px sans-serif";
      ctx.fillStyle = "#ffffff";

      ctx.fillText(name1.slice(0, 20), x1, 475);
      ctx.fillText(name2.slice(0, 20), x2, 475);

      // Footer
      ctx.font = "bold 22px sans-serif";
      ctx.fillStyle = "#ffe4f0";
      ctx.fillText("MADE WITH LOVE ♥", W / 2, 525);

      await fs.writeFile(
        imgPath,
        canvas.toBuffer("image/jpeg", { quality: 0.92 })
      );

      await message.reply({
        body: `💋 ${name1} kissed ${name2}!\n\n💕 NAHID KISS CARD`,
        attachment: fs.createReadStream(imgPath)
      });

    } catch (err) {
      console.error("[NAHID KISS ERROR]", err);

      message.reply(
        "❌ Kiss Card তৈরি করা যায়নি!\n" +
        "Error: " + (err.message || "Unknown error")
      );

    } finally {
      for (const file of [imgPath, avatar1Path, avatar2Path]) {
        if (file) {
          try {
            await fs.remove(file);
          } catch (e) {}
        }
      }
    }
  }
};
