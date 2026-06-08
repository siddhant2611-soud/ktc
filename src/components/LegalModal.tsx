import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const isPrivacy = type === 'privacy';
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-ktc-bg-section border border-ktc-border w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl relative"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-ktc-border bg-ktc-bg-primary/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-ktc-bg-section border border-ktc-border flex items-center justify-center text-ktc-accent-primary">
                  {isPrivacy ? <Shield className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-widest text-white">
                    {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
                  </h2>
                  <p className="text-xs text-ktc-text-muted">Last Updated: June 2026</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="bg-black/50 hover:bg-ktc-accent-primary text-white p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-sm text-gray-300 font-sans leading-relaxed flex-1">
              {isPrivacy ? (
                <>
                  <section>
                    <h3 className="text-white font-bold text-base mb-2">1. Information We Collect</h3>
                    <p>We collect information that you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, delivery notes, and other information.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold text-base mb-2">2. How We Use Information</h3>
                    <p>We use the information we collect to operate, maintain, and provide the features and functionality of the Service, to process your requests and transactions, to communicate with you, and to help protect the safety of our users, Kaushik Transport Company, and others.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold text-base mb-2">3. Data Sharing and Location tracking</h3>
                    <p>As a logistics platform, we utilize GPS and location routing to provide accurate delivery tracking. This data is shared exclusively with relevant shipment stakeholders and our verified drivers. We do not sell your personal data to third parties.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold text-base mb-2">4. Contact Us</h3>
                    <p>If you have any questions about this Privacy Policy, please contact us at info@kaushiktransport.com.</p>
                  </section>
                </>
              ) : (
                <>
                  <section>
                    <h3 className="text-white font-bold text-base mb-2">1. Acceptance of Terms</h3>
                    <p>By accessing and using Kaushik Transport Company's online platform, you accept and agree to be bound by the terms and provision of this agreement. Every shipment booked through our platform is subject to the terms stated herein.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold text-base mb-2">2. Restrictions on Goods</h3>
                    <p>Customers are strictly prohibited from utilizing our service to transport illegal, hazardous, undocumented, or dangerously classified materials without prior express written authorization and applicable hazardous material permits.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold text-base mb-2">3. Liability & Insurance</h3>
                    <p>While we guarantee utmost care of the cargo, KTC's liability for lost or damaged goods is strictly limited in accordance with the Carriage by Road Act. We strongly advise clients to acquire standard transit insurance for high-value cargo.</p>
                  </section>
                  <section>
                    <h3 className="text-white font-bold text-base mb-2">4. Payment Terms</h3>
                    <p>Invoices are payable within 15 days of receipt unless otherwise agreed upon in standard corporate contracts. Late payments may incur an ongoing service charge.</p>
                  </section>
                </>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-ktc-border bg-ktc-bg-primary/50 text-right shrink-0">
              <button 
                onClick={onClose}
                className="bg-white hover:bg-gray-200 text-black font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
