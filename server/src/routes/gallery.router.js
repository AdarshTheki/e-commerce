import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  deleteImage,
  getAllImages,
  getCloudinaryImages,
  uploadImages,
} from "../controllers/gallery.controller.js";

const router = Router();

router.route("/").get(getAllImages);
router
  .route("/")
  .post(
    upload.fields([{ name: "gallery", maxCount: 20 }]),
    verifyJWT(),
    uploadImages
  );

router.route("/:imageId").delete(verifyJWT("admin"), deleteImage);

router.route("/cloudinary").get(getCloudinaryImages);

export default router;
