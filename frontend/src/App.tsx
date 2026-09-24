import PromptInput from "./components/PromptInput";

function App() {
  function handleGenerate(input: string) {
    console.log("Generate:", input);
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
        <PromptInput onSubmit={handleGenerate} />
      </div>
    </main>
  );
}

export default App;