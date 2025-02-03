import mongoose, { isValidObjectId } from "mongoose";
import { Router } from "express";

import { uploadSingleImg, removeSingleImg } from "../utils/cloudinary.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Brand } from "../models/brand.model.js";

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

    const docs = Brand.aggregate(pipeline);
    const results = await Brand.aggregatePaginate(docs, {
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
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error("brandId is invalid");
    const result = await Brand.findById(id);

    res.status(200).json(result);
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

    const result = await Brand.create({
      title,
      status,
      thumbnail,
      description,
    });
    if (!result) throw Error("brand create failed");

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.patch("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    if (!isValidObjectId(id)) throw Error("invalid brand ID");
    if (!status) throw Error("please enter a status active & inactive");

    const brand = await Brand.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    res.status(203).json({ brand, message: "status updated success" });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.patch("/:id", upload.single("thumbnail"), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error("brandId is invalid");

    const filePath = req?.file?.path;
    const { title, status, description } = req.body;

    const result = await Brand.findById(id);

    let thumbnail;
    if (filePath) {
      await removeSingleImg(result?.thumbnail);
      thumbnail = await uploadSingleImg(filePath);
      if (!thumbnail) throw Error("thumbnail file upload failed");
    }

    result.status = status || result.status;
    result.description = description || result.description;
    result.title = title || result.title;
    result.thumbnail = thumbnail || result.thumbnail;

    await result.save({ validateBeforeSave: false });

    res
      .status(201)
      .json({ result, message: "brand updated success", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) throw Error("brandId is invalid");

    const result = await Brand.findByIdAndDelete(id);

    if (result?.thumbnail) {
      await removeSingleImg(result.thumbnail);
    }

    res.status(202).json({ message: "brand deleted success", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

export default router;
