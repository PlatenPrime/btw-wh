import { SurfaceSection } from "@/components/shared/layout";
import { Skeleton } from "@/components/ui/skeleton";

export function AirClientSlicesSkeleton() {
  return (
    <SurfaceSection className="grid gap-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="grid gap-1">
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-3 w-72" />
        </div>
        <Skeleton className="h-6 w-40 rounded-full" />
      </div>
      <div className="grid gap-2">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-36" />
      </div>
    </SurfaceSection>
  );
}
