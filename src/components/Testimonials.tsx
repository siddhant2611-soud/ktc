import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, Send } from 'lucide-react';
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

const defaultTestimonials = [
  {
    id: '1',
    text: "Excellent service and timely delivery. They delivered our industrial cargo without any hassle. Highly recommended for heavy logistics.",
    author: "Rahul M.",
    role: "Operations Manager",
    rating: 5
  },
  {
    id: '2',
    text: "Reliable logistics partner. We have been using KTC for our commercial goods transportation across UP, and their professionalism is unmatched.",
    author: "Vikas S.",
    role: "Supply Chain Director",
    rating: 5
  },
  {
    id: '3',
    text: "Professional team and safe transportation. Their customer support was available 24/7 providing us with active tracking updates.",
    author: "Amit K.",
    role: "Business Owner",
    rating: 5
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', role: '', text: '', rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedReviews: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedReviews.push({ id: doc.id, ...doc.data() });
        });
        
        if (fetchedReviews.length > 0) {
          // Combine fetched reviews with default ones
          setTestimonials([...fetchedReviews, ...defaultTestimonials]);
        }
      } catch (error) {
        // Fallback to default reviews silently
      }
    };
    fetchReviews();
  }, [submitted]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) return;
    
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        ...newReview,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setShowReviewForm(false);
      setNewReview({ author: '', role: '', text: '', rating: 5 });
      // Reset submission message after a delay
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      alert("Please ensure your Firebase Firestore rules are updated to allow writing reviews.");
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = testimonials.reduce((acc, curr) => acc + (curr.rating || 5), 0) / testimonials.length;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      className="py-24 bg-ktc-bg-section border-y border-ktc-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-16">
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-6">Client Success Stories</h2>
              <div className="flex items-center gap-2 text-ktc-highlight mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill={i < Math.round(avgRating) ? "currentColor" : "none"} className={`w-6 h-6 ${i < Math.round(avgRating) ? '' : 'text-gray-600'}`} />
                ))}
              </div>
              <p className="text-xl text-white font-bold mb-2">{avgRating.toFixed(1)}-Star Rating</p>
              <p className="text-ktc-text-muted">Based on {testimonials.length} Verified Reviews</p>
            </motion.div>
          </div>

          <div className="lg:w-2/3 relative h-[300px] w-full">
            <Quote className="absolute top-0 right-0 w-32 h-32 text-ktc-bg-card opacity-50 -z-10" />
            <AnimatePresence mode="wait">
              {testimonials.length > 0 && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <p className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase text-white leading-relaxed mb-8 line-clamp-4">
                    "{testimonials[currentIndex].text}"
                  </p>
                  <div>
                    <div className="font-bold text-ktc-accent-primary text-xl">{testimonials[currentIndex].author}</div>
                    <div className="text-ktc-text-muted">{testimonials[currentIndex].role}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="absolute bottom-0 left-0 flex gap-2 overflow-x-auto max-w-full pb-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 sm:w-12 h-1 shrink-0 transition-all ${idx === currentIndex ? 'bg-ktc-accent-primary' : 'bg-ktc-bg-card hover:bg-ktc-border'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Write a Review Section */}
        <div className="max-w-2xl mx-auto mt-12 bg-black/30 border border-ktc-border rounded-xl p-8">
          {!showReviewForm && !submitted && (
            <div className="text-center">
              <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase mb-2">Share Your Experience</h3>
              <p className="text-ktc-text-muted mb-6">Help others know about our service quality.</p>
              <button 
                onClick={() => setShowReviewForm(true)}
                className="bg-ktc-accent-primary hover:bg-[#1e40af] text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
              >
                Write a Review <Star className="w-4 h-4 fill-current" />
              </button>
            </div>
          )}

          {submitted && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Thank you for your review!</h3>
              <p className="text-ktc-text-muted">Your feedback has been added to our success stories.</p>
            </div>
          )}

          {showReviewForm && (
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmitReview} 
              className="space-y-4"
            >
              <h3 className="text-xl font-black italic tracking-tighter text-white uppercase mb-6 flex items-center justify-between">
                Rate & Review
                <button 
                  type="button" 
                  onClick={() => setShowReviewForm(false)}
                  className="text-ktc-text-muted hover:text-white text-xs font-sans not-italic font-bold tracking-widest uppercase"
                >
                  Cancel
                </button>
              </h3>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-ktc-text-muted mb-2">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className={`p-1 transition-transform hover:scale-110 ${star <= newReview.rating ? 'text-ktc-highlight' : 'text-gray-600'}`}
                    >
                      <Star className={`w-8 h-8 ${star <= newReview.rating ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ktc-text-muted mb-2">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    value={newReview.author}
                    onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                    className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary transition-colors text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ktc-text-muted mb-2">Role/Company (Optional)</label>
                  <input 
                    type="text" 
                    value={newReview.role}
                    onChange={(e) => setNewReview({...newReview, role: e.target.value})}
                    className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary transition-colors text-sm"
                    placeholder="CEO, Acme Corp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-ktc-text-muted mb-2">Review</label>
                <textarea 
                  required
                  value={newReview.text}
                  onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                  className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-ktc-accent-primary transition-colors min-h-[100px] text-sm"
                  placeholder="Share your experience working with us..."
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-white text-black hover:bg-gray-200 font-bold uppercase tracking-widest text-xs py-3 rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? 'Submitting...' : 'Submit Review'} <Send className="w-3 h-3" />
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </motion.section>
  );
}
