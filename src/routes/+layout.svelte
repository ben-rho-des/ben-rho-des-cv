<script lang="ts">
	import '../app.css';
	import '$lib/fonts.css';
	import Header from '$lib/components/Header.svelte';
	import ErrorBoundary from '$lib/components/ErrorBoundary.svelte';
	import { page } from '$app/stores';
	import Grid from '$lib/components/Grid.svelte';
	import { modeStore } from '$lib/stores/mode';

	$: isHomePage = $page.url.pathname === '/' || $page.url.pathname === '/ben-rho-des-cv/';
</script>

<Header />
<ErrorBoundary>
	<main class="mx-auto min-h-[80vh] w-full max-w-[1400px] pt-20" class:container={!isHomePage}>
		{#if $modeStore.grid}
			<Grid />
		{/if}
		<slot />
	</main>
</ErrorBoundary>

<footer class="container mt-6 w-300 border-t border-fg pt-6 text-center">
	© {new Date().getFullYear()} Ben-Rho-des
</footer>
