import { Skeleton } from "@/components/ui/skeleton";
import { SurfaceSection } from "@/components/shared/wrappers/SurfaceSection";

export function KasksContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <SurfaceSection className="flex gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-8 w-8" />
      </SurfaceSection>
      <SurfaceSection>
        <div className="grid gap-2 p-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </SurfaceSection>
    </div>
  );
}
