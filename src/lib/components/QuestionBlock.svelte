<script>
  let { question = '', index = 1, total = 3 } = $props();
</script>

<div class="question-block">
  <div class="asterism" aria-hidden="true">⁂</div>
  <p class="question-text">{question}</p>
  <span class="question-meta">{index} of {total}</span>
</div>

<style>
  .question-block {
    text-align: center;
    padding: 32px 0;
  }
  .asterism {
    font-family: var(--font-display);
    font-size: 18px;
    color: var(--accent);
    letter-spacing: 12px;
    margin-bottom: 24px;
    user-select: none;
  }
  .question-text {
    font-family: var(--font-question);
    font-size: 19px;
    font-style: italic;
    font-weight: 400;
    color: var(--text);
    line-height: 1.6;
    max-width: 460px;
    margin: 0 auto 8px;
  }
  .question-meta {
    font-family: var(--font-ui);
    font-size: 12px;
    color: var(--text-muted);
  }
</style>
