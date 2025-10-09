import React, { useEffect, useState } from "react";
import PremiumCard from "../components/HeroCard"; // Premium kartasi
import ReferralBox from "../components/ReferralBox";
import API from "../api/axiosInstance"; // Backend bilan bog‘lanish

export default function Profile() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  // Telegram WebApp foydalanuvchisini olish
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const telegramUser = tg.initDataUnsafe.user;
      handleLogin(telegramUser);
    } else {
      // Test rejimida
      handleLogin({ id: 12345, username: "ozod_test" });
    }
  }, []);

  // Backendga login yuborish
  const handleLogin = async (tgUser) => {
    try {
      const { data } = await API.post("/auth/login", {
        telegramId: tgUser.id,
        username: tgUser.username || "unknown",
      });
      setUser(data.user);

      // Premium holatini olish
      const sub = await API.get(`/subscription/${tgUser.id}`);
      setSubscription(sub.data.subscription);
    } catch (err) {
      console.error("Login xatosi:", err);
    } finally {
      setLoading(false);
    }
  };

  // Premium sotib olishni boshlash
  const handleBuyPremium = async () => {
    try {
      const { data } = await API.post(`/subscription/${user.telegramId}`);
      setSubscription(data.subscription);
      alert("✅ Premium muvaffaqiyatli faollashtirildi!");
    } catch (err) {
      console.error("Premium olishda xato:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Yuklanmoqda...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Foydalanuvchi topilmadi ❌
      </div>
    );
  }

  const referralLink = `https://t.me/YourBot?start=ref_${user._id}`;

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      <h1 className="text-2xl font-bold">👤 Profil</h1>

      {/* Foydalanuvchi kartasi */}
      <div className="glass p-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <img
            src="/avatar-placeholder.png"
            alt="avatar"
            className="w-16 h-16 rounded-full border border-white/6"
          />
          <div>
            <div className="font-semibold text-lg">
              {user.username || "Foydalanuvchi"}
            </div>
            <div className="text-xs text-gray-400">@{user.username}</div>
            <div className="text-xs mt-1">
              Premium holati:{" "}
              {subscription?.isActive ? (
                <span className="text-green-400">
                  Faol — {new Date(subscription.expiresAt).toLocaleDateString()} gacha
                </span>
              ) : (
                <span className="text-red-400">Faol emas</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Premium karta */}
      {!subscription?.isActive ? (
        <PremiumCard onBuy={handleBuyPremium} />
      ) : (
        <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-3 text-green-300 text-sm">
          Siz Premium foydalanuvchisiz 🎉
        </div>
      )}

      {/* Referral qutisi */}
      <ReferralBox link={referralLink} />
    </div>
  );
}
