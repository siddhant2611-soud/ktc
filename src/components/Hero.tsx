import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center pt-20 overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=2000"
            alt="Logistics Truck at night"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-ktc-bg-primary via-ktc-bg-primary/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ktc-bg-primary via-transparent to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="flex text-ktc-accent-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="currentColor" className="w-4 h-4" />
              ))}
            </div>
            <span className="text-sm font-subheading text-white tracking-wide">5-Star Rated &bull; 12+ Happy Customers</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.9] uppercase text-white mb-6"
          >
            India's Trusted <br />
            <span className="text-ktc-accent-primary">
              Transport & Logistics
            </span>{' '}
            Partner
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl font-sans text-gray-300 mb-10 max-w-2xl leading-relaxed"
          >
            Reliable transportation solutions delivering goods safely, efficiently, and on time across India. Moving your goods with trust, speed, and care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="group relative flex items-center justify-center gap-2 bg-ktc-accent-primary hover:bg-ktc-accent-secondary text-black px-8 py-4 rounded font-black text-[12px] uppercase tracking-widest transition-all overflow-hidden shadow-[0_0_20px_rgba(255,107,0,0.3)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Get Instant Quote</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="tel:+919810977611"
              className="flex items-center justify-center gap-2 bg-ktc-bg-card hover:bg-ktc-bg-section border border-white/10 text-white px-8 py-4 rounded font-black text-[12px] uppercase tracking-widest transition-colors"
            >
              Call Now
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 flex items-center gap-3 text-ktc-text-muted text-sm font-subheading"
          >
            <ShieldCheck className="w-5 h-5 text-ktc-highlight" />
            <span>Professional Logistics Services</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
