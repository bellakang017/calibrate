export const personas = [
  {
    id: 'systematic-outsider',
    name: 'The Systematic Outsider',
    thinker: 'Jean Piaget',
    profile: { uncertainty: 'b', tool: 'b', crisis: 'a' },
    shortDesc: 'You find order in chaos. You build systems to survive.',
  },
  {
    id: 'hands-on-rebel',
    name: 'The Hands-On Rebel',
    thinker: 'Seymour Papert',
    profile: { uncertainty: 'a', tool: 'a', crisis: 'a' },
    shortDesc: 'You learn by making. Rules are starting points, not endpoints.',
  },
  {
    id: 'pattern-seeker',
    name: 'The Pattern Seeker',
    thinker: 'Gregory Bateson',
    profile: { uncertainty: 'a', tool: 'b', crisis: 'b' },
    shortDesc: 'You see connections others miss. The pattern is the message.',
  },
  {
    id: 'crisis-transformer',
    name: 'The Crisis Transformer',
    thinker: 'Mihaly Csikszentmihalyi',
    profile: { uncertainty: 'b', tool: 'a', crisis: 'b' },
    shortDesc: 'You turn loss into meaning. Flow is your answer to chaos.',
  },
  {
    id: 'systems-connector',
    name: 'The Systems Connector',
    thinker: 'Donella Meadows',
    profile: { uncertainty: 'a', tool: 'b', crisis: 'a' },
    shortDesc: 'You see the whole when others see parts. Leverage is your language.',
  },
  {
    id: 'quiet-revolutionary',
    name: 'The Quiet Revolutionary',
    thinker: 'Maria Montessori',
    profile: { uncertainty: 'b', tool: 'b', crisis: 'a' },
    shortDesc: 'You change the world by changing the room. Quietly, completely.',
  },
];

export const quizQuestions = [
  {
    id: 'uncertainty',
    dimension: 'Uncertainty Response',
    text: 'When facing a problem with no clear answer, I tend to...',
    options: [
      { value: 'a', label: 'Explore multiple possibilities before committing' },
      { value: 'b', label: 'Analyze systematically until I find a framework' },
    ],
  },
  {
    id: 'tool',
    dimension: 'Tool Relationship',
    text: 'When I encounter a new tool or technology, I...',
    options: [
      { value: 'a', label: 'Experiment first, understand later' },
      { value: 'b', label: 'Understand the principles first, then use it' },
    ],
  },
  {
    id: 'crisis',
    dimension: 'Crisis Pattern',
    text: 'My biggest academic challenge came from...',
    options: [
      { value: 'a', label: 'A mismatch between who I am and my environment' },
      { value: 'b', label: 'A gap between my expectations and reality' },
    ],
  },
];

// Euclidean distance matching
export function matchPersona(answers) {
  const dims = ['uncertainty', 'tool', 'crisis'];

  let bestMatch = null;
  let bestDistance = Infinity;

  for (const persona of personas) {
    let distance = 0;
    for (const dim of dims) {
      if (answers[dim] !== persona.profile[dim]) {
        distance += 1;
      }
    }
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = persona;
    }
  }

  return bestMatch;
}
