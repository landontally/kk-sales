// src/routes/machines/+page.server.ts
import { client } from '$lib/sanityClient';
import type { Machine } from '$lib/types';

export async function load({ url }) {
  const filter = url.searchParams.get('filter');
  const sortOrder = url.searchParams.get('sort') || 'createdAt_desc'; // Default to Newest

  // Define our sorting options
  const orderings: { [key: string]: string } = {
    createdAt_desc: '_createdAt desc',
    name_asc: 'name asc',
    price_asc: 'price asc',
    price_desc: 'price desc',
  };

  const finalOrder = orderings[sortOrder] || orderings.createdAt_desc;

  let groqQuery = `*[_type == "machine"`;
  const params: { filter?: string } = {};

  if (filter) {
    groqQuery += ` && type == $filter`;
    params.filter = filter;
  }

  // Add the dynamic ordering to the query
  groqQuery += `] | order(${finalOrder})`;

  const machines = await client.fetch<Machine[]>(groqQuery, params);

  if (machines) {
    return {
      machines,
      filter,
      sortOrder // Pass the current sort order to the page
    };
  }
  return {
    status: 500,
    body: new Error("Internal Server Error"),
  };
}