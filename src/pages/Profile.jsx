import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();

    const startParam = tg?.initDataUnsafe?.start_param; // 🔹 referralCode shu yerda
    const telegramUser = tg?.initDataUnsafe?.user || {
      id: 123456,
      username: "test_user",
      first_name: "Test",
      last_name: "User",
      photo_url: "/avatar.png",
    };

    async function login() {
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
      } catch (err) {
        console.error("Login xatosi:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    }

    login();
  }, []);

  if (loading) return <div className="text-center mt-20">⏳ Yuklanmoqda...</div>;
  if (!user) return <div className="text-center mt-20 text-red-400">❌ Foydalanuvchi topilmadi</div>;

  const referralLink = `https://t.me/nft_userrbot/app?startapp=${user.referralCode}`;

  return (
    <div className="p-6 text-white max-w-md mx-auto space-y-4">
      <div className="bg-yellow-900/20 border border-yellow-400/30 p-4 rounded-2xl text-center">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full mx-auto border border-yellow-400 shadow"
        />
        <h2 className="mt-2 text-xl font-bold text-yellow-300">{user.first_name}</h2>
        <p className="text-sm text-gray-400">@{user.username}</p>

        <div className="mt-3 text-sm">
          <b>Referral kodingiz:</b> <span className="text-yellow-400">{user.referralCode}</span>
        </div>
        <input
          type="text"
          value={referralLink}
          readOnly
          className="mt-2 w-full bg-yellow-800/10 border border-yellow-500/20 rounded-lg p-2 text-sm text-yellow-200"
        />
      </div>
    </div>
  );
}
