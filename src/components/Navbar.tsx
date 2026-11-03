import React, { useState } from 'react';
import { PageRoute } from '../types';
import { Compass, Menu, X, BookmarkCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-zone contract: Zone 1 (Wordmark) - Zone 2 (Nav links) - Zone 3 (1 Action CTA) */}
        <div className="flex items-center justify-between h-18 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5233] rounded-sm shrink-0"
            aria-label="Thrift Trail Adelaide Home"
          >
            <div className="w-8 h-8 rounded-full bg-[#2F5233] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#213B24] transition-colors">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-editorial text-xl font-bold tracking-tight text-[#213B24] whitespace-nowrap">
              Thrift Trail Adelaide
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#585047]" aria-label="Main navigation">
            <button
              onClick={() => handleNav('home')}
              className={`whitespace-nowrap transition-colors hover:text-[#213B24] cursor-pointer ${
                currentPage === 'home' ? 'text-[#213B24] font-semibold underline underline-offset-8 decoration-[#2F5233] decoration-2' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('find-stores')}
              className={`whitespace-nowrap transition-colors hover:text-[#213B24] cursor-pointer ${
                currentPage === 'find-stores' ? 'text-[#213B24] font-semibold underline underline-offset-8 decoration-[#2F5233] decoration-2' : ''
              }`}
            >
              Find Stores
            </button>
            <button
              onClick={() => handleNav('guides')}
              className={`whitespace-nowrap transition-colors hover:text-[#213B24] cursor-pointer ${
                currentPage === 'guides' ? 'text-[#213B24] font-semibold underline underline-offset-8 decoration-[#2F5233] decoration-2' : ''
              }`}
            >
              Thrift Guides
            </button>
            <button
              onClick={() => handleNav('my-trail')}
              className={`flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[#213B24] cursor-pointer ${
                currentPage === 'my-trail' ? 'text-[#213B24] font-semibold underline underline-offset-8 decoration-[#2F5233] decoration-2' : ''
              }`}
            >
              <BookmarkCheck className="w-4 h-4 text-[#2F5233]" />
              <span>My Trail Route</span>
              {savedCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 text-xs font-semibold bg-[#2F5233] text-white rounded-full tabular-nums">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`whitespace-nowrap transition-colors hover:text-[#213B24] cursor-pointer ${
                currentPage === 'about' ? 'text-[#213B24] font-semibold underline underline-offset-8 decoration-[#2F5233] decoration-2' : ''
              }`}
            >
              About Project
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('find-stores')}
              className="hidden sm:inline-flex items-center justify-center px-4.5 py-2 text-xs font-semibold text-white bg-[#2F5233] hover:bg-[#213B24] transition-all rounded-md shadow-xs active:translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Explore Directory
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#585047] hover:text-[#213B24] hover:bg-[#F4EFEA] rounded-md transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8DFD5] bg-[#FAF7F2] px-4 pt-3 pb-5 space-y-2 text-sm shadow-md">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left py-2.5 px-3 rounded-md transition-colors ${
              currentPage === 'home' ? 'bg-[#EBF2EC] text-[#213B24] font-semibold' : 'text-[#585047]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('find-stores')}
            className={`w-full text-left py-2.5 px-3 rounded-md transition-colors ${
              currentPage === 'find-stores' ? 'bg-[#EBF2EC] text-[#213B24] font-semibold' : 'text-[#585047]'
            }`}
          >
            Find Stores (Directory & Filters)
          </button>
          <button
            onClick={() => handleNav('guides')}
            className={`w-full text-left py-2.5 px-3 rounded-md transition-colors ${
              currentPage === 'guides' ? 'bg-[#EBF2EC] text-[#213B24] font-semibold' : 'text-[#585047]'
            }`}
          >
            Thrift Guides & Tips
          </button>
          <button
            onClick={() => handleNav('my-trail')}
            className={`w-full text-left py-2.5 px-3 rounded-md flex items-center justify-between transition-colors ${
              currentPage === 'my-trail' ? 'bg-[#EBF2EC] text-[#213B24] font-semibold' : 'text-[#585047]'
            }`}
          >
            <span>My Saved Trail</span>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 text-xs bg-[#2F5233] text-white rounded-full tabular-nums">
                {savedCount} stores
              </span>
            )}
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`w-full text-left py-2.5 px-3 rounded-md transition-colors ${
              currentPage === 'about' ? 'bg-[#EBF2EC] text-[#213B24] font-semibold' : 'text-[#585047]'
            }`}
          >
            About & Sustainability Mission
          </button>
          <div className="pt-2">
            <button
              onClick={() => handleNav('find-stores')}
              className="w-full text-center py-2.5 text-xs font-semibold text-white bg-[#2F5233] rounded-md shadow-xs"
            >
              Find Stores Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
