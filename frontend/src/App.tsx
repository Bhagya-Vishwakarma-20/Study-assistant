import { useRef, useState } from "react";
import ModeSelector from "./components/ModeSelector";
import type { StudyMode } from "./types/StudyMode";
import PromptInput from "./components/PromptInput";
import { generateStudyMaterial } from "./lib/api";
import type { StudyResult } from "./lib/validateResult";
import { EmptyState } from "./components/EmptyState";
import { ResultView } from "./components/ResultView";
import { ErrorState } from "./components/ErrorState";
import { LoadingState } from "./components/LoadingState";
import { ApiError } from "./lib/apiError";
function App() {
  const requestId = useRef(0);
  const [mode, setMode] = useState<StudyMode>("quiz");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [result, setResult] = useState<StudyResult | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [lastInput, setLastInput] = useState<string>("");
  const handleGenerate = async (input: string) => {
    const id = ++requestId.current;
    setIsGenerating(true)
    setError(null);
    setResult(null);
    setLastInput(input);
    try {
      const data = await generateStudyMaterial(input);
      if (id !== requestId.current) {
        return;
      }
      setResult(data)
    }
    catch (error) {
      if (id !== requestId.current) {
        return;
      }
      console.error("Generation failed:", error);
      if (error instanceof ApiError) {
        setError(error.message);
      } 
      else{
        setError(
          "We couldn't generate study material. Please try again.",
        );
      }
    }
    finally {
      if (id === requestId.current) {
        setIsGenerating(false);
      }
    }
  }
  const handleRetry = () => {
    if (!lastInput) return;
    void handleGenerate(lastInput);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Study Assistant
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-400">
          Turn your notes into interactive study material.
        </p>

        <ModeSelector
          mode={mode}
          onChange={setMode}
          disabled={isGenerating}
        />

        <PromptInput
          onSubmit={handleGenerate}
          disabled={isGenerating}
        />

        {isGenerating && <LoadingState />}

        {!isGenerating && error && (
          <ErrorState
            error={error}
            onRetry={handleRetry}
          />
        )}

        {!isGenerating && !error && result && (
          <ResultView
            result={result}
            mode={mode}
          />
        )}

        {!isGenerating && !error && !result && (
          <EmptyState />
        )}
      </div>
    </main>
  );
}

export default App;