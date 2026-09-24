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
                    className="mb-2 block text-sm font-medium text-zinc-300"
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
                    className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
                />

                <div className="mt-3 flex justify-end">
                    <button
                        type="submit"
                        disabled={disabled || !input.trim()}
                        className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Generate
                    </button>
                </div>
            </form>
        </>
    )
}

export default PromptInput