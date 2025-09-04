<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte';
</script>

<div class="grid grid-cols-6 gap-x-5">
	<PageTitle title="About 🥸" />

	<div class="col-span-4">
		<p>Hey, I'm Ben 👋</p>
		<p>
			I'm a full-stack developer who loves building things that actually make a difference. Right
			now, I'm focused on solidifying myself as a tech lead, leveling up my UI chops, and pushing
			forward into technical leadership while experimenting with new ideas and products.
		</p>
		<p>
			But I'm not just about code. I'm a DIY enthusiast currently transforming a shipping container
			into a home office/studio — lovingly nicknamed the "work womb." I get a huge kick out of
			strategy games like Magic: The Gathering, Hearthstone, and Marvel Snap (studying the meta and
			different playstyles is basically brain yoga for me).
		</p>
		<p>
			Outside of work, you'll probably find me cooking (Mexican and Italian are my go-tos), hanging
			out with my partner Elly, cat Otis and dog Ace. Long term, I've got big dreams of moving
			somewhere more remote to live a little slower and create a little more.
		</p>
		<p>At the heart of everything, my values stay pretty simple:</p>

		<ul class="mb-4 list-inside list-disc space-y-2">
			<li>Be myself</li>
			<li>Stay optimistic</li>
			<li>Have fun and bring light where I can</li>
			<li>Foster safe, supportive spaces</li>
			<li>Care deeply about what I work on</li>
		</ul>

		<p>
			That's me in a nutshell — coding, creating, cooking, and always curious about what's next.
		</p>

		<p>BTW, you can download this entire site and see how it's built:</p>
		<a
			href="https://github.com/ben-rho-des/ben-rho-des-cv"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
		>
			<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path
					d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
				/>
			</svg>
			<span class="font-medium">ben-rho-des/ben-rho-des-cv</span>
		</a>
	</div>
</div>
