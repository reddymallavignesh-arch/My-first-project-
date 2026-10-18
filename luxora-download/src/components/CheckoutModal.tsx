import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { BOUTIQUES } from '../data/watches';
import { formatPriceINR } from '../utils/format';
import { 
  X, ShieldCheck, Lock, CreditCard, CheckCircle2, 
  Truck, Building2, Printer, ArrowRight,
  Sparkles, Smartphone, Landmark, Coins, QrCode
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [deliveryMethod, setDeliveryMethod] = useState<'armored_courier' | 'vault_pickup'>('armored_courier');
  const [selectedBoutique, setSelectedBoutique] = useState<string>(BOUTIQUES[0].city);

  // Client Details Form State
  const [customer, setCustomer] = useState({
    fullName: 'Raghavan Singhania',
    email: 'raghavan.singhania@luxora-collector.in',
    phone: '+91 98200 48921',
    address: 'Bungalow 14, Altamount Road, Cumballa Hill',
    city: 'Mumbai',
    postalCode: '400026',
    country: 'India',
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wire' | 'crypto'>('upi');
  const [upiId, setUpiId] = useState('singhania@hdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState('RAGHAVAN SINGHANIA');
  const [cardExpiry, setCardExpiry] = useState('11/29');
  const [cardCvv, setCardCvv] = useState('884');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Calculations in INR
  const subtotal = items.reduce((acc, item) => {
    const strapAdd = item.watch.strapOptions.find((s) => s.name === item.selectedStrap)?.priceAdd || 0;
    return acc + (item.watch.price + strapAdd) * item.quantity;
  }, 0);
  const tax = Math.round(subtotal * 0.05); // 5% Luxury GST
  const total = subtotal + tax;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `LX-${Math.floor(10000 + Math.random() * 90000)}`;
      const certHash = `IN-MUM-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingNumber = `ARM-IND-${Math.random().toString(36).substring(2, 6).toUpperCase()}-991`;

      const newOrder: Order = {
        orderId: orderNumber,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
        items: [...items],
        subtotal,
        tax,
        shipping: 0,
        insurance: 0,
        total,
        customer: { ...customer },
        deliveryMethod,
        pickupBoutique: deliveryMethod === 'vault_pickup' ? selectedBoutique : undefined,
        paymentMethod: paymentMethod === 'upi' ? 'apple_pay' : paymentMethod,
        paymentStatus: paymentMethod === 'wire' ? 'escrow_secured' : 'paid',
        trackingNumber,
        status: 'verified',
        serialCertificate: certHash,
      };

      setCompletedOrder(newOrder);
      onOrderComplete(newOrder);
      setIsProcessing(false);
      setStep(3);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8">
      <div 
        className="relative w-full max-w-4xl bg-[#0F1016] border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#121318]">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#C5A880]" />
            <div>
              <h2 className="text-base font-bold font-cinzel text-white tracking-wider">
                SECURE LUXURY CHECKOUT
              </h2>
              <p className="text-[11px] text-slate-400">
                256-Bit Encrypted Payment Gateway · Reserve Bank of India &amp; Swiss Escrow Compliant
              </p>
            </div>
          </div>

          {step !== 3 && (
            <button
              onClick={onClose}
              aria-label="Close checkout"
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Progress Bar */}
        <div className="px-6 py-3 bg-[#0B0C10] border-b border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? 'bg-[#C5A880] text-black' : 'bg-white/10 text-slate-400'}`}>
              1
            </span>
            <span className={step === 1 ? 'text-white font-medium' : 'text-slate-400'}>
              Client &amp; Transit
            </span>
          </div>
          <div className="w-12 h-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? 'bg-[#C5A880] text-black' : 'bg-white/10 text-slate-400'}`}>
              2
            </span>
            <span className={step === 2 ? 'text-white font-medium' : 'text-slate-400'}>
              Payment Gateway
            </span>
          </div>
          <div className="w-12 h-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 3 ? 'bg-emerald-500 text-black' : 'bg-white/10 text-slate-400'}`}>
              3
            </span>
            <span className={step === 3 ? 'text-white font-medium' : 'text-slate-400'}>
              Provenance &amp; Receipt
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: Client & Delivery Logistics */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form on left */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#C5A880]">
                    01. Delivery &amp; Client Registry
                  </h3>
                  <p className="text-xs text-slate-400">
                    Provide the destination for your armored transport and customs clearance.
                  </p>
                </div>

                {/* Delivery Method Choice */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300 uppercase tracking-wider block">
                    Fulfillment Preference
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('armored_courier')}
                      className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                        deliveryMethod === 'armored_courier'
                          ? 'bg-[#C5A880]/15 border-[#C5A880] text-white'
                          : 'bg-[#121318] border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#C5A880]" />
                        <span className="text-xs font-semibold text-slate-200">Armored Express</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        White-glove armored courier to your residence with ID verification.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('vault_pickup')}
                      className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                        deliveryMethod === 'vault_pickup'
                          ? 'bg-[#C5A880]/15 border-[#C5A880] text-white'
                          : 'bg-[#121318] border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#C5A880]" />
                        <span className="text-xs font-semibold text-slate-200">Private Salon Vault</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Private viewing &amp; sizing at our Mumbai, Delhi, or Geneva salon.
                      </p>
                    </button>
                  </div>
                </div>

                {deliveryMethod === 'vault_pickup' && (
                  <div className="space-y-2 p-3 bg-black/40 rounded border border-white/10">
                    <label className="text-xs text-slate-300 font-medium block">Select Private Salon</label>
                    <select
                      value={selectedBoutique}
                      onChange={(e) => setSelectedBoutique(e.target.value)}
                      className="w-full bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A880]"
                    >
                      {BOUTIQUES.map((b) => (
                        <option key={b.city} value={b.city}>
                          {b.city} — {b.address}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Client Info Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs text-slate-400 block">Full Name (Legal ID / Passport)</label>
                    <input
                      type="text"
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      className="w-full bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A880]"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 block">Client Email (For Digital Certificate)</label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A880]"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 block">Contact Phone</label>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A880]"
                      required
                    />
                  </div>

                  {deliveryMethod === 'armored_courier' && (
                    <>
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs text-slate-400 block">Delivery Street Address</label>
                        <input
                          type="text"
                          value={customer.address}
                          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                          className="w-full bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A880]"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-slate-400 block">City</label>
                        <input
                          type="text"
                          value={customer.city}
                          onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                          className="w-full bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-slate-400 block">PIN Code / Country</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={customer.postalCode}
                            onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                            className="bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A880]"
                          />
                          <input
                            type="text"
                            value={customer.country}
                            onChange={(e) => setCustomer({ ...customer, country: e.target.value })}
                            className="bg-[#121318] border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 bg-[#C5A880] hover:bg-[#d8b88d] text-[#0B0C10] font-semibold text-xs uppercase tracking-[0.15em] rounded transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <span>Continue to Payment Gateway</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Order summary on right */}
              <div className="lg:col-span-5 bg-[#121318] rounded-xl p-5 border border-white/10 h-fit space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 border-b border-white/10 pb-2">
                  Acquisition Summary ({items.length})
                </h4>

                <div className="space-y-3 max-h-56 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 text-xs items-center">
                      <img
                        src={item.watch.image}
                        alt={item.watch.name}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('/images/')) {
                            target.src = `/images/hero_luxury_watch.jpg`;
                          }
                        }}
                        className="w-12 h-12 object-cover rounded bg-black/40 border border-white/5 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-white truncate">{item.watch.name}</p>
                        <p className="text-[11px] text-slate-400">Qty: {item.quantity} · {item.selectedStrap}</p>
                      </div>
                      <span className="font-mono text-xs tabular-nums text-[#C5A880]">
                        {formatPriceINR(item.watch.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-slate-200 tabular-nums">{formatPriceINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Armored Transit &amp; Insurance</span>
                    <span className="text-emerald-400 font-medium">Complimentary (₹0)</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Applicable GST &amp; Customs (5%)</span>
                    <span className="font-mono text-slate-200 tabular-nums">{formatPriceINR(tax)}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white text-sm">
                    <span>Total Investment</span>
                    <span className="font-mono text-[#C5A880] text-base tabular-nums">
                      {formatPriceINR(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Secure Payment Gateway */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[#C5A880]">
                      02. Select Payment Protocol
                    </h3>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Back to Delivery
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    Indian UPI, RuPay / Black Cards, RTGS Escrow, or Web3 Crypto.
                  </p>
                </div>

                {/* Gateway Tab Selectors */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'bg-[#C5A880]/15 border-[#C5A880] text-white'
                        : 'bg-[#121318] border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mx-auto mb-1 text-[#C5A880]" />
                    <span className="text-[10px] font-semibold block uppercase">UPI Instant</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#C5A880]/15 border-[#C5A880] text-white'
                        : 'bg-[#121318] border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#C5A880]" />
                    <span className="text-[10px] font-semibold block uppercase">RuPay / Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wire')}
                    className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                      paymentMethod === 'wire'
                        ? 'bg-[#C5A880]/15 border-[#C5A880] text-white'
                        : 'bg-[#121318] border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <Landmark className="w-4 h-4 mx-auto mb-1 text-[#C5A880]" />
                    <span className="text-[10px] font-semibold block uppercase">RTGS Wire</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('crypto')}
                    className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                      paymentMethod === 'crypto'
                        ? 'bg-[#C5A880]/15 border-[#C5A880] text-white'
                        : 'bg-[#121318] border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <Coins className="w-4 h-4 mx-auto mb-1 text-[#C5A880]" />
                    <span className="text-[10px] font-semibold block uppercase">Crypto</span>
                  </button>
                </div>

                {/* Sub-form based on selected gateway */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 p-5 rounded-xl bg-[#121318] border border-white/10 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="text-white font-medium">UPI / Google Pay / PhonePe / BHIM</span>
                      <span className="text-[#C5A880] font-mono">Zero Merchant Surcharge</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase text-slate-400 block tracking-wider">
                        Virtual Payment Address (VPA / UPI ID)
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okaxis or yourname@hdfcbank"
                        className="w-full bg-[#0A0B0E] border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    <p className="text-[11px] text-slate-400">
                      A payment authorization request for <strong className="text-white font-mono">{formatPriceINR(total)}</strong> will be sent to your UPI app with bank-grade 2FA approval.
                    </p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-5 rounded-xl bg-[#121318] border border-white/10">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>RuPay, Visa, Mastercard, American Express</span>
                      <span className="font-mono text-[#C5A880]">PCI-DSS Level 1</span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase text-slate-400 block tracking-wider">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4000 1234 5678 9010"
                          className="w-full bg-[#0A0B0E] border border-white/10 rounded pl-10 pr-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] uppercase text-slate-400 block tracking-wider">
                          Expiry Date (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          className="w-full bg-[#0A0B0E] border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] uppercase text-slate-400 block tracking-wider">
                          Security CVV
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full bg-[#0A0B0E] border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] uppercase text-slate-400 block tracking-wider">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        placeholder="NAME AS PRINTED ON CARD"
                        className="w-full bg-[#0A0B0E] border border-white/10 rounded px-3 py-2 text-xs uppercase text-white focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'wire' && (
                  <div className="p-5 rounded-xl bg-[#121318] border border-white/10 space-y-3 text-xs">
                    <div className="flex items-center gap-2 text-[#C5A880] font-semibold">
                      <Landmark className="w-4 h-4" />
                      <span>HDFC Bank / Credit Suisse Escrow Treasury</span>
                    </div>
                    <div className="space-y-1 font-mono text-[11px] text-slate-300 bg-black/40 p-3 rounded border border-white/5">
                      <p>Beneficiary: LUXORA INDIA LUXURY PRIVATE LIMITED</p>
                      <p>Account: 5020 0081 9283 11</p>
                      <p>IFSC: HDFC0000060 (Fort Mumbai Branch)</p>
                      <p>Reference: {customer.fullName.toUpperCase()} - TIMEPIECE ESCROW</p>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Your selected timepieces will be locked in the Mumbai/Geneva vault for 48 hours awaiting RTGS receipt.
                    </p>
                  </div>
                )}

                {paymentMethod === 'crypto' && (
                  <div className="p-5 rounded-xl bg-[#121318] border border-white/10 space-y-3 text-xs">
                    <div className="flex items-center gap-2 text-[#C5A880] font-semibold">
                      <Coins className="w-4 h-4" />
                      <span>Web3 Luxury Escrow (BTC / ETH / USDC)</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Instant settlement powered by multi-sig smart escrow contract. The funds remain in trust until your armored delivery is scanned.
                    </p>
                    <div className="p-2.5 bg-black/40 rounded font-mono text-[10px] text-slate-400 break-all border border-white/5">
                      0x71C...B49e (Luxora Multisig Vault 01)
                    </div>
                  </div>
                )}

                {/* Authorize Button */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleProcessPayment}
                  className="w-full py-4 bg-[#C5A880] hover:bg-[#d8b88d] disabled:bg-slate-700 text-[#0B0C10] font-bold text-xs uppercase tracking-[0.15em] rounded transition-all shadow-xl shadow-[#C5A880]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2 text-white">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing with Secure Gateway...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Authorize Payment of {formatPriceINR(total)}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    256-Bit SSL
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Lloyd&apos;s Insured In-Transit</span>
                  <span aria-hidden="true">·</span>
                  <span>RBI Compliant Gateway</span>
                </div>
              </div>

              {/* Order summary on right */}
              <div className="lg:col-span-5 bg-[#121318] rounded-xl p-5 border border-white/10 h-fit space-y-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 border-b border-white/10 pb-2">
                  Client &amp; Transit Details
                </h4>

                <div className="text-xs space-y-2 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Client</span>
                    <span className="font-medium text-white">{customer.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Destination</span>
                    <span className="text-slate-300">
                      {deliveryMethod === 'vault_pickup' ? `Boutique Vault: ${selectedBoutique}` : `${customer.address}, ${customer.city}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Email Receipt</span>
                    <span className="text-slate-300 font-mono text-[11px]">{customer.email}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-mono text-slate-200 tabular-nums">{formatPriceINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Applicable GST (5%)</span>
                    <span className="font-mono text-slate-200 tabular-nums">{formatPriceINR(tax)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Armored Delivery &amp; Insurance</span>
                    <span className="text-emerald-400 font-medium">Included (₹0)</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white text-sm">
                    <span>Total Investment</span>
                    <span className="font-mono text-[#C5A880] text-base tabular-nums">
                      {formatPriceINR(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Order Confirmation & Cryptographic Certificate */}
          {step === 3 && completedOrder && (
            <div className="max-w-2xl mx-auto space-y-8 py-2">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-cinzel text-white">
                  ACQUISITION CONFIRMED
                </h3>
                <p className="text-xs text-slate-400">
                  Your luxury timepiece has been formally allocated in our vault.
                </p>
                <div className="inline-block mt-2 px-4 py-1.5 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/40 font-mono text-xs text-[#C5A880]">
                  Order Number: {completedOrder.orderId}
                </div>
              </div>

              {/* Digital Certificate Box */}
              <div className="p-6 rounded-xl bg-gradient-to-b from-[#161822] to-[#101117] border border-[#C5A880]/40 shadow-xl space-y-4 relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A880]" />
                    <span className="text-xs font-cinzel uppercase tracking-widest text-white font-bold">
                      Digital Certificate of Authenticity
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Verified On-Chain</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Certificate Ref</span>
                    <span className="font-mono text-slate-200">{completedOrder.serialCertificate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Owner Registered</span>
                    <span className="text-slate-200 font-medium">{completedOrder.customer.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Tracking Protocol</span>
                    <span className="font-mono text-[#C5A880]">{completedOrder.trackingNumber}</span>
                  </div>
                </div>

                {/* Items included in this certificate */}
                <div className="pt-2 border-t border-white/5 space-y-2">
                  <span className="text-[10px] uppercase text-slate-500 block">Acquired Timepieces</span>
                  {completedOrder.items.map((it) => (
                    <div key={it.id} className="flex justify-between items-center text-xs">
                      <span className="text-white font-medium">{it.watch.name} ({it.watch.reference})</span>
                      <span className="text-slate-400 font-mono">{it.selectedStrap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Order Timeline Simulator */}
              <div className="p-5 rounded-xl bg-[#121318] border border-white/10 space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Atelier Fulfillment Milestones
                </h4>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    <div className="flex-1 flex justify-between">
                      <span className="text-slate-200 font-medium">Escrow Secured &amp; Order Authenticated</span>
                      <span className="text-slate-500 text-[11px]">Completed</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C5A880] animate-pulse shrink-0" />
                    <div className="flex-1 flex justify-between">
                      <span className="text-white font-medium">Master Watchmaker Inspection &amp; Chronometer Calibration</span>
                      <span className="text-[#C5A880] text-[11px]">In Progress</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 opacity-60">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-600 shrink-0" />
                    <div className="flex-1 flex justify-between">
                      <span className="text-slate-400">Armored Courier Dispatch &amp; Transit</span>
                      <span className="text-slate-500 text-[11px]">Estimated 24h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-1/2 py-3 px-4 rounded bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#C5A880]" />
                  <span>Print Receipt &amp; Certificate</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-1/2 py-3 px-4 rounded bg-[#C5A880] hover:bg-[#d8b88d] text-[#0B0C10] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Return to Luxora Gallery</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
