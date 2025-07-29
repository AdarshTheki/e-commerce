import { subDays } from "date-fns";
import { Product } from "../product/product.model.js";
import { Order } from "../order/order.model.js";
import { User } from "../user/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// @desc    Get dashboard totals
// @route   GET /api/v1/dashboard/totals
// @access  Admin
const getTotals = asyncHandler(async (req, res) => {
  const date = subDays(new Date(), 30);

  const [
    totalUsers,
    lastMonthUser,
    totalProducts,
    lastMonthProduct,
    totalOrders,
    lastMonthOrder,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ createdAt: { $gte: date } }),
    Product.countDocuments(),
    Product.countDocuments({ createdAt: { $gte: date } }),
    Order.countDocuments(),
    Order.countDocuments({ createdAt: { $gte: date } }),
  ]);

  // Get total or last month revenue
  const calculateRevenue = async (lastMonthOnly = false) => {
    const matchStage = lastMonthOnly
      ? {
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          },
        }
      : {};

    const revenuePipeline = [
      { $match: matchStage },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products", // collection name in MongoDB
          localField: "items.productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $project: {
          _id: 0,
          amount: {
            $multiply: ["$items.quantity", "$productInfo.price"],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ];

    const result = await Order.aggregate(revenuePipeline);

    return result[0]?.totalRevenue || 0;
  };

  const totals = {
    totalUsers,
    lastMonthUser,
    totalProducts,
    lastMonthProduct,
    totalOrders,
    lastMonthOrder,
    totalRevenues: await calculateRevenue(false),
    lastMonthRevenue: await calculateRevenue(true),
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, totals, "Dashboard totals retrieved successfully")
    );
});

const getTopProducts = asyncHandler(async (req, res) => {
  const orders = await Order.aggregate([
    {
      $match: {
        // status: "delivered",
        "payment.status": "paid",
      },
    },
    {
      $unwind: "$items",
    },
    {
      $lookup: {
        from: "products",
        localField: "items.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $group: {
        _id: "$items.productId",
        title: { $first: "$productDetails.title" },
        thumbnail: { $first: "$productDetails.thumbnail" },
        unitPrice: { $first: "$productDetails.price" },
        totalQuantity: { $sum: "$items.quantity" },
        totalRevenue: {
          $sum: {
            $multiply: ["$items.quantity", "$productDetails.price"],
          },
        },
      },
    },
    {
      $sort: {
        totalQuantity: -1, // or use totalRevenue: -1
      },
    },
    {
      $limit: 10,
    },
  ]);

  res
    .status(200)
    .json(
      new ApiResponse(200, orders, "get top products retrieve successfully")
    );
});

export { getTopProducts, getTotals };
