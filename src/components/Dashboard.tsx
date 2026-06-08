import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db, auth } from '../lib/firebase';
import { updateProfile } from 'firebase/auth';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { MapPin, Truck, Calendar, Search, LogOut, User, FileText, CheckCircle2, ChevronRight, Download, XCircle, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface Booking {
  id: string;
  pickup: string;
  drop: string;
  vehicle: string;
  material: string;
  status: string;
  createdAt: any;
  rating?: number;
  review?: string;
}

const TRACKING_STEPS = [
  { id: 'pending', label: 'Booked' },
  { id: 'driver_assigned', label: 'Driver Assigned' },
  { id: 'picked_up', label: 'Picked Up' },
  { id: 'in_transit', label: 'In Transit' },
  { id: 'delivered', label: 'Delivered' }
];

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'bookings' | 'history' | 'profile'>('bookings');
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  
  // Profile state
  const [displayName, setDisplayName] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  // Tracking & Review modals
  const [trackingBooking, setTrackingBooking] = useState<Booking | null>(null);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    setDisplayName(user.displayName || '');

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'bookings'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const b: Booking[] = [];
        querySnapshot.forEach((doc) => {
          b.push({ id: doc.id, ...doc.data() } as Booking);
        });
        
        b.sort((x, y) => {
          const dateX = x.createdAt?.toDate?.() || new Date(0);
          const dateY = y.createdAt?.toDate?.() || new Date(0);
          return dateY.getTime() - dateX.getTime();
        });

        setBookings(b);
      } catch (err: any) {
        console.error('Error fetching bookings:', err);
        setError("Failed to load your bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setProfileLoading(true);
    setProfileMessage('');
    try {
      await updateProfile(user, { displayName });
      setProfileMessage('Profile updated successfully.');
    } catch (err: any) {
      setProfileMessage('Failed to update profile: ' + err.message);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, { status: 'cancelled' });
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
    } catch (err: any) {
      alert("Failed to cancel booking. Please try again or contact support.");
    }
  };

  const handleDownloadInvoice = (booking: Booking) => {
    // Generate a mock invoice
    const invoiceContent = `
INVOICE - KTC LOGISTICS
-----------------------
Booking ID: ${booking.id}
Date: ${booking.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}
Pickup: ${booking.pickup}
Drop: ${booking.drop}
Vehicle: ${booking.vehicle}
Material: ${booking.material}

Status: ${booking.status.toUpperCase()}
Total Amount: Pending Final Estimation

Thank you for choosing Kaushik Transport Corporation!
    `.trim();
    
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${booking.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredBookings = bookings.filter((booking) => {
    const q = searchQuery.toLowerCase();
    return (
      booking.pickup.toLowerCase().includes(q) ||
      booking.drop.toLowerCase().includes(q) ||
      booking.id.toLowerCase().includes(q)
    );
  });

  const activeBookings = filteredBookings.filter(b => ['pending', 'driver_assigned', 'picked_up', 'in_transit'].includes(b.status));
  const pastBookings = filteredBookings.filter(b => ['delivered', 'cancelled'].includes(b.status));

  const getStepIndex = (status: string) => {
    if (status === 'cancelled') return -1;
    const idx = TRACKING_STEPS.findIndex(s => s.id === status);
    return idx === -1 ? 0 : idx;
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewBooking) return;
    setSubmittingReview(true);
    try {
      const bookingRef = doc(db, 'bookings', reviewBooking.id);
      await updateDoc(bookingRef, { rating, review: reviewText });
      
      // Also add to public reviews collection
      if (reviewText || rating) {
        const { addDoc, serverTimestamp } = await import('firebase/firestore');
        await addDoc(collection(db, 'reviews'), {
          author: user.displayName || 'Customer',
          role: 'Verified Client',
          rating: rating,
          text: reviewText || 'Great experience!',
          createdAt: serverTimestamp(),
          bookingId: reviewBooking.id
        });
      }

      setBookings(bookings.map(b => b.id === reviewBooking.id ? { ...b, rating, review: reviewText } : b));
      setReviewBooking(null);
      setRating(5);
      setReviewText('');
    } catch (err) {
      alert("Failed to submit review. Try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-ktc-bg-primary min-h-screen text-ktc-text font-sans selection:bg-ktc-accent-primary/30 selection:text-white">
      <Navbar />
      
      <main className="pt-24 pb-12 flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 mb-4 rounded-lg text-sm font-bold tracking-widest uppercase text-ktc-text-muted hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          
          <div className="bg-ktc-bg-section border border-ktc-border rounded-xl p-6 mb-6">
            <div className="w-16 h-16 bg-ktc-accent-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-ktc-accent-primary/50">
              <User className="w-8 h-8 text-ktc-accent-primary" />
            </div>
            <h3 className="text-center text-white font-bold mb-1 truncate">{user.displayName || 'User'}</h3>
            <p className="text-center text-ktc-text-muted text-xs truncate">{user.email}</p>
          </div>
          
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'bookings' ? 'bg-ktc-accent-primary text-white' : 'text-ktc-text-muted hover:bg-white/5 hover:text-white'}`}
          >
            <Truck className="w-4 h-4" />
            Active Bookings
          </button>

          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'history' ? 'bg-ktc-accent-primary text-white' : 'text-ktc-text-muted hover:bg-white/5 hover:text-white'}`}
          >
            <FileText className="w-4 h-4" />
            Shipment History
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'profile' ? 'bg-ktc-accent-primary text-white' : 'text-ktc-text-muted hover:bg-white/5 hover:text-white'}`}
          >
            <User className="w-4 h-4" />
            Profile Settings
          </button>
          
          <button 
            onClick={() => auth.signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold tracking-widest uppercase text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors mt-8"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          {activeTab === 'bookings' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">Active Bookings</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search active bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 bg-ktc-bg-section border border-ktc-border text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-ktc-accent-primary text-sm transition-colors"
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="w-8 h-8 border-4 border-ktc-accent-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : error ? (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-red-400">{error}</div>
              ) : activeBookings.length === 0 ? (
                <div className="bg-ktc-bg-section border border-ktc-border rounded-xl p-12 text-center text-gray-400">
                  <Truck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No active bookings found.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {activeBookings.map((booking) => (
                    <div key={booking.id} className="bg-ktc-bg-section border border-ktc-border hover:border-white/10 transition-colors rounded-xl p-6">
                      <div className="flex flex-wrap md:flex-nowrap items-start justify-between gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-white">KT{booking.id.slice(0, 5).toUpperCase()}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border ${
                              booking.status === 'pending' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                              booking.status === 'delivered' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                              booking.status === 'cancelled' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                              'bg-blue-500/10 border-blue-500/20 text-blue-400'
                            }`}>
                              {booking.status.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400 flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {booking.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <button
                            onClick={() => setTrackingBooking(booking)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-ktc-accent-primary hover:bg-ktc-accent-secondary text-white px-4 py-2 rounded text-[10px] font-bold tracking-widest uppercase transition-colors"
                          >
                            <MapPin className="w-3 h-3" /> Track
                          </button>
                          <button
                            onClick={() => handleDownloadInvoice(booking)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded text-[10px] font-bold tracking-widest uppercase transition-colors"
                          >
                            <FileText className="w-3 h-3" /> Invoice
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-ktc-text-muted" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-0.5">Pickup Route</p>
                            <p className="text-white text-sm font-semibold truncate max-w-[200px]">{booking.pickup}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-ktc-accent-primary" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-0.5">Delivery Route</p>
                            <p className="text-white text-sm font-semibold truncate max-w-[200px]">{booking.drop}</p>
                          </div>
                        </div>
                      </div>

                      {booking.status === 'pending' && (
                        <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="text-[10px] text-gray-500 hover:text-red-400 font-bold uppercase tracking-widest transition-colors flex items-center gap-1"
                          >
                            <XCircle className="w-3 h-3" /> Cancel Booking
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">Shipment History</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search past shipments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 bg-ktc-bg-section border border-ktc-border text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-ktc-accent-primary text-sm transition-colors"
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="w-8 h-8 border-4 border-ktc-accent-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : error ? (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-red-400">{error}</div>
              ) : pastBookings.length === 0 ? (
                <div className="bg-ktc-bg-section border border-ktc-border rounded-xl p-12 text-center text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No past shipments found.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {pastBookings.map((booking) => (
                    <div key={booking.id} className="bg-black/50 border border-ktc-border hover:border-white/10 transition-colors rounded-xl p-6">
                      <div className="flex flex-wrap md:flex-nowrap items-start justify-between gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-white">KT{booking.id.slice(0, 5).toUpperCase()}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border ${
                              booking.status === 'delivered' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                              'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}>
                              {booking.status.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400 flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {booking.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                          {booking.status === 'delivered' && !booking.rating && (
                            <button
                              onClick={() => setReviewBooking(booking)}
                              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-ktc-accent-primary outline-none hover:bg-[#1e40af] text-white px-4 py-2 rounded text-[10px] font-bold tracking-widest uppercase transition-colors"
                            >
                              <Star className="w-3 h-3" /> Write Review
                            </button>
                          )}
                          <button
                            onClick={() => handleDownloadInvoice(booking)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded text-[10px] font-bold tracking-widest uppercase transition-colors"
                          >
                            <Download className="w-3 h-3" /> Download Invoice
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                        <div className="flex items-start gap-3 opacity-70">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-ktc-text-muted" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-0.5">Pickup Route</p>
                            <p className="text-white text-sm font-semibold truncate max-w-[200px]">{booking.pickup}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 opacity-70">
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            <MapPin className="w-4 h-4 text-ktc-text-muted" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-0.5">Delivery Route</p>
                            <p className="text-white text-sm font-semibold truncate max-w-[200px]">{booking.drop}</p>
                          </div>
                        </div>
                      </div>
                      
                      {booking.rating && (
                        <div className="mt-4 pt-4 border-t border-white/5">
                          <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`w-3 h-3 ${star <= booking.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                            ))}
                            <span className="text-[10px] font-bold uppercase tracking-widest text-ktc-text-muted ml-2">Your Rating</span>
                          </div>
                          {booking.review && (
                            <p className="text-sm text-gray-300 italic">"{booking.review}"</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">Profile Settings</h2>
              <div className="bg-ktc-bg-section border border-ktc-border rounded-xl p-8 max-w-2xl">
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ktc-text-muted mb-2">Email Address</label>
                    <input
                      type="text"
                      disabled
                      value={user.email || ''}
                      className="w-full bg-black border border-white/10 text-gray-500 px-4 py-3 rounded cursor-not-allowed text-sm"
                    />
                    <p className="text-[10px] text-gray-500 mt-2">Email address cannot be changed.</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-white mb-2">Display Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-black border border-ktc-border text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary text-sm transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {profileMessage && (
                    <div className={`p-4 rounded text-sm ${profileMessage.includes('Failed') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                      {profileMessage}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="w-full bg-white text-black hover:bg-gray-200 font-bold uppercase tracking-widest text-xs py-3 rounded transition-colors disabled:opacity-50"
                  >
                    {profileLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Tracking Modal */}
      <AnimatePresence>
        {trackingBooking && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-ktc-bg-section border border-ktc-border rounded-xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">Live Tracking</h3>
                  <p className="text-xs text-ktc-text-muted mt-1 uppercase tracking-widest">KT{trackingBooking.id.slice(0, 5).toUpperCase()}</p>
                </div>
                <button onClick={() => setTrackingBooking(null)} className="text-gray-400 hover:text-white p-2">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8 pb-12">
                {trackingBooking.status === 'cancelled' ? (
                  <div className="text-center py-8">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">Booking Cancelled</h4>
                    <p className="text-gray-400 text-sm">This booking has been cancelled and cannot be tracked.</p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-white/10 z-0"></div>
                    <div className="space-y-8 relative z-10">
                      {TRACKING_STEPS.map((step, index) => {
                        const currentStepIndex = getStepIndex(trackingBooking.status);
                        const isCompleted = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;
                        
                        return (
                          <div key={step.id} className="flex items-center gap-6">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-ktc-bg-section transition-colors duration-500 ${
                              isCompleted ? 'bg-ktc-accent-primary' : 'bg-[#161B22] border-white/10'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle2 className={`w-5 h-5 ${isCurrent ? 'text-white animate-pulse' : 'text-white'}`} />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                              )}
                            </div>
                            <div>
                              <p className={`text-base font-bold uppercase tracking-widest ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                                {step.label}
                              </p>
                              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">
                                {isCompleted ? (isCurrent ? 'In Progress' : 'Completed') : 'Pending'}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {reviewBooking && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-ktc-bg-section border border-ktc-border rounded-xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black italic tracking-tighter uppercase text-white">Rate & Review</h3>
                  <p className="text-xs text-ktc-text-muted mt-1 uppercase tracking-widest">KT{reviewBooking.id.slice(0, 5).toUpperCase()}</p>
                </div>
                <button onClick={() => setReviewBooking(null)} className="text-gray-400 hover:text-white p-2">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8">
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-widest text-ktc-text-muted mb-2">Your Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-1 outline-none transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        >
                          <Star className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-widest text-ktc-text-muted mb-2">Written Review (Optional)</label>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Tell us about your experience..."
                      className="w-full bg-black border border-ktc-border text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary text-sm transition-colors min-h-[100px] resize-y"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="w-full bg-ktc-accent-primary hover:bg-[#1e40af] text-white font-bold uppercase tracking-widest text-sm py-3 rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </main>
      <Footer />
    </div>
  );
}
