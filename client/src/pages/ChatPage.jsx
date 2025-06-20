import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Chat from "./Chat";
import Messages from "./Messages";
import { Loading } from "../utils";

const ChatPage = () => {
  const { data: chats, loading } = useFetch(`/chats`);
  const [chatId, setChatId] = useState("");

  if (loading) return <Loading />;

  return (
    <div className="flex max-sm:flex-col relative min-h-screen">
      <Chat setChatId={setChatId} chats={chats} />
      <div className="w-full border-l border-slate-300 p-4 min-h-[80vh]">
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
