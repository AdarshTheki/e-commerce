import { Router } from "express";
import { success, error } from "../utils/ApiResponse.js";
import { getImageUrls, uploadMultiImg } from "../utils/cloudinary.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/api/v1", async (req, res) => {
  res.status(200).json(success(null, "API Health Check Successful"));
});

router.post(
  "/api/v1/gallery",
  upload.fields([{ name: "gallery", maxCount: 20 }]),
  async (req, res) => {
    try {
      const { gallery } = req.files;
      if (!gallery?.length)
        return res
          .status(404)
          .json(success(null, "gallery image not found", 404));

      const images = await uploadMultiImg(gallery, "gallery");

      res.status(200).json(images);
    } catch (err) {
      res.status(500).json({ message: err.message, status: false });
    }
  }
);

router.get("/api/v1/gallery", async (req, res) => {
  try {
    const { expression = "folder:gallery", limit = 100 } = req.query;
    const urls = await getImageUrls(expression, limit);
    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ message: err.message, status: false });
  }
});

// router.get("*", (req, res) => {
//   res.status(404).json(error("Endpoint Not Found", 404));
// });

export default router;
