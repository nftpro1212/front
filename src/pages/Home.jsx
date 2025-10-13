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
  const [referralCount, setReferralCount] = useState(0);

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

    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get("start"); // ?start=ref_xxxxxx

    if (tg?.initDataUnsafe?.user) {
      const telegramUser = tg.initDataUnsafe.user;
      loginOrRegister(telegramUser, referralCode);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        fetchReferralCount(parsed.tgId);
        setLoading(false);
      } else {
        // Test rejimi (faqat dev uchun)
        loginOrRegister({ id: 9999, username: "test_user" }, referralCode);
      }
    }
  }, []);

  // 🔹 Login yoki Register
  const loginOrRegister = async (telegramUser, referralCode) => {
    try {
      const response = await fetch("https://backend-m6u1.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tgId: String(telegramUser.id),
          username: telegramUser.username || "no_username",
          first_name: telegramUser.first_name,
          last_name: telegramUser.last_name,
          referralCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        fetchReferralCount(data.user.tgId);
      } else {
        console.error("Login muvaffaqiyatsiz:", data.message);
      }
    } catch (error) {
      console.error("Login xatosi:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Referral count-ni olish
  const fetchReferralCount = async (tgId) => {
    if (!tgId) return;
    try {
      const res = await fetch(
        `https://backend-m6u1.onrender.com/api/referrals/count?telegramId=${tgId}`
      );
      const data = await res.json();
      if (data.success) setReferralCount(data.count);
      else console.warn("Referral count xato:", data.message);
    } catch (err) {
      console.error("Referral count olishda xato:", err);
    }
  };

  // 💳 Premium sotib olish
  async function handleSubscribe() {
    if (!user) return;

    try {
      // 1️⃣ Sotuvchi sahifasiga yo‘naltirish
      const paymentUrl = `https://your-seller-page.com/pay?tgId=${user.tgId}`;
      window.open(paymentUrl, "_blank");

      setNotifMsg("💡 Sotuvchiga yo‘naltirildi. To‘lov tasdiqlangandan keyin Premium faollashadi.");
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 5000);
    } catch (err) {
      setNotifMsg("❌ Xatolik yuz berdi");
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 4000);
    }
  }

  // 🔹 Premium holatini tekshirish (oy oxirigacha)
  const isPremiumActive = () => {
    if (!user?.premium?.isActive || !user?.premium?.endDate) return false;
    const now = new Date();
    const end = new Date(user.premium.endDate);
    return now <= end;
  };

  if (loading)
    return <div className="flex justify-center items-center h-screen">Yuklanmoqda...</div>;

  const referralLink = `https://t.me/nft_userrbot?start=${user?.referralCode || "ref_12345"}`;

  return (
    <main className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      <NotificationBanner show={showNotif} message={notifMsg} />
      <HeroCard onSubscribe={handleSubscribe} />

      {/* 🔹 Foydalanuvchi ma'lumotlari */}
      <div className="glass p-4 rounded-2xl mb-4">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar || "/avatar-placeholder.png"}
            alt="avatar"
            className="w-12 h-12 rounded-full border border-white/10"
          />
          <div>
            <div className="font-semibold text-lg">{user?.username || "Foydalanuvchi"}</div>
            <div className="text-xs text-gray-400">ID: {user?.tgId}</div>
            <div className="text-xs mt-1">
              Premium holati:{" "}
              {isPremiumActive() ? (
                <span className="text-green-400">
                  ✅ Faol — {new Date(user.premium.endDate).toLocaleDateString("uz-UZ")}
                </span>
              ) : (
                <span className="text-red-400">❌ Faol emas</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Asosiy bloklar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {/* O'yin va progress */}
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

          {/* Referral */}
          <ReferralBox link={referralLink} count={referralCount} />
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

// 🔹 Oyni oxirigacha sanasi
function getMonthEndISO() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  return end.toISOString();
}
