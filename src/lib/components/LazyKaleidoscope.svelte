<script lang="ts">
	import LoadingSpinner from './LoadingSpinner.svelte';

	const {
		imageSrc = '',
		segments = 6,
		mode = 'static',
		scaleFactor = 1,
		motionFactor = 1,
		imageAspect = 1
	} = $props<{
		imageSrc?: string;
		segments?: number;
		mode?: 'static' | 'loop' | 'mouse' | 'scroll';
		scaleFactor?: number;
		motionFactor?: number;
		imageAspect?: number;
	}>();

	let Kaleidoscope = $state<typeof import('./Kaleidoscope.svelte').default | null>(null);
	let isLoading = $state(true);
	let hasError = $state(false);

	$effect(() => {
		import('./Kaleidoscope.svelte')
			.then((module) => {
				Kaleidoscope = module.default;
				isLoading = false;
			})
			.catch((error) => {
				console.error('Failed to load Kaleidoscope component:', error);
				hasError = true;
				isLoading = false;
			});
	});
</script>

{#if isLoading}
	<div class="lazy-loading-container">
		<LoadingSpinner size="large" message="Loading kaleidoscope..." />
	</div>
{:else if hasError}
	<div class="error-container">
		<div class="error-content">
			<h3 class="mb-2 text-lg font-semibold">Failed to Load</h3>
			<p class="text-sm text-gray-600">
				Unable to load the kaleidoscope component. Please refresh the page.
			</p>
		</div>
	</div>
{:else if Kaleidoscope}
	<Kaleidoscope {imageSrc} {segments} {mode} {scaleFactor} {motionFactor} {imageAspect} />
{/if}

<style>
	.lazy-loading-container,
	.error-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 50vh;
		width: 100%;
		background-color: var(--bg);
	}

	.error-content {
		text-align: center;
		padding: 2rem;
		background: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 8px;
		max-width: 400px;
	}
</style>
