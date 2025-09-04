<script lang="ts">
	import LazyKaleidoscope from '$lib/components/LazyKaleidoscope.svelte';
	import { browser } from '$app/environment';
	import { tweened } from 'svelte/motion';
	import { getReducedMotionDuration } from '$lib/utils/accessibility';
	import { DEFAULTS, KALEIDOSCOPE_MODES, ANIMATION_DURATIONS } from '$lib/constants';

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

	const mode: 'static' | 'loop' | 'mouse' | 'scroll' = KALEIDOSCOPE_MODES.LOOP;
	let segments = $state(8);
	let scaleFactor = $state(DEFAULTS.SCALE_FACTOR);
	let motionFactor = $state(DEFAULTS.MOTION_FACTOR);
	let showControls = $state(false);

	// Debug: Log state changes
	$effect(() => {
		if (browser) {
			console.log('Homepage state changed:', {
				segments,
				scaleFactor,
				motionFactor,
				imageAspectControl
			});
		}
	});

	const imageAspect = tweened(0.5, {
		duration: getReducedMotionDuration(ANIMATION_DURATIONS.IMAGE_ASPECT_CYCLE),
		easing: (t) => 0.5 * (1 + Math.sin(t * Math.PI))
	});

	let imageAspectControl = $state(0.5);

	const selectedTitle = titleOptions[Math.floor(Math.random() * titleOptions.length)];
	const imageSrc = imageOptions[Math.floor(Math.random() * imageOptions.length)];

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === '`' || event.key === '~') {
			showControls = !showControls;
		}
	}

	$effect(() => {
		if (browser) {
			document.addEventListener('keydown', handleKeyPress);
			startImageAspectAnimation();
		}

		return () => {
			if (browser) {
				document.removeEventListener('keydown', handleKeyPress);
			}
		};
	});

	$effect(() => {
		imageAspect.set(imageAspectControl);
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
</script>

<svelte:head>
	<title>Ben-rho-des cv</title>
</svelte:head>

<div class="fixed top-0 left-0 z-0 m-0 h-screen w-screen overflow-hidden p-0 font-sans">
	<div class="relative h-screen w-screen overflow-hidden">
		<LazyKaleidoscope
			{imageSrc}
			{mode}
			{segments}
			{scaleFactor}
			{motionFactor}
			imageAspect={$imageAspect}
		/>
	</div>
</div>

<div class="relative z-10 flex flex-col items-center justify-center">
	<h1
		class="hero-font display-font lgtext-20xl text-center text-8xl uppercase"
		data-text={selectedTitle}
	>
		{selectedTitle}
	</h1>
	<div
		class="display-font-alt bubble flex !min-w-[150px] items-center justify-center gap-2 !p-6 text-center text-3xl text-xl uppercase lg:!min-w-[200px] lg:!p-10 lg:text-3xl"
	>
		gl+hf
	</div>
</div>
{#if showControls}
	<div
		class="absolute top-83 left-1/2 z-[100] grid max-w-4xl -translate-x-1/2 transform grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 rounded-lg border-2 border-primary bg-[var(--bg)] p-4 backdrop-blur-md"
	>
		<div class="flex flex-col gap-2">
			<div class="range">
				<label for="segments" class="text-sm font-medium text-[var(--fg)]"
					>Segments: {segments}</label
				>
				<div class="range__input">
					<input
						type="range"
						id="segments"
						bind:value={segments}
						min="3"
						max="12"
						step="1"
						class="w-full"
					/>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<div class="range">
				<label for="segments" class="text-sm font-medium text-[var(--fg)]"
					>Segments: {segments}</label
				>
				<div class="range__input">
					<input
						type="range"
						id="scaleFactor"
						bind:value={scaleFactor}
						min="0.5"
						max="3"
						step="0.1"
						class="w-full"
					/>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<div class="range">
				<label for="motionFactor" class="text-sm font-medium text-[var(--fg)]"
					>Motion Factor: {motionFactor}</label
				>
				<div class="range__input">
					<input
						type="range"
						id="motionFactor"
						bind:value={motionFactor}
						min="0"
						max="4"
						step="0.1"
						class="w-full"
					/>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<div class="range">
				<label for="imageAspect" class="text-sm font-medium text-[var(--fg)]"
					>Image Aspect: {imageAspectControl.toFixed(1)}</label
				>
				<div class="range__input">
					<input
						type="range"
						id="imageAspect"
						bind:value={imageAspectControl}
						min="0.5"
						max="2"
						step="0.1"
						class="w-full"
					/>
				</div>
			</div>
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
		z-index: 2;
		mix-blend-mode: multiply;
		opacity: 0.6;
		background: url('/bg-tile.png');
	}
</style>
