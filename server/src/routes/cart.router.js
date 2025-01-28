import { Cart } from "../models/cart.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

// get all carts
router.get("/", verifyJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    const carts = await Cart.findOne({ userId }).populate(
      "items.productId",
      "-description -images"
    );
    if (!carts)
      return res.status(401).json({ message: "user carts not exits" });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
});

// Add item to cart
router.post("/", verifyJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res
        .status(404)
        .json({ message: "productId is invalid", status: false });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
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
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
});

// Remove item from cart
router.delete("/:id", verifyJWT, async (req, res) => {
  try {
    const productId = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res
        .status(404)
        .json({ message: "productId is invalid", status: false });

    const userId = req?.user?._id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error });
  }
});

// Update item quantity
router.put("/", verifyJWT, async (req, res) => {
  try {
    const userId = req?.user?._id;
    const { quantity, productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res
        .status(404)
        .json({ message: "productId is invalid", status: false });

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating quantity", error });
  }
});

// Remove all items from cart
router.delete("/delete/all", verifyJWT, async (req, res) => {
  try {
    const userId = req?.user?._id;

    const cart = await Cart.findOneAndDelete({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
});

// Move item to wishlist
router.post("/move-wishlist", verifyJWT, async (req, res) => {
  try {
    const userId = req.user?._id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res
        .status(404)
        .json({ message: "productId is invalid", status: false });

    const cart = await Cart.findOne({ userId });

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
router.post("/move-cart", verifyJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res
        .status(404)
        .json({ message: "productId is invalid", status: false });

    const cart = await Cart.findOne({ userId });

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
router.get("/share", verifyJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const shareableLink = `${process.env.ECOMMERCE_REDIRECT_URL}/cart/${cart._id}`;
    res.status(200).json({ message: "Cart shared", link: shareableLink });
  } catch (error) {
    res.status(500).json({ message: "Error sharing cart", error });
  }
});

export default router;
