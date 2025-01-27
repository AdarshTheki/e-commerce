import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new Schema({
  title: { type: String, required: true, index: true },
  status: {
    type: String,
    required: true,
    default: "INACTIVE",
    enum: ["ACTIVE", "INACTIVE"],
  },
  trending: {
    type: String,
    required: true,
    default: "NO",
    enum: ["YES", "NO"],
  },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  variant: { type: Schema.Types.ObjectId, ref: "Variant" },
  lowest_variants: [{ type: Schema.Types.ObjectId, ref: "Variant" }],
  discount_price: { type: Number, required: true, default: 0 },
  original_price: { type: Number, required: true, default: 0 },
  delivery_amount: { type: Number, required: true, default: 0 },
  specification: { type: String, required: true },
  overview: { type: String, required: true },
});

productSchema.plugin(aggregatePaginate);

productSchema.index({ title: "text" });

export const Product = mongoose.model("Product", productSchema);
