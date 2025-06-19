import React from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Search, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Input } from "../utils";

const Chat = ({ setChatId, chats = [] }) => {
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => state.auth);

  if (!chats || !chats?.length)
    return (
      <p className="flex h-screen items-center justify-center">
        No content here
      </p>
    );

  return (
    <div className="flex gap-4 !min-w-[400px] sticky top-10 h-fit p-2 flex-col overflow-y-auto">
      <div className="flex items-center justify-between gap-4">
        <div className="py-2 bg-white px-5 rounded-2xl border border-slate-300 flex gap-2 items-center">
          <Search />
          <Input
            name="search"
            className="border-none outline-none"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <button className="!py-3 text-nowrap !px-5 !rounded-2xl btn-primary">
          Add User
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
            <div className="flex gap-2 items-start flex-wrap">
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
              <div className="w-[180px]">
                <p className="font-semibold text-lg line-clamp-1 capitalize">
                  {chatWith?.fullName || "NA"}
                </p>
                <p className="line-clamp-1">
                  {lastMessage?._id ? lastMessage?.content : "No message yet"}
                </p>
              </div>
              <div>
                <small className="text-nowrap">
                  {format(
                    updatedAt
                      ? new Date(
                          new Date(updatedAt).getTime() + 3 * 60 * 60 * 1000
                        )
                      : new Date(),
                    "dd MMM, h:mm a"
                  )}
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
