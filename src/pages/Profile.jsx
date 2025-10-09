import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import PremiumCard from "../components/HeroCard";
import ReferralBox from "../components/ReferralBox";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    // 🔹 Agar Telegram WebApp orqali kelingan bo‘lsa
    if (tg?.initDataUnsafe?.user) {
      const telegramUser = tg.initDataUnsafe.user;
      loginOrRegister(telegramUser.id, telegramUser.username);
    } else {
      // 🔹 Test rejimida (Telegram bo‘lmaganda)
      loginOrRegister(9999, "test_user");
    }
  }, []);

  // 🔹 Avtomatik login yoki ro‘yxatdan o‘tish
  const loginOrRegister = async (telegramId, username) => {
    try {
      const res = await API.post("/auth/login", { telegramId, username });
      setUser(res.data.user);
    } catch (error) {
      console.error("Login xatosi:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Yuklanmoqda...</div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Foydalanuvchi topilmadi</div>;
  }

  const referralLink = `https://t.me/YourBot?start=ref_${user._id}`;

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      <h1 className="text-2xl font-bold">👤 Profil</h1>

      <div className="glass p-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <img
            src="/avatar-placeholder.png"
            alt="avatar"
            className="w-16 h-16 rounded-full border border-white/6"
          />
          <div>
            <div className="font-semibold text-lg">{user.username}</div>
            <div className="text-xs text-gray-400">@{user.username}</div>
            <div className="text-xs mt-1">
              Premium holati:{" "}
              {user.premium.isActive ? (
                <span className="text-green-400">
                  Faol — {new Date(user.premium.expiresAt).toLocaleDateString()} gacha
                </span>
              ) : (
                <span className="text-red-400">Faol emas</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Premium karta */}
      <PremiumCard />

      {/* Referral */}
      <ReferralBox link={referralLink} />
    </div>
  );
}
