import React from "react";

export default function LiveFeed({ events = [] }){
  return (
    <div className="glass p-3 rounded-2xl">
      <div className="text-sm font-semibold mb-2">Live Activity</div>
      <div className="text-xs small">
        <marquee behavior="scroll" direction="left" scrollamount="4">
          {events.length ? events.join(' • ') : 'No recent activity'}
        </marquee>
      </div>
    </div>
  );
}
