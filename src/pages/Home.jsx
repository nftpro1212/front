import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import HeroCard from "../components/HeroCard";
import CountdownTimer from "../components/CountdownTimer";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Login (Telegram orqali)
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();

    const startParam = tg?.initDataUnsafe?.start_param; // Referral code
    const telegramUser = tg?.initDataUnsafe?.user || {
      id: 123456,
      username: "test_user",
      first_name: "Test",
      last_name: "User",
      photo_url: "/avatar-placeholder.png",
    };

    const loginUser = async () => {
      try {
        const res = await API.post("/login", {
          telegramId: telegramUser.id,
          username: telegramUser.username,
          first_name: telegramUser.first_name,
          last_name: telegramUser.last_name,
          avatar: telegramUser.photo_url,
          referralCode: startParam || null,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("❌ Login xatosi:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    loginUser();
  }, []);

  // 🔹 Yuklanmoqda holati
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black text-yellow-400">
        <div className="w-20 h-20 border-4 border-t-transparent border-yellow-400 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold">Ma’lumotlar yuklanmoqda...</p>
      </div>
    );

  // 🔹 Agar foydalanuvchi aniqlanmasa
  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-yellow-300">
        <h2 className="text-2xl font-semibold">Xatolik</h2>
        <p className="mt-3 text-lg">🔁 Qayta urinib ko‘ring</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
          Qayta yuklash
        </button>
      </div>
    );

  // 🔹 Premium tugmasi bosilganda
  const handleSubscribe = async () => {
    try {
      const res = await API.post("/subscribe", { tgId: user.telegramId });
      if (res.data.paymentUrl) {
        const tg = window.Telegram?.WebApp;
        if (tg?.openTelegramLink) tg.openTelegramLink(res.data.paymentUrl);
        else window.location.href = res.data.paymentUrl;
      } else {
        alert("To‘lov havolasi topilmadi!");
      }
    } catch (err) {
      console.error("❌ Obuna bo‘lishda xato:", err);
      alert("Server bilan bog‘lanishda xato yuz berdi!");
    }
  };

  // 🔹 Oyni oxirigacha sanani olish
  const getMonthEndISO = () => {
    const now = new Date();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return end.toISOString();
  };

  const isPremium = user?.premium?.isActive;

  // 🔹 Asosiy sahifa
  return (
    <main className="max-w-2xl mx-auto px-4 pt-6 pb-20 space-y-6">
      {/* 🟡 Premium karta */}
      <HeroCard isPremium={isPremium} onSubscribe={handleSubscribe} />

      {/* 🔹 Asosiy bo‘lim */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-700/10 border border-yellow-500/30 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-300">Keyingi o‘yin</div>
            <div className="font-semibold text-lg text-yellow-300">
              {/* Bu joyda sana yoki event nomi bo‘lishi mumkin */}
            </div>
          </div>
          <CountdownTimer targetDateISO={getMonthEndISO()} />
        </div>
      </div>
    </main>
  );
}
