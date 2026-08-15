import { Skeleton } from "@/components/ui/skeleton";
import { GraboSkusGridSkeleton } from "@/modules/grabo-skus/components/lists/grabo-skus-grid";

export function GraboSkusContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-12" />
      <GraboSkusGridSkeleton count={10} />
    </div>
  );
}
