import Stripe from "stripe";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { isValidObjectId } from "mongoose";

const stripe = new Stripe(process.env.STRIPE_API_SECRET, {
  apiVersion: "2024-04-10",
});

export const stripeWebhook = async (req, res) => {
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers["stripe-signature"];

  if (!stripeWebhookSecret || !sig) {
    return res
      .status(400)
      .json({ message: "Missing webhook secret or signature" });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      stripeWebhookSecret
    );

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const { userId, addressId } = session.metadata || {};

        if (!userId || !addressId) {
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
        console.log("succeed order");
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    return res.status(500).json({ message: `Webhook Error: ${err.message}` });
  }
};

export const stripeCheckout = async (req, res) => {
  const { userId, addressId } = req.body;

  if (!isValidObjectId(userId)) throw Error("invalid userId");
  if (!isValidObjectId(addressId)) throw Error("invalid addressId");

  const cart = await Cart.findOne({
    createdBy: userId,
  }).populate("items.productId");

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["IN"] },
      shipping_options: [
        { shipping_rate: "shr_1PUfiJSEX6kzN9W0nabvhl8X" },
        { shipping_rate: "shr_1PUUUQSEX6kzN9W0NTr4rNla" },
        { shipping_rate: "shr_1PUfgHSEX6kzN9W0mtantJdO" },
      ],
      metadata: {
        userId,
        addressId,
      },
      customer_email: req.user.email,
      line_items: cart.items?.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productId.title,
          },

          unit_amount: Math.floor(item.productId.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.REDIRECT_URL}/order/success`,
      cancel_url: `${process.env.REDIRECT_URL}/order/failed`,
    });

    return res
      .status(200)
      .json({ url: session.url, message: "checkout success to stripe" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};
