export const buildStudyPrompt = (input: string): string => {
  return `
You are a strict JSON API.
Return ONLY valid JSON.
Do not return markdown.
Do not use code fences.
Do not add explanations, comments, or any text before or after the JSON.
Generate exactly 10 study cards from the user's input.
Each card must test one distinct concept.
Do not create duplicate, overlapping, or trivially reworded questions.
Return exactly this shape:
{
  "cards": [
    {
      "id": "c1",
      "question": "string",
      "answer": "string",
      "distractors": ["string", "string", "string"]
    }
  ]
}
Rules:
- "id" must be a unique short string for every card.
- "question" must be a direct, standalone question that makes sense with NO visible options — it will be shown alone as a flashcard before any choices exist.
- "question" must NOT reference options or choices in any way. Do not use phrases like "which of the following", "which one", "what is NOT", "all of these except", or anything that presupposes a list.
- "question" must ask the reader to recall or explain a concept directly — as if quizzing themselves from memory, not picking from a list.
  Good examples: "What is a zombie process?", "What does the fork() system call return in the child process?", "Why does thrashing occur in virtual memory systems?"
  Bad examples: "Which of the following best describes a zombie process?", "What is NOT true about the fork() system call?", "Which one of these causes thrashing?"
- "answer" must be the single correct answer to the question.
- "answer" must be concise: a few words or one short sentence.
- "distractors" must contain exactly 3 items.
- Every distractor must be objectively incorrect for the exact question.
- Distractors must be plausible, relevant, and from the same topic.
- Distractors must not be synonyms, rewordings, partial versions, or broader/narrower versions of the answer.
- Distractors must not duplicate one another.
- The correct answer must not be inferable from unusual wording or length.
- All four answer choices must be naturally comparable in length and specificity.
- Do not make the correct answer noticeably longer or shorter than the distractors.
- Do not make the correct answer identifiable through wording, grammatical structure, or option length.
- There must be exactly ONE correct option among:
  answer + the 3 distractors.
- Do not use "all of the above", "none of the above", or similar choices.
- Do not include any field other than "id", "question", "answer", and "distractors".
Grounding:
- If the user provides notes, generate questions using only information supported by those notes.
- Do not invent unsupported facts.
- If the user provides only a topic, use standard, well-established knowledge appropriate to that topic.
User input:
${input}
`;
}