import { GridTileCard } from "@/components/shared/cards";
import { CardHeader } from "@/components/ui/card";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowLink } from "@/modules/rows/components/elements/row-link/RowLink";
import { RowCardActions } from "./row-card-arctions/RowCardActions";

interface RowsGridCardViewProps {
  row: RowDto;
}

export function RowsGridCardView({ row }: RowsGridCardViewProps) {
  return (
    <GridTileCard className="group/row h-full w-full">
      <CardHeader className="flex items-center justify-between gap-3 px-3 py-2">
        <RowLink row={row} />
        <RowCardActions row={row} />
      </CardHeader>
    </GridTileCard>
  );
}
