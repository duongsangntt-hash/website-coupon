// Custom entry point required by cPanel's "Setup Node.js App" (Phusion
// Passenger). Passenger runs this file directly — it does not run `npm
// start` — so it must open its own HTTP server on process.env.PORT.
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`Ready on port ${process.env.PORT || 3000}`);
  });
});
