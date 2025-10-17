<svelte:head>
  <title>K&K Sales | Homepage</title>
  <meta name="description" content="Welcome to K&K Sales, your trusted source for coin-operated amusements, toys, and more." />
</svelte:head>

<script lang="ts">
  import type { PageData } from './$types';
  import imageUrlBuilder from '@sanity/image-url';
  import { client } from '$lib/sanityClient';
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css';
  import { onMount } from 'svelte';
  import type { Toy, Machine } from '$lib/types';
  import Modal from '$lib/components/Modal.svelte';

  export let data: PageData;
  
  // Toy Modal Logic
  let selectedToy: Toy | null = null;
  function openToyModal(toy: Toy) { selectedToy = toy; }
  function closeToyModal() { selectedToy = null; }

  // START: Add Machine Modal Logic
  let selectedMachine: Machine | null = null;
  function openMachineModal(machine: Machine) { selectedMachine = machine; }
  function closeMachineModal() { selectedMachine = null; }
  // END: Add Machine Modal Logic

  const builder = imageUrlBuilder(client);
  function urlFor(source: any) {
    if (!source) return null;
    return builder.image(source);
  }

  function formatTitle(value: string | undefined | null): string {
      if (!value) return '';
      return value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
</script>

{#if selectedToy}
  <Modal on:close={closeToyModal}>
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

{#if selectedMachine}
  <Modal on:close={closeMachineModal}>
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

<div class="w-full">
  <Splide options={{
    type: 'loop',
    rewind: true,
    perPage: 1,
    autoplay: true,
    interval: 7500,
    pauseOnHover: true,
    gap: '1rem',
  }}>
    {#if data.slides && data.slides.length > 0}
      {#each data.slides as slide}
        <SplideSlide>
          <a 
            href={slide.link ?? '#'} 
            class="block w-full bg-gray-900 h-[70vh] md:h-[60vh] lg:h-[50vh]"
          >
            <picture class="w-full h-full block">
              {#if slide.imageMobile}
                <source
                  media="(max-width: 767px)"
                  srcset={urlFor(slide.imageMobile)?.width(800).height(1000).auto('format').url()}
                />
              {/if}
              {#if slide.imageTablet}
                <source
                  media="(max-width: 1023px)"
                  srcset={urlFor(slide.imageTablet)?.width(1023).height(600).auto('format').url()}
                />
              {/if}
              {#if slide.imageDesktop}
                <img
                  src={urlFor(slide.imageDesktop)?.width(1920).height(700).auto('format').url()}
                  alt={slide.altText}
                  class="w-full h-full object-cover"
                />
              {/if}
            </picture>
          </a>
        </SplideSlide>
      {/each}
    {/if}
  </Splide>
</div>

{#if data.eventBanner && data.eventBanner.image}
  <div class="container mx-auto px-8 py-10">
    <a 
      href={data.eventBanner.link} 
      target="_blank" 
      rel="noopener noreferrer"
      class="block w-full md:w-3/4 lg:w-1/2 mx-auto rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
    >
      <img 
        src={urlFor(data.eventBanner.image)?.width(1200).auto('format').url()}
        alt={data.eventBanner.altText}
        class="w-full h-auto"
      />
    </a>
  </div>
{/if}

<div class="container mx-auto p-8 text-center">
  <h1 class="text-5xl font-extrabold text-slate-900 mt-12">
    Welcome to K&K Sales
  </h1>
  <p class="text-xl text-slate-600 mt-4 max-w-2xl mx-auto">
    Your trusted source for coin-operated crane machines, toys, arcade games, and more for over 50 years.
  </p>
  <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    <a href="/machines" class="block p-8 border rounded-lg shadow-lg bg-white hover:bg-blue-50 hover:shadow-xl transition-all">
      <h2 class="text-3xl font-bold text-blue-700">View Our Machines</h2>
      <p class="mt-2 text-slate-500">
        Explore our wide selection of new and reconditioned crane and arcade machines.
      </p>
    </a>
    <a href="/toys" class="block p-8 border rounded-lg shadow-lg bg-white hover:bg-green-50 hover:shadow-xl transition-all">
      <h2 class="text-3xl font-bold text-green-700">Browse Our Toys</h2>
      <p class="mt-2 text-slate-500">
        From jumbo plush to bouncy balls, find the perfect prizes for your machines.
      </p>
    </a>
  </div>
</div>

<div class="w-full py-8">
  <div class="container mx-auto">
    <h2 class="text-3xl font-bold text-center mb-8 text-slate-800">Our Newest Toys</h2>
    <Splide options={{
      type: 'loop',
      perPage: 5,
      perMove: 1,
      gap: '1.5rem',
      pagination: false,
      drag: true,
      breakpoints: {
        1280: { perPage: 4 },
        1024: { perPage: 3 },
        768: { perPage: 2 },
        640: { perPage: 1 },
      }
    }}>
      {#if data.latestToys && data.latestToys.length > 0}
        {#each data.latestToys as toy}
          <SplideSlide class="p-4">
            <div
              role="button"
              tabindex="0"
              on:click={() => openToyModal(toy)}
              on:keydown={(e) => e.key === 'Enter' && openToyModal(toy)}
              class="cursor-pointer h-full border rounded-lg shadow-md bg-white overflow-hidden transition-transform hover:scale-105 duration-300"
            >
              {#if toy.image}
                <img
                  src={urlFor(toy.image)?.width(400).height(400).auto('format').url()}
                  alt={toy.name}
                  class="w-full h-64 object-contain pointer-events-none"
                />
              {/if}
              <div class="p-4">
                <h3 class="text-lg font-semibold text-slate-900 truncate">
                  {toy.name}
                </h3>
                <div class="mt-2">
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
            </div>
          </SplideSlide>
        {/each}
      {/if}
    </Splide>
  </div>
</div>

<div class="w-full py-8">
  <div class="container mx-auto">
    <h2 class="text-3xl font-bold text-center mb-8 text-slate-800">The Latest Machines</h2>
    <Splide options={{
      type: 'loop',
      perPage: 5,
      perMove: 1,
      gap: '1.5rem',
      pagination: false,
      breakpoints: {
        1280: { perPage: 4 },
        1024: { perPage: 3 },
        768: { perPage: 2 },
        640: { perPage: 1 },
      }
    }}>
      {#if data.latestMachines && data.latestMachines.length > 0}
        {#each data.latestMachines as machine}
          <SplideSlide class="p-4">
            <div
              role="button"
              tabindex="0"
              on:click={() => openMachineModal(machine)}
              on:keydown={(e) => e.key === 'Enter' && openMachineModal(machine)}
              class="cursor-pointer h-full border rounded-lg shadow-md bg-white overflow-hidden transition-transform hover:scale-105 duration-300"
            >
              {#if machine.image}
                <img
                  src={urlFor(machine.image)?.width(400).height(400).auto('format').url()}
                  alt={machine.name}
                  class="w-full h-64 object-contain pointer-events-none"
                />
              {/if}
              <div class="p-4">
                <h3 class="text-lg font-semibold text-slate-900 truncate">{machine.name}</h3>
                <div class="mt-2">
                  {#if machine.callForPrice}
                    <p class="font-semibold text-blue-700">Contact for Price</p>
                  {:else}
                    <p class="font-bold text-blue-700">${machine.price}</p>
                  {/if}
                </div>
                <div class="mt-2 font-bold text-sm">
                  {#if machine.inStock}
                    <p class="text-green-600">IN STOCK</p>
                  {:else}
                    <p class="text-red-600">OUT OF STOCK</p>
                  {/if}
                </div>
              </div>
            </div>
          </SplideSlide>
        {/each}
      {/if}
    </Splide>
  </div>
</div>