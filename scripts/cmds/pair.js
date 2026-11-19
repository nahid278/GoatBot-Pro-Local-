
const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { loadImage, createCanvas } = require("canvas");

module.exports = {
  config: {
    name: "pair",
    version: "2.0.0",
    author: "Nahid Hasan",
    countDown: 5,
    role: 0,
    description: {
      en: "Find a random couple in the group",
      bn: "গ্রুপের Random Couple খুঁজে বের করো"
    },
    category: "fun",
    guide: {
      en: "{pn}"
    }
  },

  langs: {
    en: {
      noMembers: "❌ | Not enough members in this group!",
      error: "❌ | Something went wrong. Please try again.",
      result: "💕 TODAY'S PERFECT COUPLE 💕\n\n👑 %1\n❤️ + ❤️\n👑 %2\n\n💗 Compatibility: %3%\n\n✨ Made for each other!"
    },
    bn: {
      noMembers: "❌ | গ্রুপে Pair করার মতো পর্যাপ্ত সদস্য নেই!",
      error: "❌ | Pair তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করো।",
      result: "💕 আজকের সেরা জুটি 💕\n\n👑 %1\n❤️ + ❤️\n👑 %2\n\n💗 ভালোবাসার মিল: %3%\n\n✨ Made for each other!"
    }
  },

  onStart: async function ({
    event,
    message,
    getLang,
    threadsData,
    usersData,
    api
  }) {

    let outputPath = null;

    try {
      const { threadID, senderID } = event;

      // Get group information
      const threadInfo = await api.getThreadInfo(threadID);

      const botID = api.getCurrentUserID();

      const members = threadInfo.participantIDs.filter(
        id => String(id) !== String(botID) &&
              String(id) !== String(senderID)
      );

      if (members.length < 1) {
        return message.reply(getLang("noMembers"));
      }

      // Random member selection
      const id1 = senderID;
      const id2 = members[
        Math.floor(Math.random() * members.length)
      ];

      const compatibility = Math.floor(
        Math.random() * 51
      ) + 50;

      // Get user names
      const [user1, user2] = await Promise.all([
        usersData.get(id1),
        usersData.get(id2)
      ]);

      const name1 = user1?.name || "Unknown";
      const name2 = user2?.name || "Unknown";

      // Get Facebook profile information
      const getUserInfo = (uid) => {
        return new Promise((resolve) => {
          if (typeof api.getUserInfo !== "function") {
            return resolve(null);
          }

          let completed = false;

          const finish = (data) => {
            if (completed) return;
            completed = true;
            resolve(data || null);
          };

          try {
            const result = api.getUserInfo([uid], (err, data) => {
              if (err) return finish(null);

              finish(
                data?.[uid] ||
                data?.[String(uid)] ||
                null
              );
            });

            if (result && typeof result.then === "function") {
              result.then(data => {
                finish(
                  data?.[uid] ||
                  data?.[String(uid)] ||
                  null
                );
              }).catch(() => finish(null));
            }
          } catch (e) {
            finish(null);
          }
        });
      };

      const [info1, info2] = await Promise.all([
        getUserInfo(id1),
        getUserInfo(id2)
      ]);

      // Find profile picture URLs
      const getPictureURL = (info, uid) => {
        return (
          info?.thumbSrc ||
          info?.picture ||
          info?.profilePicture ||
          `https://graph.facebook.com/${uid}/picture?width=512&height=512`
        );
      };

      const picture1 = getPictureURL(info1, id1);
      const picture2 = getPictureURL(info2, id2);

      // Download images
      const downloadImage = async (url) => {
        const response = await axios.get(url, {
          responseType: "arraybuffer",
          timeout: 15000,
          maxRedirects: 5,
          headers: {
            "User-Agent": "Mozilla/5.0"
          }
        });

        return Buffer.from(response.data);
      };

      const [buffer1, buffer2] = await Promise.all([
        downloadImage(picture1),
        downloadImage(picture2)
      ]);

      const [img1, img2] = await Promise.all([
        loadImage(buffer1),
        loadImage(buffer2)
      ]);

      // Canvas setup
      const W = 1000;
      const H = 560;

      const canvas = createCanvas(W, H);
      const ctx = canvas.getContext("2d");

      // Rounded rectangle helper
      const roundRect = (x, y, w, h, r) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
      };

      // Image cover helper
      const drawCover = (img, x, y, size) => {
        const scale = Math.max(
          size / img.width,
          size / img.height
        );

        const sw = size / scale;
        const sh = size / scale;

        const sx = (img.width - sw) / 2;
        const sy = (img.height - sh) / 2;

        ctx.drawImage(
          img,
          sx, sy, sw, sh,
          x, y, size, size
        );
      };

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#160A2E");
      bg.addColorStop(0.5, "#7B164F");
      bg.addColorStop(1, "#F43F78");

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Background decoration
      ctx.globalAlpha = 0.10;
      ctx.fillStyle = "#FFFFFF";

      for (let i = 0; i < 35; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * W,
          Math.random() * H,
          Math.random() * 5 + 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Main glass card
      roundRect(35, 30, 930, 500, 35);
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Heading
      ctx.textAlign = "center";
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 38px sans-serif";
      ctx.fillText("TODAY'S PERFECT COUPLE", W / 2, 100);

      ctx.font = "20px sans-serif";
      ctx.fillStyle = "#FFD6E5";
      ctx.fillText("TWO HEARTS • ONE STORY", W / 2, 137);

      // Profile pictures
      const avatarSize = 210;
      const avatarY = 175;
      const leftX = 125;
      const rightX = 665;

      // Left avatar
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        leftX + avatarSize / 2,
        avatarY + avatarSize / 2,
        avatarSize / 2,
        0,
        Math.PI * 2
      );
      ctx.clip();

      drawCover(img1, leftX, avatarY, avatarSize);
      ctx.restore();

      // Right avatar
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        rightX + avatarSize / 2,
        avatarY + avatarSize / 2,
        avatarSize / 2,
        0,
        Math.PI * 2
      );
      ctx.clip();

      drawCover(img2, rightX, avatarY, avatarSize);
      ctx.restore();

      // Avatar borders
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 7;

      [leftX, rightX].forEach(x => {
        ctx.beginPath();
        ctx.arc(
          x + avatarSize / 2,
          avatarY + avatarSize / 2,
          avatarSize / 2 + 3,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      });

      // Heart drawing
      const drawHeart = (x, y, size) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(size / 100, size / 100);

        ctx.beginPath();
        ctx.moveTo(0, 85);
        ctx.bezierCurveTo(-110, 10, -65, -50, 0, -15);
        ctx.bezierCurveTo(65, -50, 110, 10, 0, 85);
        ctx.closePath();

        ctx.fillStyle = "#FF1744";
        ctx.shadowColor = "#FF1744";
        ctx.shadowBlur = 20;
        ctx.fill();

        ctx.restore();
      };

      drawHeart(W / 2, 275, 90);

      // User names
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 25px sans-serif";

      const fitText = (text, maxWidth) => {
        let value = String(text);

        while (
          ctx.measureText(value).width > maxWidth &&
          value.length > 3
        ) {
          value = value.slice(0, -1);
        }

        if (value !== text) value += "...";

        return value;
      };

      ctx.fillText(
        fitText(name1, 350),
        leftX + avatarSize / 2,
        420
      );

      ctx.fillText(
        fitText(name2, 350),
        rightX + avatarSize / 2,
        420
      );

      // Compatibility heading
      ctx.font = "bold 23px sans-serif";
      ctx.fillStyle = "#FFE1EC";
      ctx.fillText(
        compatibility + "% COMPATIBILITY",
        W / 2,
        462
      );

      // Compatibility progress bar
      const barW = 480;
      const barH = 18;
      const barX = (W - barW) / 2;
      const barY = 480;

      roundRect(barX, barY, barW, barH, 10);
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fill();

      roundRect(
        barX,
        barY,
        barW * compatibility / 100,
        barH,
        10
      );

      const barGradient = ctx.createLinearGradient(
        barX, 0, barX + barW, 0
      );

      barGradient.addColorStop(0, "#FF8FAB");
      barGradient.addColorStop(1, "#FFFFFF");

      ctx.fillStyle = barGradient;
      ctx.fill();

      // Footer
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "#FFE1EC";
      ctx.fillText(
        "MADE WITH LOVE ❤️",
        W / 2,
        520
      );

      // Save image
      const cacheDir = path.join(__dirname, "cache");

      await fs.ensureDir(cacheDir);

      const uniqueID = `${Date.now()}_${Math.random()
        .toString(36).slice(2, 9)}`;

      outputPath = path.join(
        cacheDir,
        `pair_${uniqueID}.jpg`
      );

      fs.writeFileSync(
        outputPath,
        canvas.toBuffer("image/jpeg", { quality: 0.92 })
      );

      // Result message
      const body = getLang(
        "result",
        name1,
        name2,
        compatibility
      );

      await message.reply({
        body,
        attachment: fs.createReadStream(outputPath)
      });

    } catch (err) {
      console.error("[PAIR ERROR]", err);

      try {
        await message.reply(getLang("error"));
      } catch (e) {
        console.error("[PAIR REPLY ERROR]", e);
      }

    } finally {
      // Clean temporary output
      if (outputPath) {
        try {
          if (fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
          }
        } catch (e) {
          console.error("[PAIR CLEANUP ERROR]", e);
        }
      }
    }
  }
};
