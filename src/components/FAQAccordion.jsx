import React, { useState } from "react";

const Item = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/6 py-3">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center">
        <div className="text-sm font-medium">{q}</div>
        <div className="text-xs text-gray-300">{open ? '-' : '+'}</div>
      </button>
      {open && <div className="mt-2 text-xs text-gray-300">{a}</div>}
    </div>
  );
};

export default function FAQAccordion() {
  const faq = [
    { 
      q: "Lotereya qanday ishlaydi?", 
      a: "Har bir premium foydalanuvchi shu oyda avtomatik qatnashadi. Agar premium foydalanuvchilar soni 3000 yoki undan ko‘p bo‘lsa, avtomobil yutug‘i o‘tkaziladi." 
    },
    { 
      q: "Agar 3000 tadan kam qo‘shilsa-chi?", 
      a: "Bu holda yutug‘ keyingi oyga qoldiriladi va chegara soni to‘lgunga qadar davom etadi." 
    },
    { 
      q: "G‘oliblar qanday aniqlanadi?", 
      a: "G‘oliblar premium foydalanuvchilar orasidan tasodifiy tanlab olinadi. Katta sovrinlar uchun admin KYC (shaxsni tasdiqlash) tekshiradi." 
    }
  ];

  return (
    <div className="glass p-4 rounded-2xl">
      <div className="text-lg font-semibold mb-3">Ko‘p so‘raladigan savollar</div>
      {faq.map((f, i) => <Item key={i} {...f} />)}
    </div>
  );
}