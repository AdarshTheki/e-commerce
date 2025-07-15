import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axios, errorHandler } from "../helper";
import { login } from "../redux/authSlice";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email, password, rememberMe) => {
    try {
      setLoading(true);
      if (!email || !password) {
        toast.error("Please fill in all fields.");
        return;
      }

      const { data } = await axios.post("/user/sign-in", { email, password });

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
      setLoading(false);
    }
  };

  return { loading, handleLogin };
};

export default useLogin;
