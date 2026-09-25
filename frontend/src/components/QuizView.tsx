import { useMemo, useState } from "react";
import type { StudyCard } from "../lib/validateResult";
import { shuffleArray } from "../lib/shuffle";

type QuizViewProps = {
  cards: StudyCard[];
};

export function QuizView({ cards }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [wrongCardIds, setWrongCardIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentCard = cards[currentIndex];

  const options = useMemo(() => {
    if (!currentCard) {
      return [];
    }
    return  shuffleArray([
      currentCard.answer,
      ...currentCard.distractors,
    ]);
  }, [currentCard]);

  if (cards.length === 0) {
    return null;
  }

  if (isFinished) {
    return (
      <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
        <p className="text-sm uppercase tracking-wider text-zinc-500">
          Quiz complete
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          {score} / {cards.length}
        </h2>

        <p className="mt-3 text-zinc-400">
          You answered {score} out of {cards.length} correctly.
        </p>

        {wrongCardIds.length > 0 && (
          <p className="mt-2 text-sm text-zinc-500">
            {wrongCardIds.length} card
            {wrongCardIds.length === 1 ? "" : "s"} answered incorrectly.
          </p>
        )}
      </section>
    );
  }

  function handleAnswer(option: string) {
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(option);

    if (option === currentCard.answer) {
      setScore((currentScore) => currentScore + 1);
      return;
    }

    setWrongCardIds((ids) => [...ids, currentCard.id]);
  }

  function handleNext() {
    if (selectedAnswer === null) {
      return;
    }

    const isLastCard = currentIndex === cards.length - 1;

    if (isLastCard) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedAnswer(null);
  }

  function getOptionClassName(option: string) {
    if (selectedAnswer === null) {
      return "border-zinc-700 bg-zinc-900 hover:border-zinc-500 hover:bg-zinc-800";
    }

    if (option === currentCard.answer) {
      return "border-emerald-500 bg-emerald-500/10";
    }

    if (option === selectedAnswer) {
      return "border-red-500 bg-red-500/10";
    }

    return "border-zinc-800 bg-zinc-900 opacity-60";
  }

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Quiz</h2>

        <span className="text-sm text-zinc-400">
          {currentIndex + 1} / {cards.length}
        </span>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
        <p className="text-xl font-medium leading-relaxed">
          {currentCard.question}
        </p>

        <div className="mt-8 grid gap-3">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`rounded-xl border p-4 text-left text-sm transition ${getOptionClassName(
                option,
              )}`}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-6">
            <p
              className={
                selectedAnswer === currentCard.answer
                  ? "text-sm text-emerald-400"
                  : "text-sm text-red-400"
              }
            >
              {selectedAnswer === currentCard.answer
                ? "Correct!"
                : `Incorrect. Correct answer: ${currentCard.answer}`}
            </p>

            <button
              type="button"
              onClick={handleNext}
              className="mt-4 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
            >
              {currentIndex === cards.length - 1
                ? "Finish quiz"
                : "Next"}
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-right text-sm text-zinc-500">
        Score: {score}
      </p>
    </section>
  );
}