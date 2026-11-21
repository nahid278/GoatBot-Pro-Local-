
const fs = require("fs-extra");
const path = require("path");

const HISTORY_FILE = path.join(__dirname, "biye_history.json");

const predictions = {
  sami: [
    [1, "Mim", "বিয়ের পর বুঝবে, প্রেম করা সহজ, সংসার চালানো কঠিন! 😂"],
    [2, "Mim ও Riya", "দুই সংসারের বাজার করতে গিয়ে নিজের পকেট খালি! 🤣"],
    [3, "Jannat, Tisha ও Nila", "তিনজনের জন্মদিন মনে রাখতে আলাদা ক্যালেন্ডার লাগবে! 😭"],
    [1, "Ayat", "প্রেমের মানুষকেই বিয়ে করবে, কিন্তু রিমোটের দখল থাকবে বউয়ের! ❤️"],
    [4, "Riya, Mahi, Nitu ও Piya", "চার বিয়ের পরও শান্তি খুঁজতে পাহাড়ে চলে যাবে! 😂"],
    [2, "Sadia ও Mitu", "একজন রাগ করলে অন্যজনও কেন রাগ করে, বুঝতেই পারবে না! 🤣"],
    [1, "Nusrat", "বিয়ের পর বন্ধুদের কাছে শুধু বউয়ের প্রশংসাই করবে! 😎"],
    [3, "Mim, Joya ও Tania", "তিনজনের তিন রকম আবদার, আর Sami-র একটাই বেতন! 😭"],
    [1, "Raisa", "বিয়ের দিন থেকেই রান্নাঘরে নতুন জীবন শুরু! 🍳"],
    [2, "Anika ও Riya", "নিজের ফোনের পাসওয়ার্ডও মনে রাখতে পারবে না! 🤣"],
    [4, "Nila, Mahi, Jannat ও Rupa", "চার বউয়ের সংসারে Sami হবে সবচেয়ে শান্ত মানুষ! 😂"],
    [1, "Tisha", "ভালোবাসা পাবে অনেক, কিন্তু ঘুমানোর সময় পাবে কম! 😴"],
    [3, "Sumi, Mim ও Purnima", "তিনজনের shopping list দেখে বিয়ের সিদ্ধান্ত নিয়ে আফসোস! 🛍️"],
    [2, "Jannat ও Ritu", "একজনের মন রাখতে গিয়ে আরেকজনের কাছে ক্ষমা চাইবে! 😭"],
    [1, "Mahi", "বউয়ের হাসিই হবে জীবনের সবচেয়ে বড় WiFi signal! ❤️"],
    [4, "Piya, Nitu, Riya ও Toma", "নিজের বাসায় ঢুকতে আগে appointment নিতে হবে! 🤣"],
    [2, "Nusrat ও Nila", "দুইজনের ঝগড়া থামাতে গিয়ে নিজেই কান্না করবে! 😂"],
    [1, "Joya", "বিয়ের পর আর single status দেওয়া হবে না! 💍"],
    [3, "Tania, Rupa ও Mim", "তিন সংসারের হিসাব করতে গিয়ে calculator-ও resign করবে! 🤣"],
    [1, "Raisa", "শেষ পর্যন্ত এক বিয়েতেই জীবনটা সুন্দর হয়ে যাবে! ❤️"]
  ],

  ayat: [
    [1, "Sami", "একজনকেই বিয়ে করবে, কিন্তু তার ওপর রাগ করবে প্রতিদিন! 😂"],
    [2, "Sami ও Arif", "দুই বর নিয়ে স্বপ্ন দেখলেও বাস্তবে একজনের অনুমতিই যথেষ্ট! 🤣"],
    [1, "Fahim", "বিয়ের পর Ayat হবে বাসার CEO! 👑"],
    [3, "Sami, Rifat ও Nabil", "তিনজনের মধ্যে কে বেশি ভালোবাসে, সেই প্রতিযোগিতা চলবে! 😂"],
    [1, "Rivan", "বিয়ের পরও নিজের রাজত্ব নিজের হাতেই রাখবে! 😎"],
    [2, "Sami ও Adnan", "দুজনের ঝগড়া মেটাতে গিয়ে নিজেরই মাথা খারাপ! 😭"],
    [1, "Neel", "ভালোবাসা হবে সিনেমার মতো, ঝগড়া হবে সিরিয়ালের মতো! ❤️"],
    [4, "Sami, Rifat, Arif ও Fahim", "বিয়ের নিমন্ত্রণ কার্ড ছাপাতে ব্যাংক লোন লাগবে! 🤣"],
    [1, "Ayan", "বিয়ের পর Ayat-এর কথাই হবে শেষ কথা! 😂"],
    [2, "Rohan ও Sami", "দুজনের মধ্যে কে বেশি romantic, তা নিয়ে যুদ্ধ হবে! 💕"],
    [3, "Nabil, Rifat ও Adnan", "তিনজনের ফোন এলে কোনটা আগে ধরবে সেটাই সমস্যা! 🤣"],
    [1, "Sami", "একজনের সাথেই সাত জন্মের চুক্তি করবে! ❤️"],
    [2, "Fahim ও Rohan", "একজন shopping করবে, অন্যজন বিল দেখে অজ্ঞান হবে! 🛍️"],
    [1, "Arif", "বিয়ের পর Ayat-এর permission ছাড়া কিছুই হবে না! 👑"],
    [3, "Sami, Ayan ও Rifat", "তিনজনের নাম শুনেই আত্মীয়রা বিয়েতে আসতে ভয় পাবে! 😂"],
    [1, "Nayeem", "বিয়ের পর ঘরের সব সিদ্ধান্ত Ayat-এর! 😎"],
    [2, "Nabil ও Sami", "একজনকে ভালোবাসবে, আরেকজনের সাথে ঝগড়া করবে! 🤣"],
    [4, "Rohan, Fahim, Ayan ও Arif", "নিজের বিয়ের তারিখ মনে রাখতেই কষ্ট হবে! 😭"],
    [1, "Rifat", "একজনই যথেষ্ট, তবে অভিমান হবে হাজারটা! ❤️"],
    [2, "Sami ও Nayeem", "শেষ পর্যন্ত যার হাতে চকলেট থাকবে তাকেই বেছে নেবে! 🍫"]
  ],

  rivan: [
    [1, "Neela", "বিয়ের পর Rivan-এর স্বাধীনতা শুধু Facebook bio-তে থাকবে! 😂"],
    [2, "Nila ও Jannat", "দুইজনের মাঝে Rivan হবে হারিয়ে যাওয়া GPS! 🤣"],
    [3, "Mim, Riya ও Tisha", "তিনজনের shopping bag বহন করাই হবে full-time job! 🛍️"],
    [1, "Neela", "প্রেম একটাই, কিন্তু বউয়ের রাগ সামলানো কঠিন! ❤️"],
    [4, "Piya, Mahi, Nitu ও Joya", "চার বিয়ের পর নিজের নামও ভুলে যাবে! 😭"],
    [2, "Sadia ও Nusrat", "দুজনের সামনে একসাথে কথা বলার সাহস থাকবে না! 😂"],
    [1, "Raisa", "বউয়ের হাসির জন্য নিজের সব game uninstall করবে! 🎮"],
    [3, "Tania, Mim ও Rupa", "তিনজনের জন্য তিনটা anniversary gift কিনতে হবে! 🤣"],
    [1, "Neela", "বিয়ের পর Rivan-এর password হবে: Yes Dear! 😆"],
    [2, "Mahi ও Jannat", "দুইজনের ঝগড়ায় Rivan হবে নিরপেক্ষ বিচারক, কিন্তু দোষীও সে! 😭"],
    [4, "Riya, Tisha, Piya ও Nila", "চার বউয়ের কাছে একসাথে sorry বলতে হবে! 😂"],
    [1, "Anika", "ভালোবাসা পাবে, তবে বাইরে যাওয়ার permission লাগবে! ❤️"],
    [3, "Nitu, Joya ও Sadia", "তিনজনের ফোন এলে Rivan ফোন silent করে দেবে! 🤣"],
    [2, "Neela ও Ritu", "একজন বলবে ঘুরতে যাব, অন্যজন বলবে shopping! 😭"],
    [1, "Toma", "বউয়ের রান্না খেয়ে প্রতিদিন MasterChef-এর বিচারক সাজবে! 🍲"],
    [4, "Mim, Nila, Rupa ও Raisa", "নিজের ঘরেই অতিথির মতো থাকতে হবে! 😂"],
    [2, "Tisha ও Nusrat", "দুইজনের birthday ভুলে গেলে জীবনটাই update দিতে হবে! 🤣"],
    [1, "Neela", "বিয়ের পর Rivan-এর সবচেয়ে প্রিয় শব্দ হবে: জি বউ! ❤️"],
    [3, "Riya, Mahi ও Jannat", "তিনজনের সাথে ছবি তুলতে গিয়ে ফোনের storage শেষ! 📸"],
    [1, "Purnima", "শেষমেশ এক বউতেই সুখের সংসার হবে! 💍"]
  ],

  neela: [
    [1, "Rivan", "বিয়ের পর Rivan হবে Neela-র personal assistant! 😂"],
    [2, "Rivan ও Arif", "দুই বরকে সামলাতে গিয়ে নিজেরই ছুটি দরকার হবে! 🤣"],
    [3, "Rivan, Fahim ও Nabil", "তিনজনের মধ্যে কে রান্না করবে, সেই ভোট হবে! 🍳"],
    [1, "Rivan", "একজনকেই বিয়ে করবে, কিন্তু শাসন করবে সারাজীবন! 👑"],
    [4, "Rivan, Ayan, Rifat ও Sami", "চারজনের নাম মনে রাখতে Neela-রও Google লাগবে! 😂"],
    [2, "Adnan ও Rohan", "দুজনের ঝগড়া মেটাতে গিয়ে নিজেই বিচারক হয়ে যাবে! 😭"],
    [1, "Sami", "বিয়ের পর Neela-র কথাই হবে সংসারের আইন! ❤️"],
    [3, "Nayeem, Arif ও Fahim", "তিনজনের জন্য তিন রকম রান্না করতে হবে! 🤣"],
    [1, "Rivan", "বিয়ের পর Rivan-এর সব বন্ধু Neela-র অনুমতি নিয়ে আসবে! 😎"],
    [2, "Rifat ও Nabil", "একজন ফুল দেবে, অন্যজন chocolate; Neela হবে confused! 🍫"],
    [4, "Ayan, Sami, Rohan ও Adnan", "বিয়ের কার্ড দেখে আত্মীয়রা হিসাব মিলাতে পারবে না! 😂"],
    [1, "Fahim", "Neela-র রাগ ভাঙানোই হবে Fahim-এর daily mission! 😭"],
    [3, "Rivan, Nayeem ও Arif", "তিনজনের মধ্যে কে বেশি romantic, তা নিয়ে পরীক্ষা হবে! ❤️"],
    [2, "Sami ও Rifat", "দুজনের সাথে movie দেখতে গিয়ে একই সিনেমা তিনবার দেখতে হবে! 🤣"],
    [1, "Rohan", "বিয়ের পর Neela-র shopping budget unlimited হবে! 🛍️"],
    [4, "Nabil, Fahim, Ayan ও Rivan", "চারজনের জন্য চারটা আলাদা anniversary! 😭"],
    [2, "Adnan ও Sami", "দুজনের মধ্যে যে আগে sorry বলবে, সে-ই জিতবে! 😂"],
    [1, "Rivan", "ভালোবাসা থাকবে অনেক, কিন্তু remote থাকবে Neela-র হাতে! 📺"],
    [3, "Arif, Nayeem ও Rifat", "তিনজনের সাথে ঝগড়া করে শেষে ice cream খেয়ে শান্ত হবে! 🍦"],
    [1, "Ayan", "একজনের সাথেই রাজকীয় সংসার হবে! 👑❤️"]
  ]
};

function shuffle(array) {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

module.exports = {
  config: {
    name: "biye",
    version: "1.0.0",
    author: "Nahid Hasan",
    countDown: 3,
    role: 0,
    description: "Random marriage prediction",
    category: "fun",
    guide: {
      en: "{p}biye sami\n{p}biye ayat\n{p}biye rivan\n{p}biye neela"
    }
  },

  onStart: async function ({ message, args }) {
    try {
      const name = (args[0] || "").toLowerCase().trim();

      if (!predictions[name]) {
        return message.reply(
          "💍 কার বিয়ের ভবিষ্যৎ জানতে চাও?\n\n" +
          "❤️ /biye sami\n" +
          "💜 /biye ayat\n" +
          "💙 /biye rivan\n" +
          "💚 /biye neela"
        );
      }

      let history = {};

      if (await fs.pathExists(HISTORY_FILE)) {
        history = await fs.readJson(HISTORY_FILE);
      }

      if (!history[name] || history[name].length === 0) {
        history[name] = shuffle(
          predictions[name].map((_, index) => index)
        );
      }

      const selectedIndex = history[name].pop();
      const [count, partners, joke] = predictions[name][selectedIndex];

      await fs.writeJson(HISTORY_FILE, history, { spaces: 2 });

      const isFemale = name === "ayat" || name === "neela";
      const spouse = isFemale ? "বর" : "বউ";

      const displayName = {
        sami: "Sami",
        ayat: "Ayat",
        rivan: "Rivan",
        neela: "Neela"
      };

      const remaining = history[name].length;

      const result =
        `╭━━━〔 💍 BIYE PREDICTION 〕━━━╮\n` +
        `\n` +
        `👤 নাম: ${displayName[name]}\n` +
        `💒 ভবিষ্যৎ বিয়ে: ${count} বার\n` +
        `❤️ ${spouse}: ${count} জন\n` +
        `💌 ${spouse === "বউ" ? "বউদের" : "বরদের"} নাম: ${partners}\n` +
        `\n` +
        `🤣 ভাগ্যের কথা:\n${joke}\n` +
        `\n` +
        `🎲 বাকি Unique Prediction: ${remaining}/20\n` +
        `╰━━━━━━━━━━━━━━━━━━━━╯\n\n` +
        `✨ আবার নাম লিখে নতুন Prediction নাও!`;

      return message.reply(result);

    } catch (error) {
      console.error("BIYE COMMAND ERROR:", error);
      return message.reply("❌ Prediction তৈরি করতে সমস্যা হয়েছে!");
    }
  }
};
