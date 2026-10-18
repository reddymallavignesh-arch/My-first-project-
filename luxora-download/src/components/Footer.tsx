import React, { useState } from 'react';
import { ShieldCheck, Check } from 'lucide-react';

interface FooterProps {
  onOpenOrderLookup: () => void;
  onOpenConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrderLookup, onOpenConcierge }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#08090C] border-t border-white/5 text-slate-400 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand info */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-2xl font-bold font-cinzel text-white tracking-[0.25em] block">
              LUXORA
            </span>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-light">
              Haute Horlogerie manufacture based in Le Brassus, Vallée de Joux. Dedicated to the creation of ultra-complicated mechanical timepieces that transcend fashion and celebrate permanence.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Official Geneva Seal Partner &amp; COSC Certified</span>
            </div>
          </div>

          {/* Nav links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#collections" className="hover:text-white transition-colors">Tourbillons</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Chronographs</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Celestial Complications</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Ultra-Thin Dress</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Grand Complications</a></li>
            </ul>
          </div>

          {/* Client Care */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenOrderLookup} className="hover:text-white transition-colors text-left cursor-pointer">
                  Track Vault Order
                </button>
              </li>
              <li>
                <button onClick={onOpenConcierge} className="hover:text-white transition-colors text-left cursor-pointer">
                  Book Salon Viewing
                </button>
              </li>
              <li><a href="#craftsmanship" className="hover:text-white transition-colors">Atelier Heritage</a></li>
              <li><a href="#boutiques" className="hover:text-white transition-colors">Global Salons</a></li>
              <li><span className="text-slate-500">Certificate Validation</span></li>
            </ul>
          </div>

          {/* Private Gazette Subscription */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold">
              The Horological Gazette
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive private dispatch announcements for limited numbered editions and private salon dates.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter client email..."
                className="bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A880] flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#C5A880] hover:bg-[#d8b88d] text-[#0B0C10] font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                {subscribed ? <Check className="w-4 h-4" /> : 'Join'}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-emerald-400">
                Invitation registered. Welcome to the Luxora registry.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} LUXORA HAUTE HORLOGERIE SA. Le Brassus, Switzerland. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Geneva Escrow Protection</span>
            <span aria-hidden="true">·</span>
            <span>PCI-DSS Level 1</span>
            <span aria-hidden="true">·</span>
            <span>Encrypted Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
