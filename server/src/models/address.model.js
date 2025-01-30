import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  addressLine1: { type: String, required: true },
  addressLine2: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: Number, required: true },
  country: { type: String, required: true },
});

export const Address = mongoose.model("Address", addressSchema);
