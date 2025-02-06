import { User } from "../models/user.model.js";

export const verifyJWT = async (req, _, next) => {
  try {
    const userId = req?.session?.user?._id;

    if (!userId) throw Error("session user Id is not found on middleware");

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) throw Error("Invalid Access Token ! Please Login User");

    req.user = user;
    next();
  } catch (error) {
    res.status(505).json({ message: error.message, status: false });
  }
};
