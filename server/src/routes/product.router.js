import { Router } from "express";
import mongoose from "mongoose";
import { upload } from "../middlewares/multer.middleware.js";
import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
import {
  removeMultiImg,
  removeSingleImg,
  uploadMultiImg,
  uploadSingleImg,
} from "../utils/cloudinary.js";

const router = Router();

// GET /products?title=laptop&category=Electronics&minPrice=1000&sortBy=rating&order=desc&page=1&limit=5
// get all product query
router.get("/", async (req, res) => {
  try {
    const {
      title,
      brand,
      category,
      minPrice,
      maxPrice,
      minRating,
      maxRating,
      sortBy,
      order = "asc", // default ascending order
      page = 1,
      limit = 10,
    } = req.query;

    // Build query object
    const query = {};

    // Search by title (case-insensitive partial match)
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    // Filter by brand (case-insensitive match)
    if (brand) {
      query.brand = { $regex: brand, $options: "i" };
    }

    // Filter by category (exact match)
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Filter by rating range
    if (minRating || maxRating) {
      query.rating = {};
      if (minRating) query.rating.$gte = Number(minRating);
      if (maxRating) query.rating.$lte = Number(maxRating);
    }

    // Pagination options
    const skip = (Number(page) - 1) * Number(limit);
    const perPage = Number(limit);

    // Sorting options
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === "desc" ? -1 : 1; // -1 for descending, 1 for ascending
    }

    // Execute query
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(perPage);

    // Count total products matching the query
    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      docs: products,
      totalDocs: totalProducts,
      totalPages: Math.ceil(totalProducts / perPage),
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message, status: false });
  }
});

// create product with multer used
router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const {
        title,
        category,
        brand,
        description,
        price,
        rating,
        stock,
        discount,
      } = req.body;

      if (
        !title ||
        !category ||
        !brand ||
        !description ||
        !price ||
        !rating ||
        !stock ||
        !discount
      ) {
        return res
          .status(401)
          .json({ message: "please fill the all the inputs", status: false });
      }

      // Handle image uploads
      const thumbnail = req.files?.thumbnail
        ? await uploadSingleImg(req.files.thumbnail[0].path)
        : "";
      const images = req.files?.images
        ? await uploadMultiImg(req.files.images)
        : [];

      const product = new Product({
        title,
        category,
        brand,
        thumbnail,
        images,
        description,
        price,
        rating,
        stock,
        discount,
      });

      await product.save();

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// Update Product by productId params
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      category,
      brand,
      description,
      price,
      rating,
      stock,
      discount,
    } = req.body;

    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // Update thumbnail if provided
    if (req.files?.thumbnail) {
      if (product.thumbnail) {
        await removeSingleImg(product.thumbnail); // Remove old thumbnail
      }
      product.thumbnail = await uploadSingleImg(req.files.thumbnail[0].path);
    }

    // Update images if provided
    if (req.files?.images) {
      if (product.images.length > 0) {
        await removeMultiImg(product.images); // Remove old images
      }
      product.images = await uploadMultiImg(req.files.images);
    }

    // Update other product details
    product.title = title || product.title;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.description = description || product.description;
    product.price = price || product.price;
    product.rating = rating || product.rating;
    product.stock = stock || product.stock;
    product.discount = discount || product.discount;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // Remove thumbnail and images from Cloudinary
    if (product.thumbnail) {
      await removeSingleImg(product.thumbnail);
    }
    if (product.images.length > 0) {
      await removeMultiImg(product.images);
    }

    await product.remove();
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// toggle update Status
router.post("/status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    product.status = status;

    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Product status updated success" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/reviews/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId })
      .populate("userId", "username")
      .populate("replies.userId", "username")
      .populate("reports.userId", "username");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/category/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const products = await Product.find({
      category: { $regex: name, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/brand/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const products = await Product.find({
      brand: { $regex: name, $options: "i" },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const regex = new RegExp(q, "i");

    const searchResult = await Product.aggregate([
      {
        $match: {
          $or: [{ title: regex }, { category: regex }, { brand: regex }],
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          category: 1,
          brand: 1,
          price: 1,
          thumbnail: 1,
        },
      },
      { $limit: 10 },
    ]);

    res.status(200).json(searchResult);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// get single product by productId
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res
        .status(404)
        .json({ message: "productId is invalid", status: false });

    const products = await Product.findById(productId).select("-reviews");

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
});

export default router;
