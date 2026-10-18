import React, { useState, useEffect } from 'react';
import { Watch } from '../types';
import { formatPriceINR } from '../utils/format';
import { craftMovementImg } from '../data/watches';
import { Eye, Heart } from 'lucide-react';

interface HeroProps {
  featuredWatch: Watch;
  isWishlisted: boolean;
  onToggleWishlist: (watch: Watch) => void;
  onSelectWatch: (watch: Watch) => void;
  onInstantBuy: (watch: Watch) => void;
}

export const Hero: React.FC<HeroProps> = ({
  featuredWatch,
  isWishlisted,
  onToggleWishlist,
  onSelectWatch,
  onInstantBuy,
}) => {
  const [activeAngle, setActiveAngle] = useState<'dial' | 'movement' | 'craft'>('dial');
  const [secondsTick, setSecondsTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsTick((prev) => (prev + 1) % 60);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const angleViews = [
    { id: 'dial', label: 'Sapphire Openwork Dial', image: featuredWatch.image },
    { id: 'movement', label: 'Manufacture Calibre 3129', image: craftMovementImg },
    { id: 'craft', label: 'Titanium Tourbillon Cage', image: featuredWatch.image },
  ];

  const currentImage = angleViews.find((v) => v.id === activeAngle)?.image || featuredWatch.image;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-8 pb-12 overflow-hidden border-b border-white/5 bg-radial from-[#161822]/40 via-[#0B0C10] to-[#0B0C10]">
      {/* Background subtle luxury glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C5A880]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial & Brand Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
                <span>Vallée de Joux · Le Brassus</span>
                <span aria-hidden="true">·</span>
                <span>Haute Horlogerie</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-cinzel text-white tracking-tight leading-[1.1] text-balance">
                THE ARCHITECTURE OF TIME
              </h1>
              <p className="text-base text-slate-300 font-light leading-relaxed max-w-lg">
                Handcrafted in Switzerland, privately reserved for discerning collectors in India and worldwide. The Tourbillon Squelette unites a suspended 60-second flying tourbillon with twin-barrel architecture.
              </p>
            </div>

            {/* Spec highlights */}
            <div className="py-4 border-y border-white/10 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 uppercase tracking-widest block text-[10px]">Reference</span>
                <span className="font-mono text-slate-200 font-medium">{featuredWatch.reference}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-widest block text-[10px]">Casing</span>
                <span className="text-slate-200 font-medium">{featuredWatch.caseMaterial}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-widest block text-[10px]">Power Reserve</span>
                <span className="text-slate-200 font-medium">{featuredWatch.powerReserve}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase tracking-widest block text-[10px]">Retail Price (All Taxes Incl.)</span>
                <span className="font-mono text-[#C5A880] font-semibold text-sm tabular-nums">
                  {formatPriceINR(featuredWatch.price)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onInstantBuy(featuredWatch)}
                className="px-6 py-3.5 bg-[#C5A880] hover:bg-[#d8b88d] text-[#0B0C10] font-semibold text-xs uppercase tracking-[0.15em] rounded transition-all shadow-lg shadow-[#C5A880]/15 cursor-pointer whitespace-nowrap"
              >
                Acquire Timepiece
              </button>
              
              <button
                onClick={() => onSelectWatch(featuredWatch)}
                className="px-5 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/30 font-medium text-xs uppercase tracking-[0.15em] rounded transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
              >
                <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                Inspect Specifications
              </button>

              <button
                onClick={() => onToggleWishlist(featuredWatch)}
                aria-label="Toggle wishlist for featured timepiece"
                className={`p-3.5 rounded border transition-all cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#C5A880]/20 border-[#C5A880] text-[#C5A880]'
                    : 'bg-white/5 border-white/15 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A880]' : ''}`} />
              </button>
            </div>

            {/* Live Horological Ticker */}
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <div className="w-2.5 h-2.5 rounded-full border border-[#C5A880] flex items-center justify-center">
                <div 
                  className="w-1.5 h-0.5 bg-[#C5A880] origin-left" 
                  style={{ transform: `rotate(${secondsTick * 6}deg)` }}
                />
              </div>
              <span className="font-mono tabular-nums text-slate-300">
                Escapement active · 21,600 vph
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400/90 font-medium">Bespoke Vault Allocation</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-xl group">
              {/* Luxury Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-[#121318] border border-white/10 p-4 sm:p-6 shadow-2xl transition-all duration-500">
                
                {/* Watch Image Display */}
                <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#181a24] to-[#0f1016] flex items-center justify-center">
                  <img
                    src={currentImage}
                    alt={featuredWatch.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('/images/')) {
                        target.src = `/images/hero_luxury_watch.jpg`;
                      }
                    }}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle vignette scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Badge */}
                  <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-400 tracking-wider">
                    {featuredWatch.name} · {featuredWatch.caseSize}
                  </div>
                </div>

                {/* Perspective View Selector Buttons */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {angleViews.map((view) => (
                      <button
                        key={view.id}
                        onClick={() => setActiveAngle(view.id as any)}
                        className={`px-3 py-1.5 text-[11px] tracking-wider uppercase rounded transition-all cursor-pointer whitespace-nowrap ${
                          activeAngle === view.id
                            ? 'bg-[#C5A880] text-[#0B0C10] font-semibold'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {view.label}
                      </button>
                    ))}
                  </div>

                  <span className="hidden sm:inline-flex text-[11px] text-slate-400 font-mono">
                    Swiss Made
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Full-width 4-Column Metric Strip */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] block font-medium">Regulation</span>
            <p className="text-sm font-semibold text-slate-200">60-Second Flying Tourbillon</p>
            <p className="text-xs text-slate-400">Gravitational compensation</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] block font-medium">Autonomy</span>
            <p className="text-sm font-semibold text-slate-200">72-Hour Twin Barrel</p>
            <p className="text-xs text-slate-400">Continuous torque delivery</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] block font-medium">Metallurgy</span>
            <p className="text-sm font-semibold text-slate-200">18K Solid Rose Gold &amp; Platinum</p>
            <p className="text-xs text-slate-400">Ethically certified precious metals</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] block font-medium">Assurance</span>
            <p className="text-sm font-semibold text-slate-200">5-Year International Warranty</p>
            <p className="text-xs text-slate-400">Armored pan-India delivery included</p>
          </div>
        </div>
      </div>
    </section>
  );
};
