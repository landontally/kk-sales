<script lang="ts">
  import '../app.css';
  import { onMount, onDestroy } from 'svelte'; // Import onDestroy
  import { browser } from '$app/environment'; // Import browser check

  // --- State for Dropdowns ---
  let showMachinesDropdown = false;
  let showToysDropdown = false;

  // --- State for Mobile Menu ---
  let isMobileMenuOpen = false;
  let mobileMenuElement: HTMLElement; // Reference to the menu div
  let mobileMenuButton: HTMLElement; // Reference to the button

  // --- Category Lists (no changes) ---
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

  function handleClickOutside(event: MouseEvent) {
    // Check if click is outside the menu AND outside the button that opens it
    if (
        mobileMenuElement && 
        !mobileMenuElement.contains(event.target as Node) &&
        mobileMenuButton && 
        !mobileMenuButton.contains(event.target as Node) 
       ) {
      isMobileMenuOpen = false;
    }
  }

  // Add/remove listener when menu opens/closes
  $: if (browser && isMobileMenuOpen) {
    // Use timeout to prevent immediate closing on the same click that opened it
    setTimeout(() => window.addEventListener('click', handleClickOutside), 0);
  } else if (browser) {
    window.removeEventListener('click', handleClickOutside);
  }

  // Cleanup listener on component destroy
  onDestroy(() => {
    if (browser) {
      window.removeEventListener('click', handleClickOutside);
    }
  });
</script>

<svelte:head>
  <title>K&K Sales | Crane Machines, Plush, and Toys</title>
  <meta name="description" content="Your trusted source for coin-operated crane machines, toys, arcade games, and more." />
</svelte:head>

<header class="bg-sky-700 shadow-md sticky top-0 z-50">
  <nav class="container mx-auto px-4 lg:px-6 h-20 lg:h-24 flex justify-between items-center">

    <div class="flex-shrink-0">
      <a href="/" class="block">
        <img 
          src="/logo.png" 
          alt="K&K Sales Logo" 
          class="h-14 lg:h-20 w-auto transition-transform duration-300 ease-in-out hover:scale-110" 
        />
      </a>
    </div>

    <div class="hidden lg:flex items-center h-full">
      <a href="/" class="text-white hover:text-indigo-200 text-lg px-4">Home</a>

      <div 
        role="button" tabindex="0"
        class="relative h-full flex items-center"
        on:mouseenter={() => showMachinesDropdown = true} 
        on:mouseleave={() => showMachinesDropdown = false}>
        <a href="/machines" class="text-white hover:text-indigo-200 transition-colors text-lg px-4">Machines</a>
        {#if showMachinesDropdown}
          <div class="absolute top-full right-0 pt-2 w-56 bg-white rounded-md shadow-lg py-1">
            {#each machineTypes as type}
              <a href="/machines?filter={type.value}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">{type.title}</a>
            {/each}
          </div>
        {/if}
      </div>

      <div 
        role="button" tabindex="0"
        class="relative h-full flex items-center" 
        on:mouseenter={() => showToysDropdown = true} 
        on:mouseleave={() => showToysDropdown = false}>
        <a href="/toys" class="text-white hover:text-indigo-200 transition-colors text-lg px-4">Toys</a>
        {#if showToysDropdown}
          <div class="absolute top-full right-0 pt-2 w-56 bg-white rounded-md shadow-lg py-1">
            {#each toyTypes as type}
              <a href="/toys?filter={type.value}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100">{type.title}</a>
            {/each}
          </div>
        {/if}
      </div>
      
      <a href="/about" class="text-white hover:text-indigo-200 text-lg px-4">About Us</a>
      <a href="/contact" class="text-white hover:text-indigo-200 text-lg px-4">Contact</a>

      <div class="flex items-center ml-8 pl-4">
        <a href="tel:812-334-1936" class="text-white hover:text-indigo-200 flex items-center gap-2">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          <span class="font-bold text-lg">812-334-1936</span>
        </a>
      </div>
    </div>
    
    <div class="lg:hidden"> 
      <button 
        bind:this={mobileMenuButton} 
        on:click={() => isMobileMenuOpen = !isMobileMenuOpen} 
        class="text-white focus:outline-none"
        aria-label="Toggle navigation menu" 
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
      </button>
    </div>
  </nav>

{#if isMobileMenuOpen}
    <div bind:this={mobileMenuElement} class="lg:hidden bg-sky-700">
      <a href="/" on:click={() => isMobileMenuOpen = false} class="block py-2 px-6 text-white hover:bg-blue-700">Home</a>
      <a href="/machines" on:click={() => isMobileMenuOpen = false} class="block py-2 px-6 text-white hover:bg-blue-700">Machines</a>
      <a href="/toys" on:click={() => isMobileMenuOpen = false} class="block py-2 px-6 text-white hover:bg-blue-700">Toys</a>
      <a href="/about" on:click={() => isMobileMenuOpen = false} class="block py-2 px-6 text-white hover:bg-blue-700">About Us</a>
      <a href="/contact" on:click={() => isMobileMenuOpen = false} class="block py-2 px-6 text-white hover:bg-blue-700">Contact</a>
      <a href="tel:812-334-1936" on:click={() => isMobileMenuOpen = false} class="block py-4 px-6 text-white font-bold hover:bg-blue-700 border-t border-blue-700">Call Us</a>
    </div>
  {/if}

  <div class="border-t border-white">
    <div class="container mx-auto h-4">
      </div>
  </div>
</header>

<main class="bg-white">
  <slot />
</main>

<footer class="bg-sky-700 text-white">
  <div class="container mx-auto py-12 px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div>
        <h3 class="font-bold text-lg mb-4">Information</h3>
        <ul class="space-y-2">
          <li><a href="/" class="hover:underline">Home</a></li>
          <li><a href="/about" class="hover:underline">About Us</a></li>
          <li><a href="/contact" class="hover:underline">Contact Us</a></li>
        </ul>
      </div>

      <div>
        <h3 class="font-bold text-lg mb-4">Machines</h3>
        <ul class="space-y-2">
          {#each machineTypes.slice(0, 5) as type}
            <li><a href="/machines?filter={type.value}" class="hover:underline">{type.title}</a></li>
          {/each}
          {#if machineTypes.length > 5}
            <li><a href="/machines" class="hover:underline font-semibold">View All...</a></li>
          {/if}
        </ul>
      </div>

      <div>
        <h3 class="font-bold text-lg mb-4">Toys</h3>
        <ul class="space-y-2">
          {#each toyTypes.slice(0, 5) as type}
            <li><a href="/toys?filter={type.value}" class="hover:underline">{type.title}</a></li>
          {/each}
          {#if toyTypes.length > 5}
            <li><a href="/toys" class="hover:underline font-semibold">View All...</a></li>
          {/if}
        </ul>
      </div>

      <div>
        <h3 class="font-bold text-lg mb-4">Contact K&K Sales</h3>
        <address class="not-italic space-y-2">
          <p>1440 South Liberty Drive</p>
          <p>Bloomington, IN 47403</p>
          <p>
            <a href="tel:812-334-1936" class="hover:underline">812-334-1936</a>
          </p>
          <p>
            <a href="mailto:mail@kksales.com" class="hover:underline">mail@kksales.com</a>
          </p>
        </address>
          <div class="mt-4">
            <a href="https://www.facebook.com/profile.php?id=61556391602105" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.69h-2.474v-2.891h2.474v-2.172 c0-2.45,1.442-3.818,3.715-3.818c1.064,0,1.979,0.079,2.245,0.114v2.547h-1.498c-1.189,0-1.42,0.565-1.42,1.396v1.821h2.83l-0.368,2.891h-2.462v7.186C18.307,21.153,22,17.013,22,12C22,6.477,17.523,2,12,2z"></path>
              </svg>
              Follow us on Facebook
            </a>
          </div>
      </div>
    </div>

    <div class="mt-12 border-t border-stone-50 pt-8 text-center text-sm text-indigo-200">
      <p>&copy; {new Date().getFullYear()} K&K Sales. All rights reserved.</p>
    </div>
  </div>
</footer>