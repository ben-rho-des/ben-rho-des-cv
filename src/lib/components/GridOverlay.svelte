<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  export let cellSize = 40;  // px per grid cell
  export let opacity = 0.7;

  // define some palettes of 3
  const palettes: string[][] = [
    ["#8b4513", "#d2691e", "#a0522d"], // brown variations
    ["#2f4f4f", "#4682b4", "#708090"], // dark slate + steel blue
    ["#4b0082", "#8a2be2", "#9370db"], // purple variations
    ["#006400", "#228b22", "#32cd32"], // green variations
    ["#8b0000", "#dc143c", "#ff4500"], // red variations
  ];

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let cols: number, rows: number;
  let currentPalette: string[];
  let animationFrame: number;
  let paletteTimer: number;

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.ceil(canvas.width / cellSize);
    rows = Math.ceil(canvas.height / cellSize);
  }

  function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function drawGrid() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (Math.random() < 0.6) continue; // sparse
        ctx.fillStyle = pick(currentPalette);
        ctx.globalAlpha = opacity * (0.3 + Math.random() * 0.7);
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
    
    // grain overlay
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = (Math.random() - 0.5) * 15;
      data[i] = Math.max(0, Math.min(255, data[i] + v));     // r
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + v)); // g
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + v)); // b
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function animate() {
    drawGrid();
    animationFrame = requestAnimationFrame(animate);
  }

  onMount(() => {
    if (typeof window === 'undefined') return;
    
    ctx = canvas.getContext('2d');
    currentPalette = pick(palettes);
    
    resize();
    drawGrid();
    
    // Start animation loop
    animate();
    
    // Change palette every 8 seconds
    paletteTimer = window.setInterval(() => {
      currentPalette = pick(palettes);
    }, 8000);
    
    // Handle resize
    const handleResize = () => {
      resize();
      drawGrid();
    };
    window.addEventListener('resize', handleResize);
    
    onDestroy(() => {
      window.removeEventListener('resize', handleResize);
    });
  });

  onDestroy(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    if (paletteTimer) {
      clearInterval(paletteTimer);
    }
  });
</script>

<canvas bind:this={canvas} class="grid"></canvas>

<style>
  .grid {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: transparent;
  }
</style>
