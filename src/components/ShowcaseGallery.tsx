import React, { useState } from 'react';
import { Watch } from '../types';
import { formatPriceINR } from '../utils/format';
import { ChevronLeft, ChevronRight, Eye, Plus, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShowcaseGalleryProps {
  watches: Watch[];
  wishlistIds: Set<string>;
  onToggleWishlist: (watch: Watch) => void;
  onSelectWatch: (watch: Watch) => void;
  onAddToCart: (watch: Watch) => void;
}

export const ShowcaseGallery: React.FC<ShowcaseGalleryProps> = ({
  watches,
  wishlistIds,
  onToggleWishlist,
  onSelectWatch,
  onAddToCart,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = watches[currentIndex];
  const isWishlisted = current ? wishlistIds.has(current.id) : false;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? watches.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === watches.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="showcase" className="py-24 bg-[#08090C] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Animated */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/5"
        >
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
              Curator&apos;s Spotlight
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white tracking-tight">
              Interactive Masterpiece Showcase
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Cycle through our flagship references to examine precision metallurgy, movement calibres, and hand-finished dials.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 mr-2">
              0{currentIndex + 1} / 0{watches.length}
            </span>
            <button
              onClick={handlePrev}
              aria-label="Previous masterpiece"
              className="p-3 rounded-full bg-[#121318] hover:bg-[#C5A880] text-slate-300 hover:text-[#0B0C10] border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next masterpiece"
              className="p-3 rounded-full bg-[#121318] hover:bg-[#C5A880] text-slate-300 hover:text-[#0B0C10] border border-white/10 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Showcase Theater Container Animated */}
        <motion.div 
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0F1016] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Left: Showcase Large Photo with Fade transition */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#181a24] to-[#0A0B0E] p-4 flex items-center justify-center border border-white/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('/images/')) {
                      target.src = `/images/hero_luxury_watch.jpg`;
                    }
                  }}
                  className="w-full h-full object-cover object-center transform transition-all duration-700 group-hover:scale-105"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/70 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-300 bg-black/60 px-3 py-1 rounded backdrop-blur-sm border border-white/10">
                {current.caseMaterial} · {current.caseSize}
              </div>

              {/* Wishlist toggle */}
              <button
                onClick={() => onToggleWishlist(current)}
                aria-label="Save to wishlist"
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer border ${
                  isWishlisted
                    ? 'bg-[#0B0C10]/90 text-[#C5A880] border-[#C5A880]'
                    : 'bg-[#0B0C10]/60 text-slate-300 border-white/10 hover:text-white hover:bg-black/80'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A880]' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Strip for fast selection */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
              {watches.map((w, idx) => (
                <button
                  key={w.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-16 h-12 rounded overflow-hidden border transition-all cursor-pointer shrink-0 ${
                    currentIndex === idx
                      ? 'border-[#C5A880] scale-105 shadow-md'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={w.image} 
                    alt={w.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('/images/')) {
                        target.src = `/images/hero_luxury_watch.jpg`;
                      }
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Technical Specs & Acquisition with animated crossfade */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div 
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-4"
              >
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block">
                    Reference: {current.reference}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-white mt-1">
                    {current.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {current.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {current.description}
                </p>

                {/* Key horology specs */}
                <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Calibre</span>
                    <span className="text-slate-200 font-medium font-mono text-[11px]">{current.movement}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Power Reserve</span>
                    <span className="text-slate-200 font-medium">{current.powerReserve}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Frequency</span>
                    <span className="text-slate-200 font-medium font-mono text-[11px]">{current.frequency}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Water Resistance</span>
                    <span className="text-slate-200 font-medium">{current.waterResistance}</span>
                  </div>
                </div>

                {/* Price in INR */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Acquisition Value</span>
                    <div className="text-2xl font-bold font-mono text-[#C5A880] tabular-nums">
                      {formatPriceINR(current.price)}
                    </div>
                  </div>
                  {current.editionLimit && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-1 rounded">
                      Numbered Edition
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => onSelectWatch(current)}
                className="py-3 px-4 rounded bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Full Details</span>
              </button>

              <button
                onClick={() => onAddToCart(current)}
                className="py-3 px-4 rounded bg-[#C5A880] hover:bg-[#d8b88d] text-[#0B0C10] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-[#C5A880]/15"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
