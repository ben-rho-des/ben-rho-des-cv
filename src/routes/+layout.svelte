<script lang="ts">
  import '../app.css';
  import '$lib/fonts.css';
  import Header from '$lib/components/Header.svelte';

  import Grid from '$lib/components/Grid.svelte';
  import { page } from '$app/stores';
</script>


<Header />
<main class="container main-content">
  <Grid />
  <slot />
</main>

<footer class="container w-300 text-center mt-6">© {new Date().getFullYear()} Ben-Rho-des</footer>

