// src/routes/+layout.server.ts
import { client } from '$lib/sanityClient';

export async function load() {
  try {
    // 1. Fetch a simple array of every type property currently assigned to a toy document
    const rawTypes = await client.fetch<string[]>(
      `*[_type == "toy" && defined(type)].type`
    );

    // 2. Pass it through a JavaScript Set to instantly wipe out duplicates
    const activeToyTypes = [...new Set(rawTypes)];

    return {
      activeToyTypes
    };
  } catch (err) {
    console.error('Failed to fetch active toy categories:', err);
    return { activeToyTypes: [] };
  }
}