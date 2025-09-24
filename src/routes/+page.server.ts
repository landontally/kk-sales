// src/routes/+page.server.ts
import { client } from '$lib/sanityClient';
import type { HeroSlide, Toy, Machine } from '$lib/types'; // Add Machine
import { error } from '@sveltejs/kit';

export async function load() {
  try {
    const slideQuery = `*[_type == "heroSlide"]`;
    const latestToysQuery = `*[_type == "toy"] | order(_createdAt desc) [0...8]`;
    const latestMachinesQuery = `*[_type == "machine"] | order(_createdAt desc) [0...8]`; // Add this query

    const slides = await client.fetch<HeroSlide[]>(slideQuery);
    const latestToys = await client.fetch<Toy[]>(latestToysQuery);
    const latestMachines = await client.fetch<Machine[]>(latestMachinesQuery); // Fetch the data

    return { 
      slides: slides || [],
      latestToys: latestToys || [],
      latestMachines: latestMachines || [] // Return the data
    };

  } catch (err) {
    console.error(`Failed to load homepage data: ${err}`);
    error(500, 'Could not load homepage data. Please try again later.');
  }
}