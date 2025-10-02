import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationBanner({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} className="fixed left-1/2 -translate-x-1/2 top-16 z-50 glass px-4 py-2 rounded-full">
          <div className="text-sm">{message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}