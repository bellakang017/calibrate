<script>
  let { current = 1, total = 5, onContinue, onBack, continueLabel = 'Continue' } = $props();
</script>

<footer class="nav-footer">
  {#if onBack}
    <button class="link-back" onclick={onBack}>Back</button>
  {:else}
    <div></div>
  {/if}

  <div class="pips">
    {#each Array(total) as _, i}
      <div
        class="pip"
        class:done={i + 1 < current}
        class:current={i + 1 === current}
      ></div>
    {/each}
  </div>

  <button class="btn-primary" onclick={onContinue}>{continueLabel}</button>
</footer>

<style>
  .nav-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 0;
    margin-top: 48px;
  }
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
</style>
