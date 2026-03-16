<script>
  import { responses, metrics, matchedPersona, currentScreen } from '$lib/stores/intervention.js';
  import Asterism from '$lib/components/Asterism.svelte';
  import { get } from 'svelte/store';

  currentScreen.set(5);

  const persona = get(matchedPersona);
  let reflection = $state('');
  let submitted = $state(false);

  function submit() {
    responses.update(r => ({ ...r, reflection }));
    submitted = true;
  }

  const m = $derived(get(metrics));
</script>

<div class="screen">
  {#if !submitted}
    <Asterism />

    <p class="reflection-prompt">
      You've just experienced how {persona?.thinker} navigated uncertainty — and how you navigate AI.
    </p>

    <p class="reflection-question">
      Write a brief note to a future student who, like you, is learning to work with AI.
      What would you tell them about knowing when to trust it and when to think for themselves?
    </p>

    <textarea
      class="minimal reflection-area"
      bind:value={reflection}
      placeholder="Dear future student..."
      rows="8"
    ></textarea>

    <div class="reflection-submit">
      <button
        class="btn-primary"
        onclick={submit}
        disabled={reflection.length < 20}
      >
        Finish
      </button>
    </div>
  {:else}
    <div class="completion">
      <Asterism />
      <h2 class="completion-title">Thank you.</h2>
      <p class="completion-text">
        Your responses have been recorded. The way you think with AI is not fixed —
        it's a practice you can refine, just as {persona?.thinker} refined theirs.
      </p>

      {#if m}
        <div class="results-summary">
          <p class="results-label">Your calibration</p>
          <p class="results-stat">{m.calibrationAccuracy} of 3 incorrect AI answers identified</p>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .reflection-prompt {
    font-family: var(--font-body);
    font-size: 17px;
    font-weight: 300;
    color: var(--text-secondary);
    line-height: 1.75;
    text-align: center;
    max-width: 480px;
    margin: 0 auto 24px;
  }
  .reflection-question {
    font-family: var(--font-question);
    font-size: 19px;
    font-style: italic;
    color: var(--text);
    line-height: 1.6;
    text-align: center;
    max-width: 480px;
    margin: 0 auto 32px;
  }
  .reflection-area {
    min-height: 200px;
  }
  .reflection-submit {
    text-align: center;
    margin-top: 32px;
  }
  .completion {
    text-align: center;
    padding-top: 80px;
  }
  .completion-title {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  .completion-text {
    font-family: var(--font-body);
    font-size: 17px;
    font-weight: 300;
    color: var(--text-secondary);
    line-height: 1.75;
    max-width: 480px;
    margin: 0 auto 40px;
  }
  .results-summary {
    padding: 24px;
    background: var(--bg-shifted);
    display: inline-block;
  }
  .results-label {
    font-family: var(--font-ui);
    font-size: 11px;
    color: var(--text-muted);
    margin-bottom: 4px;
    letter-spacing: 0.3px;
  }
  .results-stat {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 500;
    color: var(--accent);
  }
</style>
