import React, { useState, useMemo, useEffect } from 'react';
import { Store, PriceTier, StoreType, StyleTag, AdelaideRegion } from '../types';
import { STORES_DATA, formatStyleLabel } from '../data/storesData';
import { StoreCard } from '../components/StoreCard';
import {
  Search,
  SlidersHorizontal,
  X,
  Layers,
  ArrowUpDown,
  Compass,
  AlertCircle,
  Tag,
  DollarSign,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { trackStoreFilter } from '../utils/analytics';

interface FindStoresPageProps {
  onSelectStore: (store: Store) => void;
  comparedStores: Store[];
  onToggleCompare: (store: Store) => void;
  onOpenCompareModal: () => void;
  savedStores: Store[];
  onToggleSave: (store: Store) => void;
  initialRegion?: string;
  initialStyle?: StyleTag;
  initialPrice?: PriceTier;
  filterVersion?: number;
}

export const FindStoresPage: React.FC<FindStoresPageProps> = ({
  onSelectStore,
  comparedStores,
  onToggleCompare,
  onOpenCompareModal,
  savedStores,
  onToggleSave,
  initialRegion,
  initialStyle,
  initialPrice,
  filterVersion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>(initialStyle || 'all');
  const [selectedPrice, setSelectedPrice] = useState<string>(initialPrice || 'all');
  const [selectedRegion, setSelectedRegion] = useState<string>(initialRegion || 'all');
  const [selectedStoreType, setSelectedStoreType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'name'>('recommended');
  const [onlyTradeIn, setOnlyTradeIn] = useState<boolean>(false);

  useEffect(() => {
    if (filterVersion !== undefined && filterVersion > 0) {
      setSearchQuery('');
      setSelectedStyle(initialStyle || 'all');
      setSelectedPrice(initialPrice || 'all');
      setSelectedRegion(initialRegion || 'all');
      setSelectedStoreType('all');
      setOnlyTradeIn(false);
    }
  }, [filterVersion, initialRegion, initialStyle, initialPrice]);

  // Available style options
  const styleOptions: StyleTag[] = [
    'Vintage Streetwear & Sportswear',
    '90s & Y2K Nostalgia',
    'Workwear & Gorpcore',
    '60s & 70s Retro & Boho',
    'Minimalist & Capsule Essentials',
    'Eclectic Op Shop Mix',
    'Designer & Archive Pieces',
  ];

  // Price tier definitions (indicative only — not guaranteed)
  const priceTiers: { tier: PriceTier; label: string; ariaLabel: string }[] = [
    { tier: '$', label: '$ Budget-Friendly (Indicative)', ariaLabel: 'Budget-friendly op shops ($ indicative)' },
    { tier: '$$', label: '$$ Mid-Range (Indicative)', ariaLabel: 'Mid-range stores ($$ indicative)' },
    { tier: '$$$', label: '$$$ Curated Vintage (Indicative)', ariaLabel: 'Curated vintage ($$$ indicative)' },
    { tier: '$$$$', label: '$$$$ Premium / Collector (Indicative)', ariaLabel: 'Premium or collector vintage ($$$$ indicative)' },
    { tier: 'Not confirmed', label: 'Not Confirmed Online', ariaLabel: 'Price level not confirmed online' },
  ];

  // Adelaide Regions
  const regionOptions: AdelaideRegion[] = [
    'Adelaide CBD / East End',
    'Norwood / Inner East',
    'Unley, Fullarton & Inner South',
    'Prospect / Inner North',
  ];

  const storeTypes: StoreType[] = [
    'Op Shop / Charity',
    'Curated Vintage',
    'Consignment / Buy-Sell-Trade',
    'Market & Preloved Collective',
  ];

  // Filter logic
  const filteredStores = useMemo(() => {
    return STORES_DATA.filter((store) => {
      // Search matching
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = store.name.toLowerCase().includes(query);
        const matchesAddress = store.address.toLowerCase().includes(query);
        const matchesRegion = store.region.toLowerCase().includes(query);
        const matchesStyle = store.styles.some(
          (s) =>
            s.toLowerCase().includes(query) ||
            formatStyleLabel(s).toLowerCase().includes(query)
        );
        const matchesFinds = store.typicalFinds.some((f) => f.toLowerCase().includes(query));
        if (!matchesName && !matchesAddress && !matchesRegion && !matchesStyle && !matchesFinds) {
          return false;
        }
      }

      // Style matching
      if (selectedStyle !== 'all') {
        if (!store.styles.includes(selectedStyle as StyleTag)) {
          return false;
        }
      }

      // Price matching
      if (selectedPrice !== 'all') {
        if (store.priceTier !== selectedPrice) {
          return false;
        }
      }

      // Region matching
      if (selectedRegion !== 'all') {
        if (store.region !== selectedRegion) {
          return false;
        }
      }

      // Store Type matching
      if (selectedStoreType !== 'all') {
        if (store.storeType !== selectedStoreType) {
          return false;
        }
      }

      // Buy / Sell / Trade filter
      if (onlyTradeIn) {
        if (!store.acceptsTradeIn) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        const priceOrder: Record<PriceTier, number> = { $: 1, $$: 2, $$$: 3, $$$$: 4, 'Not confirmed': 5 };
        return priceOrder[a.priceTier] - priceOrder[b.priceTier];
      }
      if (sortBy === 'price-desc') {
        const priceOrder: Record<PriceTier, number> = { $: 1, $$: 2, $$$: 3, $$$$: 4, 'Not confirmed': 5 };
        return priceOrder[b.priceTier] - priceOrder[a.priceTier];
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0; // recommended default
    });
  }, [searchQuery, selectedStyle, selectedPrice, selectedRegion, selectedStoreType, onlyTradeIn, sortBy]);

  const activeFilterCount =
    (selectedStyle !== 'all' ? 1 : 0) +
    (selectedPrice !== 'all' ? 1 : 0) +
    (selectedRegion !== 'all' ? 1 : 0) +
    (selectedStoreType !== 'all' ? 1 : 0) +
    (onlyTradeIn ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStyle('all');
    setSelectedPrice('all');
    setSelectedRegion('all');
    setSelectedStoreType('all');
    setOnlyTradeIn(false);
    setSortBy('recommended');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & SEO Breadcrumb context */}
      <div className="border-b border-[#E8DFD5] pb-6">
        <div className="flex items-center gap-2 text-xs text-[#7A7167] mb-2 font-medium">
          <span>Home</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#213B24]">Store Directory</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#213B24]">
          Second hand clothing Adelaide: Store Directory
        </h1>
        <p className="text-xs sm:text-sm text-[#585047] mt-1 max-w-2xl leading-relaxed">
          Search, filter, and compare 11 Adelaide vintage stores, curated collectives, and charity op shops by clothing style, indicative budget level, and transit access.
        </p>
      </div>

      {/* Concise Store Info Notice */}
      <div className="px-4 py-3 bg-[#FAF7F2] border border-[#E8DFD5] rounded-lg flex items-start gap-2.5 text-xs text-[#585047]">
        <AlertCircle className="w-4 h-4 text-[#2F5233] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#213B24]">Quick note:</strong> Budget levels ($–$$$$) are indicative guides only, photos are illustrative style images rather than real store photos, and unconfirmed details are marked &ldquo;Not confirmed&rdquo; or &ldquo;Check with the store&rdquo;. Always confirm current hours and prices directly before visiting.
        </p>
      </div>

      {/* Search & Main Filter Controls */}
      <div className="bg-white rounded-lg border border-[#E8DFD5] p-5 sm:p-6 space-y-5 shadow-xs">
        {/* Row 1: Search Input & Sort Selector */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <label htmlFor="store-search-input" className="sr-only">
              Search Adelaide stores by name, suburb, clothing style, or item
            </label>
            <Search
              aria-hidden="true"
              className="w-4 h-4 text-[#7A7167] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            />
            <input
              id="store-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search store name, suburb (e.g. Norwood, Unley, Prospect), or keyword (e.g. leather, denim, 90s)..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#E8DFD5] rounded-md text-[#213B24] placeholder:text-[#7A7167] focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7167] hover:text-[#213B24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5233] rounded"
                aria-label="Clear search text"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="store-sort-select" className="text-xs text-[#7A7167] whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="store-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recommended' | 'price-asc' | 'price-desc' | 'name')}
              className="text-xs bg-[#FAF7F2] border border-[#E8DFD5] rounded-md px-3 py-2 text-[#213B24] focus:outline-none focus:ring-2 focus:ring-[#2F5233] cursor-pointer"
            >
              <option value="recommended">Recommended / Curated</option>
              <option value="price-asc">Budget: Lower to Higher ($ to $$$$)</option>
              <option value="price-desc">Budget: Higher to Lower ($$$$ to $)</option>
              <option value="name">Store Name (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Indicative Price Tier Segmented Control (Functional Buttons) */}
        <div className="space-y-2" role="group" aria-labelledby="budget-filter-label">
          <span id="budget-filter-label" className="text-xs font-semibold text-[#213B24] block">
            Indicative Budget Level (Not Guaranteed):
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              aria-pressed={selectedPrice === 'all'}
              onClick={() => {
                setSelectedPrice('all');
                trackStoreFilter('price', 'all');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5233] ${
                selectedPrice === 'all'
                  ? 'bg-[#2F5233] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#585047] hover:bg-[#E8DFD5] border border-[#E8DFD5]'
              }`}
            >
              All Price Tiers
            </button>
            {priceTiers.map((p) => (
              <button
                key={p.tier}
                type="button"
                aria-label={p.ariaLabel}
                aria-pressed={selectedPrice === p.tier}
                onClick={() => {
                  setSelectedPrice(p.tier);
                  trackStoreFilter('price', p.tier);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5233] ${
                  selectedPrice === p.tier
                    ? 'bg-[#2F5233] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#585047] hover:bg-[#E8DFD5] border border-[#E8DFD5]'
                }`}
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Clothing Style Categories Filter (Functional Buttons) */}
        <div className="space-y-2" role="group" aria-labelledby="style-filter-label">
          <span id="style-filter-label" className="text-xs font-semibold text-[#213B24] block">
            Clothing Style:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              aria-pressed={selectedStyle === 'all'}
              onClick={() => {
                setSelectedStyle('all');
                trackStoreFilter('style', 'all');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5233] ${
                selectedStyle === 'all'
                  ? 'bg-[#2F5233] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-[#585047] hover:bg-[#E8DFD5] border border-[#E8DFD5]'
              }`}
            >
              All Styles
            </button>
            {styleOptions.map((st) => (
              <button
                key={st}
                type="button"
                aria-pressed={selectedStyle === st}
                onClick={() => {
                  setSelectedStyle(st);
                  trackStoreFilter('style', st);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F5233] ${
                  selectedStyle === st
                    ? 'bg-[#2F5233] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#585047] hover:bg-[#E8DFD5] border border-[#E8DFD5]'
                }`}
              >
                {formatStyleLabel(st)}
              </button>
            ))}
          </div>
        </div>

        {/* Row 4: Dropdowns for Suburb / Precinct & Store Type */}
        <div className="pt-2 border-t border-[#F4EFEA] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Region dropdown */}
            <div className="flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="w-3.5 h-3.5 text-[#2F5233]" />
              <label htmlFor="region-filter-select" className="sr-only">
                Filter by Adelaide precinct
              </label>
              <select
                id="region-filter-select"
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  trackStoreFilter('region', e.target.value);
                }}
                className="text-xs bg-[#FAF7F2] border border-[#E8DFD5] rounded-md px-3 py-1.5 text-[#213B24] focus:outline-none focus:ring-2 focus:ring-[#2F5233] cursor-pointer"
              >
                <option value="all">All Adelaide Precincts</option>
                {regionOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Store Type dropdown */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="store-type-filter-select" className="sr-only">
                Filter by store type
              </label>
              <select
                id="store-type-filter-select"
                value={selectedStoreType}
                onChange={(e) => {
                  setSelectedStoreType(e.target.value);
                  trackStoreFilter('storeType', e.target.value);
                }}
                className="text-xs bg-[#FAF7F2] border border-[#E8DFD5] rounded-md px-3 py-1.5 text-[#213B24] focus:outline-none focus:ring-2 focus:ring-[#2F5233] cursor-pointer"
              >
                <option value="all">All Store Types (Op Shop & Vintage)</option>
                {storeTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Buy / Sell / Trade toggle */}
            <label className="flex items-center gap-1.5 text-xs text-[#585047] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyTradeIn}
                onChange={(e) => setOnlyTradeIn(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-[#E8DFD5] text-[#2F5233] focus:ring-[#2F5233]"
              />
              <span>Buy / Sell / Trade Confirmed</span>
            </label>
          </div>

          {/* Reset Filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs text-[#C06443] hover:underline font-medium cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset all filters ({activeFilterCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#585047]">
        <p>
          Showing <span className="font-bold text-[#213B24] tabular-nums">{filteredStores.length}</span> stores in Adelaide
        </p>

        {comparedStores.length > 0 && (
          <button
            onClick={onOpenCompareModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2F5233] text-white rounded-md text-xs font-semibold shadow-xs hover:bg-[#213B24] transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Compare Selected ({comparedStores.length}/3)</span>
          </button>
        )}
      </div>

      {/* Store Grid */}
      {filteredStores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
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
      ) : (
        <div className="p-12 text-center bg-white rounded-lg border border-[#E8DFD5] space-y-3">
          <AlertCircle className="w-8 h-8 text-[#7A7167] mx-auto" />
          <h3 className="font-editorial text-lg font-bold text-[#213B24]">
            No Adelaide stores match these exact filters
          </h3>
          <p className="text-xs text-[#585047] max-w-md mx-auto">
            Try resetting your price tier or region filter, or searching for general keywords like "vintage" or "linen".
          </p>
          <div className="pt-2">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#2F5233] rounded hover:bg-[#213B24] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Store Info Reminder */}
      <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] text-xs text-[#7A7167]">
        <p>
          Budget levels are indicative guides and photos are illustrative—please confirm current hours and prices directly with each store.
        </p>
      </div>

      {/* Floating Comparison Drawer if 1 or more stores selected */}
      {comparedStores.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 bg-[#213B24] text-white px-5 py-3 rounded-full shadow-lg border border-white/20 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-white" />
            <span className="font-medium">
              {comparedStores.length} of 3 stores selected to compare
            </span>
          </div>
          <button
            onClick={onOpenCompareModal}
            className="px-3.5 py-1.5 bg-white text-[#213B24] rounded-full font-semibold hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          >
            Open Side-by-Side View
          </button>
        </div>
      )}
    </div>
  );
};
