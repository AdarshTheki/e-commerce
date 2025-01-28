import Stripe from "stripe";
import { Order } from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2024-04-10",
});

export const stripWebhook = asyncHandler(async (req, res, next) => {
  const payload = JSON.stringify(req.body, null, 2);
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const header = stripe.webhooks.generateTestHeaderString({
    payload,
    secret,
  });

  if (!payload || !stripeWebhookSecret || !header) {
    throw new ApiError(404, "Not enough data to text or headers");
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      header,
      stripeWebhookSecret
    );
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const shipping = [
        session?.shipping_details?.address?.line1,
        session?.shipping_details?.address?.city,
        session?.shipping_details?.address?.state,
        session?.shipping_details?.address?.postal_code,
        session?.shipping_details?.address?.country,
      ];

      const retrieveSession = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items.data.price.product"] }
      );
      const lineItems = retrieveSession?.line_items?.data;

      const orderItems = lineItems?.map((item) => {
        return {
          price: Math.floor(item.amount_total),
          name: item.description,
          quantity: item.quantity,
        };
      });

      await Order.create({
        username: session?.customer_details?.name,
        email: session?.customer_details?.email,
        address: shipping.join(", "),
        items: orderItems,
      });

      return res.status(200).json({ message: true });
    } else {
      return res.status(400).json({ message: "Failed Payment" });
    }
  } catch (error) {
    next(error);
  }
});

export const checkoutStrip = asyncHandler(async (req, res, next) => {
  const { cartItems } = req.body;
  const redirect_url = process.env.ECOMMERCE_REDIRECT_URL;
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
      line_items: cartItems?.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
          },
          unit_amount: Math.floor(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${redirect_url}/order/success`,
      cancel_url: `${redirect_url}/checkout`,
    });

    return res.status(200).json(session.url);
  } catch (error) {
    next(error);
  }
});

export const getAllOrders = asyncHandler(async (req, res, next) => {
  try {
    const allOrders = await Order.find().sort({ createdAt: -1 }).limit(10);

    if (!allOrders) throw new ApiError(404, "not found orders");

    return res.status(200).json(allOrders);
  } catch (error) {
    next(error);
  }
});
