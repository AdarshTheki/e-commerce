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

export const classNames = (...className) => {
  return className.filter(Boolean).join(" ");
};

export const isBrowser = typeof window !== "undefined";

// A class that provides utility functions for working with local storage
export class LocalStorage {
  // Get a value from local storage by key
  static get(key = "") {
    if (!isBrowser) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  // Set a value in local storage by key
  static set(key = "", value = "") {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove a value from local storage by key
  static remove(key = "") {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  static clear() {
    if (!isBrowser) return;
    localStorage.clear();
  }
}

export const getChatObjectMetadata = (
  chat, // The chat item for which metadata is being generated.
  loggedInUser // The currently logged-in user details.
) => {
  // Determine the content of the last message, if any.
  // If the last message contains only attachments, indicate their count.
  const lastMessage = chat?.lastMessage?.content
    ? chat?.lastMessage?.content
    : chat?.lastMessage
      ? `${chat?.lastMessage?.attachments?.length} attachment${
          chat?.lastMessage.attachments.length > 1 ? "s" : ""
        }`
      : "No messages yet"; // Placeholder text if there are no messages.

  if (chat.isGroupChat) {
    // Case: Group chat
    // Return metadata specific to group chats.
    return {
      // Default avatar for group chats.
      avatar: "/placeholder.jpg",
      title: chat.name, // Group name serves as the title.
      description: `${chat.participants.length} members in the chat`, // Description indicates the number of members.
      lastMessage: chat?.lastMessage
        ? chat?.lastMessage?.sender?.username + ": " + lastMessage
        : lastMessage,
    };
  } else {
    // Case: Individual chat
    // Identify the participant other than the logged-in user.
    const participant = chat.participants.find(
      (p) => p._id !== loggedInUser?._id
    );
    // Return metadata specific to individual chats.
    return {
      avatar: participant?.avatar, // Participant's avatar URL.
      title: participant?.fullName, // Participant's username serves as the title.
      description: participant?.email, // Email address of the participant.
      lastMessage,
    };
  }
};

export { axios, socket, errorHandler };
