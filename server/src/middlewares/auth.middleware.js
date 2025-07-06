import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = (roles = []) =>
  asyncHandler(async (req, res, next) => {
    const token =
      req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "No token access with cookies & Bearer");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token: User not found");
    }

    if (roles && roles.length && !roles.includes(user.role)) {
      throw new ApiError(403, "Permission not allowed to this Role");
    }

    req.user = user;
    next();
  });

export const verifyRole = (roles = []) =>
  asyncHandler(async (req, res, next) => {
    if (!req?.user._id) {
      throw new ApiError(401, "Unauthorized request");
    }
    if (roles.includes(req.user?.role)) {
      next();
    } else {
      throw new ApiError(403, "You are not allowed to perform this action");
    }
  });
