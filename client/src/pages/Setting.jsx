import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { axios } from "../helper";
import { Input } from "../utils";

const ProfileSettings = () => {
  return (
    <div className="p-4 flex flex-col gap-10 mx-auto max-w-screen-sm">
      <AvatarComponent />
      <SectionsComponent />
    </div>
  );
};
export default ProfileSettings;

const AvatarComponent = () => {
  const user = useSelector((state) => state.auth.user);
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);

  const handleUploadAvatar = async (e) => {
    setLoading(true);
    try {
      if (e.target.files && e.target.files[0]) {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);
        const res = await axios.post("/user/avatar", formData);
        if (res.data) {
          toast.success("upload avatar image succeed");
          setAvatar(res.data.avatar);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-lg font-bold pb-4">Profile Avatar</h2>
      <div className="flex items-center gap-4">
        <div className="w-32 relative h-32 rounded-full mb-4 overflow-hidden border">
          {avatar ? (
            <img
              src={avatar.toString()}
              alt="Profile"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <img
              src={user?.avatar || "https://avatar.iran.liara.run/public"}
              alt="Profile"
              className="w-full h-full object-cover transition-opacity duration-300 opacity-100"
              loading="lazy"
            />
          )}
        </div>

        <label htmlFor="upload-avatar" className="btn-primary">
          {loading ? "Uploading..." : "Upload Avatar"}
        </label>
        <Input
          onChange={handleUploadAvatar}
          type="file"
          id="upload-avatar"
          className="hidden"
        />
      </div>
    </div>
  );
};

const SectionsComponent = () => {
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.patch("/user/update", formData);
      if (response.data) toast.success("user update success");
    } catch (error) {
      console.log(error);
      toast.error("user update failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/user/password", {
        ...password,
      });
      if (response.data) toast.success("password update success");
    } catch (error) {
      toast.error(JSON.stringify(error.response.data.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="grid gap-4 flex-1 card mb-4" onSubmit={onSettingsSubmit}>
        <h2 className="text-lg font-bold pt-4 pb-2">User Information</h2>
        <Input
          value={formData.fullName}
          onChange={handleChange}
          name="fullName"
          label="fullName"
          required
        />
        <Input
          value={formData.email}
          onChange={handleChange}
          name="email"
          label="email"
          required
        />
        <button
          className="btn bg-indigo-600 text-white disabled:bg-indigo-300"
          disabled={
            loading ||
            (user?.email === formData.email &&
              user?.fullName === formData.fullName)
          }>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <form
        onSubmit={handlePasswordSubmit}
        className="space-y-3 card flex flex-col">
        <h2 className="text-lg font-bold pt-4 pb-2">Password Change</h2>
        <Input
          name="oldPassword"
          label="oldPassword"
          value={password.oldPassword}
          onChange={(e) =>
            setPassword({ ...password, oldPassword: e.target.value })
          }
        />
        <Input
          name="newPassword"
          label="newPassword"
          value={password.newPassword}
          onChange={(e) =>
            setPassword({ ...password, newPassword: e.target.value })
          }
        />
        <button
          className="btn bg-indigo-600 text-white disabled:bg-indigo-300"
          type="submit"
          disabled={isLoading || password.newPassword.length < 5}>
          {isLoading ? "Saving..." : "Save Change"}
        </button>
      </form>
    </div>
  );
};
