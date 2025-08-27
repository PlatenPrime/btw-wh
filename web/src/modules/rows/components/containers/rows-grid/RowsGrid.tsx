import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsGridSkeleton } from "./RowsGridSkeleton";
import { RowsGridView } from "./RowsGridView";

interface GridProps {
  rows: RowDto[] | undefined;
  isPending?: boolean;
  isFetching?: boolean;
}

export function RowsGrid({ rows, isPending, isFetching }: GridProps) {
  if (isPending) {
    return <RowsGridSkeleton />;
  }

  return (
    <>
      <RowsGridView rows={rows} isFetching={isFetching} />
    </>
  );
}
