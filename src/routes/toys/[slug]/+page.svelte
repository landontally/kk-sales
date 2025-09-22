<script lang="ts">
  import type { PageData } from './$types';
  import imageUrlBuilder from '@sanity/image-url';
  import { client } from '$lib/sanityClient';

  export let data: PageData;
  const { toy } = data;

  const builder = imageUrlBuilder(client);
  function urlFor(source: any) {
    return builder.image(source);
  }
</script>

<div class="p-8 max-w-4xl mx-auto">
  <h1 class="text-4xl font-bold text-slate-900">{toy.name}</h1>
  <p class="text-xl text-slate-600 mt-2 capitalize">{toy.type?.replace('_', ' ')}</p>

  {#if toy.image}
    <img
      src={urlFor(toy.image).width(800).auto('format').url()}
      alt={toy.name ?? 'Toy Image'}
      class="mt-6 rounded-lg shadow-lg w-full"
    />
  {/if}

  <div class="mt-8 p-6 border rounded-lg bg-gray-50">
    {#if toy.callForPrice}
      <a
        href="mailto:sales@yourcompany.com?subject=Price Inquiry for {toy.name}"
        class="text-2xl font-bold text-blue-700 hover:underline"
      >
        Please contact us for a price
      </a>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <p class="text-sm text-slate-500">Price/Unit</p>
          <p class="text-2xl font-bold text-slate-800">${toy.unitPrice}</p>
        </div>
        <div>
          <p class="text-sm text-slate-500">Price/Case</p>
          <p class="text-2xl font-bold text-slate-800">${toy.casePrice}</p>
        </div>
        <div>
          <p class="text-sm text-slate-500">Units Per Case</p>
          <p class="text-2xl font-bold text-slate-800">{toy.caseQuantity}</p>
        </div>
      </div>
    {/if}
  </div>

  <a href="/toys" class="inline-block mt-12 text-lg text-gray-700 hover:underline">&larr; Back to all toys</a>
</div>