
const fs = require("fs-extra");
const path = require("path");
const { createCanvas } = require("canvas");

module.exports = {
  config: {
    name: "baby",
    version: "1.0.0",
    author: "Nahid Hasan",
    countDown: 5,
    role: 0,
    shortDescription: "Couple Baby Prediction Card",
    category: "love",
    guide: {
      en: "{p}baby"
    }
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;

    const outputDir = path.join(__dirname, "cache");

    await fs.ensureDir(outputDir);

    const random = arr => arr[Math.floor(Math.random() * arr.length)];

    const quotes = [
      "Two hearts, one beautiful family!",
      "Their love will create a little world of happiness.",
      "A beautiful journey begins with two hearts.",
      "Love grows stronger with every little smile.",
      "Together forever, creating endless memories."
    ];

    const couples = [
      {
        name1: "RIVAN",
        name2: "NEELA",
        babies: 2,
        genders: ["BOY", "GIRL"],
        colors: ["#ff8fab", "#ffc2d1"]
      },
      {
        name1: "AYAT",
        name2: "SAMI",
        babies: 3,
        genders: ["BOY", "GIRL", "BOY"],
        colors: ["#c084fc", "#f0abfc"]
      }
    ];

    const love1 = Math.floor(Math.random() * 21) + 80;
    const love2 = Math.floor(Math.random() * 21) + 80;

    const canvas = createCanvas(1100, 1250);
    const ctx = canvas.getContext("2d");

    // Background
    const bg = ctx.createLinearGradient(0, 0, 1100, 1250);
    bg.addColorStop(0, "#160d2b");
    bg.addColorStop(0.5, "#39204f");
    bg.addColorStop(1, "#170d30");

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1100, 1250);

    // Decorative hearts
    for (let i = 0; i < 45; i++) {
      ctx.globalAlpha = Math.random() * 0.35 + 0.1;
      ctx.fillStyle = "#ff9ecb";
      ctx.font = `${Math.floor(Math.random() * 25) + 15}px Arial`;
      ctx.fillText(
        "♥",
        Math.random() * 1050,
        Math.random() * 1200
      );
    }

    ctx.globalAlpha = 1;

    // Header
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 65px Arial";
    ctx.fillText("BABY PREDICTION", 550, 115);

    ctx.fillStyle = "#ffb6d5";
    ctx.font = "27px Arial";
    ctx.fillText("A BEAUTIFUL LOVE STORY", 550, 165);

    // Couple cards
    const drawCouple = (couple, y, love) => {
      const x = 75;
      const width = 950;
      const height = 425;

      // Card background
      const card = ctx.createLinearGradient(x, y, x + width, y + height);
      card.addColorStop(0, "#fff0f6");
      card.addColorStop(1, "#fce7ff");

      ctx.fillStyle = card;
      ctx.beginPath();
      ctx.roundRect(x, y, width, height, 35);
      ctx.fill();

      // Couple names
      ctx.textAlign = "center";
      ctx.fillStyle = "#722b65";
      ctx.font = "bold 49px Arial";
      ctx.fillText(
        `${couple.name1}  ♥  ${couple.name2}`,
        550,
        y + 85
      );

      // Love percentage
      ctx.fillStyle = "#e84393";
      ctx.font = "bold 62px Arial";
      ctx.fillText(`${love}% LOVE`, 550, y + 165);

      // Love bar
      ctx.fillStyle = "#f4c5df";
      ctx.beginPath();
      ctx.roundRect(230, y + 190, 640, 23, 12);
      ctx.fill();

      ctx.fillStyle = "#ec4899";
      ctx.beginPath();
      ctx.roundRect(230, y + 190, 640 * love / 100, 23, 12);
      ctx.fill();

      // Baby count
      ctx.fillStyle = "#68245d";
      ctx.font = "bold 38px Arial";
      ctx.fillText(
        `${couple.babies} FUTURE BABIES`,
        550,
        y + 280
      );

      // Gender prediction
      ctx.fillStyle = "#8b376f";
      ctx.font = "bold 27px Arial";

      const genderText = couple.genders
        .map((gender, i) => `${i + 1}. ${gender === "BOY" ? "👦 BOY" : "👧 GIRL"}`)
        .join("     ");

      ctx.fillText(genderText, 550, y + 340);

      // Quote
      ctx.fillStyle = "#a13b80";
      ctx.font = "italic 22px Arial";
      ctx.fillText(random(quotes), 550, y + 390);
    };

    drawCouple(couples[0], 210, love1);
    drawCouple(couples[1], 665, love2);

    // Footer
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffb6d5";
    ctx.font = "bold 26px Arial";
    ctx.fillText("MADE WITH LOVE ♥", 550, 1165);

    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    ctx.fillText("© Nahid Hasan", 550, 1205);

    const filePath = path.join(
      outputDir,
      `baby_${Date.now()}.png`
    );

    const buffer = canvas.toBuffer("image/png");

    await fs.writeFile(filePath, buffer);

    return api.sendMessage(
      {
        body:
          "💕 BABY PREDICTION RESULT 💕\n\n" +
          "❤️ Rivan & Neela: 2 Babies\n" +
          "💗 Ayat & Sami: 3 Babies\n\n" +
          "May their love story stay beautiful forever! 🥰",
        attachment: fs.createReadStream(filePath)
      },
      threadID,
      () => {
        fs.unlink(filePath).catch(() => {});
      },
      messageID
    );
  }
};
