import mongoose from "mongoose";
import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { removeSingleImg, uploadSingleImg } from "../utils/cloudinary.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Chat } from "../models/chat.model.js";
import { ChatMessage } from "../models/message.model.js";

const router = Router();

// ----get all messages by chatId----
router.get(
  "/:chatId",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const { chatId } = req.params;

    const selectChat = await Chat.findById(chatId);

    if (!selectChat)
      return res.status(404).json({ message: "chat does not exits" });

    if (!selectChat.participants.includes(req.user._id)) {
      return res
        .status(404)
        .json({ message: "User is not a part of this chat" });
    }

    const messages = await ChatMessage.aggregate(
      pagination({ $match: { chat: new mongoose.Types.ObjectId(chatId) } })
    );

    res.status(200).json(messages);
  })
);

// ----send messages----
router.post(
  "/:chatId",
  verifyJWT(),
  upload.fields([{ name: "attachments", maxCount: 5 }]),
  asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const { content } = req.body;

    if (!content || !req.files?.attachments?.length)
      return res
        .status(404)
        .json({ message: "message content & attachment is required" });

    const selectedChat = await Chat.findById(chatId);
    if (!selectedChat)
      return res.status(404).json({ message: "chat does not exits" });

    const messageFiles = [];

    if (req?.files && req?.files?.attachments?.length > 0) {
      req?.files?.attachments.map(async (file) => {
        messageFiles.push({
          url: await uploadSingleImg(file.path),
          localPath: file.path,
        });
      });
    }

    const message = await ChatMessage.create({
      sender: new mongoose.Types.ObjectId(req.user._id),
      content: content || "",
      chat: new mongoose.Types.ObjectId(chatId),
      attachments: messageFiles,
    });

    // update the chat's last message which could be utilized to show last message in the list item
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $set: { lastMessage: message._id } },
      { new: true }
    );

    const messages = await ChatMessage.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(message._id) },
      },
    ]);

    const receiveMessages = messages[0];
    if (!receiveMessages)
      return res.status(404).json({ message: "internal server error" });

    chat?.participants?.forEach((participant) => {
      if (participant.toString() === req.user._id.toString()) return;

      req.app
        .get("io")
        .to(participant.toString())
        .emit("messageReceive", receiveMessages);
    });

    res.status(201).json({ message: "message save succeed", receiveMessages });
  })
);

// -----delete chat messages and attachment by chatId in messageId-----
router.delete(
  "/:chatId/:messageId",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const { chatId, messageId } = req.params;

    const chat = await Chat.findOne({
      _id: new mongoose.Types.ObjectId(chatId),
      participants: req.user?._id,
    });
    if (!chat) return res.status(404).json({ message: "Chat does not exits" });

    const message = await ChatMessage.findById(messageId);
    if (!message)
      return res.status(404).json({ message: "Message does not exits" });

    if (message.sender.toString() !== req.user?._id.toString())
      return res
        .status(403)
        .json({ message: "you are not author to this message" });

    if (message.attachments.length > 0) {
      message.attachments.map(async (file) => {
        await removeSingleImg(file);
      });
    }

    await ChatMessage.findByIdAndDelete(messageId);

    if (chat.lastMessage.toString() === message._id.toString()) {
      const lastMessage = await ChatMessage.findOne(
        { chat: chatId },
        {},
        { sort: { createdAt: -1 } }
      );

      await Chat.findByIdAndUpdate(chatId, {
        lastMessage: lastMessage ? lastMessage._id : null,
      });
    }

    // logic to emit socket event about the message deleted  to the other participants
    chat.participants.forEach((participate) => {
      if (participate.toString() === req.user?._id.toString()) return;

      req.app
        .get("io")
        .in(participate.toString())
        .emit("messageDeleted", message);
    });

    res.status(200).json({ message: "message delete succeed" });
  })
);

export default router;
