import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        status: {
            type: String,
            required: true,
            default: "INACTIVE",
            enum: ["ACTIVE", "INACTIVE"],
        },
        title: { type: String, required: true, index: true },
        thumbnail: { type: String, required: true },
        products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    { timestamps: true }
);

categorySchema.index({ title: "text" });

export const Category = mongoose.model("Category", categorySchema);
