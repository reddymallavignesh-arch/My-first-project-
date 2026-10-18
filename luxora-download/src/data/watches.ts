import { Watch } from '../types';

// Direct ES Module imports to ensure Vite bundles and hashes all images for production builds
import heroWatchImg from '../assets/images/hero_luxury_watch_1792234641400.jpg';
import emeraldChronoImg from '../assets/images/watch_emerald_chronograph_1792235203258.jpg';
import oceanusDiverImg from '../assets/images/watch_nautic_steel_1792235202605.jpg';
import carbonPerpetualImg from '../assets/images/watch_carbon_perpetual_1792235203676.jpg';
import chronoNoirImg from '../assets/images/product_chronograph_noir_1792234642042.jpg';
import celestialMoonImg from '../assets/images/product_celestial_tourbillon_1792234642630.jpg';
import auroraGoldImg from '../assets/images/product_aeronaut_gold_1792234642195.jpg';
import craftMovementImg from '../assets/images/craft_movement_macro_1792234644368.jpg';

export {
  heroWatchImg,
  emeraldChronoImg,
  oceanusDiverImg,
  carbonPerpetualImg,
  chronoNoirImg,
  celestialMoonImg,
  auroraGoldImg,
  craftMovementImg,
};

export const WATCHES_DATA: Watch[] = [
  {
    id: 'luxora-chrono-skeleton',
    name: 'Luxora Tourbillon Squelette',
    subtitle: 'Hand-wound Openworked Flying Tourbillon',
    collection: 'Tourbillon',
    price: 3550000,
    image: heroWatchImg,
    reference: 'LX-8801-RG',
    caseSize: '41.5 mm',
    caseMaterial: '18K 4N Rose Gold',
    dial: 'Openworked Sapphire Skeleton with Hand-Chamfered Bridges',
    movement: 'Manufacture Calibre LX-3129 Manual Wind',
    powerReserve: '72 Hours Twin-Barrel',
    waterResistance: '50 m / 5 ATM',
    jewels: 27,
    frequency: '21,600 vph (3 Hz)',
    description: 'An architectural masterwork of Swiss skeletonization. The Tourbillon Squelette reveals every pulse of its hand-finished mechanical heart, crowned by a suspended one-minute flying tourbillon cage crafted from lightweight titanium.',
    features: [
      'One-minute flying tourbillon at 6 o’clock',
      'Dual barrel mainspring for extended 72h reserve',
      'Hand-beveled interior angles and perlage finishing',
      'Double anti-reflective domed sapphire crystal'
    ],
    strapOptions: [
      { id: 'alligator_brown', name: 'Hand-Stitched Alligator (Cognac)', material: 'Louisiana Alligator Leather', priceAdd: 0 },
      { id: 'alligator_noir', name: 'Hand-Stitched Alligator (Midnight Noir)', material: 'Louisiana Alligator Leather', priceAdd: 0 },
      { id: 'gold_mesh', name: '18K Rose Gold Milanese Mesh', material: 'Solid 18K Rose Gold', priceAdd: 285000 }
    ],
    inStock: true,
    editionLimit: 'Limited Production · 50 Pieces Annually',
    weightGrams: 114
  },
  {
    id: 'luxora-emerald-chronograph',
    name: 'Luxora Royal Emerald Chronograph',
    subtitle: 'High-Complication Rose Gold Column-Wheel Chronograph',
    collection: 'Chronograph',
    price: 2480000,
    image: emeraldChronoImg,
    reference: 'LX-8820-EM',
    caseSize: '42.0 mm',
    caseMaterial: '18K Satin-Brushed Rose Gold',
    dial: 'Sunburst Racing Emerald Green with Gold Guilloché Subdials',
    movement: 'Manufacture Calibre LX-882 Automatic Chronograph',
    powerReserve: '65 Hours',
    waterResistance: '100 m / 10 ATM',
    jewels: 33,
    frequency: '28,800 vph (4 Hz)',
    description: 'A striking fusion of British racing green sunburst dial and 18K solid rose gold. Features a tri-compax column wheel chronograph layout with instantaneous 30-minute and 12-hour register hands and date aperture.',
    features: [
      'Vertical clutch column wheel chronograph mechanism',
      'Deep emerald green alligator leather strap with 18K deployant clasp',
      'Tachymeter inner bezel scale calibrated for speed computation',
      'Anti-reflective box sapphire crystal'
    ],
    strapOptions: [
      { id: 'emerald_alligator', name: 'Emerald Green Hand-Stitched Alligator', material: 'Louisiana Alligator Leather', priceAdd: 0 },
      { id: 'cognac_calf', name: 'Tuscan Cognac Calfskin', material: 'Full-Grain Calf Leather', priceAdd: 0 },
      { id: 'rose_gold_link', name: '18K Solid Rose Gold Link Bracelet', material: 'Solid 18K Rose Gold', priceAdd: 380000 }
    ],
    inStock: true,
    editionLimit: 'Numbered Boutique Edition · 75 Pieces',
    weightGrams: 138
  },
  {
    id: 'luxora-oceanus-diver',
    name: 'Luxora Oceanus Professional Diver',
    subtitle: 'High-Performance 300M Automatic Marine Chronometer',
    collection: 'Dress',
    price: 980000,
    image: oceanusDiverImg,
    reference: 'LX-300-OC',
    caseSize: '42.5 mm',
    caseMaterial: '904L Corrosion-Resistant Oystersteel',
    dial: 'Deep Maritime Blue Laser-Engraved Wave Dial with Super-LumiNova',
    movement: 'Calibre LX-300 Master Chronometer Automatic',
    powerReserve: '70 Hours',
    waterResistance: '300 m / 30 ATM',
    jewels: 28,
    frequency: '28,800 vph (4 Hz)',
    description: 'Engineered to withstand the depths of oceanic exploration without sacrificing horological refinement. Unidirectional ceramic bezel with platinum Ceragold numerals, helium escape valve, and antimagnetic silicon hairspring.',
    features: [
      'Helium escape valve at 10 o’clock position',
      'Unidirectional rotating ceramic dive bezel with platinum markers',
      'Solid 904L brushed steel bracelet with micro-adjustment divers clasp',
      'Resistant to magnetic fields reaching 15,000 Gauss'
    ],
    strapOptions: [
      { id: 'steel_bracelet', name: '904L Oystersteel Link Bracelet', material: 'Brushed Oystersteel', priceAdd: 0 },
      { id: 'fkm_ocean_blue', name: 'Integrated Navy Blue FKM Rubber', material: 'High-Grade Fluoroelastomer', priceAdd: 0 },
      { id: 'nato_marine', name: 'Reinforced Marine Textile NATO', material: 'Ballistic Nylon', priceAdd: 25000 }
    ],
    inStock: true,
    weightGrams: 165
  },
  {
    id: 'luxora-carbon-perpetual',
    name: 'Luxora Forged Carbon Perpetual',
    subtitle: 'Grand Complication Astronomical Perpetual Calendar',
    collection: 'Grand Complication',
    price: 4800000,
    image: carbonPerpetualImg,
    reference: 'LX-9400-FC',
    caseSize: '43.5 mm',
    caseMaterial: 'High-Density Forged Carbon & 18K Yellow Gold Bezel',
    dial: 'Openworked Calibre with Day, Date, Month, Year & Moonphase',
    movement: 'Manufacture Calibre LX-940 Perpetual Calendar',
    powerReserve: '84 Hours Extended Autonomy',
    waterResistance: '100 m / 10 ATM',
    jewels: 42,
    frequency: '28,800 vph (4 Hz)',
    description: 'Forged under 400 bars of pressure with microscopic carbon filaments. Each case exhibits an entirely unique marbled grain. Contains an ultra-complicated perpetual mechanical calendar requiring no manual adjustment until the year 2100.',
    features: [
      'Perpetual calendar displaying leap years, month, day, date, and moonphase',
      'Aerospace-grade forged carbon composite case with 18K gold screws',
      'Ballistic Kevlar textile strap with titanium deployant buckle',
      '22K yellow gold skeletonized rotor visible through sapphire caseback'
    ],
    strapOptions: [
      { id: 'kevlar_black', name: 'Kevlar Ballistic Carbon Strap', material: 'Ballistic Carbon Fibre Weave', priceAdd: 0 },
      { id: 'rubber_perforated', name: 'Perforated Racing FKM Rubber', material: 'Textured Rubber', priceAdd: 0 },
      { id: 'alligator_gold_stitch', name: 'Black Alligator with Gold Hand-Stitch', material: 'Louisiana Alligator Leather', priceAdd: 75000 }
    ],
    inStock: true,
    editionLimit: 'Atelier Vault Series · Strictly 20 Pieces',
    weightGrams: 92
  },
  {
    id: 'luxora-aeon-chronograph',
    name: 'Luxora Aeon Dark Chronograph',
    subtitle: 'High-Frequency Automatic Column-Wheel Chronograph',
    collection: 'Chronograph',
    price: 1580000,
    image: chronoNoirImg,
    reference: 'LX-7750-TI',
    caseSize: '42.0 mm',
    caseMaterial: 'Grade 5 Black DLC Brushed Titanium',
    dial: 'Matte Obsidian with Rose Bronze Accents & Super-LumiNova',
    movement: 'Calibre LX-770 Auto-Chronograph',
    powerReserve: '60 Hours',
    waterResistance: '100 m / 10 ATM',
    jewels: 31,
    frequency: '28,800 vph (4 Hz)',
    description: 'Forged in aerospace-grade Grade 5 titanium with diamond-like carbon coating. Features a high-precision column wheel chronograph mechanism with instantaneous minute jumping and tachymeter scale bezel.',
    features: [
      'Integrated column wheel chronograph mechanism',
      'Satin-brushed DLC titanium link bracelet',
      'Screw-down crown with double gasket sealing',
      'Ceramic tachymeter outer scale'
    ],
    strapOptions: [
      { id: 'ti_bracelet', name: 'Grade 5 Titanium Link Bracelet', material: 'DLC Titanium', priceAdd: 0 },
      { id: 'rubber_noir', name: 'FKM High-Performance Rubber', material: 'Textured Fluoroelastomer', priceAdd: 0 },
      { id: 'leather_rally', name: 'Perforated Racing Calfskin', material: 'Tuscan Calf Leather', priceAdd: 35000 }
    ],
    inStock: true,
    weightGrams: 98
  },
  {
    id: 'luxora-celestia-moonphase',
    name: 'Luxora Celestia Aventurine',
    subtitle: 'Astronomical Perpetual Moonphase & Calendar',
    collection: 'Celestial',
    price: 2920000,
    image: celestialMoonImg,
    reference: 'LX-9904-PL',
    caseSize: '40.0 mm',
    caseMaterial: '950 Solid Platinum',
    dial: 'Natural Deep Blue Aventurine Glass with Star Constellations',
    movement: 'Calibre LX-920 Perpetual Astronomical Movement',
    powerReserve: '65 Hours',
    waterResistance: '30 m / 3 ATM',
    jewels: 29,
    frequency: '28,800 vph (4 Hz)',
    description: 'Gazing into the Celestia Aventurine is like peering into the cosmos. Natural sparkling aventurine stone dial with hand-painted gold leaf stars and a precision photorealistic moonphase accurate to one day every 122 years.',
    features: [
      'Astronomical moonphase accurate for 122.6 years',
      'Double date and day complication at 12 o’clock',
      'Solid 950 platinum polished stepped bezel',
      'Sapphire caseback displaying 22K gold oscillating weight'
    ],
    strapOptions: [
      { id: 'leather_navy', name: 'Midnight Navy Alligator Leather', material: 'Louisiana Alligator Leather', priceAdd: 0 },
      { id: 'leather_black', name: 'Obsidian Black Alligator Leather', material: 'Louisiana Alligator Leather', priceAdd: 0 },
      { id: 'platinum_mesh', name: '950 Platinum Mesh Bracelet', material: 'Solid 950 Platinum', priceAdd: 420000 }
    ],
    inStock: true,
    editionLimit: 'Numbered Atelier Series · 88 Timepieces',
    weightGrams: 142
  },
  {
    id: 'luxora-aurora-minimalist',
    name: 'Luxora Aurora Ultra-Plat',
    subtitle: 'Ultra-Slim Automatic Dress Watch',
    collection: 'Dress',
    price: 1290000,
    image: auroraGoldImg,
    reference: 'LX-4100-GL',
    caseSize: '39.0 mm',
    caseMaterial: '18K 3N Yellow Gold',
    dial: 'Sunray Champagne Opaline with Diamond-Cut Gold Indices',
    movement: 'Calibre LX-1200 Micro-Rotor Automatic (3.2mm thick)',
    powerReserve: '48 Hours',
    waterResistance: '30 m / 3 ATM',
    jewels: 25,
    frequency: '21,600 vph (3 Hz)',
    description: 'The epitome of refined elegance. With an ultra-slim profile of only 6.8mm total thickness, the Aurora slips effortlessly beneath the cuff. Powered by a gold micro-rotor movement visible through the exhibition caseback.',
    features: [
      'Ultra-thin 6.8 mm case profile',
      'Solid 21K gold micro-rotor winding system',
      'Hand-applied diamond-polished hour batons',
      'Convex sapphire crystal with zero optical distortion'
    ],
    strapOptions: [
      { id: 'havana_leather', name: 'Chestnut Calfskin Leather', material: 'Full-Grain French Calf', priceAdd: 0 },
      { id: 'black_leather', name: 'Onyx Smooth Calfskin', material: 'Full-Grain French Calf', priceAdd: 0 },
      { id: 'suede_taupe', name: 'Brushed Nubuck Suede', material: 'Italian Suede', priceAdd: 22000 }
    ],
    inStock: true,
    weightGrams: 76
  },
  {
    id: 'luxora-calibre-openwork',
    name: 'Luxora Calibre 3129 Openwork',
    subtitle: 'Grand Complication Haute Horlogerie Masterpiece',
    collection: 'Grand Complication',
    price: 4350000,
    image: craftMovementImg,
    reference: 'LX-3129-SK',
    caseSize: '43.0 mm',
    caseMaterial: '18K White Gold & German Silver',
    dial: 'Full Openwork Calibre with 180 Hand-Finished Chamfered Angles',
    movement: 'Manufacture Calibre LX-3129 Calibre Haute Horlogerie',
    powerReserve: '80 Hours',
    waterResistance: '50 m / 5 ATM',
    jewels: 35,
    frequency: '28,800 vph (4 Hz)',
    description: 'Crafted exclusively on bespoke order by our master horologists in Le Brassus. Over 240 hours of manual hand-finishing, featuring mirror-polished bevels, blued thermal screws, and an escapement calibrated to within +1/-1 second per day.',
    features: [
      'Bespoke hand-engraved bridge architecture',
      'Free-sprung variable inertia balance wheel',
      'Thermal flame-blued watchmaker screws',
      'Delivered with official Geneva Seal certification'
    ],
    strapOptions: [
      { id: 'matte_croc', name: 'Matte Anthracite Alligator', material: 'Hand-Sewn Alligator', priceAdd: 0 },
      { id: 'white_gold_link', name: '18K White Gold Integrated Bracelet', material: 'Solid 18K White Gold', priceAdd: 550000 }
    ],
    inStock: true,
    editionLimit: 'Strictly 25 Timepieces Worldwide',
    weightGrams: 158
  },
  {
    id: 'luxora-vanguard-monopusher',
    name: 'Luxora Vanguard Monopusher',
    subtitle: 'Heritage Single-Button Racing Chronograph',
    collection: 'Chronograph',
    price: 2060000,
    image: chronoNoirImg,
    reference: 'LX-5520-TI',
    caseSize: '41.0 mm',
    caseMaterial: 'Titanium & Satin Rose Gold Bezel',
    dial: 'Sunburst Anthracite with Dual Bi-Compax Subdials',
    movement: 'Calibre LX-Monopusher Manual Wind',
    powerReserve: '55 Hours',
    waterResistance: '50 m / 5 ATM',
    jewels: 28,
    frequency: '28,800 vph (4 Hz)',
    description: 'Operates start, stop, and reset functions through a single coaxial pusher embedded into the winding crown. Inspired by European motorsport with modern horological tolerances.',
    features: [
      'Coaxial crown monopusher complication',
      'Lateral clutch column wheel activation',
      'Two-tone titanium and 18K rose gold architecture',
      'Anti-magnetic silicon hairspring'
    ],
    strapOptions: [
      { id: 'ti_link', name: 'Brushed Titanium Bracelet', material: 'Titanium & Rose Gold Screws', priceAdd: 0 },
      { id: 'vintage_bordeaux', name: 'Vintage Bordeaux Leather', material: 'Horween Shell Cordovan', priceAdd: 20000 }
    ],
    inStock: true,
    weightGrams: 105
  }
];

export const BOUTIQUES = [
  {
    city: 'Mumbai Salon',
    address: 'The Taj Mahal Palace, Apollo Bunder, Colaba, Mumbai 400001',
    hours: 'Mon - Sun, 10:30 - 20:00 IST'
  },
  {
    city: 'New Delhi Flagship',
    address: 'The Chanakya, Chanakyapuri, New Delhi 110021',
    hours: 'Mon - Sun, 11:00 - 20:30 IST'
  },
  {
    city: 'Bengaluru Atelier',
    address: 'UB City, Vittal Mallya Road, Bengaluru 560001',
    hours: 'Mon - Sun, 10:30 - 20:00 IST'
  },
  {
    city: 'Geneva Salon',
    address: 'Rue du Rhône 42, 1204 Genève, Switzerland',
    hours: 'Mon - Sat, 10:00 - 18:30 CET'
  }
];
