import { Router } from "express";
import { isValidObjectId } from "mongoose";
import { Notification } from "../models/notification.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// -----list all notifications----
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  })
);

// -----create notification-----
router.post(
  "/",
  verifyJWT(),
  asyncHandler(async (req, res) => {
    const { message } = req.body;
    const notification = await Notification.create({
      createdBy: req.user._id,
      message,
    });

    res
      .status(201)
      .json({ notification, message: "notification create succeed" });
  })
);

// ----read notification-----
router.get(
  "/:notificationId",
  asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    if (!isValidObjectId(notificationId))
      return res.status(404).json({ message: "invalid notification ID" });

    // update
    await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    res.status(200).json({ message: "notification readd" });
  })
);

export default router;
