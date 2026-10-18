export interface Watch {
  id: string;
  name: string;
  subtitle: string;
  collection: 'Tourbillon' | 'Chronograph' | 'Celestial' | 'Dress' | 'Grand Complication';
  price: number;
  image: string;
  reference: string;
  caseSize: string;
  caseMaterial: string;
  dial: string;
  movement: string;
  powerReserve: string;
  waterResistance: string;
  jewels: number;
  frequency: string;
  description: string;
  features: string[];
  strapOptions: { id: string; name: string; material: string; priceAdd: number }[];
  inStock: boolean;
  editionLimit?: string;
  weightGrams: number;
}

export interface CartItem {
  id: string; // unique item instance id
  watch: Watch;
  quantity: number;
  selectedStrap: string;
  engraving?: string;
}

export interface Order {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  insurance: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  deliveryMethod: 'armored_courier' | 'vault_pickup';
  pickupBoutique?: string;
  paymentMethod: 'card' | 'apple_pay' | 'wire' | 'crypto';
  paymentStatus: 'paid' | 'escrow_secured';
  trackingNumber: string;
  status: 'verified' | 'vault_prep' | 'armored_transit' | 'delivered';
  serialCertificate: string;
}
