import React, { useRef } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const prizes = ["🚘 Car", "📱 iPhone", "🎧 AirPods", "💰 Gift Cards"];

const PrizeCarousel = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="mt-6 text-center">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-cyan-400"
      >
        {prizes[index]}
      </motion.div>
      <button
        onClick={() => setIndex((index + 1) % prizes.length)}
        className="mt-4 px-4 py-2 bg-purple-600 rounded-lg"
      >
        Next
      </button>
    </div>
  );
};

export default PrizeCarousel;
