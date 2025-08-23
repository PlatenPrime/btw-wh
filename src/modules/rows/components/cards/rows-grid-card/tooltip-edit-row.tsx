import { EditTrigger } from "@/components/triggers/edit-trigger/EditTrigger";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { UpdateRowDialog } from "../../dialogs/update-row-dialog";

interface TooltipEditRowProps {
  row: RowDto;
}

export function TooltipEditRow({ row }: TooltipEditRowProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <UpdateRowDialog row={row} trigger={<EditTrigger />} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit Row</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
