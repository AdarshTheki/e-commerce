import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { isValidObjectId } from "mongoose";
import { removeSingleImg } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const router = Router();

// ----delete chat message----
const deleteChatMessages = async (chatId) => {
  const messages = await Message.find({ chat: chatId });

  if (messages.length) {
    messages.map(async (message) => {
      // remove attachment files
      if (message.attachments?.length) {
        message.attachments.forEach(async (url) => await removeSingleImg(url));
      }
    });

    // delete all the messages
    await Message.deleteMany({ chat: chatId });
  }
};

// -----create or get one one one chat----
router.post(
  "/single/:receiverId",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const { receiverId } = req.params;

    if (!isValidObjectId(receiverId))
      throw new ApiError(403, "Invalid receiver ID");

    // check if receiver is not the user who is requesting a chat
    if (receiverId.toString() === req.user._id.toString()) {
      throw new ApiError(400, "You cannot chat with yourself");
    }

    // Search for an existing one-on-one chat between the two users (order-independent)
    let chat = await Chat.findOne({
      isGroupChat: false,
      participants: { $all: [req.user._id, receiverId], $size: 2 },
    })
      .populate("participants", "fullName avatar email")
      .populate("lastMessage");

    if (chat) {
      return res.status(200).json(chat);
    }

    // If chat doesn't exist, create a new one
    const newChat = await Chat.create({
      isGroupChat: false,
      name: "one on one chat",
      participants: [req.user._id, receiverId],
      admin: req.user._id,
    });

    const populatedChat = await newChat.populate(
      "participants",
      "fullName avatar email"
    );

    populatedChat.participants.forEach((p) => {
      if (p._id.toString() === req.user._id.toString()) return;
      // Send real-time update to the specific user
      req.app.get("io").to(p._id.toString()).emit("newChat", populatedChat);
    });

    res.status(201).json(populatedChat);
  })
);

// ----search available user to chat-----
router.get(
  "/users",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const users = await User.aggregate([
      { $match: { _id: { $ne: req.user._id } } },
      { $project: { avatar: 1, username: 1, fullName: 1, email: 1 } },
    ]);
    res.status(200).json(users);
  })
);

// ----list of all chats-----
router.get(
  "/",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const chats = await Chat.find({ participants: req.user._id })
      .populate("participants", "fullName avatar email")
      .populate("lastMessage");
    res.status(200).json(chats);
  })
);

// ----delete one on one chat and messages----
router.delete(
  "/single/:chatId",
  asyncHandler(async (req, res) => {
    const { chatId } = req.params;

    if (!isValidObjectId(chatId)) throw new ApiError(403, "Invalid chat ID");

    await Chat.findByIdAndDelete(chatId);
    await deleteChatMessages(chatId);

    res.status(200).json({ message: "chat and message deleted succeed" });
  })
);

// ----create a group chat----
router.post(
  "/",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const { isGroupChat, name, participants } = req.body;

    if (!name || !participants?.length > 1)
      throw new ApiError(404, "name and participants filled are required");

    const newChat = await Chat.create({
      admin: req.user._id,
      isGroupChat: !!isGroupChat,
      name,
      participants,
    });

    const populatedChat = await newChat.populate(
      "participants",
      "fullName avatar email"
    );

    res.status(201).json(populatedChat);
  })
);

// ----update chat by (1-1 or group)----
router.patch(
  "/:chatId",
  asyncHandler(async (req, res) => {
    const { name, participants } = req.body;
    const { chatId } = req.params;

    if (!isValidObjectId(chatId)) throw new ApiError(403, "Invalid Chat ID");

    if (!name || !participants?.length > 1)
      throw new ApiError(404, "name and participants filled are required");

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { ...(name && { name }), ...(participants && { participants }) },
      { new: true }
    )
      .populate("participants", "fullName avatar email")
      .populate("lastMessage");

    res.status(200).json(updatedChat);
  })
);

export default router;
