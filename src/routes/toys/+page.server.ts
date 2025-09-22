// src/routes/toys/+page.server.ts
import { client } from '$lib/sanityClient';
import type { Toy } from '$lib/types';

export async function load() {
  const groqQuery = '*[_type == "toy"]';
  const toys = await client.fetch<Toy[]>(groqQuery);

  if (toys) {
    return { toys };
  }
  return {
    status: 500,
    body: new Error("Internal Server Error"),
  };
}