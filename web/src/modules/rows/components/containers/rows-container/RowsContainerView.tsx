import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsGrid } from "@/modules/rows/components/lists/rows-grid/RowsGrid";

interface RowsContainerViewProps {
  data: RowDto[];
}

export function RowsContainerView({ data }: RowsContainerViewProps) {
  return (
    <div className="grid gap-2">
      <Wrapper>
        <RowsGrid rows={data} />
      </Wrapper>
    </div>
  );
}
