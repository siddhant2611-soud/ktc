import { motion } from "motion/react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloat() {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      href="https://wa.me/919810977611?text=Hello!%20I%20need%20a%20truck."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 right-8 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BE59] text-white px-4 py-3 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-colors focus:outline-none cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <WhatsAppIcon className="w-5 h-5" />
      <span className="font-bold text-sm tracking-wide hidden md:inline-block">Need a truck? Chat on WhatsApp</span>
    </motion.a>
  );
}
