import React, { useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import CountdownTimer from "../components/CountdownTimer";

export default function Home() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("default");
  const premiumCount = 1842;

  useEffect(() => {
    // Telegram foydalanuvchisini olish (test rejimi uchun)
    const fakeUser = {
      username: "ozod_dev",
      premium: {
        isActive: true, // ← bu joyni false qilib sinab ko‘rish mumkin
        endDate: "2025-10-30T23:59:59Z",
      },
    };
    setUser(fakeUser);

    if (fakeUser.premium?.isActive) {
      setTheme("gold");
      document.body.classList.add("gold-theme");
    } else {
      document.body.classList.remove("gold-theme");
    }
  }, []);

  if (!user) return <div className="text-center pt-20">⏳ Yuklanmoqda...</div>;

  return (
    <main
      className={`max-w-2xl mx-auto px-4 pt-6 pb-20 space-y-6 transition-all ${
        theme === "gold"
          ? "bg-gradient-to-b from-yellow-100/10 to-yellow-900/10"
          : "bg-transparent"
      }`}
    >
      {/* 🔹 Premium karta */}
      <HeroCard />

      {/* 🔹 Asosiy bo‘lim */}
      <div
        className={`p-4 rounded-2xl space-y-4 transition-all duration-300 ${
          theme === "gold"
            ? "bg-gradient-to-br from-yellow-400/20 to-yellow-700/10 border border-yellow-500/30 shadow-lg"
            : "glass"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-300">Keyingi o‘yin</div>
            <div
              className={`font-semibold text-lg ${
                theme === "gold" ? "text-yellow-300" : "text-white"
              }`}
            >
              
            </div>
          </div>
          <CountdownTimer targetDateISO={getMonthEndISO()} />
        </div>
      </div>
    </main>
  );
}

// 🔹 Oyni oxirigacha sanasi
function getMonthEndISO() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  return end.toISOString();
}
