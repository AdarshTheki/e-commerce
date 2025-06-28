import mongoose, { isValidObjectId } from "mongoose";
import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { removeMultiImg, uploadMultiImg } from "../utils/cloudinary.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { emitSocketEvent, ChatEvents } from "../socket/index.js";

const router = Router();

// ----- upload files with messages ----
router.post(
  "/upload",
  upload.array("files", 5),
  asyncHandler(async (req, res) => {
    const files = req?.files;

    if (files && !files?.length > 0)
      throw new ApiError(404, "files not upload to local path");

    const uploadImages = await uploadMultiImg(files);
    if (!uploadImages?.length) throw new ApiError(404, "files upload failed");

    res.status(200).json(uploadImages);
  })
);

// ----🔎 Get messages by chat-----
router.get(
  "/:chatId",
  asyncHandler(async (req, res) => {
    const { chatId } = req.params;

    if (!isValidObjectId(chatId)) throw new ApiError(403, "Invalid Chat ID");

    const messages = await Message.find({
      chat: new mongoose.Types.ObjectId(chatId),
    })
      .populate("sender", "fullName avatar email")
      .sort({ updatedAt: 1 });

    res.status(200).json(messages);
  })
);

// ----create a new message----
router.post(
  "/:chatId",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const { content, attachments } = req.body;
    const { chatId } = req.params;

    if (!isValidObjectId(chatId))
      throw new ApiError(
        403,
        "Invalid Chat ID, And content & attachments are required"
      );

    // create message
    const newMessage = await Message.create({
      chat: new mongoose.Types.ObjectId(chatId),
      sender: req.user._id,
      content: content || "",
      attachments: attachments?.length ? attachments : [],
    });

    // Update lastMessage in chat
    const chat = await Chat.findByIdAndUpdate(chatId, {
      lastMessage: newMessage._id,
    });

    const populatedMessage = await newMessage.populate(
      "sender",
      "fullName avatar email"
    );

    // Emit to room via socket.io
    chat.participants.forEach((userId) => {
      // if (userId.toString() === req.user._id.toString()) return;
      emitSocketEvent(
        req,
        userId.toString(),
        ChatEvents.MESSAGE_RECEIVED_EVENT,
        populatedMessage
      );
    });

    res.status(201).json({
      data: populatedMessage,
      message: "message create successfully with chatId",
    });
  })
);

// ----📝 delete single message text/image-----
router.delete(
  "/messageId",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);

    if (message?.attachments?.length > 0) {
      await removeMultiImg(message.attachments);
    }

    const chat = await Chat.findById(message.chat).populate("lastMessage");

    if (chat) await Message.deleteOne({ _id: messageId });

    chat.participants.forEach((p) => {
      if (p._id.toString() === req.user._id.toString()) return;

      emitSocketEvent(
        req,
        chat._id.toString(),
        ChatEvents.MESSAGE_DELETE_EVENT,
        chat
      );
    });

    res.status(200).json({
      data: message,
      message: "message deleted successfully on messageId",
    });
  })
);

export default router;
