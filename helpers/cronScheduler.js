const cron = require("node-cron");
const {
  notificationController,
} = require("../controllers/notifyAbsenController");
const telegramService = require("./telegramService");

const startCronJobs = () => {
  // // Contoh cron job: Setiap hari pada pukul 08:00 WIB (GMT+7)
  // // Ingat, Vercel menggunakan UTC, jadi sesuaikan waktu Anda.
  // // Jika Anda ingin jam 8 pagi WIB (GMT+7), maka di UTC adalah jam 1 pagi (01:00 UTC).
  // // Format cron: menit jam tanggal_bulan bulan tanggal_minggu
  // cron.schedule(
  //   "0 1 * * *",
  //   () => {
  //     console.log("Running daily report cron job...");
  //     notificationController.sendDailyReport();
  //   },
  //   {
  //     timezone: "Asia/Jakarta", // Atur zona waktu sesuai kebutuhan jika node-cron mendukung.
  //     // Namun, lebih aman mengandalkan UTC dan konversi manual.
  //   }
  // );

  // // Contoh cron job lain: Setiap 15 menit
  // cron.schedule("*/15 * * * *", () => {
  //   console.log("Running hourly update cron job...");
  //   notificationController.sendHourlyUpdate();
  // });

  // // Contoh cron job lain: Setiap 5 detik
  // cron.schedule("*/5 * * * * *", () => {
  //   console.log("Running schedule notification cron job...");
  //   // Ganti dengan ID jadwal yang sesuai
  //   notificationController.sendScheduleNotification(1);
  // });

  cron.schedule("*/1 * * * *", async () => {
    console.log("Testing every 1 minutes");
    await telegramService.sendMessage(`Hello ${new Date()}`, "HTML");
  });

  console.log("Cron jobs scheduled!");
};

module.exports = { startCronJobs };
