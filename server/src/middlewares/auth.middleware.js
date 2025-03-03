import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Unauthorized request: No token provided");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new Error("Invalid Access Token: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      status: false,
    });
  }
};
