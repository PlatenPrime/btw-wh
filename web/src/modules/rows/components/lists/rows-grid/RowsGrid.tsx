import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsGridView } from "@/modules/rows/components/lists/rows-grid/RowsGridView.tsx";

interface GridProps {
  rows: RowDto[]
}

export function RowsGrid({ rows }: GridProps) {
  return (
    <>
      <RowsGridView rows={rows}  />
    </>
  );
}
