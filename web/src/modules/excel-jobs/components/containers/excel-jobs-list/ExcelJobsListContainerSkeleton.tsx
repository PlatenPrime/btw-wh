import { ListRowCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function ExcelJobsListContainerSkeleton() {
  return (
    <div className="grid gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <ListRowCard
          key={index}
          className="flex-row items-center justify-between gap-3"
        >
          <div className="min-w-0 flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-3 w-64" />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="size-8" />
          </div>
        </ListRowCard>
      ))}
    </div>
  );
}
