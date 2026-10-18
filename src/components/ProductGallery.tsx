import React, { useState, useMemo } from 'react';
import { Watch } from '../types';
import { formatPriceINR } from '../utils/format';
import { Search, Plus, Check, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  watches: Watch[];
  wishlistIds: Set<string>;
  onToggleWishlist: (watch: Watch) => void;
  onSelectWatch: (watch: Watch) => void;
  onAddToCart: (watch: Watch) => void;
}

// Framer motion container & card animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 32,
    scale: 0.98,
  },
  visible: {
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  watches,
  wishlistIds,
  onToggleWishlist,
  onSelectWatch,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = ['All', 'Tourbillon', 'Chronograph', 'Celestial', 'Dress', 'Grand Complication'];
  const materials = ['All', 'Rose Gold', 'Titanium', 'Platinum', 'Yellow Gold', 'White Gold', 'Steel', 'Carbon'];

  const filteredWatches = useMemo(() => {
    return watches
      .filter((w) => {
        const matchesCategory = selectedCategory === 'All' || w.collection === selectedCategory;
        const matchesMaterial =
          selectedMaterial === 'All' ||
          w.caseMaterial.toLowerCase().includes(selectedMaterial.toLowerCase()) ||
          (selectedMaterial === 'Steel' && w.caseMaterial.toLowerCase().includes('oystersteel'));
        const matchesSearch =
          w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.movement.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.caseMaterial.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesMaterial && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [watches, selectedCategory, selectedMaterial, searchQuery, sortBy]);

  const handleQuickAdd = (watch: Watch, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(watch);
    setAddedId(watch.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1500);
  };

  const handleHeartClick = (watch: Watch, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(watch);
  };

  return (
    <section id="collections" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/5"
      >
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
            Atelier Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white tracking-tight">
            Curated Timepieces ({watches.length})
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Each timepiece represents months of meticulous Swiss bench craftsmanship, chronometric regulation, and finishing. Prices shown in Indian Rupees (INR).
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search model, calibre, metal..."
            className="w-full bg-[#121318] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#C5A880] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </motion.div>

      {/* Filter Toolbar (Segmented Controls) */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C5A880] text-[#0B0C10] font-semibold shadow-sm'
                  : 'bg-[#121318] text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary filters: Material & Sort */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hidden sm:inline">Material:</span>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="bg-[#121318] border border-white/10 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#C5A880] cursor-pointer"
            >
              {materials.map((m) => (
                <option key={m} value={m} className="bg-[#121318] text-slate-200">
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#121318] border border-white/10 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#C5A880] cursor-pointer"
            >
              <option value="featured" className="bg-[#121318] text-slate-200">Curated Order</option>
              <option value="price-asc" className="bg-[#121318] text-slate-200">Price: Low to High</option>
              <option value="price-desc" className="bg-[#121318] text-slate-200">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid Animated with Framer Motion */}
      <motion.div 
        key={`${selectedCategory}-${selectedMaterial}-${sortBy}-${searchQuery}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredWatches.map((watch) => {
          const isJustAdded = addedId === watch.id;
          const isWishlisted = wishlistIds.has(watch.id);

          return (
            <motion.div
              key={watch.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              onClick={() => onSelectWatch(watch)}
              className="group relative flex flex-col rounded-xl bg-[#121318] border border-white/10 hover:border-[#C5A880]/50 transition-colors duration-300 overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-[#181a24] to-[#121318] flex items-center justify-center p-4">
                <img
                  src={watch.image}
                  alt={watch.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to static public path if needed
                    const target = e.currentTarget;
                    if (!target.src.includes('/images/')) {
                      target.src = `/images/hero_luxury_watch.jpg`;
                    }
                  }}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-transparent to-transparent opacity-60" />

                {/* Single quiet editorial tag if present */}
                {watch.editionLimit && (
                  <div className="absolute top-3 left-3 text-[10px] font-mono tracking-wider uppercase text-[#C5A880] bg-[#0B0C10]/80 px-2 py-0.5 rounded border border-[#C5A880]/30 backdrop-blur-sm">
                    {watch.editionLimit.split('·')[0].trim()}
                  </div>
                )}

                {/* Wishlist Heart Button */}
                <button
                  onClick={(e) => handleHeartClick(watch, e)}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer border ${
                    isWishlisted
                      ? 'bg-[#0B0C10]/90 text-[#C5A880] border-[#C5A880]'
                      : 'bg-[#0B0C10]/60 text-slate-300 border-white/10 hover:text-white hover:bg-black/80'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A880]' : ''}`} />
                </button>

                {/* Hover Quick Action Overlay */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                  <span className="text-[11px] font-medium tracking-wide text-white bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm border border-white/20">
                    View Specifications
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-1.5">
                  {/* Clean unboxed metadata with bullet */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{watch.caseSize}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate max-w-[130px]">{watch.caseMaterial.split(' ')[0]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{watch.powerReserve.split(' ')[0]}</span>
                  </div>

                  <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-[#C5A880] transition-colors">
                    {watch.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {watch.subtitle}
                  </p>
                </div>

                {/* Footer with Tabular Price & Quick Add */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500">Retail Investment</span>
                    <span className="text-base font-semibold text-[#C5A880] font-mono tabular-nums">
                      {formatPriceINR(watch.price)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(watch, e)}
                    aria-label={`Add ${watch.name} to shopping bag`}
                    className={`px-3.5 py-2 text-xs font-medium rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'bg-white/10 hover:bg-[#C5A880] text-slate-200 hover:text-[#0B0C10]'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Reserved</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      {filteredWatches.length === 0 && (
        <div className="mt-12 py-16 text-center rounded-xl bg-[#121318] border border-white/5 space-y-3">
          <p className="text-slate-300 font-medium">No timepieces match your active selection criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedMaterial('All');
              setSearchQuery('');
            }}
            className="text-xs text-[#C5A880] hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
