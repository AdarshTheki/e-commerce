import mongoose, { isValidObjectId } from "mongoose";
import { Router } from "express";

import { uploadSingleImg, removeSingleImg } from "../utils/cloudinary.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Category } from "../models/category.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const {
      title = "",
      page = 1,
      limit = 20,
      sortBy = "title",
      order = "asc",
    } = req.query;

    const pipeline = [];

    if (title) {
      pipeline.push({
        $match: {
          title: { $regex: title, $options: "i" },
        },
      });
    }

    pipeline.push({
      $sort: { [sortBy]: order === "asc" ? 1 : -1 },
    });

    pipeline.push({
      $project: {
        products: 0,
        description: 0,
      },
    });

    const docs = Category.aggregate(pipeline);
    const results = await Category.aggregatePaginate(docs, {
      page: Number(page),
      limit: Number(limit),
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw Error("categoryId is invalid");
    const category = await Category.findById(id);

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.post("/", upload.single("thumbnail"), async (req, res) => {
  try {
    const filePath = req?.file?.path;
    const { title, status, description } = req.body;
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

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.patch("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    if (!isValidObjectId(id)) throw Error("invalid category ID");
    if (!status) throw Error("please enter a status active & inactive");

    const category = await Category.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    res.status(203).json({ category, message: "status updated success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.patch("/:id", upload.single("thumbnail"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw Error("categoryId is invalid");

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

    await category.save({ validateBeforeSave: false });

    res
      .status(201)
      .json({ category, message: "category updated success", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw Error("categoryId is invalid");

    const category = await Category.findByIdAndDelete(id);

    if (category?.thumbnail) {
      await removeSingleImg(category.thumbnail);
    }

    res.status(202).json({ message: "category deleted success", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

export default router;
