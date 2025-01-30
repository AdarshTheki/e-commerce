import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "cancelled", "delivered"],
      default: "pending",
    },
    address: String,
    paymentId: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
