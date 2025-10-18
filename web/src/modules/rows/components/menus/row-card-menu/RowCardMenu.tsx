import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RowDto } from "@/modules/rows/api/types";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";
import { MoreVertical } from "lucide-react";

interface DeleteRowMenuProps {
  row: RowDto;
}

export function RowCardMenu({ row }: DeleteRowMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild className="">
          <DeleteRowDialog row={row} onSuccess={() => {}} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
