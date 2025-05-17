import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema(
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
    thumbnail: String,
    description: { type: String, minlength: 100, maxlength: 1000, trim: true },
  },
  { timestamps: true }
);

brandSchema.index({ title: "text" });

export const Brand = mongoose.model("Brand", brandSchema);
