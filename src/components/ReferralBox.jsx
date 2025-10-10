import React, { useEffect, useState } from "react";
import { Copy, Users } from "lucide-react";
import API from "../api/axiosInstance";

export default function ReferralBox({ link }) {
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);

  // 🔹 Referral sonini olish
  useEffect(() => {
    const fetchReferralCount = async () => {
      try {
        const res = await API.get("/referrals/count");
        setCount(res.data.count || 0);
      } catch (error) {
        console.error("❌ Referral count olishda xato:", error);
      }
    };

    fetchReferralCount();
  }, []);

  // 🔹 Havolani nusxalash funksiyasi
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("❌ Nusxalashda xato:", error);
    }
  };

  return (
    <div className="glass p-4 rounded-2xl">
      <h2 className="text-lg font-semibold mb-2">👥 Do‘stlarni taklif qil</h2>

      <div className="flex items-center justify-between gap-2 bg-gray-900/50 border border-gray-800 p-2 rounded-xl">
        <span className="text-xs truncate text-gray-300">{link}</span>
        <button
          onClick={copyLink}
          className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition flex items-center gap-1 text-sm"
        >
          <Copy size={16} />
          {copied ? "Nusxalandi" : "Kopiyalash"}
        </button>
      </div>

      <div className="flex items-center gap-2 mt-4 text-gray-300 text-sm">
        <Users size={18} className="text-cyan-400" />
        Siz taklif qilganlar soni:{" "}
        <span className="text-cyan-400 font-semibold">{count}</span>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Har bir yangi foydalanuvchi sizning havolangiz orqali ro‘yxatdan o‘tsa, siz mukofot ballari olasiz 🎁
      </p>
    </div>
  );
}
