import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 5, trim: true },
    role: {
      type: String,
      enum: ["customer", "admin", "seller", "user"],
      default: "customer",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    phoneNumber: {
      type: String,
      trim: true,
    },
    avatar: String, // cloudinary url
    refreshToken: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.plugin(mongoosePaginate);

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
  return jwt.sign({ _id: this._id }, process.env.SECRET_TOKEN, {
    expiresIn: "1d",
  });
};

// Method to generate a refresh token on long time for the user
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_TOKEN, {
    expiresIn: "7d",
  });
};

userSchema.index({ status: "text" });

export const User = mongoose.model("User", userSchema);
