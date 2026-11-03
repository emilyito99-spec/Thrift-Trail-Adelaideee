import React from 'react';
import { PageRoute } from '../types';
import {
  Compass,
  GraduationCap,
  Leaf,
  Target,
  BarChart3,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Users,
  ShieldCheck,
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
          <span className="text-[#2F5233]">About Project</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#213B24] tracking-tight leading-tight">
          About Thrift Trail Adelaide
        </h1>
        <p className="text-sm sm:text-base text-[#585047] mt-3 leading-relaxed">
          A sustainability-focused university Digital Marketing project designed to help students and young adults aged 18–30 discover, compare, and navigate second-hand clothing stores in Adelaide.
        </p>
      </div>

      {/* Project Background & Problem Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="w-10 h-10 rounded-full bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-[#2F5233] uppercase tracking-wider block">
            Academic Context
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#213B24]">
            Born from a university digital marketing project plan.
          </h2>
          <p className="text-xs sm:text-sm text-[#585047] leading-relaxed">
            This project originated as an honours-level digital marketing capstone analyzing consumer friction in the South Australian circular fashion ecosystem.
          </p>
          <p className="text-xs sm:text-sm text-[#585047] leading-relaxed">
            While Generation Z and Millennials in Adelaide express high demand for sustainable apparel, shopping second-hand often involves high search costs: confusing price tags, fragmented social media listings, and wasted public transit trips to stores with the wrong aesthetic.
          </p>
        </div>

        <div className="lg:col-span-7 bg-white p-8 rounded-xl border border-[#E8DFD5] space-y-6 shadow-xs">
          <h3 className="font-editorial text-xl font-bold text-[#213B24]">
            The 3 Core Consumer Frictions We Address
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] space-y-1">
              <span className="font-bold text-[#213B24] block">
                1. "Op Shop vs Curated Vintage" Pricing Ambiguity
              </span>
              <p className="text-[#585047] leading-relaxed">
                Shoppers frequently confuse $5 charity shops with $120 curated vintage boutiques. Thrift Trail provides clear indicative price tiers ($ to $$$$) before visitors travel.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] space-y-1">
              <span className="font-bold text-[#213B24] block">
                2. Style Mismatch & Wasted Weekend Trips
              </span>
              <p className="text-[#585047] leading-relaxed">
                Visiting a store expecting 90s streetwear only to find bridal wear causes disappointment. We categorize every store by concrete aesthetics (Y2K, workwear, retro 70s, minimal tailoring).
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] space-y-1">
              <span className="font-bold text-[#213B24] block">
                3. Student Transit Accessibility
              </span>
              <p className="text-[#585047] leading-relaxed">
                Most students depend on Adelaide Metro trains, buses, and the free tram zone. Every store profile maps direct stops and travel times from Adelaide CBD campuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Adelaide Sustainability Impact */}
      <section className="bg-[#213B24] text-white rounded-xl p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#EBF2EC]/80 uppercase tracking-wider">
            <Leaf className="w-4 h-4 text-[#EBF2EC]" />
            <span>Environmental & Circular Economy Goals</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold leading-tight">
            Tackling fast fashion waste in South Australia.
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Australia is the world's second-highest consumer of textiles per capita, discarding over 200,000 tonnes of clothing to landfill every single year.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 p-5 rounded-lg border border-white/15 space-y-1">
            <span className="font-editorial text-3xl font-bold tabular-nums text-white block">
              73%
            </span>
            <p className="text-xs text-white/80 leading-snug">
              Reduction in personal carbon footprint when purchasing pre-owned clothing instead of new retail.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-lg border border-white/15 space-y-1">
            <span className="font-editorial text-3xl font-bold tabular-nums text-white block">
              2,700 L
            </span>
            <p className="text-xs text-white/80 leading-snug">
              Water conserved per diverted cotton garment — crucial for South Australia's arid climate.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-lg border border-white/15 space-y-1">
            <span className="font-editorial text-3xl font-bold tabular-nums text-white block">
              $1.2M+
            </span>
            <p className="text-xs text-white/80 leading-snug">
              Annual funding generated by Adelaide charity op shops for crisis food and emergency housing.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-lg border border-white/15 space-y-1">
            <span className="font-editorial text-3xl font-bold tabular-nums text-white block">
              100%
            </span>
            <p className="text-xs text-white/80 leading-snug">
              Support for local Adelaide circular economy merchants and independent vintage collectors.
            </p>
          </div>
        </div>
      </section>

      {/* Digital Marketing Strategy & SEO Framework */}
      <section className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold text-[#2F5233] uppercase tracking-wider block">
            Digital Marketing Architecture
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#213B24]">
            SEO Strategy & Performance Measurement
          </h2>
          <p className="text-xs sm:text-sm text-[#585047] leading-relaxed">
            As part of our academic marketing plan, this platform demonstrates production SEO optimization and analytics readiness:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="bg-white p-6 rounded-lg border border-[#E8DFD5] space-y-3">
            <div className="w-8 h-8 rounded-md bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center font-bold">
              SEO
            </div>
            <h3 className="font-editorial text-base font-bold text-[#213B24]">
              High-Intent Keyword Architecture
            </h3>
            <p className="text-xs text-[#585047] leading-relaxed">
              Targeting primary search terms <em>"Second hand clothing Adelaide"</em> and <em>"Vintage clothing Adelaide"</em> with rich H1/H2 semantic hierarchy, local suburb entity signals, and structured Schema.org JSON-LD data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E8DFD5] space-y-3">
            <div className="w-8 h-8 rounded-md bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center font-bold">
              GA4
            </div>
            <h3 className="font-editorial text-base font-bold text-[#213B24]">
              Google Analytics 4 Prepared
            </h3>
            <p className="text-xs text-[#585047] leading-relaxed">
              Equipped with a custom event taxonomy tracking store profile views, multi-facet filter interactions, comparison drawer launches, and guide reading engagement.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#E8DFD5] space-y-3">
            <div className="w-8 h-8 rounded-md bg-[#EBF2EC] text-[#2F5233] flex items-center justify-center font-bold">
              UX
            </div>
            <h3 className="font-editorial text-base font-bold text-[#213B24]">
              Zero Friction Young Adult UX
            </h3>
            <p className="text-xs text-[#585047] leading-relaxed">
              Designed specifically for mobile and desktop screens, zero pill clutter, high contrast typography (Fraunces & Plus Jakarta Sans), and zero dead-end user flows.
            </p>
          </div>
        </div>
      </section>

      {/* Demonstration Data & Transparency Notice */}
      <section className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-xl p-8 sm:p-10 space-y-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-[#2F5233] shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h3 className="font-editorial text-xl font-bold text-[#213B24]">
              Demonstration Data & Academic Integrity Notice
            </h3>
            <p className="text-xs sm:text-sm text-[#585047] leading-relaxed">
              In accordance with our digital marketing project guidelines:
            </p>
            <ul className="space-y-1.5 text-xs text-[#585047] list-disc list-inside">
              <li>
                All store profiles in this prototype utilize verified Adelaide store locations and neighborhood precincts.
              </li>
              <li>
                Indicative price ranges, typical garment finds, and visitor tips are clearly labelled demonstration models.
              </li>
              <li>
                We do not fabricate real-time stock levels, commercial promotional codes, or fake customer testimonials.
              </li>
              <li>
                This platform is purely an educational store discovery and comparison guide, not an online shopping or transactional marketplace.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-white border border-[#E8DFD5] rounded-xl">
        <div>
          <h3 className="font-editorial text-xl font-bold text-[#213B24]">
            Ready to explore Adelaide's second-hand scene?
          </h3>
          <p className="text-xs text-[#585047]">
            Start comparing vintage stores and op shops in our interactive directory.
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
    </div>
  );
};
