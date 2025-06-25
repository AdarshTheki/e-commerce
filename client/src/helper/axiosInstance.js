import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  timeout: 120000,
  headers: { Authorization: ` Bearer ${localStorage.getItem("token")}` },
});

export default instance;
