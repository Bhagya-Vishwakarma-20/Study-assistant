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
                        className="inline-flex items-center rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-white/10 transition-all duration-200 hover:-translate-y-px hover:bg-zinc-200 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:translate-y-0 disabled:cursor-not-allowed disabled:border disabled:border-white/10 disabled:bg-zinc-900 disabled:text-zinc-500 disabled:shadow-none"
                    >
                        Generate
                    </button>
                </div>
            </form>
        </>
    )
}

export default PromptInput