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

const isBrowser = typeof window !== "undefined";
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

export {
  axios,
  socket,
  socialFormats,
  errorHandler,
  classNames,
  formatChatTime,
};
