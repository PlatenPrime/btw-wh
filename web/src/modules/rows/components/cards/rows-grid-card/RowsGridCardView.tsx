import { Card, CardHeader } from "@/components/ui/card";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowLink } from "@/modules/rows/components/elements/row-link/RowLink";
import { RowCardActions } from "./row-card-arctions/RowCardActions";

interface RowsGridCardViewProps {
  row: RowDto;
}

export function RowsGridCardView({ row }: RowsGridCardViewProps) {
  return (
    <Card className="group/row h-full w-full p-0">
      <CardHeader className="flex items-center justify-between p-0">
        <RowLink row={row} />
        <RowCardActions row={row} />
      </CardHeader>
    </Card>
  );
}
