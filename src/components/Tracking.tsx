import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, PackageSearch, Maximize2, X } from 'lucide-react';

const SvgMap = () => (
  <>
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
    <svg viewBox="0 0 1000 300" className="absolute inset-0 w-full h-full font-sans text-[#94A3B8]">
       {/* Base Route */}
       <path d="M 100 200 L 400 200 L 600 100 L 900 100" fill="none" stroke="#252F3F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8 8" />
       
       {/* Active Route Progress */}
       <motion.path 
         d="M 100 200 L 400 200 L 600 100 L 900 100" 
         fill="none" 
         stroke="#1D4ED8" 
         strokeWidth="4"
         strokeLinecap="round" 
         strokeLinejoin="round"
         initial={{ pathLength: 0 }}
         animate={{ pathLength: 0.75 }}
         transition={{ duration: 2.5, ease: "easeOut" }}
       />

       {/* Node Origin */}
       <circle cx="100" cy="200" r="10" fill="#111827" stroke="#1D4ED8" strokeWidth="3" />
       <text x="100" y="240" fill="currentColor" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="0.1em">ORIGIN</text>
       <text x="100" y="258" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">Mumbai Depot</text>

       {/* Node Checkpoint 1 */}
       <circle cx="400" cy="200" r="10" fill="#111827" stroke="#1D4ED8" strokeWidth="3" />
       <text x="400" y="240" fill="currentColor" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="0.1em">SCAN HUB</text>
       <text x="400" y="258" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">Nashik Hub</text>

       {/* Node Checkpoint 2 */}
       <circle cx="600" cy="100" r="10" fill="#111827" stroke="#1D4ED8" strokeWidth="3" />
       <text x="600" y="60" fill="currentColor" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="0.1em">TRANSIT</text>
       <text x="600" y="78" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">Indore Checkpost</text>

       {/* Node Destination */}
       <circle cx="900" cy="100" r="10" fill="#111827" stroke="#252F3F" strokeWidth="3" />
       <text x="900" y="140" fill="currentColor" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="0.1em">ESTIMATED ARRIVAL</text>
       <text x="900" y="158" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">Noida Facility</text>

       {/* Current Location Marker (at X=750, Y=100) */}
       <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.5, type: "spring" }}
       >
          <circle cx="750" cy="100" r="30" fill="#1D4ED8" opacity="0.15">
             <animate attributeName="r" values="20; 35; 20" dur="2s" repeatCount="indefinite" />
             <animate attributeName="opacity" values="0.3; 0.1; 0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="750" cy="100" r="8" fill="#60A5FA" stroke="#111827" strokeWidth="2" />
          {/* Marker tooltip */}
          <g transform="translate(680, 45)">
            <rect width="140" height="36" rx="4" fill="#1F2937" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <polygon points="65,36 75,36 70,42" fill="#1F2937" />
            <text x="70" y="22" fill="#60A5FA" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="0.1em">LIVE LOCATION</text>
          </g>
       </motion.g>
    </svg>
  </>
);

export function Tracking() {
  const [trackingId, setTrackingId] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackResult, setTrackResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setIsLoading(true);
    setErrorMsg('');
    setIsSearched(false);
    
    try {
      const res = await fetch(`/api/track/${trackingId}`);
      if (res.ok) {
        const data = await res.json();
        setTrackResult(data.data);
        setIsSearched(true);
      } else {
        setErrorMsg('Tracking number not found. Please try again.');
      }
    } catch {
      setErrorMsg('Failed to connect. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="tracking" className="py-24 bg-[#0A0A0A] relative border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
           <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-4">
             Track Your <span className="text-[#1D4ED8]">Shipment</span>
           </h2>
           <p className="text-[#94A3B8] text-sm md:text-base max-w-2xl font-medium">
             Enter your AWB or tracking reference number to get real-time location updates of your cargo.
           </p>
        </div>

        {/* Input Card */}
        <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 lg:p-8 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <PackageSearch className="w-32 h-32 text-[#1D4ED8]" />
          </div>
          
          <form onSubmit={handleTrack} className="relative z-10 flex flex-col md:flex-row gap-4 max-w-3xl">
            <div className="flex-1 relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Search className="h-5 w-5 text-[#94A3B8]" />
               </div>
               <input
                 type="text"
                 value={trackingId}
                 onChange={(e) => setTrackingId(e.target.value)}
                 className="block w-full pl-12 pr-4 py-4 bg-[#161B22] border border-white/10 rounded-xl focus:ring-[#1D4ED8] focus:border-[#1D4ED8] text-sm font-bold uppercase tracking-widest text-white placeholder-[#94A3B8]/60 transition-all focus:outline-none"
                 placeholder="Enter Tracking ID (e.g., KTC-92847-X)"
               />
            </div>
            <button 
               type="submit"
               disabled={isLoading}
               className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-black px-8 py-4 rounded-xl text-[12px] uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(29,78,216,0.3)] disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px] flex justify-center items-center"
            >
               {isLoading ? (
                 <span className="flex items-center gap-2">
                   <span className="animate-spin w-4 h-4 rounded-full border-2 border-black border-t-transparent" />
                   Tracking...
                 </span>
               ) : (
                 "Track Cargo"
               )}
            </button>
          </form>
          {errorMsg && <p className="text-red-400 text-sm mt-4 relative z-10">{errorMsg}</p>}
        </div>

        {/* Status Map */}
        <AnimatePresence>
          {isSearched && trackResult && (
            <motion.div
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               transition={{ duration: 0.5, ease: "easeOut" }}
               className="overflow-hidden"
            >
              <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 lg:p-10 shadow-2xl">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between pb-8 border-b border-white/5 mb-8 gap-4">
                   <div>
                     <p className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-widest mb-1">Tracking Number</p>
                     <p className="text-xl font-black text-white italic">{trackResult.trackingId}</p>
                   </div>
                   <div className="hidden sm:block w-[1px] h-10 bg-white/5" />
                   <div>
                     <p className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-widest mb-1">Status</p>
                     <div className="inline-flex items-center gap-2 bg-[#1D4ED8]/10 text-[#1D4ED8] px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase">
                       <span className="flex h-2 w-2 rounded-full bg-[#1D4ED8] animate-pulse"></span>
                       {trackResult.status}
                     </div>
                   </div>
                   <div className="hidden sm:block w-[1px] h-10 bg-white/5" />
                   <div>
                     <p className="text-[10px] text-[#94A3B8] uppercase font-bold tracking-widest mb-1">Est. Delivery</p>
                     <p className="text-xl font-black text-[#60A5FA] italic uppercase">{trackResult.estimatedDelivery}</p>
                   </div>
                </div>

                {/* SVG Animation Map */}
                <div className="relative w-full h-[300px] bg-[#161B22] rounded-2xl border border-white/5 overflow-hidden hidden md:block group">
                   <button 
                     onClick={() => setIsModalOpen(true)}
                     className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm border border-white/10 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#1D4ED8] hover:border-[#1D4ED8] flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest"
                   >
                     <Maximize2 className="w-4 h-4" />
                     View Full Screen
                   </button>
                   <SvgMap />
                </div>

                {/* Mobile view Timeline since SVG map is hard to scale vertically on small screens */}
                <div className="md:hidden space-y-6 mt-6 border-l-2 border-white/5 pl-6 relative">
                   
                   <div className="relative">
                      <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#1D4ED8] border-2 border-[#111827]" />
                      <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">Dispatched</p>
                      <p className="text-white font-bold text-sm">From {trackResult.origin}</p>
                   </div>
                   <div className="relative">
                      <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#1D4ED8] border-2 border-[#111827]" />
                      <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">In Transit</p>
                      <p className="text-white font-bold text-sm">Cleared {trackResult.currentLocation}</p>
                      <p className="inline-block px-2 py-1 bg-black text-[#1D4ED8] rounded text-[10px] font-bold tracking-widest mt-2 uppercase border border-white/5">
                        <span className="inline-block w-1 h-1 rounded-full bg-[#60A5FA] mr-1 mb-0.5 animate-pulse" />
                        Live in transit
                      </p>
                   </div>
                   <div className="relative">
                      <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#252F3F] border-2 border-[#111827]" />
                      <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">Pending</p>
                      <p className="text-[#94A3B8] font-bold text-sm">Delivery at {trackResult.destination}</p>
                   </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
          >
            <div className="relative w-full h-[80vh] bg-[#161B22] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
               <div className="absolute top-4 right-4 z-10 flex gap-4">
                 <button 
                   onClick={() => setIsModalOpen(false)}
                   className="bg-black/60 backdrop-blur-sm border border-white/10 text-white p-2 rounded hover:bg-[#1D4ED8] hover:border-[#1D4ED8] transition-colors"
                 >
                   <X className="w-6 h-6" />
                 </button>
               </div>
               
               <div className="p-6 border-b border-white/10 shrink-0">
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white">Tracking: KTC-92847-X</h3>
               </div>
               
               <div className="flex-grow relative">
                 <SvgMap />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
