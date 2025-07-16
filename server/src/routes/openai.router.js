import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  cloudinaryImageEffect,
  generateText,
  generateTextToImage,
  getUserGenerate,
  toggleLikesCreation,
} from "../controllers/openai.controller.js";

const router = express.Router();

router.use(verifyJWT());

router.route("/generate-text").get(getUserGenerate).post(generateText);
router.post("/generate-image", generateTextToImage);
router.post("/image-effect", upload.single("image"), cloudinaryImageEffect);
router.post("/like/:slug", toggleLikesCreation);

export default router;
