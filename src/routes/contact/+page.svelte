<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { onMount } from 'svelte';

	let formData = {
		name: '',
		email: '',
		message: '',
		website: '' // honeypot
	};

	let isSubmitting = false;
	let submitStatus: 'idle' | 'success' | 'error' = 'idle';
	let statusMessage = '';

	const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_ME';
	const BUILD_TARGET = import.meta.env.VITE_BUILD_TARGET || 'formspree';

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (formData.website) {
			return;
		}

		isSubmitting = true;
		submitStatus = 'idle';
		statusMessage = '';

		try {
			if (BUILD_TARGET === 'netlify') {
				const form = event.target as HTMLFormElement;
				const formDataObj = new FormData(form);
				formDataObj.append('form-name', 'contact');

				const response = await fetch('/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: new URLSearchParams(
						Array.from(formDataObj.entries()).map(([key, value]) => [key, String(value)])
					).toString()
				});

				if (response.ok) {
					submitStatus = 'success';
					statusMessage = "Message sent! I'll get back to you within 1-2 business days.";
					form.reset();
					formData = { name: '', email: '', message: '', website: '' };
				} else {
					throw new Error('Submission failed');
				}
			} else {
				const response = await fetch(FORMSPREE_ENDPOINT, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
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
					statusMessage = "Message sent! I'll get back to you within 1-2 business days.";
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

	onMount(() => {
		formData = { name: '', email: '', message: '', website: '' };
	});
</script>

<div class="grid grid-cols-6 gap-x-5">
	<PageTitle title="Let's build something a bit magical" />

	<div class="col-span-3">
		<div class="space-y-8">
			<div>
				<p class="mb-4 text-lg leading-relaxed text-gray-700">
					Open to fun freelance design & development gigs
					(JS/TS/Svelte/React/Supabase/Nest/ExpressJS).
				</p>
				<p class="text-gray-500">Melbourne, Australia (AEST/AEDT)</p>
			</div>

			<div>
				<h3 class="text-primary mb-4 text-xl font-semibold">Connect</h3>
				<ul class="space-y-3">
					<li>
						<a
							href="http://au.linkedin.com/in/ben-rhodes-a67a0234"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 rounded-lg border border-gray-300 p-3 transition-all hover:-translate-y-0.5 hover:bg-gray-50"
						>
							<span class="text-xl">💼</span>
							<span>LinkedIn</span>
						</a>
					</li>
					<li>
						<a
							href="https://github.com/ben-rho-des"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 rounded-lg border border-gray-300 p-3 transition-all hover:-translate-y-0.5 hover:bg-gray-50"
						>
							<span class="text-xl">🐙</span>
							<span>GitHub</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>

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
			<div class="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
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
				<label for="name" class="mb-2 block font-medium">Name *</label>
				<input
					type="text"
					id="name"
					name="name"
					bind:value={formData.name}
					required
					aria-required="true"
					aria-invalid={submitStatus === 'error' && !formData.name}
					class="focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-gray-300 px-3 py-3 focus:ring-2 focus:outline-none"
				/>
			</div>

			<!-- Email field -->
			<div>
				<label for="email" class="mb-2 block font-medium">Email *</label>
				<input
					type="email"
					id="email"
					name="email"
					bind:value={formData.email}
					required
					aria-required="true"
					aria-invalid={submitStatus === 'error' && !formData.email}
					class="focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-gray-300 px-3 py-3 focus:ring-2 focus:outline-none"
				/>
			</div>

			<!-- Message field -->
			<div>
				<label for="message" class="mb-2 block font-medium">Message *</label>
				<textarea
					id="message"
					name="message"
					bind:value={formData.message}
					required
					aria-required="true"
					aria-invalid={submitStatus === 'error' && !formData.message}
					rows="5"
					class="focus:border-primary focus:ring-primary/20 w-full resize-y rounded-lg border border-gray-300 px-3 py-3 focus:ring-2 focus:outline-none"
				></textarea>
			</div>

			<!-- Submit button -->
			<button
				type="submit"
				disabled={isSubmitting}
				class="bg-primary hover:bg-primary/90 w-full rounded-lg px-8 py-4 font-semibold text-white transition-all hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-60"
				aria-live="polite"
			>
				{isSubmitting ? 'Sending...' : 'Send Message'}
			</button>

			<!-- Status message -->
			{#if submitStatus !== 'idle'}
				<div
					class="rounded-lg p-4 font-medium {submitStatus === 'success'
						? 'border border-green-200 bg-green-100 text-green-800'
						: 'border border-red-200 bg-red-100 text-red-800'}"
					role="alert"
					aria-live="polite"
				>
					{statusMessage}
				</div>
			{/if}
		</form>

		<p class="mt-6 text-center text-sm text-gray-500 opacity-70">
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
	}
</style>
