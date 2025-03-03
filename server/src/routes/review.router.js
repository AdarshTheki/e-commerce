import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Review } from "../models/review.model.js";
import { Product } from "../models/product.model.js";
import mongoose from "mongoose";

const router = Router();

// get all reviews by productId
router.get("/:productId", verifyJWT, async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res
        .status(404)
        .json({ message: "productId is invalid", status: false });

    const reviews = await Review.find({ productId })
      .populate("userId", "username")
      .populate("replies.userId", "username")
      .populate("reports.userId", "username");

    if (!reviews)
      return res
        .status(401)
        .json({ status: false, message: "product review not founded!" });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error?.message, status: false });
  }
});

// delete review by reviewId
router.delete("/:reviewId", verifyJWT, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(reviewId))
      return res
        .status(404)
        .json({ message: "reviewId is invalid", status: false });

    const review = await Review.findOneAndDelete({ _id: reviewId, userId });

    if (!review) return res.status(404).json({ message: "Review not found" });

    // Update product's review list and rating
    const product = await Product.findById(review.productId);
    product.reviews = product.reviews.filter(
      (rId) => rId.toString() !== reviewId
    );
    const totalRatings = product.reviews.length;
    if (totalRatings > 0) {
      const avgRating =
        (product.rating * (totalRatings + 1) - review.rating) / totalRatings;
      product.rating = avgRating;
    } else {
      product.rating = 0;
    }

    await product.save();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// create review by productId, comment & rating
router.post("/", verifyJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, comment, rating } = req.body;

    const newReview = await Review.create({
      productId,
      userId,
      comment,
      rating,
    });

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Add the new review to the reviews list
    product.reviews.push(newReview._id);

    // Update average rating
    const totalRatings = product.reviews.length;
    const avgRating =
      (product.rating * (totalRatings - 1) + rating) / totalRatings;
    product.rating = avgRating.toFixed(1); // Optional: Limit to 2 decimals

    // Save the product
    await product.save();

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// update review by reviewId, comment & rating
router.patch("/", async (req, res) => {
  try {
    const { reviewId, comment, rating } = req.body;
    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    // Update review
    const oldRating = review.rating;
    review.comment = comment;
    review.rating = rating;
    await review.save();

    // Update product rating
    const product = await Product.findById(review.productId);
    const totalRatings = product.reviews.length;
    const avgRating =
      (product.rating * totalRatings - oldRating + rating) / totalRatings;
    product.rating = avgRating.toFixed(1);

    await product.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// like a review
router.get("/like/:reviewId", verifyJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    if (!review.likes.includes(userId)) {
      review.likes.push(userId);
    } else {
      review.likes = review.likes.filter((id) => id.toString() !== userId);
    }

    await review.save();
    res
      .status(200)
      .json({ message: "Review liked/unliked", likes: review.likes.length });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// reply the review
router.post("/reply", verifyJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    const { reviewId, comment } = req.body;
    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    review.replies.push({ userId, comment });
    await review.save();

    res
      .status(201)
      .json({ message: "Reply added successfully", replies: review.replies });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// report the review
router.post("/report", verifyJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    const { reviewId, reason } = req.body;
    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    review.reports.push({ userId, reason });
    await review.save();

    res.status(201).json({
      message: "Review reported successfully",
      reports: review.reports,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

export default router;
