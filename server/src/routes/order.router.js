import { Router } from "express";
import {
    checkoutStrip,
    getAllOrders,
    stripWebhook,
} from "../controllers/order.controller.js";

const router = Router();

router.route("/checkout-stripe").post(checkoutStrip);
router.route("/stripe-webhook").post(stripWebhook);
router.route("/all").get(getAllOrders);

export default router;
