import {  z } from "zod";

const hasDuplicates = (arr : String[]) => {
  return new Set(arr).size == arr.length
}

export const studyCardSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  distractors: z.tuple([
    z.string().min(1),
    z.string().min(1),
    z.string().min(1),
  ]),
}).refine(
  (card)=>{
    const options = [...card.distractors , card.answer].map((text)=> text.toLowerCase())
    return !hasDuplicates(options)
  } ,
  {
    message: "Answer and distractors must be unique",
    path: ["distractors"],
  }
)

export const studyResultSchema = z.object({
  cards: z.array(studyCardSchema).length(10),
}).refine(
  (result)=>{
      return !hasDuplicates(result.cards.map(card=> card.id))
  },
  {
      message: "Card IDs must be unique",
      path: ["cards"],
  }
).refine(
  (result)=>{
      return !hasDuplicates(result.cards.map(card=> card.question.toLowerCase()))
  },
  {
      message: "Questions must be unique",
      path: ["cards"],
  }
)

export type StudyCard = z.infer<typeof studyCardSchema>;
export type StudyResult = z.infer<typeof studyResultSchema>;