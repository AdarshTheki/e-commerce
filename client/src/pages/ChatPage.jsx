import { useEffect, useState } from "react";
import { socket, action } from "../helper";
import { Input } from "../utils";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // socket.on (listen for message)
    socket.on(action.MESSAGE, (data) => {
      setChat((prev) => [...prev, data]);
    });

    // socket.off (cleanup)
    return () => {
      socket.off(action.MESSAGE);
    };
  }, []);

  const sendMessage = () => {
    socket.emit(action.MESSAGE, msg); // socket.emit
    setMsg("");
  };

  return (
    <div className="min-h-screen">
      {chat.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
      <div className="card flex gap-5 max-w-[600px] sticky top-10 h-fit">
        <Input value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button className="btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
