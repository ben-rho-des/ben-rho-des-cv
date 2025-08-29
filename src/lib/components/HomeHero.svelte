<script lang="ts">
  import { onDestroy, onMount, tick } from 'svelte';

  /** big rotating lines (edit freely) */
  export let messages: string[] = [
    "The singularity is near. Until then, I'll be here, pushing commits like love letters into the void.",
    "I read the future in console errors. Every stack trace is a prophecy. Spoiler: it always ends with `fix: typo`.",
    "Welcome, traveler. The algorithm demands tribute. I offer my pull requests. You may offer snacks.",
    "The machines whisper efficiency. I whisper back: lol no. Beauty > benchmarks. Humans first, robots can queue.",
    "I am a conduit of bugs and miracles. The terminal is my crystal ball. It says: deploy cautiously, but also… vibe.",
    "If this page breaks, it's performance art. If it doesn't, I totally meant that too.",
    "Behold: a website built on caffeine, curiosity, and questionable feature flags.",
    "High tech, low life—because code is just a tool, and life is about connection."
  ];

  /** rotation period (ms) */
  export let interval = 15_000;

  /** enable type-in effect for the big line */
  export let typeSpeed = 16;

  let reducedMotion = false;
  let paused = false;

  let idx = 0;
  let line = messages[idx];
  let typed = '';
  let timer: number | undefined;
  let typer: number | undefined;

  const pickNext = () => {
    if (messages.length <= 1) return;
    let n = idx;
    while (n === idx) n = Math.floor(Math.random() * messages.length);
    idx = n;
    line = messages[idx];
  };

  const clearTyper = () => { if (typer) { clearInterval(typer); typer = undefined; } };

  const typeLine = async (s: string) => {
    clearTyper();
    if (reducedMotion || typeSpeed <= 0) { typed = s; return; }
    typed = '';
    let i = 0;
    typer = window.setInterval(() => {
      typed += s[i++] ?? '';
      if (i >= s.length) clearTyper();
    }, typeSpeed);
  };

  const start = () => {
    stop();
    timer = window.setInterval(async () => {
      pickNext();
      await tick();
      await typeLine(line);
    }, interval);
  };
  const stop = () => { if (timer) { clearInterval(timer); timer = undefined; } };

  function pause() { paused = true; stop(); clearTyper(); }
  function resume() { paused = false; start(); }

  onMount(async () => {
    const mm = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    reducedMotion = !!mm?.matches;
    const listener = () => (reducedMotion = !!mm?.matches);
    mm?.addEventListener?.('change', listener);

    await typeLine(line);
    start();

    onDestroy(() => { mm?.removeEventListener?.('change', listener); });
  });

  onDestroy(() => { stop(); clearTyper(); });
</script>

<section class="hero" aria-label="Home hero section" on:mouseenter={pause} on:mouseleave={resume} on:focusin={pause} on:focusout={resume}>
  <!-- top line (medium) -->
  <div class="top w-700">// FULL STCK DEV</div>

  <!-- middle line (smaller label) -->
  <div class="mid w-400">Ben-rho-des:</div>

  <!-- bottom (large rotating prophecy) -->
  <h1 class="big {reducedMotion ? '' : 'glitch'} w-760" data-text={typed} aria-live="polite">
    {typed}<span class="cursor" aria-hidden="true">▌</span>
  </h1>

  <div class="hint" aria-hidden="true">{paused ? 'paused' : 'hover to pause • new every 15s'}</div>
</section>

<style>
  .hero{
    display:grid;
    gap: clamp(6px, 1.2vh, 10px);
    place-items:center;
    text-align:center;
    padding: clamp(16px, 3vh, 32px) 0;
  }

  /* top line */
  .top{
    font-family: "2049", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "JetBrains Mono", monospace;
    font-size: clamp(18px, 2.6vw, 28px);
    letter-spacing: .06em;
    color: var(--primary, #8b4513);
    text-shadow: 0 0 10px color-mix(in srgb, var(--primary) 35%, transparent);
  }

  /* mid line */
  .mid{
    font-family: "2049", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "JetBrains Mono", monospace;
    font-size: clamp(14px, 1.6vw, 18px);
    opacity: .85;
    letter-spacing: .04em;
  }

  /* big rotating line */
  .big{
    margin: 0;
    max-width: 32ch;
    font-family: "2049", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "JetBrains Mono", monospace;
    font-size: clamp(28px, 5vw, 64px);
    line-height: 1.15;
    letter-spacing: .01em;
    color: var(--fg, #2c1810);
    text-shadow: 0 0 12px color-mix(in srgb, var(--primary) 28%, transparent);
  }

  /* variable font helpers */
  .w-400{ font-variation-settings: "wght" 400; }
  .w-700{ font-variation-settings: "wght" 700; }
  .w-760{ font-variation-settings: "wght" 760; }

  /* glitch layers using ::before/::after with slice animation */
  .glitch{ position: relative; }
  .glitch::before,
  .glitch::after{
    content: attr(data-text);
    position: absolute;
    inset: 0;
    pointer-events: none;
    mix-blend-mode: screen;
  }
  .glitch::before{
    transform: translate(1px, 0);
    color: var(--primary, #8b4513);
    text-shadow: -1px 0 var(--primary, #8b4513);
    animation: shiftA 2.2s steps(2, end) infinite;
  }
  .glitch::after{
    transform: translate(-1px, 0);
    color: #6b8e23;
    text-shadow: 1px 0 #6b8e23;
    animation: shiftB 3.2s steps(2, end) infinite;
  }

  @keyframes shiftA{
    0%   { clip-path: inset(0 0 60% 0); }
    50%  { clip-path: inset(40% 0 0 0); }
    100% { clip-path: inset(0 0 20% 0); }
  }
  @keyframes shiftB{
    0%   { clip-path: inset(80% 0 0 0); }
    50%  { clip-path: inset(0 0 70% 0); }
    100% { clip-path: inset(30% 0 0 0); }
  }

  .cursor{
    display: inline-block;
    width: 0.6ch;
    animation: blink 1s steps(2,end) infinite;
    color: var(--primary, #8b4513);
  }
  @keyframes blink { 50% { opacity: 0; } }

  .hint{
    margin-top: 8px;
    opacity: .55;
    font-size: 12px;
    letter-spacing: .08em;
  }

  @media (prefers-reduced-motion: reduce){
    .glitch::before, .glitch::after { animation: none !important; }
    .cursor { animation: none !important; }
  }
</style>
