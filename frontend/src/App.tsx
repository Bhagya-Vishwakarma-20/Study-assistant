import { useRef, useState } from "react";
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
  // The composer steps back once a set exists (or a new one is on its way),
  // so the cards/quiz become the focus of the page.
  const hasStudySet = result !== null || isGenerating;

  const handleRetry = () => {
    if (!lastInput) return;
    void handleGenerate(lastInput);
  };

  return (
    <main className="min-h-screen bg-desk text-ink">
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-14">
        <header className="flex items-center gap-3">
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="h-8 w-8 shrink-0"
            fill="none"
          >
            <rect x="7" y="9" width="21" height="15" rx="2" fill="#252d3a" stroke="#3a4556" />
            <rect x="4" y="6" width="21" height="15" rx="2" fill="#1e2530" stroke="#4a5669" />
            <path d="M4 10.5h21" stroke="#de7182" strokeWidth="1.5" />
            <path d="M8 14.5h11M8 17.5h7" stroke="#e4cf6e" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          <h1 className="font-card text-2xl font-medium sm:text-[1.75rem]">
            Study Assistant
          </h1>
        </header>

        {!hasStudySet && (
          <p className="mt-3 max-w-xl text-pencil">
            Paste your notes or name a topic, and get a deck of cards to flip
            through or quiz yourself on.
          </p>
        )}

        <PromptInput
          onSubmit={handleGenerate}
          disabled={isGenerating}
          isGenerating={isGenerating}
          compact={hasStudySet}
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
            onModeChange={setMode}
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
