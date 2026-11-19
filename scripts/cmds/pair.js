
const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { loadImage, createCanvas } = require("canvas");

module.exports = {
  config: {
    name: "pair",
    version: "3.0.0",
    author: "Nahid Hasan",
    countDown: 5,
    role: 0,
    description: {
      en: "Find today's random couple in the group",
      bn: "আজকের Random জুটি খুঁজে বের করো"
    },
    category: "fun",
    guide: {
      en: "{pn}",
      bn: "{pn}"
    }
  },

  langs: {
    en: {
      noMembers: "❌ | Not enough members in this group!",
      noGender: "❌ | Your Facebook gender information could not be detected. Please try again.",
      noMatch: "❌ | No opposite-gender member found in this group!",
      avatarError: "❌ | Failed to load Facebook profile pictures.",
      error: "❌ | Failed to generate pair. Please try again.",
      result: "💕 TODAY'S PERFECT COUPLE 💕\n\n👑 %1\n❤️ + ❤️\n👑 %2\n\n💗 Compatibility: %3%\n\n✨ Made for each other!"
    },

    bn: {
      noMembers: "❌ | গ্রুপে পর্যাপ্ত সদস্য নেই!",
      noGender: "❌ | তোমার Facebook Gender শনাক্ত করা যায়নি। আবার চেষ্টা করো।",
      noMatch: "❌ | গ্রুপে বিপরীত Gender-এর কোনো সদস্য পাওয়া যায়নি!",
      avatarError: "❌ | Facebook Profile Picture লোড করা যায়নি।",
      error: "❌ | জুটি তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করো।",
      result: "💕 আজকের সেরা জুটি 💕\n\n👑 %1\n❤️ + ❤️\n👑 %2\n\n💗 ভালোবাসার মিল: %3%\n\n✨ Made for each other!"
    }
  },

  onStart: async function ({
    event,
    message,
    getLang,
    usersData,
    api
  }) {

    const { threadID, senderID } = event;

    const cacheDir = path.join(__dirname, "cache");

    let outputPath = null;

    try {

      await fs.ensureDir(cacheDir);

      // Get group information
      const threadInfo = await api.getThreadInfo(threadID);

      const botID = String(api.getCurrentUserID());

      const members = (threadInfo.participantIDs || [])
        .map(id => String(id))
        .filter(id =>
          id !== botID &&
          id !== String(senderID)
        );

      if (members.length === 0) {
        return message.reply(getLang("noMembers"));
      }

      // Get and refresh user gender
      const getGender = async (uid) => {

        try {

          await usersData.refreshInfo(uid);

          const user = await usersData.get(uid);

          const gender = user?.gender ??
                         user?.data?.gender;

          const value = Number(gender);

          // Facebook gender:
          // 1 = Female
          // 2 = Male

          if (value === 1 || value === 2) {
            return value;
          }

          return 0;

        } catch (err) {

          console.log(
            "[PAIR GENDER ERROR]",
            uid,
            err.message
          );

          return 0;
        }
      };

      // Get sender gender
      const senderGender = await getGender(senderID);

      if (![1, 2].includes(senderGender)) {
        return message.reply(getLang("noGender"));
      }

      // Find opposite gender members
      const oppositeMembers = [];

      for (const uid of members) {

        const gender = await getGender(uid);

        if (
          senderGender === 1 && gender === 2 ||
          senderGender === 2 && gender === 1
        ) {
          oppositeMembers.push(uid);
        }
      }

      // No opposite gender found
      if (oppositeMembers.length === 0) {
        return message.reply(getLang("noMatch"));
      }

      // Select random opposite gender member
      const id2 = oppositeMembers[
        Math.floor(Math.random() * oppositeMembers.length)
      ];

      // Compatibility
      const compatibility =
        Math.floor(Math.random() * 51) + 50;

      // Get user names
      const [user1, user2] = await Promise.all([
        usersData.get(senderID),
        usersData.get(id2)
      ]);

      const name1 = user1?.name || "Unknown";
      const name2 = user2?.name || "Unknown";

      // Get Facebook profile pictures
      const [avatar1, avatar2] = await Promise.all([
        usersData.getAvatarUrl(senderID),
        usersData.getAvatarUrl(id2)
      ]);

      if (!avatar1 || !avatar2) {
        return message.reply(getLang("avatarError"));
      }

      // Download profile pictures
      const downloadImage = async (url) => {

        const response = await axios.get(url, {
          responseType: "arraybuffer",
          timeout: 20000,
          maxRedirects: 5,
          headers: {
            "User-Agent": "Mozilla/5.0"
          }
        });

        return Buffer.from(response.data);
      };

      const [buffer1, buffer2] = await Promise.all([
        downloadImage(avatar1),
        downloadImage(avatar2)
      ]);

      // Load images
      const [img1, img2] = await Promise.all([
        loadImage(buffer1),
        loadImage(buffer2)
      ]);

      // Canvas setup
      const W = 800;
      const H = 400;

      const canvas = createCanvas(W, H);
      const ctx = canvas.getContext("2d");

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, W, H);

      grad.addColorStop(0, "#ff6b6b");
      grad.addColorStop(0.5, "#ee0979");
      grad.addColorStop(1, "#ff6b6b");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Decorative hearts
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#ffffff";
      ctx.font = "30px sans-serif";

      for (let i = 0; i < 15; i++) {
        ctx.fillText(
          "♥",
          Math.random() * W,
          Math.random() * H
        );
      }

      ctx.globalAlpha = 1;

      // Draw circular avatar
      const r = 125;
      const avatarSize = r * 2;
      const avatarY = 65;

      const drawAvatar = (img, x) => {

        ctx.save();

        ctx.beginPath();
        ctx.arc(
          x + r,
          avatarY + r,
          r,
          0,
          Math.PI * 2
        );

        ctx.closePath();
        ctx.clip();

        // Center crop
        const scale = Math.max(
          avatarSize / img.width,
          avatarSize / img.height
        );

        const sw = avatarSize / scale;
        const sh = avatarSize / scale;

        const sx = (img.width - sw) / 2;
        const sy = (img.height - sh) / 2;

        ctx.drawImage(
          img,
          sx,
          sy,
          sw,
          sh,
          x,
          avatarY,
          avatarSize,
          avatarSize
        );

        ctx.restore();

        // Avatar border
        ctx.beginPath();

        ctx.arc(
          x + r,
          avatarY + r,
          r,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 6;
        ctx.stroke();
      };

      // First avatar
      drawAvatar(img1, 35);

      // Second avatar
      drawAvatar(img2, W - avatarSize - 35);

      // Center heart
      ctx.font = "bold 55px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";

      ctx.fillText(
        "❤️",
        W / 2,
        190
      );

      // User names
      ctx.font = "bold 21px sans-serif";
      ctx.fillStyle = "#ffffff";

      const fitText = (text, maxWidth) => {

        let value = String(text);

        while (
          ctx.measureText(value).width > maxWidth &&
          value.length > 3
        ) {
          value = value.slice(0, -1);
        }

        if (value !== text) {
          value += "...";
        }

        return value;
      };

      ctx.fillText(
        fitText(name1, 280),
        160,
        340
      );

      ctx.fillText(
        fitText(name2, 280),
        W - 160,
        340
      );

      // Compatibility text
      ctx.font = "bold 20px sans-serif";
      ctx.fillStyle = "#ffffff";

      ctx.fillText(
        compatibility + "% COMPATIBILITY",
        W / 2,
        260
      );

      // Compatibility bar
      const barW = 250;
      const barH = 16;

      const barX = (W - barW) / 2;
      const barY = 275;

      ctx.beginPath();

      ctx.roundRect(
        barX,
        barY,
        barW,
        barH,
        10
      );

      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fill();

      ctx.beginPath();

      ctx.roundRect(
        barX,
        barY,
        barW * compatibility / 100,
        barH,
        10
      );

      const barGradient = ctx.createLinearGradient(
        barX,
        0,
        barX + barW,
        0
      );

      barGradient.addColorStop(0, "#ffb6c1");
      barGradient.addColorStop(1, "#ffffff");

      ctx.fillStyle = barGradient;
      ctx.fill();

      // Footer
      ctx.font = "15px sans-serif";
      ctx.fillStyle = "#ffffff";

      ctx.fillText(
        "MADE WITH LOVE ❤️",
        W / 2,
        375
      );

      // Save image
      outputPath = path.join(
        cacheDir,
        `pair_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`
      );

      await fs.writeFile(
        outputPath,
        canvas.toBuffer("image/jpeg", {
          quality: 0.92
        })
      );

      // Result message
      const body = getLang(
        "result",
        name1,
        name2,
        compatibility
      );

      // Send result
      await message.reply({
        body,
        attachment: fs.createReadStream(outputPath)
      });

    } catch (err) {

      console.error("[PAIR ERROR]", err);

      return message.reply(getLang("error"));

    } finally {

      // Remove temporary image
      try {

        if (outputPath && await fs.pathExists(outputPath)) {
          await fs.remove(outputPath);
        }

      } catch (cleanupError) {

        console.error(
          "[PAIR CLEANUP ERROR]",
          cleanupError
        );
      }
    }
  }
};
