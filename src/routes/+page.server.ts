// src/routes/+page.server.ts
import { client } from '$lib/sanityClient';
import type { HeroSlide, Toy, Machine, EventBanner } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const slideQuery = `*[_type == "heroSlide"] | order(sortOrder asc)`;

    // MODIFIED: Added "&& isNew == true" to filter for featured items only
    const latestToysQuery = `*[_type == "toy" && isNew == true] | order(_createdAt desc) [0...8]`;
    const latestMachinesQuery = `*[_type == "machine" && isNew == true] | order(_createdAt desc) [0...8]`;
    
    const eventBannerQuery = `*[_type == "eventBanner" && _id == "eventBanner"][0]`;

    const slides = await client.fetch<HeroSlide[]>(slideQuery);
    const latestToys = await client.fetch<Toy[]>(latestToysQuery);
    const latestMachines = await client.fetch<Machine[]>(latestMachinesQuery);
    const eventBanner = await client.fetch<EventBanner>(eventBannerQuery);

    return { 
      slides: slides || [],
      latestToys: latestToys || [],
      latestMachines: latestMachines || [],
      eventBanner: eventBanner || null
    };

  } catch (err) {
    console.error(`Failed to load homepage data: ${err}`);
    error(500, 'Could not load homepage data. Please try again later.');
  }
}