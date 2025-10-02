import React from "react";
import { motion } from "framer-motion";

const PremiumCard = () => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-r from-cyan-600 to-purple-700 text-white p-6 rounded-2xl shadow-xl text-center border border-cyan-400/40"
    >
      <h2 className="text-xl font-bold mb-3">🚀 Premiumga o‘ting</h2>
      <p className="text-gray-200 mb-4">
        Oyiga atigi <span className="font-semibold text-cyan-300">100.000 so'm</span> to‘lab avtomobil lotereyasida qatnashing!
      </p>
      <button className="px-6 py-3 rounded-full font-bold bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg hover:scale-105 hover:shadow-cyan-500/50 transition transform">
        Obuna bo‘lish
      </button>
      <div className="mt-3 text-xs text-gray-300">
        🔒 To‘lov xavfsiz & Telegram tasdiqlangan
      </div>
    </motion.div>
  );
};

export default PremiumCard;