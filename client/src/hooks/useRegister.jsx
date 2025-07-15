import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axios, errorHandler } from "../helper";
import { login } from "../redux/authSlice";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (fullName, email, password, confirmPassword) => {
    try {
      setLoading(true);
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
        const loginResponse = await axios.post("/user/sign-in", { email, password });
        if (loginResponse.data) {
          localStorage.setItem("accessToken", loginResponse.data.accessToken);
          dispatch(login(loginResponse.data.user));
          toast.success("Registration successful!");
          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleRegister };
};

export default useRegister;
