import React, { useState } from 'react';
import { Order } from '../types';
import { formatPriceINR } from '../utils/format';
import { X, Search, ShieldCheck, Truck, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  if (!isOpen) return null;

  const [lookupId, setLookupId] = useState<string>('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(orders[0] || null);
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const trimmed = lookupId.trim().toUpperCase();
    const match = orders.find(
      (o) => o.orderId.toUpperCase() === trimmed || o.customer.email.toLowerCase() === lookupId.trim().toLowerCase()
    );
    setFoundOrder(match || null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-[#0F1016] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close order tracking"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Vault Tracking &amp; Provenance</span>
            </div>
            <h2 className="text-2xl font-bold font-cinzel text-white mt-1">
              Order Lookup &amp; Authenticity
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Enter your Luxora Order ID (e.g. LX-84920) or your registered client email.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={lookupId}
                onChange={(e) => setLookupId(e.target.value)}
                placeholder="Enter Order ID or Email..."
                className="w-full bg-[#121318] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A880]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#C5A880] hover:bg-[#d8b88d] text-[#0B0C10] font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Result View */}
          {foundOrder ? (
            <div className="space-y-5 p-5 rounded-xl bg-[#121318] border border-white/10 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Order Reference</span>
                  <span className="text-base font-bold font-mono text-white">{foundOrder.orderId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Status</span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Vault Allocated · In Transit
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase text-slate-500 font-medium block">Timepieces in Order</span>
                {foundOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs bg-black/30 p-2.5 rounded">
                    <div>
                      <span className="text-white font-medium">{item.watch.name}</span>
                      <span className="text-slate-400 text-[11px] block">{item.selectedStrap}</span>
                    </div>
                    <span className="font-mono text-[#C5A880] tabular-nums">
                      {formatPriceINR(item.watch.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Provenance Certificate Tag */}
              <div className="p-3 bg-black/40 rounded border border-[#C5A880]/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <div>
                    <span className="text-white font-medium block">Digital Certificate of Authenticity</span>
                    <span className="text-[11px] font-mono text-slate-400">{foundOrder.serialCertificate}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#C5A880] border border-[#C5A880]/40 px-2 py-0.5 rounded">
                  AUTHENTIC
                </span>
              </div>

              {/* Tracking Timeline */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] uppercase text-slate-500 block">Armored Transport Milestones</span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Geneva Atelier Vault Allocation Completed</span>
                  </div>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>Chronometer Accuracy Re-Certification (+0.4s/day)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Truck className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>Armored Courier Transit #{foundOrder.trackingNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : searched ? (
            <div className="p-6 text-center rounded-xl bg-[#121318] border border-white/5 space-y-2">
              <p className="text-xs text-slate-400">No matching order records found for &quot;{lookupId}&quot;.</p>
              <p className="text-[11px] text-slate-500">
                Please verify your Order ID or contact the Luxora Concierge for assistance.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-white/5 rounded text-xs text-slate-400 text-center">
              Sample Order available: <button onClick={() => { setLookupId(orders[0]?.orderId || 'LX-84920'); setFoundOrder(orders[0]); }} className="text-[#C5A880] underline font-mono cursor-pointer">{orders[0]?.orderId || 'LX-84920'}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
