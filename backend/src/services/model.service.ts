import 'dotenv/config'
import axios from "axios";
import { AppError } from '../utils/handleAppError';
type GeminiResponse = {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
}
const MODEL_URL = process.env.MODEL_URL
const MODEL_NAME = process.env.MODEL_NAME
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const RESPONSE_TIMEOUT_MS = Number(process.env.RESPONSE_TIMEOUT_MS) || 30000;
export const generateResponse = async (prompt: string): Promise<string> => {
    try {
        if (!MODEL_URL || !MODEL_NAME) throw new AppError("MODEL_URL or MODEL_NAME is not configured", 500);
        if (!GEMINI_API_KEY) throw new AppError("GEMINI_API_KEY is not configured", 500);
        const { data } = await axios.post<GeminiResponse>(
            `${MODEL_URL}/${MODEL_NAME}:generateContent`,
            {
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" },
            },
            { timeout: RESPONSE_TIMEOUT_MS, headers: { "x-goog-api-key": GEMINI_API_KEY } }
        );
        const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("");
        if (typeof text !== "string" || !text.trim()) throw new AppError("LLM returned an empty response", 502);
        return text;
    }
    catch (error) {
        if (axios.isAxiosError(error)){
            if (error.code === "ECONNABORTED" ||error.code === "ETIMEDOUT")throw new AppError("AI generation timed out",504);
            console.error("Gemini request failed:", error.response?.status, error.response?.data?.error?.message);
            throw new AppError("AI service is unavailable",502);
        }
        throw error;
    }
}
