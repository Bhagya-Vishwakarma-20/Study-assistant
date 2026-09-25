import { useState } from "react";
import type { StudyCard } from "../lib/validateResult";

type FlashcardViewProps = {
  cards: StudyCard[];
};

export function FlashcardView({ cards }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIndex];

  function handlePrevious() {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((index) => index - 1);
    setIsFlipped(false);
  }

  function handleNext() {
    if (currentIndex === cards.length - 1) {
      return;
    }
    setCurrentIndex((index) => index + 1);
    setIsFlipped(false);
  }

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Flashcards</h2>

        <span className="text-sm text-zinc-400">
          {currentIndex + 1} / {cards.length}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setIsFlipped((flipped) => !flipped)}
        className="flex min-h-80 w-full flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center transition hover:border-zinc-600"
      >
        <span className="mb-6 text-xs font-medium uppercase tracking-wider text-zinc-500">
          {isFlipped ? "Answer" : "Question"}
        </span>

        <p className="max-w-2xl text-xl font-medium leading-relaxed">
          {isFlipped ? currentCard.answer : currentCard.question}
        </p>

        <span className="mt-8 text-sm text-zinc-500">
          Click to {isFlipped ? "see question" : "reveal answer"}
        </span>
      </button>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </section>
  );
}