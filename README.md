# Send Msg

局域网实时消息广播服务。一个管理端输入消息，所有客户端实时接收。

## 技术栈

- **后端**：Node.js + Express + WebSocket (ws)
- **前端**：原生 HTML/CSS/JS，零依赖

## 快速开始

```bash
git clone https://github.com/xiangjianan/send-msg.git
cd send-msg
npm install
npm start
```

## 使用

启动服务后，在局域网内通过 `IP:端口` 访问：

| 角色 | 地址 |
|------|------|
| 管理端（发送消息） | `http://<IP>:3000/admin.html` |
| 客户端（接收消息） | `http://<IP>:3000/` |

### 本机测试

- 管理端：http://localhost:3000/admin.html
- 客户端：http://localhost:3000/

### 局域网访问

```bash
# 查看本机局域网 IP
ipconfig getifaddr en0   # macOS
hostname -I              # Linux
```

假设 IP 为 `192.168.10.48`，则局域网内任意设备访问：

- 管理端：`http://192.168.10.48:3000/admin.html`
- 客户端：`http://192.168.10.48:3000/`

## 项目结构

```
send_msg/
├── server.js           # Express + WebSocket 服务端
├── package.json
└── public/
    ├── index.html      # 客户端页面（只接收消息）
    └── admin.html      # 管理端页面（输入并发送消息）
```

## 自定义端口

```bash
PORT=8080 npm start
```

## License

MIT
