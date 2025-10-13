import React, { useState, useEffect } from "react";

export default function CountdownTimer({ targetDateISO }) {
  const parse = (d) => new Date(d);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, parse(targetDateISO) - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const Block = ({ label, value }) => (
    <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-800/10 border border-yellow-500/40 shadow-[0_0_15px_rgba(255,215,0,0.2)] px-3 py-2 rounded-xl text-center min-w-[60px] backdrop-blur-sm transition-all hover:scale-105">
      <div className="font-mono text-lg font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,215,0,0.3)]">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[10px] text-yellow-300/80 font-medium uppercase tracking-wide">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex gap-3 items-center justify-center p-2 rounded-xl bg-gradient-to-br from-yellow-100/5 to-yellow-900/5 border border-yellow-500/10 shadow-inner">
      <Block label="Kun" value={days} />
      <Block label="Soat" value={hours} />
      <Block label="Daqiqa" value={minutes} />
      <Block label="Soniya" value={seconds} />
    </div>
  );
}
