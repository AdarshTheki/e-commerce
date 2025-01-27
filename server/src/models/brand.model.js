import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    sequence: { type: Number, required: true, default: 0 },
    thumbnail: { type: String, required: true },
    top_brand: { type: String, enum: ["NO", "YES"], default: "NO" },
    status: {
      type: String,
      required: true,
      default: "INACTIVE",
      enum: ["ACTIVE", "INACTIVE"],
    },
  },
  { timestamps: true }
);

brandSchema.index({ title: "text" });

export const Brand = mongoose.model("Brand", brandSchema);
