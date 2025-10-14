import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { Trophy, Medal, Crown } from "lucide-react";

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/referrals/leaderboard") // ✅ to‘g‘ri endpoint nomi
      .then((res) => {
        // Backenddan qaytgan format: { leaderboard: [ ... ] }
        setData(res.data.leaderboard || []);
      })
      .catch((err) => {
        console.error("Leaderboard xatosi:", err.response?.data || err.message);
      });
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 1)
      return <Crown className="w-5 h-5 text-yellow-400 inline-block mr-1" />;
    if (rank === 2)
      return <Medal className="w-5 h-5 text-gray-300 inline-block mr-1" />;
    if (rank === 3)
      return <Medal className="w-5 h-5 text-amber-600 inline-block mr-1" />;
    return <span className="font-bold text-cyan-400 mr-1">#{rank}</span>;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 pb-24 space-y-6">
      <div className="flex items-center justify-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Yetakchilar Jadvali
        </h1>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="hidden sm:grid grid-cols-3 bg-white/10 text-xs sm:text-sm uppercase tracking-wider font-semibold text-gray-300">
          <div className="py-3 px-4">O‘rin</div>
          <div className="py-3 px-4">Foydalanuvchi</div>
          <div className="py-3 px-4 text-right">Takliflar soni</div>
        </div>

        <div className="divide-y divide-white/5">
          {data.map((row, i) => (
            <div
              key={i}
              className={`flex justify-between items-center py-3 px-4 transition-all duration-200 hover:bg-white/5 ${
                i < 3 ? "bg-gradient-to-r from-gray-900/80 to-gray-800/80" : ""
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                {getRankIcon(i + 1)}
                <span className="truncate max-w-[140px] sm:max-w-[200px]">
                  {row.username || row.first_name || "Foydalanuvchi"}
                </span>
              </div>
              <div className="text-sm font-semibold text-cyan-400">
                {row.totalRefs}
              </div>
            </div>
          ))}

          {data.length === 0 && (
            <div className="text-center py-6 text-gray-400">
              💤 Hozircha hech kim mavjud emas
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
