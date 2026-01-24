import { Skeleton } from "@/components/ui/skeleton";
import { ZonesGridSkeleton } from "@/modules/zones/components/lists/zones-grid";

export function ZonesContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-12" />
      <ZonesGridSkeleton count={20} />
    </div>
  );
}



