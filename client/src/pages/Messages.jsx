import React, { useState } from "react";
import { useSelector } from "react-redux";
import { axios, errorHandler, formatChatTime, socket } from "../helper";
import { Input } from "../utils";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Send } from "lucide-react";

const Messages = ({ chatId = "" }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { data, loading } = useFetch(`/messages/${chatId}`);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (chatId) {
      setMessages(loading ? [] : data);
    }
  }, [chatId, data, loading]);

  useEffect(() => {
    // Join the room when chatId changes
    if (!socket || !chatId) return;
    socket.emit("joinRoom", chatId);

    // Listen for incoming messages
    const handleReceiveMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };
    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (!message.trim()) return;
      const res = await axios.post(`/messages/${chatId}`, { content: message });
      if (res.data) {
        setMessage("");
        // Optionally, you can emit here if you want instant feedback
        // socket.emit("sendMessage", { roomId: chatId, message: res.data });
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="w-full relative h-full">
      {!messages?.length && (
        <p className="min-h-[50vh] flex items-center justify-center">
          No content found
        </p>
      )}
      <div className="flex-col gap-2 flex">
        {messages.map((item) => {
          const sender = item?.sender?.email === user?.email;
          return (
            <div
              key={item?._id}
              className={`flex items-center justify-end ${!sender && "!justify-start"}`}>
              <div
                className={`card !shadow-sm w-fit !px-5 !flex gap-2 items-end ${!sender ? "!bg-gray-100 !rounded-r-4xl !rounded-t-4xl" : "!rounded-l-4xl !rounded-b-4xl"}`}>
                {item?.content && <p>{item?.content}</p>}
                {/* {item?.attechments} */}
                <small className="text-nowrap text-slate-400">
                  {formatChatTime(
                    item?.updatedAt ? item?.updatedAt : new Date()
                  )}
                </small>
              </div>
            </div>
          );
        })}

        <form
          onSubmit={handleSendMessage}
          className="w-full p-2 flex gap-2 items-center sticky bottom-0 bg-slate-50">
          <Input
            required={false}
            className="rounded-full !p-2 !px-5"
            name="message"
            placeholder="Enter a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="btn-primary flex gap-2 !rounded-full !px-5 items-center">
            Send <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
