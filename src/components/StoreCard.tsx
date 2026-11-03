import React, { useState } from 'react';
import { Store } from '../types';
import { MapPin, Train, Bookmark, Check, ArrowRight, Layers } from 'lucide-react';

interface StoreCardProps {
  store: Store;
  onSelect: (store: Store) => void;
  isCompared: boolean;
  onToggleCompare: (store: Store) => void;
  isSaved: boolean;
  onToggleSave: (store: Store) => void;
}

export const StoreCard: React.FC<StoreCardProps> = ({
  store,
  onSelect,
  isCompared,
  onToggleCompare,
  isSaved,
  onToggleSave,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group bg-white rounded-lg border border-[#E8DFD5] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-[#2F5233]/40">
      <div>
        {/* Image Container with Fallback */}
        <div className="relative aspect-4/3 w-full bg-[#F4EFEA] overflow-hidden">
          {!imageError ? (
            <img
              src={store.imageUrl}
              alt={`${store.name} - Second hand and vintage clothing in ${store.region}, Adelaide`}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF7F2] to-[#EBF2EC] text-[#585047]">
              <span className="font-editorial text-lg font-bold text-[#213B24] mb-1">{store.name}</span>
              <span className="text-xs text-[#7A7167]">{store.storeType} · Adelaide</span>
            </div>
          )}

          {/* Demonstration Flag Badge */}
          {store.isDemonstrationData && (
            <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#585047] text-[11px] font-medium px-2 py-0.5 rounded border border-[#E8DFD5]">
              Demo Profile
            </div>
          )}

          {/* Quick Trail Save Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(store);
            }}
            aria-label={isSaved ? `Remove ${store.name} from saved trail` : `Save ${store.name} to my trail`}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer shadow-xs ${
              isSaved
                ? 'bg-[#2F5233] text-white'
                : 'bg-white/85 text-[#585047] hover:bg-white hover:text-[#213B24]'
            }`}
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          </button>

          {/* Price Tier Overlay at bottom right */}
          <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs font-semibold px-2 py-0.5 rounded">
            {store.priceTier} · {store.priceTier === '$' ? 'Budget' : store.priceTier === '$$' ? 'Moderate' : store.priceTier === '$$$' ? 'Curated' : 'Archive'}
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5">
          {/* Clean Unboxed Metadata: Store Type · Region */}
          <div className="flex items-center gap-2 text-xs text-[#7A7167] mb-1.5 font-medium">
            <span>{store.storeType}</span>
            <span aria-hidden="true">·</span>
            <span>{store.region}</span>
          </div>

          {/* Store Title */}
          <h3 className="font-editorial text-xl font-bold text-[#213B24] leading-snug group-hover:text-[#2F5233] transition-colors mb-2">
            <button
              onClick={() => onSelect(store)}
              className="text-left cursor-pointer focus:outline-none focus-visible:underline"
            >
              {store.name}
            </button>
          </h3>

          {/* Tagline */}
          <p className="text-xs text-[#585047] leading-relaxed line-clamp-2 mb-3">
            {store.tagline}
          </p>

          {/* Indicative Price Range note */}
          <div className="text-xs font-medium text-[#213B24] mb-3">
            Indicative: <span className="text-[#585047] font-normal">{store.indicativePriceRange}</span>
          </div>

          {/* Public Transit snippet */}
          <div className="flex items-start gap-1.5 text-xs text-[#585047] mb-3">
            <Train className="w-3.5 h-3.5 text-[#2F5233] shrink-0 mt-0.5" />
            <span className="line-clamp-1">{store.publicTransit}</span>
          </div>

          {/* Style Highlights (Clean inline text) */}
          <div className="text-[11px] text-[#7A7167] border-t border-[#F4EFEA] pt-2.5">
            <span className="font-medium text-[#213B24]">Styles: </span>
            {store.styles.slice(0, 2).join(' · ')}
            {store.styles.length > 2 && ' · more'}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[#F4EFEA] gap-2">
        <label className="flex items-center gap-1.5 text-xs text-[#585047] cursor-pointer hover:text-[#213B24] select-none">
          <input
            type="checkbox"
            checked={isCompared}
            onChange={() => onToggleCompare(store)}
            className="w-3.5 h-3.5 rounded border-[#E8DFD5] text-[#2F5233] focus:ring-[#2F5233]"
          />
          <span>Compare</span>
        </label>

        <button
          onClick={() => onSelect(store)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2F5233] hover:text-[#213B24] transition-colors cursor-pointer"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
