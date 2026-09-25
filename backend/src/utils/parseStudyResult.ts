import { studyResultSchema, type StudyResult } from '../schemas/study.schema';
import { AppError } from './handleAppError';


export const parseStudyResult = (input: string): StudyResult => {
    let parsed;
    try {
    parsed = JSON.parse(input)
    }
    catch {
        throw new AppError("LLM returned invalid JSON", 502);
    }
    const result = studyResultSchema.safeParse(parsed)
    if (!result.success){
        console.error("Study result validation failed:", result.error);
        throw new AppError("LLM returned invalid study data",502);
    }
    return result.data

}