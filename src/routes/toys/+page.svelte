<script lang="ts">
  import type { PageData } from './$types';
  import imageUrlBuilder from '@sanity/image-url';
  import { client } from '$lib/sanityClient';

  export let data: PageData;

  const builder = imageUrlBuilder(client);
  function urlFor(source: any) {
    return builder.image(source);
  }
</script>

<div class="p-8 bg-gray-50 min-h-screen">
  <h1 class="text-4xl font-bold mb-8 text-center text-slate-800">Our Toys</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {#each data.toys as toy}
      <a href="/toys/{toy.slug?.current}" class="block border rounded-lg shadow-md bg-white overflow-hidden transition-transform hover:scale-105 duration-300">
        {#if toy.image}
          <img
            src={urlFor(toy.image).width(400).height(300).auto('format').url()}
            alt={toy.name ?? 'Toy image'}
            class="w-full h-48 object-cover"
          />
        {/if}
        <div class="p-4">
          <h2 class="text-xl font-semibold text-slate-900 truncate" title={toy.name}>{toy.name}</h2>
          <div class="mt-4">
            {#if toy.callForPrice}
              <p class="text-lg font-semibold text-blue-700">Contact for Price</p>
            {:else}
              <p class="text-lg font-bold text-blue-700">${toy.casePrice} / Case</p>
            {/if}
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>