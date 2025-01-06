import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    street: String,
    building: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    addressType: {
        type: String,
        enum: ["home", "work", "other"],
        default: "home",
    },
    contact: String,
    isDefault: { type: Boolean, default: false },
});

export const Address = mongoose.model("Address", addressSchema);
