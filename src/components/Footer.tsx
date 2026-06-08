import React, { useState } from 'react';
import { Truck, Mail, Phone, MapPin, Instagram, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';
import { LegalModal } from './LegalModal'; // added explicit import

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms'>('privacy');

  const openLegal = (e: React.MouseEvent, type: 'privacy' | 'terms') => {
    e.preventDefault();
    setLegalType(type);
    setLegalModalOpen(true);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-black pt-20 pb-10 border-t border-ktc-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 -ml-4">
              <Logo />
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
              {['Home', 'About Us', 'Services', 'Our Process', 'Contact'].map((link) => (
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
            <form className="relative" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                placeholder="Email address" 
                className="w-full bg-ktc-bg-section border border-ktc-border text-white text-sm px-4 py-3 rounded-md focus:outline-none focus:border-ktc-accent-primary pl-4 pr-12 disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-ktc-accent-primary hover:bg-ktc-accent-secondary rounded flex items-center justify-center text-white transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                ) : status === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-300" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>
            {status === 'success' && <p className="text-green-400 text-xs mt-2">Subscribed!</p>}
            {status === 'error' && <p className="text-red-400 text-xs mt-2">Error subscribing.</p>}
          </div>
        </div>

        <div className="pt-8 border-t border-ktc-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#94A3B8] text-[10px] font-bold uppercase tracking-widest text-center md:text-left">
            &copy; 2026 Kaushik Transport Company. All Rights Reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 flex-wrap justify-center text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
            <a href="#" onClick={(e) => openLegal(e, 'privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" onClick={(e) => openLegal(e, 'terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</a>
            <a href="/driver" className="hover:text-ktc-accent-primary transition-colors cursor-pointer">Driver Login</a>
            <a href="/fleet" className="hover:text-ktc-accent-primary transition-colors cursor-pointer">Fleet Login</a>
            <a href="/admin" className="hover:text-ktc-accent-primary transition-colors cursor-pointer">Admin Portal</a>
          </div>
        </div>
      </div>
      <LegalModal isOpen={legalModalOpen} onClose={() => setLegalModalOpen(false)} type={legalType} />
    </footer>
  );
}
