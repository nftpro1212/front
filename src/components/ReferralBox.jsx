import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FiCopy, FiShare2 } from "react-icons/fi";

export default function ReferralBox({ link }) {
  const copy = async () => {
    await navigator.clipboard.writeText(link);
    alert("Link copied");
  };
  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'Join Premium', text: 'Join and win a car!', url: link });
    } else {
      copy();
    }
  };

  return (
    <div className="glass p-4 rounded-2xl flex flex-col md:flex-row items-center gap-4">
      <div className="p-3 bg-white/5 rounded-xl">
        <QRCodeCanvas value={link} size={110} bgColor="transparent" fgColor="#e6eef8" level="H" />
      </div>

      <div className="flex-1 w-full">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Share your referral</div>
            <div className="text-xs small">Earn rewards when friends subscribe</div>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <input readOnly value={link} className="flex-1 bg-transparent border border-white/6 px-3 py-2 rounded-lg" />
          <button onClick={copy} className="bg-white/6 px-3 py-2 rounded-lg"><FiCopy/></button>
          <button onClick={share} className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2 rounded-lg text-white"><FiShare2/></button>
        </div>

        <div className="mt-2 text-xs small">Badges: <span className="text-yellow-300">Bronze</span> • <span className="text-gray-300">Silver</span> • <span className="text-green-300">Gold</span></div>
      </div>
    </div>
  );
}
