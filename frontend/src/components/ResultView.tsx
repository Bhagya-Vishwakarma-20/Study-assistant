import type { StudyResult } from "../lib/validateResult";
import type { StudyMode } from "../types/StudyMode";
import { FlashcardView } from "./FlashcardView";
import { QuizView } from "./QuizView";
type ResultViewProps = {
  result: StudyResult;
  mode: StudyMode;
};
export function ResultView({result,mode}: ResultViewProps) {
  if (mode === "flashcards") {
    return <FlashcardView cards={result.cards} />;
  }
  return <QuizView cards={result.cards} />;
}