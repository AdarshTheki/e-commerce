import { EllipsisVertical } from "lucide-react";
import {
  classNames,
  formatChatTime,
  getChatObjectMetadata,
} from "../../helper";
import { useSelector } from "react-redux";
import useDropdown from "../../hooks/useDropdown";

const ChatItem = ({
  item,
  isActive,
  onDelete,
  onClick,
  unreadCount,
  onLeave,
  onUpdate,
}) => {
  const { isOpen, dropdownRef, setIsOpen } = useDropdown();
  const { user } = useSelector((s) => s.auth);

  return (
    <div
      className={classNames(
        "relative group rounded w-full py-2",
        isActive && "bg-indigo-100"
      )}>
      <div
        ref={dropdownRef}
        className="flex gap-2 items-center justify-between">
        {item.isGroupChat ? (
          <div className="w-12 relative h-12 flex-shrink-0 flex justify-start items-center flex-nowrap">
            {item.participants.slice(0, 3).map((participant, i) => {
              return (
                <img
                  key={participant._id}
                  src={participant.avatar}
                  className={classNames(
                    "w-10 h-10 border-[1px] border-white rounded-full absolute outline outline-dark group-hover:outline-secondary",
                    i === 0
                      ? "left-0 z-[3]"
                      : i === 1
                        ? "left-2.5 z-[2]"
                        : i === 2
                          ? "left-[18px] z-[1]"
                          : ""
                  )}
                />
              );
            })}
          </div>
        ) : (
          <img
            src={getChatObjectMetadata(item, user).avatar || "/placeholder.jpg"}
            className="w-12 h-12 rounded-full"
          />
        )}
        {/* <Avatar name={item?.isGroupChat ? item?.name : chatWith?.fullName} /> */}
        <button
          className="flex-1 cursor-pointer text-left ml-2"
          onClick={onClick}>
          <p>{getChatObjectMetadata(item, user).title}</p>
          <small className="line-clamp-1 text-gray-500">
            {getChatObjectMetadata(item, user).lastMessage || "No messages yet"}
          </small>
        </button>
        <p className="text-center">
          <small className="text-nowrap">
            {formatChatTime(item?.updatedAt)}
          </small>
          {unreadCount <= 0 ? null : (
            <span className="bg-green-600 h-2 w-2 aspect-square flex-shrink-0 p-2 text-white text-xs rounded-full inline-flex justify-center items-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </p>

        <button className="svg-btn !p-2" onClick={() => setIsOpen(!isOpen)}>
          <EllipsisVertical />
        </button>
        {!!isOpen && (
          <div className="absolute top-12 right-4 flex flex-col justify-start bg-white p-2 shadow-lg z-30 text-sm rounded-l-4xl rounded-b-4xl">
            <button
              onClick={() => onLeave(item._id)}
              className="btn hover:bg-slate-100">
              Leave {item?.isGroupChat ? "Group" : "Chat"}
            </button>
            {item?.isGroupChat && item?.admin === user?._id && (
              <>
                <button className="btn hover:bg-slate-100" onClick={onUpdate}>
                  Edit Group
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="btn text-rose-600 hover:bg-slate-100">
                  Delete {item?.isGroupChat ? "Group" : "Chat"}
                </button>
              </>
            )}
            {!item?.isGroupChat && item?.admin === user?._id && (
              <button
                onClick={() => onDelete(item._id)}
                className="btn text-rose-600 hover:bg-slate-100">
                Delete {item?.isGroupChat ? "Group" : "Chat"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
