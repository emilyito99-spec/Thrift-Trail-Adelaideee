import React from 'react';
import { Store } from '../types';
import { X, Layers, Check, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { trackCompareStores } from '../utils/analytics';

interface StoreComparisonModalProps {
  stores: Store[];
  onClose: () => void;
  onRemoveStore: (storeId: string) => void;
  onSelectStore: (store: Store) => void;
  onClearAll: () => void;
}

export const StoreComparisonModal: React.FC<StoreComparisonModalProps> = ({
  stores,
  onClose,
  onRemoveStore,
  onSelectStore,
  onClearAll,
}) => {
  React.useEffect(() => {
    if (stores.length > 0) {
      trackCompareStores(stores.map((s) => s.name));
    }
  }, [stores]);

  if (stores.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
    >
      <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-xl border border-[#E8DFD5] overflow-hidden my-6">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FAF7F2] border-b border-[#E8DFD5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#2F5233] text-white flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 id="compare-modal-title" className="font-editorial text-xl font-bold text-[#213B24]">
                Side-by-Side Store Comparison
              </h2>
              <p className="text-xs text-[#585047]">
                Compare indicative price tiers, aesthetics, and transit options before heading out.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="text-xs text-[#7A7167] hover:text-[#C06443] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#E8DFD5] text-[#585047] transition-colors cursor-pointer"
              aria-label="Close comparison view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table / Grid */}
        <div className="p-6 overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Store Headers */}
            <div className="grid grid-cols-4 gap-4 pb-4 border-b border-[#E8DFD5]">
              <div className="text-xs font-bold text-[#7A7167] uppercase tracking-wider self-end pb-2">
                Attribute
              </div>
              {stores.map((store) => (
                <div key={store.id} className="space-y-2">
                  <div className="relative aspect-16/10 rounded overflow-hidden bg-[#F4EFEA]">
                    <img
                      src={store.imageUrl}
                      alt={store.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={() => onRemoveStore(store.id)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                      aria-label={`Remove ${store.name} from comparison`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <h3 className="font-editorial text-base font-bold text-[#213B24] leading-tight">
                    {store.name}
                  </h3>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectStore(store);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2F5233] hover:underline cursor-pointer"
                  >
                    <span>Full Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {/* Fillers if less than 3 stores */}
              {Array.from({ length: 3 - stores.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="rounded border border-dashed border-[#E8DFD5] bg-[#FAF7F2]/50 p-6 flex flex-col items-center justify-center text-center text-xs text-[#7A7167]"
                >
                  <p>Select another store from the directory to compare</p>
                </div>
              ))}
            </div>

            {/* Row: Store Category & Region */}
            <div className="grid grid-cols-4 gap-4 py-3 border-b border-[#F4EFEA] text-xs">
              <span className="font-semibold text-[#213B24]">Type & Region</span>
              {stores.map((store) => (
                <div key={store.id} className="text-[#585047]">
                  <span className="font-medium text-[#213B24] block">{store.storeType}</span>
                  <span className="text-[#7A7167] text-[11px]">{store.region}</span>
                </div>
              ))}
            </div>

            {/* Row: Indicative Price Tier */}
            <div className="grid grid-cols-4 gap-4 py-3 border-b border-[#F4EFEA] text-xs">
              <span className="font-semibold text-[#213B24]">Indicative Price</span>
              {stores.map((store) => (
                <div key={store.id} className="text-[#585047]">
                  <span className="font-bold text-[#2F5233] text-sm block">{store.priceTier}</span>
                  <span className="text-[11px] text-[#585047]">{store.indicativePriceRange}</span>
                </div>
              ))}
            </div>

            {/* Row: Primary Aesthetics */}
            <div className="grid grid-cols-4 gap-4 py-3 border-b border-[#F4EFEA] text-xs">
              <span className="font-semibold text-[#213B24]">Style Aesthetics</span>
              {stores.map((store) => (
                <div key={store.id} className="text-[#585047] text-[11px] leading-relaxed">
                  {store.styles.join(' · ')}
                </div>
              ))}
            </div>

            {/* Row: Typical Finds */}
            <div className="grid grid-cols-4 gap-4 py-3 border-b border-[#F4EFEA] text-xs">
              <span className="font-semibold text-[#213B24]">Typical Finds</span>
              {stores.map((store) => (
                <ul key={store.id} className="space-y-1 text-[11px] text-[#585047]">
                  {store.typicalFinds.slice(0, 3).map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              ))}
            </div>

            {/* Row: Public Transit */}
            <div className="grid grid-cols-4 gap-4 py-3 border-b border-[#F4EFEA] text-xs">
              <span className="font-semibold text-[#213B24]">Public Transit Access</span>
              {stores.map((store) => (
                <div key={store.id} className="text-[#585047] text-[11px] leading-relaxed">
                  {store.publicTransit}
                </div>
              ))}
            </div>

            {/* Row: Fitting Rooms & Trade-In */}
            <div className="grid grid-cols-4 gap-4 py-3 border-b border-[#F4EFEA] text-xs">
              <span className="font-semibold text-[#213B24]">Fitting Rooms</span>
              {stores.map((store) => (
                <div key={store.id} className="text-[#585047] flex items-center gap-1.5 text-xs">
                  {store.fittingRooms ? (
                    <>
                      <Check className="w-4 h-4 text-[#2F5233]" />
                      <span>Available</span>
                    </>
                  ) : (
                    <>
                      <Minus className="w-4 h-4 text-[#7A7167]" />
                      <span>None</span>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Row: Trade-in / Consignment */}
            <div className="grid grid-cols-4 gap-4 py-3 border-b border-[#F4EFEA] text-xs">
              <span className="font-semibold text-[#213B24]">Trade / Consign</span>
              {stores.map((store) => (
                <div key={store.id} className="text-[#585047] text-[11px]">
                  {store.clothingTradeIn ? 'Accepts trade/buy-back' : 'Donation only'}
                </div>
              ))}
            </div>

            {/* Row: Student Perks */}
            <div className="grid grid-cols-4 gap-4 py-3 text-xs">
              <span className="font-semibold text-[#213B24]">Student Perks</span>
              {stores.map((store) => (
                <div key={store.id} className="text-[#585047] text-[11px]">
                  {store.studentDiscount || 'Standard pricing'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DFD5] flex items-center justify-between text-xs text-[#7A7167]">
          <span>Demonstration comparison data for educational project plan.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#2F5233] text-white rounded font-medium hover:bg-[#213B24] transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
