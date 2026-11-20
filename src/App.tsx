import React, { useState, useEffect, useRef } from 'react';
import { PageRoute, Store, StyleTag, PriceTier, AdelaideRegion } from './types';
import { STORES_DATA } from './data/storesData';
import { GUIDES_DATA } from './data/guidesData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FindStoresPage } from './pages/FindStoresPage';
import { GuidesPage } from './pages/GuidesPage';
import { AboutPage } from './pages/AboutPage';
import { SavedTrailPage } from './pages/SavedTrailPage';
import { ContactPage } from './pages/ContactPage';
import { StoreDetailModal } from './components/StoreDetailModal';
import { StoreComparisonModal } from './components/StoreComparisonModal';
import { StyleQuizModal } from './components/StyleQuizModal';
import { trackPageView } from './utils/analytics';

const LOCAL_STORAGE_KEY = 'thrift_trail_adelaide_saved';
const DEFAULT_META_DESCRIPTION =
  'Find and compare second hand clothing Adelaide and vintage clothing stores before visiting. Curated styles, price guides, and sustainable fashion maps for young adults.';

function parseHashRoute(hash: string): {
  page: PageRoute;
  guideId: string | null;
  store: Store | null;
} {
  const rawHash = hash.replace(/^#\/?/, '');
  const parts = rawHash.split('/');
  const mainRoute = parts[0];

  if (mainRoute === 'find-stores') {
    return { page: 'find-stores', guideId: null, store: null };
  }
  if (mainRoute === 'guides') {
    return { page: 'guides', guideId: parts[1] || null, store: null };
  }
  if (mainRoute === 'about') {
    return { page: 'about', guideId: null, store: null };
  }
  if (mainRoute === 'my-trail') {
    return { page: 'my-trail', guideId: null, store: null };
  }
  if (mainRoute === 'contact') {
    return { page: 'contact', guideId: null, store: null };
  }
  if (mainRoute === 'store' && parts[1]) {
    const found = STORES_DATA.find((s) => s.id === parts[1]) || null;
    return { page: 'home', guideId: null, store: found };
  }
  return { page: 'home', guideId: null, store: null };
}

export default function App() {
  const initialRoute = typeof window !== 'undefined'
    ? parseHashRoute(window.location.hash)
    : { page: 'home' as PageRoute, guideId: null, store: null };

  const [currentPage, setCurrentPage] = useState<PageRoute>(initialRoute.page);
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(initialRoute.guideId);
  const [selectedStore, setSelectedStore] = useState<Store | null>(initialRoute.store);
  const isInitialMountRef = useRef(true);
  const [comparedStores, setComparedStores] = useState<Store[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  // Filters passed from Quiz, Footer trails, or Neighborhood clicks
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterStyle, setFilterStyle] = useState<StyleTag | undefined>(undefined);
  const [filterPrice, setFilterPrice] = useState<PriceTier | undefined>(undefined);
  const [filterVersion, setFilterVersion] = useState<number>(0);

  // Saved Stores (persisted to localStorage)
  const [savedStores, setSavedStores] = useState<Store[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        const matched = STORES_DATA.filter((s) => ids.includes(s.id));
        if (matched.length > 0 || ids.length === 0) {
          return matched;
        }
      }
    } catch {
      // fallback
    }
    // Default initial saved stores representing vintage boutique + charity op shop
    return [STORES_DATA[0], STORES_DATA[7]];
  });

  // Save to localStorage whenever savedStores changes
  useEffect(() => {
    try {
      const ids = savedStores.map((s) => s.id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // storage unavailable
    }
  }, [savedStores]);

  // Sync hash routing for GitHub Pages subfolder compatibility & browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHashRoute(window.location.hash);
      if (parsed.store) {
        setSelectedStore(parsed.store);
      } else {
        setCurrentPage(parsed.page);
        setSelectedGuideId(parsed.guideId);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title, meta description, and GA4 page view on SPA route changes
  useEffect(() => {
    let title = 'Thrift Trail Adelaide | Second Hand & Vintage Clothing Adelaide';
    let description = DEFAULT_META_DESCRIPTION;
    let routePath = `/#${currentPage}`;

    if (currentPage === 'find-stores') {
      title = 'Find Stores | Second Hand & Vintage Clothing Adelaide Directory';
    } else if (currentPage === 'guides') {
      const activeGuide = selectedGuideId
        ? GUIDES_DATA.find((g) => g.id === selectedGuideId)
        : null;
      if (activeGuide) {
        title = activeGuide.seoTitle || `${activeGuide.title} | Thrift Trail Adelaide`;
        description = activeGuide.metaDescription || activeGuide.summary;
        routePath = `/#guides/${activeGuide.id}`;
      } else {
        title = 'Thrift Guides & Student Playbook | Thrift Trail Adelaide';
      }
    } else if (currentPage === 'about') {
      title = 'About Us | Thrift Trail Adelaide';
    } else if (currentPage === 'my-trail') {
      title = 'My Adelaide Thrift Trail Itinerary | Thrift Trail Adelaide';
    } else if (currentPage === 'contact') {
      title = 'Contact Thrift Trail Adelaide | Suggest Stores & Share Feedback';
      description =
        'Contact Thrift Trail Adelaide to suggest a second-hand or vintage store, report outdated information, share feedback, or ask a question.';
    }

    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // GTM-5W4RL647 automatically sends the initial page_view on load; track subsequent SPA transitions here
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }

    trackPageView(title, routePath);
  }, [currentPage, selectedGuideId]);

  const handleNavigate = (page: PageRoute) => {
    if (page === 'find-stores') {
      setFilterRegion('all');
      setFilterStyle(undefined);
      setFilterPrice(undefined);
      setFilterVersion((v) => v + 1);
    }
    setCurrentPage(page);
    setSelectedGuideId(null);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGuide = (guideId: string | null) => {
    setSelectedGuideId(guideId);
    setCurrentPage('guides');
    window.location.hash = guideId ? `guides/${guideId}` : 'guides';
  };

  const handleToggleCompare = (store: Store) => {
    setComparedStores((prev) => {
      const exists = prev.some((s) => s.id === store.id);
      if (exists) {
        return prev.filter((s) => s.id !== store.id);
      }
      if (prev.length >= 3) {
        // limit to 3 stores max
        return [...prev.slice(1), store];
      }
      return [...prev, store];
    });
  };

  const handleToggleSave = (store: Store) => {
    setSavedStores((prev) => {
      const exists = prev.some((s) => s.id === store.id);
      if (exists) {
        return prev.filter((s) => s.id !== store.id);
      }
      return [...prev, store];
    });
  };

  const handleApplyQuizMatches = (filters: {
    selectedStyle?: StyleTag;
    selectedPrice?: PriceTier;
    selectedRegion?: AdelaideRegion;
  }) => {
    setFilterStyle(filters.selectedStyle);
    setFilterPrice(filters.selectedPrice);
    setFilterRegion(filters.selectedRegion || 'all');
    setFilterVersion((v) => v + 1);
    setCurrentPage('find-stores');
    setSelectedGuideId(null);
    window.location.hash = 'find-stores';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickFilter = (filters: {
    region?: string;
    style?: StyleTag;
    price?: PriceTier;
  }) => {
    setFilterRegion(filters.region || 'all');
    setFilterStyle(filters.style);
    setFilterPrice(filters.price);
    setFilterVersion((v) => v + 1);
    setCurrentPage('find-stores');
    setSelectedGuideId(null);
    window.location.hash = 'find-stores';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#26211D]">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        savedCount={savedStores.length}
      />

      {/* Main View Port */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectStore={setSelectedStore}
            onOpenQuiz={() => setIsQuizModalOpen(true)}
            comparedStores={comparedStores}
            onToggleCompare={handleToggleCompare}
            savedStores={savedStores}
            onToggleSave={handleToggleSave}
            onFilterByRegion={(region) => handleQuickFilter({ region })}
          />
        )}

        {currentPage === 'find-stores' && (
          <FindStoresPage
            onSelectStore={setSelectedStore}
            comparedStores={comparedStores}
            onToggleCompare={handleToggleCompare}
            onOpenCompareModal={() => setIsCompareModalOpen(true)}
            savedStores={savedStores}
            onToggleSave={handleToggleSave}
            initialRegion={filterRegion}
            initialStyle={filterStyle}
            initialPrice={filterPrice}
            filterVersion={filterVersion}
          />
        )}

        {currentPage === 'guides' && (
          <GuidesPage
            onNavigate={handleNavigate}
            selectedGuideId={selectedGuideId}
            onSelectGuide={handleSelectGuide}
          />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentPage === 'my-trail' && (
          <SavedTrailPage
            savedStores={savedStores}
            onRemoveStore={(id) => setSavedStores((prev) => prev.filter((s) => s.id !== id))}
            onClearAll={() => setSavedStores([])}
            onSelectStore={setSelectedStore}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      </main>

      {/* Store Detail Profile Modal */}
      <StoreDetailModal
        store={selectedStore}
        onClose={() => setSelectedStore(null)}
        isSaved={selectedStore ? savedStores.some((s) => s.id === selectedStore.id) : false}
        onToggleSave={handleToggleSave}
        isCompared={selectedStore ? comparedStores.some((s) => s.id === selectedStore.id) : false}
        onToggleCompare={handleToggleCompare}
      />

      {/* Side-by-Side Comparison Modal */}
      {isCompareModalOpen && (
        <StoreComparisonModal
          stores={comparedStores}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveStore={(id) => setComparedStores((prev) => prev.filter((s) => s.id !== id))}
          onSelectStore={setSelectedStore}
          onClearAll={() => setComparedStores([])}
        />
      )}

      {/* Interactive Style Matcher Modal */}
      {isQuizModalOpen && (
        <StyleQuizModal
          onClose={() => setIsQuizModalOpen(false)}
          onApplyMatches={handleApplyQuizMatches}
        />
      )}

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} onFilterStores={handleQuickFilter} />
    </div>
  );
}
