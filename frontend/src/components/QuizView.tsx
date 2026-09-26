import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { StudyCard } from "../lib/validateResult";
import { shuffleArray } from "../lib/shuffle";
import { isTypingTarget } from "../lib/keyboard";

const OPTION_KEYS = ["A", "B", "C", "D"];

type QuizViewProps = {
  cards: StudyCard[];
  // Shown in place of the visible title, e.g. the Flashcards/Quiz toggle.
  headerStart?: ReactNode;
};
export function QuizView({ cards, headerStart }: QuizViewProps) {
  const [quizCards, setQuizCards] = useState<StudyCard[]>(cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [wrongCardIds, setWrongCardIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isRetest, setIsRetest] = useState(false);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const currentCard = quizCards[currentIndex];

  const options = useMemo(() => {
    if (!currentCard) {
      return [];
    }

    return shuffleArray([
      currentCard.answer,
      ...currentCard.distractors,
    ]);
  }, [currentCard]);

  // Answering disables the option buttons, so hand focus to Next for Enter/Space.
  useEffect(() => {
    if (selectedAnswer !== null) {
      nextButtonRef.current?.focus({ preventScroll: true });
    }
  }, [selectedAnswer]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isFinished || isTypingTarget(event)) {
        return;
      }

      const key = event.key.toUpperCase();
      const letterIndex = OPTION_KEYS.indexOf(key);
      const optionIndex =
        letterIndex !== -1 ? letterIndex : ["1", "2", "3", "4"].indexOf(key);

      if (optionIndex !== -1 && options[optionIndex] !== undefined) {
        event.preventDefault();
        handleAnswer(options[optionIndex]);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (quizCards.length === 0) {
    return null;
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

    const isLastCard = currentIndex === quizCards.length - 1;

    if (isLastCard) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setSelectedAnswer(null);
  }

  function handleRetest() {
    const cardsToRetest = cards.filter((card) =>
      wrongCardIds.includes(card.id),
    );

    if (cardsToRetest.length === 0) {
      return;
    }

    setQuizCards(cardsToRetest);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setWrongCardIds([]);
    setIsFinished(false);
    setIsRetest(true);
  }

  function handleRestart() {
    setQuizCards(cards);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setWrongCardIds([]);
    setIsFinished(false);
    setIsRetest(false);
  }

  function getOptionState(option: string) {
    if (selectedAnswer === null) {
      return "open";
    }

    if (option === currentCard.answer) {
      return "correct";
    }

    if (option === selectedAnswer) {
      return "wrong";
    }

    return "muted";
  }

  if (isFinished) {
    const missedCards = quizCards.filter((card) =>
      wrongCardIds.includes(card.id),
    );
    const isPerfect = missedCards.length === 0;

    return (
      <section className="mt-12" aria-label="Quiz results">
        {headerStart && <div className="mb-4">{headerStart}</div>}

        <div className="index-card">
          <div className="card-header flex items-baseline justify-between gap-4">
            <h2 className="font-card text-lg font-medium">
              {isRetest ? "Retest complete" : "Quiz complete"}
            </h2>
            <span className="font-stamp text-xs text-pencil">
              {quizCards.length} {quizCards.length === 1 ? "card" : "cards"}
            </span>
          </div>

          <div className="px-5 py-6 sm:px-6">
            <p className="font-card text-5xl font-medium">
              {score}
              <span className="text-faint"> / {quizCards.length}</span>
            </p>

            <p className="mt-3 text-pencil">
              {isPerfect
                ? "Every answer right. This deck is yours."
                : `You answered ${score} out of ${quizCards.length} correctly. Here's what to review:`}
            </p>

            {!isPerfect && (
              <ul className="mt-5 border-t border-rule">
                {missedCards.map((card) => (
                  <li key={card.id} className="border-b border-rule py-3">
                    <p className="font-card text-ink">{card.question}</p>
                    <p className="mt-1 flex gap-2 text-sm text-pencil">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className="mt-0.5 h-4 w-4 shrink-0 text-mint"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3.5 10.5l4 4 9-10" />
                      </svg>
                      <span>
                        <span className="sr-only">Answer: </span>
                        {card.answer}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {!isPerfect && (
                <button
                  type="button"
                  onClick={handleRetest}
                  className="btn btn-primary"
                >
                  Retest the {missedCards.length} I missed
                </button>
              )}

              <button
                type="button"
                onClick={handleRestart}
                className={isPerfect ? "btn btn-primary" : "btn btn-quiet"}
              >
                Restart full quiz
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const remainingBehind = Math.min(quizCards.length - 1 - currentIndex, 2);
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentCard.answer;
  const answeredCount = currentIndex + (isAnswered ? 1 : 0);

  return (
    <section className="mt-12" aria-label={isRetest ? "Retest" : "Quiz"}>
      <div className="mb-4 mr-3 flex items-center justify-between gap-4">
        <div>
          <h2 className={headerStart ? "sr-only" : "font-card text-xl font-medium"}>
            {isRetest ? "Retest" : "Quiz"}
          </h2>
          {headerStart}

          {isRetest && (
            <p className="mt-1 text-sm text-pencil">
              Only the questions you missed last time.
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          {!isAnswered && (
            <span className="hidden items-center gap-1.5 text-xs text-faint md:inline-flex">
              Press <span className="kbd">A</span>–<span className="kbd">D</span>{" "}
              to answer
            </span>
          )}

          <span className="font-stamp text-xs text-pencil">
            {currentIndex + 1} of {quizCards.length}
            <span className="text-faint"> · </span>
            {score} right
          </span>
        </div>
      </div>

      <div className="deck">
        {remainingBehind >= 2 && <div className="deck-edge" data-depth="2" />}
        {remainingBehind >= 1 && <div className="deck-edge" data-depth="1" />}

        <div key={currentIndex} className="index-card">
          <div className="card-header pb-3 sm:px-6">
            <p className="font-card text-lg font-medium leading-relaxed sm:text-xl">
              {currentCard.question}
            </p>
          </div>

          <div className="pb-4" role="group" aria-label="Answer options">
            {options.map((option, index) => {
              const state = getOptionState(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  data-state={state}
                  className="answer-row font-card disabled:cursor-default sm:px-6"
                >
                  <span className="answer-mark" aria-hidden="true">
                    {state === "correct" ? (
                      <svg viewBox="0 0 20 20" className="inline h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3.5 10.5l4 4 9-10" />
                      </svg>
                    ) : state === "wrong" ? (
                      <svg viewBox="0 0 20 20" className="inline h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round">
                        <path d="M5 5l10 10M15 5L5 15" />
                      </svg>
                    ) : (
                      OPTION_KEYS[index]
                    )}
                  </span>

                  <span className="flex-1">
                    <span className="answer-text">{option}</span>

                    {state === "correct" && (
                      <span className="sr-only"> (correct answer)</span>
                    )}

                    {option === selectedAnswer && (
                      <span className="ml-2 inline-block font-stamp text-xs text-pencil">
                        your answer
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="progress mt-5 mr-3"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={quizCards.length}
        aria-valuenow={answeredCount}
      >
        <span style={{ width: `${(answeredCount / quizCards.length) * 100}%` }} />
      </div>

      {/* Stays mounted for the live region, but takes no space until answered. */}
      <div
        className={`mr-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 ${
          isAnswered ? "mt-4 min-h-10" : ""
        }`}
      >
        <p className="text-sm" aria-live="polite">
          {isAnswered ? (
            isCorrect ? (
              <span className="text-mint">Correct.</span>
            ) : (
              <span className="text-pencil">
                <span className="text-rose">Not quite.</span> The right answer
                is ticked.
              </span>
            )
          ) : null}
        </p>

        {isAnswered && (
          <button
            ref={nextButtonRef}
            type="button"
            onClick={handleNext}
            className="btn btn-primary ml-auto"
          >
            {currentIndex === quizCards.length - 1
              ? "See results"
              : "Next question"}
          </button>
        )}
      </div>
    </section>
  );
}
