import React from "react";
import PremiumCard from "../components/HeroCard"; // Profilda qisqa Premium kartasidan foydalanish mumkin
import ReferralBox from "../components/ReferralBox";

export default function Profile() {
  const demoLink = "https://t.me/YourBot?start=ref_12345";

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      <h1 className="text-2xl font-bold">👤 Profil</h1>

      <div className="grid grid-cols-1 gap-4">
        {/* Foydalanuvchi kartasi */}
        <div className="glass p-4 rounded-2xl">
          <div className="flex items-center gap-4">
            <img
              src="/avatar-placeholder.png"
              alt="avatar"
              className="w-16 h-16 rounded-full border border-white/6"
            />
            <div>
              <div className="font-semibold">Ozod</div>
              <div className="text-xs small">@ozod</div>
              <div className="text-xs small mt-1">
                Premium holati:{" "}
                <span className="text-green-400">
                  Faol — {new Date().toLocaleDateString()} gacha
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Referral qutisi */}
        <ReferralBox link={demoLink} />
      </div>
    </div>
  );
}