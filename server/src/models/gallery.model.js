import mongoose, { Schema, model } from "mongoose";

const gallerySchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  image_url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Gallery = model("Gallery", gallerySchema);
