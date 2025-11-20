<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';

  const dispatch = createEventDispatcher();
  let dialogElement: HTMLElement; // Reference to the dialog
  
  function closeModal() {
    dispatch('close');
  }

  // Handle click outside the modal content
  function handleClickOutside(event: MouseEvent) {
    if (event.target === dialogElement) {
      closeModal();
    }
  }

  // Handle 'Escape' key press
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  // Focus the modal when it's opened
  onMount(() => {
    // Focus the dialog itself to trap focus
    dialogElement?.focus();

    // Add keydown listener to the window
    window.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    // Clean up listener
    window.removeEventListener('keydown', handleKeydown);
  });

</script>

<div
  bind:this={dialogElement}
  role="dialog"
  aria-modal="true"
  class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
  on:click={handleClickOutside}
  transition:fade={{ duration: 200 }}
  tabindex="-1" 
>
  <div
    class="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
    role="document" 
  >
    <div class="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
      <h3 class="text-xl font-semibold">Product Details</h3>
      <button 
        on:click={closeModal} 
        class="text-3xl leading-none hover:text-red-500"
        aria-label="Close modal" 
      >
        &times;
      </button>
    </div>

    <div class="p-8">
      <slot />
    </div>
  </div>
</div>