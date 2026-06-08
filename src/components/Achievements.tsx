import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Counter } from './Counter';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

const defaultStats = [
  { value: 120, suffix: '+', label: 'Satisfied Customers' },
  { value: 5.0, suffix: '★', label: 'Average Rating' },
  { value: 100, suffix: '%', label: 'Commitment' },
  { value: 300, suffix: '+', label: 'Tons Delivered' },
];

export function Achievements() {
  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const q = query(collection(db, 'reviews'));
        const querySnapshot = await getDocs(q);
        
        let totalReviews = defaultStats[0].value;
        let totalRatingSum = defaultStats[0].value * defaultStats[1].value;
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.rating) {
            totalReviews += 1;
            totalRatingSum += data.rating;
          }
        });
        
        const avgRating = totalReviews > 0 ? (totalRatingSum / totalReviews) : 5.0;
        
        setStats([
          { value: totalReviews, suffix: '+', label: 'Satisfied Customers' },
          { value: Number(avgRating.toFixed(1)), suffix: '★', label: 'Average Rating' },
          { value: 100, suffix: '%', label: 'Commitment' },
          { value: 24, suffix: '/7', label: 'Customer Support' },
        ]);
      } catch (error) {
        // Fallback to default stats if firebase is not configured or lacks permissions
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      className="py-20 bg-ktc-bg-primary relative overflow-hidden"
    >
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
                <Counter to={stat.value} duration={2} suffix={stat.suffix} decimals={stat.label === 'Average Rating' ? 1 : 0} />
              </div>
              <div className="text-[#94A3B8] font-bold text-[10px] uppercase tracking-tighter">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
