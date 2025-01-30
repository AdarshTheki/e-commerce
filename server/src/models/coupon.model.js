import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  couponCode: { type: String, required: true },
  type: { type: String, default: "flat", enum: ["flat", "top offer"] },
  status: { type: String, default: "inactive", enum: ["active", "inactive"] },
  discountValue: { type: Number, default: 50 },
  minCartValue: { type: Number, default: 500 },
  expireDate: { type: Date, default: Date.now },
  startDate: { type: Date, default: Date.now },
});

export const Coupon = mongoose.model("Coupon", couponSchema);
