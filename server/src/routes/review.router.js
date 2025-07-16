import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createReview,
  deleteReview,
  getReviewsByProduct,
  likeReview,
  updateReview,
} from "../controllers/review.controller.js";

const router = Router();

router.route("/").post(verifyJWT(), createReview);
router.route("/:productId").get(getReviewsByProduct);
router
  .route("/:reviewId")
  .patch(verifyJWT(), updateReview)
  .delete(verifyJWT(), deleteReview);

router.post("/:reviewId/like", verifyJWT(), likeReview);

export default router;
