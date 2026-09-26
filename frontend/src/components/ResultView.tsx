import { useEffect, useRef } from "react";
import type { StudyResult } from "../lib/validateResult";
import type { StudyMode } from "../types/StudyMode";
import { FlashcardView } from "./FlashcardView";
import { QuizView } from "./QuizView";
import ModeSelector from "./ModeSelector";
type ResultViewProps = {
  result: StudyResult;
  mode: StudyMode;
  onModeChange: (mode: StudyMode) => void;
};
export function ResultView({result,mode,onModeChange}: ResultViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Bring a freshly generated deck into view; on phones it lands below the fold.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    containerRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }, [result]);

  const modeToggle = <ModeSelector mode={mode} onChange={onModeChange} />;

  return (
    <div ref={containerRef} className="scroll-mt-6 [&>section]:mt-10">
      {mode === "flashcards" ? (
        <FlashcardView cards={result.cards} headerStart={modeToggle} />
      ) : (
        <QuizView cards={result.cards} headerStart={modeToggle} />
      )}
    </div>
  );
}
