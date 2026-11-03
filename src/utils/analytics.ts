/**
 * Google Analytics 4 (GA4) Integration Helper
 * Allows seamless event tracking and SPA page views without crashing if gtag is absent.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    GA_MEASUREMENT_ID?: string;
  }
}

export function trackPageView(pageName: string, path: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const id = window.GA_MEASUREMENT_ID || 'G-THRIFTTRAIL';
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_path: path,
      send_to: id,
    });
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

export function trackStoreView(storeId: string, storeName: string, region: string) {
  trackEvent('view_store_profile', 'Stores', `${storeName} (${region})`);
}

export function trackStoreFilter(filterType: string, filterValue: string) {
  trackEvent('apply_filter', 'Store Directory', `${filterType}: ${filterValue}`);
}

export function trackCompareStores(storeNames: string[]) {
  trackEvent('compare_stores', 'Store Directory', storeNames.join(' vs '));
}
