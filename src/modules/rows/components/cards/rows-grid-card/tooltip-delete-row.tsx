import { EditTrigger } from "@/components/triggers/edit-trigger/EditTrigger";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog";
import { MoreVertical, Trash2 } from "lucide-react";
import { UpdateRowDialog } from "../../dialogs/update-row-dialog";

interface TooltipDeleteRowProps {
  row: RowDto;
}

export function TooltipDeleteRow({ row }: TooltipDeleteRowProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <DeleteRowDialog
                  row={row}
                  trigger={
                    <div className="text-destructive flex cursor-pointer items-center justify-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Видалити
                    </div>
                  }
                  onSuccess={()=>{}}
                />
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <UpdateRowDialog row={row} trigger={<EditTrigger />} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>More Actions</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
