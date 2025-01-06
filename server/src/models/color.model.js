import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "INACTIVE",
        },
        color: String,
    },
    { timestamps: true }
);

export const Color = mongoose.model("Color", colorSchema);
