import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "INACTIVE",
        },
        size: String,
    },
    { timestamps: true }
);

export const Size = mongoose.model("Size", sizeSchema);
