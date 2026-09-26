import React from 'react'
import { useState } from "react";
type PromptInputProps = {
    onSubmit : (input:string)=>void;
    disabled? : boolean;
    isGenerating? : boolean;
    footerStart? : React.ReactNode;
    compact? : boolean;
}

const PromptInput = ({onSubmit , disabled = false , isGenerating = false , footerStart , compact = false} : PromptInputProps) => {
    const [input, setInput] = useState("");
    const handleSubmit = (event : React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput) {
        return;
        }
        onSubmit(trimmedInput);
    }
    const handleKeyDown = (event : React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className={compact ? "mt-5" : "mt-8"}>
                <div className="mb-2 flex items-baseline justify-between gap-3">
                    <label
                        htmlFor="study-input"
                        className="block text-sm font-medium text-pencil"
                    >
                        Your notes or topic
                    </label>

                    {compact && (
                        <span className="text-xs text-faint">
                            Generate another study set
                        </span>
                    )}
                </div>

                <div
                    data-compact={compact}
                    className="composer rounded-lg border border-line bg-panel"
                >
                    <textarea
                        id="study-input"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="e.g. Processes and threads in operating systems"
                        disabled={disabled}
                        rows={compact ? 3 : 5}
                        className="composer-field disabled:cursor-not-allowed disabled:text-pencil"
                    />

                    <div className={`flex flex-wrap items-center justify-between gap-3 px-1 ${compact ? "pt-2" : "pt-3"}`}>
                        {footerStart}

                        <div className="ml-auto flex items-center gap-3">
                            <span className="hidden items-center gap-1 text-xs text-faint sm:flex">
                                <span className="kbd">Ctrl</span>
                                <span className="kbd">Enter</span>
                            </span>

                            <button
                                type="submit"
                                disabled={disabled || !input.trim()}
                                className="btn btn-primary"
                            >
                                {isGenerating ? "Generating…" : "Generate cards"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default PromptInput
