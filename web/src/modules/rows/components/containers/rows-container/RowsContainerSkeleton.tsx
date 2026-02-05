import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { RowsGridSkeleton } from "@/modules/rows/components/lists/rows-grid/RowsGridSkeleton";

export function RowsContainerSkeleton() {
  return (
    <div className="grid gap-2">

      <Wrapper>
        <RowsGridSkeleton />
      </Wrapper>
    </div>
  );
}
