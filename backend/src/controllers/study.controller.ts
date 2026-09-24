import { Request, Response } from "express";
import { generateResponse } from '../services/ollama.service'
import { buildStudyPrompt } from '../utils/studyPrompt'
export const getGenerate = async (req: Request, res: Response) => {
    const { input } = req.body;
    if (typeof input !== "string" || !input.trim()) {
        return res.status(400).json({
            error: "Input must be a non-empty string",
        });
    }
    try {
        const prompt = buildStudyPrompt(input.trim());
        const result = await generateResponse(prompt);
        return res.json({
            result,
        });
    }
    catch (error) {
        console.error("Study generation failed:", error);
        return res.status(500).json({
            error: "Failed to generate study material",
        });
    }
}