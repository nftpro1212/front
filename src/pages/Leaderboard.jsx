import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { Trophy, Crown, Medal, X } from "lucide-react";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    API.get("/referrals/leaderboard")
      .then((res) => setData(res.data.leaderboard || []))
      .catch((err) =>
        console.error("Leaderboard xatosi:", err.response?.data || err.message)
      )
      .finally(() => setLoading(false));
  }, []);

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
        return <span className="font-bold text-yellow-300">#{rank}</span>;
    }
  };

  // 🔹 Yetakchini bosganda uning referallarini olish
  const handleShowReferrals = async (telegramId, username) => {
    try {
      setSelectedUser(username);
      setModalOpen(true);
      setReferrals([]);
      const res = await API.get(`/referrals/history/${telegramId}`);
      setReferrals(res.data.list || []);
    } catch (err) {
      console.error("Referral tarix xatosi:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-12 pb-24 space-y-8 text-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/10 via-black/60 to-black/95 blur-2xl -z-10" />
      <div className="absolute inset-0 bg-[url('/gold-texture.jpg')] opacity-10 -z-10" />

      <div className="flex flex-col items-center gap-2">
        <Trophy className="w-10 h-10 text-yellow-400 animate-bounce" />
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-amber-400 drop-shadow-gold">
          Gold Yetakchilar Jadvali
        </h1>
      </div>

      {/* 📋 Jadval */}
      <div className="bg-black/40 backdrop-blur-xl border border-yellow-500/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.2)]">
        {!loading && (
          <div className="divide-y divide-yellow-600/10">
            {data.slice(0, 10).map((row, i) => {
              const rank = i + 1;
              const prize = getPrize(rank);
              return (
                <div
                  key={i}
                  className={`grid grid-cols-4 items-center py-4 px-4 text-sm sm:text-base cursor-pointer hover:bg-yellow-500/10 transition`}
                  onClick={() =>
                    handleShowReferrals(row.referrerId, row.username)
                  }
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
                    {row.totalRefs || 0}
                  </div>
                  <div className="text-right font-semibold text-yellow-200">
                    {prize}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 🔹 Modal oyna */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-96 border border-yellow-500/30 relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-yellow-400 hover:text-white transition"
              onClick={() => setModalOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-yellow-300 mb-3 text-center">
              {selectedUser}’ning referallari
            </h2>

            {referrals.length > 0 ? (
              <ul className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-600/30">
                {referrals.map((r, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 bg-black/30 p-2 rounded-lg border border-yellow-600/10"
                  >
                    {r.avatar ? (
                      <img
                        src={r.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full border border-yellow-500/30"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-yellow-600/20 border border-yellow-600/40" />
                    )}
                    <div>
                      <p className="font-medium text-yellow-100">
                        {r.username || r.first_name || "Ismsiz foydalanuvchi"}
                      </p>
                      <p className="text-xs text-yellow-400/60">
                        {new Date(r.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-yellow-400/70 mt-4">
                Hozircha hech kimni chaqirmagan 😴
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
