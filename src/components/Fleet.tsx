import { motion } from 'motion/react';
import { Truck, ChevronRight } from 'lucide-react';

const vehicles = [
  { 
    name: "32 Ft Multi-Axle / Container", 
    capacity: "14-20 Tons", 
    type: "Heavy Duty", 
    desc: "Ideal for high volume, heavy industrial goods and FMCG on long haul PAN-India routes.",
    imageUrl: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=600"
  },
  { 
    name: "20-22 Ft Closed Container", 
    capacity: "6-9 Tons", 
    type: "Secure Transit", 
    desc: "Perfect for electronics, garments, pharmaceuticals, and weather-sensitive cargo.",
    imageUrl: "https://images.unsplash.com/photo-1601584115168-9bfb2c86443c?auto=format&fit=crop&q=80&w=600"
  },
  { 
    name: "17-19 Ft Open Body", 
    capacity: "5-7 Tons", 
    type: "Versatile", 
    desc: "Suited for construction materials, machinery, hardware, and agricultural products.",
    imageUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=600"
  },
  { 
    name: "14 Ft Container", 
    capacity: "3-4 Tons", 
    type: "Local & Regional", 
    desc: "Best for intra-city distributions, short-distance inter-city deliveries and retail supply.",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8ed7c50a18?auto=format&fit=crop&q=80&w=600"
  }
];

export function Fleet() {
  return (
    <section id="fleet" className="py-24 bg-[#0A0A0A] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-4"
            >
              Over 20+ Lakh Vehicles <span className="text-ktc-accent-primary">Network</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#94A3B8] text-lg max-w-xl"
            >
              From part truckloads (PTL) to full truckloads (FTL), trust our expansive fleet for safe, timely, and trackable deliveries across India.
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#contact"
            className="flex items-center gap-2 border border-white/10 hover:border-ktc-accent-primary px-6 py-3 rounded text-[12px] font-bold uppercase tracking-widest text-white transition-colors w-fit"
          >
            Explore Options <ChevronRight className="w-4 h-4" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#161B22] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#FF6B00]/50 transition-colors flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={v.imageUrl} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold text-white tracking-wider border border-white/10 uppercase">
                  {v.capacity}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="w-4 h-4 text-ktc-accent-primary" />
                  <span className="text-[10px] font-bold text-ktc-accent-primary uppercase tracking-widest">{v.type}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">{v.name}</h3>
                <p className="text-[12px] text-[#94A3B8] leading-relaxed flex-grow">{v.desc}</p>
                <div className="h-[1px] w-full bg-white/5 my-4" />
                <a href="#contact" className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1 group-hover:text-ktc-accent-primary transition-colors">
                  Book this truck <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
