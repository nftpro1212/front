import React, { useState } from "react";
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

  const demoLink = "https://t.me/YourBot?start=ref_12345";

  // ⚡ Demo ma'lumotlar
  const premiumCount = 1842;
  const winners = [
    { name: "Jasur", prize: "BMW 5 Series", avatar: "/avatar1.jpg", note: "1-oktabr g'olibi" },
    { name: "Madina", prize: "iPhone 15", avatar: "/avatar2.jpg", note: "27-sentabr g'olibi" },
  ];
  const events = ["Dilshod premiumga o'tdi", "Jasur 3 do'stini taklif qildi", "Lola Gold darajaga chiqdi"];

  async function handleSubscribe() {
    try {
      // 💳 To‘lov jarayoni (demo)
      const res = await fetch("/api/subscribe", { method: "POST" });
      if (!res.ok) throw new Error("To‘lov muvaffaqiyatsiz bo‘ldi");

      // ✅ Muvaffaqiyatli bo‘lsa:
      setNotifMsg("🎉 Tabriklaymiz! Siz endi Premium a'zosiz.");
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 4000);

      // 🎊 Confetti
      import("canvas-confetti").then((confetti) => {
        confetti.default({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      });
    } catch (err) {
      setNotifMsg("❌ Xatolik: to‘lov amalga oshmadi");
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 4000);
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      {/* Banner */}
      <NotificationBanner show={showNotif} message={notifMsg} />

      {/* Asosiy karta */}
      <HeroCard onSubscribe={handleSubscribe} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          {/* Keyingi o‘yin */}
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
          <ReferralBox link={demoLink} />
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

/* Helper: oynaning oxirgi sanasini olish */
function getMonthEndISO() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  return end.toISOString();
}