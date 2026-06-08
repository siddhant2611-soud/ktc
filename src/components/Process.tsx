import { motion } from 'motion/react';
import { FileText, CheckSquare, Truck, PackageCheck } from 'lucide-react';

const steps = [
  { id: 1, title: 'Request a Quote', icon: FileText, desc: 'Submit your requirements via call or form.' },
  { id: 2, title: 'Confirm Booking', icon: CheckSquare, desc: 'Receive instant pricing and confirm slots.' },
  { id: 3, title: 'Transport Goods', icon: Truck, desc: 'Live tracking as we transit your cargo.' },
  { id: 4, title: 'Safe Delivery', icon: PackageCheck, desc: 'On-time arrival and secure handover.' },
];

export function Process() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      className="py-24 bg-ktc-bg-section border-y border-ktc-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white">How It Works</h2>
          <p className="mt-4 text-ktc-text-muted text-lg max-w-2xl mx-auto">
            A streamlined operational process designed to keep your supply chain moving without friction.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-ktc-border -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-ktc-bg-primary rounded-full border border-white/10 flex items-center justify-center relative z-10 mb-6 group hover:border-ktc-accent-primary transition-colors">
                    <step.icon className="w-6 h-6 text-[#94A3B8] group-hover:text-ktc-accent-primary transition-colors" />
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 w-6 h-6 bg-ktc-accent-primary rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                      {step.id}
                    </div>
                  </div>
                  
                  <h3 className="text-[12px] font-bold uppercase tracking-wider text-white mb-2">{step.title}</h3>
                  <p className="text-[#94A3B8] text-[10px]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
