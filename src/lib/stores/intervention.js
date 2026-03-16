import { writable, derived } from 'svelte/store';

// Quiz answers: { uncertainty: 'a'|'b', tool: 'a'|'b', crisis: 'a'|'b' }
export const quizAnswers = writable({});

// Matched persona (computed after quiz)
export const matchedPersona = writable(null);

// Experimental condition (for demo, user can toggle)
// 'full' | 'narrative-only' | 'strategy-only' | 'control'
export const condition = writable('full');

// User responses collected during intervention
export const responses = writable({
  selfMapping: '',       // Screen 3: "What part of this person's story feels familiar?"
  aiTaskResults: [],     // Screen 4: array of { accepted: bool, correct: bool }
  reflection: ''         // Screen 5: self-narrative
});

// Current screen index (1-5)
export const currentScreen = writable(1);

// Computed: intervention metrics
export const metrics = derived(responses, ($r) => {
  const results = $r.aiTaskResults;
  if (results.length === 0) return null;

  const wrongItems = results.filter(r => !r.correct);
  const correctlyRejected = wrongItems.filter(r => !r.accepted).length;

  return {
    calibrationAccuracy: correctlyRejected,  // 0-3
    totalVerifications: results.filter(r => r.verified).length,
  };
});
