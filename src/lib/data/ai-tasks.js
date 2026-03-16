export const aiTasks = [
  {
    id: 1,
    question: "A researcher reports that their study found a correlation of r = 0.85 between hours of study and exam scores. They conclude that studying more causes higher exam scores. AI suggests this conclusion is valid because the correlation is strong.",
    aiAnswer: "The conclusion is valid. A correlation of 0.85 is very strong, indicating a clear causal relationship between study hours and exam performance.",
    aiCorrect: false,
    explanation: "Correlation does not imply causation. There could be confounding variables (e.g., motivation, prior knowledge) that explain both increased study hours and higher scores."
  },
  {
    id: 2,
    question: "What is the primary difference between a within-subjects design and a between-subjects design?",
    aiAnswer: "In a within-subjects design, each participant experiences all conditions. In a between-subjects design, different participants are assigned to different conditions.",
    aiCorrect: true,
    explanation: "This is a correct and standard definition of these two experimental design types."
  },
  {
    id: 3,
    question: "A 2\u00d72 factorial design with 30 participants per cell. How many total participants are needed?",
    aiAnswer: "A 2\u00d72 design has 4 cells. With 30 per cell, you need 120 participants total.",
    aiCorrect: true,
    explanation: "Correct. 2\u00d72 = 4 conditions \u00d7 30 participants = 120 total."
  },
  {
    id: 4,
    question: "A study uses a Likert scale from 1-5 to measure attitudes. The researcher calculates the mean and runs a t-test. AI says this is appropriate because Likert data is interval-level.",
    aiAnswer: "Yes, Likert scale data is interval-level, so parametric tests like t-tests are fully appropriate.",
    aiCorrect: false,
    explanation: "Whether single Likert items are truly interval-level is debated. Many methodologists argue individual Likert items are ordinal. While composite Likert scales may approximate interval data, claiming a single item is definitively interval-level oversimplifies the issue."
  },
  {
    id: 5,
    question: "What does a p-value of .03 mean in hypothesis testing?",
    aiAnswer: "A p-value of .03 means there is a 3% probability that the observed results (or more extreme) would occur if the null hypothesis were true.",
    aiCorrect: true,
    explanation: "This is a correct interpretation of the p-value."
  },
  {
    id: 6,
    question: "A researcher finds that their intervention group improved significantly (p < .05) compared to the control group, with a Cohen\u2019s d of 0.15. AI concludes this is a meaningful and impactful result.",
    aiAnswer: "The result is statistically significant and therefore practically meaningful. The intervention should be widely implemented.",
    aiCorrect: false,
    explanation: "Statistical significance does not equal practical significance. Cohen\u2019s d = 0.15 is a very small effect size. The intervention may be statistically detectable but too small to be practically meaningful or worth the cost of implementation."
  }
];
