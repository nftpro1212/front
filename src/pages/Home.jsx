import React from "react";
import HeroCard from "../components/HeroCard";
import CountdownTimer from "../components/CountdownTimer";
import ProgressGoal from "../components/ProgressGoal";
import ReferralBox from "../components/ReferralBox";

export default function Home() {
  const premiumCount = 1842;
  const referralLink = "https://t.me/nft_userrbot?start=ref_12345";
  const referralCount = 0; // test uchun

  return (
    <main className="max-w-2xl mx-auto px-4 pt-6 pb-20 space-y-6">
      {/* 🔹 Premium karta */}
      <HeroCard />

      {/* 🔹 Asosiy bo‘lim */}
      <div className="glass p-4 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm">Keyingi yutuq o‘yini</div>
            <div className="font-semibold text-lg">Oy yakuni avtomobil sovrini</div>
          </div>
          <CountdownTimer targetDateISO={getMonthEndISO()} />
        </div>

        <ProgressGoal current={premiumCount} goal={3000} />

        {/* Referal bo‘lim */}
        <ReferralBox link={referralLink} count={referralCount} />
      </div>
    </main>
  );
}

// 🔹 Oyni oxirigacha sanasi funksiyasi
function getMonthEndISO() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  return end.toISOString();
}
