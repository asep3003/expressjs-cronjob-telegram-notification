require("dotenv").config();
const express = require("express");

const { startCronJobs } = require("./helpers/cronScheduler.js");
const indexRouter = require("./routes/index.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", indexRouter); // Rute dasar jika Anda ingin memiliki endpoint HTTP

// Start cron jobs
startCronJobs();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export app for Vercel
module.exports = app;
