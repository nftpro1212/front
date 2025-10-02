import React, { useState } from "react";

const Item = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/6 py-3">
      <button onClick={()=>setOpen(!open)} className="w-full flex justify-between items-center">
        <div className="text-sm font-medium">{q}</div>
        <div className="text-xs text-gray-300">{open ? '-' : '+'}</div>
      </button>
      {open && <div className="mt-2 text-xs text-gray-300">{a}</div>}
    </div>
  );
};

export default function FAQAccordion(){
  const faq = [
    { q: "How the lottery works?", a: "All premium users this month are eligible. If premium users >= 3000, car draw runs."},
    { q: "What if < 3000 join?", a: "Draw is postponed to next month until threshold is reached."},
    { q: "How winners chosen?", a: "Random pick among eligible premium users, admin verifies KYC for big prizes."}
  ];

  return (
    <div className="glass p-4 rounded-2xl">
      <div className="text-lg font-semibold mb-3">FAQ</div>
      {faq.map((f,i)=><Item key={i} {...f} />)}
    </div>
  );
}