// src/routes/toys/+page.server.ts
import { client } from '$lib/sanityClient';
import type { Toy } from '$lib/types';

export async function load({ url }) {
  const filter = url.searchParams.get('filter');

  let groqQuery = `*[_type == "toy"`;
  const params: { filter?: string } = {};

  if (filter) {
    groqQuery += ` && type == $filter`;
    params.filter = filter;
  }

  groqQuery += `]`;

  const toys = await client.fetch<Toy[]>(groqQuery, params);

  if (toys) {
    return { 
        toys,
        filter
    };
  }
  return {
    status: 500,
    body: new Error("Internal Server Error"),
  };
}