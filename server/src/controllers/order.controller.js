import Stripe from "stripe";
import { Address } from "../models/address.model.js";
import { Cart } from "../models/cart.model.js";
import { Order, orderStatus } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const stripe = new Stripe(process.env.STRIPE_API_SECRET, {
  apiVersion: "2024-04-10",
});

const orderAggregation = [
  {
    $unwind: "$items",
  },
  {
    $lookup: {
      from: "products",
      localField: "items.productId",
      foreignField: "_id",
      as: "items.product",
    },
  },
  {
    $unwind: {
      path: "$items.product",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $group: {
      _id: "$_id",
      customer: { $first: "$customer" },
      shipping: { $first: "$shipping" },
      status: { $first: "$status" },
      createdAt: { $first: "$createdAt" },
      updatedAt: { $first: "$updatedAt" },
      items: {
        $push: {
          productId: "$items.productId",
          quantity: "$items.quantity",
          product: {
            title: "$items.product.title",
            price: "$items.product.price",
            thumbnail: "$items.product.thumbnail",
          },
        },
      },
    },
  },
];

// @desc    Get all orders for dashboard
// @route   GET /api/v1/orders
// @access  Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const page = +req.query?.page || 1;
  const limit = +req.query?.limit || 10;
  const sort = req.query?.sortBy || "createdAt";
  const order = req.query?.orderBy || "desc";

  const options = {
    page,
    limit,
    sort: { [sort]: order === "asc" ? 1 : -1 },
  };

  const orders = await Order.paginate(
    { status: { $in: orderStatus } },
    options
  );

  if (!orders) {
    throw new ApiError(404, "Orders not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders retrieved successfully"));
});

// @desc    Create a new order
// @route   POST /api/v1/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { shipping } = req.body;

  const cart = await Cart.findOne({ createdBy: req.user._id });

  if (!cart || !cart.items?.length) {
    throw new ApiError(400, "Cart is empty");
  }

  let tempAddress;
  if (!shipping) {
    tempAddress = await Address.findOne({
      createdBy: req.user._id,
      isDefault: true,
    });
  } else {
    tempAddress = await Address.create({
      createdBy: req.user._id,
      addressLine: shipping.addressLine,
      city: shipping.city,
      countryCode: shipping.countryCode,
      postalCode: parseInt(shipping.postalCode),
    });
  }

  if (!tempAddress) {
    throw new ApiError(404, "Shipping address not found");
  }

  const order = await Order.create({
    customer: req.user._id,
    shipping: {
      addressLine: tempAddress.addressLine,
      city: tempAddress.city,
      countryCode: tempAddress.countryCode?.toUpperCase(),
      postalCode: tempAddress.postalCode,
    },
    items: cart?.items || [],
    status: "pending",
  });

  if (order) {
    cart.items = [];
    await cart.save();
  }

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully"));
});

// @desc    Get user's orders
// @route   GET /api/v1/orders/my
// @access  Private
export const getUserOrders = asyncHandler(async (req, res) => {
  const page = +req.query?.page || 1;
  const limit = +req.query?.limit || 10;
  const sort = req.query?.sortBy || "createdAt";
  const order = req.query?.orderBy || "desc";

  const options = {
    page,
    limit,
    sort: { [sort]: order === "asc" ? 1 : -1 },
  };

  const orders = await Order.paginate({ customer: req.user._id }, options);

  if (!orders) {
    throw new ApiError(404, "Orders not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "User orders retrieved successfully"));
});

// @desc    Update order status
// @route   PUT /api/v1/orders/:orderId/status
// @access  Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!orderStatus.includes(status)) {
    throw new ApiError(400, "Invalid order status");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.status = status;
  await order.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated successfully"));
});

// @desc    Stripe webhook handler
// @route   POST /api/v1/orders/webhook
// @access  Public (Stripe)
export const stripeWebhook = asyncHandler(async (req, res) => {
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers["stripe-signature"];

  if (!stripeWebhookSecret || !sig) {
    throw new ApiError(400, "Missing webhook secret or signature");
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      stripeWebhookSecret
    );
  } catch (err) {
    throw new ApiError(400, `Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const { userId, addressId } = session.metadata || {};

      if (!userId || !addressId) {
        throw new ApiError(400, "Missing userId or addressId in metadata");
      }

      const cart = await Cart.findOne({ createdBy: userId });

      if (!cart || !cart.items?.length) {
        throw new ApiError(400, "Cart not found or empty");
      }

      const address = await Address.findById(addressId);

      if (!address) {
        throw new ApiError(400, "Address not found");
      }

      const order = new Order({
        customer: userId,
        items: cart.items,
        shipping: {
          addressLine: address.addressLine,
          city: address.city,
          countryCode: address.countryCode?.toUpperCase(),
          postalCode: address.postalCode,
        },
        status: "pending",
      });

      await order.save();

      cart.items = [];
      await cart.save();
      console.log("Order created successfully via webhook");
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return res.status(200).json(new ApiResponse(200, null, "Webhook received"));
});

// @desc    Create Stripe checkout session
// @route   POST /api/v1/orders/checkout
// @access  Private
export const stripeCheckout = asyncHandler(async (req, res) => {
  const { addressId, userId } = req.body;

  const cart = await Cart.findOne({
    createdBy: userId,
  }).populate("items.productId");

  if (!cart || !cart.items?.length) {
    throw new ApiError(400, "Cart is empty");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["IN"] },
    metadata: {
      userId,
      addressId,
    },
    line_items: cart.items?.map((item) => ({
      price_data: {
        currency: "usd",
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
    .json(new ApiResponse(200, { url: session.url }, "Checkout session created"));
});