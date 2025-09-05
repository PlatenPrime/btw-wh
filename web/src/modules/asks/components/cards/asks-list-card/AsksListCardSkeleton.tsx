import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AsksListCardSkeleton() {
  return (
    <Card className="flex flex-row items-start gap-4 p-2">
      {/* AskImageStatus skeleton */}
      <div className="flex flex-shrink-0 flex-col items-center gap-2">
        <Skeleton className="h-16 w-16 rounded-md" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>

      {/* Content skeleton */}
      <div className="grid flex-1 gap-2">
        {/* AskInfo skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* AskerData skeleton */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    </Card>
  );
}
