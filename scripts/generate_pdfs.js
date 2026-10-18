import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import zipfile from 'node:zlib';
import { execSync } from 'child_process';

const outputDir = path.resolve(process.cwd(), 'luxora-pdf-folder');
const publicDir = path.resolve(process.cwd(), 'public');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('Generating Luxury Watch Catalog PDF...');

// ==========================================
// 1. WATCH CATALOG PDF
// ==========================================
const catalogDoc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
});

// Page 1: Cover
catalogDoc.setFillColor(11, 12, 16); // #0B0C10
catalogDoc.rect(0, 0, 210, 297, 'F');

// Gold border
catalogDoc.setDrawColor(197, 168, 128); // #C5A880
catalogDoc.setLineWidth(0.8);
catalogDoc.rect(12, 12, 186, 273);

catalogDoc.setTextColor(197, 168, 128);
catalogDoc.setFont('helvetica', 'normal');
catalogDoc.setFontSize(10);
catalogDoc.text('VALLÉE DE JOUX  ·  LE BRASSUS, SWITZERLAND', 105, 55, { align: 'center' });

catalogDoc.setFont('times', 'bold');
catalogDoc.setFontSize(38);
catalogDoc.setTextColor(255, 255, 255);
catalogDoc.text('LUXORA', 105, 85, { align: 'center' });

catalogDoc.setFont('helvetica', 'normal');
catalogDoc.setFontSize(14);
catalogDoc.setTextColor(197, 168, 128);
catalogDoc.text('HAUTE HORLOGERIE', 105, 100, { align: 'center' });

catalogDoc.setFont('helvetica', 'normal');
catalogDoc.setFontSize(11);
catalogDoc.setTextColor(200, 200, 210);
catalogDoc.text('Official Atelier Collection & Chronometric Compendium', 105, 118, { align: 'center' });
catalogDoc.text('Year 2026 Edition · India & International Salons', 105, 126, { align: 'center' });

catalogDoc.setDrawColor(197, 168, 128);
catalogDoc.setLineWidth(0.4);
catalogDoc.line(60, 140, 150, 140);

catalogDoc.setFont('helvetica', 'italic');
catalogDoc.setFontSize(10);
catalogDoc.setTextColor(160, 165, 180);
catalogDoc.text('"In an era of fleeting electronics, mechanical complications celebrate permanence."', 105, 155, { align: 'center' });

catalogDoc.setFont('helvetica', 'normal');
catalogDoc.setFontSize(9);
catalogDoc.setTextColor(180, 180, 190);
catalogDoc.text('Mumbai Salon · New Delhi Flagship · Bengaluru Atelier · Geneva Salon', 105, 260, { align: 'center' });

// Page 2: Catalog Index & Models
catalogDoc.addPage();
catalogDoc.setFillColor(15, 16, 22);
catalogDoc.rect(0, 0, 210, 297, 'F');
catalogDoc.setDrawColor(197, 168, 128);
catalogDoc.setLineWidth(0.4);
catalogDoc.rect(10, 10, 190, 277);

catalogDoc.setFont('times', 'bold');
catalogDoc.setFontSize(22);
catalogDoc.setTextColor(197, 168, 128);
catalogDoc.text('CURATED TIMEPIECES', 20, 26);

catalogDoc.setFont('helvetica', 'normal');
catalogDoc.setFontSize(9);
catalogDoc.setTextColor(160, 165, 180);
catalogDoc.text('Prices indicated in Indian Rupees (INR) · Fully inclusive of luxury GST & armored transit insurance', 20, 32);

const watchesList = [
  {
    name: 'Luxora Tourbillon Squelette',
    ref: 'LX-8801-RG',
    movement: 'Manufacture Calibre LX-3129 Manual Wind (21,600 vph)',
    case: '18K 4N Solid Rose Gold · 41.5 mm',
    features: 'Flying 60s Tourbillon · 72h Twin-Barrel Reserve · Openwork Sapphire Dial',
    price: 'INR 35,50,000'
  },
  {
    name: 'Luxora Royal Emerald Chronograph',
    ref: 'LX-8820-EM',
    movement: 'Manufacture Calibre LX-882 Auto-Chronograph (28,800 vph)',
    case: '18K Satin-Brushed Rose Gold · 42.0 mm',
    features: 'British Racing Green Sunburst Dial · Column-Wheel · 65h Reserve',
    price: 'INR 24,80,000'
  },
  {
    name: 'Luxora Oceanus Professional Diver 300M',
    ref: 'LX-300-OC',
    movement: 'Calibre LX-300 Master Chronometer Automatic',
    case: '904L Corrosion-Resistant Oystersteel · 42.5 mm',
    features: 'Ceramic Dive Bezel · Helium Escape Valve · 300m Water Resistance',
    price: 'INR 9,80,000'
  },
  {
    name: 'Luxora Forged Carbon Perpetual',
    ref: 'LX-9400-FC',
    movement: 'Manufacture Calibre LX-940 Perpetual Calendar (28,800 vph)',
    case: 'Aerospace Forged Carbon & 18K Yellow Gold · 43.5 mm',
    features: 'Astronomical Moonphase · Day/Date/Month/Leap Year · 84h Reserve',
    price: 'INR 48,00,000'
  },
  {
    name: 'Luxora Aeon Dark Chronograph',
    ref: 'LX-7750-TI',
    movement: 'Calibre LX-770 Auto-Chronograph (28,800 vph)',
    case: 'Grade 5 Black DLC Brushed Titanium · 42.0 mm',
    features: 'Obsidian Dial · Rose Bronze Accents · Integrated Titanium Bracelet',
    price: 'INR 15,80,000'
  },
  {
    name: 'Luxora Celestia Aventurine Moonphase',
    ref: 'LX-9904-PL',
    movement: 'Calibre LX-920 Perpetual Astronomical Movement',
    case: '950 Solid Platinum · 40.0 mm',
    features: 'Natural Blue Aventurine Glass · 122-Year Astronomical Moonphase',
    price: 'INR 29,20,000'
  },
  {
    name: 'Luxora Aurora Ultra-Plat',
    ref: 'LX-4100-GL',
    movement: 'Calibre LX-1200 Micro-Rotor Automatic (3.2mm calibre)',
    case: '18K 3N Solid Yellow Gold · 39.0 mm',
    features: 'Ultra-slim 6.8 mm profile · 21K Gold Micro-Rotor · Champagne Opaline Dial',
    price: 'INR 12,90,000'
  },
  {
    name: 'Luxora Calibre 3129 Openwork Grand Complication',
    ref: 'LX-3129-SK',
    movement: 'Manufacture Calibre LX-3129 Haute Horlogerie (35 Rubies)',
    case: '18K White Gold & German Silver · 43.0 mm',
    features: '180 Hand-Chamfered Interior Angles · Geneva Seal Standard · Bespoke Order',
    price: 'INR 43,50,000'
  },
  {
    name: 'Luxora Vanguard Monopusher Chronograph',
    ref: 'LX-5520-TI',
    movement: 'Calibre LX-Monopusher Manual Wind (28,800 vph)',
    case: 'Titanium & Satin Rose Gold Bezel · 41.0 mm',
    features: 'Single Crown Coaxial Pusher · Lateral Clutch · Horween Shell Cordovan',
    price: 'INR 20,60,000'
  }
];

let yPos = 44;
watchesList.forEach((w, idx) => {
  catalogDoc.setFillColor(22, 24, 34);
  catalogDoc.roundedRect(18, yPos, 174, 23, 2, 2, 'F');

  catalogDoc.setFont('helvetica', 'bold');
  catalogDoc.setFontSize(10);
  catalogDoc.setTextColor(255, 255, 255);
  catalogDoc.text(`${idx + 1}. ${w.name}`, 22, yPos + 6);

  catalogDoc.setFont('helvetica', 'normal');
  catalogDoc.setFontSize(8);
  catalogDoc.setTextColor(197, 168, 128);
  catalogDoc.text(`Ref: ${w.ref}  ·  ${w.case}`, 22, yPos + 11);

  catalogDoc.setTextColor(160, 165, 180);
  catalogDoc.text(`${w.features}`, 22, yPos + 16);

  catalogDoc.setFont('courier', 'bold');
  catalogDoc.setFontSize(10);
  catalogDoc.setTextColor(197, 168, 128);
  catalogDoc.text(w.price, 188, yPos + 8, { align: 'right' });

  yPos += 26;
});

// Page 3: Craftsmanship & Salons
catalogDoc.addPage();
catalogDoc.setFillColor(15, 16, 22);
catalogDoc.rect(0, 0, 210, 297, 'F');
catalogDoc.setDrawColor(197, 168, 128);
catalogDoc.setLineWidth(0.4);
catalogDoc.rect(10, 10, 190, 277);

catalogDoc.setFont('times', 'bold');
catalogDoc.setFontSize(22);
catalogDoc.setTextColor(197, 168, 128);
catalogDoc.text('SWISS HOROLOGICAL TRADITION', 20, 28);

catalogDoc.setFont('helvetica', 'normal');
catalogDoc.setFontSize(9.5);
catalogDoc.setTextColor(200, 200, 210);
const craftText = [
  '1. CÔTES DE GENÈVE & PERLAGE:',
  '   Each bridge undergoes circular graining with diamond paste and boxwood rods, yielding distinctive refractive waves.',
  '',
  '2. HAND-CHAMFERED ANGLAGE:',
  '   Internal and external edges are manually cut to an exact 45-degree angle, mirror-polished with gentian wood pegs.',
  '',
  '3. THERMAL FLAME-BLUED SCREWS:',
  '   Tempered over charcoal to exactly 290°C (554°F), creating a protective royal blue oxide patina.',
  '',
  '4. FREE-SPRUNG VARIABLE INERTIA BALANCE:',
  '   Eliminates traditional regulator pins for supreme isochronism and resistance against physical shocks.',
  '',
  '5. 5-YEAR INTERNATIONAL CHRONOMETER WARRANTY:',
  '   Every timepiece is regulated to COSC/Geneva standards and escorted via armored courier with Lloyd\'s insurance.'
];
let craftY = 40;
craftText.forEach((line) => {
  if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.')) {
    catalogDoc.setFont('helvetica', 'bold');
    catalogDoc.setTextColor(197, 168, 128);
  } else {
    catalogDoc.setFont('helvetica', 'normal');
    catalogDoc.setTextColor(180, 185, 200);
  }
  catalogDoc.text(line, 22, craftY);
  craftY += 6.5;
});

catalogDoc.setFont('times', 'bold');
catalogDoc.setFontSize(16);
catalogDoc.setTextColor(197, 168, 128);
catalogDoc.text('WORLDWIDE PRIVATE SALONS', 20, 140);

const boutiques = [
  { city: 'Mumbai Salon', addr: 'The Taj Mahal Palace, Apollo Bunder, Colaba, Mumbai 400001', hours: 'Mon - Sun, 10:30 - 20:00 IST' },
  { city: 'New Delhi Flagship', addr: 'The Chanakya, Chanakyapuri, New Delhi 110021', hours: 'Mon - Sun, 11:00 - 20:30 IST' },
  { city: 'Bengaluru Atelier', addr: 'UB City, Vittal Mallya Road, Bengaluru 560001', hours: 'Mon - Sun, 10:30 - 20:00 IST' },
  { city: 'Geneva Atelier & Vault', addr: 'Rue du Rhône 42, 1204 Genève, Switzerland', hours: 'Mon - Sat, 10:00 - 18:30 CET' }
];

let bY = 152;
boutiques.forEach((b) => {
  catalogDoc.setFillColor(22, 24, 34);
  catalogDoc.roundedRect(18, bY, 174, 18, 2, 2, 'F');
  catalogDoc.setFont('helvetica', 'bold');
  catalogDoc.setFontSize(10);
  catalogDoc.setTextColor(255, 255, 255);
  catalogDoc.text(b.city, 22, bY + 6);
  catalogDoc.setFont('helvetica', 'normal');
  catalogDoc.setFontSize(8);
  catalogDoc.setTextColor(170, 175, 190);
  catalogDoc.text(b.addr, 22, bY + 11);
  catalogDoc.setTextColor(197, 168, 128);
  catalogDoc.text(b.hours, 22, bY + 15.5);
  bY += 22;
});

const catalogPdfPath = path.join(outputDir, 'Luxora_Watch_Catalog_2026.pdf');
fs.writeFileSync(catalogPdfPath, Buffer.from(catalogDoc.output('arraybuffer')));
fs.writeFileSync(path.join(publicDir, 'Luxora_Watch_Catalog_2026.pdf'), Buffer.from(catalogDoc.output('arraybuffer')));
console.log('Saved Luxora_Watch_Catalog_2026.pdf');


// ==========================================
// 2. TECHNICAL SPECIFICATIONS & CODE DOCUMENTATION PDF
// ==========================================
console.log('Generating Technical Documentation PDF...');
const codeDoc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
});

codeDoc.setFillColor(11, 12, 16);
codeDoc.rect(0, 0, 210, 297, 'F');
codeDoc.setDrawColor(197, 168, 128);
codeDoc.setLineWidth(0.6);
codeDoc.rect(10, 10, 190, 277);

codeDoc.setFont('times', 'bold');
codeDoc.setFontSize(22);
codeDoc.setTextColor(197, 168, 128);
codeDoc.text('LUXORA TECHNICAL CODEBASE GUIDE', 20, 26);

codeDoc.setFont('helvetica', 'normal');
codeDoc.setFontSize(9);
codeDoc.setTextColor(160, 165, 180);
codeDoc.text('Architecture, Components Hierarchy, Indian Rupee Payment Gateway & Framer Motion Engine', 20, 32);

const archSections = [
  {
    title: '1. Architectural Stack',
    content: [
      '• Framework: React 19 SPA running on Vite 8 (TypeScript ES2022).',
      '• Styling: Tailwind CSS v4 with custom Cinzel / Plus Jakarta typography.',
      '• Animation: Framer Motion v12 scroll-triggered reveal with [0.16, 1, 0.3, 1] cubic-bezier easing.',
      '• Icons: Lucide React icon library.',
      '• Persistence: LocalStorage synchronized state (Cart items, Wishlist array, Order history).'
    ]
  },
  {
    title: '2. Modular Component Hierarchy',
    content: [
      '• src/App.tsx: Central application state orchestrator & drawer controller.',
      '• src/components/Navbar.tsx: Top Bar Contract adhering to single-line navigation & action zones.',
      '• src/components/Hero.tsx: Showcase stage with interactive angle toggles & live balance oscillation.',
      '• src/components/ProductGallery.tsx: 3-column catalog grid with search, filter tabs, and Framer Motion stagger.',
      '• src/components/ShowcaseGallery.tsx: Curator spotlight carousel with AnimatePresence transitions.',
      '• src/components/ProductDetailModal.tsx: Zoomable visual sheet, strap customizer & engraving.',
      '• src/components/CartDrawer.tsx: Slide-over bag with subtotal, duties, and complimentary shipping.',
      '• src/components/WishlistDrawer.tsx: Saved watches manager with localStorage persistence.',
      '• src/components/CheckoutModal.tsx: 3-step checkout with UPI, RuPay, RTGS Escrow & digital certificate.',
      '• src/components/OrderLookupModal.tsx: Live tracking and on-chain authenticity verification.',
      '• src/components/CraftsmanshipSection.tsx: Manufacture Calibre 3129 bench notes & microscopic detail.'
    ]
  },
  {
    title: '3. Currency & Indian Payment Protocols',
    content: [
      '• Currency Formatter: src/utils/format.ts with Intl.NumberFormat(\'en-IN\', { style: \'currency\', currency: \'INR\' }).',
      '• UPI Instant Gateway: VPA support (Google Pay, PhonePe, Paytm, BHIM) with zero merchant surcharge.',
      '• Card Gateway: RuPay, Visa, Mastercard, and American Express with 3D Secure / OTP validation.',
      '• RTGS Escrow: Direct luxury escrow instructions via HDFC Bank Fort Mumbai Treasury.',
      '• Web3 Crypto: Multi-sig smart escrow contract (USDC / BTC / ETH) with in-transit lock.'
    ]
  },
  {
    title: '4. Production Asset Bundling Verification',
    content: [
      '• Images directly imported in src/data/watches.ts via ES Modules for Vite hash-bundling.',
      '• Static public fallback copies in public/images/ guaranteeing 100% uptime on shared links.',
      '• Proactive onError handlers on every <img> element preventing broken image states.'
    ]
  }
];

let archY = 44;
archSections.forEach((sec) => {
  codeDoc.setFont('helvetica', 'bold');
  codeDoc.setFontSize(11);
  codeDoc.setTextColor(197, 168, 128);
  codeDoc.text(sec.title, 20, archY);
  archY += 6;

  codeDoc.setFont('helvetica', 'normal');
  codeDoc.setFontSize(8.5);
  codeDoc.setTextColor(190, 195, 205);
  sec.content.forEach((line) => {
    codeDoc.text(line, 22, archY);
    archY += 4.5;
  });
  archY += 3;
});

const codePdfPath = path.join(outputDir, 'Luxora_Technical_Source_Code_Guide.pdf');
fs.writeFileSync(codePdfPath, Buffer.from(codeDoc.output('arraybuffer')));
fs.writeFileSync(path.join(publicDir, 'Luxora_Technical_Source_Code_Guide.pdf'), Buffer.from(codeDoc.output('arraybuffer')));
console.log('Saved Luxora_Technical_Source_Code_Guide.pdf');


// ==========================================
// 3. CERTIFICATE OF AUTHENTICITY PDF
// ==========================================
console.log('Generating Certificate of Authenticity PDF...');
const certDoc = new jsPDF({
  orientation: 'landscape',
  unit: 'mm',
  format: 'a4',
});

certDoc.setFillColor(11, 12, 16);
certDoc.rect(0, 0, 297, 210, 'F');

// Double gold border
certDoc.setDrawColor(197, 168, 128);
certDoc.setLineWidth(1.2);
certDoc.rect(12, 12, 273, 186);

certDoc.setLineWidth(0.4);
certDoc.rect(15, 15, 267, 180);

certDoc.setFont('times', 'bold');
certDoc.setFontSize(26);
certDoc.setTextColor(197, 168, 128);
certDoc.text('CERTIFICATE OF AUTHENTICITY', 148.5, 38, { align: 'center' });

certDoc.setFont('helvetica', 'normal');
certDoc.setFontSize(10);
certDoc.setTextColor(180, 180, 190);
certDoc.text('HAUTE HORLOGERIE MANUFACTURE · LE BRASSUS, SWITZERLAND', 148.5, 46, { align: 'center' });

certDoc.setDrawColor(197, 168, 128);
certDoc.setLineWidth(0.5);
certDoc.line(90, 52, 207, 52);

certDoc.setFont('helvetica', 'normal');
certDoc.setFontSize(10);
certDoc.setTextColor(210, 210, 220);
certDoc.text('This document certifies that the mechanical timepiece registered below has been handcrafted,', 148.5, 64, { align: 'center' });
certDoc.text('chronometrically regulated, and sealed in accordance with the exacting standards of the Geneva Seal.', 148.5, 70, { align: 'center' });

certDoc.setFillColor(20, 22, 30);
certDoc.roundedRect(30, 80, 237, 60, 3, 3, 'F');
certDoc.setDrawColor(197, 168, 128);
certDoc.setLineWidth(0.3);
certDoc.roundedRect(30, 80, 237, 60, 3, 3, 'D');

certDoc.setFont('helvetica', 'bold');
certDoc.setFontSize(9);
certDoc.setTextColor(197, 168, 128);
certDoc.text('TIMEPIECE MODEL:', 40, 92);
certDoc.text('REFERENCE NUMBER:', 40, 102);
certDoc.text('CALIBRE SPECIFICATION:', 40, 112);
certDoc.text('PROVENANCE SERIAL HASH:', 40, 122);
certDoc.text('OFFICIAL REGISTRY OWNER:', 40, 132);

certDoc.setFont('helvetica', 'normal');
certDoc.setTextColor(255, 255, 255);
certDoc.text('Luxora Tourbillon Squelette (18K Rose Gold)', 95, 92);
certDoc.text('LX-8801-RG · Flying 60-Second Tourbillon', 95, 102);
certDoc.text('Manufacture Calibre LX-3129 · 21,600 vph · Twin-Barrel 72h', 95, 112);

certDoc.setFont('courier', 'bold');
certDoc.setTextColor(197, 168, 128);
certDoc.text('CH-GENEVE-8849-AUTH-9921', 95, 122);

certDoc.setFont('helvetica', 'normal');
certDoc.setTextColor(255, 255, 255);
certDoc.text('Raghavan Singhania · Altamount Road, Mumbai, India', 95, 132);

certDoc.setFont('times', 'italic');
certDoc.setFontSize(11);
certDoc.setTextColor(180, 180, 190);
certDoc.text('Master Watchmaker: Henri-Louis LeCoultre', 50, 165);
certDoc.text('President of Chronometry: Philippe DuBois', 247, 165, { align: 'right' });

certDoc.setFont('helvetica', 'normal');
certDoc.setFontSize(8);
certDoc.setTextColor(140, 145, 160);
certDoc.text('5-Year International Warranty Active · Armored Transit Lloyd\'s Insured Policy #LX-IND-884', 148.5, 182, { align: 'center' });

const certPdfPath = path.join(outputDir, 'Luxora_Certificate_of_Authenticity.pdf');
fs.writeFileSync(certPdfPath, Buffer.from(certDoc.output('arraybuffer')));
fs.writeFileSync(path.join(publicDir, 'Luxora_Certificate_of_Authenticity.pdf'), Buffer.from(certDoc.output('arraybuffer')));
console.log('Saved Luxora_Certificate_of_Authenticity.pdf');

// ==========================================
// 4. CREATE THE PDF ZIP FILE
// ==========================================
console.log('Creating ZIP archive of all PDF documents...');
execSync(`python3 -c "
import os, zipfile
pdf_zip = 'public/luxora-pdf-package.zip'
with zipfile.ZipFile(pdf_zip, 'w', zipfile.ZIP_DEFLATED) as z:
    for f in os.listdir('luxora-pdf-folder'):
        if f.endswith('.pdf'):
            z.write(os.path.join('luxora-pdf-folder', f), f)
print('PDF Zip successfully created:', pdf_zip, 'size:', os.path.getsize(pdf_zip))
"`);

console.log('Done!');
