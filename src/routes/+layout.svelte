<script>
  import '../app.css';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import { currentScreen } from '$lib/stores/intervention.js';
  import { fade } from 'svelte/transition';
  import { page } from '$app/stores';

  let { children } = $props();
</script>

<div class="app">
  <nav class="top-nav">
    <span class="logo">Calibrate</span>
    <span class="screen-indicator">{$currentScreen} of 5</span>
    <ThemeToggle />
  </nav>

  {#key $page.url.pathname}
    <main in:fade={{ duration: 300, delay: 150 }} out:fade={{ duration: 150 }}>
      {@render children()}
    </main>
  {/key}
</div>

<style>
  .app {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }
  main {
    flex: 1;
    position: relative;
  }
  .top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid var(--border);
  }
  @media (min-width: 768px) {
    .top-nav { padding: 16px 40px; }
  }
  .logo {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 500;
    color: var(--text);
    letter-spacing: -0.3px;
  }
  .screen-indicator {
    font-family: var(--font-ui);
    font-size: 12px;
    color: var(--text-muted);
  }
</style>
