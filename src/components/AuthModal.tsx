import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        // Create user document
        try {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            name,
            email,
            createdAt: new Date().toISOString(),
            role: 'customer'
          });
        } catch (dbErr: any) {
          console.error("Failed to write to users collection:", dbErr);
          // Don't fail the complete auth flow if just the metadata writing failed due to missing security rules.
        }
      }
      onSuccess?.();
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/network-request-failed' || String(err.message).includes('network-request-failed')) {
        setError("Network Error: Could not reach authentication server. If you are viewing this inside an editor or iframe, browser privacy settings might block it. Please try clicking the 'Open in New Tab' button in the top right, or check your ad-blocker.");
      } else {
        setError(err.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-ktc-bg-section border border-ktc-border max-w-md w-full rounded-2xl overflow-hidden shadow-2xl relative p-8"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-6">
            {isResetPassword ? 'Reset Password' : isLogin ? 'Sign In' : 'Create Account'}
          </h2>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded text-sm">
              {error}
            </div>
          )}
          
          {resetSent && (
            <div className="mb-4 bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded text-sm">
              Password reset link sent to your email!
            </div>
          )}

          <form onSubmit={isResetPassword ? handleResetPassword : handleSubmit} className="space-y-4">
            {!isLogin && !isResetPassword && (
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full bg-ktc-bg-primary border border-white/10 text-white pl-10 pr-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary focus:ring-1 focus:ring-ktc-accent-primary transition-colors"
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="w-full bg-ktc-bg-primary border border-white/10 text-white pl-10 pr-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary focus:ring-1 focus:ring-ktc-accent-primary transition-colors"
              />
            </div>
            
            {!isResetPassword && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  minLength={6}
                  className="w-full bg-ktc-bg-primary border border-white/10 text-white pl-10 pr-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary focus:ring-1 focus:ring-ktc-accent-primary transition-colors"
                />
              </div>
            )}

            {!isResetPassword && isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsResetPassword(true);
                    setError('');
                    setResetSent(false);
                  }}
                  className="text-xs text-ktc-accent-primary hover:text-white transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ktc-accent-primary hover:bg-ktc-accent-secondary disabled:bg-ktc-accent-primary/50 text-white font-bold px-4 py-3 rounded mt-4 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isResetPassword ? 'Send Link' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            {isResetPassword ? (
              <button
                onClick={() => {
                  setIsResetPassword(false);
                  setError('');
                  setResetSent(false);
                }}
                className="text-ktc-accent-primary hover:text-white font-bold transition-colors"
              >
                Back to Sign In
              </button>
            ) : isLogin ? (
              <>
                {"Don't have an account? "}
                <button
                  onClick={() => { setIsLogin(false); setError(''); }}
                  className="text-ktc-accent-primary hover:text-white font-bold transition-colors"
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                {"Already have an account? "}
                <button
                  onClick={() => { setIsLogin(true); setError(''); }}
                  className="text-ktc-accent-primary hover:text-white font-bold transition-colors"
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
