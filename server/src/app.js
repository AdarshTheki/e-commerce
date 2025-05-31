import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import rateLimit from "express-rate-limit";

const app = express();

app.use(cors({ origin: "*", credentials: true }));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // max 100 requests per windowMs
// });

// app.use(limiter);

import stripeRoute from "./routes/stripe.route.js";

app.post(
  "/api/v1/order/stripe-webhook",
  express.raw({ type: "application/json" }),
  stripeRoute
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cookieParser());

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

app.get("/api/v1", async (req, res) => {
  res
    .status(200)
    .json({ message: "API Health Check Successful", status: "ok" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Endpoint Not Found" });
});

export { app };
