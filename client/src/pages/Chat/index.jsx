import { useRef, useState } from "react";
import { useEffect } from "react";
import { axios, socket } from "../../helper";
import useFetch from "../../hooks/useFetch";
import { Loading } from "../../utils";
import Messages from "./Messages";
import Chat from "./Chat";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { type } from "os";

const CONNECTED_EVENT = "connected";
const DISCONNECT_EVENT = "disconnect";
const JOIN_CHAT_EVENT = "joinChat";
const NEW_CHAT_EVENT = "newChat";
const TYPING_EVENT = "typing";
const STOP_TYPING_EVENT = "stopTyping";
const MESSAGE_RECEIVED_EVENT = "messageReceived";
const LEAVE_CHAT_EVENT = "leaveChat";
const UPDATE_GROUP_NAME_EVENT = "updateGroupName";
const MESSAGE_DELETE_EVENT = "messageDeleted";
// const SOCKET_ERROR_EVENT = "socketError";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [chatsLoading, setChatsLoading] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const currentChat = useRef(null);
  const typingTimeoutRef = useRef(null);
  const chatId = searchParams.get("chatId");
  const { user } = useSelector((state) => state.auth);

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const onConnect = () => {
    setIsConnected(true);
  };

  useEffect(() => {
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
    fetchChats();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!chatId) return;
        setMessagesLoading(true);
        const { data } = await axios.get(`/messages/${chatId}`);
        setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setMessagesLoading(false);
      }
    };
    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  const onIsTypingOn = () => {
    if (chatId !== chatId) return;
    setIsTyping(true);
  };

  const onIsTypingOff = () => {
    if (chatId !== chatId) return;
    setIsTyping(false);
  };

  const onMessageDelete = (message) => {
    console.log("delete message", message);
    if (message?.chat !== chatId) {
      setUnreadMessages((prev) =>
        prev.filter((msg) => msg._id !== message._id)
      );
    } else {
      setMessages((prev) => prev.filter((msg) => msg._id !== message._id));
    }
    // update chat last message
  };

  const onMessageReceived = (message) => {
    console.log("message receive", message);
    if (message?.sender?._id !== user?._id) {
      setUnreadMessages((prev) => [...prev, message]);
    } else {
      setMessages((prev) => [...prev, message]);
    }
    // update chat last message
  };

  const onNewChat = (chat) => {
    console.log("new chat", chat);
    setChats((prev) => [chat, ...prev]);
  };

  const onChatLeave = (chat) => {
    console.log("chat leave", chat);
    if (chat._id === chatId) {
      setSearchParams();
    }
    setChats((prev) => prev.filter((c) => c._id !== chat._id));
  };

  const onGroupUpdate = (chat) => {
    console.log("update group chat", chat);
    if (chat._id === chatId) {
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

  useEffect(() => {
    if (!socket || !chatId) return;
    socket.emit(JOIN_CHAT_EVENT, chatId);
  }, [chatId]);

  useEffect(() => {
    if (!socket) return;

    socket.on(CONNECTED_EVENT, onConnect);
    socket.on(DISCONNECT_EVENT, onDisconnect);
    socket.on(TYPING_EVENT, onIsTypingOn);
    socket.on(STOP_TYPING_EVENT, onIsTypingOff);
    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    socket.on(MESSAGE_DELETE_EVENT, onMessageDelete);
    socket.on(NEW_CHAT_EVENT, onNewChat);
    socket.on(LEAVE_CHAT_EVENT, onChatLeave);
    socket.on(UPDATE_GROUP_NAME_EVENT, onGroupUpdate);

    return () => {
      socket.off(CONNECTED_EVENT, onConnect);
      socket.off(DISCONNECT_EVENT, onDisconnect);
      socket.off(TYPING_EVENT, onIsTypingOn);
      socket.off(STOP_TYPING_EVENT, onIsTypingOff);
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
      socket.off(MESSAGE_DELETE_EVENT, onMessageDelete);
      socket.off(NEW_CHAT_EVENT, onNewChat);
      socket.off(LEAVE_CHAT_EVENT, onChatLeave);
      socket.off(UPDATE_GROUP_NAME_EVENT, onGroupUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className="flex max-sm:flex-col relative min-h-screen">
      <div className="!min-w-[340px] sticky top-12 h-fit p-2 overflow-y-auto bg-slate-50 z-20">
        <Chat chats={chats} />
      </div>
      <div className="w-full border-l border-slate-200 p-2 min-h-[80vh]">
        <Messages messages={messages} />
      </div>
    </div>
  );
};

export default ChatPage;
