import { useEffect, useState } from "react";
import { socket } from "../helper";
import { Input } from "../utils";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // socket.on (listen for message)
    socket.on("message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    // socket.off (cleanup)
    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", msg); // socket.emit
    setMsg("");
  };

  return (
    <div className="min-h-screen">
      {chat.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
      <div className="card">
        <Input value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button className="btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
