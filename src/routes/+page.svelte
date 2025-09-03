<script lang="ts">
	import Kaleidoscope from '$lib/components/Kaleidoscope.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { modeStore } from '$lib/stores/mode';
	import { tweened } from 'svelte/motion';

	// Configuration
	const titleOptions = [
		'end times thin hope',
		'singularity inevitable',
		'high tech low life',
		'all doom and gloom'
	];

	const imageOptions = [
		'cah.png',
		'lah.png',
		'rah.png',
		'tah.png',
		'tee.png',
		'mah.png',
		'meh.png',
		'owe.png'
	];

	let mode = 'loop';
	let segments = 8;
	let scaleFactor = 1;
	let motionFactor = 1;
	let opacity = 1;
	let showControls = false;

	// Animated imageAspect that grows and shrinks
	const imageAspect = tweened(0.5, {
		duration: 13000,
		easing: (t) => 0.5 * (1 + Math.sin(t * Math.PI))
	});

	// Random selection variables - initialize immediately
	let selectedTitle = titleOptions[Math.floor(Math.random() * titleOptions.length)];
	let imageSrc = imageOptions[Math.floor(Math.random() * imageOptions.length)];

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === '`' || event.key === '~') {
			showControls = !showControls;
		}
	}

	onMount(() => {
		if (browser) {
			document.addEventListener('keydown', handleKeyPress);
			// Automatically enable grid mode for kaleidoscope
			modeStore.setGrid(true);

			// Start the imageAspect animation loop
			startImageAspectAnimation();
		}
	});

	function startImageAspectAnimation() {
		const animate = () => {
			// Start from 0.5 and animate to 1.5
			imageAspect.set(1.5, { duration: 13000 });
			setTimeout(() => {
				// Then animate back to 0.5
				imageAspect.set(0.5, { duration: 13000 });
				setTimeout(animate, 13000);
			}, 13000);
		};
		// Start the animation after a small delay to ensure smooth start
		setTimeout(animate, 100);
	}

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('keydown', handleKeyPress);
			// Clean up grid mode when leaving kaleidoscope
			modeStore.setGrid(false);
		}
	});
</script>

<svelte:head>
	<title>Ben-rho-des cv website</title>
</svelte:head>

<div class="flex flex-col items-center justify-center">
	<h1 class="hero-font display-font text-20xl text-center uppercase" data-text={selectedTitle}>
		{selectedTitle}
	</h1>
	<div class="display-font-alt bubble text-center text-3xl uppercase">gl+hf</div>
</div>
<div class="fixed top-0 left-0 -z-10 m-0 h-screen w-screen overflow-hidden p-0 font-sans">
	<div class="relative h-screen w-screen overflow-hidden">
		<Kaleidoscope
			{imageSrc}
			{mode}
			{segments}
			{scaleFactor}
			{motionFactor}
			{opacity}
			imageAspect={$imageAspect}
		/>
	</div>
</div>
{#if showControls}
	<div
		class="absolute top-30 left-1/2 z-[100] grid max-w-4xl -translate-x-1/2 transform grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 rounded-lg bg-[var(--bg)] p-4 backdrop-blur-md"
	>
		<div class="flex flex-col gap-2">
			<label for="segments" class="text-sm font-medium text-[var(--fg)]">Segments: {segments}</label
			>
			<input
				type="range"
				id="segments"
				bind:value={segments}
				min="3"
				max="12"
				step="1"
				class="w-full accent-[var(--primary)]"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="scaleFactor" class="text-sm font-medium text-[var(--fg)]"
				>Scale Factor: {scaleFactor}</label
			>
			<input
				type="range"
				id="scaleFactor"
				bind:value={scaleFactor}
				min="0.5"
				max="3"
				step="0.1"
				class="w-full accent-[var(--primary)]"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="motionFactor" class="text-sm font-medium text-[var(--fg)]"
				>Motion Factor: {motionFactor}</label
			>
			<input
				type="range"
				id="motionFactor"
				bind:value={motionFactor}
				min="0"
				max="2"
				step="0.1"
				class="w-full accent-[var(--primary)]"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="opacity" class="text-sm font-medium text-[var(--fg)]">Opacity: {opacity}</label>
			<input
				type="range"
				id="opacity"
				bind:value={opacity}
				min="0"
				max="1"
				step="0.1"
				class="w-full accent-[var(--primary)]"
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="imageAspect" class="text-sm font-medium text-[var(--fg)]"
				>Image Aspect: {$imageAspect.toFixed(1)}</label
			>
			<input
				type="range"
				id="imageAspect"
				bind:value={$imageAspect}
				min="0.5"
				max="2"
				step="0.1"
				class="w-full accent-[var(--primary)]"
			/>
		</div>
	</div>
{/if}

<style>
	.fixed:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url('/bg-tile.png');
		z-index: 2;
		mix-blend-mode: multiply;
		opacity: 0.6;
	}
</style>
