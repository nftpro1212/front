import React from "react";
import { motion } from "framer-motion";

export default function ProgressGoal({ current = 0, goal = 3000 }) {
  const pct = Math.min(100, Math.round((current / goal) * 100));
  return (
    <div className="glass p-4 rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs small">Monthly Goal</div>
          <div className="text-lg font-semibold">Car Draw Threshold</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-cyan-300">{current} / {goal}</div>
          <div className="text-xs text-gray-300">Reach {goal} premium users</div>
        </div>
      </div>

      <div className="mt-3">
        <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.2 }} className="h-3 rounded-full" style={{ background: 'linear-gradient(90deg,#06b6d4,#7c3aed)' }} />
        </div>
        <div className="mt-2 text-sm">
          {pct < 100 ? (<span className="text-yellow-300">🚨 Not reached yet — invite friends!</span>) : (<span className="text-green-400">✅ Goal reached — car draw active!</span>)}
        </div>
      </div>
    </div>
  );
}
