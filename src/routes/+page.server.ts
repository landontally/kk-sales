// src/routes/+page.server.ts
import { client } from '$lib/sanityClient';

export async function load() {
  const groqQuery = `*[_type == "heroSlide"]`;
  const slides = await client.fetch(groqQuery);

  if (slides) {
    return { slides };
  }
  return {
    status: 500,
    body: new Error("Internal Server Error"),
  };
}