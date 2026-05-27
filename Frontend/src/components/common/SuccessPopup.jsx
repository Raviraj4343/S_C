import { motion } from "framer-motion";

const SuccessPopup = ({ open, message }) => {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-8 right-6 z-50 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-xl"
    >
      {message}
    </motion.div>
  );
};

export default SuccessPopup;
