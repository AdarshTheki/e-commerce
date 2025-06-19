import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Chat from "./Chat";
import Messages from "./Messages";

const ChatPage = () => {
  const { data: chats } = useFetch(`/chats`);
  const [chatId, setChatId] = useState("");

  return (
    <div className="flex gap-5 max-sm:flex-col relative">
      <Chat setChatId={setChatId} chats={chats} />
      <div className="w-full">
        {chatId ? (
          <Messages chatId={chatId} />
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
