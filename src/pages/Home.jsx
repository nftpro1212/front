import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import HeroCard from "../components/HeroCard";
import CountdownTimer from "../components/CountdownTimer";

export default function Home() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Telegram WebApp orqali login
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();

    const startParam = tg?.initDataUnsafe?.start_param; // referral code (agar bo‘lsa)
    const telegramUser = tg?.initDataUnsafe?.user || {
      id: 123456,
      username: "test_user",
      first_name: "Test",
      last_name: "User",
      photo_url: "/avatar-placeholder.png",
    };

    const loginUser = async () => {
      try {
        const res = await API.post("/telegram/login", {
          telegramId: telegramUser.id,
          username: telegramUser.username,
          first_name: telegramUser.first_name,
          last_name: telegramUser.last_name,
          avatar: telegramUser.photo_url,
          referralCode: startParam || null,
        });

        setUser(res.data.user);

        if (res.data.user?.premium?.isActive) {
          setTheme("gold");
          document.body.classList.add("gold-theme");
        } else {
          document.body.classList.remove("gold-theme");
        }
      } catch (err) {
        console.error("❌ Login xatosi:", err.response?.data || err.message);
        setError("Foydalanuvchini yuklashda xato yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    loginUser();
  }, []);

  // 🔹 Premium tugmasi bosilganda adminga yo‘naltirish
  const handleSubscribe = async () => {
    try {
      const tgId = user.telegramId;
      const res = await API.post("/subscribe", { tgId });

      if (res.data.paymentUrl) {
        const tg = window.Telegram?.WebApp;
        if (tg?.openTelegramLink) {
          tg.openTelegramLink(res.data.paymentUrl);
        } else {
          window.location.href = res.data.paymentUrl;
        }
      } else {
        alert("To‘lov havolasi topilmadi!");
      }
    } catch (err) {
      console.error("❌ Obuna bo‘lishda xato:", err);
      alert("Server bilan bog‘lanishda xato yuz berdi!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-yellow-400 animate-pulse">
        ⏳ Yuklanmoqda...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-400">
        ❌ {error}
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-400">
        ❌ Foydalanuvchi topilmadi
      </div>
    );

  const premiumCount = 1842;
  const isPremium = user?.premium?.isActive;

  return (
    <main
      className={`max-w-2xl mx-auto px-4 pt-6 pb-20 space-y-6 transition-all ${
        theme === "gold"
          ? "bg-gradient-to-b from-yellow-100/10 to-yellow-900/10"
          : "bg-transparent"
      }`}
    >
      {/* 🟡 Premium karta */}
      <HeroCard
        isPremium={isPremium}
        onSubscribe={handleSubscribe}
        loading={loading}
      />

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
              {isPremium
                ? "Premium foydalanuvchilar uchun o‘yin"
               
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
