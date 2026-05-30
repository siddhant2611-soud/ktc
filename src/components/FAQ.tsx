import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { 
    q: "How can I make an online truck booking?", 
    a: "You can easily request a truck by filling out our online form or calling our 24/7 support line. Provide pickup, drop-off, and material details for an instant freight quote." 
  },
  { 
    q: "Do you provide Full Truckload (FTL) services?", 
    a: "Yes, we specialize in Full Truckload (FTL) services across PAN India. We provide dedicated, GPS-tracked vehicles tailored to your specific material and tonnage requirements." 
  },
  { 
    q: "How can I track my vehicle during transit?", 
    a: "All our engaged trucks are equipped with GPS tracking. Our dedicated support team provides timely updates and live location links, ensuring 100% transparency." 
  },
  { 
    q: "Are there any hidden or additional charges?", 
    a: "No. Our quotes are completely transparent. Any potential waiting charges, halting fees, or toll deviations will be clearly communicated to you upfront before booking." 
  },
  { 
    q: "When and how will I get my Invoice and POD (Proof of Delivery)?", 
    a: "Proof of Delivery (POD) and invoices are digitally shared with you immediately upon successful delivery and unloading, accelerating your internal business cycles." 
  },
  {
    q: "Can I place a booking with multi-point pickup and drop?",
    a: "Absolutely. We offer customized routing for complex supply chains, including multi-point pickups and multi-point drops. Please mention this requirement when grabbing your quote."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#111827] border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none scale-150 transform translate-x-1/4 -translate-y-1/4">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="0.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-6"
            >
              Frequently <br />
              <span className="text-ktc-accent-primary">Asked</span> Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#94A3B8] text-lg mb-8"
            >
              Find quick answers to common queries regarding our transport services, fleet, and booking procedures.
            </motion.p>
          </div>

          <div className="lg:w-2/3">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className={`border ${openIndex === index ? 'border-ktc-accent-primary' : 'border-white/10'} bg-[#161B22] rounded-xl overflow-hidden transition-colors`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-sm font-bold text-white leading-relaxed pr-8">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 text-[#94A3B8] transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-ktc-accent-primary' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-0 text-[13px] text-[#94A3B8] leading-relaxed border-t border-white/5 mt-2">
                          <div className="pt-4">{faq.a}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
