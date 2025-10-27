// src/routes/contact/+page.server.ts
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, url }) => { // url is available here
		const formData = await request.formData();
		const name = formData.get('name');
		const email = formData.get('email');
		const message = formData.get('message');

		// --- Basic Validation ---
		if (!name || typeof name !== 'string') { /* ... fail ... */ }
		if (!email || typeof email !== 'string' || !email.includes('@')) { /* ... fail ... */ }
		if (!message || typeof message !== 'string') { /* ... fail ... */ }
		// --- End Validation ---

		try {
			const netlifyFormData = new URLSearchParams();
			netlifyFormData.append('form-name', 'contact');
			formData.forEach((value, key) => {
				if (typeof value === 'string') {
					netlifyFormData.append(key, value);
				}
			});

			// --- MODIFICATION IS HERE ---
			// Construct the full URL using the origin provided by SvelteKit
			const postUrl = url.origin + url.pathname; 

			const response = await fetch(postUrl, { // Use the full URL
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: netlifyFormData.toString()
			});
			// --- END MODIFICATION ---


			if (!response.ok) {
				console.error('Netlify form submission failed:', response.status, await response.text());
				return fail(response.status, { /* ... error data ... */ });
			}

			return { success: true };

		} catch (error) {
			console.error('Error submitting form to Netlify:', error);
			return fail(500, { /* ... error data ... */ });
		}
	}
};