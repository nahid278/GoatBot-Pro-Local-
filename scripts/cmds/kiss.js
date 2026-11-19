
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const mahmud = async () => {
  const base = await axios.get(
    "https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json",
    { timeout: 15000 }
  );

  if (!base.data || !base.data.mahmud) {
    throw new Error("API base URL not found");
  }

  return base.data.mahmud.replace(/\/+$/, "");
};

/**
 * @author MahMUD
 * @author: do not delete it
 */

module.exports = {
  config: {
    name: "kiss",
    version: "1.7",
    author: "MahMUD",
    countDown: 5,
    role: 0,
    longDescription: "Generate anime-style kiss image",
    category: "love",
    guide: "{pn} @mention"
  },

  onStart: async function ({ message, event, api }) {
    let imgPath;

    try {
      const obfuscatedAuthor = String.fromCharCode(77, 97, 104, 77, 85, 68);

      if (module.exports.config.author.trim() !== obfuscatedAuthor) {
        return message.reply(
          "❌ | You are not authorized to change the author name."
        );
      }

      const mentions = Object.keys(event.mentions || {});

      if (mentions.length === 0) {
        return message.reply("Please mention someone to kiss 💋");
      }

      const senderID = event.senderID;
      const targetID = mentions[0];

      const base = await mahmud();
      const apiURL = `${base}/api/kiss`;

      const response = await axios.post(
        apiURL,
        { senderID, targetID },
        {
          responseType: "arraybuffer",
          timeout: 60000,
          headers: {
            "Content-Type": "application/json",
            "Accept": "image/png, image/jpeg, image/*"
          },
          maxContentLength: 20 * 1024 * 1024,
          maxBodyLength: 20 * 1024 * 1024
        }
      );

      const imageBuffer = Buffer.from(response.data);

      // Check whether the API actually returned an image
      const isPNG =
        imageBuffer.length > 8 &&
        imageBuffer.subarray(0, 8).equals(
          Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
        );

      const isJPG =
        imageBuffer.length > 3 &&
        imageBuffer[0] === 0xFF &&
        imageBuffer[1] === 0xD8 &&
        imageBuffer[2] === 0xFF;

      if (!isPNG && !isJPG) {
        const errorText = imageBuffer.toString("utf8").slice(0, 500);
        throw new Error(
          "API did not return an image: " + errorText
        );
      }

      const cacheDir = path.join(__dirname, "cache");
      await fs.ensureDir(cacheDir);

      imgPath = path.join(
        cacheDir,
        `kiss_${senderID}_${targetID}_${Date.now()}.${isPNG ? "png" : "jpg"}`
      );

      await fs.writeFile(imgPath, imageBuffer);

      // Send image and wait until sending finishes
      await message.reply({
        body: "💋 Here's your kiss image!",
        attachment: fs.createReadStream(imgPath)
      });

    } catch (err) {
      console.error(
        "KISS COMMAND ERROR:",
        err.response?.data
          ? Buffer.from(err.response.data).toString("utf8").slice(0, 500)
          : err.stack || err.message || err
      );

      message.reply(
        "🥹 Kiss image তৈরি করা যায়নি। API server বা image generation সমস্যা হতে পারে।"
      );

    } finally {
      if (imgPath && await fs.pathExists(imgPath)) {
        try {
          await fs.unlink(imgPath);
        } catch (e) {
          console.error("Kiss image cleanup error:", e.message);
        }
      }
    }
  }
};
