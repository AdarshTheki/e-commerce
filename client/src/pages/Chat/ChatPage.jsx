import { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import ChatItem from "./ChatItem";
import AddChatModal from "./AddChatModal";
import MessageListing from "./Messages";
import { Avatar, Input, Loading } from "../../utils";
import { axios, socket, LocalStorage, errorHandler } from "../../helper";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import { Plus, Search, X } from "lucide-react";
import { set } from "date-fns";

const CONNECTED_EVENT = "connected";
const DISCONNECT_EVENT = "disconnect";
const JOIN_CHAT_EVENT = "joinChat";
const NEW_CHAT_EVENT = "newChat";
const TYPING_EVENT = "typing";
const STOP_TYPING_EVENT = "stopTyping";
const LEAVE_CHAT_EVENT = "leaveChat";
const UPDATE_GROUP_NAME_EVENT = "updateGroupName";
const MESSAGE_RECEIVED_EVENT = "messageReceived";
const MESSAGE_DELETE_EVENT = "messageDeleted";
// const SOCKET_ERROR_EVENT = "socketError";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [unReadMessages, setUnReadMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const currentChat = useRef(null);
  const [openAddChat, setOpenAddChat] = useState(false);
  const [searchUserChat, setSearchUserChat] = useState("");
  const { data: usersData } = useFetch("/chats/users");
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const onConnect = () => {
    setIsConnected(true);
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

  const onIsTypingOn = () => {
    if (currentChat.current?._id !== currentChat.current?._id) return;
    setIsTyping(true);
  };

  const onIsTypingOff = () => {
    if (currentChat.current?._id !== currentChat.current?._id) return;
    setIsTyping(false);
  };

  const onNewChat = (chat) => {
    console.log("new chat", chat);
    setChats((prev) => [chat, ...prev]);
  };

  const onChatLeave = (chat) => {
    console.log("chat leave", chat);
    setChats((prev) => prev.filter((c) => c._id !== chat._id));
    if (chat._id === currentChat.current?._id) {
      LocalStorage.set("currentChat", null);
      currentChat.current = null; // Clear current chat reference
    } else {
      console.log(chat._id, currentChat.current?._id);
    }
  };

  const onGroupUpdate = (chat) => {
    console.log("update group chat", chat);
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

  const handleChatDeleted = async (id) => {
    try {
      const res = await axios.delete(`/chats/chat/${id}`);
      if (res.data) {
        toast.success("chat deleted success");
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

    socket.on(CONNECTED_EVENT, onConnect);
    socket.on(DISCONNECT_EVENT, onDisconnect);
    socket.on(TYPING_EVENT, onIsTypingOn);
    socket.on(STOP_TYPING_EVENT, onIsTypingOff);
    socket.on(NEW_CHAT_EVENT, onNewChat);
    socket.on(LEAVE_CHAT_EVENT, onChatLeave);
    socket.on(UPDATE_GROUP_NAME_EVENT, onGroupUpdate);
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageRetrieved);
    socket.on(MESSAGE_DELETE_EVENT, onMessageDelete);

    return () => {
      socket.off(CONNECTED_EVENT, onConnect);
      socket.off(DISCONNECT_EVENT, onDisconnect);
      socket.off(TYPING_EVENT, onIsTypingOn);
      socket.off(STOP_TYPING_EVENT, onIsTypingOff);
      socket.off(NEW_CHAT_EVENT, onNewChat);
      socket.off(LEAVE_CHAT_EVENT, onChatLeave);
      socket.off(UPDATE_GROUP_NAME_EVENT, onGroupUpdate);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageRetrieved);
      socket.off(MESSAGE_DELETE_EVENT, onMessageDelete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // console.log(chatId, unReadMessages);

  if (chatsLoading || messagesLoading) return <Loading />;

  return (
    <>
      <div className="flex max-sm:flex-col h-full">
        <div className="!min-w-[340px] sticky top-12 h-full p-2 bg-slate-50 z-20">
          {/* Create Group Modal */}
          {!!openAddChat && (
            <AddChatModal
              onClose={() => setOpenAddChat(false)}
              usersData={usersData}
            />
          )}

          {/* Search Bar */}
          <div className="bg-white relative pl-3 rounded-2xl overflow-hidden border border-slate-200 flex items-center">
            <Search size={18} />
            <label htmlFor="search-users">
              <Input
                name="search"
                id="search-users"
                title="search chat user"
                placeholder="Search..."
                className="border-none !w-full outline-none !py-2 !px-4"
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
              isActive={currentChat.current?._id === item?._id}
              onDelete={() => handleChatDeleted(item._id)}
              onClick={() => {
                currentChat.current = item;
                LocalStorage.set("currentChat", item);
                socket.emit(JOIN_CHAT_EVENT, item._id);
                fetchMessages(item._id);
              }}
            />
          ))}
        </div>
        <div className="w-full border-l border-slate-200 p-2 h-full">
          <MessageListing
            messages={messages}
            chatId={currentChat.current?._id}
          />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
