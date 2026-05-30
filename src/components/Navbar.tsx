import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Truck } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-ktc-bg-primary/90 backdrop-blur-md border-b border-ktc-border py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-ktc-accent-primary rounded flex items-center justify-center font-black text-black text-xl italic">
              KTC
            </div>
            <div>
              <h1 className="text-lg font-extrabold uppercase leading-none tracking-tighter text-white">Kaushik Transport</h1>
              <span className="text-[10px] text-ktc-text-muted font-semibold tracking-widest uppercase">Logistics Solutions</span>
            </div>
          </div>

          
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[12px] font-bold uppercase tracking-widest text-ktc-text-muted hover:text-white transition-colors focus:outline-none"
              >
                {link.name}
              </a>
            ))}
          </nav>

          
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col items-end text-white">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-ktc-accent-primary" />
                <span className="font-subheading font-semibold text-[12px] tracking-wider">+91 9810977611</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-ktc-accent-primary uppercase tracking-widest font-black">24x7</span>
                <span className="font-subheading font-semibold text-[12px] tracking-wider">+91 9911995540</span>
              </div>
            </div>
            <a
              href="#contact"
              className="bg-ktc-accent-primary hover:bg-ktc-accent-secondary text-black font-black px-6 py-2 rounded text-[12px] uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,107,0,0.3)]"
            >
              Get Quote
            </a>
          </div>

          
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-ktc-bg-secondary border-b border-ktc-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-subheading text-white hover:text-ktc-accent-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-ktc-border flex flex-col gap-4">
                <div className="flex flex-col gap-2 text-white">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-ktc-accent-primary" />
                    <span className="font-subheading font-semibold">+91 9810977611</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 flex justify-center text-[10px] text-ktc-accent-primary uppercase tracking-widest font-black">24x7</span>
                    <span className="font-subheading font-semibold">+91 9911995540</span>
                  </div>
                </div>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-ktc-accent-primary text-center text-white px-6 py-3 rounded-md font-heading font-bold"
                >
                  Get Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
