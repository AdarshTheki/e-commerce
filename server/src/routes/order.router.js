import express from "express";
import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { Address } from "../models/address.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// get all orders
router.get("/all", async (req, res) => {
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
router.get("/", verifyJWT(), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "asc",
    } = req.query;
    const customerId = req.user._id;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const data = await Order.find({ customerId })
      .populate({
        path: "shippingId",
      })
      .populate({
        path: "items.productId",
        select: "title price thumbnail", // Only Product Title & Price
      })
      .sort({
        [sort]: order === "asc" ? 1 : -1,
      })
      .sort({ [sort]: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export default router;
