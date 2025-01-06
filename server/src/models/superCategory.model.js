import mongoose, { Schema } from "mongoose";

const superCategorySchema = new Schema(
    {
        title: { type: String, required: true, index: true },
        thumbnail: { type: String, required: true },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "INACTIVE",
        },
    },
    { timestamps: true }
);

superCategorySchema.index({ title: "text" });

export const SuperCategory = mongoose.model(
    "SuperCategory",
    superCategorySchema
);
