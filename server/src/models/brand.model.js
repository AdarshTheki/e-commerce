import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    title: {
      type: String,
      required: true,
      index: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
      required: true,
    },
    thumbnail: String,
    description: {
      type: String,
      minlength: 100,
      maxlength: 1000,
      trim: true,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

brandSchema.index({ title: "text" });

export const Brand = mongoose.model("Brand", brandSchema);
