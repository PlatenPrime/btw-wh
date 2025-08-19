import { EditTrigger } from "@/components/triggers/edit-trigger/EditTrigger";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { RowDto } from "@/modules/rows/api/types/dto";
import type { RowsRefetch } from "@/modules/rows/api/types/types";
import { UpdateRowDialog } from "../../dialogs/update-row-dialog";

interface TooltipEditRowProps {
  row: RowDto;
  refetch: RowsRefetch;
}

export function TooltipEditRow({ row, refetch }: TooltipEditRowProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <UpdateRowDialog
            row={row}
            trigger={<EditTrigger />}
            onSuccess={() => refetch() ?? (() => {})}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit Row</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
