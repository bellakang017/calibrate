<script>
  let dark = $state(
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('calibrate-theme') === 'dark'
      : false
  );

  function toggle() {
    dark = !dark;
    const theme = dark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('calibrate-theme', theme);
  }
</script>

<button class="theme-toggle" onclick={toggle} aria-label="Toggle theme">
  {dark ? 'Light' : 'Dark'}
</button>

<style>
  .theme-toggle {
    font-family: var(--font-ui);
    font-size: 12px;
    color: var(--text-muted);
    background: none;
    border: none;
    cursor: pointer;
    letter-spacing: 0.5px;
    padding: 4px 0;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }
  .theme-toggle:hover {
    border-color: var(--text-muted);
  }
</style>
