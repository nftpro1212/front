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

    const startParam = tg?.initDataUnsafe?.start_param; // 🔹 referralCode
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

  // ✅ Telegram WebApp uchun referral havola
  const referralLink = `https://t.me/I00K_Club_bot/premium?startapp=${user.referralCode}`;

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

  // ✅ Guruh va kanal linklari
  const groupLink = "https://t.me/I00K_Clubchat";
  const channelLink = "https://t.me/klub_100k";

  const joinGroup = () => {
    const tg = window.Telegram?.WebApp;
    if (tg?.openTelegramLink) tg.openTelegramLink(groupLink);
    else window.open(groupLink, "_blank");
  };

  const joinChannel = () => {
    const tg = window.Telegram?.WebApp;
    if (tg?.openTelegramLink) tg.openTelegramLink(channelLink);
    else window.open(channelLink, "_blank");
  };

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

        {/* 🌟 PremiumCard */}
        <PremiumCard
          isPremium={user?.premium?.isActive}
          onSubscribe={handleSubscribe}
          loading={loading}
        />

        {/* 🔗 ReferralBox */}
        <ReferralBox link={referralLink} referralCode={user.referralCode} />

        {/* 📢 Kanal va guruhga qo‘shilish */}
        <div className="bg-white/5 p-5 rounded-2xl border border-yellow-400/20 backdrop-blur-md text-center space-y-4 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
          <h3 className="text-lg font-semibold text-yellow-300">
            📢 Bizning hamjamiyatga qo‘shiling!
          </h3>
          <p className="text-gray-300 text-sm">
            Yangiliklar, bonuslar va o‘yinlar haqida birinchi bo‘lib bilish uchun
            rasmiy kanal va guruhimizga qo‘shiling 👇
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
            <button
              onClick={joinChannel}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-lg transition-all"
            >
              📣 Kanalga qo‘shilish
            </button>
            <button
              onClick={joinGroup}
              className="bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 font-semibold px-5 py-2 rounded-lg border border-yellow-400/30 transition-all"
            >
              💬 Guruhga qo‘shilish
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
