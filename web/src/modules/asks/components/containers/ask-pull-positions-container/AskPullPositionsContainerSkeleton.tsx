import { DetailPanelCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function AskPullPositionsContainerSkeleton() {
  return (
    <DetailPanelCard className="grid gap-4 p-4 sm:p-5">
      <div className="grid gap-2">
        <Skeleton className="mx-auto h-6 w-48" />
        <div className="flex items-center gap-1">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="grid gap-4 lg:max-w-xl">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
    </DetailPanelCard>
  );
}
