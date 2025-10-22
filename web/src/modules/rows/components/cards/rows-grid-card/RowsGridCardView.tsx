import { Card, CardHeader } from "@/components/ui/card";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowLink } from "@/modules/rows/components/elements/row-link/RowLink";
import { RowCardActions } from "./RowCardActions";

interface RowsGridCardViewProps {
  row: RowDto;
}

export function RowsGridCardView({ row }: RowsGridCardViewProps) {
  return (
    <Card className="shadow-muted-foreground group/row bg-card h-full w-full p-0 shadow-xs transition-all duration-500 ease-out hover:shadow-xl hover:shadow-orange-500">
      <CardHeader className="flex items-center justify-between p-0">
        <RowLink row={row} />
        <RowCardActions row={row} />
      </CardHeader>
    </Card>
  );
}
