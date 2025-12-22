import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsListView } from "./RowsListView";

interface RowsListProps {
  rows: RowDto[] | undefined;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function RowsList({
  rows,
  refreshing,
  onRefresh,
}: RowsListProps) {
  return (
    <RowsListView rows={rows} refreshing={refreshing} onRefresh={onRefresh} />
  );
}

