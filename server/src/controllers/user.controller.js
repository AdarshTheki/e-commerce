import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { removeSingleImg, uploadSingleImg } from "../utils/cloudinary.js";

// @desc    Get all users (admin only)
// @route   GET /api/v1/users
// @access  Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = +req.query?.page || 1;
  const limit = +req.query?.limit || 10;
  const q = req.query?.query || "";
  const status = req.query?.status || "";
  const sort = req.query?.sort || "fullName";
  const order = req.query?.order || "asc";

  const query = {
    $and: [
      { role: { $ne: "admin" } },
      ...(q ? [{ fullName: { $regex: q, $options: "i" } }] : []),
      ...(status
        ? [
            {
              status: {
                $regex: status === "active" ? "active" : "inactive",
                $options: "i",
              },
            },
          ]
        : []),
    ],
  };

  const users = await User.paginate(query, {
    page,
    limit,
    sort: { [sort]: order === "asc" ? 1 : -1 },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users retrieved successfully"));
});

// @desc    Get single user by ID (admin only)
// @route   GET /api/v1/users/:id
// @access  Admin
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findById(id).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User retrieved successfully"));
});

// @desc    Create a new user (admin only)
// @route   POST /api/v1/users
// @access  Admin
export const createUser = asyncHandler(async (req, res) => {
  const { phoneNumber, email, status, role, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    throw new ApiError(400, "Email, password, and full name are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await User.create({
    phoneNumber,
    email,
    status,
    role,
    password,
    fullName,
  });

  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken -__v"
  );

  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

// @desc    Update user details (admin only)
// @route   PUT /api/v1/users/:id
// @access  Admin
export const updateUser = asyncHandler(async (req, res) => {
  const { phoneNumber, email, status, role, fullName } = req.body;
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.phoneNumber = phoneNumber || user.phoneNumber;
  user.email = email || user.email;
  user.status = status || user.status;
  user.role = role || user.role;
  user.fullName = fullName || user.fullName;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User updated successfully"));
});

// @desc    Delete a user (admin only)
// @route   DELETE /api/v1/users/:id
// @access  Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User deleted successfully"));
});

// @desc    Get current logged-in user
// @route   GET /api/v1/users/current
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-refreshToken -password -__v"
  );
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user retrieved successfully"));
});

// @desc    Register a new user
// @route   POST /api/v1/users/register
// @access  Public
export const signUp = asyncHandler(async (req, res) => {
  const { status, role, email, password, fullName } = req.body;

  if (
    [email, password, fullName].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All required fields are missing");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await User.create({
    email,
    password,
    role: role || "customer",
    fullName,
    status: status || "active",
  });

  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken -__v"
  );

  if (!createdUser) {
    throw new ApiError(500, "User registration failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

// @desc    Authenticate user and get token
// @route   POST /api/v1/users/login
// @access  Public
export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -__v"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: 1000 * 60 * 60 * 24,
    }) // 1 day
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    }) // 7 days
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

// @desc    Log out current user
// @route   POST /api/v1/users/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// @desc    Change current user's password
// @route   PUT /api/v1/users/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old password and new password are required");
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (["guest-user@gmail.com", "useradmin@gmail.com"].includes(user.email)) {
    throw new ApiError(403, "Access denied for this user");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

// @desc    Update current user's profile
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { phoneNumber, email, status, role, fullName } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.phoneNumber = phoneNumber || user.phoneNumber;
  user.email = email || user.email;
  user.status = status || user.status;
  user.role = role || user.role;
  user.fullName = fullName || user.fullName;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile updated successfully"));
});

// @desc    Refresh access token
// @route   POST /api/v1/users/refresh-token
// @access  Public
export const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized: Missing refresh token");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.SECRET_TOKEN
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Unauthorized: Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Unauthorized: Refresh token is revoked");
    }

    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    const refreshedUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...options,
        maxAge: 1000 * 60 * 60 * 24,
      }) // 1 day
      .cookie("refreshToken", newRefreshToken, {
        ...options,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      }) // 7 days
      .json(
        new ApiResponse(
          200,
          { user: refreshedUser, accessToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

// @desc    Google OAuth callback
// @route   GET /api/v1/users/auth/google
// @access  Public
export const googleAuth = asyncHandler(async (req, res) => {
  const scope = ["profile", "email"];

  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scope.join(" "))}`;

  res.redirect(authUrl);
});

// @desc    Update user avatar
// @route   PUT /api/v1/users/avatar
// @access  Private
export const updateAvatar = asyncHandler(async (req, res) => {
  const filePath = req?.file?.path;
  if (!filePath) {
    throw new ApiError(400, "No avatar file provided");
  }

  const avatar = await uploadSingleImg(filePath);
  if (!avatar) {
    throw new ApiError(500, "Avatar upload failed");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar } },
    { new: true }
  ).select("-password -refreshToken");

  if (req?.user?.avatar) {
    const publicId = req?.user?.avatar?.split("/")[7]?.split(".")[0];
    await removeSingleImg(publicId);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

// @desc    Remove user avatar
// @route   DELETE /api/v1/users/avatar
// @access  Private
export const removeAvatar = asyncHandler(async (req, res) => {
  const publicId = req?.user?.avatar?.split("/")[7]?.split(".")[0];
  if (!publicId) {
    throw new ApiError(404, "Avatar not found");
  }

  const removeResult = await removeSingleImg(publicId);
  if (!removeResult) {
    throw new ApiError(500, "Failed to remove avatar from cloudinary");
  }

  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { avatar: 1 } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Avatar removed successfully"));
});

// @desc    Toggle product in user's favorites
// @route   POST /api/v1/users/favorites/:id
// @access  Private
export const toggleFavorite = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isFavorite = user.favorite.includes(id);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      [isFavorite ? "$pull" : "$addToSet"]: { favorite: id },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { favorites: updatedUser.favorite },
        isFavorite ? "Removed from favorites" : "Added to favorites"
      )
    );
});

// @desc    Get all favorite products for current user
// @route   GET /api/v1/users/favorites
// @access  Private
export const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("favorite");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.favorite,
        "Favorite products retrieved successfully"
      )
    );
});
