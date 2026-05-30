import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Package, Factory, GitBranch, MapPin, Map, X } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: "Road Freight Transport",
    description: "Secure and timely movement of goods across major highways with our maintained fleet.",
    details: "We ensure point-to-point delivery using standard road freight logistics seamlessly integrated with your business operations. Our vast network and real-time tracking give you complete visibility."
  },
  {
    icon: Package,
    title: "Commercial Goods",
    description: "Specialized transportation solutions for retail and commercial inventory management.",
    details: "Your high-value inventory needs cautious shipping workflows. Our commercial goods carriers provide safety, compartmentalization, and rapid turnaround required for retail efficiency."
  },
  {
    icon: Factory,
    title: "Industrial Logistics",
    description: "Handling heavy machinery and raw materials for industrial and manufacturing sectors.",
    details: "KTC manages complex, oversized cargo through extensive industrial fleet capabilities. Safety standards and optimal route planning ensure minimal equipment downtime."
  },
  {
    icon: GitBranch,
    title: "Supply Chain Solutions",
    description: "End-to-end business logistics and supply chain optimization for maximum efficiency.",
    details: "Custom-tailored tracking, load consolidation, and dynamic rerouting. We turn complex supply chains into predictable, visible extensions of your assembly line."
  },
  {
    icon: MapPin,
    title: "Local Delivery Services",
    description: "Fast and reliable intracity and regional delivery operations in Uttar Pradesh.",
    details: "Optimized for dense urban networks and short geographic spans. Our local dispatch teams act quickly to respond to intraday and priority local drops."
  },
  {
    icon: Map,
    title: "Long Distance Transport",
    description: "Cross-border and pan-India logistics focusing on safety over long routes.",
    details: "When transporting interstate, our priority is fleet reliability and driver safety. We rely on extensive cross-border compliance knowledge and GPS tracking to deliver long-haul perfection."
  }
];

export function Services() {
  const [activeService, setActiveService] = useState<typeof services[0] | null>(null);

  const closeModal = () => setActiveService(null);

  return (
    <section id="services" className="py-24 bg-ktc-bg-primary relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-ktc-bg-section/40 via-ktc-bg-primary to-ktc-bg-primary pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-ktc-accent-primary font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Our Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-6"
          >
            Premium Logistics Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-ktc-text-muted font-sans text-lg"
          >
            Comprehensive transportation solutions engineered for scale, speed, and absolute reliability.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-ktc-bg-card border border-ktc-border rounded-xl p-8 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-ktc-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-14 h-14 bg-ktc-bg-section rounded-lg flex items-center justify-center mb-6 border border-ktc-border group-hover:border-ktc-accent-primary/30 transition-colors relative z-10">
                <service.icon className="w-7 h-7 text-ktc-accent-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-3 relative z-10">
                {service.title}
              </h3>
              
              <p className="text-ktc-text-muted font-sans text-sm leading-relaxed mb-6 relative z-10 group-hover:text-gray-300 transition-colors">
                {service.description}
              </p>
              
              <button 
                onClick={() => setActiveService(service)}
                className="inline-flex items-center text-ktc-accent-primary font-bold text-[10px] uppercase tracking-widest group/link relative z-10 hover:text-white transition-colors"
              >
                Learn More
                <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ktc-bg-section border border-ktc-border max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={closeModal}
                  className="bg-black/50 hover:bg-ktc-accent-primary text-white p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8">
                <div className="w-16 h-16 bg-ktc-bg-primary rounded-xl flex items-center justify-center mb-6 border border-ktc-border shadow-[0_0_15px_rgba(29,78,216,0.15)]">
                  <activeService.icon className="w-8 h-8 text-ktc-accent-primary" />
                </div>
                
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2">
                  {activeService.title}
                </h3>
                
                <p className="text-ktc-accent-primary font-bold text-sm tracking-wide mb-6">
                  {activeService.description}
                </p>
                
                <div className="bg-ktc-bg-primary/50 border border-ktc-border p-6 rounded-xl">
                  <p className="text-gray-300 text-sm leading-relaxed font-sans">
                    {activeService.details}
                  </p>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <a href="#contact" onClick={closeModal} className="bg-white hover:bg-gray-200 text-black font-bold uppercase tracking-widest text-[11px] px-6 py-3 rounded transition-colors inline-block text-center">
                    Get a Quote
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
