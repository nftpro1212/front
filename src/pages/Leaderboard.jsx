import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";

export default function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/referral/leaderboard")
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-32 space-y-6">
      <h1 className="text-2xl font-bold">🏆 Yetakchilar jadvali</h1>

      <table className="w-full text-sm text-left border border-gray-700 rounded-xl overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Foydalanuvchi</th>
            <th className="p-2">Takliflar soni</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="odd:bg-gray-900 even:bg-gray-800">
              <td className="p-2 font-bold text-cyan-400">#{i + 1}</td>
              <td className="p-2">{row.username || row.firstName}</td>
              <td className="p-2">{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
