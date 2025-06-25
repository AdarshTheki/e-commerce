import React from "react";
import { Avatar } from "../../utils";

const MobileChat = ({
  isGroupChat,
  updatedAt,
  lastMessage,
  participants,
  _id,
  name,
  admin,
  createdAt,
}) => {
  return (
    <div className="text-sm w-full flex items-center justify-center flex-col">
      <Avatar name={name} />
      <p className="line-clamp-1 text-center">{name || "NA"}</p>
    </div>
  );
};

export default MobileChat;
