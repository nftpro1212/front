import React from "react";
import { Sparkles, Gift, Phone, Shield } from "lucide-react";

export default function BenefitsGrid(){
  const items = [
    { icon: <Sparkles/>, title: "Oylik avtomobil yutug‘i", desc: "Premium foydalanuvchilar avtomatik qatnashadi" },
    { icon: <Phone/>, title: "Haftalik telefon sovg‘asi", desc: "Eng ko‘p referal qilgan foydalanuvchi iPhone oladi" },
    { icon: <Gift/>, title: "Kutilmagan sovg‘alar", desc: "Premium uchun eksklyuziv bonuslar" },
    { icon: <Shield/>, title: "Xavfsiz to‘lovlar", desc: "Tasdiqlangan va xavfsiz" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((it,idx)=>(
        <div key={idx} className="glass p-3 rounded-xl text-center">
          <div className="mx-auto w-10 h-10 bg-white/6 rounded-full flex items-center justify-center mb-2 text-cyan-300">
            {it.icon}
          </div>
          <div className="font-semibold">{it.title}</div>
          <div className="text-xs small mt-1">{it.desc}</div>
        </div>
      ))}
    </div>
  );
}