import { Card, CardHeader } from "@/components/ui/card";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { LinkRow } from "./link-row";
import { TooltipDeleteRow } from "./tooltip-delete-row";
import { TooltipEditRow } from "./tooltip-edit-row";

interface RowsGridCardViewProps {
  row: RowDto;
}

export function RowsGridCardView({ row,  }: RowsGridCardViewProps) {
  return (
    <Card className="shadow-muted-foreground group/row bg-background hover:bg-muted-background h-full w-full p-0 shadow-xs shadow-orange-500 transition-all duration-500 ease-out hover:shadow-xl">
      <CardHeader className="flex items-center justify-between p-2">
        <LinkRow row={row} />
        <div className="flex items-center gap-2">
          <TooltipEditRow row={row}  />
          <TooltipDeleteRow row={row} />
        </div>
      </CardHeader>
    </Card>
  );
}
