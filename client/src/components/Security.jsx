import React, { useState } from "react";
import { Input } from "../utils";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../helper/constant";

const Security = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSecuritySubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = formData;

    if (oldPassword === newPassword || !newPassword || !oldPassword)
      return toast.error("please enter a valid password");

    try {
      setLoading(true);
      const response = await axios.post(
        baseUrl + "/api/v1/user/change-password",
        {
          oldPassword,
          newPassword,
        }
      );
      if (response.data) {
        setFormData({ ...formData, oldPassword: "", newPassword: "" });
        toast.success("your password change succeed");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid gap-5 mt-5" onSubmit={onSecuritySubmit}>
      <Input
        name="oldPassword"
        value={formData.oldPassword}
        onChange={handleChange}
        label="Old Password"
      />
      <Input
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        label="New Password"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 rounded-md text-white">
        {loading ? "loading..." : "Save Changes"}
      </button>
    </form>
  );
};

export default Security;
