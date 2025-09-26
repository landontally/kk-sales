<script lang="ts">
  import '../app.css';

  let showMachinesDropdown = false;
  let showToysDropdown = false;

  // Updated Machine Types
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

  // Updated Toy Types
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
</script>

<svelte:head>
  <title>K&K Sales | Crane Machines, Toys, and Arcade Games</title>
  <meta name="description" content="Your trusted source for coin-operated crane machines, toys, arcade games, and more." />
</svelte:head>

<header class="bg-blue-950 shadow-md relative z-10">
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
      <a href="/about" class="text-white hover:text-indigo-200 transition-colors text-lg px-4">About Us</a>
      <a href="/contact" class="text-white hover:text-indigo-200 transition-colors text-lg px-4">Contact Us</a>
    </div>

    <div class="flex items-center">
      <a href="tel:1-800-555-5555" class="text-white hover:text-indigo-200 flex items-center gap-2 text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5h-1.528a13.942 13.942 0 01-11.02-6.5A13.942 13.942 0 013.528 3.5H2z" clip-rule="evenodd" />
        </svg>
        <span class="hidden md:inline font-bold">812-334-1936</span>
      </a>
    </div>
  </nav>
</header>

<main>
  <slot />
</main>

<footer class="bg-blue-950 text-white">
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
            <a href="mailto:sales@yourcompany.com" class="hover:underline">mail@kksales.com</a>
          </p>
        </address>
          <div class="mt-4">
            <a href="https://www.facebook.com/your-page-url" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.69h-2.474v-2.891h2.474v-2.172 c0-2.45,1.442-3.818,3.715-3.818c1.064,0,1.979,0.079,2.245,0.114v2.547h-1.498c-1.189,0-1.42,0.565-1.42,1.396v1.821h2.83l-0.368,2.891h-2.462v7.186C18.307,21.153,22,17.013,22,12C22,6.477,17.523,2,12,2z"></path>
              </svg>
              Follow us on Facebook
            </a>
          </div>
      </div>
    </div>

    <div class="mt-12 border-t border-indigo-700 pt-8 text-center text-sm text-indigo-200">
      <p>&copy; {new Date().getFullYear()} K&K Sales. All rights reserved.</p>
    </div>
  </div>
</footer>