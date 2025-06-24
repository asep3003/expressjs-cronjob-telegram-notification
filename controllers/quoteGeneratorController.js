const { getQuote } = require("node-quotegen");
const telegramService = require("../helpers/telegramService");

const quoteGenerator = {
  generateQuoteByCategory: async (category) => {
    const quote = getQuote(category);
    await telegramService.sendMessage(`"${quote}"`, "HTML");
    return quote;
  },
};

module.exports = { quoteGenerator };
