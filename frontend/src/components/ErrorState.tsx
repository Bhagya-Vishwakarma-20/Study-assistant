type ErrorStateProps = {
  error: string;
  onRetry: () => void;
};

export function ErrorState({
  error,
  onRetry,
}: ErrorStateProps) {
  return (
    <div role="alert" className="mt-10 index-card">
      <div className="card-header">
        <h2 className="font-card text-lg text-ink">
          We couldn't make your cards
        </h2>
      </div>

      <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-sm leading-relaxed text-pencil">
          {error}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="btn btn-primary self-start sm:self-auto"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
