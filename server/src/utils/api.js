import axios from "axios";

export const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_URL}`,
  },
});

export const haggingFace = axios.create({
  baseURL: "https://router.huggingface.co/together/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
  },
});
