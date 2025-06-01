import { Router } from "express";
import mongoose from "mongoose";
import { Cart } from "../models/cart.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { success, error } from "../utils/ApiResponse.js";

const router = Router();

// get all carts
router.get("/", verifyJWT(), async (req, res) => {
  try {
    const createdBy = req.user._id;

    const carts = await Cart.findOne({ createdBy }).populate("items.productId");

    if (!carts)
      return res.status(404).json(error("get user carts not exists", 404));

    res.status(200).json(success(carts, "get user carts success", 200));
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

// Add item to cart
router.post("/", verifyJWT(), async (req, res) => {
  try {
    const createdBy = req.user._id;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res.status(404).json(error("productId is invalid", 404));

    let cart = await Cart.findOne({ createdBy });

    if (!cart) {
      cart = new Cart({ createdBy, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();

    res.status(201).json(success(cart, "add to user cart", 201));
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

// Remove item from cart
router.delete("/:id", verifyJWT(), async (req, res) => {
  try {
    const createdBy = req.user._id;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json(error("invalid productId", 405));
    5;

    const cart = await Cart.findOne({ createdBy });

    if (!cart) return res.status(404).json(error("User Cart not found", 404));

    if (cart.items.length === 0)
      return res.status(404).json(error("User Cart is empty", 404));

    cart.items = cart.items.filter((item) => item.productId.toString() !== id);

    await cart.save();

    res.status(202).json(success(cart, "user cart deleted", 202));
  } catch (err) {
    res.status(500).json(error(err.message));
  }
});

// Update item quantity
router.put("/", verifyJWT(), async (req, res) => {
  try {
    const createdBy = req?.user?._id;
    const { quantity, productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res.status(404).json(error("productId invalid", 404));

    const cart = await Cart.findOne({ createdBy });

    if (!cart) {
      return res.status(404).json(error("cart not found", 404));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json(error("item not found", 404));
    }
  } catch (error) {
    res.status(500).json(error(error.message));
  }
});

// Remove all items from cart
router.delete("/delete/all", verifyJWT(), async (req, res) => {
  try {
    const createdBy = req?.user?._id;

    const cart = await Cart.findOneAndDelete({ createdBy });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
});

// Move item to wishlist
router.post("/move-wishlist", verifyJWT(), async (req, res) => {
  try {
    const createdBy = req.user?._id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res
        .status(404)
        .json({ message: "productId is invalid", status: false });

    const cart = await Cart.findOne({ createdBy });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      const [item] = cart.items.splice(itemIndex, 1);
      cart.wishlist.push({ productId: item.productId });
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error moving to wishlist", error });
  }
});

// Move item from wishlist to cart
router.post("/move-cart", verifyJWT(), async (req, res) => {
  try {
    const createdBy = req.user._id;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res
        .status(404)
        .json({ message: "productId is invalid", status: false });

    const cart = await Cart.findOne({ createdBy });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const wishlistIndex = cart.wishlist.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (wishlistIndex > -1) {
      const [item] = cart.wishlist.splice(wishlistIndex, 1);
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Item not found in wishlist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error moving from wishlist to cart", error });
  }
});

// Share cart
router.get("/share", verifyJWT(), async (req, res) => {
  try {
    const createdBy = req.user._id;
    const cart = await Cart.findOne({ createdBy });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const shareableLink = `${process.env.REDIRECT_URL}/cart/${cart._id}`;
    res.status(200).json({ message: "Cart shared", link: shareableLink });
  } catch (error) {
    res.status(500).json({ message: "Error sharing cart", error });
  }
});

export default router;
