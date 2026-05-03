const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.on("close", () => clients.delete(ws));
});

app.post("/broadcast", (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }

  const payload = JSON.stringify({
    message,
    time: new Date().toLocaleTimeString(),
  });

  let sent = 0;
  for (const ws of clients) {
    if (ws.readyState === 1) {
      ws.send(payload);
      sent++;
    }
  }

  res.json({ ok: true, recipients: sent });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`  Admin:  http://localhost:${PORT}/admin.html`);
  console.log(`  Client: http://localhost:${PORT}/`);
});
