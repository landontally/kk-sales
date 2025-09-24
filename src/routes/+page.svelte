<script lang="ts">
  import type { PageData } from './$types';
  import imageUrlBuilder from '@sanity/image-url';
  import { client } from '$lib/sanityClient';
  import { onMount } from 'svelte'; // <-- Import onMount

  // Import Swiper styles right away
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/effect-fade';

  export let data: PageData;

  onMount(async () => {
    // We import and register Swiper INSIDE onMount
    const { register } = await import('swiper/element/bundle');
    register();
  });

  const builder = imageUrlBuilder(client);
  function urlFor(source: any) {
    return builder.image(source);
  }
</script>

<div class="w-full">
  <swiper-container
    slides-per-view="1"
    navigation="true"
    pagination="true"
    pagination-clickable="true"
    loop="true"
    effect="fade"
    autoplay-delay="5000"
    autoplay-disable-on-interaction="false"
  >
    {#if data.slides && data.slides.length > 0}
      {#each data.slides as slide}
        <swiper-slide>
          <a href={slide.link ?? '#'} class="block h-[50vh] bg-gray-200">
            <img
              src={urlFor(slide.image).width(1920).height(800).auto('format').url()}
              alt={slide.altText}
              class="w-full h-full object-cover"
            />
          </a>
        </swiper-slide>
      {/each}
    {/if}
  </swiper-container>
</div>

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