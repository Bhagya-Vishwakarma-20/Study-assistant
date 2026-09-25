import React from 'react'
import { useState } from "react";
type PromptInputProps = {
    onSubmit : (input:string)=>void;
    disabled? : boolean;
}

const PromptInput = ({onSubmit , disabled = false} : PromptInputProps) => {
    const [input, setInput] = useState("");
    const handleSubmit = (event : React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput) {
        return;
        }
        onSubmit(trimmedInput);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label
                    htmlFor="study-input"
                    className="mb-2.5 block text-xs font-medium uppercase tracking-wider text-zinc-500"
                >
                    Enter a topic or paste your notes
                </label>
                <textarea
                    id="study-input"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="e.g. Explain processes and threads in operating systems..."
                    disabled={disabled}
                    rows={7}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-zinc-950/70 p-4 text-[15px] leading-relaxed text-zinc-100 outline-none transition placeholder:text-zinc-600 hover:border-white/20 focus:border-violet-400/50 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                />

                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={disabled || !input.trim()}
                        className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-b from-violet-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 ring-1 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-px hover:shadow-xl hover:shadow-violet-800/50 hover:brightness-110 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:brightness-100"
                    >
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 transition-transform duration-300 group-enabled:group-hover:rotate-12">
                            <path d="M12 2.5l1.9 5.6 5.6 1.9-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9L12 2.5z" />
                            <path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8L19 15z" opacity=".7" />
                        </svg>
                        Generate
                    </button>
                </div>
            </form>
        </>
    )
}

export default PromptInput