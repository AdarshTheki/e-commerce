import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";
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

const app = express();

app.use(
  cors({ origin: process.env.CORS.split(",") || "*", credentials: true })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cookieParser());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // max 100 requests per windowMs
// });

// app.use(limiter);

// used all base url
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/address", addressRoute);

app.get("/api/v1", async (req, res) => {
  res
    .status(200)
    .json({ message: "API Health Check Successful", status: "ok" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Endpoint Not Found" });
});

export { app };
