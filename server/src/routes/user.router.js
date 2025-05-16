import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import { Router } from "express";

import { removeSingleImg, uploadSingleImg } from "../utils/cloudinary.js";
import { adminVerifyJWT, verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { User } from "../models/user.model.js";

const router = Router();

// cookie payload
const cookiePayload = {
  maxAge: 2 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

// generate username
const generateUsername = (username) => {
  const newUsername = username?.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
  return newUsername;
};

// get all user by admin
router.get("/admin", async (req, res) => {
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

// get single user by admin
router.get("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(404).json({ message: "id not define", status: false });

    const user = await User.findById(id).select("-password -refreshToken");

    if (!user)
      return res
        .status(404)
        .json({ message: "user not find on this id", status: false });

    res.status(200).json(user);
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

// create user by admin
router.post("/admin", adminVerifyJWT, async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, status, role, password } =
      req.body;

    const user = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      status,
      role,
      password,
      username: email?.replace("@gmail.com", ""),
    });

    res.status(201).json({
      message: "User created successfully",
      status: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// update user by admin
router.patch("/admin/:id", adminVerifyJWT, async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, status, role } = req.body;
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res
        .status(501)
        .json({ message: "update user id not define", status: false });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.email = email || user.email;
    user.status = status || user.status;
    user.role = role || user.role;

    await user.save();

    res.status(202).json({
      message: "User updated successfully",
      status: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// delete user by admin
router.delete("/admin/:id", adminVerifyJWT, async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res
        .status(404)
        .json({ message: "delete id not define", status: false });

    const user = await User.findByIdAndDelete(id);

    if (!user)
      return res
        .status(404)
        .json({ message: "user not deleted on this username", status: false });

    res.status(203).json({ message: "user deleted succeeded", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// get current user
router.get("/current-user", verifyJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-refreshToken -password"
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not exits on database", status: false });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// sign up create new user
router.post("/sign-up", async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, status, role, email, password } =
      req.body;

    if ([email, password, role].some((field) => field?.trim() === "")) {
      throw new Error("User all fields are required");
    }

    const username = generateUsername(email);

    const exitsUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (exitsUser) {
      throw new Error("user Email or Username already exists");
    }

    const user = await User.create({
      email,
      password,
      role,
      username,
      firstName,
      lastName,
      phoneNumber,
      status,
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

// sign in user
router.post("/sign-in", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const tempUser = await User.findOne({
      $or: [{ email }, { username }],
    });
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

    res.cookie("refreshToken", refreshToken, cookiePayload);
    res.cookie("accessToken", accessToken, cookiePayload);
    return res.status(200).json({
      user: modifyUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

// logout current user
router.post("/logout", verifyJWT, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    if (!user) return new Error("user not logout properly");

    return res
      .status(200)
      .clearCookie("refreshToken")
      .clearCookie("accessToken")
      .json({ message: "user logged out success", status: true });
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

// change password current user
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

router.post("/update", verifyJWT, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      countryCode,
      phoneNumber,
      email,
      status,
      role,
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.countryCode = countryCode || user.countryCode;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.email = email || user.email;
    user.status = status || user.status;
    user.role = role || user.role;

    await user.save();

    res.status(201).json({
      message: "User updated successfully",
      status: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// refresh token when access token expired
router.post("/refresh-token", verifyJWT, async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token)
      return res.status(401).json({
        message: "unauthorized: Missing refresh token",
        status: false,
      });

    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
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

    res
      .status(200)
      .cookie("accessToken", accessToken, cookiePayload)
      .cookie("refreshToken", refreshToken, cookiePayload)
      .json(user, accessToken, refreshToken);
  } catch (error) {
    res.status(501).json({ message: error.message, status: false });
  }
});

// google auth callback route for Google to redirect to after authentication
router.post("/google", async (req, res) => {
  const scope = ["profile", "email"]; // Request user's profile and email information

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?
    client_id=${process.env.GOOGLE_CLIENT_ID}&
    redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}& 
    response_type=code&
    scope=${encodeURIComponent(scope.join(" "))}`;

  res.redirect(authUrl);
});

// add user avatar
router.post(
  "/avatar",
  verifyJWT,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  async (req, res) => {
    try {
      const filePath = req.files["avatar"][0].path;
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

// only remove user avatar
router.delete("/avatar", verifyJWT, async (req, res) => {
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

// add or remove favorite product
router.patch("/favorite/:id", verifyJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (!isValidObjectId(id) || !isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid User ID or Product ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFavorite = user.favorite.includes(id);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        [isFavorite ? "$pull" : "$addToSet"]: { favorite: id },
      },
      { new: true }
    );

    res.status(200).json({
      message: isFavorite ? "Removed from favorites" : "Added to favorites",
      status: true,
      favorites: updatedUser.favorite,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// get all favorite products
router.get("/favorite", verifyJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorite");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.favorite);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

export default router;
