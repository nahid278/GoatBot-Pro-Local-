
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
      error: "❌ | Failed to generate pair. Please try again.",
      avatarError: "❌ | Failed to load profile pictures.",
      result: "💕 TODAY'S PERFECT COUPLE 💕\n\n👑 %1\n❤️ + ❤️\n👑 %2\n\n💗 Compatibility: %3%\n\n✨ Made for each other!"
    },
    bn: {
      noMembers: "❌ | গ্রুপে পর্যাপ্ত সদস্য নেই!",
      error: "❌ | জুটি তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করো।",
      avatarError: "❌ | Profile Picture লোড করা যায়নি।",
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

      if (members.length < 1) {
        return message.reply(getLang("noMembers"));
      }

      // Get sender information
      const user1 = await usersData.get(senderID);
      const name1 = user1?.name || "Unknown";

      // Get random second member
      const randomMember = () => {
        return members[
          Math.floor(Math.random() * members.length)
        ];
      };

      // Get gender
      const getGender = async (uid) => {
        try {
          const user = await usersData.get(uid);

          const gender = Number(
            user?.gender ??
            user?.data?.gender ??
            0
          );

          return [1, 2].includes(gender) ? gender : 0;
        } catch (err) {
          return 0;
        }
      };

      const gender1 = await getGender(senderID);

      let id2;

      // 80% chance for opposite gender pair
      // 10% chance for male-male
      // 10% chance for female-female

      const roll = Math.random() * 100;

      if (gender1 === 1 || gender1 === 2) {

        const targetGender = roll < 80
          ? (gender1 === 1 ? 2 : 1)
          : roll < 90
            ? 2
            : 1;

        const matchingMembers = [];

        for (const uid of members) {
          const gender = await getGender(uid);

          if (gender === targetGender) {
            matchingMembers.push(uid);
          }
        }

        if (matchingMembers.length > 0) {
          id2 = matchingMembers[
            Math.floor(Math.random() * matchingMembers.length)
          ];
        } else {
          // Fallback: always select someone
          id2 = randomMember();
        }

      } else {

        // Unknown gender: select completely randomly
        id2 = randomMember();

      }

      // Get selected member information
      const user2 = await usersData.get(id2);
      const name2 = user2?.name || "Unknown";

      // Compatibility
      const compatibility =
        Math.floor(Math.random() * 51) + 50;

      // Get profile picture URLs
      const [avatar1, avatar2] = await Promise.all([
        usersData.getAvatarUrl(senderID),
        usersData.getAvatarUrl(id2)
      ]);

      if (!avatar1 || !avatar2) {
        throw new Error("Profile picture URL not found");
      }

      // Download images
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

      const [res1, res2] = await Promise.all([
        downloadImage(avatar1),
        downloadImage(avatar2)
      ]);

      const [img1, img2] = await Promise.all([
        loadImage(res1),
        loadImage(res2)
      ]);

      // Create Canvas
      const W = 800;
      const H = 400;

      const canvas = createCanvas(W, H);
      const ctx = canvas.getContext("2d");

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, W, H);

      grad.addColorStop(0, "#ff6b6b");
      grad.addColorStop(0.5, "#ee0979");
      grad.addColorStop(1, "#ff6b6b");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Draw First Avatar
      const r = 125;
      const avatarSize = r * 2;
      const avatarY = H / 2 - r;

      const drawAvatar = (img, x) => {
        ctx.save();

        ctx.beginPath();
        ctx.arc(
          x + r,
          H / 2,
          r,
          0,
          Math.PI * 2
        );
        ctx.closePath();
        ctx.clip();

        const scale = Math.max(
          avatarSize / img.width,
          avatarSize / img.height
        );

        const sw = avatarSize / scale;
        const sh = avatarSize / scale;

        ctx.drawImage(
          img,
          (img.width - sw) / 2,
          (img.height - sh) / 2,
          sw,
          sh,
          x,
          avatarY,
          avatarSize,
          avatarSize
        );

        ctx.restore();

        ctx.beginPath();
        ctx.arc(
          x + r,
          H / 2,
          r,
          0,
          Math.PI * 2
        );

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 6;
        ctx.stroke();
      };

      // Draw avatars
      drawAvatar(img1, 30);
      drawAvatar(img2, W - avatarSize - 30);

      // Heart
      ctx.font = "bold 60px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";

      ctx.fillText("❤️", W / 2, H / 2 + 20);

      // Compatibility text
      const barW = 200;
      const barH = 20;
      const barX = W / 2 - barW / 2;
      const barY = H - 55;

      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = "#ffffff";

      ctx.fillText(
        compatibility + "% Compatible",
        W / 2,
        barY - 8
      );

      // Background bar
      ctx.beginPath();
      ctx.roundRect(barX, barY, barW, barH, 10);
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fill();

      // Progress bar
      ctx.beginPath();
      ctx.roundRect(
        barX,
        barY,
        barW * compatibility / 100,
        barH,
        10
      );

      ctx.fillStyle = "#ffffff";
      ctx.fill();

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

      await message.reply({
        body,
        attachment: fs.createReadStream(outputPath)
      });

    } catch (err) {

      console.error("[PAIR ERROR]", err);

      return message.reply(getLang("error"));

    } finally {

      if (outputPath) {
        try {
          if (await fs.pathExists(outputPath)) {
            await fs.remove(outputPath);
          }
        } catch (err) {
          console.error("[PAIR CLEANUP ERROR]", err);
        }
      }
    }
  }
};
