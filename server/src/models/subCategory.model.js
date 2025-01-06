import mongoose, { Schema } from "mongoose";

const subCategorySchema = new Schema(
    {
        title: { type: String, required: true, index: true },
        products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "INACTIVE",
        },
    },
    { timestamps: true }
);

subCategorySchema.index({ title: "text" });

export const SubCategory = mongoose.model("SubCategory", subCategorySchema);
