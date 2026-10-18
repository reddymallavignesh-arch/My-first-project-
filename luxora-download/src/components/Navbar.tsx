import React from 'react';
import { ShoppingBag, Heart, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrderLookup: () => void;
  onOpenConcierge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOrderLookup,
  onOpenConcierge,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0B0C10]/90 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a 
          href="#" 
          className="text-2xl font-bold tracking-[0.25em] text-[#F3F4F6] font-cinzel hover:text-[#C5A880] transition-colors whitespace-nowrap shrink-0"
        >
          LUXORA
        </a>

        {/* Zone 2: Clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.15em] font-medium text-slate-300">
          <a href="#collections" className="hover:text-[#C5A880] transition-colors whitespace-nowrap shrink-0">
            Collections
          </a>
          <a href="#showcase" className="hover:text-[#C5A880] transition-colors whitespace-nowrap shrink-0">
            Showcase
          </a>
          <a href="#craftsmanship" className="hover:text-[#C5A880] transition-colors whitespace-nowrap shrink-0">
            Craftsmanship
          </a>
          <a href="#boutiques" className="hover:text-[#C5A880] transition-colors whitespace-nowrap shrink-0">
            Salons &amp; Vaults
          </a>
          <button 
            onClick={onOpenOrderLookup}
            className="hover:text-[#C5A880] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            Order Lookup
          </button>
        </nav>

        {/* Zone 3: Primary action & Wishlist / Shopping Bag */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenConcierge}
            className="hidden lg:inline-flex items-center justify-center px-3.5 py-2 text-xs uppercase tracking-[0.12em] font-medium text-[#C5A880] border border-[#C5A880]/40 rounded hover:bg-[#C5A880]/10 hover:border-[#C5A880] transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Concierge
          </button>
          
          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="View Wishlist"
            className="relative flex items-center gap-1.5 px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-[#C5A880] fill-[#C5A880]' : 'text-slate-400'}`} />
            <span className="text-xs font-mono tabular-nums font-semibold text-[#C5A880]">
              {wishlistCount}
            </span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="View Shopping Bag"
            className="relative flex items-center gap-2 px-3.5 py-2 rounded bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
            <span className="text-xs font-medium tracking-wider hidden xs:inline">BAG</span>
            <span className="text-xs font-mono tabular-nums font-semibold text-[#C5A880]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
