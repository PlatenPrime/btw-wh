import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsGridView } from "./RowsGridView";

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
