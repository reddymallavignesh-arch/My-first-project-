import React, { useState, useEffect, useMemo } from 'react';
import { Watch, CartItem, Order } from './types';
import { WATCHES_DATA } from './data/watches';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGallery } from './components/ProductGallery';
import { ShowcaseGallery } from './components/ShowcaseGallery';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { BoutiquesSection } from './components/BoutiquesSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { ConciergeModal } from './components/ConciergeModal';
import { Check } from 'lucide-react';

const INITIAL_DEMO_ORDER: Order = {
  orderId: 'LX-84920',
  date: 'Oct 15, 2026',
  items: [
    {
      id: 'demo-1',
      watch: WATCHES_DATA[0],
      quantity: 1,
      selectedStrap: 'Hand-Stitched Alligator (Cognac)',
      engraving: 'R.S. · 2026',
    },
  ],
  subtotal: 3550000,
  tax: 177500,
  shipping: 0,
  insurance: 0,
  total: 3727500,
  customer: {
    fullName: 'Raghavan Singhania',
    email: 'raghavan.singhania@luxora-collector.in',
    phone: '+91 98200 48921',
    address: 'Bungalow 14, Altamount Road, Cumballa Hill',
    city: 'Mumbai',
    postalCode: '400026',
    country: 'India',
  },
  deliveryMethod: 'armored_courier',
  paymentMethod: 'card',
  paymentStatus: 'paid',
  trackingNumber: 'ARM-IND-8849-MH',
  status: 'verified',
  serialCertificate: 'IN-MUM-8849-AUTH',
};

export default function App() {
  const [watches] = useState<Watch[]>(WATCHES_DATA);
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderLookupOpen, setIsOrderLookupOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('luxora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState<Watch[]>(() => {
    try {
      const saved = localStorage.getItem('luxora_wishlist');
      if (saved) {
        const parsedIds: string[] = JSON.parse(saved);
        return WATCHES_DATA.filter((w) => parsedIds.includes(w.id));
      }
      // Pre-populate with 1 piece so user sees feature immediately
      return [WATCHES_DATA[1]];
    } catch {
      return [WATCHES_DATA[1]];
    }
  });

  // Orders state with localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('luxora_orders');
      return saved ? JSON.parse(saved) : [INITIAL_DEMO_ORDER];
    } catch {
      return [INITIAL_DEMO_ORDER];
    }
  });

  const wishlistIds = useMemo(() => new Set(wishlist.map((w) => w.id)), [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('luxora_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      const ids = wishlist.map((w) => w.id);
      localStorage.setItem('luxora_wishlist', JSON.stringify(ids));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('luxora_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleWishlist = (watch: Watch) => {
    if (wishlistIds.has(watch.id)) {
      setWishlist((prev) => prev.filter((w) => w.id !== watch.id));
      showToast(`${watch.name} removed from your wishlist`);
    } else {
      setWishlist((prev) => [...prev, watch]);
      showToast(`${watch.name} saved to your wishlist`);
    }
  };

  const handleRemoveFromWishlist = (watchId: string) => {
    setWishlist((prev) => prev.filter((w) => w.id !== watchId));
  };

  const handleClearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared');
  };

  const handleAddToCart = (
    watch: Watch,
    selectedStrap?: string,
    engraving?: string
  ) => {
    const strapName = selectedStrap || watch.strapOptions[0]?.name || 'Standard Strap';
    const existingIndex = cartItems.findIndex(
      (item) => item.watch.id === watch.id && item.selectedStrap === strapName && item.engraving === (engraving || '')
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `${watch.id}-${Date.now()}`,
        watch,
        quantity: 1,
        selectedStrap: strapName,
        engraving: engraving || undefined,
      };
      setCartItems([...cartItems, newItem]);
    }

    showToast(`${watch.name} added to your shopping bag`);
  };

  const handleInstantBuy = (
    watch: Watch,
    selectedStrap?: string,
    engraving?: string
  ) => {
    handleAddToCart(watch, selectedStrap, engraving);
    setSelectedWatch(null);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsWishlistOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
  };

  const cartTotalCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#E0E2EC] flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#161822] border border-[#C5A880]/60 rounded-xl shadow-2xl text-xs text-white backdrop-blur-md animate-fadeIn">
          <Check className="w-4 h-4 text-[#C5A880]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          featuredWatch={watches[0]}
          isWishlisted={wishlistIds.has(watches[0].id)}
          onToggleWishlist={handleToggleWishlist}
          onSelectWatch={(watch) => setSelectedWatch(watch)}
          onInstantBuy={(watch) => handleInstantBuy(watch)}
        />

        {/* Product Catalog Grid */}
        <ProductGallery
          watches={watches}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectWatch={(watch) => setSelectedWatch(watch)}
          onAddToCart={(watch) => handleAddToCart(watch)}
        />

        {/* Interactive Masterpiece Showcase */}
        <ShowcaseGallery
          watches={watches}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectWatch={(watch) => setSelectedWatch(watch)}
          onAddToCart={(watch) => handleAddToCart(watch)}
        />

        {/* Craftsmanship Section */}
        <CraftsmanshipSection />

        {/* Global Salons & Vaults */}
        <BoutiquesSection onOpenConcierge={() => setIsConciergeOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenOrderLookup={() => setIsOrderLookupOpen(true)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* Interactive Modals & Drawers */}
      <ProductDetailModal
        watch={selectedWatch}
        isWishlisted={selectedWatch ? wishlistIds.has(selectedWatch.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onClose={() => setSelectedWatch(null)}
        onAddToCart={(watch, strap, eng) => handleAddToCart(watch, strap, eng)}
        onInstantBuy={(watch, strap, eng) => handleInstantBuy(watch, strap, eng)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(watch) => handleAddToCart(watch)}
        onSelectWatch={(watch) => setSelectedWatch(watch)}
        onClearWishlist={handleClearWishlist}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderComplete={handleOrderComplete}
      />

      <OrderLookupModal
        isOpen={isOrderLookupOpen}
        onClose={() => setIsOrderLookupOpen(false)}
        orders={orders}
      />

      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
    </div>
  );
}
