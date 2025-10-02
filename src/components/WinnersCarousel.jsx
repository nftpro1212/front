import React, { useRef } from "react";

export default function WinnersCarousel({ winners = [] }) {
  const sc = useRef();
  return (
    <div className="glass p-4 rounded-2xl">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Yaqindagi g‘oliblar</h3>
        <div className="text-sm small">Bu oy</div>
      </div>

      <div ref={sc} className="mt-4 flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {winners.length ? winners.map((w, i) => (
          <div key={i} className="min-w-[180px] p-3 bg-white/3 rounded-lg">
            <div className="flex items-center gap-3">
              <img
                src={w.avatar || '/avatar-placeholder.png'}
                alt={w.name}
                className="w-12 h-12 rounded-full object-cover border border-white/10"
              />
              <div>
                <div className="font-semibold">{w.name}</div>
                <div className="text-xs small">{w.prize}</div>
              </div>
            </div>
            <div className="mt-3 text-xs small">{w.note}</div>
          </div>
        )) : <div className="text-sm small">Hozircha g‘oliblar yo‘q</div>}
      </div>
    </div>
  );
}