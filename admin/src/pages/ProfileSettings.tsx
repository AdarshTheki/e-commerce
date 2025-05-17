import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Input } from "../utils";
import { RootState } from "../redux/store";
import axiosInstance from "../constant/axiosInstance";
import useTitle from "../hooks/useTitle";
import { AxiosError } from "axios";

const ProfileSettings = () => {
  useTitle(`Cartify: profile details`);

  const logoutHandler = async () => {
    try {
      const res = await axiosInstance.post("/user/logout");
      if (res.data) {
        toast.success("user logout success");
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <div className="p-6 flex gap-6">
        <AvatarComponent />
        <div>
          <SectionsComponent />
          <div className="mt-5">
            <h2 className="text-xl font-semibold text-gray-700 py-2">
              Do you want to logout this current user ?
            </h2>
            <button
              onClick={logoutHandler}
              className="btn bg-red-600 text-white">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileSettings;

const AvatarComponent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [avatar, setAvatar] = useState<string | File>(user?.avatar || "");
  const [loading, setLoading] = useState(false);

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      if (e.target.files && e.target.files.length > 0) {
        const formData = new FormData();
        formData.append("avatar", e.target.files[0]);
        const res = await axiosInstance.post("/user/avatar", formData);
        if (res.data) {
          toast.success("upload avatar image succeed");
          console.log(res.data);
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
    <div className="flex flex-col items-center">
      <div className="w-32 relative h-32 rounded-full border-4 border-neutral-600/30 overflow-hidden">
        {loading && (
          <span className=" absolute inset-0 flex items-center justify-center bg-neutral-600/70">
            <svg
              className="animate-spin h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}
        {avatar ? (
          <img
            src={avatar}
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

      <label className="mt-4 flex flex-col gap-4 cursor-pointer px-4 py-2 rounded-md">
        <small>JPG, GIF and PNG Max Size of 2MB</small>
        <input
          onChange={handleUploadAvatar}
          type="file"
          name="images"
          className="w-[180px] p-2 cursor-pointer hover:bg-indigo-200 border border-gray-300 rounded-lg text-sm"
        />
      </label>
    </div>
  );
};

const SectionsComponent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSettingsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.patch("/user/update", formData);
      if (response.data) toast.success("user update success");
    } catch (error) {
      console.log(error);
      toast.error("user update failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/user/password", {
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
      <form className="grid gap-4 flex-1" onSubmit={onSettingsSubmit}>
        <div className="flex gap-4">
          <Input
            value={formData.firstName}
            onChange={handleChange}
            name="firstName"
            label="First Name"
            required
          />
          <Input
            value={formData.lastName}
            onChange={handleChange}
            name="lastName"
            label="Last Name"
            required
          />
        </div>
        <Input
          value={formData.username}
          onChange={handleChange}
          name="username"
          label="username"
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
          disabled={
            loading ||
            (user?.email === formData.email &&
              user?.username === formData.username &&
              user?.firstName === formData.firstName &&
              user?.lastName === formData.lastName)
          }
          type="submit"
          className="btn bg-indigo-600 text-white w-fit disabled:bg-indigo-400">
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <form onSubmit={handlePasswordSubmit}>
        <h2 className="text-xl font-bold pt-8 pb-2 text-gray-700">Security</h2>
        <Input
          name="oldPassword"
          label="old password"
          value={password.oldPassword}
          onChange={(e) =>
            setPassword({ ...password, oldPassword: e.target.value })
          }
        />
        <Input
          name="newPassword"
          label="new password"
          value={password.newPassword}
          onChange={(e) =>
            setPassword({ ...password, newPassword: e.target.value })
          }
        />
        <button
          type="submit"
          disabled={isLoading || password.newPassword.length < 5}
          className="mt-5 bg-indigo-600 text-white btn disabled:bg-indigo-400">
          {isLoading ? "Saving..." : "Save Change"}
        </button>
      </form>
    </div>
  );
};
