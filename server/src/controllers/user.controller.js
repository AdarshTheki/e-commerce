import jwt from "jsonwebtoken";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { removeSingleImg, uploadSingleImg } from "../utils/cloudinary.js";

// Generate New Access/Refresh Token
export const createToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    // Generate access and refresh tokens by user method
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return new ApiError(404, "error generated to access token");
  }
};

const signUp = asyncHandler(async (req, res, next) => {
  const { email, password, username, role } = req.body;
  try {
    // Validate that all fields are not empty
    if ([email, password, username].some((field) => field?.trim() === "")) {
      throw new ApiError(401, "user all fields are required");
    }
    // Check if a user with the same username or email already exists
    const exitsUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (exitsUser) {
      throw new ApiError(401, "user Email or Username already exists");
    }
    // Create a new user object and save it to the database
    const user = await User.create({
      email,
      password,
      role,
      username: username?.toLowerCase(),
    });
    const createdUser = await User.findById(user?._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(403, null, "creating new user failed");
    }
    return res
      .status(200)
      .json({ statusCode: 200, message: "user sign-up successfully" });
  } catch (error) {
    next(error);
  }
});

const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const tempUser = await User.findOne({ email });
    if (!tempUser) {
      throw new ApiError(404, "user does not exist on database");
    }

    const isPasswordValid = await tempUser.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, null, "user invalid credentials check password");
    }

    const { accessToken, refreshToken } = await createToken(tempUser._id);

    const user = await User.findById(tempUser._id).select(
      "-password -refreshToken"
    );

    const payload = {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, payload)
      .cookie("accessToken", accessToken, payload)
      .json(
        new ApiResponse(
          200,
          { user, accessToken, refreshToken },
          "sign-in success with cookies are refreshToken and accessToken"
        )
      );
  } catch (error) {
    next(error);
  }
});

const logout = asyncHandler(async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(
      req?.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    return res
      .status(200)
      .clearCookie("refreshToken", { httpOnly: true })
      .clearCookie("accessToken", { httpOnly: true })
      .json(new ApiResponse(200, {}, "user logged out successfully"));
  } catch (error) {
    next(error);
  }
});

const getRefreshToken = asyncHandler(async (req, res, next) => {
  try {
    const incomingRefreshToken =
      req?.cookies?.refreshToken || req?.body?.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "un-authorize access token request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "user invalid refresh token");
    }

    // if (incomingRefreshToken !== user?.refreshToken) {
    //     throw new ApiError(401, "User :: Token is Expired");
    // }

    const { accessToken, refreshToken } = await createToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .json(
        new ApiResponse(
          200,
          { user, accessToken, refreshToken },
          "get new refresh token"
        )
      );
  } catch (error) {
    next(error);
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  const { password, email, role, username } = req.body;
  try {
    const user = await User.findById(req?.user._id);
    if (!user) {
      throw new ApiError(401, "user does not exists on database");
    }
    if (!!password) {
      user.password = password;
    }
    if (!!email) {
      user.email = email;
    }
    if (!!role) {
      user.role = role;
    }
    if (!!username) {
      user.username = username;
    }

    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "update user successfully"));
  } catch (error) {
    next(error);
  }
});

const updateUserAvatar = asyncHandler(async (req, res, next) => {
  try {
    const avatarLocalPath = req.file.path;

    if (!avatarLocalPath) {
      throw new ApiError(404, "local file path avatar image not found");
    }
    const avatar = await uploadSingleImg(avatarLocalPath);
    if (!avatar) {
      throw new ApiError(400, "database not uploading on avatar");
    }
    await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          avatar: avatar,
        },
      },
      { new: true }
    );

    const url = req?.user?.avatar;
    if (url) {
      const path = url.split("/");
      const publicId = path[7].split(".")[0];
      await removeSingleImg(publicId);
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "update user avatar successfully"));
  } catch (error) {
    next(error);
  }
});

const removeUserAvatar = asyncHandler(async (req, res, next) => {
  try {
    const url = req?.user?.avatar;
    if (!url) {
      throw new ApiError(404, "User avatar url not founded");
    }
    const path = url.split("/");
    const publicId = path[7].split(".")[0];
    const remove = removeSingleImg(publicId);
    if (remove) {
      await User.findByIdAndUpdate(
        req.user?._id,
        {
          $unset: {
            avatar: 1,
          },
        },
        { new: true }
      );
      return res
        .status(200)
        .json(ApiResponse(201, {}, "remove user avatar success"));
    }
    return res
      .status(401)
      .json(new ApiResponse(301, {}, "avatar not remove properly"));
  } catch (error) {
    next(error);
  }
});

const getMe = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req?.user._id);
    if (!user) {
      throw new ApiError(500, "getMe user not found");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, user, "get me user successfully"));
  } catch (error) {
    next(error);
  }
});

const updateWishlist = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { wishlist: productId },
        $addToSet: { wishlist: productId },
      },
      { new: true }
    );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { wishlist: updatedUser.wishlist },
          "get wishlist updated"
        )
      );
  } catch (error) {
    next(error);
  }
});

export {
  getMe,
  signUp,
  signIn,
  logout,
  updateUser,
  updateWishlist,
  updateUserAvatar,
  removeUserAvatar,
  getRefreshToken,
};
