<script lang="ts">
  import '../app.css';

  // State variables to track if dropdowns are open
  let showMachinesDropdown = false;
  let showToysDropdown = false;

  // We get these directly from your Sanity schemas to keep them in sync!
  const machineTypes = [
    { title: 'Crane Machines', value: 'crane' },
    { title: 'Arcade Machines', value: 'arcade' },
    { title: 'Jukeboxes', value: 'jukebox' },
    { title: 'Pinballs', value: 'pinball' },
    { title: 'Pool Tables', value: 'pool' }
    // Add more as needed
  ];

  const toyTypes = [
    { title: 'Single Plush', value: 'single' },
    { title: 'Medium Plush', value: 'medium' },
    { title: 'Jumbo Plush', value: 'jumbo' },
    { title: 'Plastic Toys', value: 'plastic' },
    { title: 'Bouncing Balls', value: 'bulk_bouncing_balls' }
    // Add more as needed
  ];
</script>

<svelte:head>
  <title>K&K Sales | Crane Machines, Toys, and Arcade Games</title>
  <meta name="description" content="Your trusted source for coin-operated crane machines, toys, arcade games, and more." />
</svelte:head>

<header class="bg-indigo-900 shadow-md relative z-10">
  <nav class="container mx-auto px-6 h-20 flex justify-between items-center">
    <div>
      <a href="/" class="text-2xl font-bold text-white hover:text-indigo-200">
        K&K Sales
      </a>
    </div>

    <div class="flex-grow flex justify-center items-center h-full">
      <div 
        role="button"
        tabindex="0"
        class="relative h-full flex items-center" 
        on:mouseenter={() => showMachinesDropdown = true} 
        on:mouseleave={() => showMachinesDropdown = false}
      >
        <a href="/machines" class="text-white hover:text-indigo-200 transition-colors text-lg px-4">Machines</a>
        {#if showMachinesDropdown}
          <div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48 bg-white rounded-md shadow-lg py-1">
            {#each machineTypes as type}
              <a href="/machines?filter={type.value}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">{type.title}</a>
            {/each}
          </div>
        {/if}
      </div>

      <div 
        role="button"
        tabindex="0"
        class="relative h-full flex items-center" 
        on:mouseenter={() => showToysDropdown = true} 
        on:mouseleave={() => showToysDropdown = false}
      >
        <a href="/toys" class="text-white hover:text-indigo-200 transition-colors text-lg px-4">Toys</a>
        {#if showToysDropdown}
          <div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 bg-white rounded-md shadow-lg py-1">
            {#each toyTypes as type}
              <a href="/toys?filter={type.value}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">{type.title}</a>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <div class="flex items-center h-full">
      <a href="/contact" class="text-white hover:text-indigo-200 transition-colors text-lg px-4">Contact</a>
    </div>
  </nav>
</header>

<main>
  <slot />
</main>

<footer class="bg-indigo-900 text-white text-center p-4 mt-12">
  <p>&copy; {new Date().getFullYear()} K&K Sales. All rights reserved.</p>
</footer>