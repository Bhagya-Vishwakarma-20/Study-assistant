import type { StudyMode } from "../types/StudyMode";

type ModeProps = {
    mode : StudyMode;
    onChange : (mode:StudyMode)=>void;
    disabled? : boolean;
}

const ModeSelector = ({mode , onChange , disabled=false} : ModeProps) => {
    return (
        <>
            <div className="mt-6">
                <p className="mb-2 text-sm font-medium text-zinc-300">
                    Study mode
                </p>
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-zinc-900 p-1">
                    <button
                        type="button"
                        onClick={() => onChange("flashcards")}
                        disabled={disabled}
                        className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${mode === "flashcards"
                                ? "bg-white text-zinc-900"
                                : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        Flashcards
                    </button>
                    <button
                        type="button"
                        onClick={() => onChange("quiz")}
                        disabled={disabled}
                        className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${mode === "quiz"
                                ? "bg-white text-zinc-900"
                                : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        Quiz
                    </button>
                </div>
            </div>
        </>
    )
}

export default ModeSelector