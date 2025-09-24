<script lang="ts">
  import type { PageData } from './$types';
  import type { Machine } from '$lib/types';
  import imageUrlBuilder from '@sanity/image-url';
  import { client } from '$lib/sanityClient';
  import Modal from '$lib/components/Modal.svelte'; // <-- Import the Modal

  export let data: PageData;

  // State to manage the modal
  let selectedMachine: Machine | null = null;

  function openModal(machine: Machine) {
    selectedMachine = machine;
  }

  function closeModal() {
    selectedMachine = null;
  }

  const builder = imageUrlBuilder(client);
  function urlFor(source: any) {
    return builder.image(source);
  }

  function formatTitle(value: string | null) {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
  }
</script>

{#if selectedMachine}
  <Modal on:close={closeModal}>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#if selectedMachine.image}
        <img
          src={urlFor(selectedMachine.image).width(800).auto('format').url()}
          alt={selectedMachine.name ?? 'Machine Image'}
          class="rounded-lg shadow-lg w-full"
        />
      {/if}
      <div>
        <h1 class="text-3xl font-bold text-slate-900">{selectedMachine.name}</h1>
        <p class="text-lg text-slate-600 mt-2 capitalize">{selectedMachine.manufacturer}</p>
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

<div class="p-8 bg-gray-50 min-h-screen">
  <h1 class="text-4xl font-bold mb-2 text-center text-slate-800">Our Machines</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {#each data.machines as machine}
      <button on:click={() => openModal(machine)} class="text-left block border rounded-lg shadow-md bg-white overflow-hidden transition-transform hover:scale-105 duration-300">
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
              <p class="text-lg font-bold text-blue-700">${machine.price}</p>
            {/if}
          </div>
        </div>
      </button>
    {/each}
  </div>
</div>