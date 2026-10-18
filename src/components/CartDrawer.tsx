import React from 'react';
import { CartItem } from '../types';
import { formatPriceINR } from '../utils/format';
import { X, Trash2, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => {
    const strapAdd = item.watch.strapOptions.find((s) => s.name === item.selectedStrap)?.priceAdd || 0;
    return acc + (item.watch.price + strapAdd) * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F1016] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
              <h2 className="text-base font-bold font-cinzel text-white tracking-wider">
                YOUR ATELIER BAG
              </h2>
              <span className="text-xs font-mono text-slate-400">({items.length})</span>
            </div>
            
            <button
              onClick={onClose}
              aria-label="Close cart drawer"
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-sm text-slate-400 font-light">Your shopping bag is currently empty.</p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-xs text-[#C5A880] rounded border border-[#C5A880]/30 transition-colors cursor-pointer"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              items.map((item) => {
                const strapAdd = item.watch.strapOptions.find((s) => s.name === item.selectedStrap)?.priceAdd || 0;
                const itemTotal = (item.watch.price + strapAdd) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#121318] border border-white/5 flex gap-4 relative group"
                  >
                    {/* Watch Thumbnail */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-black/40 border border-white/5 shrink-0 flex items-center justify-center p-1">
                      <img
                        src={item.watch.image}
                        alt={item.watch.name}
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

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-xs font-semibold text-white truncate">
                            {item.watch.name}
                          </h3>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            aria-label="Remove item"
                            className="text-slate-500 hover:text-rose-400 transition-colors p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#C5A880] font-mono mt-0.5">
                          Ref. {item.watch.reference}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1 truncate">
                          {item.selectedStrap}
                        </p>
                        {item.engraving && (
                          <p className="text-[10px] text-slate-400 italic">
                            Engraving: &quot;{item.engraving}&quot;
                          </p>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 border border-white/10 rounded px-2 py-0.5 bg-black/20">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-xs text-slate-400 hover:text-white px-1 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono font-medium text-slate-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-xs text-slate-400 hover:text-white px-1 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-semibold font-mono text-[#C5A880] tabular-nums">
                          {formatPriceINR(itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0B0C10] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-200 tabular-nums">{formatPriceINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Armored Transport &amp; Delivery</span>
                  <span className="text-emerald-400 font-medium">Complimentary (₹0)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Lloyd&apos;s In-Transit Insurance</span>
                  <span className="text-emerald-400 font-medium">Included (₹0)</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-semibold text-white">
                  <span>Total Investment</span>
                  <span className="font-mono text-[#C5A880] text-base tabular-nums">
                    {formatPriceINR(subtotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-[#C5A880] hover:bg-[#d8b88d] text-[#0B0C10] font-semibold text-xs uppercase tracking-[0.15em] rounded transition-all shadow-lg shadow-[#C5A880]/15 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>256-bit Encrypted Checkout · Geneva Origin Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
