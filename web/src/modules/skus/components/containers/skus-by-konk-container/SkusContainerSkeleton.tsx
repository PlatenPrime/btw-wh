import { Skeleton } from "@/components/ui/skeleton";
import { SkusGridSkeleton } from "@/modules/skus/components/lists/skus-grid";

export function SkusContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-12" />
      <SkusGridSkeleton count={10} />
    </div>
  );
}
