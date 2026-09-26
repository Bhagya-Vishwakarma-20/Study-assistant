export function EmptyState() {
  return (
    <div className="mt-12 flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
      <div aria-hidden="true" className="relative h-20 w-28 shrink-0">
        <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded border border-dashed border-line" />
        <div className="absolute inset-0 translate-x-1 translate-y-1 rounded border border-dashed border-line" />
        <div className="absolute inset-0 rounded border border-dashed border-faint/60" />
      </div>

      <div>
        <h2 className="font-card text-lg text-ink">Your deck will appear here</h2>
        <p className="mt-1 max-w-md text-sm leading-relaxed text-pencil">
          A few lines about one topic work best. Paste a lecture section,
          a textbook paragraph, or just name what you want to learn.
        </p>
      </div>
    </div>
  );
}
