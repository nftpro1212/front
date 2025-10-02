import React from "react";
import { Sparkles, Gift, Phone, Shield } from "lucide-react";

export default function BenefitsGrid(){
  const items = [
    { icon: <Sparkles/>, title: "Monthly Car Draw", desc: "Automatic entry for premium users" },
    { icon: <Phone/>, title: "Weekly Phone Prize", desc: "Top referrer gets an iPhone" },
    { icon: <Gift/>, title: "Surprise Rewards", desc: "Exclusive bonuses for premium" },
    { icon: <Shield/>, title: "Secure Payments", desc: "Verified & secure" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((it,idx)=>(
        <div key={idx} className="glass p-3 rounded-xl text-center">
          <div className="mx-auto w-10 h-10 bg-white/6 rounded-full flex items-center justify-center mb-2 text-cyan-300">{it.icon}</div>
          <div className="font-semibold">{it.title}</div>
          <div className="text-xs small mt-1">{it.desc}</div>
        </div>
      ))}
    </div>
  );
}
