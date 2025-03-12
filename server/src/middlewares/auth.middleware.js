import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { error } from "../utils/ApiResponse.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json(error("Unauthorized request: No token provided", 401));
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res
        .status(401)
        .json(error("Invalid Access Token: User not found", 401));
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json(error(err.message, 401));
  }
};
