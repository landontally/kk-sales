// src/routes/machines/+page.server.ts
import { client } from '$lib/sanityClient';
import type { Machine } from '$lib/types';

// The `load` function receives details about the request, including the URL.
export async function load({ url }) {
  // Get the 'filter' query parameter from the URL (e.g., "?filter=crane")
  const filter = url.searchParams.get('filter');

  // Start with the base query
  let groqQuery = `*[_type == "machine"`;
  const params: { filter?: string } = {};

  // If a filter exists, add it to our query and params
  if (filter) {
    groqQuery += ` && type == $filter`;
    params.filter = filter;
  }

  // Close the query bracket
  groqQuery += `]`;

  const machines = await client.fetch<Machine[]>(groqQuery, params);

  if (machines) {
    return {
      machines,
      filter // Return the filter so the page knows what's active
    };
  }
  return {
    status: 500,
    body: new Error("Internal Server Error"),
  };
}