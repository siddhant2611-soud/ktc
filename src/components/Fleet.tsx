import { motion } from 'motion/react';
import { Truck, ChevronRight } from 'lucide-react';

const vehicles = [
  { 
    name: "10 Ft Mini Truck", 
    capacity: "1-1.5 Tons", 
    type: "Last Mile", 
    id: "10ft",
    desc: "Perfect for quick, intra-city drops, light electronics, and small-scale shifting.",
    imageUrl: "/mini_truck_10ft.png?v=2"
  },
  { 
    name: "14 Ft Closed Container", 
    capacity: "3-4 Tons", 
    type: "Local & Regional",
    id: "14ft",
    desc: "Best for intra-city distributions, short-distance inter-city deliveries and retail supply.",
    imageUrl: "/truck_14ft_open.png?v=2"
  },
  { 
    name: "19 Ft Closed Container", 
    capacity: "5-7 Tons", 
    type: "Versatile",
    id: "19ft",
    desc: "Suited for construction materials, machinery, hardware, and agricultural products.",
    imageUrl: "/truck_19ft_open.png"
  },
  { 
    name: "20-22 Ft Closed Container", 
    capacity: "6-9 Tons", 
    type: "Secure Transit",
    id: "container",
    desc: "Perfect for electronics, garments, pharmaceuticals, and weather-sensitive cargo.",
    imageUrl: "/truck_22ft_container.png"
  }
];

export function Fleet() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      id="fleet" className="py-24 bg-[#0A0A0A] relative border-t border-white/5"
    >
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
              className="bg-[#161B22] border border-white/5 rounded-2xl overflow-hidden group hover:border-ktc-accent-primary/50 hover:shadow-[0_0_20px_rgba(29,78,216,0.4)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent('select-vehicle', { detail: v.id }));
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1 group-hover:text-ktc-accent-primary transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Book this truck <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
