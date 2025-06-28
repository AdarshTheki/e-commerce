import React from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";

import { axios } from "../../helper";
import { Input, Select } from "../../utils";

const AddChatModal = ({ usersData, onClose }) => {
  const [users, setUsers] = React.useState(usersData || []);
  const [groupName, setGroupName] = React.useState("");
  const [isGroupChat, setIsGroupChat] = React.useState(false);
  const [groupParticipants, setGroupParticipants] = React.useState([]);
  const [selectUserId, setSelectUserId] = React.useState("");

  const handleCreateChat = async () => {
    if (!selectUserId) return toast.error("Please select a user");
    const res = await axios.post(`/chats/chat/${selectUserId}`);
    if (res.data) {
      toast.success("Chat created successfully");
      handleClose();
    }
  };

  const handleCreateGroupChat = async () => {
    if (!groupName || groupParticipants.length === 0) {
      return toast.error("Please provide a group name and add participants");
    }
    const res = await axios.post(`/chats/group`, {
      name: groupName,
      participants: groupParticipants,
    });
    if (res.data) {
      toast.success("Chat created successfully");
      handleClose();
    }
  };

  const handleClose = () => {
    setUsers([]);
    setSelectUserId("");
    setGroupName("");
    setIsGroupChat(false);
    setGroupParticipants([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/10 flex justify-center items-center h-full z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl space-y-5">
        <p className="text-xl font-medium">Create Chat</p>

        <label
          htmlFor="group-chat"
          className="flex gap-2 items-center"
          value={isGroupChat}
          onChange={() => setIsGroupChat(!isGroupChat)}>
          <input type="checkbox" id="group-chat" defaultValue={isGroupChat} />
          Is a group chat ?
        </label>

        {isGroupChat && (
          <Input
            type="text"
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        )}

        <label htmlFor="user-select" className="block ">
          <Select
            id="user-select"
            value={isGroupChat ? "" : selectUserId || ""}
            options={[
              { value: "", label: "--Select User--" },
              ...(Array.isArray(users) ? users : []).map((user) => ({
                value: user?._id,
                label: user?.fullName,
              })),
            ]}
            onChange={(e) => {
              const value = e.target.value;
              if (isGroupChat && !groupParticipants.includes(value)) {
                // if user is creating a group chat track the participants in an array
                setGroupParticipants([...groupParticipants, value]);
              } else {
                setSelectUserId(value);
                // if user is creating normal chat just get a single user
              }
            }}
          />
        </label>

        {isGroupChat && (
          <div className="flex gap-2 flex-wrap items-center">
            <p className="flex-1 min-w-full text-sm">Selected participants</p>
            {users
              ?.filter((user) => groupParticipants.includes(user?._id))
              .map((participant) => (
                <button
                  onClick={() => {
                    setGroupParticipants(
                      groupParticipants.filter((id) => id !== participant?._id)
                    );
                  }}
                  key={participant?._id}
                  className="svg-btn min-w-fit px-2 text-xs bg-slate-300">
                  {participant?.fullName} <X size={14} />
                </button>
              ))}
          </div>
        )}

        <div className="flex gap-5 text-center font-medium">
          <button className="btn-primary flex-1" onClick={handleClose}>
            Close
          </button>
          <button
            className="btn-secondary flex-1"
            onClick={isGroupChat ? handleCreateGroupChat : handleCreateChat}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChatModal;
