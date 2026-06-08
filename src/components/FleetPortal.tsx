import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Users, Truck, PlusCircle, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function FleetPortal() {
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
            <Users className="w-16 h-16 text-ktc-accent-primary" />
          </div>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white text-center mb-2">Fleet Owner Portal</h2>
          <p className="text-center text-ktc-text-muted text-sm mb-8">Manage drivers, trucks, and payments</p>
          
          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-ktc-text-muted mb-2">Company PAN / GST</label>
              <input type="text" required placeholder="XXXXX9999X" className="w-full bg-black border border-ktc-border text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary uppercase" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-ktc-text-muted mb-2">Password</label>
              <input type="password" required placeholder="••••••••" className="w-full bg-black border border-ktc-border text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary" />
            </div>
            <button type="submit" className="w-full mt-4 bg-ktc-accent-primary hover:bg-[#1e40af] text-white font-bold uppercase tracking-widest text-sm py-3 rounded transition-colors">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ktc-bg-primary min-h-screen text-ktc-text">
      <header className="bg-ktc-bg-section border-b border-ktc-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-white font-black italic text-xl uppercase tracking-tighter">
              KTC<span className="text-ktc-accent-primary">.INC</span> <span className="text-sm font-sans font-normal text-ktc-text-muted tracking-normal lowercase ml-2">fleet owner</span>
            </Link>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="text-ktc-text-muted hover:text-white text-sm font-bold uppercase tracking-widest transition-colors">
            Log out
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">Sharma Logistics</h2>
            <p className="text-ktc-text-muted">GST: 07AABCU9600XXXX</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors">
               <PlusCircle className="w-4 h-4" /> Add Driver
            </button>
            <button className="bg-ktc-accent-primary hover:bg-[#1e40af] text-white px-4 py-2 rounded text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors">
               <PlusCircle className="w-4 h-4" /> Add Truck
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-ktc-bg-section border border-ktc-border rounded-xl p-6">
            <p className="text-xs text-ktc-text-muted uppercase tracking-widest mb-2 font-bold flex items-center gap-2"><Truck className="w-4 h-4"/> Active Trucks</p>
            <p className="text-3xl font-black text-white">4 <span className="text-sm font-normal text-gray-500">/ 6</span></p>
          </div>
          <div className="bg-ktc-bg-section border border-ktc-border rounded-xl p-6">
            <p className="text-xs text-ktc-text-muted uppercase tracking-widest mb-2 font-bold flex items-center gap-2"><Users className="w-4 h-4"/> Available Drivers</p>
            <p className="text-3xl font-black text-white">2 <span className="text-sm font-normal text-gray-500">/ 8</span></p>
          </div>
          <div className="bg-ktc-bg-section border border-ktc-border rounded-xl p-6">
            <p className="text-xs text-ktc-text-muted uppercase tracking-widest mb-2 font-bold flex items-center gap-2"><CreditCard className="w-4 h-4"/> Pending Payouts</p>
            <p className="text-3xl font-black text-orange-400">₹45,200</p>
          </div>
          <div className="bg-ktc-bg-section border border-ktc-border rounded-xl p-6">
            <p className="text-xs text-ktc-text-muted uppercase tracking-widest mb-2 font-bold flex items-center gap-2"><CreditCard className="w-4 h-4"/> Cleared (This Mo)</p>
            <p className="text-3xl font-black text-green-400">₹1,12,000</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Fleet Status</h3>
            <div className="space-y-4">
              {[
                { no: 'DL 1M 4455', driver: 'Rajesh K.', status: 'In Transit', route: 'Delhi → Mumbai' },
                { no: 'DL 1M 4456', driver: 'Suresh L.', status: 'Available', route: '-' },
                { no: 'HR 38 9911', driver: 'Amit S.', status: 'Picked Up', route: 'Gurgaon → Pune' },
              ].map((truck, i) => (
                <div key={i} className="bg-ktc-bg-section border border-ktc-border rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold">{truck.no}</h4>
                    <p className="text-sm text-ktc-text-muted">{truck.driver}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${truck.status === 'Available' ? 'text-green-400' : 'text-blue-400'}`}>
                      {truck.status}
                    </p>
                    <p className="text-xs text-ktc-text-muted">{truck.route}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
             <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Recent Transactions</h3>
             <div className="bg-black/50 border border-ktc-border rounded-xl">
               <table className="w-full">
                 <thead>
                   <tr className="border-b border-white/5 text-left text-[10px] uppercase tracking-widest text-ktc-text-muted">
                     <th className="p-4 font-bold">Ref No</th>
                     <th className="p-4 font-bold">Amount</th>
                     <th className="p-4 font-bold">Status</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr className="border-b border-white/5">
                     <td className="p-4 text-sm text-white">TRX9102</td>
                     <td className="p-4 text-sm text-white font-mono">₹14,500</td>
                     <td className="p-4"><span className="text-[10px] text-green-400 uppercase tracking-widest font-bold">Settled</span></td>
                   </tr>
                   <tr className="border-b border-white/5">
                     <td className="p-4 text-sm text-white">TRX9103</td>
                     <td className="p-4 text-sm text-white font-mono">₹21,000</td>
                     <td className="p-4"><span className="text-[10px] text-orange-400 uppercase tracking-widest font-bold">Processing</span></td>
                   </tr>
                   <tr>
                     <td className="p-4 text-sm text-white">TRX9106</td>
                     <td className="p-4 text-sm text-white font-mono">₹4,200</td>
                     <td className="p-4"><span className="text-[10px] text-orange-400 uppercase tracking-widest font-bold">Processing</span></td>
                   </tr>
                 </tbody>
               </table>
             </div>
          </div>
        </div>

      </main>
    </div>
  );
}
