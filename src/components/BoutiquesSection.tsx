import React from 'react';
import { BOUTIQUES } from '../data/watches';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';

interface BoutiquesSectionProps {
  onOpenConcierge: () => void;
}

export const BoutiquesSection: React.FC<BoutiquesSectionProps> = ({ onOpenConcierge }) => {
  return (
    <section id="boutiques" className="py-20 bg-[#0E0F14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/5">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
              Worldwide Salons
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white tracking-tight">
              Private Ateliers &amp; Vaults
            </h2>
            <p className="text-sm text-slate-400 max-w-lg">
              Experience the weight of hand-finished solid gold and titanium in person. Reserved exclusively for private appointments.
            </p>
          </div>

          <button
            onClick={onOpenConcierge}
            className="px-5 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/15 rounded text-xs uppercase tracking-[0.15em] font-medium transition-colors cursor-pointer self-start md:self-auto flex items-center gap-2"
          >
            <span>Book Private Salon</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BOUTIQUES.map((boutique) => (
            <div
              key={boutique.city}
              className="p-6 rounded-xl bg-[#121318] border border-white/5 hover:border-[#C5A880]/30 transition-all space-y-4"
            >
              <div className="flex items-center gap-2 text-[#C5A880]">
                <MapPin className="w-4 h-4" />
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  {boutique.city}
                </h3>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                {boutique.address}
              </p>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono border-t border-white/5 pt-3">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{boutique.hours}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
