import { Router } from "express";
import { isValidObjectId } from "mongoose";
import { upload } from "../middlewares/multer.middleware.js";
import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
import {
  removeMultiImg,
  removeSingleImg,
  uploadMultiImg,
  uploadSingleImg,
} from "../utils/cloudinary.js";
import { roleVerifyJWT } from "../middlewares/auth.middleware.js";
import { pagination } from "../utils/pagination.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const {
      title,
      minPrice,
      maxPrice,
      minRating,
      maxRating,
      sortBy = "title",
      order = "asc", // default ascending order
      page = 1,
      limit = 10,
    } = req.query;

    const result = await Product.aggregate(
      pagination(
        {
          $match: {
            $or: [
              { title: { $regex: title, $options: "i" } },
              {
                $and: [
                  { price: { $gte: minPrice, $lte: maxPrice } },
                  { rating: { $gte: minRating, $lte: maxRating } },
                ],
              },
            ],
          },
        },
        parseInt(page),
        parseInt(limit),
        sortBy,
        order === "asc" ? 1 : -1
      )
    );

    res.status(200).json(result[0]);
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
  roleVerifyJWT(["admin", "seller"]),
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
router.patch(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  roleVerifyJWT(["admin", "seller"]),
  async (req, res) => {
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
  }
);

// Delete Product
router.delete("/:id", roleVerifyJWT(["admin", "seller"]), async (req, res) => {
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

// get products filter by category or brand with name
router.get("/:query/:name", async (req, res) => {
  try {
    const { name, query } = req.params;
    if (!name || !query) {
      return res
        .status(404)
        .json({ success: false, message: "Please provide name and query" });
    }

    const regex = new RegExp(name, "i");

    let products;
    if (query === "category") {
      products = await Product.find({ category: regex });
    } else {
      products = await Product.find({ brand: regex });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// search products by title, category, brand
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const regex = new RegExp(q, "i");

    const searchResult = await Product.aggregate(
      pagination(
        {
          $match: {
            $or: [{ title: regex }, { category: regex }, { brand: regex }],
          },
        },
        1,
        10
      )
    );

    res.status(200).json(searchResult[0]);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// get single product by productId
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId))
      return res
        .status(404)
        .json({ message: "productId is invalid", status: false });

    const products = await Product.findById(productId);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: false,
    });
  }
});

export default router;
