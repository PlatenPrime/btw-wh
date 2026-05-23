import { SurfaceSection } from "@/components/shared/wrappers/SurfaceSection";
import { RowsGridSkeleton } from "@/modules/rows/components/lists/rows-grid/RowsGridSkeleton";

export function RowsContainerSkeleton() {
  return (
    <div className="grid gap-2">

      <SurfaceSection>
        <RowsGridSkeleton />
      </SurfaceSection>
    </div>
  );
}
