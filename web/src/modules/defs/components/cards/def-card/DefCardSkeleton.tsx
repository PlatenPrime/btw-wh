import { Badge } from "@/components/ui/badge";
import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DefCardSkeleton() {
  return (
    <Card className="bg-background shadow-muted-foreground h-full p-0 shadow-none ring-1 ring-gray-200 dark:ring-gray-700">
      <div className="h-full rounded-xl p-1">
        <div className="flex h-full flex-col gap-2">
          {/* Header with status badge */}
          <div className="flex items-start justify-between gap-2 p-2">
            <Skeleton className="h-3 w-16" />
            <Badge variant="secondary" className="text-xs">
              <Skeleton className="h-3 w-12" />
            </Badge>
          </div>

          {/* Image and name */}
          <div className="flex flex-1 flex-col items-center gap-2 px-2">
            <Skeleton className="aspect-square w-16 rounded-lg" />
            <CardDescription className="text-center text-xs">
              <Skeleton className="h-3 w-20" />
            </CardDescription>
          </div>

          {/* Stock info */}
          <div className="space-y-1 px-2 pb-2">
            <div className="flex justify-between text-xs">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-8" />
            </div>
            <div className="flex justify-between text-xs">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-8" />
            </div>
            <div className="flex justify-between text-xs">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>

          {/* Create ask button */}
          <div className="p-2 pt-0">
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
        </div>
      </div>
    </Card>
  );
}
