import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-m6u1.onrender.com",
});

// 🔹 Telegram login
export const telegramLogin = (userData) => API.post("/auth/login", userData);

export default API;
