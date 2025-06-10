import { Server } from "socket.io";
import http from "http";

export function socketConnection(app) {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: "*", credentials: true, methods: ["GET", "POST"] },
  });

  // 🔥 socket.io logic
  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id); // io.on

    socket.on("message", (data) => {
      // socket.on
      console.log("📩 Message received:", data);
      io.emit("message", data); // io.emit
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id); // socket.on (disconnect)
    });
  });

  return server;
}
