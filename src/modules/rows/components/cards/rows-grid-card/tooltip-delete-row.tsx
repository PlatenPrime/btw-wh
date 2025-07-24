import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MoreVertical, Trash2 } from "lucide-react";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog";
import type { RowDto } from "@/modules/rows/api/types/dto";
import type { RowsRefetch } from "@/modules/rows/api/types/types";

interface TooltipDeleteRowProps {
  row: RowDto;
  refetch: RowsRefetch;
}

export function TooltipDeleteRow({ row, refetch }: TooltipDeleteRowProps) {
  return <TooltipProvider>
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
                        onSuccess={() => refetch() ?? (() => {})}
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>More Actions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>;
}
