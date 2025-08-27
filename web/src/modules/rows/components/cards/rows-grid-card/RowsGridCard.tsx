import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsGridCardView } from "./RowsGridCardView";

interface GridCardProps {
  row: RowDto;
}

export function RowsGridCard({ row }: GridCardProps) {
  return <RowsGridCardView row={row} />;
}
