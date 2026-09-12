# Send Msg

**English** | [简体中文](README.zh-CN.md)

A real-time message broadcasting service for your LAN. Compose a message on the admin page and all clients receive it in real time.

## Tech Stack

- **Backend**: Node.js + Express + WebSocket (ws)
- **Frontend**: Vanilla HTML/CSS/JS, zero dependencies

## Quick Start

```bash
git clone https://github.com/xiangjianan/send-msg.git
cd send-msg
npm install
npm start
```

## Usage

Once the service is running, access it over the LAN via `IP:port`:

| Role | URL |
|------|------|
| Admin (send messages) | `http://<IP>:3000/admin.html` |
| Client (receive messages) | `http://<IP>:3000/` |

### Local Testing

- Admin: http://localhost:3000/admin.html
- Client: http://localhost:3000/

### LAN Access

```bash
# Find your LAN IP
ipconfig getifaddr en0   # macOS
hostname -I              # Linux
```

Assuming the IP is `192.168.10.48`, any device on the LAN can access:

- Admin: `http://192.168.10.48:3000/admin.html`
- Client: `http://192.168.10.48:3000/`

## Project Structure

```
send_msg/
├── server.js           # Express + WebSocket server
├── package.json
└── public/
    ├── index.html      # Client page (receives messages only)
    └── admin.html      # Admin page (compose and send messages)
```

## Custom Port

```bash
PORT=8080 npm start
```

## License

MIT
