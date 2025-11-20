<svelte:head>
  <title>K&K Sales | Contact Us</title>
  <meta name="description" content="Contact us to purchase toys, plush, and our game machines!" />
</svelte:head>

<script lang="ts">
  // Page constants for office info and map
  const officeInfo = {
    addressLine1: "1440 South Liberty Drive",
    addressLine2: "Bloomington, IN 47403",
    phone: "(812) 334-1936",
    facebookUrl: "https://www.facebook.com/profile.php?id=61556391602105",
  };
  
  // <--! IMPORTANT: Ensure this matches your actual Google Maps Embed URL !-->
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3094.654877797745!2d-86.55018618464236!3d39.13697997953463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886c66c306b9b357%3A0x882cf85662f3a4b!2s1440%20S%20Liberty%20Dr%2C%20Bloomington%2C%20IN%2047403!5e0!3m2!1sen!2sus!4v1698176211235!5m2!1sen!2sus";
</script>

<div class="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
        Get in Touch
      </h1>
      <p class="mt-4 text-xl text-gray-600">
        We'd love to hear from you.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 py-8">

      <div class="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-center">
        
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Ready to Order?</h2>

        <div>
          <h3 class="text-2xl font-semibold text-gray-800 mb-4">By Phone</h3>
          <div class="space-y-4 text-slate-700">
            <p class="text-xl font-medium leading-relaxed">
              Call us at <a href="tel:812-334-1936" class="text-blue-700 hover:underline font-bold whitespace-nowrap">(812) 334-1936</a> and ask for:
            </p>
            <ul class="list-disc list-inside space-y-3 text-lg">
              <li><strong>Roz King</strong> to inquire about toys.</li>
              <li><strong>Paul Buergler</strong> to ask about our machines.</li>
            </ul>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200">
          <h3 class="text-2xl font-semibold text-gray-800 mb-4">By Email</h3>
          
          <div class="flex items-center">
            <svg class="w-7 h-7 mr-4 text-blue-600 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:mail@kksales.com" class="text-xl font-medium text-blue-700 hover:underline break-all">
              mail@kksales.com
            </a>
          </div>
          
          <p class="text-lg text-slate-600 mt-4">
            Send us your questions, and we'll get back to you as soon as possible.
          </p>
        </div>

      </div>
      <div class="space-y-8">
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

        <div class="bg-white p-8 rounded-2xl shadow-lg">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Office</h3>
          <div class="space-y-4 text-gray-600 text-lg">
            <p class="flex items-start">
              <svg class="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>{officeInfo.addressLine1}<br>{officeInfo.addressLine2}</span>
            </p>
            <p class="flex items-center">
              <svg class="w-6 h-6 mr-3 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span>{officeInfo.phone}</span>
            </p>
             <a href="{officeInfo.facebookUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors" aria-label="Visit K&K Sales on Facebook">
              <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
              </svg>
              <span>Find us on Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>