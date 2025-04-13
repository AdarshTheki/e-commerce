import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  headers: { Authorization: ` Bearer ${localStorage.getItem("token")}` },
});

export default instance;
