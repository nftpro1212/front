import React from "react";
import { motion } from "framer-motion";

export default function HeroCard({ onSubscribe }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="glass rounded-2xl p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
    >
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-lg btn-neon w-12 h-12 flex items-center justify-center font-bold">ST</div>
          <div>
            <div className="text-sm small">Premium Lotereya</div>
            <div className="text-lg font-semibold">Har oy avtomobil yutib olish imkoniyati</div>
          </div>
        </div>

        <h1 className="mt-4 text-2xl md:text-3xl font-extrabold">🚘 Premiumga o‘ting va oylik avtomobil yutug‘ida qatnashing</h1>
        <p className="mt-3 small">
          Istalgan vaqtda obuna bo‘ling — obunangiz joriy kalendar oy oxirigacha amal qiladi. 
          Do‘stlarni taklif qiling va imkoniyatlaringizni oshiring.
        </p>

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

        <div className="mt-4 text-xs small">
          Xavfsiz to‘lov & Telegram tasdiqlangan • 30 kunlik davr
        </div>
      </div>

      <div className="flex items-center justify-center">
        {/* Illyustratsiya joyi - public/ ichida haqiqiy rasm yoki SVG qo‘yish mumkin */}
        <div className="w-full max-w-sm">
          <img 
            src="/car-illustration.png" 
            alt="Avtomobil" 
            className="w-full object-contain drop-shadow-xl" 
          />
        </div>
      </div>
    </motion.div>
  );
}