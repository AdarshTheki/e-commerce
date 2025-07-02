import React from "react";
import { classNames, formatChatTime } from "../../helper";
import { Trash2Icon } from "lucide-react";

const MessageItem = ({ item, onDelete, sender }) => {
  return (
    <div
      className={classNames(
        "flex flex-col gap-2",
        !sender ? "justify-start" : "items-end"
      )}>
      <div
        className={classNames(
          "relative cursor-pointer group w-fit py-2 px-5 shadow",
          sender
            ? "!bg-indigo-100 rounded-l-4xl rounded-t-4xl bg-gradient-to-r from-pink-400 text-white font-medium to-purple-400"
            : "bg-white rounded-r-4xl rounded-b-4xl"
        )}>
        <button
          onClick={onDelete}
          className="text-red-600 hidden group-hover:block absolute right-2 top-1 p-2 rounded-full bg-white">
          <Trash2Icon size={18} />
        </button>
        <div className="flex gap-2 items-end">
          {item?.content && <p>{item?.content}</p>}
          <small className="text-nowrap" style={{ fontWeight: 400 }}>
            {formatChatTime(item?.updatedAt)}
          </small>
        </div>
        {item?.attachments.length > 0 && (
          <div className="grid grid-cols-2 gap-2 max-w-[200px]">
            {item?.attachments.map((attachment, index) => (
              <a
                href={attachment}
                target="_blank"
                rel="noopener noreferrer"
                key={index}>
                <img
                  src={attachment}
                  alt={`attachment-${index}`}
                  className="aspect-square w-full border border-gray-300 object-cover"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
