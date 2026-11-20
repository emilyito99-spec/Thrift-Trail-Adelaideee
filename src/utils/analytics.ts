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

export const GA_MEASUREMENT_ID = 'G-651CHW4W95';

let lastTrackedPageKey = '';
let lastTrackedPageAt = 0;

function getMeasurementId(): string {
  if (typeof window !== 'undefined' && window.GA_MEASUREMENT_ID) {
    return window.GA_MEASUREMENT_ID;
  }
  return GA_MEASUREMENT_ID;
}

export function trackPageView(pageName: string, path: string) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const key = `${path}::${pageName}`;
    const now = Date.now();
    if (key === lastTrackedPageKey && now - lastTrackedPageAt < 500) {
      return;
    }
    lastTrackedPageKey = key;
    lastTrackedPageAt = now;

    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_path: path,
      send_to: getMeasurementId(),
    });
  }
}

export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      send_to: getMeasurementId(),
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
