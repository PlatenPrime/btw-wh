import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function PalletInRowCardSkeleton() {
  return (
    <Card className={cn("gap-2 p-2")}>
      <CardHeader className="flex items-start gap-2 p-0">
        <div
          className={cn(
            "flex w-full items-center justify-start gap-2 rounded-md p-2",
          )}
        >
          {/* Icon skeleton */}
          <Skeleton className="h-3 w-3" />
          {/* Title skeleton */}
          <Skeleton className="h-4 w-32" />
        </div>
        {/* Edit button skeleton */}
        <Skeleton className="h-8 w-8 rounded-md" />
      </CardHeader>
      <CardContent className="flex items-start justify-between gap-2 p-0 px-2">
        {/* Sector skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Def status skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3" />
        </div>
      </CardContent>
    </Card>
  );
}
