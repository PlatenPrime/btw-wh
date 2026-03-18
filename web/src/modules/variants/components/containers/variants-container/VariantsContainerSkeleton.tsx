import { Skeleton } from "@/components/ui/skeleton";
import { VariantsGridSkeleton } from "@/modules/variants/components/lists/variants-grid/VariantsGridSkeleton";

export function VariantsContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-12" />
      <VariantsGridSkeleton count={10} />
    </div>
  );
}

