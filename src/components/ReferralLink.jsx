import React from "react";
export default function ReferralLink({ link }) {
  return (
    <div className="border p-3 rounded shadow">
      <h3>Your Referral Link</h3>
      <input value={link} readOnly className="w-full border p-1" />
      <button onClick={() => navigator.clipboard.writeText(link)} className="bg-blue-500 text-white px-3 py-1 mt-2">
        Copy
      </button>
    </div>
  );
}
