import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isDefault: { type: Boolean, default: false },
  addressLine: { type: String, lowercase: true, required: true },
  city: { type: String, lowercase: true, required: true },
  postalCode: { type: Number, required: true },
  countryCode: { type: String, lowercase: true, required: true },
});

export const Address = mongoose.model("Address", addressSchema);
