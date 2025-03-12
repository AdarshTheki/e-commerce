import axios from "axios";
import { baseUrl } from "./constant";

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  headers: { Authorization: ` Bearer ${localStorage.getItem("token")}` },
});

export default instance;
