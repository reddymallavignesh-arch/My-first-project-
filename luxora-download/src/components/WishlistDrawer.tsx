import React from 'react';
import { Watch } from '../types';
import { formatPriceINR } from '../utils/format';
import { X, Heart, ShoppingBag, Trash2, ArrowRight, Eye } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Watch[];
  onRemoveFromWishlist: (watchId: string) => void;
  onAddToCart: (watch: Watch) => void;
  onSelectWatch: (watch: Watch) => void;
  onClearWishlist: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectWatch,
  onClearWishlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F1016] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#C5A880] fill-[#C5A880]" />
              <h2 className="text-base font-bold font-cinzel text-white tracking-wider">
                CURATED WISHLIST
              </h2>
              <span className="text-xs font-mono text-slate-400">({wishlist.length})</span>
            </div>
            
            <button
              onClick={onClose}
              aria-label="Close wishlist drawer"
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Watch Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Heart className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm text-slate-400 font-light">Your curated wishlist is empty.</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the heart icon on any timepiece to reserve your favorites for later contemplation.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-xs text-[#C5A880] rounded border border-[#C5A880]/30 transition-colors cursor-pointer mt-2"
                >
                  Explore Timepieces
                </button>
              </div>
            ) : (
              wishlist.map((watch) => (
                <div
                  key={watch.id}
                  className="p-4 rounded-xl bg-[#121318] border border-white/5 flex gap-4 relative group hover:border-[#C5A880]/30 transition-all"
                >
                  {/* Thumbnail */}
                  <div 
                    onClick={() => {
                      onSelectWatch(watch);
                      onClose();
                    }}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-black/40 border border-white/5 shrink-0 flex items-center justify-center p-1 cursor-pointer"
                  >
                    <img
                      src={watch.image}
                      alt={watch.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('/images/')) {
                          target.src = `/images/hero_luxury_watch.jpg`;
                        }
                      }}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 
                          onClick={() => {
                            onSelectWatch(watch);
                            onClose();
                          }}
                          className="text-xs font-semibold text-white truncate cursor-pointer hover:text-[#C5A880] transition-colors"
                        >
                          {watch.name}
                        </h3>
                        <button
                          onClick={() => onRemoveFromWishlist(watch.id)}
                          aria-label="Remove from wishlist"
                          className="text-slate-500 hover:text-rose-400 transition-colors p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <p className="text-[11px] text-[#C5A880] font-mono mt-0.5">
                        Ref. {watch.reference}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {watch.caseMaterial} · {watch.caseSize}
                      </p>
                    </div>

                    {/* Price & Add to Bag */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                      <span className="text-xs font-semibold font-mono text-[#C5A880] tabular-nums">
                        {formatPriceINR(watch.price)}
                      </span>

                      <button
                        onClick={() => {
                          onAddToCart(watch);
                        }}
                        className="px-3 py-1.5 rounded bg-white/10 hover:bg-[#C5A880] text-slate-200 hover:text-[#0B0C10] text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {wishlist.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0B0C10] space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{wishlist.length} Saved {wishlist.length === 1 ? 'Timepiece' : 'Timepieces'}</span>
                <button
                  onClick={onClearWishlist}
                  className="text-rose-400/80 hover:text-rose-400 text-xs cursor-pointer hover:underline"
                >
                  Clear Wishlist
                </button>
              </div>

              <button
                onClick={() => {
                  wishlist.forEach((w) => onAddToCart(w));
                  onClose();
                }}
                className="w-full py-3 px-4 bg-[#C5A880] hover:bg-[#d8b88d] text-[#0B0C10] font-semibold text-xs uppercase tracking-[0.15em] rounded transition-all shadow-lg shadow-[#C5A880]/15 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Shopping Bag</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
