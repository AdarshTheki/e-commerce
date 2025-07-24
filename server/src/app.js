import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import { initializeSocketIO } from "./socket/index.js";
// import rateLimit from "express-rate-limit";

// Import All Routing Files
import userRoute from "./features/user/user.router.js";
import productRoute from "./features/product/product.router.js";
import commentRoute from "./features/comment/comment.router.js";
import categoryRoute from "./features/category/category.router.js";
import brandRoute from "./features/brand/brand.router.js";
import cartRoute from "./features/cart/cart.router.js";
import addressRoute from "./features/address/address.router.js";
import openaiRoute from "./features/openai/openai.router.js";
import dashboardRoute from "./features/dashboard/dashboard.router.js";
import health_checkRoute from "./features/healthcheck/healthcheck.router.js";
import messageRoute from "./features/message/message.router.js";
import chatRoute from "./features/chat/chat.router.js";
import orderRoute from "./features/order/order.router.js";
import cloudinaryRoute from "./features/cloudinary/cloudinary.router.js";
import reviewRoute from "./features/review/review.router.js";
import { logger, morganMiddleware } from "./middlewares/logger.middleware.js";

const app = express();

app.use(morganMiddleware);

const CORS = process.env?.CORS?.split(",");

app.use(cors({ origin: CORS, credentials: true }));

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 200, // max 100 requests per windowMs
// });

// app.use(limiter);

// Connect and Serve the Socket.Io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CORS,
    credentials: true,
  },
});

// Instance in App for Global Access
app.set("io", io);

initializeSocketIO(io);

// Used All Route URLS
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/openai", openaiRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/api/v1/chats", chatRoute);
app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/cloudinary", cloudinaryRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/", health_checkRoute);

// Check API is Valid Endpoints
app.use((req, res) => {
  res.status(404).json({
    message: "API Endpoint Not Found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl}`);
  return res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    path: req.originalUrl,
    stack: process.env.NODE_ENV === "DEVELOPMENT" ? err.stack : undefined,
  });
});

export default server;
