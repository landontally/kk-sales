<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('close');
  }
</script>

<div
  role="dialog"
  aria-modal="true"
  class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
  on:click={closeModal}
  transition:fade={{ duration: 200 }}
>
  <div
    class="bg-white rounded-lg shadow-2xl max-w-4xl w-full m-8 max-h-[90vh] overflow-y-auto"
    on:click|stopPropagation
  >
    <div class="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
      <h3 class="text-xl font-semibold">Product Details</h3>
      <button on:click={closeModal} class="text-3xl leading-none hover:text-red-500">&times;</button>
    </div>

    <div class="p-8">
      <slot />
    </div>
  </div>
</div>