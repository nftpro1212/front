import React, { useState } from "react";
import HeroCard from "../components/HeroCard";
import CountdownTimer from "../components/CountdownTimer";
import ProgressGoal from "../components/ProgressGoal";
import ReferralBox from "../components/ReferralBox";
import WinnersCarousel from "../components/WinnersCarousel";
import BenefitsGrid from "../components/BenefitsGrid";
import LiveFeed from "../components/LiveFeed";
import FAQAccordion from "../components/FAQAccordion";
import NotificationBanner from "../components/NotificationBanner";
export default function Home(){
  // demo data & state
  const [showNotif, setShowNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState('');
  const demoLink = "https://t.me/YourBot?start=ref_12345";
  // simulated values — wire to API in real app
  const premiumCount = 1842;
  const winners = [
    { name: 'Jasur', prize: 'BMW 5 Series', avatar: '/avatar1.jpg', note: 'Won on Oct 1' },
    { name: 'Madina', prize: 'iPhone 15', avatar: '/avatar2.jpg', note: 'Won on Sep 27' },
  ];
  const events = ['Dilshod subscribed', 'Jasur invited 3 friends', 'Lola reached Gold referrer'];

  function handleSubscribe(){
    // Here integrate payment -> on success:
    setNotifMsg('🎉 Thank you! You are now Premium. Good luck!');
    setShowNotif(true);
    setTimeout(()=> setShowNotif(false), 4000);
    // Add confetti on success (can integrate canvas-confetti)
  }

  return (
    <main className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      <NotificationBanner show={showNotif} message={notifMsg} />
      <HeroCard onSubscribe={handleSubscribe} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="glass p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm small">Next Draw</div>
                <div className="font-semibold text-lg">Monthly Car Draw</div>
              </div>
              <div><CountdownTimer targetDateISO={getMonthEndISO()} /></div>
            </div>
            <div className="mt-4"><ProgressGoal current={premiumCount} goal={3000} /></div>
          </div>

          <ReferralBox link={demoLink} />
        </div>

        <div className="space-y-4">
          <WinnersCarousel winners={winners} />
          <BenefitsGrid />
          <LiveFeed events={events} />
        </div>
      </div>

      <FAQAccordion />
    </main>
  );
}

/* helper */
function getMonthEndISO(){
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth()+1, 0, 23,59,59,999);
  return end.toISOString();
}