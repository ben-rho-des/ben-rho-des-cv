<script lang="ts">
  // Playlists page for music sharing
</script>

<div class="grid grid-cols-6 gap-x-5">

  <h1 class="display-font text-8xl font-bold mb-4 uppercase">Playlists 🥁</h1>
  <p class="col-span-6 text-lg text-gray-600 mb-8">Music that fuels my coding sessions and creative moments.</p>
  <div class="col-span-2">
    <h3 class="text-xl font-semibold mb-3 text-primary">Mix</h3>
    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/2STmI6S6MunTzKCD64Ucs5" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify Mix Playlist"></iframe>
  </div>
  
  <div class="col-span-2">
    <h3 class="text-xl font-semibold mb-3 text-primary">Mix 2</h3>
    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/2zxOACR4moKbJQtRpMX1Cb?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify Mix 2 Playlist"></iframe>
  </div>
  

  <div class="col-span-2">
    <h3 class="text-xl font-semibold mb-3 text-primary">Most played this year</h3>
    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/2OlRb9ISy8xZku7ImTV9n8" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Most Played Album This Year"></iframe>
  </div>

</div>

<!-- Responsive styles -->
<style>
  @media (max-width: 860px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .col-span-2 {
      grid-column: 1 / -1;
    }
    
    .col-span-6 {
      grid-column: 1 / -1;
    }
  }
</style>
