import express from "express";
import { Order, orderStatus } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { Address } from "../models/address.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { pagination } from "../utils/pagination.js";
import Stripe from "stripe";

const router = express.Router();

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

// ------Get All Order By The Dashboard Side-----
router.get(
  "/",
  // verifyJWT("admin"),
  asyncHandler(async (req, res) => {
    const page = +req.query?.page || 1;
    const limit = +req.query?.limit || 10;
    const sort = req.query?.sortBy || "createdAt";
    const order = req.query?.orderBy || "desc";

    const orders = await Order.aggregate(
      pagination(
        [{ $match: { status: { $in: orderStatus } } }, ...orderAggregation],
        page,
        limit,
        sort,
        order === "asc" ? 1 : -1
      )
    );

    if (!orders[0])
      throw new ApiError(404, "Internal server error, Order not found");

    res.status(200).json(orders[0]);
  })
);

// ----Create Order By User-----
router.post(
  "/",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const { shipping } = req.body;

    const cart = await Cart.findOne({ createdBy: req.user._id });

    if (!cart.items?.length) {
      return res
        .status(405)
        .json({ message: "carts is empty", success: false });
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

    if (!tempAddress)
      return res.status(404).json({ message: "shipping address not found" });

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

    res
      .status(201)
      .json({ order, message: "order created success", success: true });
  })
);

// ----- Get Order by the User Login-------
router.get(
  "/user",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const page = +req.query?.page || 1;
    const limit = +req.query?.limit || 10;
    const sort = req.query?.sortBy || "createdAt";
    const order = req.query?.orderBy || "desc" === "asc" ? 1 : -1;

    const orders = await Order.aggregate(
      pagination(
        [{ $match: { customer: req.user._id } }, ...orderAggregation],
        page,
        limit,
        sort,
        order
      )
    );

    if (!orders[0])
      throw new ApiError(404, "Internal server error, Order not found");

    res.status(200).json(orders[0]);
  })
);

// -----Update Order Status-----
router.patch(
  "/:orderId/status",
  asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderStatus.includes(status))
      throw new ApiError(404, "Status is Invalid");

    const order = await Order.findById(orderId);

    if (!order) throw new ApiError(404, "Order not found on database");

    order.status = status;
    await order.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Status update successfully", order });
  })
);

// -----load stripe with webhook and payment success/failed-----
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
    // check event type
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

        const address = await Address.findById(addressId);

        if (!address) {
          return res
            .status(400)
            .json({ message: "Cart founded but Address not found" });
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

// -----checkout payment with stripe-----
router.post(
  "/stripe-checkout",
  asyncHandler(async (req, res) => {
    const { addressId, userId } = req.body;

    const cart = await Cart.findOne({
      createdBy: userId,
    }).populate("items.productId");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: { allowed_countries: ["IN"] },
      // shipping_options: [
      //   { shipping_rate: "shr_1PUfiJSEX6kzN9W0nabvhl8X" },
      //   { shipping_rate: "shr_1PUUUQSEX6kzN9W0NTr4rNla" },
      //   { shipping_rate: "shr_1PUfgHSEX6kzN9W0mtantJdO" },
      // ],
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
      .json({ url: session.url, message: "checkout success to stripe" });
  })
);

export default router;
