// src/lib/types.ts
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Based on studio/schemaTypes/machineType.ts
export interface Machine {
  _id: string;
  _type: 'machine';
  name?: string;
  slug?: { current: string };
  callForPrice?: boolean;
  inStock?: boolean;
  isNew?: boolean;
  type?: 'crane' | 'arcade' | 'jukebox' | 'pinball' | 'pool' | 'changer' | 'ride' | 'redemption' | 'bulk_vending' | 'air_hockey' | 'self_merchandiser' | 'reconditioned';
  manufacturer?: ManufacturerReference;
  image?: SanityImageSource;
  price?: string;
  notes?: string;
}

// Based on studio/schemaTypes/toyType.ts
export interface Toy {
    _id: string;
    _type: 'toy';
    name?: string;
    slug?: { current: string };
    inStock?: boolean;
    isNew?: boolean;
    type?: 'single' | 'medium' | 'jumbo' | 'plastic' | 'beanies' | 'collegiate' | 'watches' | '5inch_rubber_balls' | 'bulk_bouncing_balls' | 'puffer_balls' | 'treasure_chests' | 'christmas_toys';
    image?: SanityImageSource;
    unitPrice?: string;
    casePrice?: string;
    caseQuantity?: string;
    notes?: string;
}

export interface HeroSlide {
  _id: string;
  _type: 'heroSlide';
  title?: string;
  imageDesktop?: SanityImageSource;
  imageTablet?: SanityImageSource;
  imageMobile?: SanityImageSource;
  altText?: string;
  link?: string;
}

export interface EventBanner {
  _id: string;
  _type: 'eventBanner';
  title?: string;
  image?: SanityImageSource;
  altText?: string;
  link?: string;
}

// Add a new interface for the Manufacturer reference
export interface ManufacturerReference {
  _type: 'reference';
  _ref: string;
  // These fields are populated when the reference is followed in GROQ
  name?: string;
  website?: string;
}