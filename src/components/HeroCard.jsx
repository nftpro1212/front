import React from "react";
import { motion } from "framer-motion";
import { Crown, ShieldCheck } from "lucide-react";

export default function PremiumCard({ isPremium, onSubscribe, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center border border-yellow-400/30 bg-gradient-to-br from-black/80 via-yellow-900/10 to-black/90 shadow-[0_0_40px_rgba(255,215,0,0.15)] backdrop-blur-xl"
    >
      {/* 🔹 Gold aura background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/10 via-transparent to-yellow-400/5 blur-2xl pointer-events-none" />

      {/* 🔹 Left Side */}
      <div className="relative z-10 text-yellow-50">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 w-12 h-12 flex items-center justify-center font-extrabold text-black shadow-[0_0_15px_rgba(255,215,0,0.5)]">
            <Crown size={24} />
          </div>
          <div>
            <div className="text-lg font-semibold text-yellow-200">
              Har oy avtomobil va iPhone 17 yutib olish imkoniyati
            </div>
          </div>
        </div>

        <h1 className="mt-5 text-xl md:text-2xl font-extrabold leading-snug bg-gradient-to-r from-yellow-300 via-yellow-300 to-yellow-200 bg-clip-text text-transparent">
          🚘 Premium sotib oling va oylik avtomobil va iPhone 17 va boshqa sovg'alar o'yinida qatnashing
        </h1>

        <div className="mt-6 flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 0 25px rgba(255,215,0,0.7)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onSubscribe}
            disabled={loading || isPremium}
            className={`px-6 py-3 rounded-full font-bold text-black shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all ${
              isPremium || loading
                ? "bg-yellow-900/40 cursor-not-allowed text-yellow-300"
                : "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600"
            }`}
          >
            {loading
              ? "Yuklanmoqda..."
              : isPremium
              ? "Siz allaqachon premium"
              : "Obuna bo‘lish 100.000 so'm"}
          </motion.button>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-yellow-200/80">
          <ShieldCheck size={14} className="text-yellow-400" />
          Premium oylik to‘lov asosida ishlaydi va oy oxirigacha amal qiladi.
        </div>
      </div>

      {/* 🔹 Right Side — illustration */}
      <div className="relative z-10 flex justify-center items-center">
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          src="/car-illustration.png"
          alt="Avtomobil"
          className="w-full max-w-sm object-contain drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]"
        />
      </div>
    </motion.div>
  );
}
