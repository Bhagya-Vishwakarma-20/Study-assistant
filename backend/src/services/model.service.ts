import 'dotenv/config'
import axios from "axios";
import { AppError } from '../utils/handleAppError';
type ModelResponse = {
    response: string
}
const MODEL_URL = process.env.MODEL_URL
const MODEL_NAME = process.env.MODEL_NAME
const RESPONSE_TIMEOUT_MS = Number(process.env.RESPONSE_TIMEOUT_MS) || 30000;
export const generateResponse = async (prompt: string): Promise<string> => {
    try {
        if (!MODEL_URL) throw new AppError("MODEL_URL is not configured", 500);
        const { data } = await axios.post<ModelResponse>(MODEL_URL, { model: MODEL_NAME, stream: false, prompt }, { timeout: RESPONSE_TIMEOUT_MS });
        if (typeof data?.response !== "string" || !data.response.trim()) throw new AppError("LLM returned an empty response", 502);
        return data.response;
    }
    catch (error) {
        if (axios.isAxiosError(error)){
            if (error.code === "ECONNABORTED" ||error.code === "ETIMEDOUT")throw new AppError("AI generation timed out",504);
            throw new AppError("AI service is unavailable",502);
        }
        throw error;
    }
}