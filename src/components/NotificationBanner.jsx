import { motion, AnimatePresence } from "framer-motion";

export default function NotificationBanner({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg text-sm z-50"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}