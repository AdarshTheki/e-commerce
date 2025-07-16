import { subDays } from "date-fns";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Get dashboard totals
// @route   GET /api/v1/dashboard/totals
// @access  Admin
export const getTotals = asyncHandler(async (req, res) => {
  const date = subDays(new Date(), 30);

  const [totalUsers, lastMonthUser, totalProducts, lastMonthProduct] =
    await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: date } }),
      Product.countDocuments(),
      Product.countDocuments({ createdAt: { $gte: date } }),
    ]);

  const totals = {
    totalUsers,
    lastMonthUser,
    totalProducts,
    lastMonthProduct,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, totals, "Dashboard totals retrieved successfully"));
});