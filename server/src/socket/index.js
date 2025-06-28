import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const ChatEvents = Object.freeze({
  // ? once user is ready to go
  CONNECTED_EVENT: "connected",
  // ? when user gets disconnected
  DISCONNECT_EVENT: "disconnect",
  // ? when there is new one on one chat, new group chat or user gets added in the group
  NEW_CHAT_EVENT: "newChat",
  // ? when user joins a socket room
  JOIN_CHAT_EVENT: "joinChat",
  // ? when participant gets removed from group, chat gets deleted or leaves a group
  LEAVE_CHAT_EVENT: "leaveChat",
  // ? when admin updates a group name
  UPDATE_GROUP_NAME_EVENT: "updateGroupName",
  // ? when participant stops typing
  STOP_TYPING_EVENT: "stopTyping",
  // ? when participant starts typing
  TYPING_EVENT: "typing",
  // ? when new message is received
  MESSAGE_RECEIVED_EVENT: "messageReceived",
  // ? when message is deleted
  MESSAGE_DELETE_EVENT: "messageDeleted",
  // ? when there is an error in socket
  SOCKET_ERROR_EVENT: "socketError",
});

const mountJoinChatEvent = (socket) => {
  socket.on(ChatEvents.JOIN_CHAT_EVENT, (chatId) => {
    console.log(`User joined the chat 🤝. chatId: `, chatId);
    socket.join(chatId);
  });
};

const mountParticipantTypingEvent = (socket) => {
  socket.on(ChatEvents.TYPING_EVENT, (chatId) => {
    socket.to(chatId).emit(ChatEvents.TYPING_EVENT, chatId);
  });
};

const mountParticipantStoppedTypingEvent = (socket) => {
  socket.on(ChatEvents.STOP_TYPING_EVENT, (chatId) => {
    socket.to(chatId).emit(ChatEvents.STOP_TYPING_EVENT, chatId);
  });
};

export const emitSocketEvent = (req, roomId, event, payload) => {
  req.app.get("io").to(roomId).emit(event, payload);
};

export const initializeSocketIO = (io) => {
  return io.on("connection", async (socket) => {
    try {
      // If there is no access token in cookies. Check inside the handshake auth
      const token = socket.handshake.auth?.token;
      if (!token) {
        // Token is required for the socket to work
        throw new ApiError(401, "Un-authorized handshake. Token is missing");
      }

      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); // decode the token

      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      // retrieve the user
      if (!user) {
        throw new ApiError(401, "Un-authorized handshake. Token is invalid");
      }
      socket.user = user; // mount te user object to the socket

      socket.join(user._id.toString()); // user join yourself room with self notification used
      socket.emit(ChatEvents.CONNECTED_EVENT); // emit the connected event so that client is aware
      console.log("User connected 🗼. userId: ", user._id.toString());

      // Common events that needs to be mounted on the initialization
      mountJoinChatEvent(socket);
      mountParticipantTypingEvent(socket);
      mountParticipantStoppedTypingEvent(socket);

      socket.on(ChatEvents.DISCONNECT_EVENT, () => {
        console.log("user has disconnected 🚫. userId: " + socket.user?._id);
        if (socket.user?._id) {
          socket.leave(socket.user._id);
        }
      });
    } catch (error) {
      console.log(error?.message);
      socket.emit(
        ChatEvents.SOCKET_ERROR_EVENT,
        error?.message || "Something went wrong while connecting to the socket."
      );
    }
  });
};
