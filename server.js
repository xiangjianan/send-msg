const express = require("express");
const http = require("http");
const { WebSocketServer } = require("ws");
const path = require("path");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const clients = new Set();
const DB_FILE = path.join(__dirname, "data.json");

function loadMessages() {
  try { return JSON.parse(fs.readFileSync(DB_FILE, "utf8")); } catch { return []; }
}

function saveMessages() {
  fs.writeFileSync(DB_FILE, JSON.stringify(messages));
}

const messages = loadMessages();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.on("close", () => clients.delete(ws));
});

function broadcast(payload) {
  const data = JSON.stringify(payload);
  let sent = 0;
  for (const ws of clients) {
    if (ws.readyState === 1) {
      ws.send(data);
      sent++;
    }
  }
  return sent;
}

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/broadcast", (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message is required" });
  }

  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const m = { id, message, time: new Date().toLocaleString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).replace(/\//g, "-") };
  messages.push(m);
  saveMessages();

  broadcast({ type: "message", ...m });

  res.json({ ok: true, id, recipients: broadcast.length });
});

app.post("/delete", (req, res) => {
  const { id } = req.body;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "id is required" });
  }

  const idx = messages.findIndex((m) => m.id === id);
  if (idx !== -1) { messages.splice(idx, 1); saveMessages(); }

  const sent = broadcast({ type: "delete", id });
  res.json({ ok: true, recipients: sent });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`  Admin:  http://localhost:${PORT}/admin.html`);
  console.log(`  Client: http://localhost:${PORT}/`);
});
