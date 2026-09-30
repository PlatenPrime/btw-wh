import { ListRowCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function ApiTaskDetailContainerSkeleton() {
  return (
    <div className="grid gap-3">
      <Skeleton className="h-8 w-40" />
      <ListRowCard className="flex-col items-stretch gap-4">
        <div className="grid gap-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="grid gap-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
        <Skeleton className="h-40 w-full" />
      </ListRowCard>
    </div>
  );
}
