import React, { useState, useEffect } from 'react';
import { PageRoute, Store, StyleTag, PriceTier, AdelaideRegion } from './types';
import { STORES_DATA } from './data/storesData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FindStoresPage } from './pages/FindStoresPage';
import { GuidesPage } from './pages/GuidesPage';
import { AboutPage } from './pages/AboutPage';
import { SavedTrailPage } from './pages/SavedTrailPage';
import { StoreDetailModal } from './components/StoreDetailModal';
import { StoreComparisonModal } from './components/StoreComparisonModal';
import { StyleQuizModal } from './components/StyleQuizModal';
import { trackPageView } from './utils/analytics';

const LOCAL_STORAGE_KEY = 'thrift_trail_adelaide_saved';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [comparedStores, setComparedStores] = useState<Store[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  // Filters passed from Quiz or Neighborhood clicks
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterStyle, setFilterStyle] = useState<StyleTag | undefined>(undefined);
  const [filterPrice, setFilterPrice] = useState<PriceTier | undefined>(undefined);

  // Saved Stores (persisted to localStorage)
  const [savedStores, setSavedStores] = useState<Store[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        return STORES_DATA.filter((s) => ids.includes(s.id));
      }
    } catch {
      // fallback
    }
    // Default initial saved store for immediate user engagement
    return [STORES_DATA[0], STORES_DATA[1]];
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
      const rawHash = window.location.hash.replace(/^#\/?/, '');
      const parts = rawHash.split('/');
      const mainRoute = parts[0];

      if (mainRoute === 'find-stores') {
        setCurrentPage('find-stores');
      } else if (mainRoute === 'guides') {
        setCurrentPage('guides');
      } else if (mainRoute === 'about') {
        setCurrentPage('about');
      } else if (mainRoute === 'my-trail') {
        setCurrentPage('my-trail');
      } else if (mainRoute === 'store' && parts[1]) {
        const found = STORES_DATA.find((s) => s.id === parts[1]);
        if (found) {
          setSelectedStore(found);
        }
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title and GA4 page view on route change
  useEffect(() => {
    let title = 'Thrift Trail Adelaide | Second Hand & Vintage Clothing Adelaide';
    if (currentPage === 'find-stores') {
      title = 'Find Stores | Second Hand & Vintage Clothing Adelaide Directory';
    } else if (currentPage === 'guides') {
      title = 'Thrift Guides & Student Playbook | Thrift Trail Adelaide';
    } else if (currentPage === 'about') {
      title = 'About Project & Sustainability Mission | Thrift Trail Adelaide';
    } else if (currentPage === 'my-trail') {
      title = 'My Adelaide Thrift Trail Itinerary | Thrift Trail Adelaide';
    }
    document.title = title;
    trackPageView(title, `/#${currentPage}`);
  }, [currentPage]);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = page;
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
    handleNavigate('find-stores');
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
            onFilterByRegion={(region) => {
              setFilterRegion(region);
              handleNavigate('find-stores');
            }}
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
          />
        )}

        {currentPage === 'guides' && <GuidesPage onNavigate={handleNavigate} />}

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
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
