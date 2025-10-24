// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		prerender: { // Ensure this section exists
		  entries: [
		    '/contact', 
		    '/contact/success'
		    // You can add '/about' etc. here too if they are static
		  ],
		  handleHttpError: 'warn' 
		},
		csp: { /* ... your csp settings ... */	},
	}
};

export default config;