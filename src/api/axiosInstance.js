import axios from "axios";
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔹 Telegram login
export const telegramLogin = (userData) => API.post("/auth/login", userData);

export default API;