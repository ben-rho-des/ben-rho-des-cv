<script lang="ts">
  import { onMount } from 'svelte';

  // Form state
  let formData = {
    name: '',
    email: '',
    message: '',
    website: '' // honeypot
  };
  
  let isSubmitting = false;
  let submitStatus: 'idle' | 'success' | 'error' = 'idle';
  let statusMessage = '';

  // Environment configuration
  // TODO: Replace with your actual Formspree endpoint
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_ME";
  
  // TODO: Set BUILD_TARGET="netlify" in your environment to enable Netlify Forms instead
  const BUILD_TARGET = import.meta.env.VITE_BUILD_TARGET || 'formspree';

  async function handleSubmit(event: Event) {
    event.preventDefault();
    
    // Honeypot check
    if (formData.website) {
      console.log('Honeypot triggered, ignoring submission');
      return;
    }

    isSubmitting = true;
    submitStatus = 'idle';
    statusMessage = '';

    try {
      if (BUILD_TARGET === 'netlify') {
        // Netlify Forms handling
        const form = event.target as HTMLFormElement;
        const formDataObj = new FormData(form);
        formDataObj.append('form-name', 'contact');
        
        // Submit to Netlify
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formDataObj as any).toString()
        });

        if (response.ok) {
          submitStatus = 'success';
          statusMessage = 'Message sent! I\'ll get back to you within 1-2 business days.';
          form.reset();
          formData = { name: '', email: '', message: '', website: '' };
        } else {
          throw new Error('Submission failed');
        }
      } else {
        // Formspree handling
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: "New message from Ben's site"
          })
        });

        if (response.ok) {
          submitStatus = 'success';
          statusMessage = 'Message sent! I\'ll get back to you within 1-2 business days.';
          formData = { name: '', email: '', message: '', website: '' };
        } else {
          throw new Error('Submission failed');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      submitStatus = 'error';
      statusMessage = 'Something went wrong. Please try again or email me directly.';
    } finally {
      isSubmitting = false;
    }
  }

  // Reset form on page load
  onMount(() => {
    formData = { name: '', email: '', message: '', website: '' };
  });
</script>

<div class="grid grid-cols-6 gap-x-5">
  <!-- Header -->
  <div class="col-span-6 mb-12">
    <h1 class="text-5xl font-bold text-primary">Let's build something a bit magical</h1>
  </div>
  
  <!-- Left Column: Copy + Socials -->
  <div class="col-span-3">
    <div class="space-y-8">
      <div>
        <p class="text-lg text-gray-700 mb-4 leading-relaxed">Open to fun freelance design & development gigs (JS/TS/Svelte/React/Supabase/Nest/ExpressJS).</p>
        <p class="text-gray-500">Melbourne, Australia (AEST/AEDT)</p>
      </div>

      <div>
        <h3 class="text-xl font-semibold text-primary mb-4">Connect</h3>
        <ul class="space-y-3">
          <li>
            <a href="http://au.linkedin.com/in/ben-rhodes-a67a0234" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:-translate-y-0.5 transition-all">
              <span class="text-xl">💼</span>
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a href="https://github.com/ben-rho-des" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:-translate-y-0.5 transition-all">
              <span class="text-xl">🐙</span>
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Right Column: Form -->
  <div class="col-span-3">
    <form 
      method="POST" 
      action={BUILD_TARGET === 'netlify' ? '/' : FORMSPREE_ENDPOINT}
      data-netlify={BUILD_TARGET === 'netlify' ? 'true' : undefined}
      name={BUILD_TARGET === 'netlify' ? 'contact' : undefined}
      on:submit={handleSubmit}
      class="space-y-6"
    >
      <!-- Netlify Forms hidden input -->
      {#if BUILD_TARGET === 'netlify'}
        <input type="hidden" name="form-name" value="contact" />
      {/if}

      <!-- Honeypot field -->
      <div class="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label for="website">Website</label>
        <input 
          type="text" 
          id="website" 
          name="website" 
          bind:value={formData.website}
          data-netlify-honeypot={BUILD_TARGET === 'netlify' ? 'website' : undefined}
          tabindex="-1"
        />
      </div>

      <!-- Name field -->
      <div>
        <label for="name" class="block font-medium mb-2">Name *</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          bind:value={formData.name}
          required
          aria-required="true"
          aria-invalid={submitStatus === 'error' && !formData.name}
          class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <!-- Email field -->
      <div>
        <label for="email" class="block font-medium mb-2">Email *</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          bind:value={formData.email}
          required
          aria-required="true"
          aria-invalid={submitStatus === 'error' && !formData.email}
          class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <!-- Message field -->
      <div>
        <label for="message" class="block font-medium mb-2">Message *</label>
        <textarea 
          id="message" 
          name="message" 
          bind:value={formData.message}
          required
          aria-required="true"
          aria-invalid={submitStatus === 'error' && !formData.message}
          rows="5"
          class="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y"
        ></textarea>
      </div>

      <!-- Submit button -->
      <button 
        type="submit" 
        disabled={isSubmitting}
        class="w-full px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        aria-live="polite"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      <!-- Status message -->
      {#if submitStatus !== 'idle'}
        <div 
          class="p-4 rounded-lg font-medium {submitStatus === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}" 
          role="alert" 
          aria-live="polite"
        >
          {statusMessage}
        </div>
      {/if}
    </form>

    <p class="text-sm text-gray-500 text-center mt-6 opacity-70">
      Your message goes straight to my inbox. No newsletters, spam or weirdness.
    </p>
  </div>
</div>

<!-- Responsive styles -->
<style>
  @media (max-width: 860px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .col-span-3 {
      grid-column: 1 / -1;
    }
    
    .col-span-6 {
      grid-column: 1 / -1;
    }
  }
</style>
