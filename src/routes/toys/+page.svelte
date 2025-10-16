<svelte:head>
  <title>{title}</title>
  <meta name="description" content="Explore our huge catalog of plush toys, bouncy balls, novelties, and prizes for your crane machines." />
</svelte:head>

<script lang="ts">
  import type { PageData } from './$types';
  import type { Toy } from '$lib/types';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import imageUrlBuilder from '@sanity/image-url';
  import { client } from '$lib/sanityClient';
  import Modal from '$lib/components/Modal.svelte';

  export let data: PageData;

  $: title = data.filter 
    ? `${formatTitle(data.filter)} | K&K Sales` 
    : 'All Toys | K&K Sales';

  const toyTypes = [
    { title: 'Single Plush', value: 'single' },
    { title: 'Medium Plush', value: 'medium' },
    { title: 'Jumbo Plush', value: 'jumbo' },
    { title: 'Plastic Toys', value: 'plastic' },
    { title: 'Beanies', value: 'beanies' },
    { title: 'Collegiate Beanies', value: 'collegiate' },
    { title: 'Watches', value: 'watches' },
    { title: '5" Rubber Balls', value: '5inch_rubber_balls' },
    { title: 'Bulk & Bouncing Balls', value: 'bulk_bouncing_balls' },
    { title: 'Puffer Balls', value: 'puffer_balls' },
    { title: 'Treasure Chests', value: 'treasure_chests' },
    { title: 'Christmas Toys', value: 'christmas_toys' },
  ];

  let selectedToy: Toy | null = null;
  function openModal(toy: Toy) { selectedToy = toy; }
  function closeModal() { selectedToy = null; }

  const builder = imageUrlBuilder(client);
  function urlFor(source: any) {
    if (!source) return null;
    return builder.image(source);
  }

  function formatTitle(value: string | undefined | null): string {
      if (!value) return '';
      return value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  function handleSortChange(event: Event) {
    const newSortOrder = (event.target as HTMLSelectElement).value;
    const url = new URL($page.url);
    url.searchParams.set('sort', newSortOrder);
    goto(url.toString(), { keepFocus: true, noScroll: true });
  }
</script>

{#if selectedToy}
  <Modal on:close={closeModal}>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#if selectedToy.image}
        <img
          src={urlFor(selectedToy.image)?.width(800).auto('format').url()}
          alt={selectedToy.name ?? 'Toy Image'}
          class="rounded-lg shadow-lg w-full"
        />
      {/if}

      <div>
        <h1 class="text-3xl font-bold text-slate-900">{selectedToy.name}</h1>
        <p class="text-lg text-slate-600 mt-2 capitalize">{formatTitle(selectedToy.type)}</p>

        <div class="mt-4 font-bold text-lg">
          {#if selectedToy.inStock}
            <p class="text-green-600">IN STOCK</p>
          {:else}
            <p class="text-red-600">OUT OF STOCK</p>
          {/if}
        </div>

        <div class="mt-8 p-6 border rounded-lg bg-gray-50">
          {#if selectedToy.callForPrice}
            <a href="mailto:sales@yourcompany.com?subject=Price Inquiry for {selectedToy.name}" class="text-2xl font-bold text-blue-700 hover:underline">
              Please contact us for a price
            </a>
          {:else}
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p class="text-sm text-slate-500">Price/Unit</p>
                <p class="text-2xl font-bold text-slate-800">${selectedToy.unitPrice}</p>
              </div>
              <div>
                <p class="text-sm text-slate-500">Price/Case</p>
                <p class="text-2xl font-bold text-slate-800">${selectedToy.casePrice}</p>
              </div>
              <div>
                <p class="text-sm text-slate-500">Units Per Case</p>
                <p class="text-2xl font-bold text-slate-800">{selectedToy.caseQuantity}</p>
              </div>
            </div>
          {/if}
        </div>
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
          <a href="/toys" class="block w-full text-left text-lg hover:text-indigo-600 transition-colors {!data.filter ? 'font-bold text-indigo-600' : 'text-slate-700'}">
            All Toys
          </a>
        </li>
        {#each toyTypes as type}
          <li>
            <a href="/toys?filter={type.value}" class="block w-full text-left text-lg hover:text-indigo-600 transition-colors {data.filter === type.value ? 'font-bold text-indigo-600' : 'text-slate-700'}">
              {type.title}
            </a>
          </li>
        {/each}
      </ul>
    </aside>

    <main class="lg:col-span-3">
      <div class="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <h1 class="text-4xl font-bold text-slate-800 text-center md:text-left">Our Toys</h1>
        <div>
          <label for="sort" class="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
          <select id="sort" name="sort" class="rounded-md border-gray-300 shadow-sm" on:change={handleSortChange} value={data.sortOrder}>
            <option value="createdAt_desc">Newest</option>
            <option value="name_asc">Alphabetical (A-Z)</option>
            <option value="casePrice_asc">Price: Low to High</option>
            <option value="casePrice_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {#each data.toys as toy}
          <button on:click={() => openModal(toy)} class="text-left block border rounded-lg shadow-md bg-white overflow-hidden transition-transform hover:scale-105 duration-300">
            {#if toy.image}
              <img
                src={urlFor(toy.image)?.width(400).height(300).auto('format').url()}
                alt={toy.name ?? 'Toy image'}
                class="w-full h-48 object-cover"
              />
            {/if}
            <div class="p-4">
              <h2 class="text-xl font-semibold text-slate-900 truncate" title={toy.name}>{toy.name}</h2>
              <div class="mt-4">
                {#if toy.callForPrice}
                  <p class="font-semibold text-blue-700">Contact for Price</p>
                {:else}
                  <p class="font-bold text-blue-700">${toy.casePrice} / Case</p>
                {/if}
              </div>

              <div class="mt-2 font-bold text-sm">
                {#if toy.inStock}
                  <p class="text-green-600">IN STOCK</p>
                {:else}
                  <p class="text-red-600">OUT OF STOCK</p>
                {/if}
              </div>

            </div>
          </button>
        {/each}
      </div>
    </main>
  </div>
</div>