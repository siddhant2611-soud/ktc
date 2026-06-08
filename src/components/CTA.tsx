import { motion } from 'motion/react';
import { ArrowRight, Phone } from 'lucide-react';

export function CTA() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative py-24 overflow-hidden border-y border-ktc-border"
    >
      
      <div className="absolute inset-0 bg-ktc-bg-section" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay grayscale" />
      <div className="absolute inset-0 bg-gradient-to-r from-ktc-bg-primary via-ktc-bg-primary/90 to-transparent" />
      
      
      <div className="absolute -inset-x-40 -top-40 h-96 bg-ktc-accent-primary/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase text-white mb-6 leading-tight"
          >
            Need Fast & Reliable 
            <span className="block text-ktc-accent-primary mt-2">Transport Services?</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 font-sans mb-10 max-w-xl"
          >
            Get connected with Kaushik Transport Company today. Experience logistics built for scale, speed, and absolute reliability.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="group relative flex items-center justify-center gap-2 bg-ktc-accent-primary hover:bg-ktc-accent-secondary text-white px-8 py-4 rounded font-black text-[12px] uppercase tracking-widest transition-all overflow-hidden shadow-[0_0_20px_rgba(29,78,216,0.3)]"
            >
              <span className="relative z-10">Get Free Quote</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="tel:+919810977611"
              className="flex items-center justify-center gap-2 bg-ktc-bg-card hover:bg-ktc-bg-primary border border-white/10 text-white px-8 py-4 rounded font-black text-[12px] uppercase tracking-widest transition-colors"
            >
              <Phone className="w-5 h-5 text-ktc-highlight" />
              <span>Call Now</span>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
