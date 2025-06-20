/**
 * Mengonversi format tanggal 'YYYY-MM-DD HH:mm:ss' ke format cron.
 *
 * @param {string} dateTimeString String tanggal dan waktu dalam format 'YYYY-MM-DD HH:mm:ss'.
 * @returns {string|null} String dalam format cron 'menit jam tanggal_bulan bulan tanggal_minggu' atau null jika format tidak valid.
 */
function convertDateToCron(dateTimeString) {
  // Regex untuk memvalidasi dan mengekstrak komponen tanggal dan waktu
  const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
  const match = dateTimeString.match(dateTimeRegex);

  if (!match) {
    console.error(
      "Invalid date time string format. Expected YYYY-MM-DD HH:mm:ss"
    );
    return null;
  }

  // Ekstrak komponen dari regex match
  // match[0] adalah full string, jadi kita mulai dari match[1]
  const year = parseInt(match[1]);
  const month = parseInt(match[2]); // Bulan (1-12)
  const dayOfMonth = parseInt(match[3]); // Tanggal (1-31)
  const hour = parseInt(match[4]); // Jam (0-23)
  const minute = parseInt(match[5]); // Menit (0-59)
  // const second = parseInt(match[6]); // Detik tidak digunakan dalam format cron standar

  // Validasi dasar untuk bulan dan hari
  if (
    month < 1 ||
    month > 12 ||
    dayOfMonth < 1 ||
    dayOfMonth > 31 ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    console.error("Invalid date or time component value.");
    return null;
  }

  // Format cron: menit jam tanggal_bulan bulan tanggal_minggu
  // Untuk tanggal_minggu, kita bisa menggunakan '*' jika tidak spesifik.
  // Atau, jika Anda ingin spesifik, Anda bisa menggunakan new Date().getDay()
  // untuk mendapatkan hari dalam seminggu (0 = Minggu, 6 = Sabtu).
  // Untuk kesederhanaan, kita akan gunakan '*' untuk hari dalam seminggu.
  const cronFormat = `${minute} ${hour} ${dayOfMonth} ${month} *`;

  return cronFormat;
}

module.exports = {
  convertDateToCron,
};
