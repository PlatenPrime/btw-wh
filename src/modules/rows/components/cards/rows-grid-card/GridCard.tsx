import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsGridCardView } from "./GridCardView";

interface GridCardProps {
  row: RowDto;
}

export function RowsGridCard({ row }: GridCardProps) {
  return <RowsGridCardView row={row} />;
}
