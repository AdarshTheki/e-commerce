import React, { useState } from "react";
import { toast } from "react-toastify";

import { axios } from "../../helper";
import { Input } from "../../utils";

const AddChatModal = ({ usersData, onClose, chat }) => {
  const [users, setUsers] = React.useState(usersData || []);
  const [groupName, setGroupName] = React.useState(chat?.name || "");
  const [isGroupChat, setIsGroupChat] = React.useState(
    chat?.isGroupChat || false
  );

  const [selectUserId, setSelectUserId] = React.useState("");
  const [selectedValues, setSelectedValues] = useState(
    chat?.participants?.map((i) => i?._id) || []
  );

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (isGroupChat) {
      setSelectedValues((prev) =>
        checked ? [...prev, value] : prev.filter((val) => val !== value)
      );
      setSelectUserId("");
    } else {
      setSelectUserId(value);
      setSelectedValues([]);
    }
  };

  const handleCreateChat = async () => {
    if (!selectUserId) return toast.error("Please select a user");
    const res = await axios.post(`/chats/chat/${selectUserId}`);
    if (res.data) {
      toast.success("Chat created successfully");
      handleClose();
    }
  };

  const handleCreateGroupChat = async () => {
    if (!groupName || selectedValues.length === 0) {
      return toast.error("Please provide a Group Name and add Participants");
    }
    const method = chat?._id ? "patch" : "post";
    const url = chat?._id ? `/chats/group/${chat?._id}` : "/chats/group";

    const res = await axios[method](url, {
      name: groupName,
      participants: selectedValues,
    });

    if (res.data) {
      toast.success(`Chat ${chat?._id ? "updated" : "created"}  successfully`);
      handleClose();
    }
  };

  const handleClose = () => {
    setUsers([]);
    setSelectUserId("");
    setGroupName("");
    setIsGroupChat(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/10 flex justify-center items-center h-full z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl space-y-5">
        <p className="text-xl font-medium">
          {chat?._id ? "Update Group Chat" : "Create Chat"}
        </p>
        {!chat?._id && (
          <label htmlFor="group-chat" className="flex gap-2 items-center">
            <input
              onChange={() => setIsGroupChat(!isGroupChat)}
              type="checkbox"
              id="group-chat"
              checked={isGroupChat}
            />
            Create Group Chat ?
          </label>
        )}
        {isGroupChat && (
          <Input
            label="Group Name"
            type="text"
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        )}

        <div className="max-h-[200px] overflow-y-auto">
          <p className="mb-1">Participants:</p>
          {users.map((option) => (
            <div key={option._id}>
              <label htmlFor={option._id} className="block">
                <input
                  type="checkbox"
                  id={option._id}
                  value={option._id}
                  checked={
                    isGroupChat
                      ? selectedValues.includes(option._id)
                      : selectUserId === option._id
                  }
                  onChange={handleCheckboxChange}
                />
                <span className="pl-2 py-2 text-sm">{option.fullName}</span>
              </label>
            </div>
          ))}
        </div>

        <div className="flex gap-5 text-center font-medium">
          <button
            className="btn text-red-600 border border-red-600 flex-1"
            onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn-primary flex-1"
            onClick={isGroupChat ? handleCreateGroupChat : handleCreateChat}>
            {chat?._id ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChatModal;
