import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import rateLimit from "express-rate-limit";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
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

// import all routing files
import userRoute from "./routes/user.router.js";
import productRoute from "./routes/product.router.js";
import orderRoute from "./routes/order.router.js";
import reviewRoute from "./routes/review.router.js";
import categoryRoute from "./routes/category.router.js";
import brandRoute from "./routes/brand.router.js";
import variantRoute from "./routes/variant.router.js";
import cartRoute from "./routes/cart.router.js";
import { ApiError } from "./utils/ApiError.js";

// used all base url
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/variant", variantRoute);
app.use("/api/v1/cart", cartRoute);

app.get("/api/v1", async (req, res) =>
  res.send(`<h2>Check Health Success</h2>`)
);

app.get("*", (req, res) => res.send(`<h2>Check API Endpoints</h2>`));

app.use((err, req, res, next) => {
  console.log("error:", err.message);
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message, ...err });
  } else {
    res.status(500).send(err.message || "internal server error");
  }
});

export { app };
