import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import {
  createMessage,
  deleteMessage,
  getMessagesByChat,
} from "./message.controller.js";

const router = Router();

router
  .route("/:chatId")
  .get(getMessagesByChat)
  .post(verifyJWT(), upload.array("attachments", 5), createMessage);

router.route("/:messageId").delete(verifyJWT(), deleteMessage);

export default router;
