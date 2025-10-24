<svelte:head>
  <title>K&K Sales | Contact Us</title>
  <meta name="description" content="Contact us to purchase toys, plush, and our game machines!" />
</svelte:head>

<script lang="ts">
  // This is a Svelte component for a contact page.
  // It's designed to be used with SvelteKit and styled with Tailwind CSS.
  // The form is configured to work with Netlify Forms for submission handling and spam protection.

  const officeInfo = {
    addressLine1: "1440 South Liberty Drive",
    addressLine2: "Bloomington, IN 47403",
    phone: "(812) 334-1936",
    facebookUrl: "https://www.facebook.com/profile.php?id=61556391602105",
  };

  // Google Maps embed URL, zoomed in on the specific address.
  const mapSrc = "https://maps.google.com/maps?q=1440%20South%20Liberty%20Drive%2C%20Bloomington%2C%20Indiana%2047403&t=&z=16&ie=UTF8&iwloc=&output=embed";
</script>

<div class="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
        Get in Touch
      </h1>
      <p class="mt-4 text-xl text-gray-600">
        We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
      </p>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 py-8">

      <!-- Left Column: Contact Form -->
      <div class="bg-white p-8 rounded-2xl shadow-lg">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Send a Message</h2>
        
        <!-- Netlify Form -->
        <form name="contact" method="POST" netlify data-netlify-honeypot="bot-field" data-sveltekit-reload action="/contact/success">
          <input type="hidden" name="form-name" value="contact" />
          <p class="hidden"><label>Bot field: <input name="bot-field" /></label></p>

          <div>
            <label for="full-name">Full Name</label>
            <input type="text" name="name" id="full-name" required>
          </div>

          <div>
            <button type="submit">Submit Test</button>
          </div>
        </form>
      </div>

      <!-- Right Column: Map and Info -->
      <div class="space-y-8">
        <!-- Map -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
           <iframe
            src="{mapSrc}"
            width="100%"
            height="350"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Office Location Map"
          ></iframe>
        </div>

        <!-- Office Information -->
        <div class="bg-white p-8 rounded-2xl shadow-lg">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Office</h3>
          <div class="space-y-4 text-gray-600 text-lg">
            <p class="flex items-start">
              <svg class="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>{officeInfo.addressLine1}<br>{officeInfo.addressLine2}</span>
            </p>
            <p class="flex items-center">
              <svg class="w-6 h-6 mr-3 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>{officeInfo.phone}</span>
            </p>
             <a href="{officeInfo.facebookUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors">
              <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path></svg>
              <span>Find us on Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

