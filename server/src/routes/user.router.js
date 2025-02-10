import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Router } from "express";

import { removeSingleImg, uploadSingleImg } from "../utils/cloudinary.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { User } from "../models/user.model.js";

const router = Router();

// get all user
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -refreshToken")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(users);
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const { email, password, username, role } = req.body;

    if ([email, password, username].some((field) => field?.trim() === "")) {
      throw new Error("user all fields are required");
    }

    const newUsername = username?.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();

    const exitsUser = await User.findOne({
      $or: [{ username: newUsername }, { email }],
    });
    if (exitsUser) {
      throw new Error("user Email or Username already exists");
    }

    const user = await User.create({
      email,
      password,
      role,
      username: newUsername,
    });

    const createdUser = await User.findById(user?._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new Error("creating new user failed");
    }

    res.status(200).json(createdUser);
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const tempUser = await User.findOne({ $or: [{ email }, { username }] });
    if (!tempUser) {
      throw new Error("user does not exist on database");
    }

    const isPasswordValid = await tempUser.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new Error("user invalid credentials check password");
    }

    const user = await User.findById(tempUser._id);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const modifyUser = await User.findById(tempUser._id).select(
      "-password -refreshToken"
    );

    const payload = {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res.cookie("refreshToken", refreshToken, payload);
    res.cookie("accessToken", accessToken, payload);
    return res.status(200).json({
      user: modifyUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

router.post("/logout", verifyJWT, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    if (!user) return new Error("user not logout properly");

    return res
      .status(200)
      .clearCookie("refreshToken", { httpOnly: true })
      .clearCookie("accessToken", { httpOnly: true })
      .json({ message: "user logged out success", status: true });
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

router.get("/current-user", verifyJWT, async (req, res) => {
  try {
    const user = await User.findById(req?.user._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new Error("get Me user not found");
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

router.post("/change-password", verifyJWT, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
      throw Error("please fill the old & new password");

    const user = await User.findById(req.user._id);

    if (user.email === "demo_user@gmail.com")
      throw Error("This demo user will not be password change");

    const check = await user.isPasswordCorrect(oldPassword);
    if (!check) throw Error("your old password is wrong");

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    res.status(200).json(user);
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

router.post("/refresh-token", verifyJWT, async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token)
      return res.status(401).json({
        message: "unauthorized: Missing refresh token",
        status: false,
      });

    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new Error("Unauthorized: Invalid refresh token");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const payload = {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, payload)
      .cookie("refreshToken", refreshToken, payload)
      .json(user, accessToken, refreshToken);
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

router.post("/google", async (req, res) => {
  const scope = ["profile", "email"]; // Request user's profile and email information

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?
    client_id=${process.env.GOOGLE_CLIENT_ID}&
    redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}& 
    response_type=code&
    scope=${encodeURIComponent(scope.join(" "))}`;

  res.redirect(authUrl);
});

router.patch("/update", verifyJWT, async (req, res) => {
  try {
    const { countryCode, firstName, lastName, phoneNumber } = req.body;

    const user = await User.findById(req.user._id).select(
      "-refreshToken -password"
    );

    user.countryCode = countryCode || user.countryCode;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "update user success", status: false });
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

router.patch("/role", verifyJWT, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) throw Error("user not founded on db");

    user.role = role;
    await user.save({ validateBeforeSave: false });

    res.status(201).json({ message: "update role success", status: true });
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

router.patch(
  "/update-avatar",
  verifyJWT,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const filePath = req.file?.path;
      if (!filePath) throw Error("invalid file type of avatar");

      const avatar = await uploadSingleImg(filePath);
      if (!avatar) throw Error("Avatar not create on cloudinary");

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { avatar: avatar } },
        { new: true }
      ).select("-password -refreshToken");

      if (req?.user?.avatar) {
        const publicId = req?.user?.avatar?.split("/")[7]?.split(".")[0];
        await removeSingleImg(publicId);
      }

      return res.status(200).json(user);
    } catch (error) {
      res.status(501).json({ message: error.message, status: false });
    }
  }
);

router.delete("/remove-avatar", verifyJWT, async (req, res) => {
  try {
    const publicId = req?.user?.avatar?.split("/")[7]?.split(".")[0];
    if (!publicId) throw Error("avatar publicId is not founded");

    const remove = await removeSingleImg(publicId);
    if (remove) {
      await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { avatar: 1 } },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "avatar image remove success", status: true });
    }
    res.status(400).json({ message: "avatar image not remove", status: false });
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

router.patch("/favorite/:id", verifyJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      throw Error("invalid productId founded");

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favorite: id },
        $addToSet: { favorite: id },
      },
      { new: true }
    );

    if (!user) throw Error("favorite update failed, Please try again.");

    res.status(200).json({ message: "favorite update succeed", status: true });
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

export default router;
