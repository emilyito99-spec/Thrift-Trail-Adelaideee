import React from 'react';
import { PageRoute } from '../types';
import { Compass, Leaf, MapPin, Sparkles, AlertCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
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
            <span>Adelaide CBD · Norwood · Glenelg · Bowden & Croydon · Goodwood & Unley</span>
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
              A university Digital Marketing capstone project connecting young adults and students in South Australia with curated vintage clothing stores and community op shops.
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
                  About the Project
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key SEO Topics & Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#213B24] uppercase tracking-wider">
              Featured Adelaide Trails
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('find-stores')}
                  className="hover:text-[#213B24] transition-colors text-left cursor-pointer"
                >
                  Rundle St & East End Vintage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-stores')}
                  className="hover:text-[#213B24] transition-colors text-left cursor-pointer"
                >
                  The Parade Norwood Charity Op Shops
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-stores')}
                  className="hover:text-[#213B24] transition-colors text-left cursor-pointer"
                >
                  Glenelg Beachside Thrift Loop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-stores')}
                  className="hover:text-[#213B24] transition-colors text-left cursor-pointer"
                >
                  Bowden & Croydon Indie Boutiques
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('find-stores')}
                  className="hover:text-[#213B24] transition-colors text-left cursor-pointer"
                >
                  Student Budget Op Shops (Under $20)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#213B24] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C06443]" />
              <span>Project Transparency</span>
            </h4>
            <p className="text-xs leading-relaxed text-[#585047]">
              This is a digital marketing discovery and comparison tool, not an e-commerce platform. All links redirect to official store pages or verified demonstration references.
            </p>
            <div className="text-[11px] text-[#7A7167] bg-[#FAF7F2] p-2.5 rounded border border-[#E8DFD5]">
              Google Analytics 4 (GA4) measurement ready for academic performance review.
            </div>
          </div>
        </div>

        {/* Demonstration Data Legal Disclaimer */}
        <div className="mt-10 pt-6 border-t border-[#E8DFD5] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#7A7167]">
          <div className="flex items-start gap-2 max-w-3xl">
            <AlertCircle className="w-4 h-4 text-[#C06443] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong>Demonstration Data Disclosure:</strong> Store details, indicative prices, hours, and features are compiled as representative demonstration data for a university marketing project. We do not invent promotional discounts, real-time stock availability, or fake user reviews. Please confirm exact trading times directly with stores before traveling.
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
