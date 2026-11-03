import React, { useState, useMemo } from 'react';
import { Store, PriceTier, StoreType, StyleTag, AdelaideRegion } from '../types';
import { STORES_DATA } from '../data/storesData';
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
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>(initialStyle || 'all');
  const [selectedPrice, setSelectedPrice] = useState<string>(initialPrice || 'all');
  const [selectedRegion, setSelectedRegion] = useState<string>(initialRegion || 'all');
  const [selectedStoreType, setSelectedStoreType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'name'>('recommended');
  const [onlyStudentDiscount, setOnlyStudentDiscount] = useState<boolean>(false);

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

  // Price tier definitions
  const priceTiers: { tier: PriceTier; label: string; desc: string }[] = [
    { tier: '$', label: '$ Budget Op Shop', desc: '$5 – $25 per garment' },
    { tier: '$$', label: '$$ Moderate Thrift', desc: '$20 – $55 per garment' },
    { tier: '$$$', label: '$$$ Curated Vintage', desc: '$45 – $120 per garment' },
    { tier: '$$$$', label: '$$$$ Archive / Luxury', desc: '$100+ designer pieces' },
  ];

  // Adelaide Regions
  const regionOptions: AdelaideRegion[] = [
    'Adelaide CBD / East End',
    'Norwood / Inner East',
    'Glenelg / Beachside',
    'Bowden & Croydon / West',
    'Goodwood & Unley / South',
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
        const matchesStyle = store.styles.some((s) => s.toLowerCase().includes(query));
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

      // Student discount filter
      if (onlyStudentDiscount) {
        if (!store.studentDiscount) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        const priceOrder: Record<PriceTier, number> = { $: 1, $$: 2, $$$: 3, $$$$: 4 };
        return priceOrder[a.priceTier] - priceOrder[b.priceTier];
      }
      if (sortBy === 'price-desc') {
        const priceOrder: Record<PriceTier, number> = { $: 1, $$: 2, $$$: 3, $$$$: 4 };
        return priceOrder[b.priceTier] - priceOrder[a.priceTier];
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0; // recommended default
    });
  }, [searchQuery, selectedStyle, selectedPrice, selectedRegion, selectedStoreType, onlyStudentDiscount, sortBy]);

  const activeFilterCount =
    (selectedStyle !== 'all' ? 1 : 0) +
    (selectedPrice !== 'all' ? 1 : 0) +
    (selectedRegion !== 'all' ? 1 : 0) +
    (selectedStoreType !== 'all' ? 1 : 0) +
    (onlyStudentDiscount ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStyle('all');
    setSelectedPrice('all');
    setSelectedRegion('all');
    setSelectedStoreType('all');
    setOnlyStudentDiscount(false);
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
          Filter and compare curated vintage clothing stores, independent boutiques and community charity op shops across Adelaide by price tier, clothing aesthetic, and transit ease.
        </p>
      </div>

      {/* Search & Main Filter Controls */}
      <div className="bg-white rounded-lg border border-[#E8DFD5] p-5 sm:p-6 space-y-5 shadow-xs">
        {/* Row 1: Search Input & Sort Selector */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#7A7167] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search store name, suburb (e.g. Norwood, Glenelg), or keyword (e.g. leather, denim, 90s)..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#E8DFD5] rounded-md text-[#213B24] placeholder:text-[#7A7167] focus:outline-none focus:ring-1 focus:ring-[#2F5233]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7167] hover:text-[#213B24]"
                aria-label="Clear search text"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#7A7167] whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-[#FAF7F2] border border-[#E8DFD5] rounded-md px-3 py-2 text-[#213B24] focus:outline-none focus:ring-1 focus:ring-[#2F5233] cursor-pointer"
            >
              <option value="recommended">Recommended / Curated</option>
              <option value="price-asc">Price: Low to High ($ to $$$$)</option>
              <option value="price-desc">Price: High to Low ($$$$ to $)</option>
              <option value="name">Store Name (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Indicative Price Tier Segmented Control (Functional Buttons) */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#213B24] block">
            Indicative Price Range:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setSelectedPrice('all');
                trackStoreFilter('price', 'all');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
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
                onClick={() => {
                  setSelectedPrice(p.tier);
                  trackStoreFilter('price', p.tier);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
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
        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#213B24] block">
            Clothing Style & Aesthetic:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setSelectedStyle('all');
                trackStoreFilter('style', 'all');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
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
                onClick={() => {
                  setSelectedStyle(st);
                  trackStoreFilter('style', st);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedStyle === st
                    ? 'bg-[#2F5233] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#585047] hover:bg-[#E8DFD5] border border-[#E8DFD5]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Row 4: Dropdowns for Suburb / Precinct & Store Type */}
        <div className="pt-2 border-t border-[#F4EFEA] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Region dropdown */}
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#2F5233]" />
              <select
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  trackStoreFilter('region', e.target.value);
                }}
                className="text-xs bg-[#FAF7F2] border border-[#E8DFD5] rounded-md px-3 py-1.5 text-[#213B24] focus:outline-none cursor-pointer"
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
              <select
                value={selectedStoreType}
                onChange={(e) => {
                  setSelectedStoreType(e.target.value);
                  trackStoreFilter('storeType', e.target.value);
                }}
                className="text-xs bg-[#FAF7F2] border border-[#E8DFD5] rounded-md px-3 py-1.5 text-[#213B24] focus:outline-none cursor-pointer"
              >
                <option value="all">All Store Types (Op Shop & Vintage)</option>
                {storeTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Student discount toggle */}
            <label className="flex items-center gap-1.5 text-xs text-[#585047] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyStudentDiscount}
                onChange={(e) => setOnlyStudentDiscount(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-[#E8DFD5] text-[#2F5233] focus:ring-[#2F5233]"
              />
              <span>Student Discount Perks Only</span>
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

      {/* Demonstration notice reminder */}
      <div className="p-4 bg-[#FAF7F2] rounded-lg border border-[#E8DFD5] text-xs text-[#7A7167] flex items-center justify-between gap-4">
        <p>
          <strong>Notice:</strong> Indicative prices and trading hours are educational references for our university digital marketing project. Always verify operating hours directly before traveling.
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
