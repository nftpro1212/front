import React, { useEffect, useState } from "react";
import { Copy, Users, Gift } from "lucide-react";
import API from "../api/axiosInstance";
import { motion } from "framer-motion";

export default function ReferralBox({ link }) {
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);

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
    <motion.div
      className="relative p-6 rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-900/40 via-black/80 to-yellow-800/30 border border-yellow-500/30 shadow-[0_0_25px_rgba(255,215,0,0.2)] backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Yorqin fon bezak */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-3 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent flex items-center gap-2">
          <Gift size={22} /> Do‘stlarni taklif qil
        </h2>

        <div className="flex items-center justify-between gap-3 bg-black/50 border border-yellow-500/20 p-3 rounded-2xl shadow-inner">
          <span className="text-sm truncate text-yellow-100">{link}</span>
          <motion.button
            onClick={copyLink}
            whileTap={{ scale: 0.9 }}
            className="p-2 px-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition text-black font-medium flex items-center gap-2"
          >
            <Copy size={16} />
            {copied ? "Nusxalandi!" : "Kopiyalash"}
          </motion.button>
        </div>

        <div className="flex items-center gap-2 mt-5 text-yellow-200 text-sm">
          <Users size={20} className="text-yellow-400" />
          Siz taklif qilganlar soni:{" "}
          <span className="text-yellow-400 font-semibold text-lg">{count}</span>
        </div>

        <p className="text-xs text-yellow-100/70 mt-3">
          Har bir yangi foydalanuvchi sizning havolangiz orqali ro‘yxatdan o‘tsa, siz mukofot ballari olasiz 🎁
        </p>
      </div>
    </motion.div>
  );
}
