import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import API from "./api/axiosInstance";

function App() {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    async function loginTelegramUser() {
      if (user) {
        console.log("✅ Telegram foydalanuvchisi:", user);
        const telegramId = user.id;
        const firstName = user.first_name;
        const lastName = user.last_name;
        const username = user.username;

        try {
          const res = await API.post("/auth/login", {
            telegramId,
            firstName,
            lastName,
            username,
          });

          console.log("Login muvaffaqiyatli:", res.data);
        } catch (err) {
          console.error("❌ Login xatosi:", err.response?.data || err.message);
        }
      } else {
        console.warn("⚠️ Telegram foydalanuvchi ma’lumoti topilmadi (test rejimi)");
      }
    }

    loginTelegramUser();
  }, []);

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
        <div className="flex-grow overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
