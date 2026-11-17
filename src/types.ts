export type PriceTier = '$' | '$$' | '$$$' | '$$$$' | 'Not confirmed';

export type StoreType = 'Op Shop / Charity' | 'Curated Vintage' | 'Consignment / Buy-Sell-Trade' | 'Market & Preloved Collective';

export type StyleTag =
  | '90s & Y2K Nostalgia'
  | 'Vintage Streetwear & Sportswear'
  | 'Workwear & Gorpcore'
  | '60s & 70s Retro & Boho'
  | 'Minimalist & Capsule Essentials'
  | 'Eclectic Op Shop Mix'
  | 'Designer & Archive Pieces';

export type AdelaideRegion =
  | 'Adelaide CBD / East End'
  | 'Norwood / Inner East'
  | 'Unley, Fullarton & Inner South'
  | 'Prospect / Inner North';

export interface Store {
  id: string;
  name: string;
  tagline: string;
  storeType: StoreType;
  region: AdelaideRegion;
  address: string;
  publicTransit: string;
  priceTier: PriceTier;
  indicativePriceRange: string;
  typicalFinds: string[];
  styles: StyleTag[];
  vibe: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  studentDiscount?: string;
  fittingRooms: string;
  clothingTradeIn: string;
  acceptsTradeIn: boolean;
  instagramHandle?: string;
  instagramUrl?: string;
  websiteUrl?: string;
  isDemonstrationData?: boolean;
  sustainabilityHighlights: string[];
  tipsForVisitors: string;
}

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  afterBulletsParagraphs?: string[];
  subsections?: {
    subheading: string;
    paragraphs: string[];
    bullets?: string[];
    afterBulletsParagraphs?: string[];
  }[];
  tips?: string[];
}

export interface GuideArticle {
  id: string;
  title: string;
  seoTitle?: string;
  metaDescription?: string;
  subtitle: string;
  readTime: string;
  category: string;
  imageUrl: string;
  summary: string;
  keyTakeaways: string[];
  contentSections: GuideSection[];
}

export type PageRoute = 'home' | 'find-stores' | 'guides' | 'about' | 'my-trail' | 'contact';
