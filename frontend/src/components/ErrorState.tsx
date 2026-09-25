type ErrorStateProps = {
  error: string;
  onRetry: () => void;
};

export function ErrorState({
  error,
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="mt-8 rounded-2xl border border-red-900/50 bg-red-950/20 p-8 text-center"
    >
      <h2 className="text-lg font-semibold text-red-300">
        Something went wrong
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-red-400/80">
        {error}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
      >
        Try again
      </button>
    </div>
  );
}