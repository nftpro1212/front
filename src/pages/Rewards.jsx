import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import WinnersCarousel from "../components/WinnersCarousel";

export default function Rewards() {
  const prizes = [
    { title: "iPhone 15 Pro Max", desc: "Eng qimmat sovrin!", color: "#FFD700", icon: "📱" },
    { title: "AirPods Pro", desc: "Qulaylik va sifat", color: "#FF6B6B", icon: "🎧" },
    { title: "Telegram Premium (1 oy)", desc: "Eksklyuziv afzalliklar", color: "#1E90FF", icon: "💎" },
    { title: "5000 ball", desc: "Qo‘shimcha ball to‘plang", color: "#00BFA6", icon: "🎯" },
    { title: "T-shirt", desc: "Brendli futbolka", color: "#FF9F1C", icon: "👕" },
    { title: "1000 ball", desc: "Kichik sovrin", color: "#B28DFF", icon: "⭐" },
    { title: "Sticker pack", desc: "Yangi Telegram stickerlar", color: "#FF69B4", icon: "💌" },
    { title: "500 ball", desc: "Motivatsion sovrin", color: "#00CED1", icon: "🎁" },
  ];

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const extraSpins = 5 * 360;
    const prizeAngle = (360 / prizes.length) * randomIndex + 360 / prizes.length / 2;
    const newRotation = rotation + extraSpins - prizeAngle;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setWinner(prizes[randomIndex]);
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }, 4000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-10">
      <h1 className="text-2xl font-bold">🎁 Sovrinlar</h1>

      {/* Info Card */}
      <div className="glass p-4 rounded-2xl">
        <p className="small">
          Joriy va o‘tgan sovrinlarni bu yerdan ko‘rishingiz mumkin. 
          G‘oliblar admin tomonidan tasdiqlangan.
        </p>
      </div>

      {/* 🎡 Yutuqlar g‘ildiragi */}
      <div className="flex flex-col items-center justify-center mt-8">
        <motion.div
          className="relative w-72 h-72 rounded-full border-[6px] border-cyan-400 shadow-[0_0_25px_#00ffff]"
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: "easeOut" }}
        >
          {prizes.map((p, i) => {
            const angle = (360 / prizes.length) * i;
            return (
              <div
                key={i}
                className="absolute w-1/2 h-1/2 origin-bottom-left rounded-tr-full flex flex-col justify-center items-end pr-2"
                style={{
                  transform: `rotate(${angle}deg)`,
                  background: p.color,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                }}
              >
                <span className="rotate-[-90deg] font-bold text-black text-xs sm:text-sm">
                  {p.icon} {p.title}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Mark & Button */}
        <div className="mt-6 relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-3xl">🔻</div>
          <button
            onClick={spin}
            disabled={spinning}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold px-8 py-3 rounded-xl mt-8 shadow-lg transition-transform active:scale-95"
          >
            {spinning ? "Aylanmoqda..." : "Aylantirish 🎲"}
          </button>
        </div>

        {winner && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-8 bg-white/10 backdrop-blur-md border border-cyan-400 p-4 rounded-xl shadow-lg text-center"
          >
            <h2 className="text-xl font-semibold text-cyan-300">🎉 Tabriklaymiz!</h2>
            <p className="mt-2 text-lg">
              Sizga <span className="text-yellow-400 font-bold">{winner.title}</span> sovg‘asi tushdi!
            </p>
          </motion.div>
        )}
      </div>

      {/* 🏆 G‘oliblar */}
      <WinnersCarousel
        winners={[
          { name: "Jasur", prize: "BMW 5 Series", avatar: "/avatar1.jpg", note: "1-oktabr" },
          { name: "Madina", prize: "iPhone 15", avatar: "/avatar2.jpg", note: "27-sentabr" },
        ]}
      />
    </div>
  );
}