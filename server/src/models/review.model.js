import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const replySchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const reportSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reason: { type: String, required: true },
  reportedAt: { type: Date, default: Date.now },
});

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  replies: [replySchema],
  reports: [reportSchema],
  createdAt: { type: Date, default: Date.now },
});

reviewSchema.plugin(mongoosePaginate);

export const Review = mongoose.model("Review", reviewSchema);
