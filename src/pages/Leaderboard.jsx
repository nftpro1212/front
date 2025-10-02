import React from "react";
import LeaderboardTable from "../components/LeaderboardTable";

export default function Leaderboard() {
  // ⚡ Ishlab chiqarishda API orqali top referallarning ro‘yxatini olib kelish kerak
  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        🏆 Yetakchilar jadvali
      </h1>

      {/* Jadval */}
      <LeaderboardTable />

      {/* Qo‘shimcha info */}
      <div className="glass p-4 rounded-2xl text-center">
        <div className="text-sm">
          Ushbu haftadagi eng faol taklifchilar ro‘yxati. 
          <br /> Do‘stlaringizni taklif qilishda davom eting va mukofotlarga yaqinlashing!
        </div>
      </div>
    </div>
  );
}