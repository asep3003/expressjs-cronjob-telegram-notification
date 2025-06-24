const telegramService = require("../helpers/telegramService");
const data = require("../data.json"); // Pastikan Anda memiliki data yang diperlukan

const notifyAbsen = {
  testingOnly: async () => {
    console.log("Testing route hit!");
    await telegramService.sendMessage(`Testing route! ${new Date()}`);
  },

  sendDailyReport: async () => {
    // Logika untuk mengambil data laporan harian Anda (misalnya dari database, API lain, dll.)
    const reportData =
      "Ini adalah laporan harian Anda dari proyek Cron Vercel!";

    const message = `
<b>Laporan Harian:</b>
Tanggal: ${new Date().toLocaleDateString()}
Isi Laporan: ${reportData}
`;
    await telegramService.sendMessage(message);
  },

  // Anda bisa menambahkan fungsi notifikasi lain di sini
  sendHourlyUpdate: async () => {
    const updateMessage = `Pembaruan jam: ${new Date().toLocaleTimeString()}`;
    await telegramService.sendMessage(updateMessage);
  },

  sendScheduleNotification: async (scheduleId) => {
    const schedule = data.find((s) => s.id === scheduleId);

    if (!schedule) {
      console.warn(`Jadwal dengan ID ${scheduleId} tidak ditemukan\.`);
      return;
    }

    const message = `
🔔 <b>Pengingat Kuliah</b> 🔔

<b>Mata Kuliah:</b> ${schedule.title}
<b>Waktu:</b> ${schedule.time}
<b>Link:</b> <a href="https://spada.swadharma.ac.id/login/index.php">Link Login</a>
<b>Link:</b> <a href="${schedule.url}">Link Absen</a>

Jangan sampai terlewat ya!
        `;
    await telegramService.sendMessage(message, "HTML");
    console.log(
      `Notifikasi untuk "${schedule.title}" (ID: ${scheduleId}) berhasil dikirim.`
    );
  },
};

module.exports = { notifyAbsen };
