import { motion, AnimatePresence } from "motion/react";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      href="https://wa.me/919911995540"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 right-8 z-50 bg-[#25D366] hover:bg-[#20BE59] text-white p-3 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
      aria-label="Chat on WhatsApp"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
}
