import { Router } from "express";
import {
  getImageUrls,
  removeSingleImg,
  uploadMultiImg,
} from "../utils/cloudinary.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Gallery } from "../models/gallery.model.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { pagination } from "../utils/pagination.js";

const router = Router();

// ----Create(upload) a images on Cloudinary----
router.post(
  "/",
  upload.fields([{ name: "gallery", maxCount: 20 }]),
  verifyJWT(),
  async (req, res) => {
    try {
      const { gallery } = req.files;
      if (!gallery?.length)
        return res.status(404).json({ message: "upload file image not found" });

      const images = await uploadMultiImg(gallery, "gallery");
      if (!images?.length)
        return res
          .status(404)
          .json({ message: "cloudinary upload file failed" });

      const data = images.map((url) => ({
        createdBy: req.user._id,
        image_url: url,
      }));

      const galleries = await Gallery.insertMany(data);

      res.status(200).json({ galleries, message: "image create successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// ----single Image deleted----
router.delete("/single/:imageId", verifyJWT("admin"), async (req, res) => {
  try {
    const { imageId } = req.params;

    const gallery = await Gallery.findByIdAndDelete(imageId);

    await removeSingleImg(gallery.image_url);

    res.status(200).json({ message: "image delete succeed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----Get All Images----
router.get("/all", async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;

    const gallery = await Gallery.aggregate(
      pagination(
        [{ $match: { image_url: { $regex: "", $options: "i" } } }],
        parseInt(page),
        parseInt(limit),
        "createdAt",
        -1
      )
    );

    res.status(200).json(gallery[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ----Get All Images in Cloudinary----
router.get("/cloudinary", async (req, res) => {
  try {
    const { expression = "folder:gallery", limit = 100 } = req.query;
    const urls = await getImageUrls(expression, limit);
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
