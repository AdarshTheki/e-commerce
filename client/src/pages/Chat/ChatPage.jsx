import { useState } from "react";
import {
  ArrowLeft,
  ImageUp,
  Plus,
  Search,
  Send,
  Trash2Icon,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";

import ChatItem from "./ChatItem";
import MessageItem from "./MessageItem";
import AddChatModal from "./AddChatModal";
import { Avatar, Input, Loading } from "../../utils";
import { socket, classNames, getChatObjectMetadata } from "../../helper";
import useChat from "../../hooks/useChat";

const JOIN_CHAT_EVENT = "joinChat";
// const CONNECTED_EVENT = "connected";
// const DISCONNECT_EVENT = "disconnect";
// const TYPING_EVENT = "typing";
// const STOP_TYPING_EVENT = "stopTyping";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [updateChat, setUpdateChat] = useState(null);
  const [openAddChat, setOpenAddChat] = useState(false);
  const [searchUserChat, setSearchUserChat] = useState("");
  const [previews, setPreviews] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [mobileChatOpen, setMobileChatOpen] = useState(true);
  const {
    onCreateOrGetChat,
    onFetchMessages,
    onSendMessage,
    setChats,
    setUnReadMessages,
    handleChatDeleted,
    handleMessageDelete,
    unReadMessages,
    sendMessageLoading,
    messagesLoading,
    chatsLoading,
    users,
    chats,
    messages,
    chat,
    setChat,
  } = useChat();
  const { user } = useSelector((state) => state.auth);

  const handlePreviewAttachments = (e) => {
    const files = e.target.files;
    setPreviews(
      Array.from(files)
        .slice(0, 5)
        .map((file) => URL.createObjectURL(file))
    );
    setAttachments(Array.from(files).slice(0, 5));
  };

  const handleRemoveAttachment = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed top-12 w-full sm:bottom-0 bottom-10 pt-4 pb-2 bg-slate-50">
      <div className="flex max-sm:flex-col h-full">
        {/* Chat Left Side */}
        <div
          className={classNames(
            "!sm:max-w-[280px] max-sm:w-full h-full overflow-y-auto",
            mobileChatOpen && chat?._id && "max-sm:hidden"
          )}>
          {/* Create Group Modal */}
          {!!openAddChat && (
            <AddChatModal
              onClose={() => {
                setOpenAddChat(false);
                setUpdateChat(null);
              }}
              chat={updateChat}
            />
          )}

          {/* Search Bar */}
          <div className="relative flex items-center p-2 bg-white">
            <Search className="h-5 w-5 mx-2" />
            <Input
              name="search"
              title="search chat user"
              placeholder="Search..."
              className="border-none !w-full outline-none"
              onChange={(e) => setSearchUserChat(e.target.value)}
              value={searchUserChat}
            />
            {!!searchUserChat && (
              <button className="btn" onClick={() => setSearchUserChat("")}>
                <X size={16} />
              </button>
            )}
            <button
              title="Add new chat"
              className="!py-2.5 text-sm text-nowrap !px-4 flex gap-1 items-center border-none font-medium btn-primary !rounded-2xl"
              onClick={() => setOpenAddChat(true)}>
              <Plus size={16} /> Add Chat
            </button>
          </div>

          {/* Display Search User Listing*/}
          {!!searchUserChat?.length && (
            <div className="flex flex-col absolute z-10 w-[350px] bg-white h-1/2 overflow-y-auto">
              {[...users]
                .filter((i) =>
                  i?.fullName?.toLowerCase().includes(searchUserChat)
                )
                .map((item) => (
                  <button
                    onClick={() => {
                      onCreateOrGetChat(item._id);
                      setSearchUserChat("");
                    }}
                    className="text-left w-full flex gap-2 items-center hover:bg-gray-100 py-1 px-4 rounded-2xl"
                    key={item?._id}>
                    <div className="scale-75">
                      <Avatar name={item?.fullName} avatarUrl={item?.avatar} />
                    </div>
                    <span>{item?.fullName}</span>
                  </button>
                ))}
            </div>
          )}

          {chatsLoading && <Loading />}

          {/* Display Chats */}
          {[...chats].map((item) => (
            <ChatItem
              key={item?._id}
              item={item}
              unreadCount={
                [...unReadMessages].filter((n) => n.chat === item._id).length
              }
              isActive={chat?._id === item?._id}
              onUpdate={() => {
                setUpdateChat(item);
                setOpenAddChat(true);
              }}
              onDelete={() => handleChatDeleted(item._id)}
              onLeave={(chatId) => {
                setChats((prev) => prev.filter((c) => c._id !== chatId));
                if (chat?._id === chatId) {
                  setChat(null);
                }
              }}
              onClick={() => {
                setMobileChatOpen(true);
                socket.emit(JOIN_CHAT_EVENT, item._id);
                setChat({ ...item });
                onFetchMessages(item._id);
                setUnReadMessages((prev) =>
                  prev.filter((n) => n.chat !== item._id)
                );
              }}
            />
          ))}
        </div>

        {!chat?._id && (
          <div className="w-full max-sm:hidden flex items-center justify-center border-l border-slate-200 overflow-y-auto flex-col">
            <p className="flex items-center justify-center">
              Get chat messages
            </p>
          </div>
        )}

        {/* Messages Listing*/}
        {!!chat?._id && (
          <div
            className={classNames(
              "w-full max-sm:hidden border-l border-slate-200 overflow-y-auto flex flex-col",
              mobileChatOpen && "!flex"
            )}>
            <div className="py-2 px-4 flex bg-white items-center gap-3 top-0 sticky z-10">
              <button
                className="svg-btn !p-2"
                onClick={() => setMobileChatOpen(false)}>
                <ArrowLeft />
              </button>
              <Avatar
                name={getChatObjectMetadata(chat, user).title}
                avatarUrl={getChatObjectMetadata(chat, user).avatar}
              />
              <div>
                <p>{getChatObjectMetadata(chat, user).title}</p>
                {chat.isGroupChat && (
                  <p className="text-xs font-light">
                    {chat.participants?.length} members
                  </p>
                )}
              </div>
            </div>

            {messagesLoading && <Loading />}
            <div className="flex-1 p-4">
              <div className="min-h-[60dvh]">
                {[...messages].map((item) => (
                  <MessageItem
                    key={item?._id}
                    item={item}
                    onDelete={() => handleMessageDelete(item?._id)}
                    sender={item?.sender?._id === user?._id}
                  />
                ))}
                {!messages?.length && (
                  <p className="text-center">Message is Empty</p>
                )}
              </div>
            </div>

            {previews?.length > 0 && (
              <div className="w-full flex flex-wrap px-4 gap-2 items-center justify-center sticky bottom-14 bg-transparent">
                {previews.map((preview, i) => (
                  <div key={i} className="relative">
                    <img
                      src={preview}
                      alt="image-preview"
                      className={classNames("w-20 h-20 rounded object-cover")}
                    />
                    <Trash2Icon
                      onClick={() => handleRemoveAttachment(i)}
                      size={16}
                      className="absolute top-1 right-1 !text-red-600 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!message.trim()) return;
                onSendMessage(message, attachments, chat?._id);
                setMessage("");
                setAttachments([]);
                setPreviews([]);
              }}
              className="w-full py-2 px-4 flex gap-2 items-center sticky -bottom-1 bg-white">
              <div className="h-[40px] px-2 rounded-2xl border border-gray-300 w-full flex items-center">
                <Input
                  className="border-none"
                  name="message"
                  placeholder="Enter a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <label
                  title="send files with limit 5"
                  htmlFor="attachments"
                  className="cursor-pointer p-2">
                  <ImageUp className="w-5 h-5" />
                  <input
                    type="file"
                    multiple={true}
                    onChange={handlePreviewAttachments}
                    id="attachments"
                    name="attachments"
                    className="hidden"
                  />
                </label>
              </div>
              <button
                disabled={sendMessageLoading}
                type="submit"
                className="bg-indigo-600 text-white h-[40px] flex gap-2 rounded-2xl px-5 hover:opacity-80 items-center">
                {sendMessageLoading ? (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Send size={16} />
                )}
                <span className="max-sm:hidden">Send</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
