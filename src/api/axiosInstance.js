import axios from "axios";

// 🔹 Backend manziling
const API = axios.create({
  baseURL: "https://backend-m6u1.onrender.com",
});

// 🔹 Telegram login funksiyasi
export const telegramLogin = (userData) => API.post("/api/auth/login", userData);

export default API;
