import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsListView } from "./RowsListView";

interface RowsListProps {
  rows: RowDto[] | undefined;
}

export function RowsList({ rows }: RowsListProps) {
  return <RowsListView rows={rows} />;
}

