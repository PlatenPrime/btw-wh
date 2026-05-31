import { SurfaceSection } from "@/components/shared/wrappers/SurfaceSection";
import { Skeleton } from "@/components/ui/skeleton";

export function SkuStatisticsContainerSkeleton() {
  return (
    <div className="grid gap-4">
      <SurfaceSection className="grid gap-4 p-4">
        <div className="grid justify-items-center gap-4 py-2">
          <Skeleton className="h-52 w-52 rounded-full" />
        </div>
      </SurfaceSection>

      <SurfaceSection className="p-0">
        <div className="grid gap-2 p-3">
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </SurfaceSection>
    </div>
  );
}
