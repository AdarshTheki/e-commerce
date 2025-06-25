import React, { useState } from "react";
import { Input, Select } from "../../utils";
import { axios } from "../../helper";

const CreateGroupModal = ({ isOpen, onClose, users }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    if (!selectedOptions.length) return;

    const res = await axios.post(`/chats/group`, {
      name: groupName,
      participants: selectedOptions,
    });
    if (res.data) {
      setSelectedOptions([]);
      setGroupName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
        <p className="text-xl font-semibold mb-4">Create New Chat</p>
        <form onSubmit={handleSubmit} className="flex gap-5 flex-col">
          <Input
            label="Name"
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />

          <div className="w-full">
            <label className="block w-full mb-2 font-semibold">
              Select Members
            </label>
            <select
              multiple
              value={selectedOptions}
              onChange={handleChange}
              className="p-2 border-none w-full outline-none overflow-y-auto">
              {users?.map((i) => (
                <option
                  className="py-1 cursor-pointer"
                  key={i._id}
                  value={i._id}>
                  {i?.fullName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 text-sm">
            <button type="button" onClick={onClose} className="btn-primary">
              Cancel
            </button>
            <button type="submit" className="btn-secondary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
