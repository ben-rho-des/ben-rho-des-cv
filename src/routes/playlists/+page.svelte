<script lang="ts">
  // Playlists page for music sharing
</script>

<h1 class="w-800" style="font-size:clamp(28px,4vw,56px)">Playlists 🥁</h1>
<p class="w-400">Music that fuels my coding sessions and creative moments.</p>

<div class="playlists-grid">
  <div class="playlist-card">
    <h3 class="w-600">Coding Focus</h3>
    <p class="w-400">Deep work sessions with ambient and electronic vibes</p>
    <div class="playlist-emoji">🎧</div>
  </div>
  
  <div class="playlist-card">
    <h3 class="w-600">Creative Flow</h3>
    <p class="w-400">Upbeat tracks for when inspiration strikes</p>
    <div class="playlist-emoji">✨</div>
  </div>
  
  <div class="playlist-card">
    <h3 class="w-600">Late Night</h3>
    <p class="w-400">Chill beats for midnight coding marathons</p>
    <div class="playlist-emoji">🌙</div>
  </div>
</div>

<p class="w-300" style="margin-top: 2rem; opacity: 0.7;">
  More playlists coming soon. I'll add upload functionality here so you can share your own music vibes!
</p>

<style>
  .playlists-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .playlist-card {
    padding: 2rem;
    border: 1px solid var(--primary);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.5);
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .playlist-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  
  .playlist-emoji {
    font-size: 3rem;
    margin: 1rem 0;
  }
  
  .playlist-card h3 {
    margin: 0 0 0.5rem 0;
    color: var(--primary);
  }
  
  .playlist-card p {
    margin: 0;
    opacity: 0.8;
  }
</style>
