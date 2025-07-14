import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  auth: { token: localStorage.getItem("accessToken") },
});

export default socket;
