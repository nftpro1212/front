import React from "react";
import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";

export default function HeroSection(){
  return (
    <section className="pt-20 pb-8">
      <div className="max-w-4xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 items-center">
        <div className="glass p-6 rounded-2xl">
          <h1 className="text-3xl md:text-4xl font-bold">Join Premium — Win a Car 🚗</h1>
          <p className="small mt-2">Subscribe any day — your subscription is valid until the end of the month. Reach 3000 premium users to unlock the monthly car draw.</p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="btn-neon text-white px-5 py-3 rounded-xl font-semibold">
              Subscribe Premium — $2
            </motion.button>

            <button className="bg-white/5 border border-white/6 text-white px-4 py-3 rounded-xl">
              Learn more
            </button>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div>
              <div className="text-xs small">Monthly draw in</div>
              <CountdownTimer endDate={getMonthEnd()} />
            </div>
            <div className="ml-auto text-sm small">Progress to 3000:
              <ProgressBar value={45} />
            </div>
          </div>
        </div>

        <motion.div initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass p-6 rounded-2xl">
          <div className="flex flex-col items-center">
            <img src="/car-illustration.png" alt="Mashina" className="w-full max-w-sm" />
            <p className="text-sm small mt-3">High chance to win when many join — invite friends!</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* helper: month end date */
function getMonthEnd(){
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth()+1, 0, 23,59,59,999).toISOString();
}

/* minimal progress bar component (inline) */
function ProgressBar({value=0}){
  return (
    <div className="w-44 bg-white/4 rounded-full h-3 overflow-hidden ml-2">
      <div className="h-3 rounded-full" style={{width: `${value}%`, background: 'linear-gradient(90deg,#06b6d4,#7c3aed)'}}/>
    </div>
  );
}
