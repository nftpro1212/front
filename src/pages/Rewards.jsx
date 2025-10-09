import React, { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import WinnersCarousel from "../components/WinnersCarousel";

export default function Rewards() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");

  // 🎁 Sovgalar va ularning ehtimollari (toifalarga qarab)
  const prizes = [
    { name: "Omadsiz 😢", probability: 0.70, color: "#E57373" },
    { name: "5 000 so‘m", probability: 0.1, color: "#FFB74D" },
    { name: "10 000 so‘m", probability: 0.1, color: "#81C784" },
    { name: "20 000 so‘m", probability: 0.08, color: "#64B5F6" },
    { name: "50 000 so‘m", probability: 0.06, color: "#4CAF50" },
    { name: "100 000 so‘m", probability: 0.009, color: "#8BC34A" },
    { name: "Naushnik", probability: 0.03, color: "#BA68C8" },
    { name: "Smart-soat", probability: 0.02, color: "#F06292" },
    { name: "Powerbank", probability: 0.010, color: "#26C6DA" },
    { name: "Qo‘l soati", probability: 0.01, color: "#FF8A65" },
    { name: "Planshet", probability: 0.007, color: "#9575CD" },
    { name: "Noutbuk", probability: 0.005, color: "#64B5F6" },
    { name: "iPhone 17 Pro Max", probability: 0.003, color: "#FFD700" }, // eng kam ehtimol
  ];

  const SEGMENTS = prizes.length;
  const SEGMENT_DEG = 360 / SEGMENTS;

  // 🎨 Rulet chizish funksiyasi
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

    const center = (canvas.width / 2);
    const radius = center * 0.95;
    const arc = (2 * Math.PI) / SEGMENTS;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < SEGMENTS; i++) {
      const start = angleOffsetRad + i * arc;
      const end = start + arc;

      // sektor
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = prizes[i].color;
      ctx.fill();

      // matn
      const labelAngle = start + arc / 2;
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(labelAngle);
      const textRadius = radius * 0.7;
      ctx.fillStyle = "#fff";
      ctx.font = `${13 * dpr}px Poppins, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(prizes[i].name, textRadius, 0);
      ctx.restore();
    }

    // markazdagi doira
    ctx.beginPath();
    ctx.arc(center, center, radius * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fill();

    // strelka
    ctx.save();
    ctx.translate(center, center);
    ctx.beginPath();
    const arrowH = 25 * dpr;
    ctx.moveTo(0, -radius - 10 * dpr);
    ctx.lineTo(-arrowH / 2, -radius + arrowH / 2);
    ctx.lineTo(arrowH / 2, -radius + arrowH / 2);
    ctx.closePath();
    ctx.fillStyle = "#FFD36B";
    ctx.shadowColor = "#FFD36B";
    ctx.shadowBlur = 8 * dpr;
    ctx.fill();
    ctx.restore();
  };

  useEffect(() => {
    drawWheel(0);
    const onResize = () => drawWheel(0);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 🎯 Tasodifiy sovg‘a tanlash ehtimol asosida
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
    const targetDeg = 270; // strelka yuqorida
    const alignDeg =
      ((targetDeg - (chosenIndex + 0.5) * SEGMENT_DEG) % 360 + 360) % 360;
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

        // 🎆 Confetti effekti
        if (prize === "iPhone 17 Pro Max") {
          for (let i = 0; i < 5; i++) {
            setTimeout(() => {
              confetti({
                particleCount: 200,
                spread: 150,
                origin: { y: 0.6 },
                colors: ["#FFD700", "#FF69B4", "#00C853"],
              });
            }, i * 400);
          }
        } else if (prize !== "Omadsiz 😢") {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.7 },
            colors: ["#FFD700", "#FF69B4", "#4CAF50", "#64B5F6"],
          });
        }

        // 🏁 Natijani chiqarish
        if (prize === "Omadsiz 😢") {
          setResult("😔 Afsus, bu safar omad sizdan uzoq...");
        } else if (prize === "iPhone 17 Pro Max") {
          setResult(`🏆 Super omad! Siz "${prize}" yutdingiz! 🎉`);
        } else {
          setResult(`🎁 Siz "${prize}" sovg‘asini yutdingiz!`);
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-8 pb-24 space-y-6 text-center text-white">
      <h1 className="text-3xl font-bold">🎯 Sovg‘alar Ruleti</h1>
      <p className="text-sm text-gray-300">
        Aylantiring va omad sinang — faqat 0.3% ehtimol bilan iPhone 17 Pro Max!
      </p>

      <div className="flex flex-col items-center gap-4">
        <canvas
          ref={canvasRef}
          width={420}
          height={420}
          className="rounded-full shadow-2xl"
          style={{ width: 420, height: 420 }}
        />

        <button
          onClick={spinWheel}
          disabled={spinning}
          className={`px-8 py-3 rounded-full font-semibold shadow-lg transition-transform
            ${spinning
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105"}
            text-white`}
        >
          {spinning ? "Aylanmoqda..." : "Aylantirish"}
        </button>

        {result && (
          <div className="mt-3 text-lg font-semibold text-yellow-300 transition-all">
            {result}
          </div>
        )}
      </div>

      <WinnersCarousel
        winners={[
          { name: "Jasur", prize: "Noutbuk", avatar: "/avatar1.jpg", note: "1-oktabr" },
          { name: "Madina", prize: "iPhone 17 Pro Max", avatar: "/avatar2.jpg", note: "27-sentabr" },
          { name: "Diyorbek", prize: "Omadsiz 😢", avatar: "/avatar3.jpg", note: "9-oktabr" },
        ]}
      />
    </div>
  );
}