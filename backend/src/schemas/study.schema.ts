import { z } from "zod";

export const studyCardSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  distractors: z.tuple([
    z.string().min(1),
    z.string().min(1),
    z.string().min(1),
  ]),
});

export const studyResultSchema = z.object({
  cards: z.array(studyCardSchema).length(10),
});

export type StudyCard = z.infer<typeof studyCardSchema>;
export type StudyResult = z.infer<typeof studyResultSchema>;