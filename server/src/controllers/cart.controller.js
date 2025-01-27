import { Cart } from "../models/cart.model.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

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
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

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
};

// Update item quantity
const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

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
};

// Remove all items from cart
const removeAllCarts = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOneAndDelete({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};

// Move item to wishlist
const moveToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

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
};

// Move item from wishlist to cart
const wishlistToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

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
};

// Get cart details
const getCartDetails = async (req, res) => {
  try {
    const { userId } = req.query;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart details", error });
  }
};

// Get wishlist details
const getWishlistDetails = async (req, res) => {
  try {
    const { userId } = req.query;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Wishlist not found" });
    res.status(200).json(cart.wishlist);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist details", error });
  }
};

// Apply discount code
const applyDiscount = async (req, res) => {
  try {
    const { userId, discountCode } = req.body;
    // Assume validateDiscount is a utility function
    // const discount = validateDiscount(discountCode);
    const discount = discountCode;
    if (!discount)
      return res.status(400).json({ message: "Invalid discount code" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.totalDiscount = discount;
    await cart.save();
    res.status(200).json({ message: "Discount applied", cart });
  } catch (error) {
    res.status(500).json({ message: "Error applying discount", error });
  }
};

// Save cart for later
const saveCartForLater = async (req, res) => {
  try {
    const { userId, cartData } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { savedCart: cartData } },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: "Cart saved", cart });
  } catch (error) {
    res.status(500).json({ message: "Error saving cart", error });
  }
};

// Get cart total
const getCartTotal = async (req, res) => {
  try {
    const { userId } = req.query;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const total = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ message: "Error calculating total", error });
  }
};

// Share cart
const shareCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const shareableLink = `https://ecommerce.app/cart/${cart._id}`;
    res.status(200).json({ message: "Cart shared", link: shareableLink });
  } catch (error) {
    res.status(500).json({ message: "Error sharing cart", error });
  }
};

// Compare wishlist items
const compareWishlistItems = async (req, res) => {
  try {
    const { userId } = req.query;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const comparisons = cart.wishlist.map((wishlistItem) => {
      const cartItem = cart.items.find(
        (item) =>
          item.productId.toString() === wishlistItem.productId.toString()
      );
      return {
        productId: wishlistItem.productId,
        inCart: !!cartItem,
      };
    });

    res.status(200).json(comparisons);
  } catch (error) {
    res.status(500).json({ message: "Error comparing wishlist items", error });
  }
};

// Sync cart across devices
const syncCart = async (req, res) => {
  try {
    const { userId, cartData } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: cartData } },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: "Cart synced", cart });
  } catch (error) {
    res.status(500).json({ message: "Error syncing cart", error });
  }
};

// Check stock availability
const checkStockAvailability = async (req, res) => {
  try {
    const { userId } = req.query;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const stockStatus = cart.items.map((item) => {
      // Assume checkStock is a utility function
      // const inStock = checkStock(item.productId);
      // return { productId: item.productId, inStock };
      return { productId: item.productId };
    });

    res.status(200).json(stockStatus);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking stock availability", error });
  }
};

// Switch active cart
const switchActiveCart = async (req, res) => {
  try {
    const { userId, newCartId } = req.body;
    const cart = await Cart.findById(newCartId);
    if (!cart || cart.userId.toString() !== userId) {
      return res
        .status(404)
        .json({ message: "Cart not found or not accessible" });
    }

    res.status(200).json({ message: "Active cart switched", cart });
  } catch (error) {
    res.status(500).json({ message: "Error switching active cart", error });
  }
};

export {
  addToCart,
  removeFromCart,
  updateQuantity,
  removeAllCarts,
  moveToWishlist,
  wishlistToCart,
  getCartDetails,
  getWishlistDetails,
  applyDiscount,
  saveCartForLater,
  getCartTotal,
  shareCart,
  compareWishlistItems,
  syncCart,
  checkStockAvailability,
  switchActiveCart,
};
