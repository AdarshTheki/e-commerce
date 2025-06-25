import { format, isToday, isYesterday, isThisYear, parseISO } from "date-fns";
import errorHandler from "./errorHandler";
import socket from "./socketConfig";
import axios from "./axiosInstance";

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

function formatChatTime(date) {
  // Convert to Date object if it's a string
  const d = typeof date === "string" ? parseISO(date) : date;

  if (isToday(d)) {
    return format(d, "p"); // e.g., 2:45 PM
  } else if (isYesterday(d)) {
    return "Yesterday";
  } else if (isThisYear(d)) {
    return format(d, "dd/MM"); // e.g., 12/06
  } else {
    return format(d, "dd/MM/yyyy"); // e.g., 12/06/2023
  }
}

const classNames = (...className) => {
  return className.filter(Boolean).join(" ");
};

const socketAction = {
  // ? once user is ready to go
  CONNECTED_EVENT: "connected",
  // ? when user gets disconnected
  DISCONNECT_EVENT: "disconnect",
  // ? when user joins a socket room
  JOIN_CHAT_EVENT: "joinChat",
  // ? when participant gets removed from group, chat gets deleted or leaves a group
  LEAVE_CHAT_EVENT: "leaveChat",
  // ? when admin updates a group name
  UPDATE_GROUP_NAME_EVENT: "updateGroupName",
  // ? when new message is received
  MESSAGE_RECEIVED_EVENT: "messageReceived",
  // ? when there is new one on one chat, new group chat or user gets added in the group
  NEW_CHAT_EVENT: "newChat",
  // ? when there is an error in socket
  SOCKET_ERROR_EVENT: "socketError",
  // ? when participant stops typing
  STOP_TYPING_EVENT: "stopTyping",
  // ? when participant starts typing
  TYPING_EVENT: "typing",
  // ? when message is deleted
  MESSAGE_DELETE_EVENT: "messageDeleted",
};

export {
  axios,
  socket,
  socialFormats,
  socketAction,
  errorHandler,
  classNames,
  formatChatTime,
};
