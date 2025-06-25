import { Plus, Search, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { errorHandler, axios, classNames, formatChatTime } from "../../helper";
import { Avatar, Input } from "../../utils";
import MobileChat from "./MobileChat";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import CreateGroupModal from "./GroupModal";

const Chat = ({ chats = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const { data } = useFetch("/chats/users");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCreateOrGetChat = async (id) => {
    try {
      const res = await axios.post(`/chats/chat/${id}`);
      if (res.data) {
        setSearchParams({ chatId: res.data?.chat?._id });
        setSearch("");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  // Memoize filtered users for performance
  const filteredUsers = search
    ? data
        ?.filter((i) =>
          i?.fullName?.toLowerCase().includes(search.toLowerCase())
        )
        ?.slice(0, 10)
    : [];

  const handleChatDelete = async (_id) => {
    try {
      if (!_id) return;
      const res = await axios.delete(`/chats/chat/${_id}`);
      if (res.data) {
        toast.success("chat deleted success");
        if (_id === chatId) setSearchParams();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <>
      {!!isOpen && (
        <CreateGroupModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          users={data}
        />
      )}

      {/* Search User */}
      <div className="bg-white relative pl-3 rounded-2xl overflow-hidden border border-slate-200 flex items-center">
        <Search size={18} />
        <Input
          name="search"
          className="border-none !w-full outline-none !py-2 !px-4"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          className="!py-2.5 text-sm text-nowrap rounded-none !px-2 flex gap-1 items-center border-none font-medium btn-primary"
          onClick={() => setIsOpen(true)}>
          <Plus size={16} /> Add User
        </button>
      </div>

      {/* Display search result chats */}
      {!!search?.length && (
        <div className="w-full flex flex-col">
          {filteredUsers.map((item) => (
            <button
              onClick={() => handleCreateOrGetChat(item._id)}
              className="btn hover:bg-gray-300 text-left w-full flex gap-2 items-center"
              key={item?._id}>
              <Avatar name={item?.fullName} avatarUrl={item?.avatar} />
              <span>{item?.fullName}</span>
            </button>
          ))}
        </div>
      )}

      {/* Display Desktop chats */}
      <div className="sm:flex gap-2 flex-col mt-2 hidden">
        {!search?.length && chats?.length ? (
          chats.map((item) => (
            <div
              key={item._id}
              className="border relative group bg-white border-slate-200 rounded">
              <button
                onClick={() => {
                  handleChatDelete(item._id);
                }}
                title="delete chat"
                className="group-hover:flex hidden rounded-full absolute right-1 top-0 !text-red-600 gap-2 p-2 w-fit group-hover:hover:bg-red-300/30 duration-300">
                <Trash2Icon size={18} />
              </button>
              <div
                className={classNames(
                  "px-3 py-1",
                  chatId === item._id && "!bg-indigo-100"
                )}>
                <div className="flex gap-2 items-center justify-between flex-wrap">
                  <Avatar name={item?.name} />
                  <div
                    className="min-w-[180px] flex-1 hover:text-indigo-500 cursor-pointer"
                    onClick={() => setSearchParams({ chatId: item._id })}>
                    <p className="font-medium text-lg line-clamp-1 capitalize">
                      {item?.name || "NA"}
                    </p>
                    <p className="line-clamp-1">
                      {item?.lastMessage?._id
                        ? item?.lastMessage?.content
                        : "No message yet"}
                    </p>
                  </div>
                  <small className="flex flex-col items-center justify-center">
                    {formatChatTime(item?.updatedAt)}
                    {item?.isGroupChat && <small>{"Group"}</small>}
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="flex h-screen items-center justify-center">
            No content here
          </p>
        )}
      </div>

      {/* Display mobile chats */}
      <div className="flex gap-1 mt-2 sm:hidden overflow-x-auto items-center justify-start">
        {chats.map((item) => (
          <div
            onClick={() => setSearchParams({ chatId: item._id })}
            key={item._id}
            className="!w-[100px] !h-[100px]">
            <MobileChat {...item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Chat;
