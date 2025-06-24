const express = require("express");
const fs = require("fs");
const path = require("path");
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

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Internal Absen Notifier Testing</title>
      <style>
        body {
          font-family: 'Segoe UI', sans-serif;
          background-color: #f0f4f8;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .container {
          text-align: center;
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        h1 {
          color: #2d3748;
        }
        p {
          color: #4a5568;
          margin-top: 10px;
        }
        .status {
          margin-top: 20px;
          font-weight: bold;
          color: green;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Internal Absen Notifier</h1>
        <p>This page is used for internal testing of the notification system.</p>
        <div class="status">✅ Notification test executed successfully!</div>
      </div>
    </body>
    </html>
  `;

  res.send(html);
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

  const userIp = req.ip || req.connection.remoteAddress;
  const filePath = path.join(__dirname, "../ips.json");

  let ipList = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    ipList = JSON.parse(data);
  }

  if (!ipList.includes(userIp)) {
    ipList.push(userIp);
    fs.writeFileSync(filePath, JSON.stringify(ipList, null, 2));
  }

  // console.log({
  //   host: req.get("host"),
  //   protocol: req.protocol,
  //   originalUrl: req.originalUrl,
  //   headers: req.headers,
  //   ip: req.ip,
  //   ips: req.ips,
  //   method: req.method,
  //   route: req.route,
  //   baseUrl: req.baseUrl,
  //   path: req.path,
  //   query: req.query,
  //   params: req.params,
  //   body: req.body,
  //   hostname: req.hostname,
  //   secure: req.secure,
  //   fresh: req.fresh,
  //   stale: req.stale,
  //   xhr: req.xhr,
  //   protocol: req.protocol,
  //   subdomains: req.subdomains,
  //   accept: req.accepts(),
  //   acceptLanguage: req.acceptsLanguages(),
  //   acceptEncoding: req.acceptsEncodings(),
  //   acceptCharset: req.acceptsCharsets(),
  //   get: req.get("Content-Type"),
  //   cookies: req.cookies,
  //   signedCookies: req.signedCookies,
  //   session: req.session,
  //   app: req.app,
  //   locals: req.app.locals,
  //   originalMethod: req.originalMethod,
  //   originalUrl: req.originalUrl,
  //   routePath: req.route.path,
  // });

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Cron Job Service</title>
      <style>
        body {
          font-family: 'Segoe UI', sans-serif;
          background-color: #f8fafc;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .container {
          text-align: center;
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        h1 {
          color: #2b6cb0;
          margin-bottom: 10px;
        }
        p {
          color: #4a5568;
          font-size: 16px;
        }
        .timestamp {
          margin-top: 20px;
          font-weight: bold;
          color: #2f855a;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🛠 Cron Job Service</h1>
        <p>This service manages scheduled jobs for internal systems.</p>
        <div class="timestamp">✅ Service is running: ${new Date().toLocaleString(
          "en-US",
          { timeZone: "Asia/Jakarta" }
        )}</div>
      </div>
    </body>
    </html>
  `;

  res.send(html);
});

module.exports = router;
