
const fs = require("fs-extra");
const path = require("path");
const { createCanvas } = require("canvas");

const couples = {
  neela: {
    name: "NEELA",
    partner: "RIVAN",
    color1: "#ec4899",
    color2: "#8b5cf6",
    lines: [
      "Rivan-এর হাজারটা ব্যস্ততার মাঝেও Neela-র জন্য আলাদা সময় থাকে।",
      "Neela-র হাসিই Rivan-এর সবচেয়ে সুন্দর অনুভূতি।",
      "কিছু মানুষ হৃদয়ে জায়গা করে নেয়, Rivan-এর কাছে Neela তেমনই একজন।",
      "Rivan-এর প্রতিটি সুন্দর স্বপ্নে Neela যেন এক টুকরো ভালোবাসা।"
    ]
  },

  rivan: {
    name: "RIVAN",
    partner: "NEELA",
    color1: "#3b82f6",
    color2: "#a855f7",
    lines: [
      "Neela, তোমার হাসির কারণ হতে চাই সারাজীবন।",
      "হাজারো মানুষের ভিড়েও Rivan-এর চোখ শুধু Neela-কেই খোঁজে।",
      "Neela-র একটা মেসেজেই Rivan-এর পুরো দিন সুন্দর হয়ে যায়।",
      "Rivan-এর গল্পের সবচেয়ে সুন্দর অধ্যায় হলো Neela।"
    ]
  },

  ayat: {
    name: "AYAT",
    partner: "SAMI",
    color1: "#a855f7",
    color2: "#ec4899",
    lines: [
      "Sami-এর সাথে কাটানো ছোট্ট মুহূর্তগুলোই Ayat-এর কাছে অনেক মূল্যবান।",
      "Ayat-এর হাসির পেছনে Sami-র একটা মিষ্টি কারণ লুকিয়ে আছে।",
      "কিছু অনুভূতি ভাষায় প্রকাশ করা যায় না, Sami-র জন্য Ayat-এর ভালোবাসাও তেমন।",
      "Ayat-এর ছোট্ট পৃথিবীতে Sami একটি বিশেষ নাম।"
    ]
  },

  sami: {
    name: "SAMI",
    partner: "AYAT",
    color1: "#e11d48",
    color2: "#9333ea",
    lines: [
      "Ayat, তোমার হাসিটাই Sami-র সবচেয়ে প্রিয় দৃশ্য।",
      "Sami-এর প্রতিটি আগামীকালেও Ayat-কে পাশে পাওয়ার ইচ্ছা।",
      "পৃথিবীতে হাজারো মানুষ, কিন্তু Sami-র চোখে Ayat-ই আলাদা।",
      "Ayat-এর একটু ভালোবাসাই Sami-র পুরো পৃথিবী সুন্দর করে দেয়।"
    ]
  }
};

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function drawHeart(ctx, x, y, size, color) {
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

function roundedRect(ctx, x, y, w, h, r, color) {
  ctx.fillStyle = color;
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
  ctx.fill();
}

module.exports = {
  config: {
    name: "love",
    version: "1.0.0",
    author: "Nahid Hasan",
    countDown: 5,
    role: 0,
    description: "Random romantic love card",
    category: "love",
    guide: {
      en: "{p}love [neela/rivan/ayat/sami]"
    }
  },

  onStart: async function ({ message, args }) {
    let outputPath;

    try {
      const input = (args || []).join(" ").trim().toLowerCase();
      const person = couples[input];

      if (!person) {
        return message.reply(
          "💗 Love Card তৈরি করতে লিখুন:\n\n" +
          "love neela\n" +
          "love rivan\n" +
          "love ayat\n" +
          "love sami"
        );
      }

      const percentage = Math.floor(Math.random() * 36) + 65;
      const romanticLine = randomItem(person.lines);

      const width = 1000;
      const height = 600;

      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      // Background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, person.color1);
      gradient.addColorStop(1, person.color2);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Decorative hearts
      for (let i = 0; i < 22; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 10 + Math.random() * 22;

        drawHeart(ctx, x, y, size, "rgba(255,255,255,0.18)");
      }

      // Main card
      roundedRect(
        ctx,
        55, 45, 890, 510,
        35,
        "rgba(255,255,255,0.15)"
      );

      // Header
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 48px Arial";
      ctx.fillText("LOVE STORY", 500, 115);

      ctx.font = "22px Arial";
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText("A SPECIAL LOVE CONNECTION", 500, 150);

      // Names
      ctx.font = "bold 52px Arial";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(person.name, 280, 265);
      ctx.fillText(person.partner, 720, 265);

      // Initial circles
      ctx.beginPath();
      ctx.arc(280, 345, 62, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(720, 345, 62, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.fill();

      ctx.font = "bold 58px Arial";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(person.name[0], 280, 365);
      ctx.fillText(person.partner[0], 720, 365);

      // Center heart
      drawHeart(ctx, 500, 345, 100, "#ffffff");

      // Love percentage
      ctx.font = "bold 55px Arial";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`${percentage}%`, 500, 455);

      ctx.font = "bold 23px Arial";
      ctx.fillText("LOVE LEVEL", 500, 490);

      // Romantic line
      roundedRect(
        ctx,
        100, 505, 800, 1,
        1,
        "rgba(255,255,255,0.3)"
      );

      ctx.font = "20px Arial";
      ctx.fillStyle = "#ffffff";

      // Wrap romantic text
      const words = romanticLine.split(" ");
      let line = "";
      let y = 530;

      for (const word of words) {
        const testLine = line ? line + " " + word : word;

        if (ctx.measureText(testLine).width > 790) {
          ctx.fillText(line, 500, y);
          line = word;
          y += 25;
        } else {
          line = testLine;
        }
      }

      if (line) {
        ctx.fillText(line, 500, y);
      }

      // Footer
      ctx.font = "bold 17px Arial";
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillText("MADE WITH LOVE  |  NAHID", 500, 580);

      // Save image
      const cacheDir = path.join(__dirname, "cache");
      await fs.ensureDir(cacheDir);

      outputPath = path.join(
        cacheDir,
        `love_${Date.now()}_${Math.floor(Math.random() * 10000)}.png`
      );

      const buffer = canvas.toBuffer("image/png");
      await fs.writeFile(outputPath, buffer);

      await message.reply({
        body:
          `💖 ${person.name} ❤️ ${person.partner}\n` +
          `💕 Love Level: ${percentage}%\n\n` +
          `🌹 ${romanticLine}\n\n` +
          `🥰 Made with love by NAHID`,
        attachment: fs.createReadStream(outputPath)
      });

      // Delete temporary image after sending
      setTimeout(() => {
        fs.remove(outputPath).catch(() => {});
      }, 15000);

    } catch (error) {
      console.error("LOVE CARD ERROR:", error);

      return message.reply(
        "❌ Love Card তৈরি করতে সমস্যা হয়েছে!\n" +
        "Error: " + error.message
      );
    }
  }
};
