
const fs = require("fs-extra");
const path = require("path");
const { createCanvas } = require("canvas");

module.exports = {
  config: {
    name: "babys",
    version: "2.0.0",
    author: "Nahid Hasan",
    countDown: 5,
    role: 0,
    shortDescription: "Couple Baby Prediction",
    category: "love",
    guide: {
      en: "{p}babys [rivan/neela/ayat/sami]"
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    const input = (args[0] || "").toLowerCase();

    const couples = {
      rivan: {
        name1: "RIVAN",
        name2: "NEELA",
        babies: 2,
        theme1: "#ff5caa",
        theme2: "#ffb6d9"
      },
      neela: {
        name1: "RIVAN",
        name2: "NEELA",
        babies: 2,
        theme1: "#ff5caa",
        theme2: "#ffb6d9"
      },
      ayat: {
        name1: "AYAT",
        name2: "SAMI",
        babies: 3,
        theme1: "#a855f7",
        theme2: "#e9a8ff"
      },
      sami: {
        name1: "AYAT",
        name2: "SAMI",
        babies: 3,
        theme1: "#a855f7",
        theme2: "#e9a8ff"
      }
    };

    const couple = couples[input];

    if (!couple) {
      return api.sendMessage(
        "💗 BABY PREDICTION COMMAND 💗\n\n" +
        "❤️ babys rivan\n" +
        "❤️ babys neela\n" +
        "💕 babys ayat\n" +
        "💕 babys sami\n\n" +
        "যেকোনো একজনের নাম দিয়ে কমান্ড করো! 🥰",
        threadID,
        messageID
      );
    }

    const quotes = [
      "Two hearts, one beautiful family! ❤️",
      "Their love will create a little world of happiness! 💕",
      "Together forever, creating endless memories! 🥰",
      "A beautiful family begins with true love! 💗",
      "Their little angels will complete their world! 👶",
      "Love grows stronger with every little smile! ❤️"
    ];

    const random = arr => arr[Math.floor(Math.random() * arr.length)];

    const love = Math.floor(Math.random() * 21) + 80;

    const genders = Array.from(
      { length: couple.babies },
      () => random(["BOY", "GIRL"])
    );

    const outputDir = path.join(__dirname, "cache");
    await fs.ensureDir(outputDir);

    const canvas = createCanvas(1000, 1050);
    const ctx = canvas.getContext("2d");

    // Background
    const bg = ctx.createLinearGradient(0, 0, 1000, 1050);
    bg.addColorStop(0, "#180d30");
    bg.addColorStop(0.5, "#38204e");
    bg.addColorStop(1, "#170b29");

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1000, 1050);

    // Decorative hearts
    for (let i = 0; i < 40; i++) {
      ctx.globalAlpha = 0.15 + Math.random() * 0.2;
      ctx.fillStyle = couple.theme1;
      ctx.font = `${20 + Math.random() * 25}px Arial`;
      ctx.fillText(
        "♥",
        Math.random() * 950,
        Math.random() * 1000
      );
    }

    ctx.globalAlpha = 1;

    // Header
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 58px Arial";
    ctx.fillText("BABY PREDICTION", 500, 115);

    ctx.fillStyle = couple.theme2;
    ctx.font = "25px Arial";
    ctx.fillText("A BEAUTIFUL LOVE STORY", 500, 165);

    // Main Card
    const cardGradient = ctx.createLinearGradient(70, 210, 930, 850);
    cardGradient.addColorStop(0, "#fff0f7");
    cardGradient.addColorStop(1, "#f3ddff");

    ctx.fillStyle = cardGradient;
    ctx.beginPath();
    ctx.roundRect(65, 210, 870, 640, 35);
    ctx.fill();

    // Couple Names
    ctx.fillStyle = "#762b68";
    ctx.font = "bold 54px Arial";
    ctx.fillText(
      `${couple.name1}  ♥  ${couple.name2}`,
      500,
      320
    );

    // Love Percentage
    ctx.fillStyle = "#e84393";
    ctx.font = "bold 75px Arial";
    ctx.fillText(`${love}%`, 500, 445);

    ctx.fillStyle = "#9b467e";
    ctx.font = "bold 25px Arial";
    ctx.fillText("LOVE COMPATIBILITY", 500, 490);

    // Love Bar
    ctx.fillStyle = "#e9bfdc";
    ctx.beginPath();
    ctx.roundRect(190, 520, 620, 24, 12);
    ctx.fill();

    ctx.fillStyle = couple.theme1;
    ctx.beginPath();
    ctx.roundRect(190, 520, 620 * love / 100, 24, 12);
    ctx.fill();

    // Baby Count
    ctx.fillStyle = "#702b68";
    ctx.font = "bold 42px Arial";
    ctx.fillText(
      `${couple.babies} FUTURE BABIES`,
      500,
      620
    );

    // Gender Prediction
    ctx.fillStyle = "#8b3976";
    ctx.font = "bold 27px Arial";
    ctx.fillText("BABY GENDER PREDICTION", 500, 680);

    ctx.font = "bold 29px Arial";

    genders.forEach((gender, index) => {
      const label = gender === "BOY" ? "BOY" : "GIRL";
      const symbol = gender === "BOY" ? "♂" : "♀";

      ctx.fillStyle = gender === "BOY" ? "#368be8" : "#e85caa";

      const x = 500 + (index - (genders.length - 1) / 2) * 190;

      ctx.fillText(
        `${symbol} ${index + 1}. ${label}`,
        x,
        750
      );
    });

    // Romantic Quote
    ctx.fillStyle = "#a13b80";
    ctx.font = "italic 23px Arial";

    ctx.fillText(
      random(quotes),
      500,
      810
    );

    // Footer
    ctx.fillStyle = couple.theme2;
    ctx.font = "bold 29px Arial";
    ctx.fillText("MADE WITH LOVE ♥", 500, 940);

    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    ctx.fillText("© Nahid Hasan", 500, 985);

    const filePath = path.join(
      outputDir,
      `baby_${Date.now()}.png`
    );

    try {
      await fs.writeFile(
        filePath,
        canvas.toBuffer("image/png")
      );

      return api.sendMessage(
        {
          body:
            `💕 BABY PREDICTION RESULT 💕\n\n` +
            `❤️ Couple: ${couple.name1} & ${couple.name2}\n` +
            `💖 Love: ${love}%\n` +
            `👶 Future Babies: ${couple.babies}\n` +
            `💌 ${random(quotes)}\n\n` +
            `Wishing them a beautiful future! 🥰`,
          attachment: fs.createReadStream(filePath)
        },
        threadID,
        () => fs.unlink(filePath).catch(() => {}),
        messageID
      );
    } catch (error) {
      console.error(error);
      return api.sendMessage(
        "❌ Baby card তৈরি করতে সমস্যা হয়েছে!",
        threadID,
        messageID
      );
    }
  }
};
