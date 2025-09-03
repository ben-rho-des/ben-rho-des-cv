<script lang="ts">
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import { onMount } from 'svelte';
  import { modeStore } from '$lib/stores/mode';

  const right = [
    { href: 'cv', label: 'Curriculum Vitae' },
    // { href: 'about',  label: 'About'  },
    // { href: 'blog',    label: 'Blog'    },
    // { href: 'contact', label: 'Contact' }
  ];

  const currentPath = derived(page, ($p) => $p.url.pathname);
  const isActive = (path: string, current: string) => {
    if (typeof current !== 'string') return false;
    // Handle relative paths by removing leading slash and comparing
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
    const normalizedCurrent = current.startsWith('/') ? current.slice(1) : current;
    return normalizedCurrent === normalizedPath || normalizedCurrent === `/${normalizedPath}`;
  };

  let header: HTMLElement;
  let isScrolled = false;
  let isMobileMenuOpen = false;

  function handleScroll() {
    isScrolled = window.scrollY > 10;
  }

  function toggleTheme() {
    modeStore.toggleTheme();
  }

  function toggleGrid() {
    modeStore.toggleGrid();
  }

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }

  onMount(() => {
    // Initialize mode store
    modeStore.init();
    
    // Simple scroll event listener
    const scrollHandler = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      isScrolled = scrollY > 10;
    };
    
    // Add scroll listener to multiple targets to ensure we catch it
    window.addEventListener('scroll', scrollHandler, { passive: true, capture: true });
    document.addEventListener('scroll', scrollHandler, { passive: true, capture: true });
    document.documentElement.addEventListener('scroll', scrollHandler, { passive: true, capture: true });
    document.body.addEventListener('scroll', scrollHandler, { passive: true, capture: true });

    // Test initial scroll position
    scrollHandler();

    return () => {
      window.removeEventListener('scroll', scrollHandler, { capture: true });
      document.removeEventListener('scroll', scrollHandler, { capture: true });
      document.documentElement.removeEventListener('scroll', scrollHandler, { capture: true });
      document.body.removeEventListener('scroll', scrollHandler, { capture: true });
    };
  });
</script>

<header class="header" class:scrolled={isScrolled} bind:this={header}>
  <div class="container header-inner">
    <a class="logo" href="/" aria-label="Go to homepage">
      <img src={$modeStore.theme === '🌚' ? 'brd-dark.svg' : 'brd.svg'} alt="Ben Logo" />
    </a>

    <h2 class="header-title w-400">Melbourne Based Fullstack Developer</h2>

    <div class="header-actions">
      <button class="action-btn" on:click={toggleTheme} aria-label="Toggle theme">
        {$modeStore.theme === '🌚' ? '🌞' : '🌚'}
      </button>
      <a href="playlists" class="action-btn" aria-label="Go to playlists">
        🥁
      </a>
      <button class="action-btn" on:click={toggleGrid} aria-label="Toggle grid">
        📦
      </button>
    </div>

    <nav class="nav" aria-label="Primary navigation">
      {#each right as item}
        <a href={item.href} class:is-active-route={isActive(item.href, $currentPath)} on:click={closeMobileMenu}>{item.label}</a>
      {/each}
    </nav>

    <!-- Mobile menu button -->
    <button class="mobile-menu-btn" on:click={toggleMobileMenu} aria-label="Toggle mobile menu" aria-expanded={isMobileMenuOpen}>
      🍔
    </button>
  </div>

  <!-- Mobile menu overlay -->
  {#if isMobileMenuOpen}
    <div class="mobile-menu-overlay" on:click={closeMobileMenu} on:keydown={(e) => e.key === 'Escape' && closeMobileMenu()} role="button" tabindex="0" aria-label="Close mobile menu">
      <div class="mobile-menu-content" on:click|stopPropagation on:keydown={(e) => e.key === 'Escape' && closeMobileMenu()} role="dialog" aria-modal="true" aria-label="Mobile navigation menu" tabindex="0">
        <!-- Mobile action buttons -->
        <div class="mobile-actions">
          <button class="action-btn" on:click={toggleTheme} aria-label="Toggle theme">
            {$modeStore.theme === '🌚' ? '🌞' : '🌚'}
          </button>
          <a href="/playlists" class="action-btn" aria-label="Go to playlists">
            🥁
          </a>
          <button class="action-btn" on:click={toggleGrid} aria-label="Toggle grid">
            📦
          </button>
        </div>
        
        <!-- Mobile navigation -->
        <nav class="mobile-nav" aria-label="Mobile navigation">
          {#each right as item}
            <a href={item.href} class:is-active-route={isActive(item.href, $currentPath)} on:click={closeMobileMenu}>{item.label}</a>
          {/each}
        </nav>
      </div>
    </div>
  {/if}
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: var(--header-bg);
    transition: all 0.3s ease;
    padding-inline: var(--column-gap);
    width: 100%;
  }

  .header.scrolled {
    box-shadow: 0 2px 20px var(--header-scrolled-stroke);
  }

  .header-inner {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: var(--column-gap);
    align-items: center;
    padding: 16px 0;
  }

  .logo {
    grid-column: 1;
    font-size: clamp(24px, 4vw, 48px);
    letter-spacing: 0.04em;
    color: var(--primary);
    font-weight: 700;
    text-decoration: none;
  }

  .logo img {
    height: clamp(36px, 5vw, 56px);
    width: auto;
    transition: filter 0.2s ease;
  }

  .header-title {
    grid-column: 2;
    font-size: clamp(14px, 1.4vw, 16px);
    font-weight: 400;
    color: var(--fg);
    line-height: 1.3;
    margin: 0;
    width: auto;
  }

  .header-actions {
    grid-column: 3 / 4;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  .header a:focus {
    outline: none;
  }

  .action-btn {
    background: none;
    border: none;
    font-size: 1.45rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 3rem;
    min-height: 3rem;
    outline: none;
  }

  .action-btn:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  .action-btn:active {
    background-color: rgba(255, 255, 255, 1);
  }

  .action-btn:focus {
    outline: none;
  }

  .nav {
    grid-column: 4 / 7;
    display: flex;
    gap: 18px;
    align-items: center;
    justify-content: flex-end;
    font-size: clamp(14px, 1.6vw, 18px);
  }

  .nav a {
    transition: all 0.2s ease;
    padding: 0.5rem 1rem;
    outline: none;
    text-decoration: none;
    color: inherit;
    white-space: nowrap;
  }

  .nav a:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  .nav a:active {
    background-color: rgba(255, 255, 255, 1);
  }

  .nav a:focus {
    outline: none;
  }

  .nav a.is-active-route {
    background-color: var(--primary);
    color: white;
  }

  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.2s ease;
    align-items: center;
    justify-content: center;
    min-width: 3rem;
    min-height: 3rem;
    outline: none;
    grid-column: 6;
    justify-self: end;
  }

  .mobile-menu-btn:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  .mobile-menu-btn:active {
    background-color: rgba(255, 255, 255, 1);
  }

  .mobile-menu-btn:focus {
    outline: none;
  }

  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-menu-content {
    background: var(--bg);
    padding: 2rem;
    border-radius: 1rem;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .mobile-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .mobile-nav a {
    font-size: var(--font-size-lg);
    padding: 1rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s ease;
  }

  .mobile-nav a:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .mobile-nav a.is-active-route {
    background-color: var(--primary);
    color: white;
  }

  @media (max-width: 1000px) {
    .action-btn {
      min-width: 2.5rem;
      min-height: 2.5rem;
      font-size: 1.25rem;
    }
  }

  @media (max-width: 860px) {
    .header-actions {
      display: none;
    }

    .nav {
      display: none;
    }

    .mobile-menu-btn {
      display: flex;
      font-size: 2rem;
      min-width: 3.5rem;
      min-height: 3.5rem;
    }

    .header-title {
      grid-column: 2 / 6;
    }
  } 
</style>
