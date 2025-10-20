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
  import { onMount, onDestroy } from 'svelte'; // Import onDestroy
  import { browser } from '$app/environment'; // Import browser check

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

  let isCategoryDropdownOpen = false;
  let categoryDropdownContainer: HTMLElement; // Reference to the dropdown's outer div
  let categoryDropdownButton: HTMLElement; // Reference to the button

  // --- Click Outside Logic for Category Dropdown ---
  function handleCategoryClickOutside(event: MouseEvent) {
    if (
        categoryDropdownContainer && 
        !categoryDropdownContainer.contains(event.target as Node) &&
        categoryDropdownButton &&
        !categoryDropdownButton.contains(event.target as Node)
       ) {
      isCategoryDropdownOpen = false;
    }
  }

  $: if (browser && isCategoryDropdownOpen) {
    setTimeout(() => window.addEventListener('click', handleCategoryClickOutside), 0);
  } else if (browser) {
    window.removeEventListener('click', handleCategoryClickOutside);
  }

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('click', handleCategoryClickOutside);
    }
  });

</script>

<div 
  bind:this={categoryDropdownContainer} class="block lg:hidden mb-6 sticky top-20 z-40 bg-gray-50 py-2 shadow-md border-b border-gray-200"
>
  <div class="container mx-auto px-4">
    <div class="relative">
      <button 
        bind:this={categoryDropdownButton} on:click={() => isCategoryDropdownOpen = !isCategoryDropdownOpen}
        class="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-left text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-between items-center"
        aria-haspopup="true"
        aria-expanded={isCategoryDropdownOpen}
      >
        <span>{data.filter ? formatTitle(data.filter) : 'All Categories'}</span>
        <svg class="w-5 h-5 text-gray-400 transition-transform duration-200 {isCategoryDropdownOpen ? 'rotate-180' : ''}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>

      {#if isCategoryDropdownOpen}
        <div 
          class="absolute mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 max-h-72 overflow-y-auto"
          role="menu" aria-orientation="vertical" aria-labelledby="options-menu"
        >
          <div class="py-1" role="none">
            <a 
              href="/machines" 
              on:click={() => isCategoryDropdownOpen = false} class="block px-4 py-2 text-lg text-gray-700 hover:bg-indigo-50 {!data.filter ? 'font-bold text-indigo-600 bg-indigo-50' : ''}"
              role="menuitem"
            >
              All Machines
            </a>
            {#each machineTypes as type (type.value)}
              <a 
                href="/machines?filter={type.value}" 
                on:click={() => isCategoryDropdownOpen = false} class="block px-4 py-2 text-lg text-gray-700 hover:bg-indigo-50 {data.filter === type.value ? 'font-bold text-indigo-600 bg-indigo-50' : ''}"
                role="menuitem"
              >
                {type.title}
              </a>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

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
        
        <!-- MODIFIED: Now fetches the name from the manufacturer object -->
        <p class="text-lg text-slate-600 mt-2 capitalize">{selectedMachine.manufacturer?.name}</p>        
        <div class="mt-4 font-bold text-lg">
          {#if selectedMachine.inStock}
            <p class="text-green-600">IN STOCK</p>
          {:else}
            <p class="text-red-600">OUT OF STOCK</p>
          {/if}
        </div>
        
        <div class="mt-6">
          {#if selectedMachine.callForPrice}
            <a href="mailto:mail@kksales.com?subject=Price Inquiry for {selectedMachine.name}" class="text-2xl font-bold text-blue-700 hover:underline">
              Please contact Paul Buergler for a price
            </a>
          {:else}
            <p class="text-3xl font-bold text-blue-700">${selectedMachine.price}</p>
          {/if}
        </div>
        
        <!-- MODIFIED: Now fetches the website from the manufacturer object -->
        {#if selectedMachine.manufacturer?.website}
          <a href={selectedMachine.manufacturer.website} target="_blank" rel="noopener noreferrer" class="inline-block mt-4 text-lg text-blue-600 hover:underline">
            Visit Manufacturer's Website &rarr;
          </a>
        {/if}

        <!-- ADDED: This block displays the notes if they exist -->
        {#if selectedMachine.notes}
          <div class="mt-6 pt-4 border-t border-gray-200">
            <h4 class="text-lg font-semibold text-gray-800 mb-2">Notes:</h4>
            <p class="text-gray-600 whitespace-pre-wrap">{selectedMachine.notes}</p>
          </div>
        {/if}

      </div>
    </div>
  </Modal>
{/if}

<div class="container mx-auto p-8">
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
    <aside class="hidden lg:block lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit sticky top-[6.5rem]">
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
                src={urlFor(machine.image)?.width(550).height(600).auto('format').url()}
                alt={machine.name ?? 'Machine image'}
                class="w-full h-48 object-contain"
              />
            {/if}
            <div class="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 class="text-xl font-semibold text-slate-900 truncate" title={machine.name}>{machine.name}</h2>
                <p class="text-slate-600 mt-1 capitalize">{machine.manufacturer?.name}</p>              
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