import { Skeleton } from "@/components/ui/skeleton";

export function SkuMultiSelectControlSkeleton() {
  return (
    <div className="grid gap-4">
      <Skeleton className="h-9 w-full" />
      <div className="grid gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="grid gap-2 rounded-md border border-border p-2"
          >
            <Skeleton className="h-6 w-24" />
            <div className="flex items-start gap-2">
              <Skeleton className="size-4 shrink-0 rounded-sm" />
              <Skeleton className="size-12 shrink-0 rounded-lg" />
              <div className="grid min-w-0 flex-1 gap-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
