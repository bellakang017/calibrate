<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { condition, responses, matchedPersona, currentScreen } from '$lib/stores/intervention.js';
  import { strategicQuestions, controlTips } from '$lib/data/questions.js';
  import { aiTasks } from '$lib/data/ai-tasks.js';
  import QuestionBlock from '$lib/components/QuestionBlock.svelte';
  import { get } from 'svelte/store';

  currentScreen.set(4);

  onMount(() => {
    if (!get(matchedPersona)) goto(`${base}/quiz`, { replaceState: true });
  });

  const cond = get(condition);
  const showStrategicQuestions = cond === 'full' || cond === 'strategy-only';

  let currentTask = $state(0);
  let results = $state([]);
  let showExplanation = $state(false);
  let userChoice = $state(null);

  const task = $derived(aiTasks[currentTask]);
  const questions = showStrategicQuestions ? strategicQuestions : controlTips;

  function acceptAI() {
    userChoice = 'accept';
    showExplanation = true;
    results.push({
      taskId: task.id,
      accepted: true,
      correct: task.aiCorrect,
      verified: false,
    });
  }

  function questionAI() {
    userChoice = 'question';
    showExplanation = true;
    results.push({
      taskId: task.id,
      accepted: false,
      correct: task.aiCorrect,
      verified: true,
    });
  }

  function nextTask() {
    showExplanation = false;
    userChoice = null;
    if (currentTask < aiTasks.length - 1) {
      currentTask++;
    } else {
      responses.update(r => ({ ...r, aiTaskResults: results }));
      goto(`${base}/reflection`);
    }
  }
</script>

<div class="screen">
  {#if !showExplanation}
    <div class="pre-task">
      {#each questions as q, i}
        <QuestionBlock question={q} index={i + 1} total={questions.length} />
      {/each}
    </div>
  {/if}

  <div class="task-area">
    <p class="task-label">Task {currentTask + 1} of {aiTasks.length}</p>
    <p class="task-question">{task.question}</p>

    <div class="ai-response">
      <p class="ai-label">AI's answer:</p>
      <p class="ai-text">{task.aiAnswer}</p>
    </div>

    {#if !showExplanation}
      <div class="task-actions">
        <button class="btn-primary" onclick={acceptAI}>Accept AI's answer</button>
        <button class="link-back" onclick={questionAI}>I have doubts</button>
      </div>
    {:else}
      <div class="explanation">
        <div class="verdict" class:correct={
          (userChoice === 'accept' && task.aiCorrect) ||
          (userChoice === 'question' && !task.aiCorrect)
        } class:incorrect={
          (userChoice === 'accept' && !task.aiCorrect) ||
          (userChoice === 'question' && task.aiCorrect)
        }>
          {#if (userChoice === 'accept' && task.aiCorrect) || (userChoice === 'question' && !task.aiCorrect)}
            Good judgment.
          {:else}
            Worth reconsidering.
          {/if}
        </div>
        <p class="explanation-text">{task.explanation}</p>
        <button class="btn-primary" onclick={nextTask}>
          {currentTask < aiTasks.length - 1 ? 'Next task' : 'Continue to reflection'}
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .pre-task {
    margin-bottom: 40px;
    padding-bottom: 32px;
    border-bottom: 1px solid var(--border);
  }
  .task-label {
    font-family: var(--font-ui);
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 16px;
  }
  .task-question {
    font-family: var(--font-body);
    font-size: 17px;
    font-weight: 300;
    color: var(--text);
    line-height: 1.8;
    margin-bottom: 24px;
  }
  .ai-response {
    background: var(--bg-shifted);
    padding: 20px 24px;
    margin-bottom: 24px;
  }
  .ai-label {
    font-family: var(--font-ui);
    font-size: 11px;
    color: var(--text-muted);
    margin-bottom: 8px;
    letter-spacing: 0.3px;
  }
  .ai-text {
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 300;
    color: var(--text-secondary);
    line-height: 1.75;
  }
  .task-actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .explanation {
    margin-top: 16px;
  }
  .verdict {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;
  }
  .verdict.correct { color: var(--accent); }
  .verdict.incorrect { color: var(--text-muted); }
  .explanation-text {
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 300;
    color: var(--text-secondary);
    line-height: 1.75;
    margin-bottom: 24px;
  }
</style>
