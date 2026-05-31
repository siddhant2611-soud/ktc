import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, getDocs, orderBy, updateDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { LogOut, Truck, MapPin, User, FileText, ChevronDown, Plus, X, Search, Home } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = 'kaushiktransportktc@gmail.com';

interface Booking {
  id: string;
  pickup: string;
  drop: string;
  vehicle: string;
  material: string;
  status: string;
  createdAt: any;
  userEmail?: string;
  userId?: string;
}

export function AdminPortal() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Add Booking State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    pickup: '',
    drop: '',
    vehicle: '',
    material: '',
    userEmail: '',
  });

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'bookings'));
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
      setError("Failed to load bookings. Ensure Firestore rules allow Admin read.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) {
      fetchBookings();
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Wait for auth context to update
    } catch (err: any) {
      if (err.code === 'auth/network-request-failed' || String(err.message).includes('network-request-failed')) {
        setLoginError("Network Error: Could not reach authentication server. If you are viewing this inside an editor or iframe, browser privacy settings might block it. Please try clicking the 'Open in New Tab' button in the top right, or check your ad-blocker.");
      } else {
        setLoginError(err.message || 'Login failed');
      }
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, { status: newStatus });
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Check permissions.');
    }
  };

  const handleAddBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...newBooking,
        status: 'pending',
        createdAt: serverTimestamp(),
        userId: 'admin_created'
      });
      setShowAddModal(false);
      fetchBookings();
      setNewBooking({ pickup: '', drop: '', vehicle: '', material: '', userEmail: '' });
    } catch (error) {
      console.error('Error adding booking:', error);
      alert('Failed to add booking. Check permissions.');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-ktc-accent-primary">
        <div className="w-8 h-8 border-4 border-ktc-accent-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-widest hidden sm:inline-block">Back to Website</span>
        </button>
        <div className="bg-ktc-bg-section border border-ktc-border p-8 rounded-2xl max-w-md w-full shadow-2xl">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-6 text-center">
            Admin Portal Access
          </h2>
          {loginError && (
            <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded text-sm text-center">
              {loginError}
            </div>
          )}
          {user && user.email !== ADMIN_EMAIL && (
            <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded text-sm text-center">
              Logged in as {user.email}. Not authorized. Please log out first if you want to log in as Admin.
              <button 
                onClick={() => signOut(auth)}
                className="mt-4 block w-full bg-ktc-bg-primary border border-ktc-border py-2 text-white text-xs uppercase"
              >
                Log Out
              </button>
            </div>
          )}
          {(!user || user.email !== ADMIN_EMAIL) && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Admin Email"
                  required
                  className="w-full bg-ktc-bg-primary border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-ktc-bg-primary border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-ktc-accent-primary hover:bg-ktc-accent-secondary text-white font-bold px-4 py-3 rounded mt-4 transition-colors uppercase tracking-widest text-sm"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="bg-ktc-bg-section border-b border-ktc-border p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white"
              title="Back to Website"
            >
              <Home className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
              <Truck className="w-6 h-6 text-ktc-accent-primary" />
              <h1 className="text-lg font-black italic tracking-tighter uppercase whitespace-nowrap">
                KTC <span className="text-ktc-accent-primary">Admin</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-400 hidden sm:inline-block">Logged in as Admin</span>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-ktc-accent-primary hover:bg-ktc-accent-secondary px-4 py-2 rounded text-xs font-bold uppercase tracking-widest flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Booking
            </button>
            <button
              onClick={() => signOut(auth)}
              className="text-gray-400 hover:text-white"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
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
      // Normal users create their own bookings
      allow create: if request.auth != null && (request.resource.data.userId == request.auth.uid || request.auth.token.email == 'kaushiktransportktc@gmail.com');
      // Admin sees/modifies everything. Normal sees/modifies their own.
      allow read: if request.auth != null && (resource.data.userId == request.auth.uid || request.auth.token.email == 'kaushiktransportktc@gmail.com');
      allow update, delete: if request.auth != null && (resource.data.userId == request.auth.uid || request.auth.token.email == 'kaushiktransportktc@gmail.com');
    }
  }
}`}
            </pre>
          </div>
        ) : (
          <div className="grid gap-6">
            <div className="flex items-center gap-4 text-ktc-text-muted mb-4 px-2">
              <FileText className="w-5 h-5" />
              <h2 className="text-xl font-bold uppercase tracking-wider text-white">All Bookings</h2>
            </div>
            
            {bookings.length === 0 ? (
              <div className="bg-ktc-bg-section border border-ktc-border rounded-xl p-12 text-center text-gray-400">
                <Truck className="w-12 h-12 mx-auto mb-4 text-gray-500 opacity-50" />
                <p>No bookings found.</p>
              </div>
            ) : (
              <div className="bg-ktc-bg-section border border-ktc-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/50 border-b border-ktc-border text-xs uppercase tracking-widest text-ktc-text-muted">
                        <th className="p-4 font-bold">Booking ID</th>
                        <th className="p-4 font-bold">Date</th>
                        <th className="p-4 font-bold">Customer</th>
                        <th className="p-4 font-bold">Route</th>
                        <th className="p-4 font-bold">Details</th>
                        <th className="p-4 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <span className="text-xs font-mono text-ktc-accent-primary">{booking.id.slice(0, 8)}</span>
                          </td>
                          <td className="p-4 text-sm text-gray-300">
                            {booking.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}
                          </td>
                          <td className="p-4">
                            <div className="text-sm font-bold">{booking.userEmail || 'Guest'}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <span className="truncate max-w-[100px]" title={booking.pickup}>{booking.pickup}</span>
                              <span className="text-ktc-accent-primary">→</span>
                              <span className="truncate max-w-[100px]" title={booking.drop}>{booking.drop}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-xs text-gray-400">
                              <div>{booking.vehicle}</div>
                              <div>{booking.material}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <select
                              value={booking.status}
                              onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                              className={`bg-black border border-white/10 rounded px-2 py-1 text-xs font-bold uppercase tracking-widest focus:outline-none cursor-pointer ${
                                booking.status === 'pending' ? 'text-orange-400' :
                                booking.status === 'confirmed' ? 'text-blue-400' :
                                booking.status === 'completed' ? 'text-green-400' :
                                'text-gray-400'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-ktc-bg-section border border-ktc-border rounded-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6">Add New Booking</h2>
            <form onSubmit={handleAddBooking} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 block">Customer Email</label>
                <input
                  type="email"
                  value={newBooking.userEmail}
                  onChange={(e) => setNewBooking({...newBooking, userEmail: e.target.value})}
                  className="w-full bg-ktc-bg-primary border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-ktc-accent-primary"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 block">Pickup Location</label>
                  <input
                    type="text"
                    value={newBooking.pickup}
                    onChange={(e) => setNewBooking({...newBooking, pickup: e.target.value})}
                    className="w-full bg-ktc-bg-primary border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-ktc-accent-primary"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 block">Drop Location</label>
                  <input
                    type="text"
                    value={newBooking.drop}
                    onChange={(e) => setNewBooking({...newBooking, drop: e.target.value})}
                    className="w-full bg-ktc-bg-primary border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-ktc-accent-primary"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 block">Vehicle Type</label>
                <select
                  value={newBooking.vehicle}
                  onChange={(e) => setNewBooking({...newBooking, vehicle: e.target.value})}
                  className="w-full bg-ktc-bg-primary border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-ktc-accent-primary"
                  required
                >
                  <option value="">Select vehicle...</option>
                  <option value="Mini Truck (1-2 Ton)">Mini Truck (1-2 Ton)</option>
                  <option value="Light Commercial (3-5 Ton)">Light Commercial (3-5 Ton)</option>
                  <option value="Medium Duty (6-10 Ton)">Medium Duty (6-10 Ton)</option>
                  <option value="Heavy Duty (15+ Ton)">Heavy Duty (15+ Ton)</option>
                  <option value="Trailer/Container">Trailer / Container</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 block">Material Type</label>
                <input
                  type="text"
                  value={newBooking.material}
                  onChange={(e) => setNewBooking({...newBooking, material: e.target.value})}
                  className="w-full bg-ktc-bg-primary border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-ktc-accent-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-ktc-accent-primary hover:bg-ktc-accent-secondary text-white font-bold px-4 py-3 rounded mt-6 transition-colors uppercase tracking-widest text-sm"
              >
                Create Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
