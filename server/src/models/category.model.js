import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  status: {
    type: String,
    required: true,
    default: "inactive",
    enum: ["active", "inactive"],
  },
  title: { type: String, required: true, index: true },
  thumbnail: { type: String, required: true },
  description: { type: String, minlength: 100, maxlength: 1000, trim: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, default: Date.now },
});

categorySchema.index({ title: "text" });

export const Category = mongoose.model("Category", categorySchema);
