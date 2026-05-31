import { SurfaceSection } from "@/components/shared/layout";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsGrid } from "@/modules/rows/components/lists/rows-grid/RowsGrid";

interface RowsContainerViewProps {
  data: RowDto[];
}

export function RowsContainerView({ data }: RowsContainerViewProps) {
  return (
    <div className="grid gap-2">
      <SurfaceSection>
        <RowsGrid rows={data} />
      </SurfaceSection>
    </div>
  );
}
