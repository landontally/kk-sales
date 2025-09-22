<script lang="ts">
  import type { PageData } from './$types';
  import imageUrlBuilder from '@sanity/image-url';
  import { client } from '$lib/sanityClient';

  export let data: PageData;
  const { machine } = data;

  const builder = imageUrlBuilder(client);
  function urlFor(source: any) {
    return builder.image(source);
  }
</script>

<div class="p-8 max-w-4xl mx-auto">
  <h1 class="text-4xl font-bold text-slate-900">{machine.name}</h1>
  <p class="text-xl text-slate-600 mt-2 capitalize">{machine.manufacturer}</p>

  {#if machine.image}
    <img
      src={urlFor(machine.image).width(800).auto('format').url()}
      alt={machine.name ?? 'Machine Image'}
      class="mt-6 rounded-lg shadow-lg w-full"
    />
  {/if}

  <div class="mt-8">
    {#if machine.callForPrice}
      <a
        href="mailto:mail@kksales.com?subject=Price Inquiry for {machine.name}"
        class="text-2xl font-bold text-blue-700 hover:underline"
      >
        Please contact us for a price
      </a>
    {:else}
      <p class="text-3xl font-bold text-blue-700">{machine.price}</p>
    {/if}
    {#if machine.manufacturerWebsite}
        <a href={machine.manufacturerWebsite} target="_blank" rel="noopener noreferrer" class="block mt-4 text-lg text-blue-600 hover:underline">
            Visit Manufacturer's Website &rarr;
        </a>
    {/if}
  </div>

   <a href="/machines" class="inline-block mt-12 text-lg text-gray-700 hover:underline">&larr; Back to all machines</a>
</div>