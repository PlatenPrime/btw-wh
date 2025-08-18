import { Card, CardHeader } from "@/components/ui/card";
import type { RowDto } from "@/modules/rows/api/types/dto";
import type { RowsRefetch } from "@/modules/rows/api/types/types";
import { LinkRow } from "./link-row";
import { TooltipDeleteRow } from "./tooltip-delete-row";
import { TooltipEditRow } from "./tooltip-edit-row";

interface RowsGridCardViewProps {
  row: RowDto;
  refetch: RowsRefetch;
}

export function RowsGridCardView({ row, refetch }: RowsGridCardViewProps) {
  return (
    <Card className="shadow-muted-foreground group/row bg-background h-full w-full p-0 shadow-xs transition-all duration-500 ease-out hover:bg-orange-500 hover:shadow-2xl hover:shadow-orange-500">
      <CardHeader className="flex items-center justify-between p-2">
        <LinkRow row={row} />
        <div className="flex items-center gap-2">
          <TooltipEditRow row={row} refetch={refetch} />
          <TooltipDeleteRow row={row} refetch={refetch} />
        </div>
      </CardHeader>
    </Card>
  );
}
