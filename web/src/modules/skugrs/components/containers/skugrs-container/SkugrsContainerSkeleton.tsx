import { Skeleton } from "@/components/ui/skeleton";
import { SkugrsGridSkeleton } from "@/modules/skugrs/components/lists/skugrs-grid";

export function SkugrsContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-12" />
      <SkugrsGridSkeleton count={10} />
    </div>
  );
}
