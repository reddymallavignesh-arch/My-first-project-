import React, { useState } from 'react';
import { Watch } from '../types';
import { formatPriceINR } from '../utils/format';
import { X, Check, Lock, ChevronRight, Heart } from 'lucide-react';

interface ProductDetailModalProps {
  watch: Watch | null;
  isWishlisted: boolean;
  onToggleWishlist: (watch: Watch) => void;
  onClose: () => void;
  onAddToCart: (watch: Watch, selectedStrap: string, engraving: string) => void;
  onInstantBuy: (watch: Watch, selectedStrap: string, engraving: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  watch,
  isWishlisted,
  onToggleWishlist,
  onClose,
  onAddToCart,
  onInstantBuy,
}) => {
  if (!watch) return null;

  const [selectedStrapId, setSelectedStrapId] = useState<string>(watch.strapOptions[0]?.id || '');
  const [engravingText, setEngravingText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'specs' | 'craftsmanship' | 'delivery'>('specs');
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);

  const selectedStrap = watch.strapOptions.find((s) => s.id === selectedStrapId) || watch.strapOptions[0];
  const totalPrice = watch.price + (selectedStrap?.priceAdd || 0);

  const handleAdd = () => {
    onAddToCart(watch, selectedStrap?.name || 'Standard Strap', engravingText);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 1800);
  };

  const handleBuy = () => {
    onInstantBuy(watch, selectedStrap?.name || 'Standard Strap', engravingText);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-5xl bg-[#0F1016] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => onToggleWishlist(watch)}
            aria-label="Toggle wishlist"
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isWishlisted
                ? 'bg-[#0B0C10] text-[#C5A880] border-[#C5A880]'
                : 'bg-black/50 text-slate-300 border-white/10 hover:text-white hover:bg-black/80'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A880]' : ''}`} />
          </button>

          <button
            onClick={onClose}
            aria-label="Close product modal"
            className="p-2 text-slate-400 hover:text-white rounded-full bg-black/50 hover:bg-black/80 transition-all border border-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* Left: Gallery & Zoomable Visual */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#161822] to-[#0F1016] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-medium">
                <span>Ref. {watch.reference}</span>
                <span aria-hidden="true">·</span>
                <span>Swiss Manufacture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-white">
                {watch.name}
              </h2>
            </div>

            {/* Main Stage Image */}
            <div className="relative my-6 aspect-square w-full max-w-md mx-auto rounded-xl overflow-hidden bg-[#0A0B0E] border border-white/5 flex items-center justify-center p-4 group">
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
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                High-Resolution Horology Macro
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5 text-center text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase text-slate-400 block tracking-wider">Provenance</span>
                <span className="text-slate-200 font-medium">Vallée de Joux</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase text-slate-400 block tracking-wider">Assurance</span>
                <span className="text-slate-200 font-medium">5-Yr International</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase text-slate-400 block tracking-wider">Transit</span>
                <span className="text-slate-200 font-medium">Armored Courier</span>
              </div>
            </div>
          </div>

          {/* Right: Contiguous Purchase Module & Specification Tabs */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Pricing & Availability Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400">Total Investment (Incl. GST)</span>
                  <div className="text-3xl font-bold font-mono text-[#C5A880] tabular-nums mt-0.5">
                    {formatPriceINR(totalPrice)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    Vault Reserved
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Dispatches in 24h</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {watch.description}
              </p>

              {/* Strap Customizer */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
                  Select Bespoke Strap / Bracelet
                </label>
                <div className="space-y-2">
                  {watch.strapOptions.map((strap) => (
                    <button
                      key={strap.id}
                      onClick={() => setSelectedStrapId(strap.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-xs border text-left transition-all cursor-pointer ${
                        selectedStrapId === strap.id
                          ? 'bg-[#C5A880]/15 border-[#C5A880] text-white font-medium'
                          : 'bg-[#121318] border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="font-medium text-slate-200 block">{strap.name}</span>
                        <span className="text-[11px] text-slate-400">{strap.material}</span>
                      </div>
                      <span className="font-mono text-xs tabular-nums text-[#C5A880]">
                        {strap.priceAdd === 0 ? 'Complimentary' : `+${formatPriceINR(strap.priceAdd)}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Caseback Custom Engraving */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 uppercase tracking-wider font-medium">
                    Complimentary Caseback Engraving
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Max 20 chars</span>
                </div>
                <input
                  type="text"
                  maxLength={20}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="e.g. V.R. · 17.10.2026"
                  className="w-full bg-[#121318] border border-white/10 rounded px-3.5 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              {/* Specs & Horology Accordion */}
              <div className="border border-white/10 rounded-lg p-3 bg-[#121318] text-xs">
                <div className="flex items-center gap-4 border-b border-white/5 pb-2 mb-3">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`font-medium tracking-wide uppercase text-[11px] pb-1 cursor-pointer ${
                      activeTab === 'specs' ? 'text-[#C5A880] border-b border-[#C5A880]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Technical Movement
                  </button>
                  <button
                    onClick={() => setActiveTab('craftsmanship')}
                    className={`font-medium tracking-wide uppercase text-[11px] pb-1 cursor-pointer ${
                      activeTab === 'craftsmanship' ? 'text-[#C5A880] border-b border-[#C5A880]' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Case &amp; Crystal
                  </button>
                </div>

                {activeTab === 'specs' ? (
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Calibre</span>
                      <span className="text-slate-200 font-mono font-medium">{watch.movement}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Power Reserve</span>
                      <span className="text-slate-200 font-medium">{watch.powerReserve}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Frequency</span>
                      <span className="text-slate-200 font-mono">{watch.frequency}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Jewel Bearings</span>
                      <span className="text-slate-200 font-mono">{watch.jewels} Synthetic Rubies</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Case Diameter</span>
                      <span className="text-slate-200 font-mono font-medium">{watch.caseSize}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Water Resistance</span>
                      <span className="text-slate-200 font-medium">{watch.waterResistance}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Crystal</span>
                      <span className="text-slate-200">Domed Anti-Reflective Sapphire</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Dial Finish</span>
                      <span className="text-slate-200">{watch.dial}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className={`py-3 px-4 rounded text-xs uppercase tracking-[0.12em] font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isAddedFeedback
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                >
                  {isAddedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Bag
                    </>
                  ) : (
                    'Add to Bag'
                  )}
                </button>

                <button
                  onClick={handleBuy}
                  className="py-3 px-4 rounded bg-[#C5A880] hover:bg-[#d8b88d] text-[#0B0C10] font-semibold text-xs uppercase tracking-[0.12em] transition-all shadow-lg shadow-[#C5A880]/20 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Acquire Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>256-bit Encrypted Checkout · Complimentary Armored Delivery</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
