import React from "react";
import LeaderboardTable from "../components/LeaderboardTable";

export default function Leaderboard(){
  // In production fetch leaderboard from API
  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      <h1 className="text-2xl font-bold">🏆 Leaderboard</h1>
      <LeaderboardTable />
      <div className="glass p-4 rounded-2xl text-center">
        <div className="text-sm small">Top referrers this week — keep sharing!</div>
      </div>
    </div>
  );
}