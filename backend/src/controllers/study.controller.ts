import { Request, Response } from "express";
import { generateResponse } from '../services/model.service'
import { buildStudyPrompt } from '../utils/generateStudyPrompt'
import { parseStudyResult } from "../utils/parseStudyResult";
import { AppError } from "../utils/handleAppError";
export const postGenerate = async (req: Request, res: Response) => {
    const { input } = req.body;
    if (typeof input !== "string" || !input.trim()) {
        return res.status(400).json({
            error: "Input must be a non-empty string",
        });
    }
    try {
        const prompt = buildStudyPrompt(input.trim());
        const rawResult = await generateResponse(prompt);
        const result = parseStudyResult(rawResult)
        return res.json(result);
    }
    catch (error) {
        console.error("Study generation failed:", error);
        if (error instanceof AppError){
            return res.status(error.statusCode).json({
                error: error.message
            })
        }
        return res.status(500).json({
            error: "Failed to generate study material",
        });
    }
}