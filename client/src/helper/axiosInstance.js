import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  timeout: 50000,
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  // },
});

export default instance;
