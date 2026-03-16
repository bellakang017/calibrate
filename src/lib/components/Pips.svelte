<script>
  let { current = 1, total = 5 } = $props();
</script>

<div class="pips">
  {#each Array(total) as _, i}
    <div
      class="pip"
      class:done={i + 1 < current}
      class:current={i + 1 === current}
    ></div>
  {/each}
  <span class="pip-text">{current} of {total}</span>
</div>

<style>
  .pips {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .pip {
    width: 28px;
    height: 2px;
    background: var(--border);
    transition: all 0.3s ease;
  }
  .pip.done { background: var(--accent); }
  .pip.current { background: var(--accent); width: 40px; }
  .pip-text {
    font-family: var(--font-ui);
    font-size: 12px;
    color: var(--text-muted);
    margin-left: 8px;
  }
</style>
