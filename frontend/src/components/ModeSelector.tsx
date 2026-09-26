import type { StudyMode } from "../types/StudyMode";

type ModeProps = {
    mode : StudyMode;
    onChange : (mode:StudyMode)=>void;
    disabled? : boolean;
}

const modes: { value: StudyMode; label: string }[] = [
    { value: "flashcards", label: "Flashcards" },
    { value: "quiz", label: "Quiz" },
];

const ModeSelector = ({mode , onChange , disabled=false} : ModeProps) => {
    return (
        <div
            role="group"
            aria-label="Study mode"
            className="inline-flex rounded border border-line bg-desk p-0.5"
        >
            {modes.map((option) => {
                const isActive = mode === option.value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onChange(option.value)}
                        disabled={disabled}
                        className={`relative min-h-9 rounded-[3px] px-3.5 text-sm font-medium disabled:cursor-not-allowed ${
                            isActive
                                ? "bg-card-raised text-ink"
                                : "text-pencil enabled:hover:text-ink"
                        }`}
                    >
                        {option.label}
                        {isActive && (
                            <span
                                aria-hidden="true"
                                className="absolute inset-x-3.5 bottom-1 h-0.5 rounded-full bg-highlighter"
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export default ModeSelector;
