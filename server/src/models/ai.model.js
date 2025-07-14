// models/ChatHistory.js
import mongoose from "mongoose";

const aiSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional if you have user authentication
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
    publish: { type: Boolean, default: false },
    model: {
      type: String,
      default: "gpt-4",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export const AI = mongoose.model("Ai", aiSchema);
