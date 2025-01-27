import mongoose, { Schema } from "mongoose";

const variantSchema = new Schema(
  {
    images: [String],
    original_price: { type: Number, required: true, default: 0 },
    discount_price: { type: Number, required: true, default: 0 },
    quantity: { type: Number, required: true, default: 0 },
    color: { type: String, required: true },
    size: { type: String, required: true },
    status: { type: String, enum: ["ACTIVE", "INACTIVE"], default: "INACTIVE" },
  },
  { timestamps: true }
);

variantSchema.index({ status: "text" });

export const Variant = mongoose.model("Variant", variantSchema);
