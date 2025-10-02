import React, { useState, useEffect } from "react";

export default function CountdownTimer({ targetDateISO }) {
  const parse = (d) => new Date(d);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, parse(targetDateISO) - now);
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff/(1000*60*60))%24);
  const minutes = Math.floor((diff/(1000*60))%60);
  const seconds = Math.floor((diff/1000)%60);

  const Block = ({ label, value }) => (
    <div className="bg-white/6 px-3 py-2 rounded-lg text-center min-w-[56px]">
      <div className="font-mono text-lg font-semibold text-cyan-300">
        {String(value).padStart(2,'0')}
      </div>
      <div className="text-xs text-gray-300">{label}</div>
    </div>
  );

  return (
    <div className="flex gap-3 items-center">
      <Block label="Kun" value={days} />
      <Block label="Soat" value={hours} />
      <Block label="Daqiqa" value={minutes} />
      <Block label="Soniya" value={seconds} />
    </div>
  );
}