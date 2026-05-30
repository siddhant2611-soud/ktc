import { Truck, Mail, Phone, MapPin, Instagram, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-ktc-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-ktc-accent-primary rounded flex items-center justify-center font-black text-black text-xl italic">
                KTC
              </div>
              <div>
                <h2 className="text-lg font-extrabold uppercase leading-none tracking-tighter text-white">Kaushik Transport</h2>
              </div>
            </div>
            <p className="text-ktc-text-muted text-sm leading-relaxed mb-6">
              Moving your goods with trust, speed, and care. India's trusted logistics partner for commercial and industrial transportation.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/kaushik_transport_company" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-ktc-bg-section border border-ktc-border flex items-center justify-center text-ktc-text-muted hover:text-white hover:bg-ktc-accent-primary hover:border-ktc-accent-primary transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          
          <div>
            <h3 className="text-white text-[12px] font-bold uppercase tracking-widest mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Our Process', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-[#94A3B8] hover:text-white transition-colors text-[11px] font-bold uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ktc-accent-primary" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h3 className="text-white text-[12px] font-bold uppercase tracking-widest mb-6">Services</h3>
            <ul className="space-y-4">
              {[
                'Road Freight Transport',
                'Commercial Goods',
                'Industrial Logistics',
                'Supply Chain Solutions',
                'Local Delivery',
                'Long Distance Transport'
              ].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-[#94A3B8] hover:text-white transition-colors text-[11px] font-bold uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ktc-accent-primary" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h3 className="text-white text-[12px] font-bold uppercase tracking-widest mb-6">Newsletter</h3>
            <p className="text-ktc-text-muted text-sm mb-4">Subscribe to receive logistics updates and offers.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-ktc-bg-section border border-ktc-border text-white text-sm px-4 py-3 rounded-md focus:outline-none focus:border-ktc-accent-primary pl-4 pr-12"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-ktc-accent-primary hover:bg-ktc-accent-secondary rounded flex items-center justify-center text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-ktc-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest text-center md:text-left">
            &copy; 2026 Kaushik Transport Company. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
