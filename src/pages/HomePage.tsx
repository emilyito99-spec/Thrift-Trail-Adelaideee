import React from 'react';
import { PageRoute, Store } from '../types';
import { STORES_DATA, heroThriftImg } from '../data/storesData';
import { StoreCard } from '../components/StoreCard';
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Tag,
  DollarSign,
  Leaf,
  Clock,
  CheckCircle,
  HelpCircle,
  Train,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectStore: (store: Store) => void;
  onOpenQuiz: () => void;
  comparedStores: Store[];
  onToggleCompare: (store: Store) => void;
  savedStores: Store[];
  onToggleSave: (store: Store) => void;
  onFilterByRegion: (region: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectStore,
  onOpenQuiz,
  comparedStores,
  onToggleCompare,
  savedStores,
  onToggleSave,
  onFilterByRegion,
}) => {
  // 3 featured stores for home spotlight
  const featuredStores = STORES_DATA.slice(0, 3);

  const neighborhoods = [
    {
      name: 'Adelaide CBD / East End',
      tagline: 'Rundle Street vintage, laneway arcades & free tram zone access',
      stops: '4 Curated Spots',
    },
    {
      name: 'Norwood / Inner East',
      tagline: 'The Parade strip lined with high-end charity op shops',
      stops: 'Vinnies & Local Charities',
    },
    {
      name: 'Glenelg / Beachside',
      tagline: 'Coastal thrift loop accessible directly via the Glenelg Tram',
      stops: 'Salvos, Red Cross & Beach Vibes',
    },
    {
      name: 'Bowden & Croydon / West',
      tagline: 'Queen Street retro gems, plant-filled markets & artisan cafes',
      stops: 'The Real McCoy & Plant 4',
    },
    {
      name: 'Goodwood & Unley / South',
      tagline: 'King William Rd designer consignment & quiet suburban gems',
      stops: 'Prelove Studio & Save The Children',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed Metadata Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2F5233]">
                <span>Master&apos;s Digital Marketing Project</span>
                <span aria-hidden="true">·</span>
                <span>Adelaide Sustainable Fashion</span>
              </div>

              {/* Main H1 with primary SEO keywords */}
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#213B24] leading-[1.12] text-balance">
                Second hand clothing Adelaide & curated vintage guide.
              </h1>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg text-[#585047] leading-relaxed max-w-2xl">
                Compare Adelaide vintage stores and community op shops before visiting. Discover authentic 90s streetwear, timeless wool coats, and budget charity racks that match your personal style and student budget.
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs text-[#585047]">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#2F5233] shrink-0 mt-0.5" />
                  <span>Demo price tiers from budget ($) to archive ($$$$)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#2F5233] shrink-0 mt-0.5" />
                  <span>Adelaide Metro tram & bus routes included</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#2F5233] shrink-0 mt-0.5" />
                  <span>Curated for students aged 18–30</span>
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => onNavigate('find-stores')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#2F5233] hover:bg-[#213B24] transition-all rounded-md shadow-xs active:translate-y-0.5 cursor-pointer"
                >
                  <span>Find Stores in Adelaide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenQuiz}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#213B24] bg-white border border-[#E8DFD5] hover:bg-[#F4EFEA] hover:border-[#2F5233]/40 transition-all rounded-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C06443]" />
                  <span>Take 60-Sec Style Matcher</span>
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-lg overflow-hidden border border-[#E8DFD5] shadow-lg bg-[#F4EFEA]">
                <img
                  src={heroThriftImg}
                  alt="Students thrifting vintage clothing in an Adelaide brick laneway boutique"
                  className="w-full h-auto aspect-4/3 object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white p-2">
                  <div className="text-[11px] font-medium text-white/90">Circular Fashion</div>
                  <p className="font-editorial text-sm font-semibold">
                    Choosing pre-loved clothing extends garment lifespans and reduces demand for newly manufactured fast fashion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4EFEA] border border-[#E8DFD5] rounded-xl p-8 sm:p-10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold text-[#2F5233] uppercase tracking-wider block mb-1">
              Why We Built Thrift Trail
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#213B24]">
              No more disappointing thrift trips across Adelaide.
            </h2>
            <p className="text-xs sm:text-sm text-[#585047] mt-2">
              Shopping second-hand in Adelaide can feel hit-and-miss when you do not know a store&apos;s style focus or typical price bracket in advance. Thrift Trail Adelaide helps you compare example store profiles before heading out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-[#E8DFD5] space-y-3">
              <div className="w-9 h-9 rounded-md bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#213B24]">
                Indicative Price Guides
              </h3>
              <p className="text-xs text-[#585047] leading-relaxed">
                Compare lower-priced community charity op shops against higher-priced curated vintage boutiques before you travel.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E8DFD5] space-y-3">
              <div className="w-9 h-9 rounded-md bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center">
                <Tag className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#213B24]">
                Style-Specific Curation
              </h3>
              <p className="text-xs text-[#585047] leading-relaxed">
                Filter directly by your vibe: 90s Y2K nostalgia, heavy workwear & gorpcore, clean minimal tailoring, or eclectic op shop racks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E8DFD5] space-y-3">
              <div className="w-9 h-9 rounded-md bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center">
                <Train className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#213B24]">
                Adelaide Transit Optimized
              </h3>
              <p className="text-xs text-[#585047] leading-relaxed">
                Every store profile includes direct Adelaide Metro tram stops, train stations, and bus lines for car-free student thrifting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stores Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-[#2F5233] uppercase tracking-wider block mb-1">
              Top Curated Spotlights
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#213B24]">
              Vintage clothing Adelaide: Example store profiles
            </h2>
            <p className="text-xs sm:text-sm text-[#585047] mt-1">
              Demonstration profiles showing how you can compare curated vintage boutiques and charity op shops in Adelaide.
            </p>
          </div>
          <button
            onClick={() => onNavigate('find-stores')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2F5233] hover:text-[#213B24] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All 12 Stores in Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onSelect={onSelectStore}
              isCompared={comparedStores.some((s) => s.id === store.id)}
              onToggleCompare={onToggleCompare}
              isSaved={savedStores.some((s) => s.id === store.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      </section>

      {/* Popular Neighborhoods Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#E8DFD5] pt-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold text-[#2F5233] uppercase tracking-wider block mb-1">
              Explore By Precinct
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#213B24]">
              Where to find second hand clothing in Adelaide
            </h2>
            <p className="text-xs sm:text-sm text-[#585047] mt-1">
              Click a neighborhood to jump directly to its curated store listings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {neighborhoods.map((n) => (
              <button
                key={n.name}
                onClick={() => {
                  onFilterByRegion(n.name);
                  onNavigate('find-stores');
                }}
                className="p-5 text-left bg-white rounded-lg border border-[#E8DFD5] hover:border-[#2F5233] hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-[#2F5233] font-medium mb-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{n.stops}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-editorial text-lg font-bold text-[#213B24] group-hover:text-[#2F5233] transition-colors">
                  {n.name}
                </h3>
                <p className="text-xs text-[#585047] mt-1.5 leading-relaxed">
                  {n.tagline}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Impact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#213B24] text-white rounded-xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3">
              <span className="text-xs font-semibold text-[#EBF2EC]/80 uppercase tracking-wider block">
                Why Second-Hand Matters
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold leading-tight">
                A practical step toward circular fashion in Adelaide.
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
                Buying pre-loved clothing helps keep wearable garments in circulation longer, reduces demand for newly manufactured fast fashion, and lets students explore personal style on a realistic budget.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white underline underline-offset-4 hover:text-[#FAF7F2] cursor-pointer"
                >
                  <span>Read about our Master&apos;s project &amp; sustainability goals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-lg border border-white/15">
                <span className="font-editorial text-base sm:text-lg font-bold block text-white">
                  Less Textile Waste
                </span>
                <span className="text-xs text-white/80 leading-relaxed block mt-1">
                  Extending the useful life of existing clothing helps keep wearable items out of landfill.
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-lg border border-white/15">
                <span className="font-editorial text-base sm:text-lg font-bold block text-white">
                  Lower Resource Demand
                </span>
                <span className="text-xs text-white/80 leading-relaxed block mt-1">
                  Reusing pre-owned garments avoids the water, dyes, and energy needed to make brand-new clothes.
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-lg border border-white/15">
                <span className="font-editorial text-base sm:text-lg font-bold block text-white">
                  Budget-Friendly Style
                </span>
                <span className="text-xs text-white/80 leading-relaxed block mt-1">
                  Comparing op shops and vintage stores helps students find pieces that fit their style and budget.
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs p-4 rounded-lg border border-white/15">
                <span className="font-editorial text-base sm:text-lg font-bold block text-white">
                  Local Community Support
                </span>
                <span className="text-xs text-white/80 leading-relaxed block mt-1">
                  Charity op shops help fund community services while vintage stores support independent local sellers.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Teaser Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold text-[#2F5233] uppercase tracking-wider block">
              Thrifting Education
            </span>
            <h2 className="font-editorial text-2xl font-bold text-[#213B24]">
              Learn tag reading, fabric care &amp; second-hand shopping tips
            </h2>
            <p className="text-xs sm:text-sm text-[#585047] leading-relaxed">
              Read our student guides on spotting natural fibres like wool and linen, comparing op shops and vintage stores, and planning tram-friendly routes across Adelaide.
            </p>
          </div>
          <button
            onClick={() => onNavigate('guides')}
            className="px-5 py-3 text-xs font-semibold text-white bg-[#2F5233] hover:bg-[#213B24] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            Read Thrift Guides
          </button>
        </div>
      </section>
    </div>
  );
};
