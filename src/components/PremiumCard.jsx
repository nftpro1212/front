import React from "react";
import { motion } from "framer-motion";

const PremiumCard = () => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg text-center border border-cyan-400/40"
    >
      <h2 className="text-xl font-bold mb-3">🚀 Go Premium</h2>
      <p className="text-gray-200 mb-4">Join for $9.99/month & enter car lottery</p>
      <button className="px-6 py-3 rounded-full font-bold bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg hover:scale-105 transition transform">
        Subscribe Now
      </button>
    </motion.div>
  );
};

export default PremiumCard;

