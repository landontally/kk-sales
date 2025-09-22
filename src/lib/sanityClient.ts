// src/lib/sanityClient.ts
import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';

export const client: SanityClient = createClient({
  projectId: '9ffhyrli', // Correct Project ID
  dataset: 'production',   // Correct Dataset
  useCdn: true,
  apiVersion: '2025-09-22', // Use today's date
});