const cron = require("node-cron");
const { notifyAbsen } = require("../controllers/notifyAbsenController");
let data = require("../data.json");

const startCronJobs = () => {
  // // Contoh cron job: Setiap hari pada pukul 08:00 WIB (GMT+7)
  // // Ingat, Vercel menggunakan UTC, jadi sesuaikan waktu Anda.
  // // Jika Anda ingin jam 8 pagi WIB (GMT+7), maka di UTC adalah jam 1 pagi (01:00 UTC).
  // // Format cron: menit jam tanggal_bulan bulan tanggal_minggu
  // cron.schedule(
  //   "0 1 * * *",
  //   () => {
  //     console.log("Running daily report cron job...");
  //     notifyAbsen.sendDailyReport();
  //   },
  //   {
  //     timezone: "Asia/Jakarta", // Atur zona waktu sesuai kebutuhan jika node-cron mendukung.
  //     // Namun, lebih aman mengandalkan UTC dan konversi manual.
  //   }
  // );

  // // Contoh cron job lain: Setiap 15 menit
  // cron.schedule("*/15 * * * *", () => {
  //   console.log("Running hourly update cron job...");
  //   notifyAbsen.sendHourlyUpdate();
  // });

  // // Contoh cron job lain: Setiap 5 detik
  // cron.schedule("*/5 * * * * *", () => {
  //   console.log("Running schedule notification cron job...");
  //   // Ganti dengan ID jadwal yang sesuai
  //   notifyAbsen.sendScheduleNotification(1);
  // });

  // cron.schedule("*/1 * * * *", async () => {
  //   console.log("Testing every 1 minutes");
  //   await telegramService.sendMessage(`Hello ${new Date()}`, "HTML");
  // });

  const data1 = data.find((item) => item.id === 1);
  const data2 = data.find((item) => item.id === 2);
  const data3 = data.find((item) => item.id === 3);
  const data4 = data.find((item) => item.id === 4);
  const data5 = data.find((item) => item.id === 5);

  cron.schedule(data1.cronTime, async () => {
    console.log(`Running schedule notification cron job for: ${data1.title}`);
    await notifyAbsen.sendScheduleNotification(data1.id);
  });

  cron.schedule(data2.cronTime, async () => {
    console.log(`Running schedule notification cron job for: ${data2.title}`);
    await notifyAbsen.sendScheduleNotification(data2.id);
  });

  cron.schedule(data3.cronTime, async () => {
    console.log(`Running schedule notification cron job for: ${data3.title}`);
    await notifyAbsen.sendScheduleNotification(data3.id);
  });

  cron.schedule(data4.cronTime, async () => {
    console.log(`Running schedule notification cron job for: ${data4.title}`);
    await notifyAbsen.sendScheduleNotification(data4.id);
  });

  cron.schedule(data5.cronTime, async () => {
    console.log(`Running schedule notification cron job for: ${data5.title}`);
    await notifyAbsen.sendScheduleNotification(data5.id);
  });

  console.log("Cron jobs scheduled!");
};

module.exports = { startCronJobs };
