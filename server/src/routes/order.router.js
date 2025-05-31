import Stripe from "stripe";
import express from "express";
import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { Address } from "../models/address.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2024-04-10",
});

router.post("/stripe-checkout", verifyJWT(), async (req, res) => {
  const { userId, addressId } = req.body;

  const cart = await Cart.findOne({
    createdBy: userId,
  }).populate("items.productId");

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
      metadata: {
        userId,
        addressId,
      },
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
      success_url: `${redirect_url}/order/success`,
      cancel_url: `${redirect_url}/order/failed`,
    });

    return res.status(200).json(session.url);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// get all orders
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "createdAt" } = req.query;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .populate({
        path: "customer",
        select: "firstName lastName email", // Select Specific Fields
      })
      .populate({
        path: "shipping",
      })
      .populate({
        path: "items.productId",
        select: "title price thumbnail", // Only Product Title & Price
      })
      .sort({ [sort]: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

router.post("/", verifyJWT(), async (req, res) => {
  try {
    const { shipping } = req.body;

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart.items?.length) {
      return res
        .status(405)
        .json({ message: "carts is empty", success: false });
    }

    let tempAddress;
    if (!shipping) {
      tempAddress = await Address.findById({ owner: req.user._id });
    } else {
      tempAddress = await Address.create({
        owner: req.user._id,
        addressLine1: shipping.addressLine1,
        city: shipping.city,
        country: shipping.country,
        pinCode: parseInt(shipping.pinCode),
        state: shipping.state,
      });
    }

    if (!tempAddress)
      return res.status(404).json({ message: "shipping address not found" });

    const order = await Order.create({
      customer: req.user._id,
      shipping: tempAddress._id,
      items: cart.items,
      status: "pending",
    });

    if (order) {
      cart.items = [];
      await cart.save();
    }

    res
      .status(201)
      .json({ order, message: "order created success", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

// get user order
router.get("/user", verifyJWT(), async (req, res) => {
  try {
    const { _id } = req?.user;
    const { page = 1, limit = 10, sort = "createdAt" } = req.query;
    const skip = (page - 1) * limit;

    const order = await Order.find({ customer: _id })
      .populate({
        path: "customer",
        select: "firstName lastName email", // Select Specific Fields
      })
      .populate({
        path: "shipping",
      })
      .populate({
        path: "items.productId",
        select: "title price thumbnail", // Only Product Title & Price
      })
      .sort({
        createdAt: -1,
      })
      .sort({ [sort]: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export default router;
