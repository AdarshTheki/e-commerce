import { useSelector } from "react-redux";
import { Plus, Search, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Input } from "../utils";
import { formatChatTime } from "../helper";

const Chat = ({ setChatId, chats = [] }) => {
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => state.auth);

  const filterUser = [...chats].map((chat) => ({
    ...chat,
    participants: chat?.participants?.filter(
      (p) => p._id.toString() !== user._id.toString()
    )[0],
  }));

  console.log(filterUser);

  if (!chats || !chats?.length)
    return (
      <p className="flex h-screen items-center justify-center">
        No content here
      </p>
    );

  return (
    <div className="flex gap-4 !min-w-[340px] sticky top-12 h-fit p-2 flex-col overflow-y-auto bg-slate-50 z-20">
      <div className="flex items-center">
        <div className="bg-white relative pl-3 rounded-l-2xl border border-slate-300 flex gap-2 items-center">
          <Search size={16} />
          <Input
            name="search"
            className="border-none !w-full outline-none !py-2 !px-4"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <button className="!py-2.5 text-sm text-nowrap !px-2 flex gap-1 items-center font-medium !rounded-r-2xl btn-primary">
          <Plus size={16} /> Add User
        </button>
      </div>
      {chats?.map((item) => {
        const {
          isGroupChat,
          participants,
          _id,
          // name,
          // admin,
          // createdAt,
          updatedAt,
          lastMessage,
        } = item;

        const chatWith = participants?.filter(
          (p) => p._id.toString() !== user._id.toString()
        )[0];

        return (
          <div
            title={_id}
            onClick={() => setChatId(_id)}
            key={_id}
            className="border relative group bg-white hover:bg-slate-200 cursor-pointer border-slate-300 p-2 rounded-2xl">
            <div className="flex gap-2 items-start justify-between flex-wrap">
              <button
                title="delete chat"
                className="group-hover:flex hidden absolute right-2 !text-red-600 gap-2 p-2 w-fit">
                <Trash2Icon />
              </button>
              <img
                src={chatWith?.avatar || "https://avatar.iran.liara.run/public"}
                alt={chatWith?.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="min-w-[180px] flex-1">
                <p className="font-semibold text-lg line-clamp-1 capitalize">
                  {chatWith?.fullName || "NA"}
                </p>
                <p className="line-clamp-1">
                  {lastMessage?._id ? lastMessage?.content : "No message yet"}
                </p>
              </div>
              <div>
                <small className="text-nowrap">
                  {formatChatTime(updatedAt)}
                </small>
                {isGroupChat && <small>{"Group"}</small>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
