import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DefCardSkeleton() {
  return (
    <Card className="bg-background shadow-muted-foreground h-full flex-col justify-between p-2 text-sm shadow-none ring-1 ring-gray-200 dark:ring-gray-700">
      {/* Image and name */}
      <div className="flex items-center justify-between gap-2 text-sm">
        <Skeleton className="aspect-square h-12 w-12 rounded-lg" />
        <Skeleton className="h-full w-32" />
        <div className="grid place-items-center">
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
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
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>
    </Card>
  );
}
