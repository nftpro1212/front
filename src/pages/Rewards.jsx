import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

const SEGMENTS = 24;
const SEGMENT_LABELS = [
  "5 000 UZS", "10 000 UZS", "50 000 UZS", "Earbuds",
  "Smartwatch", "Gaming Console", "Laptop", "5 000 UZS",
  "10 000 UZS", "50 000 UZS", "5 000 UZS", "Earbuds",
  "Smartwatch", "10 000 UZS", "Gaming Console", "Laptop",
  "50 000 UZS", "5 000 UZS", "Earbuds", "Smartwatch",
  "10 000 UZS", "Gaming Console", "Laptop", "📱 iPhone 17 Pro Max"
];

const Rewards = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [size, setSize] = useState(340);
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);
  const [spinning, setSpinning] = useState(false);
  const [resultIndex, setResultIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const colors = Array.from({ length: SEGMENTS }, (_, i) =>
    i === SEGMENTS - 1 ? "#FFD700" : i % 2 === 0 ? "#5b21b6" : "#0ea5e9"
  );

  // 🌀 Wheel drawing function
  const draw = (ctx, dpr) => {
    const w = size;
    const h = size;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) - 10 * dpr;

    ctx.clearRect(0, 0, w * dpr, h * dpr);
    ctx.save();
    ctx.translate(cx * dpr, cy * dpr);
    ctx.rotate((angleRef.current * Math.PI) / 180);

    const segAngle = (2 * Math.PI) / SEGMENTS;

    for (let i = 0; i < SEGMENTS; i++) {
      const start = i * segAngle;
      const end = start + segAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius * dpr, start, end);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();

      // Vertical prize text with dynamic font size
      ctx.save();
      const mid = start + segAngle / 2;
      const tx = Math.cos(mid) * radius * 0.65 * dpr; // Adjusted position
      const ty = Math.sin(mid) * radius * 0.65 * dpr;
      ctx.translate(tx, ty);
      ctx.rotate(mid + Math.PI / 2);

      ctx.fillStyle = i === SEGMENTS - 1 ? "#111" : "#fff";
      const fontSize = Math.max(8 * dpr, size * 0.025 * dpr); // Dynamic font size
      ctx.font = `${fontSize}px Poppins, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const label = SEGMENT_LABELS[i];
      const chars = label.split("");
      const lineHeight = fontSize * 1.2;
      const totalHeight = chars.length * lineHeight;
      chars.forEach((char, j) => {
        ctx.fillText(char, 0, j * lineHeight - totalHeight / 2);
      });
      ctx.restore();
    }

    // Golden ring
    ctx.beginPath();
    ctx.arc(0, 0, radius * dpr + 6 * dpr, 0, Math.PI * 2);
    ctx.lineWidth = 8 * dpr;
    ctx.strokeStyle = "#FFD36B";
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.2 * dpr, 0, Math.PI * 2);
    ctx.fillStyle = "gold";
    ctx.fill();
    ctx.restore();
  };

  // 📱 Responsive size handling
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = Math.min(containerRef.current.clientWidth, 400);
      setSize(w);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔄 Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d");
    draw(ctx, dpr);
  }, [size, angle]);

  // 🎰 Spin mechanism with improved animation
  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResultIndex(null);
    setShowModal(false);

    const isIphone = Math.random() < 1 / 1000;
    const winnerIndex = isIphone
      ? SEGMENTS - 1
      : Math.floor(Math.random() * (SEGMENTS - 1));

    const segDeg = 360 / SEGMENTS;
    const segCenter = winnerIndex * segDeg + segDeg / 2;
    const target = 270; // Align to top
    const offset = (target - segCenter + 360) % 360;
    const extraSpins = 360 * (6 + Math.floor(Math.random() * 4)); // More spins for drama
    const finalRotation = angleRef.current + extraSpins + offset;

    const startAngle = angleRef.current;
    const duration = 6000; // Smoother, longer animation
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 5); // Stronger easing

    angleRef.current = finalRotation;

    const animate = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOut(t);
      const current = startAngle + (finalRotation - startAngle) * eased;
      setAngle(current % 360); // Normalize angle

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        setResultIndex(winnerIndex);
        setShowModal(true);
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.6 },
          colors: ["#FFD700", "#ffffff", "#00ffff", "#ff00ff"],
        });
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <div className="w-full max-w-md">
        {/* 💰 Balance Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 flex items-center gap-3">
            <div className="text-yellow-400 text-2xl">💰</div>
            <div>
              <div className="text-xs text-gray-300">Balance</div>
              <div className="text-sm font-bold text-white">50 000 UZS</div>
            </div>
          </div>
          <div className="text-sm text-gray-300 font-medium">3/5 spins left</div>
        </div>

        {/* 🎡 Wheel */}
        <div ref={containerRef} className="relative mx-auto" style={{ width: size }}>
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-20 pointer-events-none">
            <div
              className="w-0 h-0 border-l-[14px] border-r-[14px] border-b-[24px] border-l-transparent border-r-transparent border-b-yellow-400"
              style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }}
            />
          </div>

          <canvas
            ref={canvasRef}
            className="rounded-full mx-auto"
            style={{
              boxShadow:
                "0 12px 40px rgba(0,0,0,0.7), inset 0 8px 12px rgba(255,255,255,0.1)",
            }}
          />

          {/* 🟡 Spin Button */}
          <button
            onClick={spin}
            disabled={spinning}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 rounded-full flex items-center justify-center transition-transform duration-200 ${
              spinning ? "opacity-70 cursor-not-allowed" : "hover:scale-105 active:scale-95"
            }`}
            style={{
              width: size * 0.28,
              height: size * 0.28,
              background: "linear-gradient(145deg, #FFD36B, #D4AF37)",
              color: "#111",
              fontWeight: 700,
              fontSize: "18px",
              boxShadow:
                "0 10px 25px rgba(212,175,55,0.3), inset 0 -5px 10px rgba(0,0,0,0.2)",
              border: "3px solid rgba(255,255,255,0.2)",
            }}
          >
            {spinning ? "Aylanmoqda..." : "SPIN"}
          </button>
        </div>

        {/* 🏆 Result */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-300">
            Spin tugmasini bosing va omad sinab ko‘ring!
          </div>
          {resultIndex !== null && (
            <div className="mt-4 p-4 bg-white/10 rounded-lg inline-block backdrop-blur-lg">
              <div className="text-xs text-gray-300">Siz yutdingiz:</div>
              <div className="font-bold text-lg text-yellow-400">
                {SEGMENT_LABELS[resultIndex]}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 🎉 Modal */}
      {showModal && resultIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-50 bg-gradient-to-br from-indigo-800 to-purple-800 p-6 rounded-2xl shadow-2xl max-w-sm w-[90%] text-center border border-white/10">
            <div className="text-xl font-semibold text-yellow-400 mb-2">
              🎉 Tabriklaymiz!
            </div>
            <div className="text-2xl font-bold text-white mb-4">
              {SEGMENT_LABELS[resultIndex]}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-medium"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rewards;