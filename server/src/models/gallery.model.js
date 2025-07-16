import mongoose, { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const gallerySchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  image_url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

gallerySchema.plugin(mongoosePaginate);

export const Gallery = model("Gallery", gallerySchema);