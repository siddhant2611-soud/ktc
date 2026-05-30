import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, Route, ShieldCheck, HeadphonesIcon, Truck, CheckCircle2 } from 'lucide-react';

const benefits = [
  { icon: Route, title: "Assured Regular Loads", desc: "Access PAN-India loads all year round without wait times." },
  { icon: Wallet, title: "Fast & Advance Payments", desc: "Timely advance payments and quick balance clearances on delivery." },
  { icon: ShieldCheck, title: "Transparent Operations", desc: "Direct connections with transparent pricing and no hidden deductions." },
  { icon: HeadphonesIcon, title: "24/7 Dedicated Support", desc: "Round-the-clock helpline to assist drivers during transit." }
];

export function TruckOwner() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-24 bg-[#0A0A0A] relative border-t border-white/5 overflow-hidden font-sans">
      
      {/* Abstract Background Element */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 p-8 opacity-5 pointer-events-none transform -translate-x-1/4 scale-150">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="0.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Content & Benefits */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 text-[#FF6B00] px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase mb-6 w-fit border border-[#FF6B00]/20">
                <Truck className="w-3 h-3" />
                For Fleet Owners
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase text-white mb-6 leading-[0.9]">
                Attach Your Truck. <br />
                <span className="text-[#FF6B00]">Grow Your Business.</span>
              </h2>
              <p className="text-[#94A3B8] text-lg font-medium leading-relaxed mb-10 max-w-lg">
                Join India's fastest-growing logistics network. We provide consistent loads, reliable payments, and operational support so you can focus on moving forward.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col gap-3"
                  >
                    <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center bg-[#111827]">
                      <benefit.icon className="w-5 h-5 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h3 className="text-[13px] font-bold text-white uppercase tracking-wider mb-2">{benefit.title}</h3>
                      <p className="text-[#94A3B8] text-[11px] leading-relaxed">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Attachment Form */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#111827] border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00] opacity-10 mix-blend-screen blur-3xl rounded-full" />
              
              <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-2">Partner With Us</h3>
              <p className="text-[12px] text-[#94A3B8] font-bold uppercase tracking-widest mb-8">Enter your details to attach your vehicle</p>
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-[#FF6B00]/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-[#FF6B00]" />
                    </div>
                    <h4 className="text-xl font-black uppercase text-white mb-2">Application Received!</h4>
                    <p className="text-[#94A3B8] text-sm">Our team will contact you shortly to verify your details and attach your fleet.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5" 
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="ownerName" className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Owner Name</label>
                        <input 
                          type="text" 
                          id="ownerName" 
                          required
                          className="w-full bg-[#161B22] border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors text-sm font-bold"
                          placeholder="e.g. Ramesh Kumar"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="ownerPhone" className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Mobile Number</label>
                        <input 
                          type="tel" 
                          id="ownerPhone" 
                          required
                          className="w-full bg-[#161B22] border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors text-sm font-bold"
                          placeholder="+91 .."
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="truckType" className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Vehicle Type</label>
                        <select 
                          id="truckType" 
                          required
                          className="w-full bg-[#161B22] border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors text-sm font-bold appearance-none"
                        >
                          <option value="">Select Truck</option>
                          <option value="14ft">14 Ft / 17 Ft</option>
                          <option value="19ft">19 Ft Open / Container</option>
                          <option value="22ft">22 Ft Container</option>
                          <option value="32ft">32 Ft Multi-Axle</option>
                          <option value="trailer">Trailer</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="routes" className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Preferred Routes</label>
                        <input 
                          type="text" 
                          id="routes" 
                          className="w-full bg-[#161B22] border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors text-sm font-bold"
                          placeholder="e.g. NCR to Mumbai"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="truckCount" className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Number of Vehicles</label>
                      <input 
                        type="number" 
                        id="truckCount" 
                        required
                        className="w-full bg-[#161B22] border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors text-sm font-bold"
                        placeholder="1"
                        min="1"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 bg-[#FF6B00] hover:bg-[#F97316] text-black font-black px-6 py-4 rounded text-[12px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,107,0,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin w-4 h-4 rounded-full border-2 border-black border-t-transparent" />
                          Submitting...
                        </span>
                      ) : (
                        <>
                          Join KTC Fleet
                          <Truck className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[9px] text-[#94A3B8] uppercase tracking-widest mt-4 opacity-70">
                      By submitting, you agree to our partner terms & conditions.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
