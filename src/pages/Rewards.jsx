import React, { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Gift } from "lucide-react";
import API from "../api/axiosInstance";

export default function Rewards() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [spinLimitReached, setSpinLimitReached] = useState(false);

  const prizes = [
    { name: "Omadsiz 😢", probability: 0.7, color: "#5C4033" },
    { name: "5 000 so‘m", probability: 0.1, color: "#B8860B" },
    { name: "10 000 so‘m", probability: 0.08, color: "#C9A227" },
    { name: "20 000 so‘m", probability: 0.05, color: "#E6BE8A" },
    { name: "50 000 so‘m", probability: 0.03, color: "#FFD700" },
    { name: "100 000 so‘m", probability: 0.02, color: "#FFEA00" },
    { name: "Smart-soat", probability: 0.008, color: "#FFCC33" },
    { name: "Powerbank", probability: 0.007, color: "#F5DEB3" },
    { name: "Qo‘l soati", probability: 0.006, color: "#D4AF37" },
    { name: "Planshet", probability: 0.004, color: "#FFF8DC" },
    { name: "iPhone 17 Pro Max", probability: 0.002, color: "#FFD700" },
  ];

  const SEGMENTS = prizes.length;
  const SEGMENT_DEG = 360 / SEGMENTS;

  // 🌀 Ruletni chizish
  const drawWheel = (angleOffsetRad = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cssSize = 420;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = cssSize * dpr;
    canvas.height = cssSize * dpr;
    canvas.style.width = `${cssSize}px`;
    canvas.style.height = `${cssSize}px`;

    const center = canvas.width / 2;
    const radius = center * 0.95;
    const arc = (2 * Math.PI) / SEGMENTS;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < SEGMENTS; i++) {
      const start = angleOffsetRad + i * arc;
      const end = start + arc;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, start, end);
      ctx.closePath();

      const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius);
      gradient.addColorStop(0, "#1a120b");
      gradient.addColorStop(1, prizes[i].color);
      ctx.fillStyle = gradient;
      ctx.fill();

      const labelAngle = start + arc / 2;
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(labelAngle);
      ctx.fillStyle = "#FFF8DC";
      ctx.font = `${14 * dpr}px 'Poppins', sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(prizes[i].name, radius * 0.7, 0);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(center, center, radius * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 215, 0, 0.2)";
    ctx.fill();

    ctx.save();
    ctx.translate(center, center);
    ctx.beginPath();
    const arrowH = 25 * dpr;
    ctx.moveTo(0, -radius - 10 * dpr);
    ctx.lineTo(-arrowH / 2, -radius + arrowH / 2);
    ctx.lineTo(arrowH / 2, -radius + arrowH / 2);
    ctx.closePath();
    ctx.fillStyle = "#FFD700";
    ctx.shadowColor = "#FFD700";
    ctx.shadowBlur = 10 * dpr;
    ctx.fill();
    ctx.restore();
  };

  useEffect(() => {
    drawWheel(0);
  }, []);

  const getRandomPrizeIndex = () => {
    const random = Math.random();
    let cumulative = 0;
    for (let i = 0; i < prizes.length; i++) {
      cumulative += prizes[i].probability;
      if (random <= cumulative) return i;
    }
    return prizes.length - 1;
  };

  const loadHistory = async () => {
    try {
      const tg = window.Telegram?.WebApp;
      const userId = tg?.initDataUnsafe?.user?.id || 123456;
      const res = await API.get(`/rewards/history/${userId}`);
      setHistory(res.data.rewards || []);
    } catch (err) {
      console.error("Tarixni olishda xato:", err.response?.data || err.message);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const saveReward = async (prize) => {
    setSaving(true);
    try {
      const tg = window.Telegram?.WebApp;
      const userId = tg?.initDataUnsafe?.user?.id || 123456;
      await API.post("/rewards/save", { telegramId: userId, prize });
      await loadHistory();
    } catch (error) {
      if (error.response?.status === 403) {
        setSpinLimitReached(true);
        alert(error.response.data.error);
      } else {
        console.error("Sovgani saqlashda xato:", error.response?.data || error.message);
      }
    } finally {
      setSaving(false);
    }
  };

  const spinWheel = () => {
    if (spinning || saving || spinLimitReached) return;
    setSpinning(true);
    setResult("");

    const chosenIndex = getRandomPrizeIndex();
    const spins = 6 + Math.floor(Math.random() * 2);
    const targetDeg = 270;
    const alignDeg = ((targetDeg - (chosenIndex + 0.5) * SEGMENT_DEG) % 360 + 360) % 360;
    const totalRotationDeg = spins * 360 + alignDeg;
    const totalRotationRad = (totalRotationDeg * Math.PI) / 180;
    const duration = 6000;
    const start = performance.now();

    const animate = (time) => {
      const elapsed = time - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const currentRad = totalRotationRad * eased;
      drawWheel(currentRad);

      if (t < 1) requestAnimationFrame(animate);
      else {
        setSpinning(false);
        const prize = prizes[chosenIndex].name;
        if (prize !== "Omadsiz 😢") {
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.7 },
            colors: ["#FFD700", "#FFF8DC", "#FFEC8B", "#F5DEB3"],
          });
          saveReward(prize);
        }
        setResult(
          prize === "Omadsiz 😢"
            ? "😔 Bu safar omad sizdan uzoq... yana urinib ko‘ring!"
            : `🎉 Tabriklaymiz! Siz "${prize}" sovg‘asini yutdingiz!`
        );
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-12 pb-32 text-center text-white space-y-10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/10 via-black/50 to-black/90 -z-10 blur-2xl" />
      <div className="absolute inset-0 bg-[url('/gold-texture.jpg')] opacity-5 -z-10" />

      <div className="flex justify-center items-center gap-2">
        <Sparkles className="w-7 h-7 text-yellow-400" />
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 drop-shadow-lg">
          Omad G'ildiragi
        </h1>
      </div>

      <canvas ref={canvasRef} className="mx-auto rounded-full shadow-[0_0_60px_rgba(255,215,0,0.3)]" />
      <button
        onClick={spinWheel}
        disabled={spinning || saving || spinLimitReached}
        className={`px-12 py-3 text-lg font-semibold rounded-full border border-yellow-400/30 transition-all ${
          spinning || saving || spinLimitReached
            ? "bg-yellow-900/40 cursor-not-allowed text-yellow-300"
            : "bg-gradient-to-r from-yellow-500 to-amber-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] text-black"
        }`}
      >
        {spinLimitReached
          ? "🔒 Bugun limitga yetdingiz"
          : spinning
          ? "Aylanmoqda..."
          : saving
          ? "Saqlanmoqda..."
          : "Ruletni aylantirish 🎯"}
      </button>

      {result && (
        <p
          className={`text-lg font-semibold mt-4 ${
            result.includes("yutdingiz")
              ? "text-yellow-300 animate-pulse"
              : "text-gray-400"
          }`}
        >
          {result}
        </p>
      )}

      <div className="mt-12 text-left bg-yellow-900/10 border border-yellow-500/20 rounded-2xl p-5 shadow-lg">
        <h2 className="flex items-center gap-2 text-xl font-bold text-yellow-300 mb-3">
          <Gift className="w-6 h-6 text-yellow-400" /> Yutgan sovg‘alar tarixi
        </h2>
        {loadingHistory ? (
          <p className="text-gray-400 text-sm">⏳ Yuklanmoqda...</p>
        ) : history.length === 0 ? (
          <p className="text-gray-500 text-sm">Hozircha yutuqlar yo‘q 😅</p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {history.map((h, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-yellow-800/10 border border-yellow-500/10 rounded-lg px-3 py-2 text-sm"
              >
                <span className="text-yellow-200">{h.prize}</span>
                <span className="text-gray-400 text-xs">
                  {new Date(h.createdAt).toLocaleString("uz-UZ")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
