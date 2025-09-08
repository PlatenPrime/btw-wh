import { EditTrigger } from "@/components/triggers/edit-trigger/EditTrigger";
import { Card, CardHeader } from "@/components/ui/card";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { UpdateRowDialog } from "@/modules/rows/components/dialogs/update-row-dialog/UpdateRowDialog";
import { RowLink } from "@/modules/rows/components/elements/row-link/RowLink";
import { RowCardMenu } from "@/modules/rows/components/menus/row-card-menu/RowCardMenu";

interface RowsGridCardViewProps {
  row: RowDto;
}

export function RowsGridCardView({ row }: RowsGridCardViewProps) {
  return (
    <Card className="shadow-muted-foreground group/row bg-background hover:bg-muted-background h-full w-full p-0 shadow-xs hover:shadow-orange-500 transition-all duration-500 ease-out hover:shadow-xl">
      <CardHeader className="flex items-center justify-between p-0">
        <RowLink row={row} />
        <div className="flex items-center gap-2">
          <UpdateRowDialog row={row} trigger={<EditTrigger />} />
          <RowCardMenu row={row} />
        </div>
      </CardHeader>
    </Card>
  );
}
