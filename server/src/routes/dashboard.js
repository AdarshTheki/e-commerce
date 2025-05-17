import { Router } from "express";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { subDays } from "date-fns";

const router = Router();

router.get("/totals", async (req, res) => {
  try {
    const date = subDays(new Date(), 30);

    const [totalUsers, lastMonthUser, totalProducts, lastMonthProduct] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ createdAt: { $gte: date } }),
        Product.countDocuments(),
        Product.countDocuments({ createdAt: { $gte: date } }),
      ]);

    res
      .status(200)
      .json({ totalUsers, lastMonthUser, totalProducts, lastMonthProduct });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

export default router;
