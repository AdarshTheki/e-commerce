import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 },
});

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);
