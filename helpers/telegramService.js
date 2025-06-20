require("dotenv").config();
const axios = require("axios");

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const telegramService = {
  // Menambahkan parameter parseMode opsional
  sendMessage: async (message, parseMode = "HTML") => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Telegram Bot Token or Chat ID is not defined in .env");
      return;
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
      await axios.post(url, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: parseMode, // Gunakan parseMode yang diterima
      });
      console.log("Notification sent to Telegram successfully!");
    } catch (error) {
      console.error(
        "Error sending message to Telegram:",
        error.response ? error.response.data : error.message
      );
    }
  },
};

module.exports = telegramService;
