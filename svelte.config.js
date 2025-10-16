import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),

		// START: Add this CSP block
		csp: {
			directives: {
				'script-src': ["'self'"],
				'img-src': ["'self'", 'data:', 'cdn.sanity.io'], // Allow images from Sanity's CDN
			},
		},
		// END: Add this CSP block
	}
};

export default config;