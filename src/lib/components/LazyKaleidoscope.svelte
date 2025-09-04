<script lang="ts">
	import { onMount } from 'svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';

	export let imageSrc: string = '';
	export let segments: number = 6;
	export let mode: 'static' | 'loop' | 'mouse' | 'scroll' = 'static';
	export let scaleFactor: number = 1;
	export let motionFactor: number = 1;
	export let opacity: number = 1;
	export let imageAspect: number = 1;

	let Kaleidoscope: typeof import('./Kaleidoscope.svelte').default | null = null;
	let isLoading = true;
	let hasError = false;

	onMount(async () => {
		try {
			const module = await import('./Kaleidoscope.svelte');
			Kaleidoscope = module.default;
			isLoading = false;
		} catch (error) {
			console.error('Failed to load Kaleidoscope component:', error);
			hasError = true;
			isLoading = false;
		}
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
	<svelte:component
		this={Kaleidoscope}
		{imageSrc}
		{segments}
		{mode}
		{scaleFactor}
		{motionFactor}
		{opacity}
		{imageAspect}
	/>
{/if}

<style>
	.lazy-loading-container,
	.error-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 50vh;
		width: 100%;
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
