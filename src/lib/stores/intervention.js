import { writable, derived } from 'svelte/store';

const isBrowser = typeof sessionStorage !== 'undefined';

function persistedWritable(key, initial) {
  const stored = isBrowser ? sessionStorage.getItem(key) : null;
  const value = stored ? JSON.parse(stored) : initial;
  const store = writable(value);

  if (isBrowser) {
    store.subscribe(v => sessionStorage.setItem(key, JSON.stringify(v)));
  }

  return store;
}

// Quiz answers: { uncertainty: 'a'|'b', tool: 'a'|'b', crisis: 'a'|'b' }
export const quizAnswers = persistedWritable('calibrate-quiz', {});

// Matched persona (computed after quiz)
export const matchedPersona = persistedWritable('calibrate-persona', null);

// Experimental condition (for demo, user can toggle)
// 'full' | 'narrative-only' | 'strategy-only' | 'control'
export const condition = writable('full');

// User responses collected during intervention
export const responses = persistedWritable('calibrate-responses', {
  selfMapping: '',
  aiTaskResults: [],
  reflection: ''
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
