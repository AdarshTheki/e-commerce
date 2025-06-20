import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Chat from "./Chat";
import Messages from "./Messages";
import { Loading } from "../utils";
import { useEffect } from "react";
import { socket, socketAction } from "../helper";

const ChatPage = () => {
  const { data: chats, loading: chatsLoading } = useFetch(`/chats`);
  const [chatId, setChatId] = useState("");
  const { data, loading } = useFetch(`/messages/${chatId}`);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
      setMessages(loading ? [] : data);
    }
  }, [chatId, data, loading]);

  useEffect(() => {
    // Join the room when chatId changes
    if (!socket || !chatId) return;
    socket.emit(socketAction.JOIN_ROOM_EVENT, chatId);

    // Listen for incoming messages
    const handleReceiveMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    // Listen for deleted messages
    const handleDeleteMessageSocket = (deletedMessageId) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== deletedMessageId));
    };

    socket.on(socketAction.RECEIVE_MESSAGE_EVENT, handleReceiveMessage);
    socket.on(socketAction.DELETE_MESSAGE_EVENT, handleDeleteMessageSocket);

    return () => {
      socket.off(socketAction.RECEIVE_MESSAGE_EVENT, handleReceiveMessage);
      socket.off(socketAction.DELETE_MESSAGE_EVENT, handleDeleteMessageSocket);
    };
  }, [chatId]);

  if (chatsLoading) return <Loading />;

  return (
    <div className="flex max-sm:flex-col relative min-h-screen">
      <Chat setChatId={setChatId} chats={chats} />
      <div className="w-full border-l border-slate-300 p-4 min-h-[80vh]">
        {chatId ? (
          messages?.length > 0 ? (
            <Messages chatId={chatId} messages={messages} />
          ) : (
            <p className="min-h-[50vh] flex items-center justify-center">
              No Chat messages Found!
            </p>
          )
        ) : (
          <p className="min-h-[50vh] flex items-center justify-center">
            No content found
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
