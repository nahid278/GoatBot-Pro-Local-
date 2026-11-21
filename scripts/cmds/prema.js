
// ============================================
// PREMA ONCHAT DIAGNOSTIC TEST
// ============================================

console.log("[PREMA-TEST] prema.js successfully loaded!");

const originalPremaOnChat = module.exports.onChat;

module.exports.onChat = async function (context = {}) {
  console.log("\n========== PREMA ONCHAT TEST ==========");
  console.log("[TEST] onChat EVENT RECEIVED!");

  const api = context.api;
  const event = context.event;

  if (!api) {
    console.log("[TEST] API NOT FOUND!");
    return;
  }

  if (!event) {
    console.log("[TEST] EVENT NOT FOUND!");
    return;
  }

  console.log("[TEST] Thread ID:", event.threadID);
  console.log("[TEST] Sender ID:", event.senderID);
  console.log("[TEST] Message:", event.body);
  console.log("[TEST] Message Type:", event.type);

  if (typeof originalPremaOnChat !== "function") {
    console.log("[TEST] ORIGINAL ONCHAT NOT FOUND!");
    return;
  }

  console.log("[TEST] Calling original Prema handler...");

  try {
    await originalPremaOnChat(context);
    console.log("[TEST] Original handler completed.");
  } catch (error) {
    console.error("[TEST] ERROR:", error.stack || error);
  }

  console.log("========== PREMA TEST END ==========\n");
};
