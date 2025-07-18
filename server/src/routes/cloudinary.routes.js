import { Router } from "express";
import {
  imageEffect,
  removeBackground,
  removeObject,
  getAllImages,
  removeCloudinaryImage,
} from "../controllers/cloudinary.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT());

router.get("/search", getAllImages);
router.post("/delete", removeCloudinaryImage);
router.post("/image-effect", upload.single("image"), imageEffect);
router.post("/remove-background", upload.single("image"), removeBackground);
router.post("/remove-object", upload.single("image"), removeObject);

export default router;
