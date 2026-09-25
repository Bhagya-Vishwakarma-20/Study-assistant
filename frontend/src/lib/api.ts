import axios from 'axios';
import { StudyResultSchema, type StudyResult } from '../lib/validateResult'
import { ApiError, getApiError } from './apiError';
const baseURL: string = import.meta.env.VITE_BASE_URL
if (!baseURL) {
    throw new Error("VITE_BASE_URL is missing! Please set it in your environment variables.");
}
const api = axios.create({ baseURL })
export const generateStudyMaterial = async (input: string): Promise<StudyResult> => {
    try {
        console.log({ input });
        const response = await api.post<unknown>("/study/generate", { input })
        const data = response.data
        return StudyResultSchema.parse(data)
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        if (axios.isAxiosError(error)) {
            throw getApiError(error);
        }
        throw new ApiError(
            "The AI returned invalid study material. Please try again.",
        );
    }
}