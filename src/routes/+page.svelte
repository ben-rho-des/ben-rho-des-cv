<script lang="ts">
  import HomeHero from '$lib/components/HomeHero.svelte';
</script>

<div class="page-grid">
  <div class="hero-section">
    <HomeHero />
  </div>
</div>

<style>
  .page-grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    min-height: 100vh;
  }
  
  .hero-section {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
  }
</style>
