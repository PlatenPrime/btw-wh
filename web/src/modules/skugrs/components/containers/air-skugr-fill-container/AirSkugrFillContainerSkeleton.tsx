import { SurfaceSection } from "@/components/shared/layout";
import { Skeleton } from "@/components/ui/skeleton";

export function AirSkugrFillContainerSkeleton() {
  return (
    <SurfaceSection className="grid gap-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="grid gap-1">
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-3 w-80" />
        </div>
        <Skeleton className="h-6 w-40 rounded-full" />
      </div>
      <Skeleton className="h-3 w-full max-w-xl" />
      <Skeleton className="h-4 w-56" />
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="h-5 w-32 rounded-full" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-44" />
      </div>
    </SurfaceSection>
  );
}
