import { useEffect, useRef, useState, type ReactNode } from "react";
import type { StudyCard } from "../lib/validateResult";
import { isTypingTarget } from "../lib/keyboard";

type FlashcardViewProps = {
  cards: StudyCard[];
  // Shown in place of the visible title, e.g. the Flashcards/Quiz toggle.
  headerStart?: ReactNode;
};

const SWIPE_DISTANCE = 50;

export function FlashcardView({ cards, headerStart }: FlashcardViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);

  const currentCard = cards[currentIndex];
  const isLastCard = currentIndex === cards.length - 1;
  const remainingBehind = Math.min(cards.length - 1 - currentIndex, 2);
  const cardNumber = `${currentIndex + 1} of ${cards.length}`;

  function handlePrevious() {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex((index) => index - 1);
    setIsFlipped(false);
  }

  function handleNext() {
    if (isLastCard) {
      return;
    }
    setCurrentIndex((index) => index + 1);
    setIsFlipped(false);
  }

  function handleStartOver() {
    setCurrentIndex(0);
    setIsFlipped(false);
  }

  function handleFlip() {
    setIsFlipped((flipped) => !flipped);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isTypingTarget(event)) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === " " && event.target === document.body) {
        // Space on a focused button already clicks it; only catch it when nothing is focused.
        event.preventDefault();
        handleFlip();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function handleTouchStart(event: React.TouchEvent) {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    didSwipe.current = false;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) {
      return;
    }

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy)) {
      return;
    }

    didSwipe.current = true;
    if (dx < 0) {
      handleNext();
    } else {
      handlePrevious();
    }
  }

  function handleCardClick() {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }
    handleFlip();
  }

  return (
    <section className="mt-12" aria-label="Flashcards">
      <div className="mb-4 mr-3 flex items-center justify-between gap-4">
        <h2 className={headerStart ? "sr-only" : "font-card text-xl font-medium"}>
          Flashcards
        </h2>
        {headerStart}
        <span className="font-stamp text-xs text-pencil">{cardNumber}</span>
      </div>

      <div className="deck">
        {remainingBehind >= 2 && <div className="deck-edge" data-depth="2" />}
        {remainingBehind >= 1 && <div className="deck-edge" data-depth="1" />}

        {/* Keyed so a new card mounts face-up instead of flipping back mid-change. */}
        <button
          key={currentIndex}
          type="button"
          onClick={handleCardClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label={isFlipped ? "Show question" : "Reveal answer"}
          aria-describedby="flashcard-content"
          className="card-scene relative"
        >
          <div
            id="flashcard-content"
            className="card-flipper"
            data-flipped={isFlipped}
            aria-live="polite"
          >
            <div
              className="card-face card-face--front index-card px-5 py-4 sm:px-10"
              aria-hidden={isFlipped}
            >
              <p className="my-auto py-8 text-center font-card text-xl font-medium leading-relaxed sm:text-2xl">
                <span className="sr-only">Question: </span>
                {currentCard.question}
              </p>

              <span className="self-center text-sm text-faint">
                Tap to turn over
              </span>
            </div>

            <div
              className="card-face card-face--back index-card text-left"
              aria-hidden={!isFlipped}
            >
              <div className="card-header">
                <p className="line-clamp-2 font-card text-sm text-pencil">
                  {currentCard.question}
                </p>
              </div>

              <p className="card-ruled flex-1 font-card text-lg">
                <span className="sr-only">Answer: </span>
                {currentCard.answer}
              </p>
            </div>
          </div>
        </button>
      </div>

      <div
        className="progress mt-5 mr-3"
        role="progressbar"
        aria-label="Deck progress"
        aria-valuemin={1}
        aria-valuemax={cards.length}
        aria-valuenow={currentIndex + 1}
      >
        <span style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }} />
      </div>

      <div className="mt-4 mr-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="btn btn-quiet"
        >
          Previous
        </button>

        <p className="hidden items-center gap-1.5 text-xs text-faint md:flex">
          <span className="kbd">Space</span> flip
          <span className="kbd ml-2">←</span>
          <span className="kbd">→</span> move
        </p>

        {isLastCard ? (
          <button
            type="button"
            onClick={handleStartOver}
            className="btn btn-quiet"
          >
            Start over
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="btn btn-primary"
          >
            Next card
          </button>
        )}
      </div>
    </section>
  );
}
