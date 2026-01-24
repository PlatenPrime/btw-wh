import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PosInPalletCardSkeleton() {
  return (
    <Card className="group relative flex h-32 flex-col justify-between gap-2 overflow-hidden p-2 transition-all duration-200">
      {/* Header with image, title and actions */}
      <CardHeader className="flex min-h-0 flex-shrink-0 items-start gap-3 p-0">
        {/* Image and title section */}
        <div className="flex min-h-0 flex-1 items-start gap-3">
          {/* Art image skeleton */}
          <Skeleton className="h-10 w-10 rounded-md" />

          <div className="flex min-h-0 flex-1 flex-col justify-between gap-1">
            {/* Artikul skeleton */}
            <Skeleton className="h-4 w-20" />
            {/* Name skeleton */}
            <Skeleton className="h-3 w-32" />
          </div>
        </div>

        {/* Actions skeleton */}
        <div className="grid gap-1">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-6" />
        </div>
      </CardHeader>

      {/* Content with metrics */}
      <CardContent className="flex-shrink-0 p-0">
        <div className="grid grid-cols-3 gap-1.5">
          {/* Warehouse info skeleton */}
          <div className="bg-muted/30 flex min-h-[2rem] items-center justify-center gap-1 rounded-lg px-2 py-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-12" />
          </div>

          {/* Boxes info skeleton */}
          <div className="bg-muted/30 flex min-h-[2rem] items-center justify-center gap-1 rounded-lg px-2 py-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-8" />
          </div>

          {/* Quantity info skeleton */}
          <div className="bg-muted/30 flex min-h-[2rem] items-center justify-center gap-1 rounded-lg px-2 py-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
