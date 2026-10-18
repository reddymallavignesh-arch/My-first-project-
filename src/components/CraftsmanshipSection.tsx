import React, { useState } from 'react';
import { Sparkles, Eye, ShieldCheck, Compass } from 'lucide-react';
import { craftMovementImg } from '../data/watches';

export const CraftsmanshipSection: React.FC = () => {
  const [activeStory, setActiveStory] = useState<number>(0);

  const stories = [
    {
      title: 'Côtes de Genève & Perlage',
      subtitle: 'Surface Decoration',
      description: 'Each bridge undergoes meticulous abrasive graining using traditional boxwood rods and diamond paste. The light refracts dynamically across the wave motifs, ensuring that every movement is an individual canvas of horological light.',
      metric: '36 Hours per Movement',
    },
    {
      title: 'Hand-Chamfered Anglage',
      subtitle: 'Internal Beveling',
      description: 'The internal and external edges of bridges and levers are manually cut to an exact 45-degree angle, then mirror-polished by hand using gentian wood pegs. No CNC machine can match the gleam of hand-finished anglage.',
      metric: 'Over 180 Polished Angles',
    },
    {
      title: 'Flame-Blued Screws & Rubies',
      subtitle: 'Thermal Metallurgy',
      description: 'Screws are carefully heat-treated over charcoal to exactly 290°C (554°F), generating an oxide layer that produces an unmistakable deep royal blue sheen. Friction is banished via synthetic sapphire ruby pivot jewels.',
      metric: '25 Synthetic Ruby Bearings',
    },
    {
      title: 'Free-Sprung Balance Wheel',
      subtitle: 'Chronometric Regulation',
      description: 'Eliminating the traditional regulator index, our master horologists adjust poising via micro-weights along the balance rim. The result is pure isochronism, resilient against physical shocks and position variations.',
      metric: '±1 Second / Day Tolerance',
    },
  ];

  return (
    <section id="craftsmanship" className="py-24 bg-[#0B0C10] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
            Vallée de Joux Heritage
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white tracking-tight">
            The Soul of Mechanical Artistry
          </h2>
          <p className="text-sm text-slate-400 font-light leading-relaxed">
            In an era of fleeting electronics, a Luxora mechanical timepiece is engineered to endure across generations. Witness the microscopic devotion behind every gear.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Movement Image Spotlight */}
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden bg-[#121318] border border-white/10 shadow-2xl">
            <div className="aspect-[16/10] w-full overflow-hidden relative">
              <img
                src={craftMovementImg}
                alt="Swiss Mechanical Watch Movement"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('/images/')) {
                    target.src = `/images/craft_movement_macro.jpg`;
                  }
                }}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="text-[#C5A880]">Manufacture Calibre 3129</span>
                <span className="hidden sm:inline">28,800 vph · Geneva Seal Standard</span>
              </div>
            </div>
          </div>

          {/* Interactive Bench Notes */}
          <div className="lg:col-span-5 space-y-3">
            {stories.map((story, index) => {
              const isActive = activeStory === index;
              return (
                <div
                  key={story.title}
                  onClick={() => setActiveStory(index)}
                  className={`p-4 rounded-xl transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#161822] border-[#C5A880]/60 shadow-lg'
                      : 'bg-[#121318]/60 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-medium">
                      0{index + 1} · {story.subtitle}
                    </span>
                    <span className="text-xs font-mono tabular-nums text-slate-400">
                      {story.metric}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white mt-1">
                    {story.title}
                  </h3>

                  {isActive && (
                    <p className="text-xs text-slate-300 font-light mt-2 leading-relaxed animate-fadeIn">
                      {story.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
