import { isValidObjectId } from "mongoose";
import { Router } from "express";

import { uploadSingleImg, removeSingleImg } from "../utils/cloudinary.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Brand } from "../models/brand.model.js";
import { pagination } from "../utils/pagination.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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

    const results = await Brand.aggregate(
      pagination(
        [{ $match: { title: RegExp(title, "i") } }],
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

router.get("/list", async (req, res) => {
  try {
    const result = await Brand.find().distinct("title");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw Error("brandId is invalid");
    const result = await Brand.findById(id);
    if (!result) throw Error("brand not found");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

router.post(
  "/",
  upload.single("thumbnail"),
  verifyJWT(["admin", "seller"]),
  async (req, res) => {
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
        createdBy: req.user._id,
      });
      if (!result) throw Error("brand create failed");

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message, status: false });
    }
  }
);

router.patch(
  "/:id",
  verifyJWT(["admin", "seller"]),
  upload.single("thumbnail"),
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) throw Error("brandId is invalid");

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
        .status(202)
        .json({ result, message: "brand updated success", status: true });
    } catch (error) {
      res.status(500).json({ message: error.message, status: false });
    }
  }
);

router.delete("/:id", verifyJWT(["admin", "seller"]), async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) throw Error("brandId is invalid");

    const result = await Brand.findByIdAndDelete(id);

    if (result?.thumbnail) {
      await removeSingleImg(result.thumbnail);
    }

    res.status(203).json({ message: "brand deleted success", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
});

export default router;
