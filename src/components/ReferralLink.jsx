import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FiCopy, FiShare2 } from "react-icons/fi";

export default function ReferralLink({ link }) {
  const copy = async () => {
    await navigator.clipboard.writeText(link);
    alert("Havola nusxalandi!");
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Premiumga qo‘shiling",
        text: "Mening havolam orqali qo‘shiling va bonus oling!",
        url: link,
      });
    } else {
      copy();
    }
  };

  return (
    <div className="glass p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-4">
      {/* QR kod */}
      <div className="p-3 bg-white/5 rounded-xl">
        <QRCodeCanvas
          value={link}
          size={100}
          bgColor="transparent"
          fgColor="#e6eef8"
          level="H"
        />
      </div>

      {/* Link va tugmalar */}
      <div className="flex-1 w-full">
        <h3 className="font-semibold mb-2 text-sm">Sizning referral havolangiz</h3>
        <div className="flex gap-2">
          <input
            value={link}
            readOnly
            className="flex-1 bg-transparent border border-white/10 px-3 py-2 rounded-lg text-sm"
          />
          <button
            onClick={copy}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition flex items-center gap-1"
          >
            <FiCopy size={16}/> Nusxalash
          </button>
          <button
            onClick={share}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition flex items-center gap-1"
          >
            <FiShare2 size={16}/> Ulashish
          </button>
        </div>
      </div>
    </div>
  );
}