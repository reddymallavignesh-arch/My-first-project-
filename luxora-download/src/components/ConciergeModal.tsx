import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Calendar, MapPin, PhoneCall } from 'lucide-react';
import { BOUTIQUES } from '../data/watches';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    boutique: BOUTIQUES[0].city,
    interest: 'Bespoke Tourbillon Commission',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // auto close or let user see confirmation
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-xl bg-[#0F1016] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close concierge modal"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-cinzel text-white">
              Appointment Requested
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Your dedicated Luxora Private Client Director will contact you within 2 hours to confirm your private salon appointment at {formData.boutique}.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-[#C5A880] text-[#0B0C10] font-semibold text-xs uppercase tracking-wider rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Bespoke Horology Concierge</span>
              </div>
              <h2 className="text-2xl font-bold font-cinzel text-white mt-1">
                Private Salon Consultation
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Schedule a discreet viewing in Geneva, New York, Zurich, or Tokyo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 block">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Harrington"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 block">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="client@luxury.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 block">Direct Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+41 22 819 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 block">Preferred Salon Location</label>
                <select
                  value={formData.boutique}
                  onChange={(e) => setFormData({ ...formData, boutique: e.target.value })}
                  className="w-full bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                >
                  {BOUTIQUES.map((b) => (
                    <option key={b.city} value={b.city}>
                      {b.city} — {b.address}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 block">Primary Horological Interest</label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="Tourbillon Squelette Acquisition">Tourbillon Squelette Acquisition</option>
                  <option value="Grand Complication Commission">Grand Complication Bespoke Commission</option>
                  <option value="Private Collector Vault Viewing">Private Collector Vault Viewing</option>
                  <option value="Custom Precious Metal Alloy Request">Custom Precious Metal Alloy Request</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 block">Special Requests / Preferences</label>
                <textarea
                  rows={2}
                  placeholder="Specific dates, champagne preference, security liaison..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C5A880] hover:bg-[#d8b88d] text-[#0B0C10] font-bold text-xs uppercase tracking-[0.15em] rounded transition-all cursor-pointer shadow-lg shadow-[#C5A880]/15"
              >
                Request Private Appointment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
