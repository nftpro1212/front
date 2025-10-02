import React from "react";
import { motion } from "framer-motion";

export default function HeroCard({ onSubscribe }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-lg btn-neon w-12 h-12 flex items-center justify-center font-bold">ST</div>
          <div>
            <div className="text-sm small">Premium Lottery</div>
            <div className="text-lg font-semibold">Win a Car Every Month</div>
          </div>
        </div>

        <h1 className="mt-4 text-2xl md:text-3xl font-extrabold">🚘 Go Premium & Enter the Monthly Car Draw</h1>
        <p className="mt-3 small">Subscribe any time — your subscription is valid until the end of the current calendar month. Invite friends to increase your chances.</p>

        <div className="mt-5 flex gap-3">
          <button onClick={onSubscribe} className="btn-neon text-white px-5 py-3 rounded-xl font-semibold shadow-lg">Subscribe $9.99</button>
          <button className="bg-white/6 border border-white/6 text-white px-4 py-3 rounded-xl">How it works</button>
        </div>

        <div className="mt-4 text-xs small">Secure payment & Telegram verified • 30-day period</div>
      </div>

      <div className="flex items-center justify-center">
        {/* Placeholder illustration - use real SVG/PNG in public/ */}
        <div className="w-full max-w-sm">
          <img src="/car-illustration.png" alt="car" className="w-full object-contain drop-shadow-xl" />
        </div>
      </div>
    </motion.div>
  );
}
