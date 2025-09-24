<script lang="ts">
  import type { PageData } from './$types';
  import type { Toy } from '$lib/types'; // Import the Toy type
  import imageUrlBuilder from '@sanity/image-url';
  import { client } from '$lib/sanityClient';
  import Modal from '$lib/components/Modal.svelte'; // Import our Modal

  export let data: PageData;

  // State to manage the modal
  let selectedToy: Toy | null = null;

  function openModal(toy: Toy) {
    selectedToy = toy;
  }

  function closeModal() {
    selectedToy = null;
  }

  const builder = imageUrlBuilder(client);
  function urlFor(source: any) {
    return builder.image(source);
  }

  function formatTitle(value: string | null) {
      if (!value) return '';
      return value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
</script>

{#if selectedToy}
  <Modal on:close={closeModal}>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#if selectedToy.image}
        <img
          src={urlFor(selectedToy.image).width(800).auto('format').url()}
          alt={selectedToy.name ?? 'Toy Image'}
          class="rounded-lg shadow-lg w-full"
        />
      {/if}

      <div>
        <h1 class="text-3xl font-bold text-slate-900">{selectedToy.name}</h1>
        <p class="text-lg text-slate-600 mt-2 capitalize">{formatTitle(selectedToy.type)}</p>

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

<div class="p-8 bg-gray-50 min-h-screen">
  <h1 class="text-4xl font-bold mb-2 text-center text-slate-800">Our Toys</h1>

  {#if data.filter}
    <div class="text-center mb-8">
      <h2 class="text-2xl text-slate-600">
        Showing: <span class="font-semibold">{formatTitle(data.filter)}</span>
      </h2>
      <a href="/toys" class="text-blue-600 hover:underline text-sm">Clear Filter</a>
    </div>
  {/if}

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {#each data.toys as toy}
      <button on:click={() => openModal(toy)} class="text-left block border rounded-lg shadow-md bg-white overflow-hidden transition-transform hover:scale-105 duration-300">
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
      </button>
    {/each}
  </div>
</div>