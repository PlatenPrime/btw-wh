import { ListRowCard } from "@/components/shared/cards";
import { SurfaceSection } from "@/components/shared/layout";
import { Skeleton } from "@/components/ui/skeleton";

function KasksListCardSkeleton() {
  return (
    <ListRowCard className="grid gap-3">
      <div className="flex items-start gap-3">
        <Skeleton className="size-12 shrink-0 rounded-md" />
        <div className="grid min-w-0 flex-1 gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-3/4 max-w-[16rem]" />
        </div>
        <Skeleton className="size-8 shrink-0 rounded-full" />
      </div>
      <div className="border-border/40 flex flex-wrap items-center justify-between gap-2 border-t pt-2">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-28" />
      </div>
    </ListRowCard>
  );
}

export function KasksContainerSkeleton() {
  return (
    <div className="grid gap-3">
      <SurfaceSection className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="h-8 w-44 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
        </div>
        <Skeleton className="h-4 w-20" />
      </SurfaceSection>
      <SurfaceSection className="grid gap-3">
        <KasksListCardSkeleton />
        <KasksListCardSkeleton />
        <KasksListCardSkeleton />
      </SurfaceSection>
    </div>
  );
}
