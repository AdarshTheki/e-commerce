import { useState } from "react";
import { useSelector } from "react-redux";
import { Send } from "lucide-react";

import { axios, classNames, errorHandler, formatChatTime } from "../../helper";
import { Input } from "../../utils";

const Messages = ({ messages = [], chatId = "" }) => {
  const [message, setMessage] = useState("");
  const [onDelete, setOnDelete] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (!message.trim()) return;
      const res = await axios.post(`/messages/${chatId}`, { content: message });
      if (res.data) {
        setMessage("");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleDeleteMessage = async () => {
    try {
      console.log(onDelete);
      if (onDelete.length > 0) {
        const res = await axios.delete(`/messages/delete`, {
          messageIds: [...onDelete],
        });
        console.log(res.data);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  // Manage onDelete as an array of ids
  const handleToggleDelete = (id) => {
    setOnDelete((prev) => {
      if (Array.isArray(prev)) {
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      }
    });
  };

  return (
    <div className="w-full relative h-full">
      {/* Delete messages */}
      {onDelete.length > 0 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handleDeleteMessage("item?._id")}
            className="px-3 py-1 rounded-full items-center  bg-red-600 text-white">
            Delete {onDelete.length || null}
          </button>
          <button
            onClick={() => setOnDelete([])}
            className="px-3 py-1 rounded-full items-center ">
            Close
          </button>
        </div>
      )}

      <div className="flex-col gap-2 flex min-h-[90vh] justify-end">
        {messages?.length ? (
          messages.map((item) => {
            const sender = item?.sender?.email === user?.email;
            return (
              <div
                onClick={() => handleToggleDelete(item._id)}
                key={item?._id}
                className={classNames(
                  "flex items-center justify-end",
                  !sender && "!justify-start",
                  onDelete?.includes(item._id) && "!bg-gray-300"
                )}>
                <div
                  className={classNames(
                    "card relative cursor-pointer !shadow-sm w-fit !px-5 !flex gap-2 items-end",
                    sender
                      ? "!bg-indigo-100 !rounded-l-4xl !rounded-t-4xl"
                      : "!rounded-r-4xl !rounded-t-4xl"
                  )}>
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
          })
        ) : (
          <p className="min-h-[50vh] flex items-center justify-center">
            No Chat messages Found!
          </p>
        )}

        {!!chatId && (
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
        )}
      </div>
    </div>
  );
};

export default Messages;
