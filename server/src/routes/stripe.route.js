import Stripe from "stripe";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2024-04-10",
});

const stripeRoute = async (req, res) => {
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers["stripe-signature"];

  if (!stripeWebhookSecret || !sig) {
    return res
      .status(400)
      .json({ message: "Missing webhook secret or signature" });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
  } catch (err) {
    console.log(
      "stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret)"
    );
    return res.status(400).json({ message: `Webhook Error: ${err.message}` });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const { userId, addressId } = session.metadata || {};

      if (!userId || !addressId) {
        console.log("!userId || !addressId");
        return res
          .status(400)
          .json({ message: "Missing userId or addressId in metadata" });
      }

      const cart = await Cart.findOne({ createdBy: userId });
      if (!cart || !cart.items?.length) {
        return res.status(400).json({ message: "Cart not found or empty" });
      }

      const order = new Order({
        customerId: userId,
        items: cart.items,
        shippingId: addressId,
        status: "pending",
      });
      await order.save();

      cart.items = [];
      await cart.save();
      console.log("cart");
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};

export default stripeRoute;
