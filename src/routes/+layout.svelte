<script lang="ts">
  import '../app.css';
  import '$lib/fonts.css';
  import Header from '$lib/components/Header.svelte';
  import GridOverlay from '$lib/components/GridOverlay.svelte';
  import Grid from '$lib/components/Grid.svelte';
  import { page } from '$app/stores';
</script>
<!-- comment out for now
<GridOverlay cellSize={40} opacity={0.6} /> -->

<Header />
<main class="container main-content">
  <Grid />
  <slot />
</main>
{#if $page.url.pathname !== '/'}
  <footer class="container w-300 text-center">© {new Date().getFullYear()} Ben-Rho-des</footer>
{/if}
