export function BlocksBoardSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={`block-skeleton-${index}`}
          className="animate-pulse rounded-xl border border-border/60 bg-muted/30 p-6"
        >
          <div className="flex flex-col gap-4">
            <div className="h-6 w-40 rounded bg-muted" />
            <div className="flex flex-col gap-2">
              {Array.from({ length: 3 }).map((__, zoneIndex) => (
                <div
                  key={`zone-skeleton-${zoneIndex}`}
                  className="h-10 rounded-lg bg-muted/80"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

