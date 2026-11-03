import React from 'react';
import { Store, PageRoute } from '../types';
import {
  BookmarkCheck,
  Trash2,
  MapPin,
  Train,
  DollarSign,
  ArrowRight,
  Printer,
  Copy,
  Check,
  ExternalLink,
  Plus,
} from 'lucide-react';

interface SavedTrailPageProps {
  savedStores: Store[];
  onRemoveStore: (storeId: string) => void;
  onClearAll: () => void;
  onSelectStore: (store: Store) => void;
  onNavigate: (page: PageRoute) => void;
}

export const SavedTrailPage: React.FC<SavedTrailPageProps> = ({
  savedStores,
  onRemoveStore,
  onClearAll,
  onSelectStore,
  onNavigate,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyItinerary = () => {
    const text = savedStores
      .map(
        (s, i) =>
          `Stop ${i + 1}: ${s.name}\n` +
          `• Region: ${s.region} (${s.address})\n` +
          `• Transit: ${s.publicTransit}\n` +
          `• Price Tier: ${s.priceTier} (${s.indicativePriceRange})\n` +
          `• Hours: ${s.openingHours.weekdays}`
      )
      .join('\n\n');

    const fullSummary =
      `🌿 My Adelaide Thrift Trail Itinerary\n` +
      `Total Stops: ${savedStores.length}\n\n` +
      text +
      `\n\nCurated with Thrift Trail Adelaide (https://emilyito99.github.io/thrift-trail-adelaide/)`;

    navigator.clipboard.writeText(fullSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E8DFD5] pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7A7167] mb-2 font-medium">
            <span>Home</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#213B24]">My Custom Trail Route</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#213B24]">
            My Adelaide Thrift Trail
          </h1>
          <p className="text-xs sm:text-sm text-[#585047] mt-1">
            Your personalized day itinerary of saved second-hand and vintage clothing stores.
          </p>
        </div>

        {savedStores.length > 0 && (
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyItinerary}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#213B24] bg-white border border-[#E8DFD5] rounded-md hover:bg-[#F4EFEA] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#2F5233]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Itinerary'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#213B24] bg-white border border-[#E8DFD5] rounded-md hover:bg-[#F4EFEA] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Route</span>
            </button>

            <button
              onClick={onClearAll}
              className="p-2 text-[#7A7167] hover:text-[#C06443] transition-colors cursor-pointer rounded-md hover:bg-[#F4EFEA]"
              title="Clear all saved stores"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {savedStores.length > 0 ? (
        <div className="space-y-6">
          {/* Summary Strip */}
          <div className="p-4 bg-[#F4EFEA] rounded-lg border border-[#E8DFD5] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-[#7A7167] block text-[11px]">Total Stores Saved:</span>
                <span className="font-bold text-[#213B24] text-sm tabular-nums">
                  {savedStores.length} stores
                </span>
              </div>
              <div>
                <span className="text-[#7A7167] block text-[11px]">Precincts Covered:</span>
                <span className="font-bold text-[#213B24] text-sm">
                  {Array.from(new Set(savedStores.map((s) => s.region))).length} areas
                </span>
              </div>
              <div>
                <span className="text-[#7A7167] block text-[11px]">Transit Feasibility:</span>
                <span className="font-bold text-[#2F5233] text-sm">
                  Adelaide Metro connected
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('find-stores')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2F5233] hover:underline cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add More Stores</span>
            </button>
          </div>

          {/* Sequential Trail Cards */}
          <div className="space-y-4">
            {savedStores.map((store, index) => (
              <div
                key={store.id}
                className="bg-white rounded-lg border border-[#E8DFD5] p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-xs transition-shadow"
              >
                {/* Stop Number Badge & Details */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-8 h-8 rounded-full bg-[#2F5233] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {index + 1}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs text-[#7A7167] font-medium">
                      <span>{store.storeType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{store.region}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-bold text-[#2F5233]">{store.priceTier}</span>
                    </div>

                    <h3 className="font-editorial text-xl font-bold text-[#213B24]">
                      {store.name}
                    </h3>

                    <p className="text-xs text-[#585047] leading-relaxed max-w-xl">
                      {store.tagline}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#585047] pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#2F5233]" />
                        <span>{store.address}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Train className="w-3.5 h-3.5 text-[#2F5233]" />
                        <span>{store.publicTransit}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-between md:justify-end">
                  <button
                    onClick={() => onSelectStore(store)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#2F5233] hover:text-[#213B24] cursor-pointer"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRemoveStore(store.id)}
                    className="p-1.5 text-[#7A7167] hover:text-[#C06443] transition-colors cursor-pointer rounded hover:bg-[#F4EFEA]"
                    title="Remove from my trail"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center bg-white rounded-lg border border-[#E8DFD5] space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F4EFEA] text-[#2F5233] flex items-center justify-center mx-auto">
            <BookmarkCheck className="w-6 h-6" />
          </div>
          <h3 className="font-editorial text-xl font-bold text-[#213B24]">
            Your custom trail route is empty
          </h3>
          <p className="text-xs sm:text-sm text-[#585047] max-w-md mx-auto leading-relaxed">
            As you browse stores in the directory, click the bookmark icon or "Add to My Trail" button to build your day shopping itinerary.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('find-stores')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#2F5233] rounded hover:bg-[#213B24] transition-colors cursor-pointer shadow-xs"
            >
              <span>Explore Store Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
