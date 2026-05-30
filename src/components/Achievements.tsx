import { motion } from 'motion/react';
import { Counter } from './Counter';

const stats = [
  { value: 12, suffix: '+', label: 'Satisfied Customers' },
  { value: 5, suffix: '.0★', label: 'Average Rating' },
  { value: 100, suffix: '%', label: 'Commitment' },
  { value: 24, suffix: '/7', label: 'Customer Support' },
];

export function Achievements() {
  return (
    <section className="py-20 bg-ktc-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8ed7c50a18?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-ktc-border/50">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center px-4"
            >
              <div className="text-4xl md:text-6xl font-black italic tracking-tighter text-white mb-2">
                <Counter to={stat.value} duration={2.5} suffix={stat.suffix} />
              </div>
              <div className="text-[#94A3B8] font-bold text-[10px] uppercase tracking-tighter">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
