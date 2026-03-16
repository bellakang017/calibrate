<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { currentScreen } from '$lib/stores/intervention.js';

  currentScreen.set(1);
</script>

<div class="screen landing">
  <div class="landing-content">
    <h1 class="landing-title">Strategic Minds,<br>Chosen Orbits</h1>
    <p class="landing-subtitle">
      Every thinker navigated uncertainty in their own way.
      Discover whose orbit mirrors your own — and how it shapes
      the way you think with AI.
    </p>
    <p class="landing-time">About 15 minutes</p>
    <button class="btn-primary" onclick={() => goto(`${base}/quiz`)}>Begin</button>
  </div>
</div>

<style>
  .landing {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .landing-title {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 20px;
    color: var(--text);
  }
  .landing-subtitle {
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 300;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 32px;
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: 768px) {
    .landing-title { font-size: 42px; }
    .landing-subtitle { font-size: 17px; max-width: none; }
  }
  .landing-time {
    font-family: var(--font-ui);
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 24px;
  }
</style>
