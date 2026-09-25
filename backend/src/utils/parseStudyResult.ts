import { studyResultSchema, type StudyResult } from '../schemas/study.schema';
import { AppError } from './handleAppError';


export const parseStudyResult = (input: string): StudyResult => {
    let parsed;
    try {
        console.log(input)
        parsed = JSON.parse(input)
        console.log(parsed)
    }
    catch {
        throw new AppError("LLM returned invalid JSON", 502);
    }
    const result = studyResultSchema.safeParse(parsed)
    console.log(result)
    if (!result.success){
        console.error("Study result validation failed:", result.error);
        throw new AppError("LLM returned invalid study data",502);
    }
    return result.data

}