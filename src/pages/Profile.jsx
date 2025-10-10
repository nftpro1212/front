import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import PremiumCard from "../components/HeroCard";
import ReferralBox from "../components/ReferralBox";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();

    const initUser = async () => {
      try {
        let telegramUser = tg?.initDataUnsafe?.user;
        const startParam = tg?.initDataUnsafe?.start_param; // referral code

        // 🧪 Agar Telegram WebApp orqali kirilmagan bo‘lsa — test ma’lumotlari
        if (!telegramUser) {
          telegramUser = {
            id: 9999,
            username: "test_user",
            first_name: "Test",
            last_name: "User",
            photo_url: "/avatar-placeholder.png",
          };
        }

        // 🔹 Login yoki register qilish
        const res = await API.post("/telegram/login", {
          telegramId: telegramUser.id,
          username: telegramUser.username,
          first_name: telegramUser.first_name,
          last_name: telegramUser.last_name,
          avatar: telegramUser.photo_url,
          referralCode: startParam || null, // agar referal orqali kirgan bo‘lsa
        });

        setUser(res.data.user);
      } catch (err) {
        console.error("❌ Login xatosi:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        ⏳ Yuklanmoqda...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        ❌ Foydalanuvchi topilmadi
      </div>
    );
  }

  // 🔹 Referral havolani to‘g‘ri formatda yaratamiz
 
const referralLink = `https://t.me/nft_userbot?start=${user.referralCode}`;
  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      <h1 className="text-2xl font-bold">👤 Profil</h1>

      {/* 🔹 Foydalanuvchi ma’lumotlari */}
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
                  {new Date(user.premium.expiresAt).toLocaleDateString("uz-UZ")}{" "}
                  gacha
                </span>
              ) : (
                <span className="text-red-400">Faol emas</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Premium va Referral komponentlari */}
      <PremiumCard />
      <ReferralBox link={referralLink} />
    </div>
  );
}
