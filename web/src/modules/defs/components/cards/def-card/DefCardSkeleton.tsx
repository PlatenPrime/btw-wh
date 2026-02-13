import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DefCardSkeleton() {
  return (
    <Card className="h-full grid p-2 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-md dark:ring-gray-700 gap-2 text-sm">
      {/* ArtikulImageLink skeleton */}
      <div className="flex items-center justify-between gap-2 text-sm">
        <div className="flex min-h-0 flex-1 items-start gap-3">
          <Skeleton className="size-10 rounded-md" />
          <div className="flex h-full w-full flex-col justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-16 rounded-md" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      {/* DefCardQuants + DefCardAskBid/DefAskButton skeleton (horizontal row) */}
      <div className="flex min-h-0 flex-row items-stretch gap-2">
        <div className="min-w-0 flex-1">
          <div className="space-y-1 px-2 pb-2">
            <div className="flex items-center justify-start gap-2 text-xs">
              <Skeleton className="size-4 shrink-0" />
              <Skeleton className="h-3 w-8" />
            </div>
            <div className="flex items-center justify-start gap-2 text-xs">
              <Skeleton className="size-4 shrink-0" />
              <Skeleton className="h-3 w-8" />
            </div>
            <div className="flex items-center justify-start gap-2 text-xs">
              <Skeleton className="size-4 shrink-0" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        </div>
        <div className="grid shrink-0 place-items-center rounded-md">
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </Card>
  );
}
