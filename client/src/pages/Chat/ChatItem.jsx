import { Trash2Icon } from "lucide-react";
import { classNames, formatChatTime } from "../../helper";
import { Avatar } from "../../utils";

const ChatItem = ({ item, chatWith, isActive, onDelete, onClick }) => {
  return (
    <div
      className={classNames(
        "relative group rounded py-2 px-3 mt-1",
        isActive && "bg-indigo-100"
      )}>
      <button
        onClick={onDelete}
        title="delete chat"
        className="group-hover:flex hidden rounded-full absolute right-1 top-1 !text-red-600 gap-2 p-2 w-fit group-hover:hover:bg-red-300/30 duration-300">
        <Trash2Icon size={18} />
      </button>
      <div className="flex gap-2 items-center justify-between flex-wrap">
        <Avatar name={item?.isGroupChat ? item?.name : chatWith?.fullName} />
        <button
          className="min-w-[180px] flex-1 cursor-pointer text-left"
          onClick={onClick}>
          <span className="font-medium block text-lg line-clamp-1 capitalize">
            {item?.isGroupChat ? item?.name : chatWith?.fullName}
          </span>
          <span className="line-clamp-1">
            {item?.lastMessage?._id
              ? item?.lastMessage?.content
              : "No message yet"}
          </span>
        </button>
        <small className="flex flex-col items-center justify-center">
          {formatChatTime(item?.updatedAt)}
          {item?.isGroupChat && <small>{"Group"}</small>}
        </small>
      </div>
    </div>
  );
};

export default ChatItem;
