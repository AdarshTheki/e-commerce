import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axios, errorHandler } from "../helper";
import { login, logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [avatarLoading, setAvatarLoading] = useState(false);
  const [fullNameAndEmailLoading, setFullNameAndEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleLogin = async (email, password, rememberMe) => {
    try {
      setLoginLoading(true);
      if (!email || !password) {
        toast.error("Please fill in all fields.");
        return;
      }

      const res = await axios.post("/user/sign-in", { email, password });
      const data = res?.data?.data;
      if (data) {
        if (rememberMe) {
          localStorage.setItem("accessToken", data.accessToken);
        } else {
          sessionStorage.setItem("accessToken", data.accessToken);
        }
        dispatch(login(data.user));
        toast.success("Login successful!");
        navigate("/", { replace: true });
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (fullName, email, password, confirmPassword) => {
    try {
      setRegisterLoading(true);
      if (!fullName || !email || !password || !confirmPassword) {
        toast.error("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      const { data } = await axios.post("/user/sign-up", {
        fullName,
        email,
        password,
        role: "customer",
      });

      if (data) {
        const res = await axios.post("/user/sign-in", { email, password });
        const data = res?.data?.data;
        if (data) {
          localStorage.setItem("accessToken", data.accessToken);
          dispatch(login(data.user));
          toast.success("Registration successful!");
          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleUpdateProfile = async (email, fullName, phoneNumber) => {
    try {
      setFullNameAndEmailLoading(true);
      const res = await axios.patch("/user/update", {
        email,
        fullName,
        phoneNumber,
      });
      const data = res?.data?.data;
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
      const res = await axios.post("/user/password", {
        oldPassword,
        newPassword,
      });
      const data = res?.data?.data;
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
      const res = await axios.post("/user/avatar", formData);
      const data = res?.data?.data;
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
    registerLoading,
    loginLoading,
    handleUpdateProfile,
    handleChangePassword,
    handleUploadAvatar,
    handleLogout,
    handleRegister,
    handleLogin,
  };
};

export default useAuth;
