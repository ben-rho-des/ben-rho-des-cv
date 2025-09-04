<script lang="ts">
	import LazyKaleidoscope from '$lib/components/LazyKaleidoscope.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { tweened } from 'svelte/motion';
	import { getReducedMotionDuration } from '$lib/utils/accessibility';
	import { DEFAULTS } from '$lib/constants';

	// Kaleidoscope-specific constants
	const MODES = {
		STATIC: 'static',
		LOOP: 'loop',
		MOUSE: 'mouse',
		SCROLL: 'scroll'
	} as const;

	// Animation durations (in milliseconds)
	const ANIMATION_DURATIONS = {
		IMAGE_ASPECT_CYCLE: 13000
	} as const;

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

	let mode: 'static' | 'loop' | 'mouse' | 'scroll' = MODES.LOOP;
	let segments = 8;
	let scaleFactor = DEFAULTS.SCALE_FACTOR;
	let motionFactor = DEFAULTS.MOTION_FACTOR;
	let opacity = DEFAULTS.OPACITY;
	let showControls = false;

	const imageAspect = tweened(0.5, {
		duration: getReducedMotionDuration(ANIMATION_DURATIONS.IMAGE_ASPECT_CYCLE),
		easing: (t) => 0.5 * (1 + Math.sin(t * Math.PI))
	});

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
			startImageAspectAnimation();
		}
	});

	function startImageAspectAnimation(): void {
		const duration = getReducedMotionDuration(ANIMATION_DURATIONS.IMAGE_ASPECT_CYCLE);
		if (duration === 0) return; // Skip animation if reduced motion is preferred

		const animate = () => {
			imageAspect.set(1.5, { duration });
			setTimeout(() => {
				imageAspect.set(0.5, { duration });
				setTimeout(animate, duration);
			}, duration);
		};
		setTimeout(animate, 100);
	}
	onDestroy(() => {
		if (browser) {
			document.removeEventListener('keydown', handleKeyPress);
		}
	});
</script>

<svelte:head>
	<title>Ben-rho-des cv website</title>
</svelte:head>

<div class="fixed top-0 left-0 z-0 m-0 h-screen w-screen overflow-hidden p-0 font-sans">
	<div class="relative h-screen w-screen overflow-hidden">
		<LazyKaleidoscope
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

<div class="relative z-10 flex flex-col items-center justify-center">
	<h1 class="hero-font display-font text-20xl text-center uppercase" data-text={selectedTitle}>
		{selectedTitle}
	</h1>
	<div
		class="display-font-alt bubble flex items-center justify-center gap-2 text-center text-3xl uppercase"
	>
		gl+hf
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
