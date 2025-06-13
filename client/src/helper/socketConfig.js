import { io } from "socket.io-client";

const url = import.meta.env.VITE_API_BASE_URL.replace("/api/v1", "") || "";

const socket = io(url);

export default socket;
