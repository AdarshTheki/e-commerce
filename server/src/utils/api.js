import axios from "axios";

export const sportsApi = axios.create({
  baseURL: `${process.env.SUPER_NODE_URL}api/`,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const openaiInstance = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});

export const haggingaiInstance = axios.create({
  baseURL: "https://router.huggingface.co/together/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
  },
});
