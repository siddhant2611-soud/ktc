import { motion } from 'motion/react';
import { Truck, Package, Factory, GitBranch, MapPin, Map } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: "Road Freight Transport",
    description: "Secure and timely movement of goods across major highways with our maintained fleet."
  },
  {
    icon: Package,
    title: "Commercial Goods",
    description: "Specialized transportation solutions for retail and commercial inventory management."
  },
  {
    icon: Factory,
    title: "Industrial Logistics",
    description: "Handling heavy machinery and raw materials for industrial and manufacturing sectors."
  },
  {
    icon: GitBranch,
    title: "Supply Chain Solutions",
    description: "End-to-end business logistics and supply chain optimization for maximum efficiency."
  },
  {
    icon: MapPin,
    title: "Local Delivery Services",
    description: "Fast and reliable intracity and regional delivery operations in Uttar Pradesh."
  },
  {
    icon: Map,
    title: "Long Distance Transport",
    description: "Cross-border and pan-India logistics focusing on safety over long routes."
  }
];

export function Services() {
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
              
              <a href="#contact" className="inline-flex items-center text-ktc-accent-primary font-bold text-[10px] uppercase tracking-widest group/link relative z-10">
                Learn More
                <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
