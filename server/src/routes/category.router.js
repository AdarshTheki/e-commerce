import { isValidObjectId } from "mongoose";
import { Router } from "express";

import { uploadSingleImg, removeSingleImg } from "../utils/cloudinary.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Category } from "../models/category.model.js";
import { pagination } from "../utils/pagination.js";

const router = Router();

// get all filter category
router.get("/", async (req, res) => {
  try {
    const {
      title = "",
      page = 1,
      limit = 10,
      sort = "title",
      order = "asc",
    } = req.query;

    const results = await Category.aggregate(
      pagination(
        { $match: { title: RegExp(title, "i") } },
        parseInt(page),
        parseInt(limit),
        sort,
        order === "asc" ? 1 : -1
      )
    );
    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// get single category
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw Error("categoryId is invalid");
    const category = await Category.findById(id);

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// create category
router.post("/", upload.single("thumbnail"), async (req, res) => {
  try {
    const filePath = req?.file?.path;
    const { title, status, description } = req.body;
    console.log(title, status, description);
    if (!title || !filePath || !status || !description)
      throw Error(
        "please fill the form data are file thumbnail, title & status"
      );

    const thumbnail = await uploadSingleImg(filePath);
    if (!thumbnail) throw Error("thumbnail file upload failed");

    const category = await Category.create({
      title,
      status,
      thumbnail,
      description,
    });
    if (!category) throw Error("category create failed");

    res
      .status(201)
      .json({ category, message: "category created success", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

// update category
router.patch("/:id", upload.single("thumbnail"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw Error("categoryId is invalid");

    const filePath = req?.file?.path;
    const { title, status, description } = req.body;

    const category = await Category.findById(id);

    let thumbnail;
    if (filePath) {
      await removeSingleImg(category?.thumbnail);
      thumbnail = await uploadSingleImg(filePath);
      if (!thumbnail) throw Error("thumbnail file upload failed");
    }

    category.status = status || category.status;
    category.description = description || category.description;
    category.title = title || category.title;
    category.thumbnail = thumbnail || category.thumbnail;

    await category.save();

    res
      .status(202)
      .json({ category, message: "category updated success", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw Error("categoryId is invalid");

    const category = await Category.findByIdAndDelete(id);

    if (category?.thumbnail) {
      await removeSingleImg(category.thumbnail);
    }

    res.status(203).json({ message: "category deleted success", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

export default router;
