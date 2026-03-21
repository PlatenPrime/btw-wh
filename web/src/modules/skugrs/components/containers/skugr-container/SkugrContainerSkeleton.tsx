import { Skeleton } from "@/components/ui/skeleton";
import { SkusGridSkeleton } from "@/modules/skus/components/lists/skus-grid";

export function SkugrContainerSkeleton() {
  return (
    <div className="grid gap-4">
      <Skeleton className="h-48 rounded-lg" />
      <Skeleton className="h-8 w-48" />
      <SkusGridSkeleton count={8} />
    </div>
  );
}
