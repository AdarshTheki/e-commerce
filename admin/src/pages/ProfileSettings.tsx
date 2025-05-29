/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { RootState } from "../redux/store";
import axiosInstance from "../constant/axiosInstance";
import useTitle from "../hooks/useTitle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="p-4 flex flex-col gap-10 mx-auto max-w-screen-sm">
      <AvatarComponent />
      <div>
        <SectionsComponent />
        <div className="mt-5">
          <h2 className="text-xl font-semibold text-gray-700 py-2">
            Do you want to logout this current user ?
          </h2>
          <Button variant="destructive" onClick={logoutHandler}>
            Logout
          </Button>
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
        {avatar?.toString()?.length ? (
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

      <Input
        onChange={handleUploadAvatar}
        type="file"
        className="w-fit max-w-[200px] mt-5"
      />
    </div>
  );
};

const SectionsComponent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
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
    } catch (error: any) {
      toast.error(JSON.stringify(error.response.data.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="grid gap-4 flex-1" onSubmit={onSettingsSubmit}>
        <Input
          value={formData.fullName}
          onChange={handleChange}
          name="fullName"
          required
        />
        <Input
          value={formData.email}
          onChange={handleChange}
          name="email"
          required
        />
        <Button
          variant="secondary"
          disabled={
            loading ||
            (user?.email === formData.email &&
              user?.fullName === formData.fullName)
          }>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>

      <form
        onSubmit={handlePasswordSubmit}
        className="space-y-3 text-gray-700 flex flex-col">
        <h2 className="text-xl font-bold pt-8 pb-2">Password Change</h2>
        <Input
          name="oldPassword"
          value={password.oldPassword}
          onChange={(e) =>
            setPassword({ ...password, oldPassword: e.target.value })
          }
        />
        <Input
          name="newPassword"
          value={password.newPassword}
          onChange={(e) =>
            setPassword({ ...password, newPassword: e.target.value })
          }
        />
        <Button
          variant="secondary"
          type="submit"
          disabled={isLoading || password.newPassword.length < 5}>
          {isLoading ? "Saving..." : "Save Change"}
        </Button>
      </form>
    </div>
  );
};
