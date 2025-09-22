// src/routes/machines/+page.server.ts
import { client } from '$lib/sanityClient';
import type { Machine } from '$lib/types';

export async function load() {
  // This GROQ query fetches all documents of the type "machine"
  const groqQuery = '*[_type == "machine"]';
  const machines = await client.fetch<Machine[]>(groqQuery);

  if (machines) {
    return {
      machines: machines
    };
  }
  return {
    status: 500,
    body: new Error("Internal Server Error"),
  };
}