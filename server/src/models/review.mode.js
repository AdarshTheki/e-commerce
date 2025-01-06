import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
        title: String,
        content: {
            type: String,
            minlength: [10, "Comment must be at least 10 char"],
            maxlength: [500, "Comment must be at least 500 char"],
            trim: true,
            required: true,
        },
        images: [String],
    },
    { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
