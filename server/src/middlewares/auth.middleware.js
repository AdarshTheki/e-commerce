import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { error } from "../utils/ApiResponse.js";

export const verifyJWT = (roles = [], status = []) => {
  return async (req, res, next) => {
    try {
      const token =
        req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json(error("No token provided", 401));
      }

      let decodedToken;
      try {
        decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      } catch (err) {
        return res.status(401).json(error("Invalid or expired token", 401));
      }

      const user = await User.findById(decodedToken._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        return res
          .status(401)
          .json(error("Invalid Access Token: User not found", 401));
      }

      if (roles && roles.length && !roles.includes(user.role)) {
        return res
          .status(403)
          .json(error("Permission not allowed this user", 403));
      }

      if (status && status.length && !status.includes(user.status)) {
        return res.status(403).json(error("Your account is not active", 403));
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(500).json(error(err.message));
    }
  };
};
