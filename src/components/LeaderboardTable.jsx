import React from "react";

const LeaderboardTable = () => {
  const data = [
    { rank: 1, name: "Ozodbek", referrals: 45 },
    { rank: 2, name: "Jasur", referrals: 32 },
    { rank: 3, name: "Madina", referrals: 28 },
  ];

  return (
    <div className="mt-4">
      <table className="w-full text-sm text-left border border-gray-700 rounded-xl overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2">O‘rin</th>
            <th className="p-2">Foydalanuvchi</th>
            <th className="p-2">Takliflar soni</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.rank} className="odd:bg-gray-900 even:bg-gray-800">
              <td className="p-2 font-bold text-cyan-400">#{row.rank}</td>
              <td className="p-2">{row.name}</td>
              <td className="p-2">{row.referrals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;