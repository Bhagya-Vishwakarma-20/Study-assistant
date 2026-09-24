import {z} from "zod"

export const StudyCardSchema =  z.object({
    id : z.string().min(1) , 
    question : z.string().min(1),
    answer : z.string().min(1),
    distractors : z.tuple([z.string().min(1),z.string().min(1),z.string().min(1)])
});

export const StudyResultSchema = z.object({
   cards: z.array(StudyCardSchema).min(1) 
}) 

export type StudyCard = z.infer< typeof StudyCardSchema>;
export type StudyResult = z.infer< typeof StudyResultSchema>;