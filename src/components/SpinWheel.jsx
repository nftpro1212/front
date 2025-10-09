import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "../Rewards.css";

const prizes = [
  "5 000 UZS", "10 000 UZS", "50 000 UZS", "Smart soat",
  "Bluetooth quloqchin", "Krujka", "Qo‘l soati", "Mini kolonka",
  "Kalendar", "Sumka", "Powerbank", "Gaming klaviatura",
  "T-shirt", "USB fleshka", "Sticker to‘plami", "15 000 ball",
  "20 000 ball", "Headphones", "Kamera", "📱 iPhone 17 Pro Max"
];

export default function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [available, setAvailable] = useState(true);
  const [timer, setTimer] = useState(0);
  const [result, setResult] = useState(null);

  const segCount = prizes.length;
  const segmentAngle = 360 / segCount;

  // 24 soat cheklov
  useEffect(() => {
    const lastSpin = localStorage.getItem("lastSpin");
    if (lastSpin) {
      const diff = Date.now() - parseInt(lastSpin);
      if (diff < 24 * 60 * 60 * 1000) {
        setAvailable(false);
        setTimer(24 * 60 * 60 * 1000 - diff);
      }
    }
  }, []);

  // Timer
  useEffect(() => {
    if (!available && timer > 0) {
      const interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1000) {
            clearInterval(interval);
            setAvailable(true);
            return 0;
          }
          return t - 1000;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [available, timer]);

  const handleSpin = () => {
    if (spinning || !available) return;

    const rare = Math.random() < 1 / 1000;
    const prizeIndex = rare
      ? segCount - 1
      : Math.floor(Math.random() * (segCount - 1));

    const newRotation =
      rotation + 360 * 10 + (360 - prizeIndex * segmentAngle - segmentAngle / 2);

    setSpinning(true);
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(prizes[prizeIndex]);
      confetti({ particleCount: 180, spread: 90, origin: { y: 0.7 } });
      localStorage.setItem("lastSpin", Date.now().toString());
      setAvailable(false);
      setTimer(24 * 60 * 60 * 1000);
    }, 6000);
  };

  const formatTime = (ms) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${h} soat ${m} daqiqa ${s} soniya`;
  };

  return (
    <div className="wheel-wrapper">
      <div className="wheel-container">
        <div
          className={`wheel ${spinning ? "spinning" : ""}`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 6s cubic-bezier(0.2, 0.8, 0.3, 1)" : "none"
          }}
        >
          {prizes.map((p, i) => (
            <div
              key={i}
              className="segment"
              style={{
                transform: `rotate(${i * segmentAngle}deg) skewY(-${90 - segmentAngle}deg)`
              }}
            >
              <div
                className="segment-label"
                style={{
                  transform: `skewY(${90 - segmentAngle}deg) rotate(${segmentAngle / 2}deg)`
                }}
              >
                {p}
              </div>
            </div>
          ))}
        </div>

        <div className="arrow"></div>
        <button
          className={`spin-btn ${!available ? "disabled" : ""}`}
          onClick={handleSpin}
          disabled={!available || spinning}
        >
          {available ? (spinning ? "Aylanmoqda..." : "Aylantirish 🎡") : `Qolgan vaqt: ${formatTime(timer)}`}
        </button>
      </div>

      {result && !spinning && (
        <div className="result-modal">
          <div className="result-box">
            <h3>🎉 Tabriklaymiz!</h3>
            <p>Siz yutdingiz:</p>
            <b>{result}</b>
            <button onClick={() => setResult(null)}>Yopish</button>
          </div>
        </div>
      )}
    </div>
  );
}