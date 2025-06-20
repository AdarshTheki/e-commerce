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
  "/chat/:receiverId",
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

// ----search available users-----
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

// ----list of all chats or group-----
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
  "/chat/:chatId",
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
  "/group",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const { name, participants } = req.body;

    if (participants.includes(req.user._id.toString()))
      throw new ApiError(
        400,
        "Participants array should not be contain the group creator"
      );

    let members = [...new Set([...participants, req.user._id.toString()])];

    if (members.length < 3)
      throw new ApiError(400, "you have pass duplicate participants");

    // create a group chat
    const groupChat = await Chat.create({
      name,
      admin: req.user._id,
      isGroupChat: true,
      participants: members,
    });

    const chat = await Chat.findById(groupChat._id)
      .populate("participants", "fullName avatar email")
      .populate("lastMessage");

    if (!chat) throw new ApiError(500, "Internal server error");

    chat.participants.forEach((p) => {
      if (p._id.toString() === req.user._id.toString()) return;

      req.app.get("io").to(p._id.toString()).emit("newChat", chat);
    });

    res.status(201).json({ chat, message: "Group chat created successfully" });
  })
);

// ----get group chat in details----
router.get(
  "/group/:chatId",
  asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const groupChat = await Chat.findById(chatId)
      .populate("participants", "fullName avatar email")
      .populate("lastMessage");

    return res.status(200).json(groupChat);
  })
);

// ----update group chat----
router.patch(
  "/group/:chatId",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const { name, participantId, type } = req.body;
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId);

    if (chat._id.toString() === req.user._id.toString())
      throw new ApiError(404, "You are on a admin this group chat");

    switch (type) {
      case "NAME":
        if (name) chat.name = name;
      case "Add_PARTICIPANT":
        if (!chat.participants.includes(participantId))
          chat.participants.push(participantId);
        break;
      case "REMOVE_PARTICIPANT":
        if (chat.participants.includes(participantId))
          chat.participants.pop(participantId);
        break;
    }

    await chat.save();

    const populatedChat = await Chat.findOne({
      isGroupChat: true,
      _id: chat._id,
    })
      .populate("participants", "fullName avatar email")
      .populate("lastMessage");

    populatedChat.participants.forEach((p) => {
      if (p._id.toString() === req.user._id.toString()) return;

      res.app.get("io").to(p._id.toString()).emit("updateChat", populatedChat);
    });

    res
      .status(200)
      .json({ populatedChat, message: "Group chat updated successfully" });
  })
);

export default router;
