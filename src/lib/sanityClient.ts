// src/lib/sanityClient.ts
import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';

export const client: SanityClient = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-09-22', // Use today's date
});