
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
      avatarError: "❌ | Failed to load Facebook profile pictures.",
      result: "💕 Today's Couple 💕\n\n👤 %1\n💑 &\n👤 %2\n\n❤️ Compatibility: %3%\n\n🔁 New pair tomorrow!"
    },

    bn: {
      noMembers: "❌ | গ্রুপে পর্যাপ্ত সদস্য নেই!",
      error: "❌ | জুটি তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করো।",
      avatarError: "❌ | Facebook Profile Picture লোড করা যায়নি।",
      result: "💕 আজকের জুটি 💕\n\n👤 %1\n💑 &\n👤 %2\n\n❤️ মিল: %3%\n\n🔁 আগামীকাল নতুন জুটি!"
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

      // Gender detector
      // Does not use refreshInfo()
      const detectGender = (user) => {

        const raw =
          user?.gender ??
          user?.data?.gender ??
          user?.info?.gender ??
          user?.profile?.gender ??
          null;

        if (raw === null || raw === undefined) {
          return 0;
        }

        const value = String(raw).toLowerCase().trim();

        // Facebook numeric gender
        if (value === "1") return 1; // Female
        if (value === "2") return 2; // Male

        // Text gender
        if (["female", "woman", "women", "f"].includes(value)) {
          return 1;
        }

        if (["male", "man", "men", "m"].includes(value)) {
          return 2;
        }

        return 0;
      };

      // Safely get user data
      const getUser = async (uid) => {
        try {
          return await usersData.get(uid);
        } catch (err) {
          console.log("[PAIR USER ERROR]", uid, err.message);
          return null;
        }
      };

      // Get sender information
      const user1 = await getUser(senderID);

      const name1 = user1?.name || "Unknown";

      const senderGender = detectGender(user1);

      // Get all members' information
      const memberData = await Promise.all(
        members.map(async uid => ({
          id: uid,
          user: await getUser(uid)
        }))
      );

      // Build gender groups
      const maleMembers = memberData.filter(
        item => detectGender(item.user) === 2
      );

      const femaleMembers = memberData.filter(
        item => detectGender(item.user) === 1
      );

      // Random selection helper
      const randomItem = array => {
        return array[
          Math.floor(Math.random() * array.length)
        ];
      };

      // Select pair
      let selected = null;

      if (senderGender === 1 || senderGender === 2) {

        const oppositeGender =
          senderGender === 1 ? 2 : 1;

        const sameGender = senderGender;

        const oppositePool =
          oppositeGender === 1
            ? femaleMembers
            : maleMembers;

        const samePool =
          sameGender === 1
            ? femaleMembers
            : maleMembers;

        // 80% opposite gender
        // 20% same gender
        const roll = Math.random() * 100;

        if (roll < 80 && oppositePool.length > 0) {
          selected = randomItem(oppositePool);
        } else if (roll >= 80 && samePool.length > 0) {
          selected = randomItem(samePool);
        }

        // Fallback if selected gender is unavailable
        if (!selected) {
          const available = memberData.filter(item => {
            const gender = detectGender(item.user);
            return gender === 1 || gender === 2;
          });

          if (available.length > 0) {
            selected = randomItem(available);
          }
        }
      }

      // Unknown gender or unavailable gender data
      // Always select a random group member
      if (!selected) {
        selected = randomItem(memberData);
      }

      const id2 = selected.id;

      const user2 = selected.user;

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

      // Download profile pictures
      const downloadImage = async url => {

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
      const r = 150;

      ctx.save();

      ctx.beginPath();
      ctx.arc(r + 30, H / 2, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(
        img1,
        30,
        H / 2 - r,
        r * 2,
        r * 2
      );

      ctx.restore();

      // Draw Second Avatar
      ctx.save();

      ctx.beginPath();
      ctx.arc(W - r - 30, H / 2, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(
        img2,
        W - r * 2 - 30,
        H / 2 - r,
        r * 2,
        r * 2
      );

      ctx.restore();

      // Avatar Borders
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 5;

      ctx.beginPath();
      ctx.arc(r + 30, H / 2, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(W - r - 30, H / 2, r, 0, Math.PI * 2);
      ctx.stroke();

      // Heart
      ctx.font = "bold 60px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";

      ctx.fillText("❤️", W / 2, H / 2 + 20);

      // Compatibility Bar
      const barW = 200;
      const barH = 22;
      const barX = W / 2 - barW / 2;
      const barY = H - 55;

      ctx.fillStyle = "rgba(255,255,255,0.3)";

      ctx.beginPath();
      ctx.roundRect(barX, barY, barW, barH, 11);
      ctx.fill();

      ctx.fillStyle = "#ffffff";

      ctx.beginPath();

      ctx.roundRect(
        barX,
        barY,
        barW * (compatibility / 100),
        barH,
        11
      );

      ctx.fill();

      // Compatibility Text
      ctx.font = "bold 16px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";

      ctx.fillText(
        compatibility + "% Compatible",
        W / 2,
        barY - 8
      );

      // Save Image
      outputPath = path.join(
        cacheDir,
        `pair_${Date.now()}.jpg`
      );

      await fs.writeFile(
        outputPath,
        canvas.toBuffer("image/jpeg", {
          quality: 0.92
        })
      );

      // Send Result
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
