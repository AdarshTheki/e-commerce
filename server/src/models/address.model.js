import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  addressLine1: { type: String, lowercase: true, required: true },
  addressLine2: { type: String, lowercase: true },
  city: { type: String, lowercase: true, required: true },
  state: { type: String, lowercase: true, required: true },
  pinCode: { type: Number, required: true },
  country: { type: String, lowercase: true, required: true },
});

export const Address = mongoose.model("Address", addressSchema);
