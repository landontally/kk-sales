// src/routes/machines/[slug]/+page.server.ts
import { client } from '$lib/sanityClient';
import type { Machine } from '$lib/types';
import { error } from '@sveltejs/kit';

// The `params` object contains the dynamic parts of the URL.
// In this case, it will have a `slug` property.
export async function load({ params }) {
  const { slug } = params;

  // This GROQ query fetches the single machine that matches the slug
  const groqQuery = `*[_type == "machine" && slug.current == $slug][0]`;
  const machine = await client.fetch<Machine>(groqQuery, { slug });

  if (machine) {
    return {
      machine
    };
  }

  // If no machine is found, show a 404 error
  error(404, 'Not found');
}