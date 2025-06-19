import React, { useState } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { axios, errorHandler, socket } from "../helper";
import { Input } from "../utils";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";

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
    <div className="w-full relative h-fit !min-h-[80vh]">
      {!messages?.length && (
        <p className="min-h-[50vh] flex items-center justify-center">
          No content found
        </p>
      )}
      <div className="flex-col gap-4 flex">
        {messages.map((item) => {
          const sender = item?.sender?.email === user?.email;
          return (
            <div
              key={item?._id}
              className={`flex items-center justify-end ${!sender && "!justify-start"}`}>
              <div
                className={`card w-fit !px-5 ${!sender ? "!bg-indigo-100 !rounded-r-4xl !rounded-b-4xl" : "!rounded-e-4xl !rounded-t-4xl"}`}>
                {item?.content && <p>{item?.content}</p>}
                {/* {item?.attechments} */}
                <small className="text-nowrap">
                  {format(
                    item?.updatedAt
                      ? new Date(
                          new Date(item?.updatedAt).getTime() +
                            3 * 60 * 60 * 1000
                        )
                      : new Date(),
                    "dd MMM, h:mm a"
                  )}
                </small>
              </div>
            </div>
          );
        })}

        <form
          onSubmit={handleSendMessage}
          className="w-full bg-white p-2 flex gap-5 items-center sticky bottom-0">
          <Input
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            Submit Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
