import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "Excellent service and timely delivery. They delivered our industrial cargo without any hassle. Highly recommended for heavy logistics.",
    author: "Rahul M.",
    role: "Operations Manager"
  },
  {
    id: 2,
    text: "Reliable logistics partner. We have been using KTC for our commercial goods transportation across UP, and their professionalism is unmatched.",
    author: "Vikas S.",
    role: "Supply Chain Director"
  },
  {
    id: 3,
    text: "Professional team and safe transportation. Their customer support was available 24/7 providing us with active tracking updates.",
    author: "Amit K.",
    role: "Business Owner"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-ktc-bg-section border-y border-ktc-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-6">Client Success Stories</h2>
              <div className="flex items-center gap-2 text-ktc-highlight mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" className="w-6 h-6" />
                ))}
              </div>
              <p className="text-xl text-white font-bold mb-2">5-Star Rating</p>
              <p className="text-ktc-text-muted">Based on 12 Verified Reviews</p>
            </motion.div>
          </div>

          <div className="lg:w-2/3 relative h-[300px] w-full">
            <Quote className="absolute top-0 right-0 w-32 h-32 text-ktc-bg-card opacity-50 -z-10" />
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <p className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase text-white leading-relaxed mb-8">
                  "{testimonials[currentIndex].text}"
                </p>
                <div>
                  <div className="font-bold text-ktc-accent-primary text-xl">{testimonials[currentIndex].author}</div>
                  <div className="text-ktc-text-muted">{testimonials[currentIndex].role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-0 left-0 flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-12 h-1 transiton-all ${idx === currentIndex ? 'bg-ktc-accent-primary' : 'bg-ktc-bg-card hover:bg-ktc-border'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
