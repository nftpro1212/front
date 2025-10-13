import React, { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";

export default function Rewards() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");

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

    // markazdagi bezak
    ctx.beginPath();
    ctx.arc(center, center, radius * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 215, 0, 0.2)";
    ctx.fill();

    // indikator (oltin uch)
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
    const onResize = () => drawWheel(0);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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

  const spinWheel = () => {
    if (spinning) return;
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

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        const prize = prizes[chosenIndex].name;

        if (prize !== "Omadsiz 😢") {
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.7 },
            colors: ["#FFD700", "#FFF8DC", "#FFEC8B", "#F5DEB3"],
          });
        }

        setResult(
          prize === "Omadsiz 😢"
            ? "😔 Bu safar omad sizdan uzoq... yana urinib ko‘ring!"
            : `🎉 Tabriklaymiz! Siz "${prize}" sovg‘asini yutdingiz!`
        );
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-12 pb-24 text-center text-white space-y-10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/10 via-black/50 to-black/90 -z-10 blur-2xl" />
      <div className="absolute inset-0 bg-[url('/gold-texture.jpg')] opacity-5 -z-10" />

      <div className="flex justify-center items-center gap-2">
        <Sparkles className="w-7 h-7 text-yellow-400" />
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 drop-shadow-lg">
          Gold Rulet
        </h1>
      </div>

      <p className="text-sm text-yellow-200/80 max-w-md mx-auto">
        💫 Ruletni aylantiring — sizda 0.2% ehtimol bilan <b>iPhone 17 Pro Max</b> yutib olish imkoniyati bor!
      </p>

      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={420}
            height={420}
            className={`rounded-full shadow-[0_0_60px_rgba(255,215,0,0.3)] transition-all ${
              spinning ? "scale-95 opacity-90" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-500/10 to-amber-300/10 blur-2xl" />
        </div>

        <button
          onClick={spinWheel}
          disabled={spinning}
          className={`px-12 py-3 text-lg font-semibold rounded-full shadow-lg transition-all border border-yellow-400/30
            ${
              spinning
                ? "bg-yellow-900/40 cursor-not-allowed text-yellow-300"
                : "bg-gradient-to-r from-yellow-500 to-amber-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] text-black"
            }`}
        >
          {spinning ? "Aylanmoqda..." : "Ruletni aylantirish 🎯"}
        </button>

        {result && (
          <div
            className={`text-lg font-semibold mt-4 transition-all ${
              result.includes("yutdingiz")
                ? "text-yellow-300 animate-pulse drop-shadow-lg"
                : "text-gray-400"
            }`}
          >
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
