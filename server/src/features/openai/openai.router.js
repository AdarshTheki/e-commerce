import express from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import {
  generateText,
  generateTextToImage,
  getUserGenerate,
  toggleLikesCreation,
  resumeReviewer,
  deletedOpenaiById,
} from "./openai.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = express.Router();

router.use(verifyJWT());

router.route("/generate-text").get(getUserGenerate).post(generateText);
router.post("/generate-image", generateTextToImage);
router.post("/resume-reviewer", upload.single("file"), resumeReviewer);
router.post("/like/:slug", toggleLikesCreation);
router.delete("/post/:openaiId", deletedOpenaiById);

export default router;
