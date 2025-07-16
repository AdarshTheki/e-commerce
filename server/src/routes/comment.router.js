import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createComment,
  deleteComment,
  getCommentsByProduct,
  likeComment,
  replyToComment,
  reportComment,
  updateComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.route("/").post(verifyJWT(), createComment).patch(verifyJWT(), updateComment);
router.route("/:productId").get(getCommentsByProduct);
router.route("/:commentId").delete(verifyJWT(), deleteComment);
router.patch("/:commentId/like", verifyJWT(), likeComment);
router.post("/:commentId/reply", verifyJWT(), replyToComment);
router.post("/:commentId/report", verifyJWT(), reportComment);

export default router;
