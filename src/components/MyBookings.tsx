import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { MapPin, Truck, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

interface Booking {
  id: string;
  pickup: string;
  drop: string;
  vehicle: string;
  material: string;
  status: string;
  createdAt: any;
}

export function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid),
          // orderBy requires a composite index if combining with where, sometimes it's simpler to sort client side if we don't want to force index creation immediately.
        );
        const querySnapshot = await getDocs(q);
        const b: Booking[] = [];
        querySnapshot.forEach((doc) => {
          b.push({ id: doc.id, ...doc.data() } as Booking);
        });
        
        // Sort descending by createdAt
        b.sort((x, y) => {
          const dateX = x.createdAt?.toDate?.() || new Date(0);
          const dateY = y.createdAt?.toDate?.() || new Date(0);
          return dateY.getTime() - dateX.getTime();
        });

        setBookings(b);
      } catch (err: any) {
        console.error('Error fetching bookings:', err);
        setError("Failed to load your bookings. You may have insufficient permissions. Please ask the developer to update Firestore Security Rules.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (!user) return null;

  return (
    <section id="my-bookings" className="py-24 bg-black relative border-t border-ktc-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-subheading text-ktc-accent-primary uppercase tracking-[0.2em] font-bold mb-4">Dashboard</h2>
            <p className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white">My Bookings</p>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 text-ktc-accent-primary">
            <div className="w-8 h-8 border-4 border-ktc-accent-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-2xl mx-auto text-center text-red-500">
            <p className="font-bold mb-2">{error}</p>
            <p className="text-sm text-red-400/80 text-left mt-4 mb-2">Please copy and paste the following Security Rules into your Firebase Console (Build {">"} Firestore Database {">"} Rules):</p>
            <pre className="text-left text-xs bg-black/50 p-4 rounded mt-4 overflow-x-auto text-gray-300 border border-white/5 whitespace-pre-wrap">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /bookings/{bookingId} {
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}`}
            </pre>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-ktc-bg-section border border-ktc-border rounded-2xl p-12 text-center text-gray-400">
            <Truck className="w-12 h-12 mx-auto mb-4 text-gray-500 opacity-50" />
            <p className="text-lg">You don't have any bookings yet.</p>
            <p className="text-sm mt-2">Submit a quote request to get started.</p>
            <a href="#contact" className="inline-block mt-6 px-6 py-3 bg-ktc-accent-primary text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-ktc-accent-secondary transition-colors">
              Book a Truck
            </a>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking, idx) => (
              <motion.div 
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-ktc-bg-section border border-ktc-border rounded-xl overflow-hidden"
              >
                <div 
                  className="p-6 cursor-pointer flex flex-wrap md:flex-nowrap items-center justify-between gap-6"
                  onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
                >
                  <div className="flex-1 min-w-[250px]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-ktc-text-muted">ID: {booking.id.slice(0, 8)}</span>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                        booking.status === 'pending' ? 'bg-orange-500/20 text-orange-400' :
                        booking.status === 'confirmed' ? 'bg-blue-500/20 text-blue-400' :
                        booking.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-white font-bold">
                      <div className="flex items-center gap-2 max-w-[45%] truncate">
                        <MapPin className="w-4 h-4 text-ktc-accent-primary shrink-0" />
                        <span className="truncate">{booking.pickup}</span>
                      </div>
                      <div className="w-8 h-[1px] bg-white/20 shrink-0"></div>
                      <div className="flex items-center gap-2 max-w-[45%] truncate">
                        <MapPin className="w-4 h-4 text-ktc-accent-primary shrink-0" />
                        <span className="truncate">{booking.drop}</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      <span>{booking.vehicle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{booking.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="ml-auto md:ml-0 shrink-0 text-gray-400">
                    {expandedId === booking.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === booking.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5 bg-black/40"
                    >
                      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-1">Material</p>
                          <p className="text-white text-sm">{booking.material}</p>
                        </div>
                        <div className="sm:hidden">
                           <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-1">Vehicle</p>
                           <p className="text-white text-sm">{booking.vehicle}</p>
                        </div>
                        <div className="sm:hidden">
                           <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-1">Date</p>
                           <p className="text-white text-sm">{booking.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}</p>
                        </div>
                        <div className="md:col-span-2">
                           <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-1">Support</p>
                           <p className="text-white text-sm">Need help with this booking? <a href="#contact" className="text-ktc-accent-primary hover:underline">Contact us</a> quoting ID: {booking.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
