const express = require("express");
const router = express.Router();
const {
  notificationController,
} = require("../controllers/notifyAbsenController");

// Data jadwal Anda (juga di sini untuk referensi path)
// Sebaiknya ini diimpor dari satu sumber atau disimpan di tempat lain jika dinamis.
const schedules = [
  { id: 1, path: "/api/schedule/1" },
  { id: 2, path: "/api/schedule/2" },
  { id: 3, path: "/api/schedule/3" },
  { id: 4, path: "/api/schedule/4" },
  { id: 5, path: "/api/schedule/5" },
];

// router.get("/send-report-manual", async (req, res) => {
//   await notificationController.sendScheduleNotification(1);
//   res.send("Manual daily report sent!");
// });

router.get("/testing-only", async (req, res) => {
  console.log("Testing route hit!");
  await notificationController.testingOnly();
  res.send("Testing route executed successfully!");
});

// Membuat rute dinamis untuk setiap jadwal
schedules.forEach((schedule) => {
  router.get(schedule.path, async (req, res) => {
    console.log(
      `Menerima permintaan dari Vercel Cron Job untuk jadwal ID: ${schedule.id}`
    );
    await notificationController.sendScheduleNotification(schedule.id);
    res.status(200).send(`Cron job untuk jadwal ID ${schedule.id} dieksekusi.`);
  });
});

router.get("/", (req, res) => {
  res.send(`Cron job service for schedules is ready! ${new Date()}\n`);
});

module.exports = router;
