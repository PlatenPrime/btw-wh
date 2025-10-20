import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsGridCardView } from "@/modules/rows/components/cards/rows-grid-card/RowsGridCardView.tsx";

interface GridCardProps {
  row: RowDto;
}

export function RowsGridCard({ row }: GridCardProps) {
  return <RowsGridCardView row={row} />;
}
