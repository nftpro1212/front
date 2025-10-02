import React from "react";
import WinnersCarousel from "../components/WinnersCarousel";

export default function Rewards() {
  const prizes = [
    { title: 'Hashamatli Sedan', desc: 'Oylik avtomobil sovrini', image: '/car-illustration.png' },
    { title: 'iPhone 15', desc: 'Haftalik eng ko‘p taklif qiluvchi uchun', image: '/phone.png' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      <h1 className="text-2xl font-bold">🎁 Sovrinlar</h1>
      
      <div className="glass p-4 rounded-2xl">
        <p className="small">
          Joriy va o‘tgan sovrinlarni bu yerdan ko‘rishingiz mumkin. 
          G‘oliblar admin tomonidan tasdiqlangan.
        </p>
      </div>

      <WinnersCarousel 
        winners={[
          { name: 'Jasur', prize: 'BMW 5 Series', avatar: '/avatar1.jpg', note: '1-oktabr' },
          { name: 'Madina', prize: 'iPhone 15', avatar: '/avatar2.jpg', note: '27-sentabr' }
        ]} 
      />
    </div>
  );
}