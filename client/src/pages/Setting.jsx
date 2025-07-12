import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { axios, errorHandler } from "../helper";
import { Input } from "../utils";
import { login } from "../redux/authSlice";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [email, setEmail] = useState(user?.email || "");
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [fullNameAndEmailLoading, setFullNameAndEmailLoading] = useState(false);

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleFullNameAndEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !fullName) return;
      setFullNameAndEmailLoading(true);
      const response = await axios.patch("/user/update", { email, fullName });
      if (response.data) {
        dispatch(login({ ...user, email, fullName }));
        toast.success("user update success");
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setFullNameAndEmailLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || oldPassword !== newPassword) return;
    setPasswordLoading(true);
    try {
      const response = await axios.post("/user/password", {
        oldPassword,
        newPassword,
      });
      if (response.data) toast.success("password update");
    } catch (error) {
      errorHandler(error);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleUploadAvatar = async (e) => {
    setAvatarLoading(true);
    try {
      if (e.target.files && e.target.files[0]) {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);
        const res = await axios.post("/user/avatar", formData);
        if (res.data) {
          toast.success("upload avatar");
          dispatch(login({ ...user, avatar: res.data.avatar }));
          setAvatar(res.data.avatar);
        }
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleLogoutUser = async () => {
    try {
      const response = await axios.post("/user/logout");
      if (response.data) window.location.href = "/";
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4 mx-auto max-w-screen-md">
      {/* Profile Avatar */}
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
            {avatarLoading ? "Uploading..." : "Upload Avatar"}
          </label>
          <Input
            onChange={handleUploadAvatar}
            type="file"
            id="upload-avatar"
            className="hidden"
          />
        </div>
      </div>

      {/* FullName and Email Change */}
      <form
        className="grid gap-4 flex-1 card"
        onSubmit={handleFullNameAndEmailSubmit}>
        <h2 className="text-lg font-bold pt-4 pb-2">User Information</h2>
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          name="fullName"
          label="fullName"
          required
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          label="email"
          required
        />
        <button
          className="btn bg-indigo-600 text-white disabled:bg-indigo-300"
          disabled={
            fullNameAndEmailLoading ||
            (user?.email === email && user?.fullName === fullName)
          }>
          {fullNameAndEmailLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Password change */}

      <form
        onSubmit={handlePasswordSubmit}
        className="space-y-3 card flex flex-col">
        <h2 className="text-lg font-bold pt-4 pb-2">Password Change</h2>
        <Input
          name="oldPassword"
          label="oldPassword"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          name="newPassword"
          label="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          className="btn bg-indigo-600 text-white disabled:bg-indigo-300"
          type="submit"
          disabled={passwordLoading || newPassword.length < 5}>
          {passwordLoading ? "Saving..." : "Save Change"}
        </button>
      </form>

      <button className="btn-primary" onClick={handleLogoutUser}>
        Logout
      </button>
    </div>
  );
};
export default ProfileSettings;
