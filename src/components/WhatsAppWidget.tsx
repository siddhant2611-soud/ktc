import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppWidget() {
  const WHATSAPP_NUMBER = "919999999999"; // Replace with real number
  const WHATSAPP_MESSAGE = encodeURIComponent("Hello! I need a truck.");

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="font-bold text-sm hidden md:inline-block">Need a truck? Chat on WhatsApp</span>
    </a>
  );
}
