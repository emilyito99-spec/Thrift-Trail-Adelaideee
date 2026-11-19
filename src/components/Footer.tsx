import React from 'react';
import { PageRoute, PriceTier, AdelaideRegion } from '../types';
import { Compass, Leaf, MapPin, Sparkles, AlertCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onFilterStores: (filters: { region?: AdelaideRegion; price?: PriceTier }) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onFilterStores }) => {
  return (
    <footer className="bg-[#F4EFEA] border-t border-[#E8DFD5] text-[#585047] mt-24">
      {/* Top Banner / Sustainability Statement */}
      <div className="border-b border-[#E8DFD5] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#213B24]">
                Second hand clothing Adelaide & circular fashion movement
              </p>
              <p className="text-xs text-[#585047]">
                Empowering Adelaide youth (18–30) to save money and curb landfill fashion waste.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#2F5233] bg-[#FAF7F2] px-3.5 py-2 rounded-md border border-[#E8DFD5]">
            <MapPin className="w-4 h-4 text-[#2F5233] shrink-0" />
            <span>Adelaide CBD &amp; East End · Norwood · Unley &amp; Fullarton · Prospect</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Project */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#2F5233] text-white flex items-center justify-center shrink-0">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span className="font-editorial text-lg font-bold text-[#213B24]">
                Thrift Trail Adelaide
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#585047]">
              A Master&apos;s Digital Marketing subject project connecting young adults and students in South Australia with second-hand and vintage clothing store discovery.
            </p>
            <p className="text-xs text-[#7A7167]">
              Adelaide, South Australia · 2026
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#213B24] uppercase tracking-wider">
              Explore Site
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#213B24] transition-colors cursor-pointer"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-stores')}
                  className="hover:text-[#213B24] transition-colors cursor-pointer"
                >
                  Find Stores Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guides')}
                  className="hover:text-[#213B24] transition-colors cursor-pointer"
                >
                  Vintage & Thrift Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('my-trail')}
                  className="hover:text-[#213B24] transition-colors cursor-pointer"
                >
                  Custom Trail Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#213B24] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#213B24] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Featured Adelaide Trails (Pre-filtered) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#213B24] uppercase tracking-wider">
              Featured Adelaide Trails
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onFilterStores({ region: 'Adelaide CBD / East End' })}
                  className="hover:text-[#213B24] transition-colors text-left cursor-pointer"
                >
                  CBD, Rundle St &amp; East End
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterStores({ region: 'Norwood / Inner East' })}
                  className="hover:text-[#213B24] transition-colors text-left cursor-pointer"
                >
                  The Parade Norwood Stores
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterStores({ region: 'Unley, Fullarton & Inner South' })}
                  className="hover:text-[#213B24] transition-colors text-left cursor-pointer"
                >
                  Unley, Fullarton &amp; Clarence Park
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterStores({ region: 'Prospect / Inner North' })}
                  className="hover:text-[#213B24] transition-colors text-left cursor-pointer"
                >
                  Prospect Churchill Rd Superstore
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterStores({ price: '$' })}
                  className="hover:text-[#213B24] transition-colors text-left cursor-pointer"
                >
                  Budget-Friendly Op Shops ($)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Good to Know */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#213B24] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C06443]" />
              <span>Good to Know</span>
            </h4>
            <p className="text-xs leading-relaxed text-[#585047]">
              Thrift Trail Adelaide is a local store discovery and comparison guide, not an online shopping site. Links take you directly to official store websites, charity pages, or social profiles.
            </p>
          </div>
        </div>

        {/* Store Information & Illustrative Photo Disclosure */}
        <div className="mt-10 pt-6 border-t border-[#E8DFD5] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#7A7167]">
          <div className="flex items-start gap-2 max-w-3xl">
            <AlertCircle className="w-4 h-4 text-[#C06443] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Store Information Disclosure:</strong> Store names, addresses, and official links are sourced from public business and charity pages. Budget tiers ($ to $$$$) are indicative guides only; unconfirmed pricing and unverified hours/amenities are clearly labelled. Store photos are illustrative fashion images, not real store photos. Always check directly with the store before travelling.
            </p>
          </div>
          <p className="text-[11px] shrink-0">
            © 2026 Thrift Trail Adelaide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
