import type { StudyMode } from "../types/StudyMode";

type ModeProps = {
    mode : StudyMode;
    onChange : (mode:StudyMode)=>void;
    disabled? : boolean;
}

const ModeSelector = ({mode , onChange , disabled=false} : ModeProps) => {
    return (
        <>
            <div>
                <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Study mode
                </p>
                <div className="grid grid-cols-2 gap-1 rounded-2xl border border-white/5 bg-zinc-950/70 p-1">
                    <button
                        type="button"
                        onClick={() => onChange("flashcards")}
                        disabled={disabled}
                        className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 disabled:cursor-not-allowed disabled:opacity-50 ${mode === "flashcards"
                                ? "bg-white text-zinc-900 shadow-md shadow-black/30"
                                : "text-zinc-400 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <rect x="3" y="7" width="14" height="13" rx="2" />
                            <path d="M7 4h11a3 3 0 0 1 3 3v10" />
                        </svg>
                        Flashcards
                    </button>
                    <button
                        type="button"
                        onClick={() => onChange("quiz")}
                        disabled={disabled}
                        className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 disabled:cursor-not-allowed disabled:opacity-50 ${mode === "quiz"
                                ? "bg-white text-zinc-900 shadow-md shadow-black/30"
                                : "text-zinc-400 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.3" />
                            <path d="M12 17h.01" />
                        </svg>
                        Quiz
                    </button>
                </div>
            </div>
        </>
    )
}

export default ModeSelector