import React from 'react';
import { PageRoute } from '../types';
import {
  Compass,
  Leaf,
  ArrowRight,
  ShieldCheck,
  Tag,
  DollarSign,
  MapPin,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Header */}
      <div className="border-b border-[#E8DFD5] pb-8 max-w-3xl">
        <div className="flex items-center gap-2 text-xs text-[#7A7167] mb-2 font-medium">
          <span>Home</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#2F5233]">About Us</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#213B24] tracking-tight leading-tight">
          About Us
        </h1>
        <p className="text-sm sm:text-base text-[#585047] mt-3 leading-relaxed">
          Thrift Trail Adelaide is a local store guide built to make finding second-hand clothing and vintage fashion across Adelaide simpler, clearer, and more enjoyable.
        </p>
      </div>

      {/* Why We Created Thrift Trail & How It Helps */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="w-10 h-10 rounded-full bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-[#2F5233] uppercase tracking-wider block">
            Our Story
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#213B24]">
            Why we created Thrift Trail Adelaide.
          </h2>
          <p className="text-xs sm:text-sm text-[#585047] leading-relaxed">
            Adelaide has a great mix of community op shops, curated vintage boutiques, and indoor pre-loved markets—but discovering where to go often means piecing together scattered websites, social pages, and word-of-mouth tips.
          </p>
          <p className="text-xs sm:text-sm text-[#585047] leading-relaxed">
            Too often, shoppers travel across town only to realise a store leans toward high-end collector pieces when they wanted everyday budget basics, or carries tailored vintage when they were hoping for 90s streetwear. Thrift Trail Adelaide brings key store details together in one place so you can plan smarter before heading out.
          </p>
        </div>

        <div className="lg:col-span-7 bg-white p-8 rounded-xl border border-[#E8DFD5] space-y-6 shadow-xs">
          <h3 className="font-editorial text-xl font-bold text-[#213B24]">
            How Thrift Trail Helps You Plan Your Trip
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center shrink-0 mt-0.5">
                <Tag className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-[#213B24] block">
                  1. Match Stores to Your Personal Style
                </span>
                <p className="text-[#585047] leading-relaxed">
                  Filter stores by the clothing styles they are known for—whether that is 90s &amp; Y2K streetwear, heritage workwear, 60s &amp; 70s retro, minimalist staples, or eclectic op shop racks.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center shrink-0 mt-0.5">
                <DollarSign className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-[#213B24] block">
                  2. Compare Indicative Budget Levels
                </span>
                <p className="text-[#585047] leading-relaxed">
                  Quickly tell affordable charity op shops apart from mid-range or specialist collector boutiques with indicative budget tiers ($ to $$$$, or Price Not Confirmed where online pricing isn&apos;t available).
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-[#213B24] block">
                  3. Browse by Location &amp; Public Transport
                </span>
                <p className="text-[#585047] leading-relaxed">
                  Explore shops across the Adelaide CBD &amp; East End, Norwood, Unley &amp; Inner South, and Prospect, then save your favourites to build a walkable or public-transport-friendly trail route.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Second-Hand Shopping Matters */}
      <section className="bg-[#213B24] text-white rounded-xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#EBF2EC]/80 uppercase tracking-wider">
            <Leaf className="w-4 h-4 text-[#EBF2EC]" />
            <span>Why Second-Hand Matters</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold leading-tight">
            Giving great clothes a longer life in Adelaide.
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Choosing pre-loved clothing is one of the simplest ways to build a personal wardrobe without constantly buying newly manufactured fast fashion. Every second-hand find keeps wearable garments in use and supports local communities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 p-5 rounded-lg border border-white/15 space-y-1.5">
            <span className="font-editorial text-lg font-bold text-white block">
              Less Textile Waste
            </span>
            <p className="text-xs text-white/80 leading-relaxed">
              Keeping wearable garments in circulation helps extend their useful life and reduces clothing sent to landfill.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-lg border border-white/15 space-y-1.5">
            <span className="font-editorial text-lg font-bold text-white block">
              Lower New Demand
            </span>
            <p className="text-xs text-white/80 leading-relaxed">
              Reusing existing garments reduces the water, dyes, energy, and raw materials required to produce brand-new items.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-lg border border-white/15 space-y-1.5">
            <span className="font-editorial text-lg font-bold text-white block">
              Community Support
            </span>
            <p className="text-xs text-white/80 leading-relaxed">
              Charity op shops help fund vital South Australian services, while vintage stores and markets support independent local sellers.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-lg border border-white/15 space-y-1.5">
            <span className="font-editorial text-lg font-bold text-white block">
              Distinctive Style
            </span>
            <p className="text-xs text-white/80 leading-relaxed">
              Thrifting lets you experiment with heavier vintage fabrics, unique cuts, and one-off pieces that stand out from chain stores.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-white border border-[#E8DFD5] rounded-xl">
        <div>
          <h3 className="font-editorial text-xl font-bold text-[#213B24]">
            Ready to explore Adelaide&apos;s second-hand scene?
          </h3>
          <p className="text-xs text-[#585047]">
            Filter vintage boutiques and op shops by style, indicative budget, and suburb in our directory.
          </p>
        </div>
        <button
          onClick={() => onNavigate('find-stores')}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#2F5233] hover:bg-[#213B24] rounded-md transition-colors cursor-pointer shadow-xs whitespace-nowrap"
        >
          <span>Open Store Directory</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Small Project & Store Information Notice */}
      <section className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#2F5233] shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-editorial text-base sm:text-lg font-bold text-[#213B24]">
              A Quick Note on Store Information &amp; Photos
            </h3>
            <ul className="space-y-1.5 text-xs text-[#585047] list-disc list-inside leading-relaxed">
              <li>
                Thrift Trail Adelaide was originally created as a university project to make discovering local second-hand clothing stores easier.
              </li>
              <li>
                Budget tiers ($ to $$$$) are <strong>indicative guides only</strong> based on publicly available information—not guaranteed prices. Stores without enough public pricing info are marked <strong>Price Not Confirmed</strong>, and unverified details (such as unpublished hours, fitting rooms, or discounts) are marked <strong>&ldquo;Check with the store&rdquo;</strong>.
              </li>
              <li>
                Store images are <strong>illustrative fashion photos</strong> matched to each shop&apos;s clothing style rather than real photos of the storefronts or interiors. Please confirm current hours and details directly with each store before visiting.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
