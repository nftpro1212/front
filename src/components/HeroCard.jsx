import React from "react";
import { motion } from "framer-motion";

export default function HeroCard({ onSubscribe, isPremium }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      className={`rounded-2xl p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-center shadow-lg transition-all duration-500 ${
        isPremium 
          ? "bg-gradient-to-br from-yellow-300/20 via-yellow-400/10 to-yellow-500/20 border border-yellow-400/30 text-yellow-100" 
          : "glass text-white"
      }`}
    >
      <div>
        <div className="flex items-center gap-3">
          <div className={`rounded-lg w-12 h-12 flex items-center justify-center font-bold text-xl ${
            isPremium ? "bg-yellow-500 text-black shadow-yellow-300" : "btn-neon"
          }`}>
            {isPremium ? "G★" : "ST"}
          </div>
          <div>
            <div className="text-sm small">
              {isPremium ? "Gold Premium Foydalanuvchi" : "Premium Lotereya"}
            </div>
            <div className="text-lg font-semibold">
              {isPremium 
                ? "🎉 Siz hozirda Premium (Gold) foydalanuvchisiz!" 
                : "Har oy avtomobil yutib olish imkoniyati"}
            </div>
          </div>
        </div>

        <h1 className={`mt-4 text-2xl md:text-3xl font-extrabold ${
          isPremium ? "text-yellow-300 drop-shadow-lg" : ""
        }`}>
          {isPremium
            ? "🚘 Siz Gold versiyadasiz — omad siz bilan bo‘lsin!"
            : "🚘 Premiumga o‘ting va oylik avtomobil yutug‘ida qatnashing"}
        </h1>

        <p className="mt-3 small">
          {isPremium
            ? "Obunangiz joriy oy oxirigacha amal qiladi. Har oyda avtomatik yangilanadi va maxsus sovrinlar uchun sizga ustunlik beradi."
            : "Istalgan vaqtda obuna bo‘ling — obunangiz joriy kalendar oy oxirigacha amal qiladi. Do‘stlarni taklif qiling va imkoniyatlaringizni oshiring."}
        </p>

        {!isPremium && (
          <div className="mt-5 flex gap-3">
            <button 
              onClick={onSubscribe} 
              className="btn-neon text-white px-5 py-3 rounded-xl font-semibold shadow-lg"
            >
              Obuna bo‘lish $9.99
            </button>
            <button className="bg-white/6 border border-white/6 text-white px-4 py-3 rounded-xl">
              Qanday ishlaydi?
            </button>
          </div>
        )}

        <div className="mt-4 text-xs small opacity-80">
          {isPremium 
            ? "🌟 Telegram orqali tasdiqlangan Premium holat • Oylik Gold status" 
            : "Xavfsiz to‘lov & Telegram tasdiqlangan • 30 kunlik davr"}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm">
          <img 
            src={isPremium ? "/gold-car.png" : "/car-illustration.png"} 
            alt="Avtomobil" 
            className={`w-full object-contain drop-shadow-xl ${
              isPremium ? "animate-pulse" : ""
            }`} 
          />
        </div>
      </div>
    </motion.div>
  );
}
