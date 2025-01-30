import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      index: true,
    },
    email: { type: String, lowercase: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "admin", "user"],
      default: "customer",
    },
    favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    countryCode: String,
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    avatar: String, // cloudinary url
    refreshToken: String,
  },
  { timestamps: true }
);

// Pre-save middleware to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare the provided password with the stored hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate an access token on short time for the user
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

// Method to generate a refresh token on long time for the user
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

userSchema.index({ status: "text" });

export const User = mongoose.model("User", userSchema);
