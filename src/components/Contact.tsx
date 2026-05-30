import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send, Instagram, HeadphonesIcon } from 'lucide-react';

export function Contact() {
  const [selectedVehicle, setSelectedVehicle] = useState('');

  useEffect(() => {
    const handleVehicleSelect = (e: any) => {
      if (e.detail) {
        setSelectedVehicle(e.detail);
      }
    };
    
    window.addEventListener('select-vehicle', handleVehicleSelect);
    return () => window.removeEventListener('select-vehicle', handleVehicleSelect);
  }, []);

  return (
    <section id="contact" className="py-24 bg-ktc-bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-ktc-bg-section/50 transform skew-x-12 translate-x-32 hidden lg:block -z-10 border-l border-ktc-border/50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-4"
          >
            Connect With Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ktc-text-muted text-lg max-w-2xl"
          >
            Ready to optimize your logistics operations? Reach out to our team today.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 space-y-10"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-ktc-bg-card rounded-lg border border-ktc-border flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-ktc-accent-primary" />
              </div>
              <div>
                <h4 className="text-lg font-heading font-bold text-white mb-1">Phone Number</h4>
                <a href="tel:+919810977611" className="text-ktc-text-muted hover:text-white transition-colors block font-subheading text-lg">+91 9810977611</a>
                <a href="tel:+919911995540" className="text-ktc-text-muted hover:text-white transition-colors block font-subheading text-lg mt-1">+91 9911995540</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-ktc-bg-card rounded-lg border border-ktc-border flex items-center justify-center shrink-0">
                <HeadphonesIcon className="w-5 h-5 text-ktc-accent-primary" />
              </div>
              <div>
                <h4 className="text-lg font-heading font-bold text-white mb-1">24x7 Support</h4>
                <p className="text-ktc-text-muted leading-relaxed">
                  Our operations team works round-the-clock for tracking and emergency bookings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-ktc-bg-card rounded-lg border border-ktc-border flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-ktc-accent-primary" />
              </div>
              <div>
                <h4 className="text-lg font-heading font-bold text-white mb-1">Email Address</h4>
                <a href="mailto:kaushiktransportktc@gmail.com" className="text-ktc-text-muted hover:text-white transition-colors block">kaushiktransportktc@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-ktc-bg-card rounded-lg border border-ktc-border flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-ktc-accent-primary" />
              </div>
              <div>
                <h4 className="text-lg font-heading font-bold text-white mb-1">Corporate Office</h4>
                <p className="text-ktc-text-muted leading-relaxed">
                  OC-933 Gaur City Centre, <br />
                  Noida Dadri, Gautam Buddha Nagar,<br />
                  Uttar Pradesh 201009
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-ktc-border">
              <h4 className="text-sm font-subheading font-bold text-white uppercase tracking-wider mb-4">Follow Operations</h4>
              <a 
                href="https://www.instagram.com/kaushik_transport_company" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 text-white px-6 py-3 rounded-md font-heading font-bold tracking-wide transition-all transform hover:-translate-y-0.5"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3"
          >
            <div className="bg-ktc-bg-card rounded-xl border border-ktc-border p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-ktc-accent-primary opacity-5 mix-blend-screen blur-3xl" />
              
              <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-6">Online Truck Booking / Get Quote</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="pickup" className="text-sm font-subheading text-[#94A3B8]">Pickup Location</label>
                    <input 
                      type="text" 
                      id="pickup" 
                      className="w-full bg-ktc-bg-primary border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary focus:ring-1 focus:ring-ktc-accent-primary transition-colors text-sm"
                      placeholder="e.g. Noida, UP"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="drop" className="text-sm font-subheading text-[#94A3B8]">Drop Location</label>
                    <input 
                      type="text" 
                      id="drop" 
                      className="w-full bg-ktc-bg-primary border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary focus:ring-1 focus:ring-ktc-accent-primary transition-colors text-sm"
                      placeholder="e.g. Mumbai, MH"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-subheading text-[#94A3B8]">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full bg-ktc-bg-primary border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary focus:ring-1 focus:ring-ktc-accent-primary transition-colors text-sm"
                      placeholder="+91 .."
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="vehicle" className="text-sm font-subheading text-[#94A3B8]">Vehicle Requirement</label>
                    <select 
                      id="vehicle" 
                      value={selectedVehicle}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                      className="w-full bg-ktc-bg-primary border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary focus:ring-1 focus:ring-ktc-accent-primary transition-colors text-sm appearance-none"
                    >
                      <option value="">Select Truck Type</option>
                      <option value="open">Open Body (17-19 Ft)</option>
                      <option value="container">Closed Container (14-22 Ft)</option>
                      <option value="trailer">Trailer / Heavy Duty</option>
                      <option value="not_sure">Not Sure (Need Help)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="material" className="text-sm font-subheading text-[#94A3B8]">Material & Weight Details</label>
                  <input 
                    type="text"
                    id="material" 
                    className="w-full bg-ktc-bg-primary border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary focus:ring-1 focus:ring-ktc-accent-primary transition-colors text-sm"
                    placeholder="e.g. 5 Tonnes of Electronics"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-ktc-accent-primary hover:bg-ktc-accent-secondary text-black font-black px-6 py-4 rounded text-[12px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,107,0,0.3)]"
                >
                  Check Transportation Cost
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
            
            <div className="mt-8 h-[250px] rounded-xl overflow-hidden border border-ktc-border bg-ktc-bg-section flex items-center justify-center">
              {/* Optional: Implement a real map here if an API key is available, else keep generic abstract graphic or simple iframe */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.80556950293!2d77.4116491!3d28.5855018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef6e036230f3%3A0xe54c1f67f4a5ff6b!2sGaur%20City%20Center!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(100%)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="KTC Location Map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
