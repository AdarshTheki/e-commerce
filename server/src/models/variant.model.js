import mongoose, { Schema } from "mongoose";

const variantSchema = new Schema(
    {
        images: [String],
        original_price: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        quantity: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

export const Variant = mongoose.model("Variant", variantSchema);
