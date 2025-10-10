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
      // Tashqaridan kirganlar uchun — Telegram Login Widget
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        // Test rejimi (faqat dev uchun)
        loginOrRegister({ id: 9999, username: "test_user" });
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

  // 💳 Premium sotib olish demo funksiyasi
  async function handleSubscribe() {
    try {
      const res = await fetch("/api/subscribe", { method: "POST" });
      if (!res.ok) throw new Error("To‘lov muvaffaqiyatsiz bo‘ldi");

      setNotifMsg("🎉 Tabriklaymiz! Siz endi Premium a'zosiz.");
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 4000);

      // Confetti effekti
      import("canvas-confetti").then((confetti) => {
        confetti.default({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      });
    } catch (err) {
      setNotifMsg("❌ Xatolik: to‘lov amalga oshmadi");
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 4000);
    }
  }

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
}import React, { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg?.initDataUnsafe?.user) {
      const u = tg.initDataUnsafe.user;
      console.log("Telegram foydalanuvchi:", u);
      loginOrRegister(u);
    } else {
      alert("⚠️ Iltimos, WebApp’ni Telegram ichidan oching!");
      setLoading(false);
    }
  }, []);

  const loginOrRegister = async (tgUser) => {
    try {
      const res = await fetch("https://your-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tgId: tgUser.id,
          username: tgUser.username,
          first_name: tgUser.first_name,
          last_name: tgUser.last_name,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        alert("Login xatosi: " + data.message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Yuklanmoqda...</div>;

  return (
    <main className="p-6 text-center">
      {user ? (
        <>
          <h1 className="text-xl font-bold">Salom, {user.username || user.first_name} 👋</h1>
          <p>ID: {user.telegramId}</p>
        </>
      ) : (
        <p>Foydalanuvchi topilmadi</p>
      )}
    </main>
  );
}
