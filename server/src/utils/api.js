import axios from "axios";

export const sportsApi = axios.create({
  baseURL: `${process.env.SUPER_NODE_URL}api/`,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});
