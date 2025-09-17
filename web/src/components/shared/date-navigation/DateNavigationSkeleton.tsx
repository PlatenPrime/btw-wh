import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DateNavigationSkeleton() {
  return (
    <Card className="p-2">
      <div className="flex items-center justify-between gap-2">
        {/* Previous button skeleton */}
        <Skeleton className="h-10 w-10 rounded-md" />

        <div className="flex items-center gap-3">
          {/* Calendar button skeleton */}
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>

        {/* Next button skeleton */}
        <Skeleton className="h-10 w-10 rounded-md" />

        {/* Date text skeleton */}
        <Skeleton className="h-5 w-24" />
      </div>
    </Card>
  );
}
