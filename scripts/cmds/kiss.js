
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const mahmud = async () => {
  const base = await axios.get(
    "https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json",
    { timeout: 15000 }
  );

  if (!base.data || !base.data.mahmud) {
    throw new Error("API base URL not found in baseApiUrl.json");
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
      const obfuscatedAuthor = String.fromCharCode(
        77, 97, 104, 77, 85, 68
      );

      if (module.exports.config.author.trim() !== obfuscatedAuthor) {
        return api.sendMessage(
          "❌ | You are not authorized to change the author name.",
          event.threadID,
          event.messageID
        );
      }

      const mention = Object.keys(event.mentions || {});

      if (mention.length === 0) {
        return message.reply("Please mention someone to kiss 💋");
      }

      const senderID = event.senderID;
      const targetID = mention[0];

      const base = await mahmud();
      const apiURL = `${base}/api/kiss`;

      console.log("[KISS] API URL:", apiURL);

      const response = await axios.post(
        apiURL,
        { senderID, targetID },
        {
          responseType: "arraybuffer",
          timeout: 60000,
          headers: {
            "Content-Type": "application/json",
            Accept: "image/png, image/jpeg, image/*"
          },
          validateStatus: status => status >= 200 && status < 300
        }
      );

      const imageBuffer = Buffer.from(response.data);

      if (
        !imageBuffer.length ||
        !response.headers["content-type"]?.startsWith("image/")
      ) {
        throw new Error(
          "API did not return an image. Content-Type: " +
          response.headers["content-type"]
        );
      }

      imgPath = path.join(
        __dirname,
        `kiss_${senderID}_${targetID}_${Date.now()}.png`
      );

      await fs.writeFile(imgPath, imageBuffer);

      await message.reply({
        body: "💋 Here's your kiss image!",
        attachment: fs.createReadStream(imgPath)
      });

    } catch (err) {
      console.error("\n========== KISS COMMAND ERROR ==========");
      console.error("Message:", err.message);
      console.error("Status:", err.response?.status);
      console.error(
        "API Response:",
        err.response?.data
          ? Buffer.from(err.response.data).toString().slice(0, 1000)
          : "No response"
      );
      console.error("URL:", err.config?.url);
      console.error("========================================\n");

      await message.reply(
        "🥹 Kiss image তৈরি করা যায়নি!\n" +
        "Error: " + (err.message || "Unknown error")
      );

    } finally {
      if (imgPath && await fs.pathExists(imgPath)) {
        try {
          await fs.unlink(imgPath);
        } catch (e) {
          console.error("[KISS] File cleanup error:", e.message);
        }
      }
    }
  }
};
