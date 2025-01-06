import { Review } from "../models/review.mode.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createReview = asyncHandler(async (req, res, next) => {
    try {
        const { productId, rating, comment } = req.body;
        if (!productId || !rating || !comment)
            throw new ApiError(401, "invalid review data");
        const userId = req.user._id;

        const review = new Review({ productId, userId, rating, comment });
        await review.save();

        if (!review) throw new ApiError(401, "review not save on database");
        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
});

const getReviewsByProduct = asyncHandler(async (req, res, next) => {
    try {
        const reviews = await Review.find({
            productId: req.params.productId,
        }).populate({ path: "userId", select: "username _id" });
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});

const updateReview = asyncHandler(async (req, res, next) => {
    try {
        const { rating, comment } = req.body;

        if (!rating || !comment || !req?.params.id)
            throw new ApiError(401, "invalid data please check");

        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { rating, comment },
            { new: true }
        );

        if (!review) throw new ApiError(401, "review not updated on database");

        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

const deleteReview = asyncHandler(async (req, res, next) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Review deleted" });
    } catch (error) {
        next(error);
    }
});

const getReviews = asyncHandler(async (req, res, next) => {
    try {
        const reviews = await Review.find({})
            .sort({ createdAt: -1 })
            .limit(20)
            .populate("userId");
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});

const getReviewById = asyncHandler(async (req, res, next) => {
    try {
        const review = await Review.findById(req?.params?.id).populate();
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
});

export {
    createReview,
    getReviewsByProduct,
    updateReview,
    deleteReview,
    getReviews,
    getReviewById,
};
