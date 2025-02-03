import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-aggregate-paginate-v2";

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

categorySchema.plugin(paginate);

categorySchema.index({ title: "text" });

export const Category = mongoose.model("Category", categorySchema);
