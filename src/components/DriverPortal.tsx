import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, UserCircle, Truck, FileText, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function DriverPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="bg-ktc-bg-primary min-h-screen flex items-center justify-center p-4">
        <div className="absolute top-8 left-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-ktc-text-muted hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>
        <div className="bg-ktc-bg-section border border-ktc-border p-8 rounded-xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <UserCircle className="w-16 h-16 text-ktc-accent-primary" />
          </div>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white text-center mb-2">Driver Portal</h2>
          <p className="text-center text-ktc-text-muted text-sm mb-8">Login to accept loads and update status</p>
          
          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-ktc-text-muted mb-2">Phone Number</label>
              <input type="text" required placeholder="+91" className="w-full bg-black border border-ktc-border text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-ktc-text-muted mb-2">Password / OTP</label>
              <input type="password" required placeholder="••••••••" className="w-full bg-black border border-ktc-border text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary" />
            </div>
            <button type="submit" className="w-full mt-4 bg-ktc-accent-primary hover:bg-[#1e40af] text-white font-bold uppercase tracking-widest text-sm py-3 rounded transition-colors">
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Driver Dashboard
  return (
    <div className="bg-ktc-bg-primary min-h-screen text-ktc-text">
      <header className="bg-ktc-bg-section border-b border-ktc-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white font-black italic text-xl uppercase tracking-tighter">
              KTC<span className="text-ktc-accent-primary">.INC</span> <span className="text-sm font-sans font-normal text-ktc-text-muted tracking-normal lowercase ml-2">driver partner</span>
            </Link>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="text-ktc-text-muted hover:text-white text-sm font-bold uppercase tracking-widest transition-colors">
            Log out
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-1 space-y-4">
            <div className="bg-ktc-bg-section border border-ktc-border rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">Total Earnings</h3>
              <p className="text-3xl font-black text-ktc-accent-primary mb-2">₹12,450</p>
              <p className="text-xs text-ktc-text-muted uppercase tracking-widest">This Week</p>
            </div>
            <div className="bg-ktc-bg-section border border-ktc-border rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">Active Vehicle</h3>
              <p className="text-lg text-white mb-2">Tata 407 (DL 1L 9988)</p>
              <p className="text-xs text-green-400 uppercase tracking-widest font-bold">● Available for Load</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">Current Load</h2>
            
            <div className="bg-ktc-bg-section border border-ktc-border hover:border-white/10 transition-colors rounded-xl p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">PICKED UP</span>
                  <h4 className="text-xl text-white font-bold mt-2">KT-98312</h4>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">₹3,500</p>
                  <p className="text-xs text-ktc-text-muted uppercase tracking-widest">Est. Payout</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex-1 text-center">
                  <p className="text-white font-bold">Delhi</p>
                  <p className="text-[10px] text-ktc-text-muted uppercase tracking-widest">Pickup</p>
                </div>
                <div className="flex-1 border-b-2 border-dashed border-white/20 mx-4 relative top-[-10px]">
                  <Truck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-ktc-accent-primary" />
                </div>
                <div className="flex-1 text-center">
                  <p className="text-white font-bold">Jaipur</p>
                  <p className="text-[10px] text-ktc-text-muted uppercase tracking-widest">Drop</p>
                </div>
              </div>

              <div className="bg-black/50 rounded-lg p-4 mb-6">
                <p className="text-xs text-ktc-text-muted uppercase tracking-widest mb-2 font-bold">Update Status</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] tracking-widest uppercase py-2 rounded transition-colors border border-white/10">In Transit</button>
                  <button className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-bold text-[10px] tracking-widest uppercase py-2 rounded transition-colors border border-green-500/30">Mark Delivered</button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex-1 bg-ktc-accent-primary hover:bg-[#1e40af] text-white font-bold py-3 rounded text-xs uppercase tracking-widest transition-colors flex justify-center items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Upload Proof (POD)
                </button>
              </div>
            </div>
            
            <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white mt-12 mb-4">Available Loads</h2>
            <div className="bg-black/50 border border-ktc-border rounded-xl p-8 text-center">
               <p className="text-ktc-text-muted">No new loads matching your route currently.</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
