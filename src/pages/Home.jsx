import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import HeroCard from "../components/HeroCard";
import CountdownTimer from "../components/CountdownTimer";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Foydalanuvchi ma’lumotini olish
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    const initUser = tg?.initDataUnsafe?.user;
    if (initUser) {
      setUser({
        telegramId: initUser.id,
        first_name: initUser.first_name,
        username: initUser.username,
      });
    }
    setLoading(false);
  }, []);

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

  // 🔹 Yuklanmoqda
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black text-yellow-400">
        <div className="w-20 h-20 border-4 border-t-transparent border-yellow-400 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold">Ma’lumotlar yuklanmoqda...</p>
      </div>
    );

  // 🔹 Agar foydalanuvchi topilmasa
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

  const isPremium = user?.premium?.isActive;

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
              Premium foydalanuvchilar uchun
            </div>
          </div>
          <CountdownTimer targetDateISO={getMonthEndISO()} />
        </div>
      </div>
    </main>
  );
}

// 🔹 Oyni oxirigacha sanani olish
function getMonthEndISO() {
  const now = new Date();
  const end = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
  return end.toISOString();
}
