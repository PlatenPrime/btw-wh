import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit } from "lucide-react";
import { UpdateRowDialog } from "../../dialogs/update-row-dialog";
import type { RowDto } from "@/modules/rows/api/types/dto";
import type { RowsRefetch } from "@/modules/rows/api/types/types";

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
            trigger={
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
            }
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
