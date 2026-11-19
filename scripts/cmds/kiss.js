
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { loadImage, createCanvas } = require("canvas");

module.exports = {
  config: {
    name: "kiss",
    version: "2.2",
    author: "Nahid Hasan",
    countDown: 5,
    role: 0,
    description: "Generate a kiss card",
    category: "love",
    guide: {
      en: "{pn} @mention",
      bn: "{pn} @mention"
    }
  },

  onStart: async function ({ message, event, api, usersData }) {
    let files = [];

    try {
      const mentions = Object.keys(event.mentions || {});

      if (!mentions.length) {
        return message.reply("💋 যাকে Kiss করতে চাও তাকে Mention করো!");
      }

      const senderID = event.senderID;
      const targetID = mentions[0];

      if (senderID === targetID) {
        return message.reply("😅 নিজেকে Kiss করা যাবে না!");
      }

      await message.reply("💋 NAHID Kiss Card তৈরি হচ্ছে...");

      const [user1, user2] = await Promise.all([
        usersData.get(senderID),
        usersData.get(targetID)
      ]);

      const name1 = user1?.name || "Someone";
      const name2 = user2?.name || "Someone";

      const cacheDir = path.join(__dirname, "cache");
      await fs.ensureDir(cacheDir);

      const timestamp = Date.now();

      const avatar1Path = path.join(cacheDir, `kiss_avt1_${timestamp}.jpg`);
      const avatar2Path = path.join(cacheDir, `kiss_avt2_${timestamp}.jpg`);
      const outputPath = path.join(cacheDir, `kiss_card_${timestamp}.jpg`);

      files = [avatar1Path, avatar2Path, outputPath];

      // Download profile picture
      const getAvatar = async (uid, savePath) => {
        let imageBuffer = null;

        // Method 1: Bot API
        try {
          const info = await new Promise((resolve, reject) => {
            api.getUserInfo(uid, (err, result) => {
              if (err) return reject(err);
              resolve(result);
            });
          });

          const profile = info?.[uid];
          const avatarURL =
            profile?.thumbSrc ||
            profile?.profileUrl ||
            profile?.photoUrl;

          if (avatarURL) {
            const response = await axios.get(avatarURL, {
              responseType: "arraybuffer",
              timeout: 20000,
              headers: {
                "User-Agent": "Mozilla/5.0"
              }
            });

            imageBuffer = Buffer.from(response.data);
            console.log("[KISS] Bot API avatar downloaded:", uid);
          }
        } catch (err) {
          console.log("[KISS] Bot API avatar failed:", err.message);
        }

        // Method 2: Graph API fallback
        if (!imageBuffer || !imageBuffer.length) {
          try {
            const response = await axios.get(
              `https://graph.facebook.com/${uid}/picture?width=720&height=720`,
              {
                responseType: "arraybuffer",
                timeout: 20000,
                maxRedirects: 5,
                headers: {
                  "User-Agent": "Mozilla/5.0"
                }
              }
            );

            imageBuffer = Buffer.from(response.data);
            console.log("[KISS] Graph avatar downloaded:", uid);
          } catch (err) {
            console.log("[KISS] Graph avatar failed:", err.message);
          }
        }

        if (!imageBuffer || !imageBuffer.length) {
          throw new Error("Profile picture download failed: " + uid);
        }

        await fs.writeFile(savePath, imageBuffer);

        const image = await loadImage(savePath);

        if (!image.width || !image.height) {
          throw new Error("Invalid profile image: " + uid);
        }

        return image;
      };

      const [img1, img2] = await Promise.all([
        getAvatar(senderID, avatar1Path),
        getAvatar(targetID, avatar2Path)
      ]);

      // Canvas
      const W = 1000;
      const H = 550;

      const canvas = createCanvas(W, H);
      const ctx = canvas.getContext("2d");

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, W, H);
      gradient.addColorStop(0, "#ff9aaf");
      gradient.addColorStop(0.5, "#ee0979");
      gradient.addColorStop(1, "#a83279");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      // Decorative hearts
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.font = "42px sans-serif";

      [
        [80, 100],
        [900, 100],
        [480, 130],
        [100, 480],
        [900, 470],
        [500, 500]
      ].forEach(([x, y]) => {
        ctx.fillText("♥", x, y);
      });

      // Title
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 48px sans-serif";
      ctx.fillText("NAHID KISS", W / 2, 65);

      const cy = 275;
      const radius = 150;

      // Draw circular avatar
      function drawAvatar(img, x) {
        ctx.save();

        ctx.shadowColor = "#660033";
        ctx.shadowBlur = 20;

        ctx.beginPath();
        ctx.arc(x, cy, radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(x, cy, radius, 0, Math.PI * 2);
        ctx.clip();

        const scale = Math.max(
          (radius * 2) / img.width,
          (radius * 2) / img.height
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

      drawAvatar(img1, 250);
      drawAvatar(img2, 750);

      // Center kiss emoji
      ctx.font = "100px sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("💋", W / 2, cy + 35);

      // Names
      ctx.font = "bold 28px sans-serif";
      ctx.fillStyle = "#ffffff";

      ctx.fillText(name1.slice(0, 22), 250, 470);
      ctx.fillText(name2.slice(0, 22), 750, 470);

      // Footer
      ctx.font = "bold 22px sans-serif";
      ctx.fillStyle = "#ffe4f0";
      ctx.fillText("MADE WITH LOVE ♥", W / 2, 525);

      // Save card
      await fs.writeFile(
        outputPath,
        canvas.toBuffer("image/jpeg", { quality: 0.92 })
      );

      // Send card
      await message.reply({
        body: `💋 ${name1} Kissed ${name2}!\n💕 NAHID KISS`,
        attachment: fs.createReadStream(outputPath)
      });

    } catch (err) {
      console.error("\n========== NAHID KISS ERROR ==========");
      console.error("Message:", err.message);
      console.error("Stack:", err.stack);
      console.error("======================================\n");

      await message.reply(
        "🥹 Kiss Card তৈরি করা যায়নি!\nError: " +
        (err.message || "Unknown error")
      );

    } finally {
      for (const file of files) {
        try {
          await fs.remove(file);
        } catch (err) {
          console.log("Cleanup error:", err.message);
        }
      }
    }
  }
};
