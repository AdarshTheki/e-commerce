import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  timeout: 10000,
  auth: { token: localStorage.getItem('accessToken') },
});

export default socket;
