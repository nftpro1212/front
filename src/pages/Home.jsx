import React, { useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import CountdownTimer from "../components/CountdownTimer";
import ProgressGoal from "../components/ProgressGoal";
import ReferralBox from "../components/ReferralBox";
import WinnersCarousel from "../components/WinnersCarousel";
import BenefitsGrid from "../components/BenefitsGrid";
import LiveFeed from "../components/LiveFeed";
import FAQAccordion from "../components/FAQAccordion";
import NotificationBanner from "../components/NotificationBanner";

export default function Home() {
  const [showNotif, setShowNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const premiumCount = 1842;
  const winners = [
    { name: "Jasur", prize: "BMW 5 Series", avatar: "/avatar1.jpg", note: "1-oktabr g'olibi" },
    { name: "Madina", prize: "iPhone 15", avatar: "/avatar2.jpg", note: "27-sentabr g'olibi" },
  ];
  const events = [
    "Dilshod premiumga o'tdi",
    "Jasur 3 do'stini taklif qildi",
    "Lola Gold darajaga chiqdi",
  ];

  // ✅ Telegram WebApp orqali foydalanuvchini olish
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg?.initDataUnsafe?.user) {
      const telegramUser = tg.initDataUnsafe.user;
      loginOrRegister(telegramUser);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        loginOrRegister({ id: 9999, username: "test_user" }); // Test
      }
    }
  }, []);

  // 🔹 Login yoki Register
  const loginOrRegister = async (telegramUser) => {
    try {
      const response = await fetch("https://backend-m6u1.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tgId: telegramUser.id,
          username: telegramUser.username || "no_username",
          first_name: telegramUser.first_name,
          last_name: telegramUser.last_name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        console.error("Login muvaffaqiyatsiz:", data.message);
      }
    } catch (error) {
      console.error("Login xatosi:", error);
    } finally {
      setLoading(false);
    }
  };

  // 💳 Premiumga obuna bo‘lish – sotuvchiga yo‘naltirish
  const handleSubscribe = async () => {
    if (!user) return;

    try {
      const res = await fetch("https://backend-m6u1.onrender.com/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tgId: user.tgId }),
      });

      const data = await res.json();

      if (data.success && data.paymentUrl) {
        // Foydalanuvchini sotuvchi to‘lov sahifasiga yo‘naltirish
        window.open(data.paymentUrl, "_blank");
        setNotifMsg("💳 To‘lov sahifasiga yo‘naltirildingiz. To‘lovni tasdiqlang!");
        setShowNotif(true);
        setTimeout(() => setShowNotif(false), 5000);
      } else {
        throw new Error(data.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      console.error(err);
      setNotifMsg("❌ Xatolik: to‘lov amalga oshmadi");
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 5000);
    }
  };

  // 💚 Premium holatini tekshirish va avtomatik yangilash (opsional)
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`https://backend-m6u1.onrender.com/api/auth/user/${user.tgId}`);
        const data = await res.json();
        if (data.success) setUser(data.user);
      } catch (err) {
        console.error("Premium status tekshirish xatosi:", err);
      }
    }, 30_000); // 30 soniyada tekshirish
    return () => clearInterval(interval);
  }, [user]);

  if (loading) return <div className="flex justify-center items-center h-screen">Yuklanmoqda...</div>;

  const referralLink = `https://t.me/YourBot?start=${user?.referralCode || "ref_12345"}`;

  return (
    <main className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      <NotificationBanner show={showNotif} message={notifMsg} />
      <HeroCard onSubscribe={handleSubscribe} />

      <div className="glass p-4 rounded-2xl mb-4">
        <div className="flex items-center gap-3">
          <img
            src={user?.photoUrl || "/avatar-placeholder.png"}
            alt="avatar"
            className="w-12 h-12 rounded-full border border-white/10"
          />
          <div>
            <div className="font-semibold text-lg">{user?.username || "Foydalanuvchi"}</div>
            <div className="text-xs text-gray-400">ID: {user?.tgId}</div>
            <div className="text-xs mt-1">
              Premium: {user?.premium?.isActive ? "✅ Faol" : "❌ Faol emas"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="glass p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm">Keyingi o‘yin</div>
                <div className="font-semibold text-lg">Oy yakunidagi avtomobil yutug‘i</div>
              </div>
              <div>
                <CountdownTimer targetDateISO={getMonthEndISO()} />
              </div>
            </div>
            <div className="mt-4">
              <ProgressGoal current={premiumCount} goal={3000} />
            </div>
          </div>

          <ReferralBox link={referralLink} />
        </div>

        <div className="space-y-4">
          <WinnersCarousel winners={winners} />
          <BenefitsGrid />
          <LiveFeed events={events} />
        </div>
      </div>

      <FAQAccordion />
    </main>
  );
}

function getMonthEndISO() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  return end.toISOString();
}
