import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { Copy, Users } from "lucide-react";

export default function ReferralBox({ link }) {
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    const userId = tg?.initDataUnsafe?.user?.id || 9999;

    const fetchReferralCount = async () => {
      try {
        const res = await API.get(`/referrals/count?tgId=${userId}`);
        if (res.data.success) setReferralCount(res.data.count);
      } catch (err) {
        console.error("❌ Referral count xatosi:", err);
      }
    };

    fetchReferralCount();
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-[#1b1b1b] via-[#2a2a2a] to-[#000] p-5 rounded-2xl border border-yellow-500/20 shadow-[0_0_20px_rgba(255,215,0,0.15)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-yellow-300 flex items-center gap-2">
          <Users size={18} /> Takliflaringiz
        </h3>
        <span className="text-2xl font-bold text-yellow-400">{referralCount}</span>
      </div>

      <div className="mt-3 text-sm text-gray-300">
        Har bir do‘stni taklif qiling va sovrin yutish imkoniyatini oshiring! 🏆
      </div>

      <div className="mt-4 flex items-center gap-2 bg-[#0a0a0a] p-2 rounded-xl border border-yellow-500/30">
        <input
          type="text"
          readOnly
          value={link}
          className="flex-1 bg-transparent text-yellow-200 text-sm outline-none"
        />
        <button
          onClick={copyLink}
          className="px-3 py-1 rounded-lg bg-yellow-500/20 text-yellow-300 text-sm hover:bg-yellow-400/30 transition"
        >
          {copied ? "📋 Nusxa olindi!" : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
}
