import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import PremiumCard from "../components/HeroCard";
import ReferralBox from "../components/ReferralBox";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready(); // ✅ Telegram WebApp tayyor holatga keltiramiz

    if (tg?.initDataUnsafe?.user) {
      // ✅ Telegram foydalanuvchi ma’lumotlari
      const telegramUser = tg.initDataUnsafe.user;
      const startParam = tg.initDataUnsafe?.start_param; // referral uchun

      loginOrRegister({
        telegramId: telegramUser.id,
        username: telegramUser.username,
        first_name: telegramUser.first_name,
        last_name: telegramUser.last_name,
        avatar: telegramUser.photo_url,
        referralCode: startParam, // agar referal orqali kirgan bo‘lsa
      });
    } else {
      // 🧪 Test rejimi (Telegram ichida bo‘lmaganda)
      loginOrRegister({
        telegramId: 9999,
        username: "test_user",
        first_name: "Test",
        last_name: "User",
        avatar: "/avatar-placeholder.png",
      });
    }
  }, []);

  // 🔹 Backend orqali login yoki register
  const loginOrRegister = async (userData) => {
    try {
      const res = await API.post("/telegram/login", userData);
      setUser(res.data.user);
    } catch (error) {
      console.error("❌ Login xatosi:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Yuklanmoqda...</div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen text-lg">Foydalanuvchi topilmadi</div>;
  }

  // 🔹 Referral havola
  const referralLink = `https://t.me/YourBotUsername?start=${user.referralCode}`;

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      <h1 className="text-2xl font-bold">👤 Profil</h1>

      {/* 🔹 Foydalanuvchi kartasi */}
      <div className="glass p-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || "/avatar-placeholder.png"}
            alt="avatar"
            className="w-16 h-16 rounded-full border border-white/10 shadow"
          />
          <div>
            <div className="font-semibold text-lg">
              {user.first_name || user.username}
            </div>
            {user.username && (
              <div className="text-xs text-gray-400">@{user.username}</div>
            )}
            <div className="text-xs mt-1">
              Premium holati:{" "}
              {user?.premium?.isActive ? (
                <span className="text-green-400">
                  Faol —{" "}
                  {new Date(user.premium.expiresAt).toLocaleDateString("uz-UZ")}
                  {" "}gacha
                </span>
              ) : (
                <span className="text-red-400">Faol emas</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Premium va Referral bo‘limlari */}
      <PremiumCard />
      <ReferralBox link={referralLink} />
    </div>
  );
}
