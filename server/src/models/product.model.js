import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
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
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    sub_category: { type: Schema.Types.ObjectId, ref: "SubCategory" },
    super_category: { type: Schema.Types.ObjectId, ref: "SuperCategory" },
    variant: { type: Schema.Types.ObjectId, ref: "Variant" },
    lowest_variants: [{ type: Schema.Types.ObjectId, ref: "Variant" }],
    price: { type: Number, required: true, default: 0 },
    original_price: { type: Number, required: true, default: 0 },
    delivery_amount: { type: Number, required: true, default: 0 },
    specification: { type: String, required: true },
    overview: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    review: { type: Number, required: true, default: 0 },
});

productSchema.plugin(aggregatePaginate);

productSchema.index({ title: "text" });

export const Product = mongoose.model("Product", productSchema);
