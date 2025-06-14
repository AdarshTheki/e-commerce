import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
// import rateLimit from "express-rate-limit";

// import all routing files
import userRoute from "./routes/user.router.js";
import productRoute from "./routes/product.router.js";
import orderRoute from "./routes/order.router.js";
import reviewRoute from "./routes/review.router.js";
import categoryRoute from "./routes/category.router.js";
import brandRoute from "./routes/brand.router.js";
import cartRoute from "./routes/cart.router.js";
import addressRoute from "./routes/address.router.js";
import openaiRoute from "./routes/openai.router.js";
import dashboardRoute from "./routes/dashboard.js";
import health_checkRoute from "./routes/healthcheck.router.js";
import galleryRoute from "./routes/gallery.router.js";
import messageRoute from "./routes/message.router.js";
import chatRoute from "./routes/chat.router.js";
import notificationRoute from "./routes/notification.router.js";
import stripeRouter, { stripeWebhook } from "./routes/stripe.route.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.post(
  "/api/v1/stripe/stripe-webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public/dist"));

app.use(cookieParser());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // max 100 requests per windowMs
// });

// app.use(limiter);

// ----Connect and Serve the Socket.Io-----
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", credentials: true, methods: ["GET", "POST"] },
});

// Save io instance in app for global access
app.set("io", io);

// 🔥 socket.io logic
io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id); // io.on

  // socket.on and get/send message
  socket.on("message", (data) => {
    console.log("📩 Message received:", data);
    io.emit("message", data); // io.emit
  });

  // Optional: join the user to a room with their userId
  socket.on("join", (userId) => {
    socket.join(userId); // user will receive events sent to their ID
    console.log(`User ${userId} joined their room`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected:", socket.id); // socket.on (disconnect)
  });
});

// used all base url
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/openai", openaiRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/api/v1/stripe", stripeRouter);
app.use("/api/v1/gallery", galleryRoute);
app.use("/api/v1/chats", chatRoute);
app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/notifications", notificationRoute);
app.use("/api/v1/health-check", health_checkRoute);

// ---Display the HTML Static Page Load---
app.get("/", (req, res) => {
  return res.sendFile("/public/dist/index.html");
});

// ---Check API is Valid Endpoints----
app.get("*", (req, res) => {
  res.status(504).json({ message: "API Endpoint is Not Found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default server;
