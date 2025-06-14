import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const router = Router();

const chatCommonAggregation = () => {
  return [
    // lookup for the participants present
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "participants",
        as: "participants",
        pipeline: [
          {
            $project: {
              username: 1,
              fullName: 1,
              email: 1,
            },
          },
        ],
      },
    },
    {
      // lookup for the group chats
      $lookup: {
        from: "chatmessages",
        foreignField: "_id",
        localField: "lastMessage",
        as: "lastMessage",
        pipeline: [
          {
            // get details of the sender
            $lookup: {
              from: "users",
              foreignField: "_id",
              localField: "sender",
              as: "sender",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    fullName: 1,
                    avatar: 1,
                    email: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              sender: { $first: "$sender" },
            },
          },
        ],
      },
    },
    {
      $addFields: {
        lastMessage: { $first: "$lastMessage" },
      },
    },
  ];
};

// ----search available users----
router.get(
  "/user",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: req.user._id }, // avoid login user
        },
      },
      {
        $project: {
          avatar: 1,
          fullName: 1,
          username: 1,
          email: 1,
        },
      },
    ]);

    res.status(200).json(users);
  })
);

// -----create or get a one on one chat------
router.get(
  "/receiver/:receiveId",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const { receiveId } = req.params;

    const receiver = await User.findById(receiveId);
    if (!receiver) throw new ApiError(404, "User does not exits");

    if (req.user._id.toString() === receiver._id.toString())
      throw new ApiError(404, "You cna not chat with yourself");

    const chat = await Chat.aggregate([
      {
        $match: {
          isGroupChat: false,
          $and: [
            {
              participants: {
                $elemMatch: { $eq: new mongoose.Types.ObjectId(req.user._id) },
              },
            },
            {
              participants: {
                $elemMatch: { $eq: new mongoose.Types.ObjectId(receiveId) },
              },
            },
          ],
        },
      },
      ...chatCommonAggregation(),
    ]);

    if (chat?.length) {
      // if we find the chat that means user already has created a chat
      return res.status(200).json(chat[0]);
    }

    // if not we need to create a new one on one chat
    const newChatInstance = await Chat.create({
      name: "one on one chat",
      participants: [req.user._id, receiveId],
      admin: req.user._id,
    });

    const createdChat = await Chat.aggregate([
      { $match: { _id: newChatInstance._id } },
      ...chatCommonAggregation(),
    ]);

    if (!createdChat[0]) throw new ApiError(404, "Internal server error");

    createdChat[0]?.participants?.forEach((participant) => {
      if (participant._id.toString() === req.user._id.toString()) return;

      req.app
        .get("io")
        .to(participant._id.toString())
        .emit("newChat", createdChat[0]);
    });

    res
      .status(200)
      .json({ chat: createdChat[0], message: "Chat retrieved successfully" });
  })
);

export default router;
