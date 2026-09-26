export function LoadingState() {
  return (
    <div role="status" aria-live="polite" className="mt-10 max-w-md">
      <div className="deck">
        <div className="deck-edge" data-depth="2" />
        <div className="deck-edge" data-depth="1" />

        <div className="index-card">
          <div className="card-header">
            <p className="font-card text-ink">Writing your cards…</p>
          </div>

          <div className="space-y-4 px-5 py-6">
            <div className="writing-line w-11/12" />
            <div className="writing-line w-9/12" />
            <div className="writing-line w-10/12" />
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-pencil">This usually takes a few seconds.</p>
    </div>
  );
}
