import React from "react";
import { motion } from "framer-motion";
import { Crown, Lock } from "lucide-react";

const PremiumCard = () => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl p-8 text-center border border-yellow-500/30 bg-gradient-to-br from-black/60 via-yellow-900/20 to-black/90 backdrop-blur-lg shadow-[0_0_30px_rgba(255,215,0,0.25)]"
    >
      {/* 🔹 Gold aura effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent blur-2xl pointer-events-none" />

      <div className="relative z-10">
        {/* 👑 Title */}
        <div className="flex justify-center mb-4">
          <Crown size={40} className="text-yellow-400 drop-shadow-[0_0_10px_#FFD700]" />
        </div>

        <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent tracking-wide">
          PREMIUM OBUNA
        </h2>

        <p className="text-yellow-100/90 mb-6 text-sm leading-relaxed">
          Oyiga atigi{" "}
          <span className="text-yellow-300 font-bold">100 000 so‘m</span> to‘lab,  
          maxsus imtiyozlar va avtomobil lotereyasida ishtirok eting 🚗✨
        </p>

        {/* 🔘 Button */}
        <motion.button
          whileHover={{ scale: 1.07, boxShadow: "0 0 25px rgba(255, 215, 0, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-full font-bold text-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 transition-all duration-200 shadow-[0_0_20px_rgba(255,215,0,0.4)]"
        >
          Premiumga o‘tish
        </motion.button>

        {/* 🔒 Footer info */}
        <div className="mt-5 flex justify-center items-center gap-2 text-yellow-200/80 text-xs">
          <Lock size={14} className="text-yellow-400" />
          <span>To‘lov xavfsiz & Telegram tasdiqlangan</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumCard;
