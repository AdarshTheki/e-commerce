import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getReviews,
    createReview,
    getReviewsByProduct,
    updateReview,
    deleteReview,
    getReviewById,
} from "../controllers/review.controller.js";

const router = Router();

router.route("/review/:id").get(getReviewById);
router.route("/").get(getReviews);
router.route("/product/:productId").get(getReviewsByProduct);

router.route("/").post(verifyJWT, createReview);
router.route("/:id").put(updateReview);
router.route("/:id").delete(deleteReview);

export default router;
