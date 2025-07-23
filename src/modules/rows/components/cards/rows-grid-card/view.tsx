import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { UpdateRowDialog } from "@/modules/rows/components/dialogs/update-row-dialog";

interface ViewProps {
  row: RowDto;
  onRowUpdated?: () => void;
}

export function View({ row, onRowUpdated }: ViewProps) {
  return (
    <Card className="shadow-muted-foreground group/row bg-background h-full w-full p-0 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ease-out hover:z-10 hover:bg-orange-500 hover:shadow-2xl hover:shadow-orange-500 dark:ring-gray-700">
      <CardHeader className="flex items-center justify-between p-2">
        <Link
          to={`/wh/rows/${row.title}`}
          className="bg-background dark:group-hover/row:bg-foreground flex-1 rounded-md p-2 transition-all duration-300 ease-out"
        >
          <CardTitle className="text-foreground dark:group-hover/row:text-secondary text-center text-lg font-semibold">
            {row.title}
          </CardTitle>
        </Link>
        <div className="flex items-center gap-2">
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
                  onSuccess={onRowUpdated ?? (() => {})}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Row</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
                        onSuccess={onRowUpdated}
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>More Actions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
    </Card>
  );
}
