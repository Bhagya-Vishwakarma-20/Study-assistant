import axios from "axios";
export class ApiError extends Error {
    constructor(
        message: string,
        statusCode?: number,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

type ApiErrorResponse = {
    error?: unknown;
};

export function getApiError(error: unknown): ApiError {
    if (!axios.isAxiosError<ApiErrorResponse>(error)) {
        return new ApiError(
            "Something went wrong. Please try again.",
        );
    }

    const statusCode = error.response?.status;
    const serverMessage = error.response?.data?.error;

    if (statusCode === 504) {
        return new ApiError(
            "The AI took too long to respond. Please try again.",
            statusCode,
        );
    }

    if (
        serverMessage === "AI service is unavailable"
    ) {
        return new ApiError(
            "The AI service is currently unavailable. Please try again.",
            statusCode,
        );
    }

    if (
        serverMessage === "LLM returned invalid JSON" ||
        serverMessage === "LLM returned invalid study data"
    ) {
        return new ApiError(
            "The AI returned invalid study material. Please try again.",
            statusCode,
        );
    }

    if (statusCode === 400) {
        return new ApiError(
            "Please enter a valid topic or set of notes.",
            statusCode,
        );
    }

    return new ApiError(
        "We couldn't generate study material. Please try again.",
        statusCode,
    );
}