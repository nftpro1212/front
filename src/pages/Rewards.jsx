import React from "react";
import WinnersCarousel from "../components/WinnersCarousel";

export default function Rewards(){
  const prizes = [
    { title: 'Luxury Sedan', desc: 'Monthly car', image: '/car-illustration.png' },
    { title: 'iPhone 15', desc: 'Weekly top referrer', image: '/phone.png' },
  ];
  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      <h1 className="text-2xl font-bold">🎁 Rewards</h1>
      <div className="glass p-4 rounded-2xl">
        <p className="small">See current and past rewards. Winners verified by admin.</p>
      </div>

      <WinnersCarousel winners={[
        { name:'Jasur', prize:'BMW 5 Series', avatar:'/avatar1.jpg', note:'Oct 1' },
        { name:'Madina', prize:'iPhone 15', avatar:'/avatar2.jpg', note:'Sep 27' }
      ]} />
    </div>
  );
}