<svelte:head>
  <title>Contact Us | K&K Sales</title>
  <meta name="description" content="Get in touch with K&K Sales. Find our address, phone number, and a map to our Bloomington, Indiana office, or send us a message using our contact form." />
</svelte:head>

<div class="bg-white py-12">
  <div class="container mx-auto px-6">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-extrabold text-slate-900">Contact Us</h1>
      <p class="text-lg text-slate-600 mt-2">We'd love to hear from you. Reach out with any questions or inquiries.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">

        <div class="lg:col-span-3">
        <form 
            method="POST" 
            name="contact"
            action="/contact/success"
            data-netlify="true"
            class="bg-gray-50 p-8 rounded-lg shadow-md space-y-6"
        >
            <input type="hidden" name="form-name" value="contact" />

            <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="name" id="name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>

            <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" name="email" id="email" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            </div>

            <div>
            <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
            <textarea name="message" id="message" rows="6" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
            </div>

            <div>
            <button type="submit" class="w-full rounded-md bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500">
                Send Message
            </button>
            </div>
        </form>
        </div>

      <div class="lg:col-span-2">
        <div>
          <h3 class="text-2xl font-bold text-slate-800 mb-4">Our Location</h3>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3092.836153098523!2d-86.53401568464103!3d39.1558229795321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886c66e2c2297d43%3A0x24b707415b36da43!2sBloomington%2C%20IN!5e0!3m2!1sen!2sus!4v1664402198082!5m2!1sen!2sus" 
            width="100%" 
            height="300" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy"
            class="rounded-lg shadow-md"
          ></iframe>
        </div>

        <div class="mt-8">
          <h3 class="text-2xl font-bold text-slate-800 mb-4">Contact Information</h3>
          <address class="not-italic space-y-3 text-lg text-slate-700">
            <p>123 Main Street<br>Bloomington, IN 47401</p>
            <p><strong>Phone:</strong> <a href="tel:1-812-334-1936" class="text-indigo-600 hover:underline">(812) 334-1936</a></p>
            <p><strong>Email:</strong> <a href="mailto:mail@kksales.com" class="text-indigo-600 hover:underline">mail@kksales.com</a></p>
          </address>
        </div>
      </div>

    </div>
  </div>
</div>