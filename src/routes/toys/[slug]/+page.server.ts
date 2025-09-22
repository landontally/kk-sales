// src/routes/toys/[slug]/+page.server.ts
import { client } from '$lib/sanityClient';
import type { Toy } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const { slug } = params;

  // This query finds the single toy that matches the current slug
  const groqQuery = `*[_type == "toy" && slug.current == $slug][0]`;
  const toy = await client.fetch<Toy>(groqQuery, { slug });

  if (toy) {
    return { toy };
  }

  error(404, 'Not found');
}