// src/routes/contact/+page.server.ts
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, url }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const email = formData.get('email');
		const message = formData.get('message');

		// --- Basic Server-Side Validation (Optional but Recommended) ---
		if (!name || typeof name !== 'string') {
			return fail(400, { name, email, message, error: 'Name is required.' });
		}
		if (!email || typeof email !== 'string' || !email.includes('@')) {
			return fail(400, { name, email, message, error: 'Valid email is required.' });
		}
		if (!message || typeof message !== 'string') {
			return fail(400, { name, email, message, error: 'Message is required.' });
		}
		// --- End Validation ---

		try {
            // Forward the submission to Netlify
            // Netlify expects 'application/x-www-form-urlencoded'
            // We also need to include the hidden 'form-name' field Netlify requires
            const netlifyFormData = new URLSearchParams();
            netlifyFormData.append('form-name', 'contact'); // Match your form's name attribute
            formData.forEach((value, key) => {
                if (typeof value === 'string') { // Ensure value is a string
                    netlifyFormData.append(key, value);
                }
            });

			// We POST to the current page path ('/contact'). Netlify intercepts this.
            // Using `url.pathname` makes sure it works correctly even if the path changes.
			const response = await fetch(url.pathname, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: netlifyFormData.toString()
			});

			if (!response.ok) {
                // If Netlify forwarding fails, return an error
                console.error('Netlify form submission failed:', response.status, await response.text());
                return fail(response.status, { 
                    name, email, message, 
                    error: `Form submission failed (Status: ${response.status}). Please try again later.` 
                });
			}

			// If fetch is successful, Netlify handles the redirect based on the action
            // attribute or defaults (which should lead to /contact/success).
            // We just return a success state for SvelteKit.
			return { success: true };

		} catch (error) {
			console.error('Error submitting form to Netlify:', error);
			return fail(500, { 
                name, email, message, 
                error: 'An internal error occurred. Please try again.' 
            });
		}
	}
};