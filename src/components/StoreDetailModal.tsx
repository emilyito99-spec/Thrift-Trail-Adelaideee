import React, { useEffect, useState } from 'react';
import { Store } from '../types';
import {
  X,
  MapPin,
  Train,
  Clock,
  Sparkles,
  ExternalLink,
  Bookmark,
  Check,
  Tag,
  DollarSign,
  AlertCircle,
  HelpCircle,
  Shirt,
} from 'lucide-react';
import { trackStoreView } from '../utils/analytics';

interface StoreDetailModalProps {
  store: Store | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (store: Store) => void;
  isCompared: boolean;
  onToggleCompare: (store: Store) => void;
}

export const StoreDetailModal: React.FC<StoreDetailModalProps> = ({
  store,
  onClose,
  isSaved,
  onToggleSave,
  isCompared,
  onToggleCompare,
}) => {
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (store) {
      setActiveImage(store.imageUrl);
      trackStoreView(store.id, store.name, store.region);
    }
  }, [store]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!store) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-profile-title"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl border border-[#E8DFD5] overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-[#585047] hover:text-[#213B24] hover:bg-white shadow-sm transition-colors cursor-pointer"
          aria-label="Close store profile modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Gallery Section */}
        <div className="relative h-64 sm:h-72 w-full bg-[#F4EFEA] overflow-hidden">
          <img
            src={activeImage || store.imageUrl}
            alt={`${store.name} interior and second-hand fashion racks in ${store.region}, Adelaide`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Top Indicators */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-[#FAF7F2]/90 backdrop-blur-xs text-[#213B24] text-xs font-semibold px-2.5 py-1 rounded">
              {store.storeType}
            </span>
            <span className="bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded">
              {store.priceTier} Indicative Tier
            </span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="text-xs font-medium text-white/90 mb-1">
              Second hand clothing Adelaide · {store.region}
            </div>
            <h2 id="store-profile-title" className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight">
              {store.name}
            </h2>
          </div>
        </div>

        {/* Secondary Thumbnail Bar (if secondary image available) */}
        {store.secondaryImageUrl && (
          <div className="flex items-center gap-2 px-6 py-2.5 bg-[#FAF7F2] border-b border-[#E8DFD5] text-xs text-[#7A7167]">
            <span className="font-medium text-[#213B24]">Photos:</span>
            <button
              onClick={() => setActiveImage(store.imageUrl)}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                activeImage === store.imageUrl ? 'bg-[#2F5233] text-white' : 'hover:bg-[#E8DFD5] text-[#585047]'
              }`}
            >
              Store Interior
            </button>
            <button
              onClick={() => setActiveImage(store.secondaryImageUrl!)}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                activeImage === store.secondaryImageUrl ? 'bg-[#2F5233] text-white' : 'hover:bg-[#E8DFD5] text-[#585047]'
              }`}
            >
              Curated Rack View
            </button>
          </div>
        )}

        {/* Body Container */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-18rem)] overflow-y-auto">
          {/* Demonstration Notice Box */}
          {store.isDemonstrationData && (
            <div className="flex items-start gap-3 p-3.5 bg-[#FAF7F2] rounded-md border border-[#E8DFD5] text-xs text-[#585047]">
              <AlertCircle className="w-4 h-4 text-[#C06443] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#213B24]">Demonstration Store Profile</p>
                <p className="text-[#7A7167] mt-0.5 leading-relaxed">
                  Store details, styles, and indicative price guidelines are curated for university research and project demonstration. Trading hours and stock vary—please verify with the store directly.
                </p>
              </div>
            </div>
          )}

          {/* Quick Snapshot Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-[#F4EFEA] rounded-md space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-[#213B24]">
                <DollarSign className="w-4 h-4 text-[#2F5233]" />
                <span>Indicative Price Range</span>
              </div>
              <p className="text-[#585047]">{store.indicativePriceRange}</p>
              <p className="text-[11px] text-[#7A7167]">
                Budget benchmark for students comparing op shops vs boutique vintage.
              </p>
            </div>

            <div className="p-3.5 bg-[#F4EFEA] rounded-md space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-[#213B24]">
                <Train className="w-4 h-4 text-[#2F5233]" />
                <span>Adelaide Metro Transit</span>
              </div>
              <p className="text-[#585047]">{store.publicTransit}</p>
              <p className="text-[11px] text-[#7A7167]">
                Convenient for students travelling from Flinders, UniSA, or UofA campuses.
              </p>
            </div>
          </div>

          {/* Style Categories & Typical Finds */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#213B24] uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-[#2F5233]" />
              <span>Clothing Styles & Aesthetics</span>
            </h3>
            <div className="text-xs text-[#585047] leading-relaxed">
              <span className="font-semibold text-[#213B24]">Primary Styles: </span>
              {store.styles.join(' · ')}
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-md border border-[#E8DFD5]">
              <span className="text-xs font-semibold text-[#213B24] block mb-2">Typical Garment Finds:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#585047]">
                {store.typicalFinds.map((find, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F5233] shrink-0" />
                    <span>{find}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Location & Trading Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#213B24] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#2F5233]" />
                <span>Address & Neighborhood</span>
              </h3>
              <p className="text-xs text-[#585047] leading-relaxed">{store.address}</p>
              <p className="text-xs text-[#7A7167]">Precinct: {store.region}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-[#213B24] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#2F5233]" />
                <span>Opening Hours Guide</span>
              </h3>
              <div className="text-xs text-[#585047] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#7A7167]">Mon – Fri:</span>
                  <span>{store.openingHours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7167]">Saturday:</span>
                  <span>{store.openingHours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7167]">Sunday:</span>
                  <span>{store.openingHours.sunday}</span>
                </div>
              </div>
            </div>
          </div>

          {/* In-Store Amenities & Student Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-[#FAF7F2] rounded border border-[#E8DFD5]">
              <span className="text-[#7A7167] block text-[11px]">Fitting Rooms:</span>
              <span className="font-semibold text-[#213B24]">
                {store.fittingRooms ? 'Available in-store' : 'Not available'}
              </span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded border border-[#E8DFD5]">
              <span className="text-[#7A7167] block text-[11px]">Sell / Consign / Trade:</span>
              <span className="font-semibold text-[#213B24]">
                {store.clothingTradeIn ? 'Accepts trade-in/consignment' : 'Donations only'}
              </span>
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded border border-[#E8DFD5]">
              <span className="text-[#7A7167] block text-[11px]">Student Perk:</span>
              <span className="font-semibold text-[#213B24]">
                {store.studentDiscount || 'Standard pricing'}
              </span>
            </div>
          </div>

          {/* Sustainability & Visitor Tips */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-[#213B24] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#2F5233]" />
              <span>Sustainability & Thrifter Advice</span>
            </h3>
            <p className="text-xs text-[#585047] leading-relaxed italic bg-[#F4EFEA] p-3 rounded">
              "{store.tipsForVisitors}"
            </p>
            <ul className="space-y-1.5 text-xs text-[#585047]">
              {store.sustainabilityHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#2F5233] font-bold">✓</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#E8DFD5] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {store.instagramHandle && (
              <a
                href={store.websiteUrl || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#213B24] bg-white border border-[#E8DFD5] rounded hover:bg-[#F4EFEA] transition-colors"
              >
                <span>{store.instagramHandle}</span>
                <ExternalLink className="w-3 h-3 text-[#7A7167]" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(store)}
              className={`px-3 py-2 text-xs font-medium rounded transition-colors cursor-pointer border ${
                isCompared
                  ? 'bg-[#2F5233] text-white border-[#2F5233]'
                  : 'bg-white text-[#585047] border-[#E8DFD5] hover:text-[#213B24]'
              }`}
            >
              {isCompared ? 'In Compare List' : 'Add to Compare'}
            </button>

            <button
              onClick={() => onToggleSave(store)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-[#213B24] text-white'
                  : 'bg-[#2F5233] text-white hover:bg-[#213B24]'
              }`}
            >
              {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{isSaved ? 'Saved to My Trail' : 'Add to My Trail'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
