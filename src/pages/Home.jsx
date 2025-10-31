import React from "react";
import HeroCard from "../components/HeroCard";
import CountdownTimer from "../components/CountdownTimer";

export default function Home() {
  // 🔹 Premium tugmasi bosilganda (example)
  const handleSubscribe = () => {
    alert("Premium funksiyasi shu yerga ulanadi!");
  };

  const isPremium = false; // Foydalanuvchi premium emas, login yo‘q

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
              {/* Bu yerga hozirgi o‘yin ma’lumotini qo‘yish mumkin */}
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
