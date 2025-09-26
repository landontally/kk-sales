// src/routes/toys/+page.server.ts
import { client } from '$lib/sanityClient';
import type { Toy } from '$lib/types';

export async function load({ url }) {
  const filter = url.searchParams.get('filter');
  const sortOrder = url.searchParams.get('sort') || 'createdAt_desc';

  const orderings: { [key: string]: string } = {
    createdAt_desc: '_createdAt desc',
    name_asc: 'name asc',
    casePrice_asc: 'casePrice asc',
    casePrice_desc: 'casePrice desc',
  };

  const finalOrder = orderings[sortOrder] || orderings.createdAt_desc;

  let groqQuery = `*[_type == "toy"`;
  const params: { filter?: string } = {};

  if (filter) {
    groqQuery += ` && type == $filter`;
    params.filter = filter;
  }

  groqQuery += `] | order(${finalOrder})`;

  const toys = await client.fetch<Toy[]>(groqQuery, params);

  if (toys) {
    return { 
        toys,
        filter,
        sortOrder
    };
  }
  return {
    status: 500,
    body: new Error("Internal Server Error"),
  };
}