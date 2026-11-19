
const fs = require("fs-extra");
const path = require("path");
const { createCanvas } = require("canvas");

module.exports = {
  config: {
    name: "mygirl",
    version: "2.0.0",
    author: "Nahid Hasan",
    role: 0,
    countDown: 5,
    description: "Create a romantic My Girl card",
    category: "love",
    guide: {
      en: "{p}mygirl @mention | Reply to a message"
    }
  },

  onStart: async function ({ event, api, usersData }) {
    const { threadID, messageID, senderID } = event;
    let outputPath;

    try {
      const targetID =
        Object.keys(event.mentions || {})[0] ||
        (event.messageReply && event.messageReply.senderID);

      if (!targetID) {
        return api.sendMessage(
          "💗 কাউকে Mention অথবা Reply করো!\n\nExample: /mygirl @name",
          threadID,
          messageID
        );
      }

      if (targetID === senderID) {
        return api.sendMessage(
          "নিজেকে My Girl বানানো যায় না! 😂❤️",
          threadID,
          messageID
        );
      }

      const senderData = await usersData.get(senderID);
      const targetData = await usersData.get(targetID);

      const senderName = senderData?.name || "Someone";
      const targetName = targetData?.name || "My Girl";

      const width = 1100;
      const height = 650;

      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, width, height);
      bg.addColorStop(0, "#ff758c");
      bg.addColorStop(0.5, "#c084fc");
      bg.addColorStop(1, "#6366f1");

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Floating hearts
      function heart(x, y, size, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(size / 100, size / 100);
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(0, 30);
        ctx.bezierCurveTo(-55, -10, -50, -45, -20, -45);
        ctx.bezierCurveTo(-5, -45, 0, -30, 0, -20);
        ctx.bezierCurveTo(0, -30, 5, -45, 20, -45);
        ctx.bezierCurveTo(50, -45, 55, -10, 0, 30);
        ctx.fill();
        ctx.restore();
      }

      for (let i = 0; i < 35; i++) {
        heart(
          Math.random() * width,
          Math.random() * height,
          15 + Math.random() * 25,
          "rgba(255,255,255,0.17)"
        );
      }

      // Main glass card
      function roundRect(x, y, w, h, r) {
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
        ctx.fill();
      }

      ctx.fillStyle = "rgba(255,255,255,0.17)";
      roundRect(55, 45, 990, 560, 35);

      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Header
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 65px Arial";
      ctx.fillText("MY GIRL", 550, 145);

      ctx.font = "24px Arial";
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.fillText("YOU ARE MY FAVORITE PERSON", 550, 185);

      // Avatar circles (initials)
      function avatar(x, y, initial) {
        ctx.beginPath();
        ctx.arc(x, y, 85, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 80px Arial";
        ctx.fillText(initial.toUpperCase(), x, y + 27);
      }

      avatar(300, 330, senderName[0]);
      avatar(800, 330, targetName[0]);

      // Names
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px Arial";
      ctx.fillText(senderName, 300, 460);
      ctx.fillText(targetName, 800, 460);

      // Heart between them
      heart(550, 340, 125, "#ffffff");

      // Romantic message
      ctx.font = "italic 25px Arial";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(
        "You make my world more beautiful!",
        550,
        525
      );

      ctx.font = "bold 20px Arial";
      ctx.fillText("MADE WITH LOVE | NAHID", 550, 570);

      // Save card
      const cacheDir = path.join(__dirname, "cache");
      await fs.ensureDir(cacheDir);

      outputPath = path.join(
        cacheDir,
        `mygirl_${Date.now()}.png`
      );

      await fs.writeFile(outputPath, canvas.toBuffer("image/png"));

      api.sendMessage(
        {
          body:
            `🖤 THAT'S MY GIRL 🖤\n\n` +
            `👦 ${senderName}\n` +
            `👧 ${targetName}\n\n` +
            `💗 Made with love by NAHID`,
          attachment: fs.createReadStream(outputPath)
        },
        threadID,
        () => {
          fs.remove(outputPath).catch(() => {});
        },
        messageID
      );

    } catch (error) {
      console.error("MYGIRL ERROR:", error);

      api.sendMessage(
        "❌ MyGirl Card তৈরি করা যায়নি!\n" + error.message,
        threadID,
        messageID
      );
    }
  }
};
