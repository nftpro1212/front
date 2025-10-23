import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { Trophy, Crown, Medal } from "lucide-react";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/referrals/leaderboard")
      .then((res) => setData(res.data.leaderboard || []))
      .catch((err) =>
        console.error("Leaderboard xatosi:", err.response?.data || err.message)
      )
      .finally(() => setLoading(false));
  }, []);

  // 🎁 Mukofotlar ro‘yxati
  const getPrize = (rank) => {
    const cashPrizes = [300000, 200000, 150000, 120000, 90000, 70000, 50000];
    switch (rank) {
      case 1:
        return "🎉 iPhone 17 Pro Max";
      case 2:
        return "🎁 iPad Air (2025)";
      case 3:
        return "🎧 AirPods Max";
      default:
        return rank >= 4 && rank <= 10
          ? `${cashPrizes[rank - 4].toLocaleString()} so‘m`
          : "-";
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400 drop-shadow-gold" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300 drop-shadow-silver" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600 drop-shadow-bronze" />;
      default:
        return (
          <span className="font-bold text-yellow-300 drop-shadow-gold">
            #{rank}
          </span>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-12 pb-24 space-y-8 text-white relative">
      {/* ✨ Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/10 via-black/60 to-black/95 blur-2xl -z-10" />
      <div className="absolute inset-0 bg-[url('/gold-texture.jpg')] opacity-10 -z-10" />

      {/* 🏆 Header */}
      <div className="flex flex-col items-center gap-2">
        <Trophy className="w-10 h-10 text-yellow-400 animate-bounce" />
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-amber-400 drop-shadow-gold">
          Gold Yetakchilar Jadvali
        </h1>
      </div>

      {/* 📋 Jadval */}
      <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.2)]">
        <div className="hidden sm:grid grid-cols-4 bg-yellow-500/10 text-xs sm:text-sm uppercase tracking-wider font-semibold text-yellow-300 border-b border-yellow-600/20">
          <div className="py-3 px-4">O‘rin</div>
          <div className="py-3 px-4">Foydalanuvchi</div>
          <div className="py-3 px-4 text-center">Takliflar</div>
          <div className="py-3 px-4 text-right">Mukofot</div>
        </div>

        {/* 🔄 Yuklanish jarayoni */}
        {loading && (
          <div className="py-10 text-center text-yellow-300/70 animate-pulse">
            ⏳ Yuklanmoqda...
          </div>
        )}

        {!loading && (
          <div className="divide-y divide-yellow-600/10">
            {data.slice(0, 10).map((row, i) => {
              const rank = i + 1;
              const prize = getPrize(rank);
              const glow =
                rank === 1
                  ? "from-yellow-500/20 to-yellow-300/10"
                  : rank === 2
                  ? "from-gray-400/20 to-gray-200/10"
                  : rank === 3
                  ? "from-amber-500/10 to-amber-200/5"
                  : "from-yellow-900/10 to-black/5";

              return (
                <div
                  key={i}
                  className={`grid grid-cols-4 items-center py-4 px-4 text-sm sm:text-base transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] bg-gradient-to-r ${glow}`}
                >
                  <div className="flex items-center gap-2">
                    {getRankIcon(rank)}
                  </div>
                  <div className="truncate font-medium flex items-center gap-2">
                    {row.avatar ? (
                      <img
                        src={row.avatar}
                        alt="avatar"
                        className="w-6 h-6 rounded-full border border-yellow-400/40"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-600/40" />
                    )}
                    <span>{row.username || row.first_name || "Foydalanuvchi"}</span>
                  </div>
                  <div className="text-center font-semibold text-yellow-300">
                    {row.total || 0}
                  </div>
                  <div className="text-right font-semibold text-yellow-200">
                    {prize}
                  </div>
                </div>
              );
            })}

            {data.length === 0 && (
              <div className="text-center py-8 text-yellow-300/60">
                😴 Hozircha hech kim mavjud emas...
              </div>
            )}
          </div>
        )}
      </div>

      {/* 💰 Bonus izohi */}
      <div className="text-center text-sm text-yellow-200/60 mt-8">
        💰 Umumiy mukofot jamg‘armasi:{" "}
        <b>1 000 000 so‘m + Premium sovg‘alar</b>
      </div>
    </div>
  );
}
