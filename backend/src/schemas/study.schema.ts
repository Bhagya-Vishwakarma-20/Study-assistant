import {  z } from "zod";

const hasDuplicates = (arr : String[]) => {
  return new Set(arr).size != arr.length
}

// Case- and whitespace-insensitive form used for uniqueness checks
const normalize = (text: string) => text.replace(/\s+/g, " ").toLowerCase()

const text = () => z.string().trim().min(1)

export const studyCardSchema = z.object({
  id: text(),
  question: text(),
  answer: text(),
  distractors: z.tuple([
    text(),
    text(),
    text(),
  ]),
}).refine(
  (card)=>{
    const options = [...card.distractors , card.answer].map(normalize)
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
      return !hasDuplicates(result.cards.map(card=> normalize(card.question)))
  },
  {
      message: "Questions must be unique",
      path: ["cards"],
  }
)

export type StudyCard = z.infer<typeof studyCardSchema>;
export type StudyResult = z.infer<typeof studyResultSchema>;