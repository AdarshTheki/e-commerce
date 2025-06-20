import { format, isToday, isYesterday, isThisYear, parseISO } from "date-fns";
import errorHandler from "./errorHandler";
import socket from "./socketConfig";
import axios from "./axiosInstance";

export const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
};

export function formatChatTime(date) {
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

export const socketAction = {
  CONNECTED_EVENT: "connected",
  DISCONNECT_EVENT: "disconnect",
  JOIN_ROOM_EVENT: "joinRoom",
  RECEIVE_MESSAGE_EVENT: "receiveMessage",
  DELETE_MESSAGE_EVENT: "deleteMessage",
  SEND_MESSAGE_EVENT: "sendMessage",
  //
  JOIN_CHAT_EVENT: "joinChat",
  NEW_CHAT_EVENT: "newChat",
  TYPING_EVENT: "typing",
  STOP_TYPING_EVENT: "stopTyping",
  MESSAGE_RECEIVED_EVENT: "messageReceived",
  LEAVE_CHAT_EVENT: "leaveChat",
  UPDATE_GROUP_NAME_EVENT: "updateGroupName",
  MESSAGE_DELETE_EVENT: "messageDeleted",
  SOCKET_ERROR_EVENT: "socketError",
  MESSAGE: "message",
};

export { socket, errorHandler, axios };
