<script>
  import { goto } from '$app/navigation';
  import { quizAnswers, matchedPersona, currentScreen } from '$lib/stores/intervention.js';
  import { quizQuestions, matchPersona } from '$lib/data/personas.js';

  currentScreen.set(2);

  let answers = $state({});
  let currentQ = $state(0);

  function selectAnswer(questionId, value) {
    answers[questionId] = value;
    setTimeout(() => {
      if (currentQ < quizQuestions.length - 1) {
        currentQ++;
      }
    }, 300);
  }

  function submit() {
    quizAnswers.set(answers);
    const persona = matchPersona(answers);
    matchedPersona.set(persona);
    goto('/narrative');
  }

  let allAnswered = $derived(
    quizQuestions.every(q => answers[q.id] !== undefined)
  );
</script>

<div class="screen">
  <div class="quiz-header">
    <p class="quiz-intro">Three questions about how you think.</p>
  </div>

  {#each quizQuestions as q, i}
    {#if i === currentQ}
      <div class="quiz-question">
        <p class="q-dimension">{q.dimension}</p>
        <p class="q-text">{q.text}</p>
        <div class="q-options">
          {#each q.options as opt}
            <button
              class="q-option"
              class:selected={answers[q.id] === opt.value}
              onclick={() => selectAnswer(q.id, opt.value)}
            >
              {opt.label}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  {/each}

  <div class="quiz-progress">
    {#each quizQuestions as _, i}
      <button
        class="quiz-pip"
        class:done={answers[quizQuestions[i].id] !== undefined}
        class:current={i === currentQ}
        onclick={() => { if (answers[quizQuestions[i].id] !== undefined) currentQ = i; }}
        aria-label="Question {i + 1}"
      ></button>
    {/each}
  </div>

  {#if allAnswered}
    <div class="quiz-submit">
      <button class="btn-primary" onclick={submit}>See your match</button>
    </div>
  {/if}
</div>

<style>
  .quiz-intro {
    font-family: var(--font-body);
    font-size: 17px;
    font-weight: 300;
    color: var(--text-secondary);
    margin-bottom: 48px;
  }
  .q-dimension {
    font-family: var(--font-ui);
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 8px;
    letter-spacing: 0.3px;
  }
  .q-text {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 400;
    color: var(--text);
    line-height: 1.45;
    margin-bottom: 28px;
  }
  .q-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .q-option {
    text-align: left;
    padding: 16px 20px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 3px;
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 300;
    color: var(--text-secondary);
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .q-option:hover {
    border-color: var(--accent);
    color: var(--text);
  }
  .q-option.selected {
    border-color: var(--accent);
    color: var(--text);
    background: var(--bg-shifted);
  }
  .quiz-progress {
    display: flex;
    gap: 8px;
    margin-top: 48px;
    justify-content: center;
  }
  .quiz-pip {
    width: 32px;
    height: 3px;
    background: var(--border);
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    padding: 0;
  }
  .quiz-pip.done { background: var(--accent); }
  .quiz-pip.current { background: var(--accent); width: 48px; }
  .quiz-submit {
    text-align: center;
    margin-top: 32px;
  }
</style>
