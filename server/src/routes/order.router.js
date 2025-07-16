import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createOrder,
  getAllOrders,
  getUserOrders,
  stripeCheckout,
  stripeWebhook,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.route("/").get(getAllOrders).post(verifyJWT(), createOrder);
router.get("/user", verifyJWT(), getUserOrders);
router.patch("/:orderId/status", updateOrderStatus);
router.post("/stripe-checkout", stripeCheckout);

router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router;
