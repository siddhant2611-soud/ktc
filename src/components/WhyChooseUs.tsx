import { motion } from 'motion/react';
import { Clock, Users, Shield, TrendingUp, HeadphonesIcon, Award } from 'lucide-react';

const reasons = [
  { icon: Clock, title: "On-Time Delivery", desc: "Precision timing and route optimization." },
  { icon: Users, title: "Professional Drivers", desc: "Highly trained operators ensuring safety." },
  { icon: Shield, title: "Safe Transportation", desc: "Rigorous standards for goods protection." },
  { icon: TrendingUp, title: "Competitive Pricing", desc: "Market-leading rates without quality compromise." },
  { icon: HeadphonesIcon, title: "Dedicated Support", desc: "24/7 assistance and tracking updates." },
  { icon: Award, title: "Trusted Service", desc: "Built on years of operational excellence." }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-ktc-bg-section relative border-y border-ktc-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-6 leading-tight">
                Why Businesses Choose <span className="text-ktc-accent-primary">KTC</span>
              </h2>
              <p className="text-ktc-text-muted text-lg mb-8">
                We combine industry expertise with cutting-edge logistics management to deliver unparalleled transport solutions.
              </p>
              <a
                href="#contact"
                className="inline-block bg-white text-ktc-bg-primary hover:bg-gray-200 px-8 py-4 rounded-md font-heading font-bold transition-colors"
              >
                Partner With Us
              </a>
            </motion.div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-ktc-bg-primary rounded-xl p-6 border border-ktc-border relative group"
              >
                <div className="absolute inset-0 bg-ktc-accent-primary opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 rounded-xl" />
                <div className="absolute -inset-[1px bg-gradient-to-r from-ktc-accent-primary to-ktc-accent-secondary opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 rounded-xl rounded-xl z-[-1]" />
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-ktc-bg-card flex items-center justify-center shrink-0 border border-ktc-border group-hover:border-ktc-accent-primary transition-colors">
                    <reason.icon className="w-5 h-5 text-ktc-highlight group-hover:text-ktc-accent-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-bold text-white mb-2 uppercase">{reason.title}</h3>
                    <p className="text-[#94A3B8] text-[11px] leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
