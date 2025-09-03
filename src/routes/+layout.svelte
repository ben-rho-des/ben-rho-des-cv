<script lang="ts">
	import '../app.css';
	import '$lib/fonts.css';
	import Header from '$lib/components/Header.svelte';

	import Grid from '$lib/components/Grid.svelte';
</script>

<Header />
<main class="main-content container">
	<Grid />
	<slot />
</main>

<footer class="container mt-6 w-300 text-center">© {new Date().getFullYear()} Ben-Rho-des</footer>
