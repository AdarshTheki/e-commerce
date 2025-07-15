import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axios, errorHandler } from "../helper";
import { login, logout } from "../redux/authSlice";

const useSettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [avatarLoading, setAvatarLoading] = useState(false);
  const [fullNameAndEmailLoading, setFullNameAndEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleUpdateProfile = async (email, fullName) => {
    try {
      setFullNameAndEmailLoading(true);
      const { data } = await axios.patch("/user/update", { email, fullName });
      if (data) {
        dispatch(login({ ...user, email, fullName }));
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setFullNameAndEmailLoading(false);
    }
  };

  const handleChangePassword = async (oldPassword, newPassword) => {
    try {
      setPasswordLoading(true);
      const { data } = await axios.post("/user/password", { oldPassword, newPassword });
      if (data) {
        toast.success("Password updated successfully!");
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleUploadAvatar = async (file) => {
    try {
      setAvatarLoading(true);
      const formData = new FormData();
      formData.append("avatar", file);
      const { data } = await axios.post("/user/avatar", formData);
      if (data) {
        dispatch(login({ ...user, avatar: data.avatar }));
        toast.success("Avatar updated successfully!");
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/user/logout");
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      dispatch(logout());
      toast.success("Logged out successfully!");
    } catch (error) {
      errorHandler(error);
    }
  };

  return {
    user,
    avatarLoading,
    fullNameAndEmailLoading,
    passwordLoading,
    handleUpdateProfile,
    handleChangePassword,
    handleUploadAvatar,
    handleLogout,
  };
};

export default useSettings;
