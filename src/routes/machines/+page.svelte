<svelte:head>
  <title>{title}</title>
  <meta name="description" content="Browse our wide selection of new and reconditioned crane machines, arcade games, pinball, and more." />
</svelte:head>

<script lang="ts">
  import type { PageData } from './$types';
  import type { Machine } from '$lib/types';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import imageUrlBuilder from '@sanity/image-url';
  import { client } from '$lib/sanityClient';
  import Modal from '$lib/components/Modal.svelte';

  export let data: PageData;

  $: title = data.filter 
    ? `${formatTitle(data.filter)} | K&K Sales` 
    : 'All Machines | K&K Sales';

  const machineTypes = [
    { title: 'Crane Machines', value: 'crane' },
    { title: 'Arcade Machines', value: 'arcade' },
    { title: 'Jukeboxes', value: 'jukebox' },
    { title: 'Pinballs', value: 'pinball' },
    { title: 'Pool Tables', value: 'pool' },
    { title: 'Changers', value: 'changer' },
    { title: 'Rides', value: 'ride' },
    { title: 'Redemption', value: 'redemption' },
    { title: 'Bulk Vending', value: 'bulk_vending' },
    { title: 'Air Hockey', value: 'air_hockey' },
    { title: 'Self Merchandisers', value: 'self_merchandiser' },
    { title: 'Reconditioned Equipment', value: 'reconditioned' },
  ];

  let selectedMachine: Machine | null = null;
  function openModal(machine: Machine) { selectedMachine = machine; }
  function closeModal() { selectedMachine = null; }

  const builder = imageUrlBuilder(client);
  function urlFor(source: any) {
    if (!source) return null;
    return builder.image(source);
  }
  
  function formatTitle(value: string | null | undefined) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function handleSortChange(event: Event) {
    const newSortOrder = (event.target as HTMLSelectElement).value;
    const url = new URL($page.url);
    url.searchParams.set('sort', newSortOrder);
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }
</script>

{#if selectedMachine}
  <Modal on:close={closeModal}>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#if selectedMachine.image}
        <img
          src={urlFor(selectedMachine.image)?.width(800).auto('format').url()}
          alt={selectedMachine.name ?? 'Machine Image'}
          class="rounded-lg shadow-lg w-full"
        />
      {/if}
      <div>
        <h1 class="text-3xl font-bold text-slate-900">{selectedMachine.name}</h1>
        <p class="text-lg text-slate-600 mt-2 capitalize">{selectedMachine.manufacturer}</p>
        <div class="mt-4 font-bold text-lg">
          {#if selectedMachine.inStock}
            <p class="text-green-600">IN STOCK</p>
          {:else}
            <p class="text-red-600">OUT OF STOCK</p>
          {/if}
        </div>
        <div class="mt-6">
          {#if selectedMachine.callForPrice}
            <a href="mailto:sales@yourcompany.com?subject=Price Inquiry for {selectedMachine.name}" class="text-2xl font-bold text-blue-700 hover:underline">
              Please contact us for a price
            </a>
          {:else}
            <p class="text-3xl font-bold text-blue-700">${selectedMachine.price}</p>
          {/if}
        </div>
        {#if selectedMachine.manufacturerWebsite}
          <a href={selectedMachine.manufacturerWebsite} target="_blank" rel="noopener noreferrer" class="inline-block mt-4 text-lg text-blue-600 hover:underline">
            Visit Manufacturer's Website &rarr;
          </a>
        {/if}
      </div>
    </div>
  </Modal>
{/if}

<div class="container mx-auto p-8">
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <aside class="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
      <h3 class="text-xl font-bold mb-4 text-slate-800">Categories</h3>
      <ul class="space-y-2">
        <li>
          <a href="/machines" class="block w-full text-left text-lg hover:text-indigo-600 transition-colors {!data.filter ? 'font-bold text-indigo-600' : 'text-slate-700'}">
            All Machines
          </a>
        </li>
        {#each machineTypes as type}
          <li>
            <a href="/machines?filter={type.value}" class="block w-full text-left text-lg hover:text-indigo-600 transition-colors {data.filter === type.value ? 'font-bold text-indigo-600' : 'text-slate-700'}">
              {type.title}
            </a>
          </li>
        {/each}
      </ul>
    </aside>

    <main class="lg:col-span-3">
      <div class="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <h1 class="text-4xl font-bold text-slate-800 text-center md:text-left">Our Machines</h1>
        <div>
          <label for="sort" class="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
          <select id="sort" name="sort" class="rounded-md border-gray-300 shadow-sm" on:change={handleSortChange} value={data.sortOrder}>
            <option value="createdAt_desc">Newest</option>
            <option value="name_asc">Alphabetical (A-Z)</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {#each data.machines as machine}
          <button on:click={() => openModal(machine)} class="cursor-pointer text-left block border rounded-lg shadow-md bg-white overflow-hidden transition-transform hover:scale-105 duration-300">
            {#if machine.image}
              <img
                src={urlFor(machine.image)?.width(400).height(300).auto('format').url()}
                alt={machine.name ?? 'Machine image'}
                class="w-full h-48 object-cover"
              />
            {/if}
            <div class="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 class="text-xl font-semibold text-slate-900 truncate" title={machine.name}>{machine.name}</h2>
                <p class="text-slate-600 mt-1 capitalize">{machine.manufacturer}</p>
              </div>
              <div class="mt-4">
                {#if machine.callForPrice}
                  <p class="font-semibold text-blue-700">Contact for Price</p>
                {:else}
                  <p class="font-bold text-blue-700">${machine.price}</p>
                {/if}
                <div class="mt-2 font-bold text-sm">
                  {#if machine.inStock}
                    <p class="text-green-600">IN STOCK</p>
                  {:else}
                    <p class="text-red-600">OUT OF STOCK</p>
                  {/if}
                </div>
              </div>
            </div>
            </button>
        {/each}
      </div>
    </main>
  </div>
</div>