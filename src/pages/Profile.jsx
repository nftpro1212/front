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

    const startParam = tg?.initDataUnsafe?.start_param; // 🔹 referralCode shu yerda
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
      } catch (err) {
        console.error("❌ Login xatosi:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    loginUser();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-yellow-400 animate-pulse">
        ⏳ Yuklanmoqda...
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-400">
        ❌ Foydalanuvchi topilmadi
      </div>
    );

  // ✅ Telegram WebApp uchun to‘g‘ri referral havola
  const referralLink = `https://t.me/nft_userrbot?startapp=${user.referralCode}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#000000] text-white px-4 py-10 md:py-16">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* 🧑‍💻 Foydalanuvchi ma’lumotlari */}
        <div className="relative glassy p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-yellow-400/20 shadow-[0_0_20px_rgba(255,215,0,0.15)]">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar || "/avatar-placeholder.png"}
              alt="avatar"
              className="w-16 h-16 rounded-full border border-yellow-400/30 shadow-[0_0_15px_rgba(255,215,0,0.2)]"
            />
            <div>
              <div className="font-semibold text-xl text-yellow-300">
                {user.first_name || user.username}
              </div>
              {user.username && (
                <div className="text-xs text-gray-400">@{user.username}</div>
              )}
              <div className="text-xs mt-2">
                Premium holati:{" "}
                {user?.premium?.isActive ? (
                  <span className="text-green-400 font-semibold">
                    ✅ Faol —{" "}
                    {new Date(user.premium.expiresAt).toLocaleDateString("uz-UZ")}
                  </span>
                ) : (
                  <span className="text-red-400 font-semibold">❌ Faol emas</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 🌟 Premium va Referral bloklari */}
        <PremiumCard />

        {/* 🔗 ReferralBox uchun havola */}
        <ReferralBox link={referralLink} referralCode={user.referralCode} />
      </div>
    </div>
  );
}
