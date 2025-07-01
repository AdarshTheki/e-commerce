import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { RootState } from "../redux/store";
import { login, logout } from "../redux/authSlice";
import { Input } from "@/components/ui/input";
import { axios, errorHandler } from "@/constant";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [email, setEmail] = useState(user?.email || "");
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [fullNameAndEmailLoading, setFullNameAndEmailLoading] = useState(false);

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleFullNameAndEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email || !fullName) return;
      setFullNameAndEmailLoading(true);
      const response = await axios.patch("/user/update", { email, fullName });
      if (response.data) {
        if (user && user._id) {
          dispatch(login({ ...user, email, fullName, _id: user._id }));
        }
        toast.success("user update success");
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    } finally {
      setFullNameAndEmailLoading(false);
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.post("/user/logout");
      if (res.data) {
        localStorage.removeItem("token");
        dispatch(logout());
        window.location.href = "/";
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
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
      errorHandler(error as AxiosError);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarLoading(true);
    try {
      if (e.target.files && e.target.files[0]) {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);
        const res = await axios.post("/user/avatar", formData);
        if (res.data) {
          toast.success("upload avatar");
          if (user && user._id) {
            dispatch(login({ ...user, avatar: res.data.avatar }));
          }
          setAvatar(res.data.avatar);
        }
      }
    } catch (error) {
      errorHandler(error as AxiosError);
    } finally {
      setAvatarLoading(false);
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
          required
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
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
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          name="newPassword"
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

      <button className="btn text-red-600 font-bold" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default ProfileSettings;
