import { useRef, useState } from "react";
import { ImageUp, Plus, Search, Send, Trash2Icon, X } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import ChatItem from "./ChatItem";
import MessageItem from "./MessageItem";
import AddChatModal from "./AddChatModal";
import useFetch from "../../hooks/useFetch";
import { Avatar, Input, Loading } from "../../utils";
import {
  axios,
  socket,
  LocalStorage,
  errorHandler,
  classNames,
  getChatObjectMetadata,
} from "../../helper";

const JOIN_CHAT_EVENT = "joinChat";
const NEW_CHAT_EVENT = "newChat";
const LEAVE_CHAT_EVENT = "leaveChat";
const UPDATE_GROUP_NAME_EVENT = "updateGroupName";
const MESSAGE_RECEIVED_EVENT = "messageReceived";
const MESSAGE_DELETE_EVENT = "messageDeleted";
const SOCKET_ERROR_EVENT = "socketError";
// const CONNECTED_EVENT = "connected";
// const DISCONNECT_EVENT = "disconnect";
// const TYPING_EVENT = "typing";
// const STOP_TYPING_EVENT = "stopTyping";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messageSendLoading, setMessageSendLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unReadMessages, setUnReadMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [updateChat, setUpdateChat] = useState(null);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const currentChat = useRef(null);
  const [openAddChat, setOpenAddChat] = useState(false);
  const [searchUserChat, setSearchUserChat] = useState("");
  const { data: usersData } = useFetch("/chats/users");
  const { user } = useSelector((state) => state.auth);
  const [previews, setPreviews] = useState([]);
  const [attachments, setAttachments] = useState([]);

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

  const onSocketError = (message) => {
    toast.error(`${JSON.stringify(message)}`);
  };

  const fetchChats = async () => {
    try {
      setChatsLoading(true);
      const { data } = await axios.get("/chats");
      setChats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setChatsLoading(false);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      setMessagesLoading(true);
      const { data } = await axios.get(`/messages/${chatId}`);
      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const onNewChat = (chat) => {
    // console.log("new chat", chat);
    setChats((prev) => [chat, ...prev]);
  };

  const onChatLeave = (chat) => {
    // console.log("chat leave", chat);
    setChats((prev) => prev.filter((c) => c._id !== chat._id));
    if (chat._id === currentChat.current?._id) {
      LocalStorage.set("currentChat", null);
      currentChat.current = null; // Clear current chat reference
    } else {
      console.log(chat._id, currentChat.current?._id);
    }
  };

  const onGroupUpdate = (chat) => {
    // console.log("update group chat", chat);
    if (chat._id === currentChat.current?._id) {
      // update chat details
    }
    setChats((prev) => [
      ...prev.map((c) => {
        if (c._id === chat._id) {
          return chat;
        }
        return c;
      }),
    ]);
  };

  const onMessageDelete = (message) => {
    // console.log(message, "delete");
    setMessages((prev) => prev.filter((msg) => msg._id !== message._id));
    // update chat last message
  };

  const onMessageRetrieved = (msg) => {
    if (msg?.chat === currentChat.current?._id) {
      setMessages((prev) => [...prev, msg]);
    } else {
      setUnReadMessages((prev) => [...prev, msg]);
    }
  };

  const handleCreateOrGetChat = async (id) => {
    try {
      const res = await axios.post(`/chats/chat/${id}`);
      if (res.data) {
        LocalStorage.set("currentChat", res.data);
        setSearchUserChat("");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleChatDeleted = async (chatId) => {
    try {
      if (!chatId) return;
      const res = await axios.delete(`/chats/chat/${chatId}`);
      if (res.data) {
        toast.success("chat deleted success");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      setMessageSendLoading(true);
      if (!message.trim()) return;
      const formData = new FormData();
      formData.append("content", message);
      if (attachments?.length > 0) {
        attachments?.forEach((file, i) => {
          formData.append("attachments", attachments[i]);
        });
      }
      const res = await axios.post(
        `/messages/${currentChat.current?._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data) {
        setAttachments([]);
        setPreviews([]);
        setMessage("");
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setMessageSendLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      if (!messageId) return;
      const res = await axios.delete(`/messages/${messageId}`);
      if (res.data) {
        toast.success("Message deleted successfully");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on(NEW_CHAT_EVENT, onNewChat);
    socket.on(LEAVE_CHAT_EVENT, onChatLeave);
    socket.on(UPDATE_GROUP_NAME_EVENT, onGroupUpdate);
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageRetrieved);
    socket.on(MESSAGE_DELETE_EVENT, onMessageDelete);
    socket.on(SOCKET_ERROR_EVENT, onSocketError);

    return () => {
      socket.off(NEW_CHAT_EVENT, onNewChat);
      socket.off(LEAVE_CHAT_EVENT, onChatLeave);
      socket.off(UPDATE_GROUP_NAME_EVENT, onGroupUpdate);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageRetrieved);
      socket.off(MESSAGE_DELETE_EVENT, onMessageDelete);
      socket.off(SOCKET_ERROR_EVENT, onSocketError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <>
      <div className="flex max-sm:flex-col h-full">
        <div className="!min-w-[340px] sticky top-12 h-full bg-slate-50 z-20">
          {/* Create Group Modal */}
          {!!openAddChat && (
            <AddChatModal
              onClose={() => {
                setOpenAddChat(false);
                setUpdateChat(null);
              }}
              usersData={usersData}
              chat={updateChat}
            />
          )}

          {/* Search Bar */}
          <div className="bg-white relative shadow overflow-hidden flex items-center p-2 pb-1">
            <Search size={18} />
            <label htmlFor="search-users">
              <Input
                name="search"
                id="search-users"
                title="search chat user"
                placeholder="Search..."
                className="border-none !w-full outline-none"
                onChange={(e) => setSearchUserChat(e.target.value)}
                value={searchUserChat}
              />
            </label>
            {!!searchUserChat && (
              <button className="btn" onClick={() => setSearchUserChat("")}>
                <X size={16} />
              </button>
            )}
            <button
              title="Add new chat"
              className="!py-2.5 text-sm text-nowrap rounded-none !px-2 flex gap-1 items-center border-none font-medium btn-primary"
              onClick={() => setOpenAddChat(true)}>
              <Plus size={16} /> Add Chat
            </button>
          </div>

          {/* Display Search User Listing*/}
          {!!searchUserChat?.length && (
            <div className="flex flex-col absolute z-10 !top-14 !left-2 !right-2 p-2 rounded-2xl h-full shadow-2xl bg-slate-50 overflow-y-auto overflow-x-hidden">
              {[...usersData]
                .filter((i) =>
                  i?.fullName?.toLowerCase().includes(searchUserChat)
                )
                .map((item) => (
                  <button
                    onClick={() => handleCreateOrGetChat(item._id)}
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
              chatWith={
                item?.participants?.filter(
                  (p) => p._id.toString() !== user._id.toString()
                )[0]
              }
              unreadCount={
                [...unReadMessages].filter((n) => n.chat === item._id).length
              }
              isActive={currentChat.current?._id === item?._id}
              onUpdate={() => {
                setUpdateChat(item);
                setOpenAddChat(true);
              }}
              onDelete={(chatId) => handleChatDeleted(chatId)}
              onLeave={(chatId) => {
                setChats((prev) => prev.filter((c) => c._id !== chatId));
                if (currentChat.current?._id === chatId) {
                  currentChat.current = null;
                  LocalStorage.remove("currentChat");
                }
              }}
              onClick={() => {
                currentChat.current = item;
                LocalStorage.set("currentChat", item);
                socket.emit(JOIN_CHAT_EVENT, item._id);
                fetchMessages(item._id);
                setUnReadMessages((prev) =>
                  prev.filter((n) => n.chat !== item._id)
                );
              }}
            />
          ))}
        </div>
        <div className="w-full border-l border-slate-200 h-full">
          {!!currentChat.current?._id && (
            <div className="py-2 px-4 flex font-medium bg-white text-lg items-center gap-3 top-12 sticky z-10 shadow">
              <img
                src={
                  getChatObjectMetadata(currentChat.current, user).avatar ||
                  "/placeholder.jpg"
                }
                alt="img"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p>{getChatObjectMetadata(currentChat.current, user).title}</p>
            </div>
          )}
          {messagesLoading && <Loading />}
          <div className="flex-col gap-2 flex justify-end p-4 h-fit min-h-[400px]">
            {[...messages].map((item) => (
              <MessageItem
                key={item?._id}
                item={item}
                sender={item?.sender?._id === user?._id}
                onDelete={() => handleDeleteMessage(item?._id)}
              />
            ))}
          </div>

          {previews?.length > 0 && (
            <div className="w-full flex flex-wrap px-4 gap-2 items-center justify-center sticky bottom-14 bg-white">
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

          {!!currentChat.current?._id && (
            <form
              onSubmit={handleSendMessage}
              className="w-full py-2 px-4 flex gap-2 items-center sticky bottom-0 bg-slate-50">
              <Input
                className="rounded-full !p-2 !px-5"
                name="message"
                placeholder="Enter a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <label
                title="send files with limit 5"
                htmlFor="attachment"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex gap-2 rounded-full px-5 py-2 hover:opacity-80 items-center cursor-pointer">
                <ImageUp size={20} />
                <input
                  type="file"
                  multiple={true}
                  onChange={handlePreviewAttachments}
                  id="attachment"
                  name="attachment"
                  className="hidden"
                />
              </label>
              <button
                disabled={messageSendLoading}
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex gap-2 rounded-full px-5 py-2 hover:opacity-80 items-center">
                {messageSendLoading ? (
                  "Loading..."
                ) : (
                  <>
                    Send <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatPage;
