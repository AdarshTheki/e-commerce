import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    title: {
      type: String,
      required: true,
      index: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    description: { type: String, minlength: 100, maxlength: 1000, trim: true },
    thumbnail: String,
  },
  { timestamps: true }
);

categorySchema.index({ title: "text" });

export const Category = mongoose.model("Category", categorySchema);
