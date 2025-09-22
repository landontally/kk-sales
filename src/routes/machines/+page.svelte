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
  <h1 class="text-4xl font-bold mb-8 text-center text-slate-800">Our Machines</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {#each data.machines as machine}
      <a href="/machines/{machine.slug?.current}" class="block border rounded-lg shadow-md bg-white overflow-hidden transition-transform hover:scale-105 duration-300">
        {#if machine.image}
          <img
            src={urlFor(machine.image).width(400).height(300).auto('format').url()}
            alt={machine.name ?? 'Machine image'}
            class="w-full h-48 object-cover"
          />
        {/if}
        <div class="p-4">
          <h2 class="text-xl font-semibold text-slate-900 truncate" title={machine.name}>{machine.name}</h2>
          <p class="text-slate-600 mt-1 capitalize">{machine.manufacturer}</p>
          
          <div class="mt-4">
            {#if machine.callForPrice}
              <p class="text-lg font-semibold text-blue-700">Contact for Price</p>
            {:else}
              <p class="text-lg font-bold text-blue-700">{machine.price}</p>
            {/if}
          </div>
          </div>
      </a>
    {/each}
  </div>
</div>