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

<div class="page-grid">
  <div class="contact-header">
    <h1 class="w-800">Let's build something a bit magical</h1>
  </div>
  
  <div class="contact-content">
    <!-- Left Column: Copy + Socials -->
    <div class="contact-info">
      <div class="copy-section">
        <p class="w-400">Open to fun freelance design & development gigs (JS/TS/Svelte/React/Supabase/Nest/ExpressJS).</p>
        <p class="w-300 muted">Melbourne, Australia (AEST/AEDT)</p>
      </div>

      <div class="socials-section">
        <h3 class="w-600">Connect</h3>
        <ul class="socials-list">
          <li>
            <a href="http://au.linkedin.com/in/ben-rhodes-a67a0234" target="_blank" rel="noopener noreferrer" class="social-link">
              <span class="social-icon">💼</span>
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a href="https://github.com/ben-rho-des" target="_blank" rel="noopener noreferrer" class="social-link">
              <span class="social-icon">🐙</span>
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Right Column: Form -->
    <div class="contact-form">
      <form 
        method="POST" 
        action={BUILD_TARGET === 'netlify' ? '/' : FORMSPREE_ENDPOINT}
        data-netlify={BUILD_TARGET === 'netlify' ? 'true' : undefined}
        name={BUILD_TARGET === 'netlify' ? 'contact' : undefined}
        on:submit={handleSubmit}
        class="form"
      >
        <!-- Netlify Forms hidden input -->
        {#if BUILD_TARGET === 'netlify'}
          <input type="hidden" name="form-name" value="contact" />
        {/if}

        <!-- Honeypot field -->
        <div class="honeypot" aria-hidden="true">
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
        <div class="form-group">
          <label for="name" class="w-500">Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            bind:value={formData.name}
            required
            aria-required="true"
            aria-invalid={submitStatus === 'error' && !formData.name}
            class="form-input"
          />
        </div>

        <!-- Email field -->
        <div class="form-group">
          <label for="email" class="w-500">Email *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            bind:value={formData.email}
            required
            aria-required="true"
            aria-invalid={submitStatus === 'error' && !formData.email}
            class="form-input"
          />
        </div>

        <!-- Message field -->
        <div class="form-group">
          <label for="message" class="w-500">Message *</label>
          <textarea 
            id="message" 
            name="message" 
            bind:value={formData.message}
            required
            aria-required="true"
            aria-invalid={submitStatus === 'error' && !formData.message}
            rows="5"
            class="form-textarea"
          ></textarea>
        </div>

        <!-- Submit button -->
        <button 
          type="submit" 
          disabled={isSubmitting}
          class="submit-button w-600"
          aria-live="polite"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        <!-- Status message -->
        {#if submitStatus !== 'idle'}
          <div 
            class="status-message {submitStatus}" 
            role="alert" 
            aria-live="polite"
          >
            {statusMessage}
          </div>
        {/if}
      </form>

      <p class="privacy-note w-300">
        Your message goes straight to my inbox. No newsletters, spam or weirdness.
      </p>
    </div>
  </div>
</div>

<style>
  .page-grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
  }

  .contact-header {
    margin-bottom: 3rem;
  }

  .contact-header h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    margin: 0;
    color: var(--primary);
  }

  .contact-content {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  @media (min-width: 768px) {
    .contact-content {
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .copy-section p {
    margin: 0 0 1rem 0;
    line-height: 1.6;
  }

  .copy-section .muted {
    opacity: 0.7;
    font-size: 0.95rem;
  }

  .socials-section h3 {
    margin: 0 0 1rem 0;
    color: var(--primary);
  }

  .socials-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    transition: all 0.2s ease;
    text-decoration: none;
    color: inherit;
  }

  .social-link:hover {
    background-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  .social-icon {
    font-size: 1.25rem;
  }

  .contact-form {
    background: rgba(255, 255, 255, 0.5);
    padding: 2rem;
    border-radius: 16px;
    border: 1px solid var(--border);
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .honeypot {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 500;
    color: var(--fg);
  }

  .form-input,
  .form-textarea {
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    background: white;
    transition: border-color 0.2s ease;
  }

  .form-input:focus,
  .form-textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 92, 24, 0.1);
  }

  .form-input[aria-invalid="true"],
  .form-textarea[aria-invalid="true"] {
    border-color: #dc2626;
  }

  .form-textarea {
    resize: vertical;
    min-height: 120px;
  }

  .submit-button {
    padding: 1rem 2rem;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .submit-button:hover:not(:disabled) {
    background-color: var(--primary-muted);
    transform: translateY(-2px);
  }

  .submit-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .status-message {
    padding: 1rem;
    border-radius: 8px;
    font-weight: 500;
  }

  .status-message.success {
    background-color: #dcfce7;
    color: #166534;
    border: 1px solid #bbf7d0;
  }

  .status-message.error {
    background-color: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
  }

  .privacy-note {
    margin-top: 1.5rem;
    text-align: center;
    opacity: 0.7;
    font-size: 0.9rem;
  }

  /* Dark mode adjustments */
  body.mode-🌚 .contact-form {
    background: rgba(0, 0, 0, 0.3);
  }

  body.mode-🌚 .form-input,
  body.mode-🌚 .form-textarea {
    background: #333;
    color: white;
    border-color: #555;
  }

  body.mode-🌚 .social-link:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .social-link,
    .submit-button {
      transition: none;
      transform: none;
    }
  }
</style>
