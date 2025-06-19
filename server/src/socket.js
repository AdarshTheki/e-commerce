import { ChatEvents } from "./utils/chatEvents";

const mountJoinChatEvent = (socket) => {
  socket.on(ChatEvents.JOIN_CHAT_EVENT, (chatId) => {
    socket.join(chatId);
  });
};

const mountParticipantTypingEvent = (socket) => {
  socket.on(ChatEvents.TYPING_EVENT, (chatId) => {
    socket.in(chatId).emit(ChatEvents.TYPING_EVENT, chatId);
  });
};

const mountParticipantStoppedTypingEvent = (socket) => {
  socket.on(ChatEvents.STOP_TYPING_EVENT, (chatId) => {
    socket.in(chatId).emit(ChatEvents.STOP_TYPING_EVENT, chatId);
  });
};

const initializeSocketIO = (io) => {
  return io.on("connection", async (socket) => {
    try {
      //
    } catch (error) {
      socket.emit(
        ChatEvents.SOCKET_ERROR_EVENT,
        error?.message || "Something went wrong while connecting to the socket."
      );
    }
  });
};
