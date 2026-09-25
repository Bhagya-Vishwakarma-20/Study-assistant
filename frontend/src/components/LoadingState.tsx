export function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center"
    >
      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />

      <p className="mt-4 text-sm font-medium text-zinc-300">
        Generating your study material...
      </p>

      <p className="mt-1 text-sm text-zinc-500">
        This may take a few seconds.
      </p>
    </div>
  );
}