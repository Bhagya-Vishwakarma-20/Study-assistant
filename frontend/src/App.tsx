import { useEffect, useState } from "react";
import ModeSelector from "./components/ModeSelector";
import type { StudyMode } from "./types/StudyMode";
import PromptInput from "./components/PromptInput";
import { generateStudyMaterial } from "./lib/api";
import { FlashcardView } from "./components/FlashcardView";
import type { StudyResult } from "./lib/validateResult";
import { QuizView } from "./components/QuizView";
function App() {
  const [mode, setMode] = useState<StudyMode>("flashcards");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [result, setResult] = useState<StudyResult>();
  const [error, setError] = useState<null | string>(null);

  const handleGenerate = async (input: string) => {
    try {
      setIsGenerating(true)
      const data = await generateStudyMaterial(input);
      setResult(data)
    }
    catch (error) {
      console.error("Generation failed:", error)
      setError("We couldn't generate study material. Please try again.");
    }
    finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 font-sans text-zinc-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[480px] max-w-3xl rounded-full bg-linear-to-br from-violet-600/25 via-indigo-500/15 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-2xl px-5 py-16 sm:py-24">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px] shadow-violet-400" />
            AI-powered learning
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Study{" "}
            <span className="bg-linear-to-r from-violet-300 via-fuchsia-200 to-indigo-300 bg-clip-text font-serif text-5xl font-normal italic text-transparent sm:text-6xl">
              Assistant
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-zinc-400">
            Turn your notes into interactive study material.
          </p>
        </header>

        <section className="mt-12 rounded-3xl border border-white/10 bg-zinc-900/60 p-5 shadow-2xl shadow-black/40 ring-1 ring-inset ring-white/5 backdrop-blur-xl sm:p-7">
          <ModeSelector
            mode={mode}
            onChange={setMode}
            disabled={isGenerating}
          />

          <div className="mt-6">
            <PromptInput onSubmit={handleGenerate} disabled={isGenerating} />
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Paste lecture notes, a chapter summary, or just a topic name.
        </p>
        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}
        {result && mode === "flashcards" && <FlashcardView cards={result.cards} />}
        {result && mode === "quiz" && (
          <QuizView cards={result.cards}/>
        )}
      </div>
    </main>
  );
}

export default App;