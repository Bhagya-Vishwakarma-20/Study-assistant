import { use, useEffect, useState } from "react";
import ModeSelector from "./components/ModeSelector";
import type { StudyMode } from "./types/StudyMode";
import PromptInput from "./components/PromptInput";

function App() {
  const [mode, setMode] = useState<StudyMode>("flashcards");
  const [isGenerating, setIsGenerating] = useState(false)
  useEffect(() => {
    console.log(mode)
  }, [mode])
  
  function handleGenerate(input: string) {
    setIsGenerating(true)
    console.log({input,mode,});
    setTimeout(() => {
      setIsGenerating(false)
    }, 5000);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Study Assistant
        </h1>

        <p className="mt-3 text-zinc-400">
          Turn your notes into interactive study material.
        </p>

        <ModeSelector
          mode={mode}
          onChange={setMode}
          disabled={isGenerating}
        />

        <PromptInput onSubmit={handleGenerate}  disabled={isGenerating}/>
      </div>
    </main>
  );
}

export default App;