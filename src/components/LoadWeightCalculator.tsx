import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Truck, MapPin, Weight, DollarSign, X } from 'lucide-react';

export function LoadWeightCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [weight, setWeight] = useState<number | ''>('');
  const [distance, setDistance] = useState<number | ''>('');
  const [unit, setUnit] = useState<'tons' | 'kg'>('tons');
  const [estimate, setEstimate] = useState<number | null>(null);

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof weight === 'number' && typeof distance === 'number') {
      let weightInTons = weight;
      if (unit === 'kg') {
        weightInTons = weight / 1000;
      }
      
      // Basic estimation formula: Base rate + (weight * distance * rate per ton-km)
      // Standard rate approx: 5 INR per ton per km
      const baseFee = 2000; 
      const ratePerTonKm = 5;
      const total = baseFee + (weightInTons * distance * ratePerTonKm);
      setEstimate(total);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-16 mx-auto flex items-center gap-3 bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors shadow-xl"
      >
        <Calculator className="w-5 h-5" />
        Load Weight & Cost Calculator
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ktc-bg-section border border-ktc-border rounded-xl w-full max-w-md overflow-hidden relative"
            >
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="bg-black/50 hover:bg-ktc-accent-primary text-white p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8">
                <div className="w-12 h-12 bg-ktc-accent-primary/20 rounded-xl flex items-center justify-center mb-6 border border-ktc-accent-primary/30">
                  <Calculator className="w-6 h-6 text-ktc-accent-primary" />
                </div>
                
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2">
                  Cost Estimator
                </h3>
                <p className="text-ktc-text-muted font-sans text-sm mb-6">
                  Calculate approximate shipping costs based on weight and distance.
                </p>

                <form onSubmit={calculateEstimate} className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-ktc-text-muted flex items-center gap-2">
                        <Weight className="w-4 h-4" /> Load Weight
                      </label>
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value as 'tons' | 'kg')}
                        className="bg-black border border-white/10 text-white text-xs rounded px-2 py-1 outline-none focus:border-ktc-accent-primary"
                      >
                        <option value="tons">Tons</option>
                        <option value="kg">KG</option>
                      </select>
                    </div>
                    <input
                      type="number"
                      required
                      min="1"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value) || '')}
                      className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary transition-colors text-sm"
                      placeholder={`e.g. ${unit === 'tons' ? '5' : '5000'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ktc-text-muted mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Distance (Km)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={distance}
                      onChange={(e) => setDistance(Number(e.target.value) || '')}
                      className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary transition-colors text-sm"
                      placeholder="e.g. 450"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ktc-accent-primary hover:bg-[#1e40af] text-white font-bold uppercase tracking-widest text-sm py-3 rounded transition-colors mt-4 flex items-center justify-center gap-2"
                  >
                    Calculate <Truck className="w-4 h-4" />
                  </button>
                </form>

                <AnimatePresence>
                  {estimate !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 bg-ktc-bg-primary/80 border border-ktc-border p-4 rounded-xl text-center"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ktc-text-muted mb-1">
                        Estimated Cost
                      </p>
                      <div className="flex justify-center items-center gap-1 text-white text-3xl font-black italic tracking-tighter">
                        <span>₹</span>
                        <span>{estimate.toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-[10px] text-ktc-text-muted mt-2">
                        *This is a rough estimate. Actual pricing may vary based on truck type, tolls, and cargo requirements.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
