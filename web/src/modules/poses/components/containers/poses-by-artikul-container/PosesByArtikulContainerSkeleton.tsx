import { DetailPanelCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

function SkladPosesListSkeleton({ rows }: { rows: number }) {
  return (
    <DetailPanelCard className="grid gap-3 p-4 sm:p-5">
      <div className="grid grid-cols-3 items-center gap-2">
        <Skeleton className="h-5 w-16" />
        <div className="flex items-center justify-center">
          <Skeleton className="h-5 w-8" />
        </div>
        <div className="flex items-center justify-end">
          <Skeleton className="h-5 w-8" />
        </div>
      </div>
      <div className="grid gap-4">
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-full rounded-md" />
        ))}
      </div>
    </DetailPanelCard>
  );
}

export function PosesByArtikulContainerSkeleton() {
  return (
    <div className="grid items-start gap-2 lg:grid-cols-2">
      <SkladPosesListSkeleton rows={3} />
      <SkladPosesListSkeleton rows={2} />
    </div>
  );
}
