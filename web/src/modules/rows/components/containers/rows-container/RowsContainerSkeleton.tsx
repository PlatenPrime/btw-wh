import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { RowsGridSkeleton } from "@/modules/rows/components/lists/rows-grid/RowsGridSkeleton";

export function RowsContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <Wrapper className="flex items-center justify-between gap-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-32" />
      </Wrapper>

      <Separator />

      <Wrapper>
        <RowsGridSkeleton />
      </Wrapper>
    </div>
  );
}
