// src/lib/types.ts
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Based on studio/schemaTypes/machineType.ts
export interface Machine {
  _id: string;
  _type: 'machine';
  name?: string;
  type?: 'crane' | 'arcade' | 'jukebox' | 'pinball' | 'pool' | 'changer' | 'ride' | 'redemption' | 'bulk_vending' | 'air_hockey' | 'self_merchandiser' | 'reconditioned';
  manufacturer?: string;
  manufacturerWebsite?: string;
  image?: SanityImageSource;
  price?: string;
}

// Based on studio/schemaTypes/toyType.ts
export interface Toy {
    _id: string;
    _type: 'toy';
    name?: string;
    type?: 'single' | 'medium' | 'jumbo' | 'plastic' | 'beanies' | 'collegiate' | 'watches' | '5inch_rubber_balls' | 'bulk_bouncing_balls' | 'puffer_balls' | 'treasure_chests' | 'christmas_toys';
    image?: SanityImageSource;
    unitPrice?: string;
    casePrice?: string;
    caseQuantity?: string;
}