import { SurfaceSection } from "@/components/shared/layout";
import { Skeleton } from "@/components/ui/skeleton";

export function SkuSliceDayStatusSkeleton() {
  return (
    <SurfaceSection className="grid gap-4">
      <Skeleton className="h-6 w-56" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid gap-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-12" />
          </div>
        ))}
      </div>
      <Skeleton className="h-4 w-48" />
    </SurfaceSection>
  );
}
