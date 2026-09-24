export const  buildStudyPrompt = (input: string):string => {
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
- "question" must test one clear, objectively answerable concept.
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