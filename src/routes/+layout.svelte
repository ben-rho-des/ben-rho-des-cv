<script lang="ts">
	import '../app.css';
	import '$lib/fonts.css';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import Grid from '$lib/components/Grid.svelte';
	import { modeStore } from '$lib/stores/mode';

	// Check if we're on the home page (handle both local dev and GitHub Pages)
	$: isHomePage = $page.url.pathname === '/' || $page.url.pathname === '/ben-rho-des-cv/';
</script>

<Header />
<main class="main-content" class:container={!isHomePage}>
	{#if $modeStore.grid}
		<Grid />
	{/if}
	<slot />
</main>

<footer class="container mt-6 w-300 text-center">© {new Date().getFullYear()} Ben-Rho-des</footer>
