import { Skeleton } from "@/components/ui/skeleton";

export function AskPullPositionsContainerSkeleton() {
  return (
    <div className="grid gap-4 p-2">
      <div className="p-0">
        <div className="grid gap-2">
          <Skeleton className="h-6 w-48 mx-auto" />
          {/* Условный счетчик remainingQuantity */}
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
      <div className="grid gap-4 lg:w-1/2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
    </div>
  );
}
