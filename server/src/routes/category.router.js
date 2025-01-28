import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { Category } from "../models/category.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const results = await Category.find().limit(20);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

export default router;
