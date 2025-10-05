import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { IPos } from "@/modules/poses/api/types";
import { DeletePosDialog } from "@/modules/poses/components/dialogs/delete-pos-dialog/DeletePosDialog";
import { UpdatePosDialog } from "@/modules/poses/components/dialogs/update-pos-dialog/UpdatePosDialog";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

interface PosCardActionMenuProps {
  pos: IPos;
  onSuccess: () => void;
}

export function PosCardActionMenu({ pos, onSuccess }: PosCardActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-muted h-8 w-8 p-0"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UpdatePosDialog
          pos={pos}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit className="mr-2 h-4 w-4" />
              Редагувати
            </DropdownMenuItem>
          }
          onSuccess={onSuccess}
        />
        <DeletePosDialog
          pos={pos}
          trigger={
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              variant="destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              Видалити
            </DropdownMenuItem>
          }
          onSuccess={onSuccess}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
