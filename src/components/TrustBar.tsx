import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const trustFeatures = [
  "Reliable Transport",
  "Safe Deliveries",
  "Professional Service",
  "Fast Response",
  "Customer Satisfaction"
];

export function TrustBar() {
  return (
    <div className="bg-ktc-bg-card border-y border-ktc-border relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-2 group"
            >
              <CheckCircle2 className="w-5 h-5 text-ktc-accent-primary group-hover:text-ktc-highlight transition-colors" />
              <span className="font-subheading text-sm md:text-base font-semibold text-gray-200">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
