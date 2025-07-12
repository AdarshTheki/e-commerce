import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const orderStatus = ["pending", "shipped", "delivered", "cancelled"];

const orderSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: orderStatus,
      default: "pending",
    },
    shipping: {
      addressLine: String,
      postalCode: Number,
      countryCode: String,
      city: String,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
      },
    ],
  },
  { timestamps: true }
);

orderSchema.plugin(mongoosePaginate);

export const Order = mongoose.model("Order", orderSchema);
