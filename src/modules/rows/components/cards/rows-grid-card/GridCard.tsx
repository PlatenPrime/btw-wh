import type { RowDto } from "@/modules/rows/api/types/dto";
import type { RowsRefetch } from "@/modules/rows/api/types/types";
import { RowsGridCardView } from "./GridCardView";

interface GridCardProps {
  row: RowDto;
  refetch: RowsRefetch;
}

export function RowsGridCard({ row, refetch }: GridCardProps) {
  return <RowsGridCardView row={row} refetch={refetch} />;
}
