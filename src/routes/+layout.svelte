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
  }
  .top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 40px;
    border-bottom: 1px solid var(--border);
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
