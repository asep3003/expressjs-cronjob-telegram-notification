const express = require("express");
const router = express.Router();
const { notifyAbsen } = require("../controllers/notifyAbsenController");
const { quoteGenerator } = require("../controllers/quoteGeneratorController");

// running vercel cron job
const schedules = [
  { id: 1, path: "/api/schedule/1" },
  { id: 2, path: "/api/schedule/2" },
  { id: 3, path: "/api/schedule/3" },
  { id: 4, path: "/api/schedule/4" },
  { id: 5, path: "/api/schedule/5" },
];

router.get("/testing-only", async (req, res) => {
  console.log("Testing route hit!");
  await notifyAbsen.testingOnly();
  res.send("Testing route executed successfully!");
});

router.get("/generate-quote", async (req, res) => {
  const quote = await quoteGenerator.generateQuoteByCategory(
    "inspirational",
    "motivational"
  );

  return res.send({
    quote: quote,
  });
});

schedules.forEach((schedule) => {
  router.get(schedule.path, async (req, res) => {
    console.log(
      `Menerima permintaan dari Vercel Cron Job untuk jadwal ID: ${schedule.id}`
    );
    await notifyAbsen.sendScheduleNotification(schedule.id);
    res.status(200).send(`Cron job untuk jadwal ID ${schedule.id} dieksekusi.`);
  });
});

router.get("/", (req, res) => {
  console.log("Root route hit!");
  res.send(`Cron job service for schedules is ready! ${new Date()}\n`);
});

module.exports = router;
