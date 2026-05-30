import { motion } from 'motion/react';
import { Target, CheckCircle2 } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 bg-ktc-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 w-full h-[500px] rounded-2xl overflow-hidden border border-ktc-border">
              <img 
                src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=1000" 
                alt="Logistics Operations" 
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ktc-bg-primary via-transparent to-transparent opacity-80" />
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-ktc-bg-section border border-ktc-border p-6 rounded-2xl z-20 hidden md:flex flex-col justify-center shadow-2xl">
              <Target className="w-10 h-10 text-ktc-accent-primary mb-3" />
              <div className="text-3xl font-black italic tracking-tighter text-white">100%</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mt-1">Commitment to Excellence</div>
            </div>
          </motion.div>

          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white leading-tight">
                Driven By Trust.<br />Powered By <span className="text-ktc-accent-primary">Excellence.</span>
              </h2>
              
              <p className="text-lg text-ktc-text-muted leading-relaxed">
                Kaushik Transport Company delivers dependable transportation and logistics solutions focused on safety, efficiency, and customer satisfaction. Our commitment to timely deliveries and professional service makes us a trusted logistics partner across India.
              </p>
              
              <div className="pt-6 space-y-4">
                {[
                  "Nationwide Logistics Infrastructure",
                  "Advanced Fleet Management",
                  "Cost-Effective Transportation Models"
                ].map((item, i) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-ktc-highlight" />
                    <span className="font-subheading text-gray-200">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
