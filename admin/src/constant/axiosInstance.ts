import axios from "axios";

export const base_url = "http://localhost:8000/api/v1";

const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bears ${localStorage.getItem("token")}`,
  },
});

export default axiosInstance;
